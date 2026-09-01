---
title: Brukersynkronisering Sync API
date: 2026-03-25
weight: 30
---

**Brukersynkronisering Sync API** (Sync API) er et API som lar eksterne målsystemer holde seg kontinuerlig oppdatert på bruker- og gruppedata fra Fiks-plattformen.

Sync API er optimalisert for å hente kun endringer (delta) siden forrige synkronisering. Dette reduserer datamengden og sikrer at målsystemet alltid er synkront med kilden.

---

## 1. Arkitektur

Diagrammet under viser hvordan data flyter fra organisasjonens Identity Provider (IdP) til målsystemet via Fiks-plattformen.

![Sync API Arkitektur](/diagram/sync-api-arkitektur.svg)

1.  **Provisjonering**: IdP (f.eks. Microsoft Entra ID) sender data til Fiks SCIM API.
2.  **Lagring**: Fiks lagrer dataene i sin database, merket med kildeinformasjon.
3.  **Synkronisering**: Målsystemet poller Sync API for å hente nye endringer.

### Delta-synkronisering med syncToken
Sync API bruker en cursor (`syncToken`) som klienten må ta vare på mellom hvert kall. Dette tokenet inneholder informasjon om hvor langt klienten har kommet i synkroniseringen, men ikke på et format som klienten skal parse. Det eneste klienten skal gjøre er å ta vare på tokenet, og sende det med på neste request. Dette sørger for at klienten kun får de endringene som har skjedd siden forrige synkronisering.

![Sync API Delta Loop](/diagram/sync-api-delta-sync-loop.svg)

**Hvordan det fungerer:**
1.  **Første kall**: Klienten kaller endepunktet uten `syncToken`. Dette initierer en full synkronisering fra starten.
2.  **Respons**: Serveren returnerer en liste med hendelser (`events`), et nytt `syncToken` og et `hasMore`-flagg.
3.  **Neste kall**: Klienten lagrer det nye tokenet og sender det med som en query-parameter i neste request.
4.  **Loop**: Hvis `hasMore` er `true`, bør klienten kalle endepunktet på nytt umiddelbart for å hente neste batch.

---

## 2. Tilgang og Autentisering

For å bruke API-et må målsystemet være registrert og autorisert i Fiks Forvaltning.

### Base URL
Sync API er tilgjengelig på følgende adresser:
*   **Produksjon**: `https://api.fiks.ks.no/brukersynkronisering/sync/api/v1/`
*   **Test**: `https://api.fiks.test.ks.no/brukersynkronisering/sync/api/v1/`

### Autentisering
Synkronisering mot Sync API autentiseres med **Fiks-Porten**.

*(Mer informasjon om teknisk oppsett av integrasjon og sikkerhet i Fiks-Porten kommer).*

---

## 3. Endepunkter

API-et tilbyr batch-endepunkter for brukere og grupper, samt mulighet for å hente den fulle tilstanden til en enkelt ressurs. Alle endepunkter bruker følgende sti-parametere:
*   `fiksOrgId`: Kommunens eller organisasjonens unike ID (UUID) på Fiks-plattformen
*   `maalSystem`: En unik id som identifiserer målsystemet (felles for alle eventuelle instanser av målsystemet)

{{% notice warning %}}
Endepunktene for brukere og grupper er **ikke** synkronisert med hverandre. Dette betyr at en gruppe kan referere til et medlem som ennå ikke er mottatt via `/brukere`. Klienter må implementere robust logikk for å håndtere slike midlertidige avvik.
{{% /notice %}}

### Batch-synkronisering (Delta)
Disse endepunktene brukes for å hente endringer over tid ved bruk av `syncToken`.

#### Synkronisering av brukere
`GET /brukersynkronisering/sync/api/v1/{fiksOrgId}/{maalSystem}/brukere`

**Viktige Query-parametre:** `syncToken`, `limit` (default 100).

**Eksempel på respons:**
```json
{
  "events": [
    {
      "id": "2ceb6af3-0f0a-4fa9-b05c-28b6865451b3",
      "changeType": "sync",
      "timestamp": "2023-10-01T12:00:00Z",
      "resource": {
        "id": "2ceb6af3-0f0a-4fa9-b05c-28b6865451b3",
        "userName": "ola.nordmann@kommune.no",
        "displayName": "Ola Nordmann",
        "active": true,
        "fiks": { "identityNumber": "12345678901" }
      }
    }
  ],
  "syncToken": "eyJhbGciOiJIUzI1NiJ9...",
  "hasMore": false
}
```

#### Synkronisering av grupper
`GET /brukersynkronisering/sync/api/v1/{fiksOrgId}/{maalSystem}/grupper`

**Viktige Query-parametre:** `syncToken`, `limit`, `maxGroupSize` (default 100).

### Enkeltoppslag (Full tilstand)
Bruk disse endepunktene for å hente den nyeste og fullstendige tilstanden for en spesifikk ressurs.

*   **Hent enkeltbruker**: `GET /.../bruker/{brukerId}`
*   **Hent enkeltgruppe**: `GET /.../gruppe/{gruppeId}` (Returnerer fullstendig gruppe inkludert alle medlemmer).

---

## 4. Forståelse av respons-data

### Hendelsestyper (Events)
Sync API opererer med to hovedtyper endringer:
1.  **`sync`**: Brukeren eller gruppen er opprettet eller endret. Feltet `resource` inneholder den oppdaterte tilstanden.
2.  **`delete`**: Brukeren eller gruppen er slettet fra kildesystemet. Feltet `resource` vil da være `null`.

### Spesialhåndtering av store grupper
Hvis en gruppe har svært mange medlemmer (overstiger `maxGroupSize`), vil den ikke inkluderes i sin helhet i batch-responsen for å unngå for store payloads.

![Sync API Large Group](/diagram/sync-api-large-group-sync.svg)

*   Feltet `requiresSeparateFetch` vil da være `true` og `resource` vil være `null`.
*   Klienten må da gjøre et manuelt oppslag mot enkeltgruppe-endepunktet for å hente medlemmene.

### Beriking med Personidentifikator (FNR/D-nummer)
Sync API støtter automatisk beriking av brukere med fødselsnummer (under feltet `fiks.identityNumber`).
**Merk:** Hvis en brukers fødselsnummer blir lagt til eller oppdatert i etterkant, vil dette **trigge en ny `sync`-hendelse** i API-et, selv om ingen andre SCIM-data har endret seg.

---

## 5. Robusthet og Edge Cases

### Paging og ufullstendige sider
Når man integrerer mot Sync API-et, er det viktig å følge disse mønstrene:
1.  **Ufullstendige sider**: Selv om du ber om `limit=100`, kan du motta færre hendelser selv om `hasMore` er `true`.
2.  **Tomme sider med hasMore=true**: I visse tilfeller kan en respons inneholde 0 hendelser selv om det er flere data i kø.
**Klienten må alltid se på `hasMore`-flagget for å avgjøre om den skal fortsette å polle, uavhengig av antall hendelser i responsen.**

### Feilhåndtering og Statuskoder

Sync API returnerer en standardisert feilmodell ved feil. Ved maskinell tolkning er feltet `errorCode` det viktigste.

*   **`200 OK`**: Alt OK.
*   **`400 Bad Request`**:
    *   Hvis `errorCode` er **`INVALID_TOKEN_FORMAT`**, er `syncToken` ugyldig (feil format eller korrupt). Sjekk at du sender uendret token fra forrige respons.
*   **`401 Unauthorized`**: Manglende eller ugyldig autentisering.
*   **`404 Not Found`**:
    *   Hvis `errorCode` er **`SOURCE_NOT_CONFIGURED`**, betyr det at målsystemet er autorisert, men at ingen kilde er koblet til ennå.
    *   **Klientens håndtering**: Klienten bør innta **ventemodus**. Behold eksisterende data i en "Pending"-tilstand og unngå sletting inntil en ny kilde er på plass.
*   **`410 Gone`**: Dette betyr at synkroniseringen må startes på nytt (kall uten `syncToken`). Årsaken avgjør hvilken strategi klienten bør bruke:
    *   Hvis `errorCode` er **`SOURCE_CHANGED`**, er kildesystemet byttet ut eller slettet. **Advarsel**: Brukere og grupper vil få nye unike ID-er. Se strategier under.
    *   Hvis `errorCode` er **`TOKEN_EXPIRED`**, er tokenet for gammelt til å garantere fullstendighet. ID-er er uendret.
    *   Hvis `errorCode` er **`FULL_RESYNC_REQUESTED`**, har Fiks-plattformen trigget en tvungen gjenoppretting. ID-er er uendret.

#### Strategier ved full resynkronisering (410 Gone)

Når du tvinges til å starte på nytt, avhenger strategien din av om ID-ene er bevart:

1.  **Ved SOURCE_CHANGED (Nye ID-er)**:
    *   **Enkel (Nuke and Pave)**: Slett alle lokale data for denne organisasjonen og populer på nytt. Passer hvis historikk ikke er viktig.
    *   **Avansert (Orphan and Merge)**: Marker eksisterende data som "foreldreløse", hent nye data, og forsøk å matche mot de gamle basert på naturlige nøkler (fødselsnummer, brukernavn eller e-post) for å flytte over historikk.
2.  **Ved TOKEN_EXPIRED eller FULL_RESYNC_REQUESTED (Samme ID-er)**:
    *   **Enkel (Upsert)**: Kjør en ny full synkronisering og overskriv (upsert) eksisterende poster. Siden ID-ene er de samme, vil dette fungere sømløst uten duplikater.

---

## Veien videre
*   **Teknisk referanse**: Fullstendig OpenAPI-spesifikasjon finnes i [Fiks API-dokumentasjon](/api/index.html?spec=https://developers.fiks.ks.no/api/sync-api-v1.json).

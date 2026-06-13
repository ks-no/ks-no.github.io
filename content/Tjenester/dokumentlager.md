---
title: Fiks Dokumentlager
date: 2018-09-10
aliases: ["/fiks-platform/tjenester/dokumentlager/", "/fiks-plattform/tjenester/dokumentlager/"]
---

## Kort beskrivelse

**Sikker og tilgangsstyrt lagring av dokumenter i Fiks-plattformen.**

Fiks Dokumentlager er en tjeneste som lar kommunen og andre Fiks-organisasjoner laste opp dokumenter. Ved opplasting autoriseres en eller flere personer og/eller organisasjoner for tilgang til dokumentet. Det er også mulig å laste opp dokumenter med en begrenset levetid, slik at det blir gjort utilgjengelig når denne tiden utløper.

Tjenesten tilbyr:
- Sikker og kryptert lagring av dokumenter.
- Detaljert tilgangsstyring ("eksponert for").
- Tidsbegrenset levetid (TTL) for midlertidige dokumenter.
- Fysisk og logisk inndeling via dokumentlager-kontoer.

Dokumentlageret benyttes av flere Fiks-tjenester (SvarUt, SvarInn, Digisos, Innsyn), men kan også i høyeste grad benyttes direkte av kommunens egne integrasjoner.

API-spesifikasjon: [Fiks Dokumentlager Swagger/OpenAPI](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/dokumentlager-api-v1.json) <!-- Oppdater URL dersom api-filen heter noe annet i swagger -->

## Kom i gang

Tjenestespesifikke forutsetninger:

1. Dokumentlager administreres gjennom [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
2. Man oppretter én eller flere **Kontoer** i Fiks Konfigurasjon for å organisere sine dokumenter.
3. Integrasjonen må gis rettighet til å laste opp/slette dokumenter på den/de spesifikke dokumentlager-kontoen(e). Dette gjøres i konfigurasjonsgrensesnittet på kontonivå.
4. Følg standard [autentiseringsregler]({{% ref "sikkerhet.md" %}}) (Maskinporten) for å kalle API-et.

## Beskrivelse av tjenesten

### Konsepter og begreper

| Begrep | Beskrivelse |
|--------|-------------|
| **Konto** | Tjenesteressurs for organisering. Alle dokumenter tilknyttes en konto. Slettes kontoen, slettes også alle dokumentene. |
| **Metadata** | Informasjon og regler for dokumentet ("dokumentnavn", "mimetype", "sikkerhetsniva"). Sentralt her er `eksponertFor` (hvem som får laste ned filen, f.eks fødselsnummer eller integrasjonsId) og utløpstidspunkt (automatisk sletting satt via `ttl` eller `tilgjengeligTil`). |
| **Korrelasjons-id** | Valgfri ID som kan brukes til å gruppere relaterte dokumenter sammen for enklere batch-sletting. |

### Overordnet flyt

1. **Opplasting:** Integrasjonen sender metadata og dokumentdata som en multipart request til Dokumentlageret.
2. **Lagring og kryptering:** Dokumentlageret lagrer dokumentet kryptert (eventuelt har klienten allerede ende-til-ende kryptert det) tilknyttet angitt konto.
3. **Bekreftelse:** Dokumentlageret returnerer en respons med dokument-ID, samt en direktelenke (URL) for personnedlasting i `Location`-headeren.
4. **Tilgjengeliggjørelse:** Dokumentet er nå eksponert og kan lastes ned av de som ble autorisert i metadata (enten via API for maskiner eller via nedlastings-urlen i en nettleser).
5. **Sletting:** Dokumentet kan fjernes manuelt via API/webgrensesnitt, slettes automatisk pga. TTL, eller forsvinne om hele kontoen slettes.

Når et dokument slettes, vil metadata fortsette å eksistere, men selve dokumentet (innholdet) vil ikke lenger være tilgjengelig. Etter en periode vil også metadata bli slettet. Dette vil bli implementert i framtiden.

### Tjenestespesifikke regler

**Kryptering under opplasting**

Dersom ikke `kryptert` query-parameter er satt til `true` ved opplasting, vil dokumentet krypteres av Fiks-tjenesten før det lagres. Uavhengig av metoden er alle dokumenter kryptert "at rest".
For dokumenter med **sikkerhetsnivå 4**, kreves imidlertid ende-til-ende-kryptering. Da MÅ integrasjonen kryptere dokumentet hos seg før opplasting med Fiks Dokumentlager sin public key.

Public-key hentes via GET:
- `GET /dokumentlager/api/v1/public-key`

---

## API-referanse

All interaksjon med Dokumentlageret krever vanlig integrasjonsautentisering (Bearer token + IntegrasjonId/passord). 

### Miljøer og endepunkter

Grunn-URL for API-er og nedlasting varierer per miljø. Se [felles dokumentasjon for miljøer]({{% ref "/Felles/testmiljo.md" %}}) for generell info, men for dokumentlager gjelder følgende adresser:

**For API-kall (opplasting, sletting, m.m.):**
- **Test:** `https://api.fiks.test.ks.no`
- **Produksjon:** `https://api.fiks.ks.no`

**For personnedlasting (sluttbruker i browser):**
- **Test:** `https://min.fiks.test.ks.no/dokumentlager/nedlasting/{dokumentId}`
    - Nivå 4: `https://min.fiks.test.ks.no/dokumentlager/nedlasting/niva4/{dokumentId}`
- **Produksjon:** `https://min.kommune.no/dokumentlager/nedlasting/{dokumentId}`
    - Nivå 4: `https://min.kommune.no/dokumentlager/nedlasting/niva4/{dokumentId}`

### Opplasting av dokument

POST-request for registrering og opplasting:
- `POST /dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/`

URL for personnedlasting leveres tilbake i `Location`-header på opplastingsresponsen (201 Created).

**1. Metadata (multipart "metadata")**

Defineres i JSON. `Content-Type` må settes til `application/json`.
`ttl` og `tilgjengeligTil` kan ikke settes samtidig.

```json
{
  "dokumentnavn": "dokument.pdf",
  "mimetype": "application/pdf",
  "ttl": 86400,
  "tilgjengeligTil": "2023-05-04T08:05:17+02:00",
  "sikkerhetsniva": 3,
  "korrelasjonsid": "fa315d73-7ed0-4192-99d1-4049f47e2200",
  "eksponertFor": [
    { "type": "PERSON", "fnr": "12345679810" },
    { "type": "INTEGRASJON", "id": "249e3fde-e3d8-435e-835f-16a432598c10" },
    { "type": "ORGANISASJON", "orgnr": "123456789" },
    { "type": "AUTORISASJON", "privilegium": "EN.TILGANG", "ressurs": "77e0d6b5-f2cd-4f54-80bb-723c598026da" }
  ]
}
```

*Feltbeskrivelser (metadata):*
- **dokumentnavn:** Dokumentets navn. Ved nedlasting gjennom en browser vil dette bli satt som default navn på filen som lagres på disk.
- **mimetype:** Dokumenttype på gyldig MIME-format (f.eks. `application/pdf`).
- **ttl:** Hvor mange sekunder etter opplasting dokumentet skal være tilgjengelig før det utilgjengeliggjøres og slettes. En negativ verdi betyr at det aldri slettes. Må settes hvis `tilgjengeligTil` ikke er satt.
- **tilgjengeligTil:** Eksakt tidspunkt (ISO 8601) for når dokumentet utløper og skal slettes. Må settes hvis `ttl` ikke er satt.
- **sikkerhetsniva:** Sikkerhetsnivå som kreves ved nedlasting (typisk `3` eller `4`). Nivå 4 krever klient-kryptering før opplasting.
- **korrelasjonsid:** Valgfri UUID for å bygge logiske relasjoner mellom flere dokumenter for batch-håndtering.
- **eksponertFor:** Liste over aktører med nedlastingstilgang:
    - `PERSON`: En gyldig ID-porten innlogging for en person med dette fnr/dnr får nedlastingstilgang.
    - `INTEGRASJON`: Maskin-til-maskin tilgang ved bruk av gyldig Virksomhetssertifikat + integrasjon autentisering.
    - `ORGANISASJON`: Personer med *Post/arkiv*- eller *Kommunale tjenester*-rollen i Altinn på dette org.nummeret får tilgang.
    - `AUTORISASJON`: Personer eller integrasjoner med gitt privilegium på gitt ressurs i Fiks Plattformen.

**2. Dokumentdata (multipart "dokument")**

Dette er den faktiske filen. Hvis filen er pre-kryptert på klienten, husk å oppgi query param `?kryptert=true`.

**Eksempel (cURL for opplasting):**
```bash
curl -X POST https://api.fiks.test.ks.no/dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/ \
-H "Authorization: Bearer <gyldig access token>" \
-H "IntegrasjonId: <integrasjonsid>" \
-H "IntegrasjonPassord: <integrasjonspassord>" \
-F "metadata={\"dokumentnavn\":\"dokument.pdf\",\"mimetype\":\"application/pdf\",\"ttl\":3600,\"eksponertFor\":[{\"type\":\"PERSON\", \"fnr\":\"<fødselsnummer>\"}],\"sikkerhetsniva\":3};type=application/json" \
-F "dokument=@dokument.pdf"
```

**Responskoder:**
- `201 Created`: Dokumentet ble lastet opp. Returnerer JSON med ID og størrelser, pluss nedlastings-url i Location-headeren.
  ```json
  {
    "id": "5636b391-41e7-4504-ab3c-1f3df122b483",
    "dokumentnavn": "dokument.pdf",
    "mimeType": "application/pdf",
    "ukryptertStorrelse": 29765,
    "kryptertStorrelse": 30680
  }
  ```
- `400 Bad Request`: Ugyldig request.
- `403 Forbidden`: Integrasjonen mangler kontotilgang.
- `404 Not Found`: Finner ikke forespurt konto/organisasjon.
- `410 Gone`: Konto er slettet/utilgjengelig.

### Oppdatering av metadata

PATCH-request for å endre utløpstid:
`PATCH /dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/{dokumentId}`

Kun `tilgjengeligTil` og `ttl` kan oppdateres (`ttl` oppgis i sekunder relativt til oppdateringstidspunktet).

```json
{
  "ttl": 3600,
  "tilgjengeligTil": "2023-05-04T10:42:40.943+02:00"
}
```

**Responskoder:**
- `200 OK`: Vellykket oppdatering, returnerer nye utløpsverdier.
- `410 Gone`: Dokumentet eller kontoen er allerede slettet.

### Sletting av dokument

DELETE-request:
`DELETE /dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/{dokumentId}`

**Responskoder:**
- `200 OK`: Spesifikt dokument utilgjengeliggjort/slettet.
- `410 Gone`: Dokument/konto allerede slettet.

### Sletting via korrelasjonsid

Sletter asynkront grupper av dokumenter. DELETE:
`DELETE /dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/korrelasjonsid/{korrelasjonsid}`

**Responskoder:**
- `204 No Content`: Korrelasjons-ID er markert som slettet.
- standard `400`/`403`/`404`/`410` for vanlige feilsituasjoner.

---

## Versjonering

| Versjon | Status | Utfasingsdato | Hva er nytt |
|---------|--------|---------------|-------------|
| v1 | ✅ Gjeldende | – | Første versjon av Fiks Dokumentlager REST API |

---

## Klientbibliotek

KS tilbyr en Java-klient for opplasting og nedlasting. Denne støtter blant annet klient-side kryptering automatisk ved opplasting.
Per i dag finnes denne med en egen modul for konfigurering via Spring Boot. 

Kode og dokumentasjon: [ks-no/fiks-dokumentlager-klient på GitHub](https://github.com/ks-no/fiks-dokumentlager-klient).
Se også [samlet oversikt over klientbiblioteker]({{% ref "klientbiblioteker.md" %}}).

---

## Relaterte tjenester

- [Fiks IO]({{% ref "fiksio.md" %}}) – Refererer ofte til dokumenter i dokumentlager.
- [SvarUt / SvarInn]({{% ref "svarut/_index.md" %}}) – Benytter Dokumentlageret for å lagre forsendelser.
- [Fiks Digisos]({{% ref "digisos.md" %}}) – Lagrer sosialsøknader kryptert via Fiks Dokumentlager.
- Generell [Feilhåndtering og feilmeldinger]({{% ref "integrasjoner.md" %}}#feilmeldinger) for APIet.

---

## Få hjelp

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

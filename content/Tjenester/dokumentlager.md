---
title: Fiks dokumentlager
date: 2018-09-10
aliases: ["/fiks-platform/tjenester/dokumentlager/", "/fiks-plattform/tjenester/dokumentlager/"]
---

## Kort beskrivelse
**Sikker og tilgangsstyrt lagring av dokumenter i Fiks-plattformen.**

Fiks Dokumentlager er en tjeneste som lar kommunen og andre Fiks-organisasjoner laste opp dokumenter. 
Ved opplasting autoriseres en eller flere personer og/eller organisasjoner for tilgang til dokumentet. 
Det er også mulig å laste opp dokumenter med en begrenset levetid, slik at det blir gjort utilgjengelig når denne tiden utløper.

Tjenesten tilbyr:
- Sikker og kryptert lagring av dokumenter
- Tilgangsstyring per dokument
- Tidsbegrenset levetid for dokumenter
- Logisk inndeling via kontoer

Dokumentlageret benyttes av flere Fiks-tjenester (SvarUt, SvarInn, Digisos, Innsyn), men kan også i høyeste grad benyttes direkte av kommunens egne integrasjoner.

API-spesifikasjon: Kommer snart

## Kom i gang
Tjenestespesifikke forutsetninger:
1. Dokumentlager administreres gjennom [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon).
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

## Integrasjonsutvikling

Alle operasjoner i dokumentlageret utføres på en konto, som er en ressurs som hører til dokumentlager-tjenesten til en 
Fiks-organisasjon. Hvordan disse organiseres er opp til hver organisasjon. Man kan ha én konto for alt, eller dele det 
opp over mange, slik at man for eksempel kan gi forskjellige tilganger for hver konto.

De vanlige [autentiseringsreglene]({{% ref "sikkerhet.md" %}}) for Fiks-plattformen gjelder for denne tjenesten, men i 
tillegg må integrasjonen ha rett til å laste opp dokumenter på en dokumentlager konto. Disse tilgangene tildeles som vanlig 
gjennom konfigurasjonsgrensesnittet, men må gis på kontonivå. Dersom man har flere kontoer, men ønsker å gi en integrasjon 
tilgang til flere av disse må tilgang gis på hver enkelt konto.

### Miljøer og endepunkter

Grunn-URL for API-er og nedlasting varierer per miljø. Se [felles dokumentasjon for miljøer]({{% ref "/Felles/testmiljo.md" %}}) for generell info, men for dokumentlager gjelder følgende adresser:

**For API-kall (opplasting, sletting, m.m.):**
- **Test:** `https://api.fiks.test.ks.no`
- **Produksjon:** `https://api.fiks.ks.no`

### Opplasting
- `POST /dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/`

Ved vellykket opplasting returneres et JSON objekt som inneholder ID for det opplastede dokumentet:

```json
{
  "id": "9dba7b9e-8fb8-4589-ae3e-740897852a6b"
}
```

URL for nedlasting ligger i Location-header på returnert 201 CREATED respons, eller her:

- Test
    - ``https://minside.fiks.test.ks.no/dokumentlager/nedlasting/{id}``
    - ``https://minside.fiks.test.ks.no/dokumentlager/nedlasting/niva4/{id}`` (Krever nivå 4 innlogging)
- Prod
    - ``https://minside.kommune.no/dokumentlager/nedlasting/{id}``
    - ``https://minside.kommune.no/dokumentlager/nedlasting/niva4/{id}`` (Krever nivå 4 innlogging)

#### Metadata

Metadata for dokumenter legges i multipart med navn ``metadata`` og defineres i JSON. 
Content-Type må på multiparten må settes til application/json.
Et eksempel er vist under (ttl og tilgjengeligTil kan ikke settes samtidig):

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

- Dokumentnavn - Dokumentets navn, ved nedlasting gjennom en browser vil dette bli satt som default navn på filen som lagres på disk
- MIME type - Dokumenttype på gyldig MIME-format. Se https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
- TTL - Hvor mange sekunder etter opplasting dokumentet skal være tilgjengelig. Ved utløp blir dokumentet utilgjengeliggjort og slettes. En negativ verdi betyr at dokumentet aldri vil slettes. Kan ikke settes sammen med tilgjengeligTil, men en av disse må settes.
- Tilgjengelig til - Tidspunkt for når dokumentet utløper og skal slettes på ISO 8601-format. Opplastingen vil bli avvist dersom tidspunktet er i fortiden. Kan ikke settes sammen med ttl, men en av disse må settes.
- Sikkerhetsniva - Sikkerhetsnivå som skal kreves ved nedlasting av dokument. Ved nivå 4 kreves kryptering hos klient før opplasting.
Se https://eid.difi.no/nb/sikkerhet-og-informasjonskapsler/ulike-sikkerhetsniva
- Korrelasjonsid - Id som kan brukes til å indikere at flere dokumenter hører sammen. Feltet er ikke påkrevd.
- Eksponert for - Liste over aktører som skal ha tilgang til å laste ned dokumentet. Kan være følgende typer:
    - Person - Eksponeres for en persons fødselsnummer. En gyldig ID-porten innlogging for en person med dette 
    fødselsnummeret vil ha lov til å laste ned dokumentet.
    - Integrasjon - Eksponeres for en UUID som identifiserer en integrasjon. En klient innlogget med integrasjonsid, 
    integrasjonspassord og virksomhetssertifikatet som er autentisert til å bruke integrasjonen vil ha lov til å laste ned dokumentet.
    - Organisasjon - Eksponeres for et organisasjonsnummer. Personer med "Ordinær post til virksomhet"-tilgangspakken i Altinn på dette organisasjonsnummeret vil ha lov til å laste ned dokumentet.
    - Autorisasjon - Eksponeres for et "privilegium, ressurs"-par. Personer eller integrasjoner med gitt privilegium på 
    gitt ressurs vil ha lov til å laste ned dokumentet.

#### Dokument

Dokumentdata legges i multipart med navn ``dokument``.

Dersom ikke ``kryptert`` query parameter er satt til true vil dokumentet krypteres av tjenesten før det lagres. Dersom man ønsker 
å laste opp dokumenter på nivå 4, eller bare ønsker ende-til-ende-kryptering ved opplasting, må dette flagget settes til
true, og dokumentet må krypteres med dokumentlagerets public-key før opplasting. Uavhengig av hva man velger vil alle
dokumenter være kryptert etter opplasting, og vil kun dekrypteres når en aktør som er autorisert til å laste ned dokumentet 
laster det ned.

Public-keyen kan hentes via:
- `GET /dokumentlager/api/v1/public-key`

#### Responskoder
- 201 Created - Dokumentet ble lastet opp. 
  Body inneholder metadata:
  ```json
  {
    "id": "5636b391-41e7-4504-ab3c-1f3df122b483",
    "dokumentnavn": "dokument.pdf",
    "mimeType": "application/pdf",
    "ukryptertStorrelse": 29765,
    "kryptertStorrelse": 30680
  }
  ```

  Url for personnedlasting returneres i Location-header:
  `Location: https://minside.kommune.no/dokumentlager/nedlasting/5636b391-41e7-4504-ab3c-1f3df122b483`
- 400 Bad Request - Request er ikke i henhold til spesifikasjonen.
- 403 Forbidden - Integrasjonen har ikke nødvendige tilganger til å laste opp dokumenter på spesifisert konto og organisasjon.
- 404 Not Found - Fant ingen konto med spesifisert id for organisasjonen.
- 410 Gone - Konto er slettet.

#### Eksempel (cURL)

```bash
curl -X POST https://api.fiks.test.ks.no/dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/ \
-H "Authorization: Bearer <gyldig access token>" \
-H "IntegrasjonId: <integrasjonsid>" \
-H "IntegrasjonPassord: <integrasjonspassord>" \
-F "metadata={\"dokumentnavn\":\"dokument.pdf\",\"mimetype\":\"application/pdf\",\"ttl\":3600,\"eksponertFor\":[{\"type\":\"PERSON\", \"fnr\":\"<fødselsnummer>\"}],\"sikkerhetsniva\":3};type=application/json" \
-F "dokument=@dokument.pdf"
```

### Oppdatering av metadata
- `PATCH /dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/{dokumentId}`

Kun tilgjengeligTil kan oppdateres, enten via ttl, som oppgis i sekunder relativt til tid for oppdateringen, eller via tilgjengeligTil, som er et eksakt tidspunkt i fremtiden.
Eksempel på request body:
```json
{
  "ttl": 3600,
  "tilgjengeligTil": "2023-05-04T10:42:40.943+02:00"
}
```

#### Responskoder
- 200 OK - Dokumentet med spesifisert id oppdatert. Body inneholder id og oppdatert data:
  ```json
  {
    "id": "bd393a3a-78f6-4902-af96-b604c24850a6",
    "tilgjengeligTil": "2023-05-04T10:41:13.485+02:00"
  }
  ```
- 400 Bad Request - Request er ikke i henhold til spesifikasjonen.
- 403 Forbidden - Integrasjonen har ikke nødvendige tilganger til å slette dokumenter på spesifisert konto og organisasjon.
- 404 Not Found - Fant ikke et dokument med oppgitt id, eller spesifisert konto og organisasjon.
- 410 Gone - Dokumentet er allerede slettet, eller konto er slettet.

### Sletting av dokument
- `DELETE /dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/{dokumentId}`

Integrasjoner som er autorisert til å laste opp dokumenter har også lov til å slette.

#### Responskoder
- 200 OK - Dokumentet med spesifisert id ble slettet. Tom body.
- 400 Bad Request - Request er ikke i henhold til spesifikasjonen.
- 403 Forbidden - Integrasjonen har ikke nødvendige tilganger til å slette dokumenter på spesifisert konto og organisasjon.
- 404 Not Found - Fant ikke et dokument med oppgitt id, eller spesifisert konto og/eller organisasjon.
- 410 Gone - Dokumentet er allerede slettet, eller konto er slettet.

### Sletting via korrelasjonsid
- `DELETE /dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/korrelasjonsid/{korrelasjonsid}`

Integrasjoner kan også slette alle dokumenter med en gitt korrelasjonsid som er lastet opp på en konto de har tilgang til.

#### Responskoder
- 204 No Content - Korrelasjonsid er markert som slettet. Dokumentene vil bli slettet asynkront.
- 400 Bad Request - Request er ikke i henhold til spesifikasjonen.
- 403 Forbidden - Integrasjonen har ikke nødvendige tilganger til å slette dokumenter på spesifisert konto og organisasjon.
- 404 Not Found - Fant ikke spesifisert konto og/eller organisasjon.
- 410 Gone - Kontoen er slettet.

## Versjonering

| Versjon | Status | Utfasingsdato | Hva er nytt |
|---------|--------|---------------|-------------|
| v1 | ✅ Gjeldende | – | Første versjon av Fiks Dokumentlager REST API |

---

## Klientbibliotek

KS tilbyr en Java-klient for opplasting og nedlasting. Denne støtter blant annet klient-side kryptering automatisk ved opplasting.

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
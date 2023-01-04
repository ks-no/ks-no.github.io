---
title: Fiks dokumentlager
date: 2018-09-10
aliases: [/fiks-platform/tjenester/dokumentlager/]
---

Dokumentlager-tjenesten lar kommunen og andre Fiks-organisasjoner laste opp dokumenter. Ved opplasting autoriseres en eller 
flere personer og/eller organisasjoner for tilgang til dokumentet. Det er også mulig å laste opp dokumenter med en begrenset
levetid, slik at det blir gjort utilgjengelig når denne tiden utløper.

En Fiks-organisasjon kan organisere sine dokumenter ved bruk av det som kalles kontoer. Alle dokumenter som lastes opp 
vil tilhøre en konto. Om man vil bruke en eller flere kontoer er helt opp til hver organisasjon. Kontoer administreres 
gjennom konfigurasjonsgrensesnittet, hvor man også finner statistikk for diskbruk, metadata for dokumenter, med mer.

Dokumentlageret vil bli benyttet av flere Fiks-tjenester: SvarUt, SvarInn, Digisos og Innsyn, men det kan også benyttes av 
en Fiks-organisasjons egne integrasjoner.

Dokumentlageret fungerer på følgende måte:

1. En laster opp metadata om dokumentet. Her spesifiseres blant annet hvem dokumentet skal eksponeres for, dokumentets levetid, osv.
2. En laster opp dokumentdata
3. Dokumentet blir tilgjengelig for alle som er autorisert til å se det
4. Dokumentet kan bli utilgjengeliggjort og slettet av en av grunnene spesifisert under

Det er tre forskjellige måter et dokument kan bli slettet på:

- Manuelt gjennom webgrensesnitt eller API
- Ved at dokumentets levetid utløper
- Dersom kontoen dokumentet hører til blir slettet

Når et dokument slettes vil metadata fortsette å eksistere, men selve dokumentet vil ikke lenger være tilgjengelig.

### Klienter

For å gjøre det enklere å ta i bruk Dokumentlageret har KS utviklet en klient for opplasting og nedlasting. Denne støtter 
blant annet klient-side kryptering ved opplasting.
 
Per i dag finnes denne klienten kun for Java, med en egen modul for konfigurering via Spring Boot. Kode og dokumentasjon 
finnes på GitHub: https://github.com/ks-no/fiks-dokumentlager-klient

### Integrasjonsutvikling

Alle operasjoner i dokumentlageret utføres på en konto, som er en ressurs som hører til dokumentlager-tjenesten til en 
Fiks-organisasjon. Hvordan disse organiseres er opp til hver organisasjon. Man kan ha én konto for alt, eller dele det 
opp over mange, slik at man for eksempel kan gi forskjellige tilganger for hver konto.

De vanlige [autentiseringsreglene]({{< ref "sikkerhet.md" >}}) for Fiks-plattformen gjelder for denne tjenesten, men i 
tillegg må integrasjonen ha rett til å laste opp dokumenter på en dokumentlager konto. Disse tilgangene tildeles som vanlig 
gjennom konfigurasjonsgrensesnittet, men må gis på kontonivå. Dersom man har flere kontoer, men ønsker å gi en integrasjon 
tilgang til flere av disse må tilgang gis på hver enkelt konto.

#### Opplasting

Opplasting gjøres med en POST-request mot følgende URL:

- Test: ``https://api.fiks.test.ks.no/dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/``
- Prod: ``https://api.fiks.ks.no/dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/``

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

##### Metadata

Metadata for dokumenter legges i multipart med navn ``metadata`` og defineres i JSON. 
Content-Type må på multiparten må settes til application/json.
Et eksempel er vist under:

```json
{
  "dokumentnavn": "dokument.pdf",
  "mimetype": "application/pdf",
  "ttl": 86400,
  "sikkerhetsniva": 3,
  "korrelasjonsid": "fa315d73-7ed0-4192-99d1-4049f47e2200"
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
- TTL - Hvor mange sekunder etter opplasting dokumentet skal være tilgjengelig. Ved utløp blir dokumentet utilgjengeliggjort og slettes.
- Sikkerhetsniva - Sikkerhetsnivå som skal kreves ved nedlasting av dokument. Ved nivå 4 kreves kryptering hos klient før opplasting.
Se https://eid.difi.no/nb/sikkerhet-og-informasjonskapsler/ulike-sikkerhetsniva
- Korrelasjonsid - Id som kan brukes til å indikere at flere dokumenter hører sammen. Feltet er ikke påkrevd.
- Eksponert for - Liste over aktører som skal ha tilgang til å laste ned dokumentet. Kan være følgende typer:
    - Person - Eksponeres for en persons fødselsnummer. En gyldig ID-porten innlogging for en person med dette 
    fødselsnummeret vil ha lov til å laste ned dokumentet.
    - Integrasjon - Eksponeres for en UUID som identifiserer en integrasjon. En klient innlogget med integrasjonsid, 
    integrasjonspassord og virksomhetssertifikatet som er autentisert til å bruke integrasjonen vil ha lov til å laste ned dokumentet.
    - Organisasjon - Eksponeres for et organisasjonsnummer. Personer med *Post/arkiv*- eller *Kommunale tjenester*-rollen i Altinn på dette 
    organisasjonsnummeret vil ha lov til å laste ned dokumentet.
    - Autorisasjon - Eksponeres for et "privilegium, ressurs"-par. Personer eller integrasjoner med gitt privilegium på 
    gitt ressurs vil ha lov til å laste ned dokumentet.

##### Dokument

Dokumentdata legges i multipart med navn ``dokument``.

Dersom ikke ``kryptert`` query parameter er satt til true vil dokumentet krypteres av tjenesten før det lagres. Dersom man ønsker 
å laste opp dokumenter på nivå 4, eller bare ønsker ende-til-ende-kryptering ved opplasting, må dette flagget settes til
true, og dokumentet må krypteres med dokumentlagerets public-key før opplasting. Uavhengig av hva man velger vil alle
dokumenter være kryptert etter opplasting, og vil kun dekrypteres når en aktør som er autorisert til å laste ned dokumentet 
laster det ned.

Public-keyen kan hentes med en GET-request mot følgende endepunkt:

- Test: ``https://api.fiks.test.ks.no/dokumentlager/api/v1/public-key``
- Prod: ``https://api.fiks.ks.no/dokumentlager/api/v1/public-key``

##### Responskoder
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

##### Eksempel (cURL)

```bash
curl -X POST https://api.fiks.test.ks.no/dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/ \
-H "Authorization: Bearer <gyldig access token>" \
-H "IntegrasjonId: <integrasjonsid>" \
-H "IntegrasjonPassord: <integrasjonspassord>" \
-F "metadata={\"dokumentnavn\":\"dokument.pdf\",\"mimetype\":\"application/pdf\",\"ttl\":3600,\"eksponertFor\":[{\"type\":\"PERSON\", \"fnr\":\"<fødselsnummer>\"}],\"sikkerhetsniva\":3};type=application/json" \
-F "dokument=@dokument.pdf"
```

#### Sletting

Integrasjoner som er autorisert til å laste opp dokumenter har også lov til å slette. 

Dette gjøres med en DELETE-request mot følgende URL:

- Test: ``https://api.fiks.test.ks.no/dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/{dokumentId}``
- Prod: ``https://api.fiks.ks.no/dokumentlager/api/v1/{fiksOrganisasjonId}/kontoer/{kontoId}/dokumenter/{dokumentId}``

##### Responskoder
- 200 OK - Dokumentet med spesifisert id ble slettet. Tom body.
- 400 Bad Request - Request er ikke i henhold til spesifikasjonen.
- 403 Forbidden - Integrasjonen har ikke nødvendige tilganger til å slette dokumenter på spesifisert konto og organisasjon.
- 404 Not Found - Fant ikke et dokument med oppgitt id, eller spesifisert konto og organisasjon.
- 410 Gone - Dokumentet er allerede slettet, eller konto er slettet.

#### Feilmeldinger
[Beskrivelse av feilmeldinger](../../integrasjoner/#feilmeldinger) 

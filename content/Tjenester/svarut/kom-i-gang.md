---
title: Kom i gang
description: "Maskinporten, Fiks-integrasjon og tilgang til SvarUt-kontoen, steg for steg."
weight: 10
---

Denne siden er for deg som skal lage en ny integrasjon mot SvarUt REST v2/v3. Skal du hente post til en virksomhet, se [Motta post med SvarInn](/tjenester/svarut/motta/).

## Slik henger tilgangen sammen

![Fagsystemet henter token fra Maskinporten og kaller SvarUt med token, integrasjons-id og passord. SvarUt leverer posten til mottakeren.](/images/svarut/SvarUt-autentisering-maskinporten.png)

Forutsetninger for å gjøre et kall mot SvarUt:

| Hva                                                 | Hvor det kommer fra                                           |
|-----------------------------------------------------|---------------------------------------------------------------|
| Access token fra Maskinporten, med scopet `ks:fiks` | Leverandørens Maskinporten-klient                             |
| Integrasjons-id og passord                          | Kommunen oppretter en Fiks-integrasjon via Fiks konfigurasjon |
| Tilgang til SvarUt-kontoen                          | Kommunen gir integrasjonen tilgang i Fiks konfigurasjon       |

Bruk av integrasjoner er felles for hele Fiks-plattformen og er forklart nøye under [Integrasjoner](/felles/integrasjoner/).

## Steg for steg

1. **Avtale.** Kommunen eller virksomheten har avtale med KS Digital om SvarUt.
2. **Maskinporten.** Leverandøren har en Maskinporten-klient med scopet `ks:fiks`, én for test og én for produksjon. Se [Maskinporten](/felles/integrasjoner/#maskinporten).
3. **Fiks-integrasjon.** Kommunen oppretter en integrasjon i Fiks konfigurasjon med leverandørens organisasjonsnummer som autorisert organisasjon. Dette organisasjonsnummeret må være det samme som er registrert i Maskinporten-klienten. Se [Integrasjoner](/felles/integrasjoner/#fiks-integrasjon).
4. **Tilgang til kontoen.** Kommunen gir integrasjonen tilgang til å sende på SvarUt-kontoen (avsenderen) som skal brukes. Den samme tilgangen gjelder for alle SvarUt-API-ene som bruker integrasjoner.
5. **Konto-id.** Finn id-en til SvarUt-kontoen i Fiks konfigurasjon. Dette er en UUID og skal stå i URL-en til alle kall: `/api/v3/kontoer/{kontoId}/...`.

Bruker dere SOAP eller REST v1 i dag, og allerede har tilgang til en SvarUt-konto, kan dere hoppe over steg 3 og 4. [Migreringsendepunktet](/tjenester/svarut/migrering/) oppretter integrasjonen og gir den tilgang for dere.

## Testing med cURL

For å gjøre en enkel test av at stegene over er korrekt gjennomført kan man gjøre et kall via for eksempel cURL eller Postman:

```bash
curl https://test.svarut.ks.no/api/v3/kontoer/<konto-id>/forsendelser/status/sok \
  -X POST \
  -H "Authorization: Bearer <access token fra Maskinporten>" \
  -H "IntegrasjonId: <integrasjons-id>" \
  -H "IntegrasjonPassord: <passord>" \
  -H "Content-Type: application/json" \
  -d '{"id": []}'
```

Kallet søker etter status for en tom liste med forsendelser. Svarer SvarUt med `200` og `{"statuser": []}`, er tilgangen i orden. Får du `401`, er det tokenet eller integrasjonen som er feil. Får du `403`, mangler integrasjonen tilgang til kontoen. For mer informasjon, se [Når det ikke virker](/felles/integrasjoner/#nar-det-ikke-virker).

Dersom dette fungerer er du klar for til å [sende en forsendelse](/tjenester/svarut/sende/).

## Klientbibliotek

For JVM-baserte språk har vi laget et bibliotek som vi bruker internt, og som andre også kan ta i bruk. Kildekoden for dette finnes [her](https://github.com/ks-no/fiks-svarut-klient).
Klienten er bygget på OpenAPI-spesifikasjonene og er tilgjengelig på [Maven Central](https://central.sonatype.com/artifact/no.ks.fiks/fiks-svarut-klient).

Lager du din egen klient, kan du generere den fra [spesifikasjonene](/tjenester/svarut/api-versjoner/). 
Merk at sende-API-et benytter multipart requests. Dette er noe generatorer ofte har problemer med å få rett, så det kan være nødvendig å kode denne delen selv.  
For mer informasjon, se [Dokumenter og vedlegg](/tjenester/svarut/sende/dokumenter/).

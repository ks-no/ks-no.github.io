---
title: Sende post
description: "Send forsendelser og følg dem opp med SvarUt REST v2/v3."
weight: 20
aliases: [/tjenester/svarut/rest/, /tjenester/svarut/api/rest, /svarut/api/rest]
---

Et fagsystem sender post gjennom SvarUt med REST-API-ene på denne siden. Har du ikke satt opp Maskinporten og Fiks-integrasjon ennå, start med [Kom i gang](/tjenester/svarut/kom-i-gang/).

## Tilgang

Alle kall bruker Maskinporten og Fiks-integrasjon, som beskrevet på [Integrasjoner](/felles/integrasjoner/). Integrasjonen må ha sendetilgang på SvarUt-kontoen. Den samme tilgangen gjelder for alle endepunktene under, også de som bare leser.

| Miljø | Base-URL |
|---|---|
| Test | `https://test.svarut.ks.no/api` |
| Produksjon | `https://svarut.ks.no/api` |

## Sende en forsendelse

Det er ett endepunkt per type mottaker. Disse har forskjellige krav til hvilken informasjon som må sendes med.

| Mottaker                     | Endepunkt                                              | Krever                                                                                                   |
|------------------------------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| Privatperson                 | `POST /v3/kontoer/{kontoId}/forsendelser/person`       | Gyldig fødsels- eller d-nummer                                                                           |
| Virksomhet                   | `POST /v3/kontoer/{kontoId}/forsendelser/organisasjon` | Organisasjonsnummer som finnes i Enhetsregisteret                                                        |
| Helseaktør i Norsk Helsenett | `POST /v3/kontoer/{kontoId}/forsendelser/nhn`          | Fødselsnummer til pasient med fastlege, eller HER-id. Se [Norsk Helsenett](/tjenester/svarut/sende/nhn/) |
| Rett til print               | `POST /v3/kontoer/{kontoId}/forsendelser/print`        | Postadresse                                                                                              |

Spesifikasjon: [forsendelse-send-api-v3.json](https://developers.fiks.ks.no/api/forsendelse-send-api-v3.json) ([åpne i Swagger Editor](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-send-api-v3.json))

Forsendelsen sendes som en multipart-request med metadata og dokumenter. Se [Dokumenter og vedlegg](/tjenester/svarut/sende/dokumenter/) for format, størrelsesbegrensninger og kryptering.

Svaret inneholder `id` til forsendelsen. Denne kan senere benyttes til sjekking av status, henting av hendelser, osv.

Bruk `/print` bare når mottakeren ikke kan nås digitalt. Papirpost koster mer og er dårligere for miljøet. 
Sender du til person eller virksomhet, går forsendelsen uansett til print hvis det ikke finnes en digital kanal, 
gitt at man ikke har bedt om kun digital levering. Se [Kanalvalg](/tjenester/svarut/sende/kanalvalg/).

### Status

Utfyllende informasjon om hvilke statuser som eksisterer og hva de betyr finnes [her](/tjenester/svarut/sende/status/).

## Feilmeldinger

Feilmeldinger returneres som JSON med formatet beskrevet under [Feilmeldinger](/felles/integrasjoner/#feilmeldinger).
Ved behov for å kontakte brukerstøtte, inkluder `errorId` for å gjøre feilsøking enklere.

## Klientbibliotek

[fiks-svarut-klient](https://github.com/ks-no/fiks-svarut-klient) er en klient for JVM-språk som KS Digital selv bruker. Den ligger på [Maven Central](https://central.sonatype.com/artifact/no.ks.fiks/fiks-svarut-klient).

## Mer om sending

{{% children %}}

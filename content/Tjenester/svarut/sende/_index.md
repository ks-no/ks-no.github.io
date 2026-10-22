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

Det er ett endepunkt per type mottaker. Velg det som passer mottakeren, så får du bare de feltene som gjelder.

| Mottaker | Endepunkt | Krever |
|---|---|---|
| Privatperson | `POST /v3/kontoer/{kontoId}/forsendelser/person` | Gyldig fødsels- eller d-nummer |
| Virksomhet | `POST /v3/kontoer/{kontoId}/forsendelser/organisasjon` | Organisasjonsnummer som finnes i Enhetsregisteret |
| Helseaktør i Norsk Helsenett | `POST /v3/kontoer/{kontoId}/forsendelser/nhn` | Fødselsnummer til pasient med fastlege, eller HER-id. Se [Norsk Helsenett](/tjenester/svarut/sende/nhn/) |
| Rett til print | `POST /v3/kontoer/{kontoId}/forsendelser/print` | Postadresse |

Spesifikasjon: [forsendelse-send-api-v3.json](https://developers.fiks.ks.no/api/forsendelse-send-api-v3.json) ([åpne i Swagger Editor](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-send-api-v3.json))

Forsendelsen sendes som en multipart-request med metadata og dokumenter. Se [Dokumenter og vedlegg](/tjenester/svarut/sende/dokumenter/) for format, størrelser og kryptering.

Svaret inneholder `id` til forsendelsen. Ta vare på den. Du trenger den for å hente status og hendelser.

Bruk `/print` bare når mottakeren ikke kan nås digitalt. Papirpost koster mer og er dårligere for miljøet. Sender du til person eller virksomhet, går SvarUt uansett til print hvis det ikke finnes en digital kanal. Se [Kanalvalg](/tjenester/svarut/sende/kanalvalg/).

Noen felter er nyttige å kjenne til:

| Felt | Brukes til |
|---|---|
| `eksternReferanse` | Din egen id for forsendelsen. Kan brukes til å slå opp forsendelsen senere. |
| `korrelasjonsid` | Grupperer flere forsendelser som hører sammen. |
| `kunDigitalLevering` | Forsendelsen blir aldri printet. Lykkes ikke digital levering, får du status `IKKE_LEVERT`, men ingen annen beskjed. |
| `sikkerhetsniva` | `BETYDELIG` (standard, nivå 3) eller `HOYESTE` (nivå 4). Ved `HOYESTE` må dokumentene være kryptert. Se [Sikkerhet](/tjenester/svarut/sikkerhet/). |
| `svarSendesTil` | Hvor et svar skal sendes. Står også som avsenderadresse på papirbrev. |
| `kanSvareViaEdialog` | Mottakeren får en lenke til å svare digitalt. Se [Svar på forsendelse](/tjenester/svarut/sende/svar-pa-forsendelse/). |
| `forsendelsestype` | Bare til virksomheter. Avgjør hvilket SvarInn-mottakersystem som får forsendelsen. Se [Adressering](/tjenester/svarut/motta/adressering/). |
| `taushetsbelagtPost` | Bare til virksomheter. Forsendelsen går til tjenesten for taushetsbelagt post i Altinn. |
| `signering` | Bare til privatpersoner. Se [Signering](/tjenester/svarut/sende/signering/). |

## Følge opp forsendelsen

| Hva | Endepunkt | Spesifikasjon |
|---|---|---|
| Status for én eller flere forsendelser | `POST /v3/kontoer/{kontoId}/forsendelser/status/sok` | [status v3](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-status-api-v3.json) |
| Hendelseslogg | `GET /v2/forsendelser/{forsendelseId}/hendelser` | [hendelser v2](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-hendelser-api-v2.json) |
| Signeringshendelser | `GET /v2/forsendelser/{forsendelseId}/signeringshendelser` | [hendelser v2](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-hendelser-api-v2.json) |
| Metadata for forsendelsen | `GET /v2/forsendelser/{forsendelseId}/metadata` | [metadata v2](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-metadata-api-v2.json) |
| Finne forsendelser med ekstern referanse | `GET /v2/kontoer/{kontoId}/forsendelser` og `.../forsendelser/metadata` | [eksternref v2](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-eksternref-api-v2.json) |

### Status

Se [Status](/tjenester/svarut/sende/status/) for hva hver status betyr og hvilke som er endelige.

## Andre endepunkter

| Hva | Endepunkt | Spesifikasjon |
|---|---|---|
| Markere som lest, når mottakeren har lest forsendelsen et annet sted | `POST /v2/forsendelser/{forsendelseId}/lest` | [lest v2](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-lest-api-v2.json) |
| Slette dokumentene til en forsendelse | `DELETE /v2/forsendelser/{forsendelseId}/dokumenter` | [slett v2](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-slett-api-v2.json) |
| Gyldige forsendelsestyper | `GET /v2/forsendelsestyper` | [typer v2](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-typer-api-v2.json) |
| Mottakersystem for et organisasjonsnummer | `GET /v2/mottakersystem` | [mottakersystem v2](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/mottakersystem-api-v2.json) |

## Feilmeldinger

Feil returneres som JSON med `errorCode`, `errorId` og `message`. Ta med `errorId` når du kontakter brukerstøtte. Generell beskrivelse finnes under [Feilmeldinger](/felles/integrasjoner/#feilmeldinger).

## Klientbibliotek

[fiks-svarut-klient](https://github.com/ks-no/fiks-svarut-klient) er en klient for JVM-språk som KS Digital selv bruker. Den ligger på [Maven Central](https://central.sonatype.com/artifact/no.ks.fiks/fiks-svarut-klient).

## Mer om sending

{{% children %}}

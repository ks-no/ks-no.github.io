---
title: Migrering til REST v2/v3
description: "Gå fra SOAP eller REST v1 til REST v2/v3 med migreringsendepunktet."
weight: 70
aliases: [/tjenester/svarut/avvikling-api/, /tjenester/svarut/api/avvikling-api, /svarut/api/avvikling-api]
---

{{< svarut-avvikling >}}

Denne siden er for dere som sender med SOAP eller REST v1 i dag. Den viser hvordan dere får tilgang til REST v2/v3 uten å sette opp alt fra bunnen, og hva hver gammel operasjon heter i de nye API-ene.

## Slik migrerer dere

1. **Maskinporten.** Leverandøren må ha en Maskinporten-klient med scopet `ks:fiks`. Se [Maskinporten](/felles/integrasjoner/#maskinporten).
2. **Systemkatalogen.** Leverandøren må være registrert i Systemkatalogen til KS Digital. Se [Systemkatalogen](#systemkatalogen).
3. **Opprett integrasjon.** Kall migreringsendepunktet med brukernavnet og passordet dere bruker i dag. Da får dere en Fiks-integrasjon som har tilgang til å sende fra den samme SvarUt-kontoen.
4. **Bytt kall.** Bytt ut operasjonene, se [Fra gamle til nye operasjoner](#fra-gamle-til-nye-operasjoner).
5. **Test.** Test i testmiljøet før dere tar det i bruk i produksjon.

## Migreringsendepunktet

`POST /svarut-konfigurasjon/api/v1/migrering/integrasjoner` ([spesifikasjon](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/integrasjon-migrering-api-v1.json))

| Miljø | Base-URL |
|---|---|
| Test | `https://api.fiks.test.ks.no` |
| Produksjon | `https://api.fiks.ks.no` |

Endepunktet ligger på Fiks-plattformen, ikke på `svarut.ks.no` som de andre SvarUt-API-ene.

Kallet krever to ting:

- **HTTP Basic** med brukernavnet og passordet til SvarUt-kontoen, slik dere bruker for SOAP og REST v1. Det viser at dere har tilgang til kontoen.
- **`maskinportenToken`** i body. Et gyldig token fra Maskinporten. Organisasjonsnummeret i tokenet blir autorisert organisasjon på den nye integrasjonen.

```bash
curl https://api.fiks.test.ks.no/svarut-konfigurasjon/api/v1/migrering/integrasjoner \
  -X POST \
  -u "<brukernavn>:<passord>" \
  -H "Content-Type: application/json" \
  -d '{
    "maskinportenToken": "<access token fra Maskinporten>",
    "systemkatalogProduktId": "<produkt-id, valgfri>"
  }'
```

Svaret:

```json
{
  "id": "<integrasjons-id>",
  "passord": "<integrasjonspassord>",
  "kontoId": "<konto-id>"
}
```

Bruk `id` i headeren `IntegrasjonId`, `passord` i `IntegrasjonPassord` og `kontoId` i URL-en. Se [Sende post](/tjenester/svarut/sende/).

Det blir bare én integrasjon per SvarUt-konto. Kaller dere endepunktet på nytt, får dere et nytt passord, og det gamle slutter å virke.

## Systemkatalogen

Systemkatalogen er KS Digital sin oversikt over leverandører, fag- og arkivsystemer og hvilke integrasjoner de bruker. Med den kan KS Digital for eksempel varsle riktig leverandør direkte hvis en integrasjon får autorisasjonsfeil.

Organisasjonsnummeret i `maskinportenToken` må være registrert som leverandør i Systemkatalogen. Ellers blir kallet avvist.

Dere kan også knytte integrasjonen til et bestemt system ved å sende med `systemkatalogProduktId`. Det er ikke påkrevd, men anbefalt. Produktet må høre til leverandøren med organisasjonsnummeret i tokenet.

Inntil videre er det brukerstøtte som registrerer leverandører og produkter. Send en e-post til [fiks@ksdigital.no](mailto:fiks@ksdigital.no) for å bli registrert, og be om at fag- eller arkivsystemet registreres som produkt hvis dere vil bruke `systemkatalogProduktId`.

## Fra gamle til nye operasjoner

| SOAP | REST v1 | REST v2/v3 |
|---|---|---|
| `sendForsendelse` | `POST /sendForsendelse` | `POST /v3/kontoer/{kontoId}/forsendelser/person`, `/organisasjon`, `/nhn` eller `/print` |
| `startNyForsendelse`, `sendForsendelseMedId` | `POST /startNyForsendelse`, `POST /{id}/sendForsendelse` | Finnes ikke. Id-en kommer i svaret når du sender. |
| `retrieveForsendelsesStatus`, `retrieveForsendelsesStatuser` | `GET /{id}/status`, `POST /statuser` | `POST /v3/kontoer/{kontoId}/forsendelser/status/sok` |
| `retrieveForsendelsesHistorikk` | `GET /{id}/historikk` | `GET /v2/forsendelser/{id}/hendelser` |
| `retrieveSigneringsHistorikk` | `GET /{id}/signeringhistorikk` | `GET /v2/forsendelser/{id}/signeringshendelser` |
| `retrieveDokumentMetadata` | `GET /{id}/dokumentMetadata` | `GET /v2/forsendelser/{id}/metadata` |
| `setForsendelseLestAvEksterntSystem` | `POST /{id}/settLest` | `POST /v2/forsendelser/{id}/lest` |
| `retrieveForsendelsesIderByEksternRef` | `GET /eksternref/{eksternref}` | `GET /v2/kontoer/{kontoId}/forsendelser?eksternRef=...` |
| `retreiveForsendelsesTyper` | `GET /forsendelseTyper` | `GET /v2/forsendelsestyper` |
| `retrieveMottakerSystemForOrgnr` | `GET /mottakersystem/{orgnr}` | `GET /v2/mottakersystem` |

Noen ting er annerledes i v3:

- Det er ett send-endepunkt per type mottaker. Feltene er litt ulike for hver type.
- Statusene er flere og mer presise. Se [Fra status v2 til v3](/tjenester/svarut/sende/status/#fra-status-v2-til-v3).
- `krevNiva4Innlogging` heter nå `sikkerhetsniva` og har verdiene `BETYDELIG` og `HOYESTE`.
- `svarPaForsendelseLink` heter nå `kanSvareViaEdialog`.

## Få hjelp

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

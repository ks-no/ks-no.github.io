---
title: Norsk Helsenett
description: "Send brev til fastleger og andre aktører i Norsk Helsenett."
date: 2026-02-01
weight: 40
aliases: [/tjenester/svarut/sendenhn/, /tjenester/svarut/send-nhn]
---

Med SvarUt kan saksbehandlere sende brev fra sak-, arkiv- eller fagsystemet til fastleger og andre aktører i Norsk Helsenett (NHN). Brevet havner direkte i pasientjournalsystemet (EPJ) hos mottakeren.

Mottakeren må finnes i adresseregisteret til NHN, som tjeneste eller person. Se [NHN sin dokumentasjon om CommunicationParty](https://utviklerportal.nhn.no/informasjonstjenester/virksomhetstjenester/adresseregisteret/communicationparty-api/docs/apimd) for hvem som kan adresseres.

## Før dere kan sende

Avsender må også finnes i adresseregisteret til NHN og ha en HER-id.

1. Avsender får en HER-id fra NHN.
2. KS Digital får tilgang til å sende på vegne av HER-id-en.
3. HER-id-en legges inn på SvarUt-kontoen.

Har SvarUt-kontoen ingen gyldig HER-id, blir alle forsendelser til NHN avvist.

## Sende

Bruk `POST /v3/kontoer/{kontoId}/forsendelser/nhn` ([spesifikasjon](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-send-api-v3.json)). Se [Sende post](/tjenester/svarut/sende/) for tilgang og base-URL.

Velg mottaker med `mottakertype`:

| `mottakertype` | Mottaker | Du må sende med |
|---|---|---|
| `FASTLEGE` | Fastlegen til pasienten. SvarUt slår opp HER-id-en i fastlegeregisteret. | Fødselsnummeret til pasienten i `pasient` |
| `HER_ID` | En bestemt aktør i NHN. SvarUt sjekker HER-id-en mot adresseregisteret. | `mottakerHerId` |

Påkrevde felter:

| Felt | Innhold |
|---|---|
| `tittel` | Tittel på brevet |
| `mottakertype` | `FASTLEGE` eller `HER_ID` |
| `pasient` | `fodselsnummer`, `fornavn`, `etternavn` og eventuelt `mellomnavn` |
| `avsenderKontakt` | `fornavn`, `etternavn` og `telefonnummer` til kontaktpersonen hos avsender |

Forsendelsen kan ha nøyaktig ett dokument. Det må være PDF og kan ikke være større enn 18 MB. Dokumentdelen i requesten må ha `Content-Type: application/pdf`, og filnavnet må slutte på `.pdf`. Det er annerledes enn for andre mottakere, der dokumentdelen har `application/octet-stream`. Se [Dokumenter og vedlegg](/tjenester/svarut/sende/dokumenter/) for hvordan requesten bygges opp.

## Status

Forsendelsen får status `SENDT_NHN_MOTTAKER` når den er sendt, og `LEVERT_NHN_MOTTAKER` når mottakeren har bekreftet. Feiler leveringen, går den til print. Se [Kanalvalg](/tjenester/svarut/sende/kanalvalg/#norsk-helsenett).

## Svar fra helseaktører

Aktører i NHN kan svare tilbake til saksbehandleren. Svaret kommer som en ny forsendelse til SvarUt-kontoen, med `NHN MELDINGSTJENER` som avgivende system.

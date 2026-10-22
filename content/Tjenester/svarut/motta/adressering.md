---
title: Adressering
description: "Hvordan SvarUt velger mottakersystem ut fra organisasjonsnummer, forsendelsestype og nivå."
date: 2017-01-01
weight: 20
aliases: [/tjenester/svarut/svarut-svarinn-adressering/]
---

En virksomhet kan ha flere mottakersystem, for eksempel et arkivsystem og et fagsystem. SvarUt bestemmer hvilket mottakersystem som får en forsendelse ut fra tre ting:

| Hva | Kommer fra |
|---|---|
| Organisasjonsnummer | Mottakeren av forsendelsen |
| Forsendelsestype | Feltet `forsendelsestype` som avsender setter |
| Sikkerhetsnivå | Feltet `sikkerhetsniva` som avsender setter (nivå 3 eller 4) |

Hvert organisasjonsnummer på et mottakersystem settes opp med forsendelsestype og sikkerhetsnivå. Et oppsett med en bestemt forsendelsestype går foran «Alle forsendelsestyper».

Mottakersystemet trenger ikke å gjøre noe selv. Filtreringen skjer i SvarUt, og listen fra SvarInn inneholder bare forsendelsene som hører til mottakersystemet.

## Eksempler

**Arkivsystem og fagsystem.** Fagsystemet skal ha byggesøknader. Alt annet skal til arkivsystemet.

| Mottakersystem | Organisasjonsnummer | Forsendelsestype | Nivå |
|---|---|---|---|
| Arkivsystem | 999777888 | Alle forsendelsestyper | Alle |
| Fagsystem | 999777888 | `ks.byggesøknad` | Alle |

**Ett system som ikke kan ta imot nivå 4.**

| Mottakersystem | Organisasjonsnummer | Forsendelsestype | Nivå |
|---|---|---|---|
| Vanlig system | 999888777 | Alle forsendelsestyper | 3 |
| System for sensitive opplysninger | 999888777 | Alle forsendelsestyper | 4 |

## For avsender

Sett `forsendelsestype` når du sender til en virksomhet. Gyldige typer hentes med `GET /v2/forsendelsestyper`. Hvilke mottakersystem et organisasjonsnummer har, hentes med `GET /v2/mottakersystem`. Se [Sende post](/tjenester/svarut/sende/#andre-endepunkter).

KS Digital bestemmer hvilke forsendelsestyper som finnes. Trenger dere en ny, send en e-post til [fiks@ksdigital.no](mailto:fiks@ksdigital.no).

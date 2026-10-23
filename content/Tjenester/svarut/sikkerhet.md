---
title: Sikkerhet
description: "Kryptering, lagring og sikkerhetsnivå for forsendelser."
date: 2017-01-01
weight: 40
aliases: [/tjenester/svarut/forsendelser-og-sikkerhet/]
---

## Lagring og overføring

- Dokumentene lagres kryptert hos SvarUt.
- Avsender kan kryptere dokumentene før de sendes til SvarUt, men må ikke. Se [Kryptering](/tjenester/svarut/sende/dokumenter/#kryptering) under sending.
- Dokumenter som hentes med SvarInn, er alltid kryptert med nøkkelen til mottakersystemet og må dekrypteres der. Se [Kryptering](/tjenester/svarut/motta/kryptering/) under mottak.
- Dokumenter som mottakeren laster ned selv, dekrypteres når de overføres til mottakeren.

## Sikkerhetsnivå

Feltet `sikkerhetsniva` bestemmer hvilket innloggingsnivå mottakeren må ha for å åpne eller signere forsendelsen.

| `sikkerhetsniva` | Tilsvarer | Brukes til |
|---|---|---|
| `BETYDELIG` (standard) | Nivå 3 | Vanlig post |
| `HOYESTE` | Nivå 4 | Sensitive personopplysninger, for eksempel brev fra sikker sone |

Gradert informasjon kan ikke sendes med SvarUt.

For forsendelser med `HOYESTE`:

- Dokumentene må krypteres hos avsender før de sendes til SvarUt, og `kryptert` må være `true`.
- Bare mottakeren har tilgang til dokumentene. Ikke superadministratorer eller lokale administratorer hos avsender heller.
- SvarInn-mottakersystem må være satt opp for nivå 4 for å få dem. Se [Adressering](/tjenester/svarut/motta/adressering/).

---
title: Sikkerhet
description: "Kryptering, lagring og sikkerhetsnivå for forsendelser."
date: 2026-11-01
weight: 40
aliases: [/tjenester/svarut/forsendelser-og-sikkerhet/]
---

## Lagring og overføring

- Avsender kan kryptere dokumentene før de sendes til SvarUt, men må ikke. Se [Kryptering](/tjenester/svarut/sende/dokumenter/#kryptering) under sending.
- Dokumentene som SvarUt mottar, vil lagres kryptert hos SvarUt.
- Dokumenter som hentes med SvarInn, krypteres av SvarUt med nøkkelen til mottakersystemet, slik at mottakersystemet må dekryptere filene på sin side. Se [Kryptering](/tjenester/svarut/motta/kryptering/) under mottak.
- Dokumenter som mottakeren laster ned selv, dekrypteres når de overføres til mottakeren.

## Sikkerhetsnivå

Feltet `sikkerhetsniva` bestemmer hvilket innloggingsnivå mottakeren må ha for å åpne eller signere forsendelsen i Altinn eller Digital postkasse.

| `sikkerhetsniva` | Tilsvarer | Brukes til |
|---|---|---|
| `BETYDELIG` (standard) | Nivå 3 | Vanlig post |
| `HOYESTE` | Nivå 4 | Sensitive personopplysninger, for eksempel brev fra sikker sone |

Gradert informasjon kan ikke sendes med SvarUt.

For forsendelser som sendes til Svarut med sikkerhetsnivå `HOYESTE`:

- Dokumentene må krypteres hos avsender med SvarUt sin offentlige nøkkel før de sendes til SvarUt, og `kryptert` må være `true`.
- Det er bare mottakeren som har tilgang til dokumentene, ingen administrator hverken i KS Digital eller hos avsender vil ha tilgang til å lese dokumentene.
- SvarInn-mottakersystem må være satt opp for nivå 4 for å få dem. Se [Adressering](/tjenester/svarut/motta/adressering/).

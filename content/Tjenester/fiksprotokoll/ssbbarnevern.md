---
title: SSB barnevern kostra rapportering
date: 2023-03-21
aliases: []
---

SSB barnevern kostra rapportering  er en asynkron protokoll over Fiks IO.


## Meldinger

Hver melding består av en zip fil ASIC-E som inneholder `payload.json` og eventuelle tilhørende vedlegg.
Hver melding kan ikke overskride 5GB.

**Json skjema**

Finnes i repoet: https://github.com/statisticsnorway/fiks-protokoll-json-schemas

**Meldingstyper:**

| Type                     | Navn                                               |
|--------------------------|----------------------------------------------------|
| Innrapportering          | `no.ssb.barnevern.fagsystem.v1.innrapportering`    |
| Valideringsrapport       | `no.ssb.barnevern.fagsystem.v1.valideringsrapport` |


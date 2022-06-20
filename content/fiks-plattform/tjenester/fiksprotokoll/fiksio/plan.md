---
title: Fiks Plan
date: 2022-06-16
---

> Tjenesten er under utvikling/testing/pilotering

Fiks Plan er en asynkron protokoll over Fiks IO eller andre transportmekanismer med meldinger på json-format.
For implementasjonseksempler, brukerhistorier og teknisk dokumentasjon les mer i wiki på github repoet [gi-plan](https://github.com/ks-no/gi-plan/wiki).

## Meldinger

Hver melding består av en zip fil ASIC-E som inneholder `payload.json` og eventuelle tilhørende vedlegg.
Hver melding kan ikke overskride 5GB.

### .NET bibliotek og prosjekter

**Prosjekter og evt nuget pakker:**

| Type                               | Nuget                                                                                                           | Github                                                       |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------| 
| Json skjema og spesifikasjonen     | -                                                                                                               | https://github.com/ks-no/fiks-plan-specification             |
| Modeller basert på spesifikasjonen | https://www.nuget.org/packages/KS.Fiks.Plan.Client                                                                                                                | https://github.com/ks-no/fiks-plan-client-dotnet             |
| Wiki, modeller og eskempelklient   | -                                                                                                               | https://github.com/ks-no/gi-plan                             |
| Fiks protokoll validator           | -                                                                                                               | https://github.com/ks-no/fiks-protokoll-validator            |

**Json skjema**

Finnes i repoet: https://github.com/ks-no/fiks-plan-specification
Det kommer ny nuget pakke som bygges på denne spesifikasjonen.

**Wiki og eksempelklient**

Her finnes Wiki, issues og eksempelklient for denne protokollen.
For dokumentasjon se i dette repoet.

**Modeller basert på spesifikasjonen**

Produserer en nuget pakke som kan brukes for modeller og som leverer json skjema.
Denne skal fases ut og erstattes av en ny som henter og bygger modellene basert på spesifikasjons prosjektet.

**Fiks protokoll validator**

Dette er en applikasjon som kjører i KS sitt testmiljø. Med denne kan man teste protokollene mot sitt eget arkiv-testmiljø ved å sende ferdige meldinger med statisk json innhold til den aktuelle FIKS-IO kontoen.



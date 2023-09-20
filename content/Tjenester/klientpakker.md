---
title: Distribuerte pakker og klienter - risikovurdering
date: 2023-09-19
alias: [/fiks-plattform/tjenester/distribuertepakker/]
---

## Kort beskrivelse

KS leverer pakker for Java og .NET gjennom henholdsvis Maven Central og Nuget.org for flere av tjenestene våre.
Eskempelvis Fiks-IO klient, Maskinporten klient og pakker til protokollene Fiks-Arkiv, Fiks-Plan osv. 


## Risikovurderinger og tiltak

Det er gjort vurderinger og tiltak for å sikre pakkene som leveres.
Risiko kan ligge i kompromitterte pakker i de sentraliserte repositories. 
Dette kan hende som resultat av:
- Tredjepart laster opp kompromitterte pakker til Maven Central eller Nuget.org som KS
- At man har et kompromittert byggemiljø som leverer kompromitterte pakker
- Avhengige pakker, tredjepart pakker, som følger med KS sine pakker er komprimettert og følger med ut med KS sine pakker


### Maven

_Kommer_

### Nuget

For å mitigere risiko for kompromitterte nuget pakker til nuget.org gjøres følgende

- Nuget pakker signeres med KS sitt virksomhetssertifikat på byggeserver
- Opplasting til nuget.org gjøres vha KS sitt virksomhetssertifikat
- Nuget pakkene på nuget.org er publisert med KS som eier
- Byggeserver er beskyttet
- Virksomhetssertifikat er trygt lagret på byggeserver
- Statisk verktøy som følger med på avhengigheter og manuell gjennomgang ved oppdateringer av pakkene


  
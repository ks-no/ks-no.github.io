---
title: Fiks Arkiv
date: 2021-07-29
---

> Tjenesten er under utvikling/testing/pilotering

Fiks Arkiv er en aynkron protokoll over Fiks IO eller andre transportmekanismer for å søke, arkivere og hente data fra et arkiv.

#Meldinger
Hver melding består av en zip fil ASIC-E som inneholder arkivmelding.xml eller sok.xml??? og tilhørende vedlegg som er definert i xml filen.
Hver melding kan ikke overskride 5GB.

#Søk etter data


#Arkivering
For å arkivere data må en bruke arkivmelding.xml Denne er definert her.(link)
TTL på en arkviering kan gjerne settes til 1time til flere dager. 

Når arkivering er mottat kommer en mottat melding tilbake.
Når arkviering er arkivert til arkivet kommer en kvitteringsmelding tilbake.

#Hente data
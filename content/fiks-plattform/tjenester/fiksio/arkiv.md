---
title: Fiks Arkiv
date: 2021-07-29
---

> Tjenesten er under utvikling/testing/pilotering

Fiks Arkiv er en asynkron protokoll over Fiks IO eller andre transportmekanismer for å søke, arkivere og hente data fra et arkiv.
For implementasjonseksempler, brukerhistorier og teknisk dokumentasjon les mer på github repoet [fiks-arkiv](https://github.com/ks-no/fiks-arkiv).


#Meldinger
Hver melding består av en zip fil ASIC-E som inneholder `arkivmelding.xml` eller `sok.xml` og tilhørende vedlegg som er definert i xml filen.
Hver melding kan ikke overskride 5GB.

KS har gjort tilgjengelig nuget pakken (.NET) `KS.Fiks.IO.Arkiv.Client` for at man skal enklere kunne bygge `arkivmelding.xml`. Koden er tilgjengelig på github [her]() og tilgjengelig for bruk i prosjekter på [nuget.org](https://www.nuget.org/packages/KS.Fiks.IO.Arkiv.Client/).

Et tilsvarende bibliotek for Java kommer senere.

For mer informasjon rundt meldingsformatet **arkivmelding** kan man lese om definisjonen [her](https://docs.digdir.no/eformidling_nm_arkivmeldingen.html) hos Digdir.

#Søk etter data
Kommer

#Arkivering
For å arkivere data må en bruke meldingsformatet `arkivmelding.xml`. 
TTL på en arkivering kan gjerne settes til 1 time eller til flere dager.
Når arkivering er mottat i arkiv skal det komme en mottat melding tilbake av typen `no.ks.fiks.gi.arkivintegrasjon.mottatt.v1`.
Når arkivering er arkivert til arkivet skal det komme en kvitteringsmelding tilbake av typen `no.ks.fiks.gi.arkivintegrasjon.kvittering.v1`.

Meldingstyper er tilgjengelig i klient biblioteket på Github [her](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Models/ArkivintegrasjonMeldingTypeV1.cs).

#Hente data

Kommer

#Standardmeldingstyper
Som svar kan man få andre standardmeldinger. 
Feilmeldingstyper for FIKS-IO plattformen er tilgjengelig i nuget pakken `KS.Fiks.IO.Client` for .NET. Se koden på  [github](https://github.com/ks-no/fiks-io-client-dotnet/blob/master/KS.Fiks.IO.Client/Models/Feilmelding/FeilmeldingMeldingTypeV1.cs) eller hent pakken på [nuget](https://www.nuget.org/packages/KS.Fiks.IO.Client/).
Tilsvarende feilmeldingstyper er også tilgjengelig for Java i biblioteket `fiks-io-klient-java`. Se koden på [github](https://github.com/ks-no/fiks-io-klient-java/blob/master/src/main/java/no/ks/fiks/io/client/model/feilmelding/FeilmeldingMeldingTypeV1.java).

##Tidsavbrudd
Hvis utløpstiden for en melding løper ut uten at meldingen er behandlet av mottaker vil man få en melding av meldingstypen `no.ks.fiks.kvittering.tidsavbrudd` tilbake.
Denne meldingstypen bør håndteres av alle klienter for å følge opp meldinger som ikke er mottatt. Disse meldingene inneholder ingen innhold, men kun headere deriblant `svar-til` som vil være en referanse til den opprinnelige meldingen (melding-id).

##Ugyldig forespørsel
Hvis noe er galt med forespørselen, altså den er ugyldig, så skal mottaker sende en `no.ks.fiks.kvittering.ugyldigforespørsel.v1` tilbake til sender.

##Serverfeil
Ved serverfeil hos mottaker skal det sendes en `no.ks.fiks.kvittering.serverfeil.v1` tilbake til sender.

#Testing
Det er opprettet en test-applikasjon, **fiks-protokoll-validator**, som kjører i KS sitt testmiljø. Med denne kan man teste protokollene mot sitt eget testmiljø ved å sende ferdige meldinger til den aktuelle FIKS-IO kontoen. 
Fiks-protokoll-validator vil validere svaret den får tilbake via FIKS-IO og gi en pekepinn på om implementasjon fungerer som det skal.
Applikasjonen er kun tilgjengelig i KS test-miljø: https://forvaltning.fiks.test.ks.no/fiks-validator/#/

Koden for validatoren er tilgjengelig på [github](https://github.com/ks-no/fiks-protokoll-validator). 










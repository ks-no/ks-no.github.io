---
title: Fiks Arkiv
date: 2021-07-29
---

> Tjenesten er under utvikling/testing/pilotering

Fiks Arkiv er en asynkron protokoll over Fiks IO eller andre transportmekanismer for å søke, arkivere og hente data fra et arkiv.
For implementasjonseksempler, brukerhistorier og teknisk dokumentasjon les mer i wiki på github repoet [fiks-arkiv](https://github.com/ks-no/fiks-arkiv/wiki).


## Meldinger
Hver melding består av en zip fil ASIC-E som inneholder `arkivmelding.xml` eller `sok.xml` og tilhørende vedlegg som er definert i xml filen.
Hver melding kan ikke overskride 5GB.

KS har gjort tilgjengelig nuget pakken (.NET) `KS.Fiks.IO.Arkiv.Client` for at man skal enklere kunne bygge `arkivmelding.xml` vha . Koden er tilgjengelig på github [her](https://github.com/ks-no/fiks-arkiv-client-dotnet) og tilgjengelig for bruk i prosjekter på [nuget.org](https://www.nuget.org/packages/KS.Fiks.IO.Arkiv.Client/).

Et tilsvarende bibliotek for Java kommer senere.

For mer informasjon rundt meldingsformatet **arkivmelding** kan man lese om definisjonen [her](https://docs.digdir.no/eformidling_nm_arkivmeldingen.html) hos Digdir.
XSD schema for meldingsformatene er tilgjengelig nuget i pakken `KS.Fiks.IO.Arkiv.Client` og kan også finnes på github [her](https://github.com/ks-no/fiks-arkiv-client-dotnet/tree/main/KS.Fiks.IO.Arkiv.Client/Schema)

## Arkivering
**Meldingstyper:** 

|   Type    | Navn |
| ----------- | ----------- |
| Arkiver melding      | `no.ks.fiks.arkiv.v1.arkivmelding`       |
| Mottatt melding      | `no.ks.fiks.arkiv.v1.mottatt`       |
| Kvittering på arkivering  | `no.ks.fiks.arkiv.v1.kvittering`        |

For å arkivere data må en bruke meldingsformatet `arkivmelding.xml`. Se xsd schema [**arkivmelding.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/arkivmelding.xsd) for definsjon av meldingsformatet. 

### Time To Live (TTL)
TTL på en arkivering kan gjerne settes til 1 time eller til flere dager. Man bør sette en fornuftig TTL basert på hvert use-case. 

Husk også at det er viktig å ikke forsøke å sende en melding på nytt **før** TTL er gått ut pluss litt ekstra tid. Dette er for å ikke fylle køen med duplikater. Hvis TTL går ut på tid og melding ikke har blitt hentet av mottaker får man en `tidsavbrudd` melding tilbake.

### Mottatt og kvittering
Når arkivering er mottat i arkiv skal det komme en mottat melding tilbake av typen `no.ks.fiks.arkiv.v1.mottatt`.
Når arkivering er arkivert til arkivet skal det komme en **arkivmelding** tilbake i meldingsformatet `arkivmelding-kvittering.xml` av typen `no.ks.fiks.arkiv.v1.kvittering`. Se [**arkivmeldingKvittering.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/arkivmeldingKvittering.xsd) for definisjon av meldingsformatet på kvitteringsmelding. 

Meldingstyper og schema xsd-filer er tilgjengelig i klient biblioteket på Github [her](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Models/ArkivintegrasjonMeldingTypeV1.cs).

![arkivmelding_med_kvittering_ok](/images/arkivmelding_med_kvittering_ok.png "Arkivmelding med kvittering")

## Søk etter data
**Meldingstyper:** 

|   Type    | Navn |
| ----------- | ----------- |
| Søk melding      | `no.ks.fiks.arkiv.v1.sok`       |
| Søkeresultat utvidet  | `no.ks.fiks.arkiv.v1.sok.resultat.utvidet`        |
| Søkeresultat minimum  | `no.ks.fiks.arkiv.v1.sok.resultat.minimum`        |
| Søkeresultat nøkler  | `no.ks.fiks.arkiv.v1.sok.resultat.noekler`        |

Meldingsformatet for søk er definert i xsd schema [**sok.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/sok.xsd). I meldingsformatet **sok.xml** kan man definere om man ønsker et resultat tilbake av typen utvidet, minimum eller noekler.

**Søkeresultat utvidet**:

Hvis søk forespørsel har satt *responsType* = *"utvidet"*  kan søket returnere et utvidet resultat med maksimalt mengde felter tilgjengelig gjennom søk. Se [**sokeresultatUtvidet.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/sokeresultatUtvidet.xsd) for definisjon av returmelding.

**Søkeresultat minimum**:

Hvis søk forespørsel har satt *responsType* = *"minimum"* kan søket returnere et mer begrenset resultat tilgjengelig gjennom søk. Se [**sokeresultatMinimum.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/sokeresultatMinimum.xsd)

**Søkeresultat nøkler**:

Hvis søk forespørsel har satt *responsType* = *"noekler"* kan søket returnere bare tilgjengelige nøkler. Se [**sokeresultatNoekler.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/sokeresultatNoekler.xsd)

## Hente data
**Meldingstyper:**

|   Type    | Navn |
| ----------- | ----------- |
| Hent mappe      | `no.ks.fiks.arkiv.v1.mappe.hent`       |
| Hent journalpost      | `no.ks.fiks.arkiv.v1.journalpost.hent`       |
| Hent dokumentfil  | `no.ks.fiks.arkiv.v1.dokumentfil.hent`        |
| Hent mappe resultat      | `no.ks.fiks.arkiv.v1.mappe.hent.resultat`       |
| Hent journalpost resultat      | `no.ks.fiks.arkiv.v1.journalpost.hent.resultat`       |
| Hent dokumentfil resultat      | `no.ks.fiks.arkiv.v1.dokumentfil.hent.resultat`       |

**Hent mappe**:

Meldingsformatet for hent mappe er definert i xsd schema [**mappeHent.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/mappeHent.xsd). 
Resultatet skal sendes tilbake som typen `no.ks.fiks.arkiv.v1.mappe.hent.resultat`. 

**Hent journalpost**:

Meldingsformatet for hent journalpost er definert i xsd schema [**journalpostHent.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/journalpostHent.xsd).
Resultatet skal sendes tilbake som typen `no.ks.fiks.arkiv.v1.journalpost.hent.resultat`.

**Hent dokumentfil**:

Meldingsformatet for hent dokumentfil er definert i xsd schema [**dokumentfilHent.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/dokumentfilHent.xsd).
Resultatet skal sendes tilbake som typen `no.ks.fiks.arkiv.v1.dokumentfil.hent.resultat`.


## Standardmeldingstyper
Som svar kan man få andre standardmeldinger. 
Feilmeldingstyper for FIKS-IO plattformen er tilgjengelig i nuget pakken `KS.Fiks.IO.Client` for .NET. Se koden på  [github](https://github.com/ks-no/fiks-io-client-dotnet/blob/master/KS.Fiks.IO.Client/Models/Feilmelding/FeilmeldingMeldingTypeV1.cs) eller hent pakken på [nuget](https://www.nuget.org/packages/KS.Fiks.IO.Client/).
Tilsvarende feilmeldingstyper er også tilgjengelig for Java i biblioteket `fiks-io-klient-java`. Se koden på [github](https://github.com/ks-no/fiks-io-klient-java/blob/master/src/main/java/no/ks/fiks/io/client/model/feilmelding/FeilmeldingMeldingTypeV1.java).

### Tidsavbrudd
Hvis utløpstiden for en melding løper ut uten at meldingen er behandlet av mottaker vil man få en melding av meldingstypen `no.ks.fiks.kvittering.tidsavbrudd` tilbake.
Denne meldingstypen bør håndteres av alle klienter for å følge opp meldinger som ikke er mottatt. Disse meldingene inneholder ingen innhold, men kun headere deriblant `svar-til` som vil være en referanse til den opprinnelige meldingen (melding-id).

**NB:**

![arkivmelding_med_tidsavbrudd](/images/arkivmelding_med_tidsavbrudd.png "Arkivmelding med tidsavbrudd")

### Ugyldig forespørsel
Hvis noe er galt med forespørselen, altså den er ugyldig, så skal mottaker sende en `no.ks.fiks.kvittering.ugyldigforespørsel.v1` tilbake til sender.

![arkivmelding_med_ugyldigforesporsel](/images/arkivmelding_med_ugyldigforesporsel.png "Arkivmelding med ugyldig forespørsel")

### Serverfeil
Ved serverfeil hos mottaker skal det sendes en `no.ks.fiks.kvittering.serverfeil.v1` tilbake til sender.

## Testing
Det er opprettet en test-applikasjon, **fiks-protokoll-validator**, som kjører i KS sitt testmiljø. Med denne kan man teste protokollene mot sitt eget testmiljø ved å sende ferdige meldinger til den aktuelle FIKS-IO kontoen. 
Fiks-protokoll-validator vil validere svaret den får tilbake via FIKS-IO og gi en pekepinn på om implementasjon fungerer som det skal.
Applikasjonen er kun tilgjengelig i KS test-miljø: https://forvaltning.fiks.test.ks.no/fiks-validator/#/

Koden for validatoren er tilgjengelig på [github](https://github.com/ks-no/fiks-protokoll-validator). 










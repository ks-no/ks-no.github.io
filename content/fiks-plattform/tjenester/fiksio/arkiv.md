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

### Asynkrone meldinger og retry
Siden denne protokollen er asynkron betyr det at man må ta forbehold om at man kanskje ikke får svar på en melding som ble sendt. 
Det kan være mange ulike årsaker til dette som f.eks. at mottaker midlertidig feilet ved persistering eller andre tekniske feil. 
Men det kan også være at mottaker faktisk har lagret arkivmelding som den skal, men det er mottat og kvitteringsmelding tilbake til avsender som aldri kom fram. 

Avsender må da velge om man skal gjøre nytt forsøk på å sende melding. 
Når man sender en melding til Fiks IO så vil meldingen få en unik id hver gang. 
Dermed kan det i noen tilfeller kanskje være vanskelig for mottaker å vite at dette er en melding som sendes på nytt. 

Dette løses ved at meldinger til Fiks IO kan gis en id med navnet **klientMeldingId** for å markere at det er en unik melding fra avsender, som man kan gjenbrukes ved nytt forsøk.
Mottaker kan da sende mottatt og kvittering på nytt.


Det kan være lurt at man tar med seg noen kjøreregler for sending og retry av meldinger:
- Ha et maks antall forsøk på å sende meldinger på nytt
- Ikke forsøk å sende en melding på nytt før TTL har gått ut. Gjerne med litt ekstra tid for å ikke "plage" mottaker.
- Bruk klientMeldingId på alle meldinger. Både ved første forsøk og retry. Dette kan gjøre det lettere å gjenkjenne duplikate meldinger hos mottaker.


## Arkivering
**Meldingstyper:** 

|   Type    | Navn |
| ----------- | ----------- |
| Arkiver melding      | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding`       |
| Mottatt melding      | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.mottatt`       |
| Kvittering på arkivering  | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.kvittering`        |

For å arkivere data må en bruke meldingsformatet `arkivmelding.xml`. Se xsd schema [**arkivmelding.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/arkivmelding.xsd) for definsjon av meldingsformatet.

### Begrensninger og regler for arkivering
- Arkivmelding støtter ikke å registrere flere mapper i et hierarki, altså mapper i mapper, i en enkelt arkivmelding. Registrering av ny undermappe må da registreres hver for seg. Mapper kan altså bare referere til eksisterende mappe, som må da ha vært opprettet tidligere.
- En foreldermappe kan ikke inneholde registreringer. Altså en mappe som inneholder andre mapper skal bare inneholde mapper.

### Time To Live (TTL)
TTL på en arkivering kan gjerne settes til minutter, timer eller til flere dager. Man bør sette en fornuftig TTL basert på hvert use-case. 

Husk også at det er viktig å ikke forsøke å sende en melding på nytt **før** TTL er gått ut pluss litt ekstra tid. Dette er for å ikke fylle køen med duplikater. Hvis TTL går ut på tid og melding ikke har blitt hentet av mottaker får man en `tidsavbrudd` melding tilbake. se [Tidsavbrudd](../#tidsavbrudd)

### Mottatt og kvittering
Når arkivering melding er mottatt skal mottaker persistere meldingen, sende `ack` tilbake til Fiks-IO og så sende melding tilbake av typen `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.mottatt`. Sending av `ack` tilbake til Fiks-IO sørger for at meldingen blir tatt bort fra køen.   
Når arkivering er arkivert til arkivet skal det komme en **arkivmelding** tilbake i meldingsformatet `arkivmelding-kvittering.xml` av typen `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.kvittering`. Se [**arkivmeldingKvittering.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/arkivmeldingKvittering.xsd) for definisjon av meldingsformatet på kvitteringsmelding. 

Meldingstyper og schema xsd-filer er tilgjengelig i klient biblioteket på Github [her](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Models/ArkivintegrasjonMeldingTypeV1.cs).

![arkivmelding_med_kvittering_ok](/images/arkivmelding_med_kvittering_ok.png "Arkivmelding med kvittering")

## Søk etter data
**Meldingstyper:** 

|   Type    | Navn |
| ----------- | ----------- |
| Søk melding      | `no.ks.fiks.arkiv.v1.innsyn.sok`       |
| Søkeresultat utvidet  | `no.ks.fiks.arkiv.v1.innsyn.sok.resultat.utvidet`        |
| Søkeresultat minimum  | `no.ks.fiks.arkiv.v1.innsyn.sok.resultat.minimum`        |
| Søkeresultat nøkler  | `no.ks.fiks.arkiv.v1.innsyn.sok.resultat.noekler`        |

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
| Hent mappe      | `no.ks.fiks.arkiv.v1.innsyn.mappe.hent`       |
| Hent journalpost      | `no.ks.fiks.arkiv.v1.innsyn.journalpost.hent`       |
| Hent dokumentfil  | `no.ks.fiks.arkiv.v1.innsyn.dokumentfil.hent`        |
| Hent mappe resultat      | `no.ks.fiks.arkiv.v1.innsyn.mappe.hent.resultat`       |
| Hent journalpost resultat      | `no.ks.fiks.arkiv.v1.innsyn.journalpost.hent.resultat`       |
| Hent dokumentfil resultat      | `no.ks.fiks.arkiv.v1.innsyn.dokumentfil.hent.resultat`       |

**Hent mappe**:

Meldingsformatet for hent mappe er definert i xsd schema [**mappeHent.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/mappeHent.xsd) og sendes som meldingstypen `no.ks.fiks.arkiv.v1.innsyn.mappe.hent`. 
Resultatet skal sendes tilbake som meldingstypen `no.ks.fiks.arkiv.v1.mappe.hent.resultat` og formatet er definert i xsd schema  [**mappeHentResultat.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/mappeHentResultat.xsd). 

**Hent journalpost**:

Meldingsformatet for hent journalpost er definert i xsd schema [**journalpostHent.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/journalpostHent.xsd) og sendes som meldingstypen no.ks.fiks.arkiv.v1.innsyn.journalpost.hent.
Resultatet skal sendes tilbake som meldingstypen `no.ks.fiks.arkiv.v1.journalpost.hent.resultat` og formatet er definert i xsd schema  [**journalpostHentResultat.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/journalpostHentResultat.xsd)..

**Hent dokumentfil**:

Meldingsformatet for hent dokumentfil er definert i xsd schema [**dokumentfilHent.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/dokumentfilHent.xsd) og sendes som meldingstypen no.ks.fiks.arkiv.v1.innsyn.dokumentfil.hent.
Resultatet skal sendes tilbake som typen `no.ks.fiks.arkiv.v1.dokumentfil.hent.resultat`. Merk at det er ikke noe xsd schema for resultat da det ikke er noe behov for meta-data for dokumenfilen. Dokumentfilen kommer som payload i Fiks-IO meldingen med meldingsypen `no.ks.fiks.arkiv.v1.dokumentfil.hent.resultat`.

## Oppdatering
**Meldingstyper:**

|   Type    | Navn |
| ----------- | ----------- |
| Arkivmelding oppdatering      | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.oppdater`       |
| Arkivmelding oppdatering kvittering      | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.oppdater.kvittering`       |
| Mottatt melding      | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.mottatt`       |

**Arkivmelding oppdatering**:

Meldingsformatet for arkivmelding oppdatering er definert i xsd schema [**arkivmeldingOppdatering.xsd**](https://github.com/ks-no/fiks-arkiv-client-dotnet/blob/main/KS.Fiks.IO.Arkiv.Client/Schema/arkivmeldingOppdatering.xsd) og sendes som meldingstypen `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.oppdater`.

### Mottatt og kvittering
Når arkivering oppdatering melding er mottatt skal mottaker persistere meldingen, sende `ack` tilbake til Fiks-IO og så sende melding tilbake av typen `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.mottatt`. Sending av `ack` tilbake til Fiks-IO sørger for at meldingen blir tatt bort fra køen.   
Når oppdatering er gjennomført i arkivet skal det komme en kvittering tilbake uten innhold, av typen `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.oppdatering.kvittering`. 

## Standardmeldingstyper
Som svar kan man få andre standardmeldinger. 
Feilmeldingstyper for FIKS-IO plattformen er tilgjengelig i nuget pakken `KS.Fiks.IO.Client` for .NET. Se koden på  [github](https://github.com/ks-no/fiks-io-client-dotnet/blob/master/KS.Fiks.IO.Client/Models/Feilmelding/FeilmeldingMeldingTypeV1.cs) eller hent pakken på [nuget](https://www.nuget.org/packages/KS.Fiks.IO.Client/).
Tilsvarende feilmeldingstyper er også tilgjengelig for Java i biblioteket `fiks-io-klient-java`. Se koden på [github](https://github.com/ks-no/fiks-io-klient-java/blob/master/src/main/java/no/ks/fiks/io/client/model/feilmelding/FeilmeldingMeldingTypeV1.java).

### Tidsavbrudd
Hvis utløpstiden for en melding løper ut vil man få en melding av meldingstypen `no.ks.fiks.kvittering.tidsavbrudd` tilbake. Det betyr at mottaker ikke har markert meldingen som mottatt til Fiks-IO (ack).
Denne meldingstypen bør håndteres av alle klienter for å følge opp meldinger som ikke er mottatt. Disse meldingene inneholder ingen innhold, men kun headere deriblant `svar-til` som vil være en referanse til den opprinnelige meldingen (melding-id).

se [Tidsavbrudd](../#tidsavbrudd)

**NB:**

![arkivmelding_med_tidsavbrudd](/images/arkivmelding_med_tidsavbrudd.png "Arkivmelding med tidsavbrudd")

### Ugyldig forespørsel
Hvis noe er galt med forespørselen, altså den er ugyldig, så skal mottaker sende en `no.ks.fiks.kvittering.ugyldigforespoersel.v1` tilbake til sender. Json [schema](https://github.com/ks-no/fiks-io-client-dotnet/blob/master/KS.Fiks.IO.Client/Schema/no.ks.fiks.kvittering.ugyldigforespoersel.v1.schema.json) følger med i .net pakken for Fiks-IO-client. 

![arkivmelding_med_ugyldigforesporsel](/images/arkivmelding_med_ugyldigforesporsel.png "Arkivmelding med ugyldig forespørsel")

### Serverfeil
Ved serverfeil hos mottaker skal det sendes en `no.ks.fiks.kvittering.serverfeil.v1` tilbake til sender. Json [schema](https://github.com/ks-no/fiks-io-client-dotnet/blob/master/KS.Fiks.IO.Client/Schema/no.ks.fiks.kvittering.serverfeil.v1.schema.json) følger med i .net pakken for Fiks-IO-client.

## Testing
Det er opprettet en test-applikasjon, **fiks-protokoll-validator**, som kjører i KS sitt testmiljø. Med denne kan man teste protokollene mot sitt eget testmiljø ved å sende ferdige meldinger til den aktuelle FIKS-IO kontoen. 
Fiks-protokoll-validator vil validere svaret den får tilbake via FIKS-IO og gi en pekepinn på om implementasjon fungerer som det skal.
Applikasjonen er kun tilgjengelig i KS test-miljø: https://forvaltning.fiks.test.ks.no/fiks-validator/#/

Koden for validatoren er tilgjengelig på [github](https://github.com/ks-no/fiks-protokoll-validator). 










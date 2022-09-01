---
title: Fiks Arkiv
date: 2021-07-29
---

> Tjenesten er under utvikling/testing/pilotering

Fiks Arkiv er en asynkron protokoll over Fiks IO eller andre transportmekanismer for å søke, arkivere og hente data fra et arkiv. Fiks Protokoll benyttes for meldingstype definisjon på konto.
For implementasjonseksempler, brukerhistorier og teknisk dokumentasjon les mer i wiki på github repoet [fiks-arkiv](https://github.com/ks-no/fiks-arkiv/wiki).

## Meldinger

Hver melding består av en zip fil ASIC-E som inneholder `arkivmelding.xml` eller `sok.xml` og tilhørende vedlegg som er definert i xml filen.
Hver melding kan ikke overskride 5GB.

### Meldingsformat og skjema
For mer informasjon rundt meldingsformatet **arkivmelding** kan man lese om definisjonen [her](https://docs.digdir.no/eformidling_nm_arkivmeldingen.html) hos Digdir.
XSD skjema for meldingsformatene er tilgjengelig for nedlasting på github prosjektet [fiks-arkiv-specification](https://github.com/ks-no/fiks-arkiv-specification) eller i bibliotek for .NET og Java. Dette spesifikasjonsprosjektet brukes som felles kilde for bygging av bibliotek/moduler for .NET og Java.

### .NET bibliotek og prosjekter

**Prosjekter og evt nuget pakker:**

| Type                                | Nuget                                                                                                            | Github                                                          |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------| 
| XSD skjema, protokoll spesifikasjon | -                                                                                                                | https://github.com/ks-no/fiks-arkiv-specification               |
| Modeller basert på XSD skjema       | [`KS.Fiks.Arkiv.Models.V1`](https://www.nuget.org/packages/KS.Fiks.Arkiv.Models.V1/)                             | https://github.com/ks-no/fiks-arkiv-models-dotnet               |
| Forenklet arkivering                | [`KS.Fiks.Arkiv.Forenklet.Arkivering.V1`](https://www.nuget.org/packages/KS.Fiks.Arkiv.Forenklet.Arkivering.V1/) | https://github.com/ks-no/fiks-arkiv-forenklet-arkivering-dotnet |
| Fiks protokoll validator            | -                                                                                                                | https://github.com/ks-no/fiks-protokoll-validator               |
| Valideringstester                   | -                                                                                                                | https://github.com/ks-no/fiks-arkiv-integration-tests-dotnet    |

**Modeller og XSD skjema**

KS har gjort tilgjengelig nuget pakken `KS.Fiks.Arkiv.Models.V1` som inneholder modeller for at man skal enklere kunne bygge meldingene i henhold til spesifikasjon. 
Modellene er generert av XSD skjema fra github prosjektet [fiks-arkiv-specification](https://github.com/ks-no/fiks-arkiv-specification). XSD skjemane følger også med i pakken. Koden er tilgjengelig på github [her](https://github.com/ks-no/fiks-arkiv-models-dotnet/) og er tilgjengelig for nedlasting og bruk i prosjekter på [nuget.org](https://www.nuget.org/packages/KS.Fiks.Arkiv.Models.V1/).

**Forenklet arkivering**

*Denne pakken er uferdig og vil bli utbedret når V1 av protokollen er ferdig lansert*

Dette er en nuget-pakke for "forenklet arkivering", `KS.Fiks.Arkiv.Forenklet.Arkivering.V1`, som inneholder forenklete metoder for å bygge arkivmelding for diverse brukstilfeller. Denne bruker modellene fra `KS.Fiks.Arkiv.Models.V1` til byggingen av arkivmelding. Koden er tilgjengelig på github [her](https://github.com/ks-no/fiks-arkiv-forenklet-arkivering-dotnet) og er også tilgjengelig for bruk i prosjekter på [nuget.org](https://www.nuget.org/packages/KS.Fiks.Arkiv.Forenklet.Arkivering.V1/)

**Fiks protokoll validator**

Dette er en applikasjon som kjører i KS sitt testmiljø. Med denne kan man teste protokollene mot sitt eget arkiv-testmiljø ved å sende ferdige meldinger med statisk XML innhold til den aktuelle FIKS-IO kontoen.

**Valideringstester**

Dette prosjekter inneholder valideringstester (integrasjonstester) som tester at et arkiv som har implementert Fiks Arkiv protokollen fungerer som forventet i meldings-utvekslinger. F.eks. at arkivet kan ta i mot og lagre en ny journalpost, oppdatere journalposten, og levere den oppdaterte journalposten på en hent-melding.
Disse testene kan gjennomføre flere meldingsutvekslinger og steg enn `Fiks protokoll validator` som kun tester å sende en melding og så sjekker svaret.

Testene kjøres ved at man laster ned prosjektet og kjører de lokalt. 

Github prosjektet for validatortestene er [her](https://github.com/ks-no/fiks-arkiv-integration-tests-dotnet) og kan lastes ned og brukes for testing. Det oppfordres til å bidra med enda flere tester. 

### Java bibliotek og prosjekter

**Maven**

|   Type    | Navn | Github
| ----------- | ----------- | ----------- | 
| Modeller og XSD skjema | [`fiks-arkiv`](https://github.com/ks-no/fiks-arkiv-client-java)       | https://github.com/ks-no/fiks-arkiv-client-java |
| Forenklet arkivering  | [`fiks-arkiv-forenklet-arkivering`](https://search.maven.org/artifact/no.ks.fiks/fiks-arkiv-forenklet-arkivering)  | https://github.com/ks-no/fiks-arkiv-client-java |

Tilsvarende som for .NET finnes det tilgjengelige moduler på Maven Central. Prosjektet er tilgjengelig på github [her](https://github.com/ks-no/fiks-arkiv-client-java).

**Modeller og XSD skjema**

Modulen [`fiks-arkiv-api`](https://search.maven.org/artifact/no.ks.fiks/fiks-arkiv-api) inneholder autogenerert typer, definert i skjema prosjektet [`fiks-arkiv-specification`](https://github.com/ks-no/fiks-arkiv-specification). XSD skjema fra [`fiks-arkiv-specification`](https://github.com/ks-no/fiks-arkiv-specification) er inkludert i jar under schemas.v1

**Forenklet arkivering**

Modulen [`fiks-arkiv-forenklet-arkivering`](https://search.maven.org/artifact/no.ks.fiks/fiks-arkiv-forenklet-arkivering) tilsvarer pakken i .NET for "forenklet arkivering" og inneholder buildere for forenklet oppbygging av gyldig arkivmelding. XSD skjema fra [fiks-arkiv-specification](https://github.com/ks-no/fiks-arkiv-specification) er inkludert i jar under schemas.v1

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
- Ikke forsøk å sende en melding på nytt med en gang. Gi det litt tid for å ikke "plage" mottaker.
- Bruk klientMeldingId på alle meldinger. Både ved første forsøk og retry. Dette kan gjøre det lettere å gjenkjenne duplikate meldinger hos mottaker.

### Ack

Når en melding er mottatt skal mottaker persistere meldingen og sende `ack` tilbake til Fiks-IO. Sending av `ack` tilbake til Fiks-IO sørger for at meldingen blir tatt bort fra køen.

En `ack` melding må ikke forveksles med `mottatt`meldingene som sendes tilbake i noen tilfeller. En `mottatt`melding er en melding tilbake til avsender, en `ack`melding er **kun** en beskjed tilbake til køen om å fjerne meldingen.

Hvis `ack` for en melding uteblir vil meldingen bli værende på køen inntil den er blitt hentet 3 ganger uten å få en `ack` tilbake. Da vil Fiks-IO sende en `no.ks.fiks.io.feilmelding.serverfeil.v1` melding tilbake til avsender. Med andre ord er det viktig at man sender `ack` når man vellykket har hentet en melding. 

OBS: Dette erstatter tidligere TTL-håndtering på Fiks-IO køene. Det vil ikke lenger sendes noen `tidsavbrudd` meldinger basert på TTL. 


## Arkivering

**Meldingstyper:**

|   Type    | Navn |
| ----------- | ----------- |
| Arkiver melding      | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding`       |
| Mottatt melding      | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.mottatt`       |
| Kvittering på arkivering  | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.kvittering`        |

For å arkivere data må en bruke meldingsformatet `arkivmelding.xml`. Se xsd schema [**arkivmelding.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/arkivmelding.xsd) for definsjon av meldingsformatet.

### Begrensninger og regler for arkivering

- Arkivmelding støtter ikke å registrere flere mapper i et hierarki, altså mapper i mapper, i en enkelt arkivmelding. Registrering av ny undermappe må da registreres hver for seg. Mapper kan altså bare referere til eksisterende mappe, som må da ha vært opprettet tidligere.
- En foreldermappe kan ikke inneholde registreringer. Altså en mappe som inneholder andre mapper skal bare inneholde mapper.

### Mottatt og kvittering

Hvis meldingen er gyldig som arkivmelding skal man så sende melding tilbake av typen `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.mottatt`.
Når arkivering er arkivert til arkivet skal det komme en **arkivmelding** tilbake i meldingsformatet `arkivmelding-kvittering.xml` av typen `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.kvittering`. Se [**arkivmeldingKvittering.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/arkivmeldingKvittering.xsd) for definisjon av meldingsformatet på kvitteringsmelding.

![arkivmelding_med_kvittering_ok](/images/arkivmelding_med_kvittering_ok.png "Arkivmelding med kvittering")

### Feilmeldinger for arkivmelding
Hvis arkivmeldingen ikke er gyldig, f.eks at den ikke validerer i henhold til schema, så sender man en `no.ks.fiks.arkiv.v1.feilmelding.ugyldigforespoersel` melding tilbake. Ved interne feil som gjør at man ikke får håndtert meldingen sendes `no.ks.fiks.arkiv.v1.feilmelding.serverfeil` tilbake.
Les mer om disse feilmeldingene lenger nede under [feilmeldingstyper](#Feilmeldingstyper)


## Søk etter data

**Meldingstyper:**

|   Type    | Navn |
| ----------- | ----------- |
| Søk melding      | `no.ks.fiks.arkiv.v1.innsyn.sok`       |
| Søkeresultat utvidet  | `no.ks.fiks.arkiv.v1.innsyn.sok.resultat.utvidet`        |
| Søkeresultat minimum  | `no.ks.fiks.arkiv.v1.innsyn.sok.resultat.minimum`        |
| Søkeresultat nøkler  | `no.ks.fiks.arkiv.v1.innsyn.sok.resultat.noekler`        |

Meldingsformatet for søk er definert i xsd schema [**sok.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/sok.xsd). 
I meldingsformatet **sok.xml** definerer man hva man søker etter, hvilke returobjekter (journalposter eller mapper f.eks.) man ønsker, sortering og responstype.

### Bbox
For søk på saksmappe kan man søke på saker med koordinater innenfor et område ved hjelp av søkefelt typen `bbox`.
Når man bruker bbox til søk så setter man to koordinater, nedreVenstre og oevreHoeyre, som da definerer en boks hvor man ønsker å finne saker som treffer innenfor dette området.
Dermed gir det kun mening å bruke **equals** som parameter når man bruker bbox. Er noe bare delvis innenfor området skal det være treff.
Feltet `koordinatsystem` i bbox definerer hvilket koordinatsystem man ønsker å gjøre et bbox søk med. Feltet `koordinatsystem` er en string med formatet "EPSG:" + 4-6 siffer som sier hvilket system som ønskes at skal brukes.
Støttes ikke koordinatsystemet skal man få en ugyldigforespørsel tilbake. 

### Responsttype
Feltet `responstype` sier noe om hvor mye data man ønsker å få tilbake på søketreffet, som da er utvidet, minimum eller noekler.

### Søkeresultat utvidet

Hvis søk forespørsel har satt *responstype* = *"utvidet"*  kan søket returnere et utvidet resultat med maksimalt mengde felter tilgjengelig gjennom søk. Se [**sokeresultatUtvidet.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/sokeresultatUtvidet.xsd) for definisjon av returmelding.

### Søkeresultat minimum

Hvis søk forespørsel har satt *responstype* = *"minimum"* kan søket returnere et mer begrenset resultat tilgjengelig gjennom søk. Se [**sokeresultatMinimum.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/sokeresultatMinimum.xsd)

### Søkeresultat nøkler

Hvis søk forespørsel har satt *responstype* = *"noekler"* kan søket returnere bare tilgjengelige nøkler. Se [**sokeresultatNoekler.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/sokeresultatNoekler.xsd)

### Feilmeldinger for søk
Hvis søket ikke er gyldig, f.eks at den ikke validerer i henhold til schema, så sender man en `no.ks.fiks.arkiv.v1.feilmelding.ugyldigforespoersel` melding tilbake. Ved interne feil som gjør at man ikke får håndtert meldingen sendes `no.ks.fiks.arkiv.v1.feilmelding.serverfeil` tilbake.
Les mer om disse feilmeldingene lenger nede under [feilmeldingstyper](#Feilmeldingstyper)

## Hente data

### Meldingstyper:

|   Type    | Navn |
| ----------- | ----------- |
| Hent mappe      | `no.ks.fiks.arkiv.v1.innsyn.mappe.hent`       |
| Hent journalpost      | `no.ks.fiks.arkiv.v1.innsyn.journalpost.hent`       |
| Hent dokumentfil  | `no.ks.fiks.arkiv.v1.innsyn.dokumentfil.hent`        |
| Hent mappe resultat      | `no.ks.fiks.arkiv.v1.innsyn.mappe.hent.resultat`       |
| Hent journalpost resultat      | `no.ks.fiks.arkiv.v1.innsyn.journalpost.hent.resultat`       |
| Hent dokumentfil resultat      | `no.ks.fiks.arkiv.v1.innsyn.dokumentfil.hent.resultat`       |

### Hent mappe:

Meldingsformatet for hent mappe er definert i xsd schema [**mappeHent.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/mappeHent.xsd) og sendes som meldingstypen `no.ks.fiks.arkiv.v1.innsyn.mappe.hent`.
Resultatet skal sendes tilbake som meldingstypen `no.ks.fiks.arkiv.v1.mappe.hent.resultat` og formatet er definert i xsd schema  [**mappeHentResultat.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/mappeHentResultat.xsd).

### Hent journalpost:

Meldingsformatet for hent journalpost er definert i xsd schema [**journalpostHent.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/journalpostHent.xsd) og sendes som meldingstypen no.ks.fiks.arkiv.v1.innsyn.journalpost.hent.
Resultatet skal sendes tilbake som meldingstypen `no.ks.fiks.arkiv.v1.journalpost.hent.resultat` og formatet er definert i xsd schema  [**journalpostHentResultat.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/journalpostHentResultat.xsd).

### Hent dokumentfil:

Meldingsformatet for hent dokumentfil er definert i xsd schema [**dokumentfilHent.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/dokumentfilHent.xsd) og sendes som meldingstypen no.ks.fiks.arkiv.v1.innsyn.dokumentfil.hent.
Resultatet skal sendes tilbake som typen `no.ks.fiks.arkiv.v1.dokumentfil.hent.resultat`. Merk at det er ikke noe xsd schema for resultat da det ikke er noe behov for meta-data for dokumenfilen. Ønsker man meta-data for et dokument må **hent journalpost brukes**. Dokumentfilen kommer som payload i Fiks-IO meldingen med meldingsypen `no.ks.fiks.arkiv.v1.dokumentfil.hent.resultat`.

### Feilmeldinger for hent meldinger
Hvis hent meldingen ikke er gyldig, f.eks at den ikke validerer i henhold til schema, så sender man en `no.ks.fiks.arkiv.v1.feilmelding.ugyldigforespoersel` melding tilbake. 
Ved interne feil som gjør at man ikke får håndtert meldingen sendes `no.ks.fiks.arkiv.v1.feilmelding.serverfeil` tilbake og hvis det blir forsøkt å hente noe som ikke eksisterer i arkivet leveres det tilbake en `no.ks.fiks.arkiv.v1.feilmelding.ikkefunnet` melding.
Les mer om disse feilmeldingene lenger nede under [feilmeldingstyper](#Feilmeldingstyper)


## Oppdatering

### Meldingstyper:

|   Type    | Navn                                                              |
| ----------- |-------------------------------------------------------------------|
| Arkivmelding oppdatering      | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.oppdater`            |
| Mottatt melding      | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.oppdater.mottatt`    |
| Arkivmelding oppdatering kvittering      | `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.oppdater.kvittering` |

### Arkivmelding oppdatering:

Meldingsformatet for arkivmelding oppdatering er definert i xsd schema [**arkivmeldingOppdatering.xsd**](https://github.com/ks-no/fiks-arkiv-specification/blob/main/Schema/V1/arkivmeldingOppdatering.xsd) og sendes som meldingstypen `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.oppdater`.

### Feilmeldinger for oppdater meldinger
Hvis oppdater meldingen ikke er gyldig, f.eks at den ikke validerer i henhold til schema, så sender man en no.ks.fiks.arkiv.v1.feilmelding.ugyldigforespoersel melding tilbake. Ved interne feil som gjør at man ikke får håndtert meldingen sendes no.ks.fiks.arkiv.v1.feilmelding.serverfeil tilbake og hvis det blir forsøkt å oppdatere noe som ikke eksisterer i arkivet leveres det tilbake en no.ks.fiks.arkiv.v1.feilmelding.ikkefunnet melding. Les mer om disse feilmeldingene lenger nede under [feilmeldingstyper](#Feilmeldingstyper)

## Feilmeldingstyper

Som svar kan man få feilmeldinger som tilhører denne protokollen. Feilmeldingstypene kan være like i innhold som feilmeldinger i andre protokoller men de vil ha navn som tilsier at de tilhører en spesifikk protokoll.
Altså vil de ha en *no.ks.fiks.arkiv.v1.feilmelding* prefix for denne protokollen.


### Feilmeldingstyper

| Type               | Navn                                                 |
|--------------------|------------------------------------------------------|
| Ugyldigforespørsel | `no.ks.fiks.arkiv.v1.feilmelding.ugyldigforespørsel` |
| Serverfeil         | `no.ks.fiks.arkiv.v1.feilmelding.serverfeil`         |
| Ikkefunnet         | `no.ks.fiks.arkiv.v1.feilmelding.ikkefunnet`         |


### Ugyldig forespørsel

Hvis noe er galt med forespørselen, altså den er ugyldig, så skal mottaker sende en `no.ks.fiks.kvittering.ugyldigforespoersel.v1` tilbake til sender. Json [schema](https://github.com/ks-no/fiks-io-client-dotnet/blob/master/KS.Fiks.IO.Client/Schema/no.ks.fiks.kvittering.ugyldigforespoersel.v1.schema.json) følger med i .NET pakken for Fiks-IO-client.
![arkivmelding_med_ugyldigforesporsel](/images/arkivmelding_med_ugyldigforesporsel.png "Arkivmelding med ugyldig forespørsel")

### Serverfeil

Ved serverfeil hos mottaker skal det sendes en `no.ks.fiks.kvittering.serverfeil.v1` tilbake til sender. Json [schema](https://github.com/ks-no/fiks-io-client-dotnet/blob/master/KS.Fiks.IO.Client/Schema/no.ks.fiks.kvittering.serverfeil.v1.schema.json) følger med i .net pakken for Fiks-IO-client.

### Ikkefunnet

For meldinger som skal hente eller oppdatere noe i arkivet vil det returneres en ikkefunnet melding tilbake.  

### Fiks-io feilmelding når meldinger ikke er hentet

Når en melding er mottatt skal mottaker persistere meldingen og sende `ack` tilbake til Fiks-IO. Sending av `ack` tilbake til Fiks-IO sørger for at meldingen blir tatt bort fra køen.

Hvis `ack` for en melding uteblir vil meldingen bli værende på køen inntil den er blitt hentet 3 ganger uten å få en `ack` tilbake. Da vil Fiks-IO sende en `no.ks.fiks.io.feilmelding.serverfeil` melding tilbake til avsender. Med andre ord er det viktig at man sender `ack` når man vellykket har hentet en melding.

Dette erstatter tidligere TTL-håndtering på Fiks-IO køene. Det vil ikke lenger sendes noen `tidsavbrudd` meldinger basert på TTL.


## Testing av meldingsutveksling

Det er opprettet en test-applikasjon, **fiks-protokoll-validator**, som kjører i KS sitt testmiljø. Med denne kan man teste protokollene mot sitt eget arkiv-testmiljø ved å sende ferdige meldinger med statisk XML innhold til den arkivets FIKS-IO konto.
Fiks-protokoll-validator vil validere svaret den får tilbake via Fiks-IO og gi en pekepinn på om implementasjon fungerer som det skal.
Applikasjonen er kun tilgjengelig i KS test-miljø: [fiks-validator](https://forvaltning.fiks.test.ks.no/fiks-validator/#/)

Koden for validatoren er tilgjengelig på [github](https://github.com/ks-no/fiks-protokoll-validator).

### Integrasjonstester

Som tidligere nevnt er det også laget et .NET prosjekt som inneholder integrasjonstester som tester at et arkiv som har implementert Fiks Arkiv protokollen fungerer som forventet i meldings-utvekslinger.
Github prosjektet finner man [her](https://github.com/ks-no/fiks-arkiv-integration-tests-dotnet). 


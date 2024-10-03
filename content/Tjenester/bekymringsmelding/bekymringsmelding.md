---
title: Fiks bekymringsmelding
date: 2019-11-25 
aliases: ["/fiks-platform/tjenester/bekymringsmelding", "/fiks-platform/tjenester_under_utvikling/bekymringsmelding", "/fiks-plattform/tjenester/bekymringsmelding/"]
---

## Kort beskrivelse

Fiks bekymringsmelding er en portal laget for Norges innbyggere for å varsle bekymring ovenfor et barn til barnevernet. Løsningen består av to ulike skjema, ett for privat melder og ett for offentlige ansatte.

Brukerne logger seg inn på portalen, fyller ut og sender inn bekymringsmeldingen. Løsningen vil deretter levere bekymringsmeldingen på en eller flere av følgende måter:

* Direkte i fagsystem (Strukturert informasjon)
* Manuell nedlastning, ustrukturert informasjon i digital form – PDF
* Tilsendt som brevpost

## Tilgjengelige grensesnitt
| Grensesnitt | Støtte |
|------|------|
| Web portal | Ja |
| Maskin til maskin | Ja |

## Beskrivelse av tjenesten
Når bekymringsmeldingen er sendt vil systemet forsøke å levere den som strukturert data via Fiks-plattformen til kommunens fagsystem. Dersom kommunens fagsystem ikke støtter integrasjon mot [Fiks IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksprotokoll/fiksio/) finnes det en løsning for å laste ned bekymeringsmeldingen manuelt. Bekymringsmeldinger som ikke markeres som mottatt sendes ut som brevpost.

### Teknisk oversikt skisse
![alt text](https://ks-no.github.io/images/Bekymringsmelding_4.png "Overordnet designløsning")

Bekymringsmeldingen blir omgjort til strukturert data (JSON) for integrasjon mot fagsystem og ustrukturert data (PDF) til manuell nedlastning og for brevpost. All kommunikasjon mellom bruker og løsningen er kanalkryptert. I tillegg lagres både strukturert og ustrukturert data kryptert med mottakersystemets offentlige nøkkel (fagsystem, utskriftsleverandør, manuell nedlastning).  

Portalen tilbyr også et API hvor det er mulig å sende en bekymringsmelding fra fagsystemet til en annen kommunes barneverntjeneste.

### Teknisk beskrivelse av løsning og integrasjon
#### Hvordan tar man i bruk Fiks Bekymringsmelding?
Portalen inneholder to skjema, en for innbyggere og en for offentlig ansatte, som kan brukes for å melde inn bekymringsmeldinger.

Noen ganger kan det være hensiktsmessig å ha skjema for offentlig melder som en integrert del av et eget fagsystem (eks: skole, politi, ol) og da kan man benytte API for bekymringsmelding for å implementere dette. API-et støtter maskin-til-maskin integrasjon både som produsent (avsender) av bekymringsmelding og konsument (mottaker) av bekymringsmelding. Ta kontakt med din leverandør av fagsystem og hør om de støtter integrasjon mot bekymringsmelding. 

Dersom fagsystemet støtter integrasjon kan dere konfigurere bekymringsmeldingstjeneste til å konsumere og/eller produsere bekymringsmeldinger. Dersom fagsystem ikke støtter maskin-til-maskin integrasjon for å konsumere bekymringsmeldinger er det mulig å laste bekymringsmeldingene ned manuelt.

Dersom en bekymringsmelding ikke er lastet ned innen 2 virkedager vil den bli sendt ut som brevpost.

Før løsningen kan tas i bruk må kommunen inngå en [avtale](https://svarut.wordpress.com/fiks/avtalen/) om bruk.

#### Integrasjonsutvikling
Fagsystemet kan produsere og sende inn bekymringsmeldinger til et API eller man kan benytte seg av å sende inn via skjema. Benyttes skjema så vil skjemaet produsere PDF og JSON-fil, men hvis fagsystemet skal sende inn til API, må fagsystemet sende med dette.

Informasjon om generell integrasjonsutvikling mot Fiks, som blant annet autentisering, finner man [her](https://ks-no.github.io/fiks-plattform/integrasjoner/).


#### Versjonering
For å sikre at endringer i bekymringsmeldinger ikke påvirker kompatibiliteten for produsenter og mottakere, er det implementert versjonering. Fra og med versjon 2 av bekymringsmeldinger inkluderes et ekstra felt i kommune-apiet, stottetVersjon, som indikerer hvilken versjon mottakeren støtter. Mer om kommune-apiet finnes [her](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/bekymringsmelding-kommune-api-v2.json).

Systemet er designet med bakoverkompatibilitet i tankene, slik at støtten for en høyere versjon også innebærer støtte for tidligere versjoner. Dette betyr at hvis en mottaker støtter versjon 2, forventes det at de også støtter versjon 1.



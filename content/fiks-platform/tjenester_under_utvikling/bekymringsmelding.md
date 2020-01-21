---
title: Nasjonal portal for bekymringsmelding
date: 2019-11-25 
---

## Kort introduksjon

Bekymringsmeldinger til barnevernet går i dag i all hovedsak per post, og i samarbeid med Barne-, ungdoms- og familiedirektoratet (Bufdir) lager vi en nasjonal løsning hvor alle meldere, privatpersoner og offentlig ansatte, kan sende inn bekymringsmeldinger digitalt til barnevernet. 

Dette skal sikre raskere og sikrere innsending av meldinger, og bedre innholdsmessig kvalitet. Løsningen skiller mellom offentlige og private meldere, og leverer bekymringsmeldinger fra to ulike skjema, siden det er ulike forventinger/krav til offentlige meldere og private meldere.

Mer informasjon om prosjektet finnes hos [Bufdir](https://bufdir.no/prosjekter/digibarnevern/leveransene/).

## Kort beskrivelse av løsningen

Brukerne (innbyggere eller offentlig ansatte) som skal melde inn en bekymringsmelding logger seg inn på portalen, fyller ut og sender inn skjemaet. Løsningen vil deretter forsøke å levere bekymringesmeldingen på en eller flere av følgende måter

* Direkte i fagsystem (Strukturert informasjon)
* Manuell nedlastning, ustrukturert informasjon i digital form – PDF
* Tilsendt som brevpost

Når bekymringsmeldingen er sendt vil systemet forsøke å levere den som strukturert data via Fiks-plattformen til kommunens fagsystem. Dersom kommunens fagsystem ikke støtter integrasjon mot [Fiks IO](https://ks-no.github.io/fiks-platform/tjenester/fiksio/) finnes det en løsning for å laste ned bekymeringsmeldingen manuelt. Bekymringsmeldinger som ikke markeres som mottatt sendes ut som brevpost.


![alt text](https://ks-no.github.io/images/Bekymringsmelding_3.png "Overordnet designløsning")

Bekymringsmeldingen blir omgjort til strukturert data (JSON) for integrasjon mot fagsystem og ustrukturert data (PDF) til manuell nedlastning og for brevpost. All kommunikasjon mellom bruker og løsningen er kanalkryptert. I tillegg lagres både strukturert og ustrukturert data kryptert med mottakersystemets offentlige nøkkel (fagsystem, utskriftsleverandør, manuell nedlastning).  

Portalen tilbyr også et API hvor det er mulig å sende en bekymringsmelding fra fagsystemet til en annen kommunes barneverntjeneste.

## Hvordan tar man i bruk Fiks Bekymringsmelding?
Portalen inneholder to skjema, en for innbyggere og en offentlig ansatte, som kan brukes for å melde inn bekymringsmeldinger.

Noen ganger kan det være hensiktsmessig å ha skjema for offentlig melder som en integrert del eget fagsystem (eks: skole, politi, ol) og da kan man benytte API for bekymringsmelding for å implementere dette. API-et støtter maskin-til-maskin integrasjon både som produsent (avsender) av bekymringsmelding og konsument (mottaker) av bekymringsmelding. Ta kontakt med din leverandør av fagsystem og hør om de støtter integrasjon mot bekymringsmelding. 

Dersom fagsystemet støtter integrasjon kan dere konfigurere bekymringsmeldingstjeneste til å konsumere og/eller produsere bekymringsmeldinger. Dersom fagsystem ikke støtter å maskin-til-maskin integrasjon for å konsumere bekymringsmeldinger er det mulig å laste bekymringsmeldingene ned manuelt.(TODO: skjemdump og mer beskrivelse av hvordan man går frem for å sette dette opp, samt tilgangsstyring og nedlastning)

Dersom en bekymringsmelding ikke er lastet ned innen ? timer vil den bli sendt ut som brevpost.

## Integrasjonsutvikling

### Fagsystem som produsent

### Fagsystem som konsument
Ved bruk av Fiks IO som leveringskanal må fagsystemet støtte meldingsprotokollen ```no.ks.fiks.bekymringsmelding.v1```, som er definert til bruk av bekymringsmeldinger. Meldingsprotokollen vil inneholde kontrakter i form av JSON-skjema som gjelder både for mottak og svar på Fiks IO-meldinger.

##### Til fagsystem - mottak av bekymringsmeldinger
Privat bekymringsmelding, ```no.ks.fiks.bekymringsmelding.privat.v1```, som definert i [JSON-skjema](https://github.com/ks-no/fiks-io-bekymringsmelding-protokoll/blob/master/schema/domain/privat.bekymringsmelding.v1.json).\
Offentlig bekymringsmelding, ```no.ks.fiks.bekymringsmelding.offentlig.v1```, som definert i [JSON-skjema](https://github.com/ks-no/fiks-io-bekymringsmelding-protokoll/blob/master/schema/domain/offentlig.bekymringsmelding.v1.json).

##### Fra fagsystem - kvittering på mottatt bekymringsmelding
Privat bekymringsmelding, ```no.ks.fiks.bekymringsmelding.privat.mottatt.v1```, med tom body.\
Offentlig bekymringsmelding, ```no.ks.fiks.bekymringsmelding.offentlig.mottatt.v1```, med tom body.

For mer informasjon om Fiks IO, se [dokumentasjon for Fiks IO](https://ks-no.github.io/fiks-platform/tjenester/fiksio/).

---
title: Nasjonal portal for bekymringsmelding
date: 2019-11-25 
---

## Kort introduksjon

Bekymringsmeldinger går i dag i all hovedsak per post, og i samarbeid med Barne-, ungdoms- og familiedirektoratet (Bufdir) lager vi en nasjonal løsning hvor alle meldere, privatpersoner og offentlig ansatte, kan sende inn bekymringsmeldinger digitalt til barnevernet. 

Dette skal sikre raskere og sikrere innsending av meldinger, og bedre innholdsmessig kvalitet. Løsningen skiller mellom offentlige og private meldere, og leverer bekymringsmeldinger fra to ulike skjema, siden det er ulike forventinger/krav til offentlige meldere og private meldere.

Mer informasjon om prosjektet ligger på [Bufdir](https://bufdir.no/prosjekter/digibarnevern/leveransene/).

## Kort beskrivelse av løsningen

Brukerne (innbyggere eller offentlig ansatte) som skal melde inn en bekymringsmelding logger seg inn på portalen, fyller ut og sender inn skjemaet.

Når bekymringsmeldingen er sendt vil systemet forsøke å levere den som strukturert data via Fiks-plattformen til kommunens fagsystem. Dersom kommunens fagsystem ikke støtter integrasjon mot [Fiks IO](https://ks-no.github.io/fiks-platform/tjenester/fiksio/) har vi laget en løsning for å laste ned bekymringsmeldingen manuelt. Og dersom ikke bekymringsmeldingen markeres som mottatt vil den bli sendt ut som brevpost.

Bekymringsmeldingen blir omgjort til strukturert data (JSON) for integrasjon mot fagsystem og ustrukturert data (PDF) til manuell nedlastning og for brevpost. All kommunikasjon mellom bruker og løsningen er kanalkryptert. I tillegg lagres all data (både strukturert og ustrukturert) kryptert med mottakersystemets offentlige nøkkel (fagsystem, utskriftsleverandør, manuell nedlastning).  

Portalen tilbyr også et API hvor det er mulig å sende en bekymringsmelding fra fagsystemet til en annen kommunes barneverntjeneste.

![alt text](https://ks-no.github.io/images/Bekymringsmelding.png "Overordnet designløsning")

 

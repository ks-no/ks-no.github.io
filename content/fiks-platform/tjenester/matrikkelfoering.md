---
title: FIKS IO Matrikkelføring
date: 2020-03-19
---

FIKS IO Matrikkelføring er en tjeneste for å overføre grunnlag til matrikkelføring fra eByggesak til Matrikkelklienter. 
Den er tilsvarende løsningen som er etablert på FIKS SvarUt/SvarInn http://geointegrasjon.no/nytt-grensesnitt-ebyggesak-og-matrikkel/

## Løsningskonsept

TODO figur

## Flyt

TODO figur

- eByggesak mottar en søknad med strukturerte data og vedlegg fra eByggesøknad system via Fellestjenester Bygg ved hjelp av FIKS/SvarInn. Samme datastrukturer og vedleggsstruktur kan bygges opp manuelt i eByggesak ved mottak av søknad i andre kanaler enn Fellestjenester Bygg.
- Saksbehandler behandler saken og kontrollerer at søknaden har tilstrekkelig informasjon til at det kan fattes et vedtak. Saksbehandler kompletterer og korrigerer søknadsdataene ved behov.
- Før vedtaket fattes, kontrollerer eByggesak at saken har tilstrekkelig data og tegninger til matrikkelføringen.
- Når vedtak er fattet i eByggesak, kontrollerer eByggesak om tiltaket skal matrikkelføres.
- Hvis tiltaket (tiltakene) skal matrikkelføres, bygger eByggesak opp en datastruktur for matrikkelføringen som består av data fra saksbehandlingen, matrikkelinformasjon og tegninger som ligger til grunn for vedtaket.
- eByggesak sender deretter denne datastrukturen og tegningene til Matrikkelklienten ved hjelp av
FIKS IO.
- Matrikkelklienten mottar datastruktur og tegninger ved hjelp av FIKS IO.
- Matrikkelfører fører tiltaket i Matrikkel / FKB. Her skisseres det også muligheter for at Matrikkelklienten basert på et regelsett kan matrikkelføre enkelte tiltak automatisk.
- Når tiltaket er matrikkelført / ført i FKB, sender Matrikkelklienten en kvitteringsmelding tilbake til eByggesak via FIKS IO.
- eByggesak mottar kvitteringsmeldingen via FIKS IO og oppretter milepæl for matrikkelføring i saken

TODO feilsituasjoner, videresending og oppslag på kontoer som støtter meldinger om matrikkelføring

## Datamodell for meldinger

## FIKS IO meldingsprotokoll for matrikkelføring
Meldingsprotokoll som matrikkelklient må støtte ```no.ks.fiks.matrikkelfoering.v1```
Fra eByggesak/fagsystem - grunnlag til matrikkelføring
```no.ks.fiks.matrikkelfoering.grunnlag.v1```

Fra matrikkelklienter - kvittering på mottatt og ført
```no.ks.fiks.matrikkelfoering.kvittering.v1```

## Nivå på grunnlaget til matrikkelføring
Trappetrinnsmodellen

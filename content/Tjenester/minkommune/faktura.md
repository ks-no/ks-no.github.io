---
title: Min kommune - faktura
date: 2022-06-28
aliases: ["/fiks-plattform/tjenester/minside/faktura/", "/fiks-plattform/tjenester/minkommune/faktura"]
---

Faktura består av flere tjenester som sammen lager faktura visningen.

## Funksjonalitet levert kun av Innsyn
Dette er metadata om fakturaen som blir indeksert i innsyn. For detaljer se  [Innsyn](/fiks-plattform/tjenester/innsyn/)

### Faktura og fakturastatus 
Funksjonaliteten skal gjøre det mulig å vise fakturadetaljer og status på alle fakturaer i Min Side slik at man kan redusere henvendelser om betalingsstatus på en faktura. 


### Fakturadata 
Funksjonaliteten skal gjøre det mulig å dra ut fakturadetaljer og presentere dem enklere, i tillegg til pdf-versjonen for å tilby bedre informasjon til innbyggere som ikke har PC 

### Distribusjonskanal 
Funksjonaliteten skal vise hvilken distribusjonskanal faktura sendes på i Min Side, slik at man kan ha færre henvendelser om å endre distribusjonsmetode og henvendelser fra innbyggere som melder at «har ikke fått faktura» 

### Tilgjengeliggjøring av purring i MinSide 
Funksjonaliteten skal gjøre purringen tilgjengelig på MinSide samt knytte den til opprinnelig faktura. Den vil også tilby varsling på valgt kanal for de som har faktura som purres for slik å ha færre spørsmål om hvilke faktura det purres for.

### Faktura for eier av eiendom 
Funksjonaliteten skal kunne knytte faktura for eiendomsavgift til Gnr og Bnr fremfor et personnummer. Med dette vil faktura kunne vises i MinSide til begge parter som har betalingsplikt på kommunale avgifter og eier bolig sammen. Det vil føre til færre henvendelser om å bytte fakturamottaker eller ikke-mottatt faktura. 

## Sende kommentar på faktura - under utvikling 
Funksjonaliteten skal gi en mulighet for å sende en kommentar direkte på en faktura til riktig fagetat for innbyggere som har spørsmål til innholdet i fakturaen.

Dette er under utvikling, enten kan kommentar sendes via eDialog/SvarUT eller via en Fiks IO melding. Valget er ikke tatt enda.
 

## Betalingsutsettelse - under utvikling
Funksjonaliteten skal gi mulighet til å velge betalingsutsettelse på en faktura for innbyggere som ikke kan betale regningen i tide.

Det vil bli laget en protokoll for Fiks IO som vil kunne sende en forespørsel om betalingsutsettelse til fakturasystem, fakturasystem må svare tilbake om det er innvilget eller ikke, innen 10 sekund. Dette skjer mens brukeren venter på min kommune. 

## Dele opp betaling i flere avdrag - under vurdering

Funksjonaliteten skal gi fakturamottaker mulighet til å dele opp betalingen i flere avdrag for innbyggere som ikke klarer å betale hele fakturabeløp i en omfang, og slik redusere henvendelser til kommunene om å dele opp betaling og færre purringer.

Det vil da bli laget en Fiks IO protokoll slik som for betalingutsettelse med forespørsel om å dele opp faktura. Svar om innvilgelse må gis innen 10 sekund. Nye fakturaer må sendes rett etterpå og oppdateres i innsyn.  

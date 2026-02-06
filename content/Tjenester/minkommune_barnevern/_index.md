---
title: Min kommune - barnevern
date: 2025-04-10
aliases: [
    "/fiks-plattform/tjenester/minkommune-barnevern",
    "/fiks-platform/tjenester/minkommune-barnevern",
]
---
## Kort beskrivelse
Min kommune – barnevern er en digital innbyggertjeneste som skal bidra til økt tillit og tilgjengelighet for dem som har en sak hos barnevernet. Innlogging skjer sikkert gjennom ID-porten på høyeste nivå og løsningen gjør det lettere å medvirke, påvirke og samhandle.

Systemet har flere funksjoner, og det er planer for videreutvikling og ny funksjonalitet.

## Fiks Innsyn

Fagsystem for barnevernsaker tilgjengeliggjør saker for innbygger vha Fiks Innsyn. 
For detaljer se [Innsyn](/fiks-plattform/tjenester/innsyn/)

Meldingsversjonen som skal brukes mot Fiks Innsyn:

| Meldingstype            | Versjon                  |                                                                                                                |
|-------------------------|--------------------------|----------------------------------------------------------------------------------------------------------------|
| Barnevernmappe V1       | BARNEVERN_MAPPE_V1       | [Spec](https://github.com/ks-no/fiks-innsyn-json-schema/blob/main/schema/domain/barnevern/mappe.v1.json)       |
| Barnevernjournalpost V1 | BARNEVERN_JOURNALPOST_V1 | [Spec](https://github.com/ks-no/fiks-innsyn-json-schema/blob/main/schema/domain/barnevern/journalpost.v1.json) |


## Aktører

For øyeblikket er det støtte for å eksponere saken til ulike parter i saken.
Dette er HOVEDPERSON, MOR, FAR, MEDMOR, MEDFAR, VERGE

For hver aktør må man indeksere separate mapper/journalposter, og disse kan ha ulikt innhold avhengig av hva aktøren skal få se.

## Dokumenter

Selve dokumentene blir tilgjengeliggjort via andre kanaler (f.eks Dokumentlager). barnevernjournalpost-meldingen inneholder lenker til hvor disse kan lastes ned. Hvis dokumentet er sendt via SvarUt, kan man fylle ut svarutForsendelsesId og svarutFilnummer feltene.

## Post til barnevernet

En barnevernmappe representerer en barnevernsak. Hvis man ønsker å åpne opp for at innbygger skal kunne sende meldinger relatert til barnevernsaken må edialogSkjemaer-feltet fylles ut. Bruker man predefinert type POST, bruker man en standardisert edialog-mal opprettet av Min kommune - Barnevern.
Edialog-meldingen vil bli sendt via SvarUt til organisasjonsnummeret definert i barnevernmappe-meldingen.
Mottaker må ha konfigurert en Svarinn-klient som håndterer dokumenter på nivå 4 med forsendelsestype: ks.digibarnevern.dokumentmedvirkning eller forsendelsesType: Alle
Hvis man bruker [SvarInn V2](/tjenester/svarut/api-versjoner/) får man tilgang på Noark-metadata knyttet til barnevernmappen.
Altinn er fallback.

## Dokumentmedvirkning

En barnevernjournalpost representerer en journalpost på saken. Hvis man ønsker å åpne opp for at innbygger skal kunne sende meldinger relatert til journalposten må edialogSkjemaer-feltet fylles ut. Bruker man predefinert type SVAR, bruker man en standardisert edialog-mal opprettet av Min kommune - Barnevern.
Edialog-meldingen vil bli sendt via SvarUt til organisasjonsnummeret definert i barnevernmappe-meldingen som barnevernjournalposten er knyttet til.
Mottaker må ha konfigurert en Svarinn-klient som håndterer dokumenter på nivå 4 med forsendelsestype: ks.digibarnevern.dokumentmedvirkning eller forsendelsesType: Alle
Hvis man bruker [SvarInn V2](/tjenester/svarut/api-versjoner/) får man tilgang på Noark-metadata knyttet til barnevernjournalposten.
Altinn er fallback.

## Innsynsforespørsel

I noen tilfeller får aktøren bare tilgang til tittelen på dokumentet. Da har man mulighet til å sende en melding til fagsystem for å forespørre tilgang.

Innsynsforespørsel fungerer på følgende måte:

1. En innbygger ber om innsyn på en eller flere av sine journalposter tilgjengeliggjort via Min kommune – Barnevern
2. En melding blir sendt via Fiks protokoll og [protokoll](https://github.com/ks-no/fiks-innsynsforespoersel-journalpost-specification)
3. Når innsynsforespørselen er ferdigbehandlet i fagsystemet, oppdateres innsynsforesporselStatus på journalposten basert på resultatet av saksbehandlingen. Og nytt dokument blir evt tilgjengeliggjort.

## Samtykke

Hvis fagsystemet ønsker å hente inn samtykke fra en eller flere aktører kan man bruke tjenesten [Samtykke](/tjenester/samtykke/).
Barnevernjournalposten må også inneholde samtykkeId som ble generert fra den tjenesten.




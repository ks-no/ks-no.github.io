---
title: SvarUt - SvarInn adressering
date: 2017-01-01
hidden: false
---

Tidligere hadde vi kun orgnr-adressering på forsendelser. Nå har SvarUt fått støtte for ForsendelseType. ForsendelseType skal beskrive hvilken type forsendelse dette er. Det er KS som styrer hvilken typer en kan benytte til adressering, hvis det er ønskelig med ny type sendes ønske om dette til svarut@ks.no.
***


Mottakersystem kan nå filtrere på 3 felt, orgnr, forsendelseType og nivå.
For å konfigurere to mottakersystem på samme orgnr, kan en derfor filtrere videre på forsendelseType.

Eksempel system som ikke kan motta nivå4 dokument konfigureres da med.
- 999888777, Alle forsendelsetyper, 3

Dette systemet vil da kun motta nivå3 forsendelser, hvis kommunen har et annet system som kan motta nivå4 kan dette konfigureres slik:
- 999888777, Alle forsendelsetyper, 4


***

Eksempel fagsystem og arkivsystem. Fagsystemet skal ha forsendelser av typen ks.byggesøknad, mens andre brev til kommunen skal i arkivsystemet.
Arkivsystemet vil da konfigureres slik
- 999777888, Alle forsendelsetyper, alle nivå

Fagsystemet
- 999777888, ks.byggesøknad, alle nivå

Da vil arkivsystemet få alt utenom ks.byggesøknad forsendelser som blir levert til fagsystemet.

## Integrasjoner

### Sending SvarUt
De som sender meldinger til SvarUt kan sette på forsendelseType.

### Mottak SvarInn
Trenger ikke gjør noen endringer, filtrering vil skje på SvarUt i konfigurasjonen, listen over forsendelser vil være de mottakersystemet skal motta.
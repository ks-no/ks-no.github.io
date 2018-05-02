---
title: Dokumentlager
---

Vi lanserer snart en tjeneste for å lagrefiler og eksponere disse.

Tjenesten består av et api for å laste opp filer hvor en spesifiserer fil, mottakere (orgnr, fnr) som skal ha tilgang til å laste ned filen, og hvor lenge filen skal være tilgjengelig.
Det vil være mulig å hente ut igjen status på om filen er lastet ned og om den er slettet.

Apispec kommer når vi har et mer endelig api.

Denne tjenesten vil være brukt mye av andre tjenester i FIKS, men kan også brukes fritt av andre om de finner den nyttig. 
Den kan brukes for å eksponere filer til minside, eller hvis noen vil sende filer per epost på en sikker måte.

* Filen lastes opp til oss
* Link sendes på egnet kanal f.eks epost
* Mottaker laster ned filen via link og autentiserer seg via idporten.
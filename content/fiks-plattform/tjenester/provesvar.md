---
title: Prøvesvar fra FHI
date: 2020-12-14
---

### Formål
Tjeneste for å tilgjengeliggjøre Covid19 prøvesvar for smittesporere i kommunene.

### Produktbeskrivelse
Tjenesten vil tilby et api hvor smittesporer kan spørre etter prøvesvar på et fødselsnummer/dnummer. 

#### Brukeradministrasjon og tilgangsstyring
En må ha en gyldig HelseID innlogging for å kunne spørre etter prøvesvar. 
Kommunen må også gi tilgang til applikasjonen sin integrasjon i Fiks platformen, samt alle sluttbrukere som skal kunne hente prøvesvar.

### Sikkerhet
Kommunikasjonen vil være kryptert med TLS. Autentisering med HelseID og Fiks integrasjon.

## Endepunkt [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/provesvar-api-v1.json)

For alle endepunktene hentes autentisert bruker fra access token i "Authorization"-headeren på requesten. Dette tokenet 
må være utstedt av HelseID med aud-verdi ks:fiks, scope-verdi ks:fiks/labdatabase og nivå 4.

IntegrasjonId- og IntegrasjonPassord-headere må også være satt med verdier fra Fiks-integrasjonen opprettet av kommunen.




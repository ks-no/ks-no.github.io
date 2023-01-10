---
title: Fiks vaksine
date: 2021-03-15
alias: [/fiks-plattform/tjenester/vaksine]
---

## Kort beskrivelse
KS har sammen med Folkehelseinstituttet (FHI) utviklet et API som gjør det mulig å hente vaksineinformasjon elektronisk fra FHIs SYSVAK register til kommunen. API-et er tilgjengelig for kommuner som har behov for å hente større mengder med informasjon fra SYSVAK.


## Tilgjengelige grensesnitt
| Grensesnitt | Støtte |
|------|------|
| Web portal | Nei |
| Maskin til maskin | ja |

## Beskrivelse av tjenesten
Tjenesten vil tilby et api hvor kommunen kan spørre etter vaksineinformasjon på et fødselsnummer/dnummer. 

### Brukeradministrasjon og tilgangsstyring
Autentisering  skjer ved hjelp av en IntegrasjonPerson-mekanismen beskrevet [her](https://ks-no.github.io/fiks-plattform/integrasjoner/#integrasjon-person)
Merk at token som sendes med må være et personlig HelseID-token.

Vedkommende det gjøres oppslag for må også ha blitt gitt søke-privilegiet på tjenestesiden for Fiks Vaksine på [Fiks forvaltning](https://forvaltning.fiks.ks.no/). 

### Sikkerhet
Kommunikasjonen vil være kryptert med TLS. Autentisering med HelseID og Fiks integrasjon.

### Endepunkt [(api-spec)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/vaksine-api-v1.json)

For alle endepunktene hentes autentisert bruker fra access token i "Authorization"-headeren på requesten. Dette tokenet 
må være utstedt av HelseID med aud-verdi ks:fiks, scope-verdier ks:fiks/sysvak, fhi:personoppslag/api, fhi:sysvaknett/fiks/api, fhi:sysvaknett/api, helseid://scopes/hpr/hpr_number, helseid://scopes/identity/pid og helseid://scopes/identity/security_level og nivå 4.



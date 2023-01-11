---
title: Fiks prøvesvar
date: 2020-12-14
alias: [/fiks-plattform/tjenester/provesvar]
---

## Kort beskrivelse
Tjenesten er laget for å tilgjengeliggjøre Covid19 prøvesvar for smittesporere i kommunene.

## Tilgjengelige grensesnitt
| Grensesnitt | Støtte |
|------|------|
| Web portal | Nei |
| Maskin til maskin | [(Api-spec)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/provesvar-api-v1.json) |

## Beskrivelse av tjenesten
Tjenesten er et api hvor smittesporer kan spørre etter prøvesvar basert på:
- et fødselsnummer/dnummer 
- en kombinasjon av fornavn/etternavn/kjønn/fødselsdato/prøvetidspunkt
- hente ut prøvesvar for egen kommune

### Brukeradministrasjon og tilgangsstyring
Autentisering  skjer ved hjelp av en IntegrasjonPerson-mekanismen beskrevet [her](https://ks-no.github.io/fiks-plattform/integrasjoner/#integrasjon-person)
Merk at token som sendes med må være et personlig HelseID-token.

Kommunen må også gi tilgang til applikasjonen sin integrasjon samt alle sluttbrukere som skal kunne hente prøvesvar på [Fiks forvaltning](https://forvaltning.fiks.ks.no/).

## Sikkerhet
Kommunikasjonen vil være kryptert med TLS. Autentisering med HelseID og Fiks integrasjon.

## Endepunkt [(api-spec)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/provesvar-api-v1.json)

For alle endepunktene hentes autentisert bruker fra access token i "Authorization"-headeren på requesten. 
Dette tokenet må være utstedt av HelseID med aud-verdier ks:fiks og fhi:labdatabase
scope-verdier fhi:labdatabase/fiks fhi:personoppslag/api ks:fiks/labdatabase helseid://scopes/hpr/hpr_number helseid://scopes/identity/pid ks:fiks/labdatabase
og nivå 4.




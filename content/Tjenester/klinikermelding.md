---
title: Fiks klinikermelding
date: 2023-01-04
alias: [/fiks-plattform/tjenester/klinikermelding/]
---

## Kort beskrivelse
KS har sammen med Folkehelseinstituttet (FHI) utviklet et API som gjør det mulig å sende MSIS klinikermelding direkte fra smittesporingsverktøyet eller EPJ til MSIS ved FHI. Tjenesten heter Fiks klinikermelding. API-et vil bli tatt i bruk av Fiks smittsporing så snart som mulig, og er tilgjengelig for kommuner som benytter andre løsninger til smittesporing enn de nevnte.

## Tilgjengelige grensesnitt
| Grensesnitt | Støtte |
|------|------|
| Web portal | Nei |
| Maskin til maskin | [Api-spec](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/klinikermelding-api-v1.json) |

### Brukeradministrasjon og tilgangsstyring
Autentisering  skjer ved hjelp av en IntegrasjonPerson-mekanismen beskrevet [her](https://ks-no.github.io/fiks-plattform/integrasjoner/#integrasjon-person)
Merk at token som sendes med må være et personlig HelseID-token.

Kommunen må også gi tilgang til applikasjonen sin integrasjon samt alle sluttbrukere som skal kunne sende klinikermeldinger på [Fiks forvaltning](https://forvaltning.fiks.ks.no/).

## Sikkerhet
Kommunikasjonen vil være kryptert med TLS. Autentisering med HelseID og Fiks integrasjon.

## Endepunkt [(api-spec)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/klinikermelding-api-v1.json)

For alle endepunktene hentes autentisert bruker fra access token i "Authorization"-headeren på requesten. Dette tokenet 
må være utstedt av HelseID med aud-verdi ks:fiks, scope-verdi fhi:msisklinikermeldingapi/api, helseid://scopes/hpr/hpr_number helseid://scopes/identity/security_level helseid://scopes/identity/pid og nivå 3.


---
title: 'API: SvarInn REST'
date: 2017-01-01
aliases: [/svarut/integrasjon/mottaksservice-rest, /tjenester/svarut/integrasjon/mottaksservice-rest/]
---

Her beskrives funksjonalitet for Mottaksservice V1. For å sikre bakoverkompatibilitet for klientene så vil denne versjonen ikke endres.

### Tilgang

Tjenesten bruker HTTP Basic autentication med brukernavn og generert service-passord. Mottakersystem opprettes av KS-SvarUt administrator og service-passordet genereres av person med tilgang via [mottakersystem](https://svarut.ks.no/mottaker/)-siden. 
Dersom autentiseringen feiler returneres HTTP-status 401 Unauthorized, og ukjent URL gir HTTP-status 404. Detaljerte feilmeldinger følger også ved feil.

### Tjenester

Forsendelser er tilgjengelig for direkte import til sakssystem i uendelig tid. Dersom forsendelsene markeres som permanent import feil går forsendelsene videre i det normale løpet med varsling i Altinn og til slutt printing.
Etter 2 timer vil det bli sendt varsel mail om manglende import 3 ganger om dagen.

Tjenestene er tilgjengelige via:  

| Miljø | Base URL                                  |
|-------|-------------------------------------------|
| Test  | `https://test.svarut.ks.no/tjenester/` |
| Prod  | `https://svarut.ks.no/tjenester/`      |

Endepunkter og modeller er definert i OpenAPI-spec:  
[OpenAPI SvarInn V1](https://developers.fiks.ks.no/api/svarinn-api-v1.json) ([Åpne i swagger editor](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/svarinn-api-v1.json))

---
title: 'API: SvarInn REST'
date: 2024-09-12
aliases: [/svarut/integrasjon/mottaksservice-rest, /tjenester/svarut/integrasjon/mottaksservice-rest/]
---

Her beskrives funksjonalitet for bruk av SvarInn V2. Dokumentasjon for tidligere versjoner finnes i [versjonsoversikten](/tjenester/svarut/api-versjoner/).

## Tilgang

Tjenesten bruker HTTP Basic autentication med brukernavn og generert service-passord. Mottakersystem opprettes av administrator hos KS Digital. 
Service-passordet genereres av person med tilgang via [mottakersystem](https://svarut.ks.no/mottaker/)-siden. 
Dersom autentiseringen feiler returneres HTTP-status 401 Unauthorized, og ukjent URL gir HTTP-status 404. Detaljerte feilmeldinger følger også ved feil.

## Henting og kvittering av forsendelser

Forsendelser er tilgjengelig for direkte import til sakssystem helt til de kvitteres ut. 
Dersom en forsendelse markeres som permanent feilet vil den gå videre i det normale løpet med varsling i Altinn og eventuelt fysisk post dersom den ikke leses digitalt og avsender har sagt at post til virksomheter skal ettersendes.

Dersom forsendelsen ikke er kvittert ut etter to timer vil denne bli inkludert i varsel-epost om manglende import, som sendes ut tre ganger om dagen.

### API
| Miljø | Base URL                         |
|-------|----------------------------------|
| Test  | `https://test.svarut.ks.no/api/` |
| Prod  | `https://svarut.ks.no/api/`      |

Endepunkter og modeller er definert i OpenAPI-spec:  
[OpenAPI SvarInn V2](https://developers.fiks.ks.no/api/svarinn-api-v2.json) ([Åpne i swagger editor](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/svarinn-api-v2.json))

### Kryptering

Alle forsendelser som lastes ned via SvarInn er kryptert. For at dette skal fungere må den offentlige nøkkelen dere ønsker å bruke lastes opp til mottakersystemet i SvarUt med nivå 4-innlogging. 
Den private nøkkelen må være tilgjengelig i systemet som skal laste ned forsendelsene, slik at disse kan dekrypteres. 
I begge eksemplene under er disse filene kalt henholdsvis `public.pem` og `privatekey.pem`, og blir generert med en gyldighet på 99999 dager.

#### Unix
For å generere RSA nøkkelpar med OpenSSL kan følgende kommando brukes:  
`openssl req -x509 -newkey rsa:2048 -nodes -keyout privatekey.pem -out public.pem -days 99999`  

#### Windows
For windows kan man for eksempel laste ned denne OpenSSL-implementasjonen: https://slproweb.com/products/Win32OpenSSL.html   
`openssl req -x509 -newkey rsa:2048 -nodes -keyout privatekey.pem -out public.pem -days 99999 -config c:\<opensslinstallmappe>\bin\openssl.cfg`

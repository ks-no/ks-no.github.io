---
title: 'API: Avvikling'
aliases: [/tjenester/svarut/api/avvikling-api, /svarut/api/avvikling-api]
---

## Kort beskrivelse
Sluttdato for støtte for SOAP og REST v1 er satt til 1.1.2027 for SOAP og 31.7.2027 for REST v1. Les mer her: [Avvikling av SOAP- og REST v1-API for SvarUt](https://ksdigital.no/2026/01/13/avvikling-av-soap-og-rest-v-1-api-for-svarut/).

For å gjøre overgangen enklere tilbyr vi et migreringsendepunkt. Med dette kan dere bruke eksisterende BasicAuth-tilgang (SOAP/REST v1) til å opprette en ny Fiks-integrasjon for videre bruk mot REST v2/v3.

## Migreringsendepunkt
Migreringsendepunktet brukes når dere skal gå fra SOAP/REST v1 til REST v2/v3.

- BasicAuth (brukernavn/passord) bekrefter at dere har tilgang til SvarUt-kontoen det skal migreres fra.
- `maskinportenToken` i requesten identifiserer organisasjonen som skal bruke den nye integrasjonen.
- Ved gyldig autentisering oppretter vi en ny integrasjon med riktige tilganger til den samme SvarUt-kontoen.
- Responsen inneholder `id`, `passord` og `kontoId` som brukes videre i REST v2/v3.

Se [spec](https://developers.fiks.ks.no/api/integrasjon-migrering-api-v1.json) for detaljer om request og respons.

## Kobling mot Systemkatalogen
### Hva er Systemkatalogen?
KS Digital utvikler en Systemkatalog for bedre oversikt over leverandører, fag- og arkivsystemer og hvilke integrasjoner de bruker mot KS Digital sine tjenester.
Dette vil gjøre det enklere å følge opp driftsavvik. For eksempel kan vi varsle riktig leverandør direkte dersom en integrasjon får autorisasjonsfeil, i stedet for å gå via kommunen.

### Hva betyr dette for migreringsendepunktet?
Organisasjonsnummeret i `maskinportenToken` må være registrert som leverandør i Systemkatalogen. Dette er et sikkerhetstiltak som sikrer at bare leverandører registrert hos oss kan bruke migreringsendepunktet.
Det er også mulig å knytte den nye integrasjonen til et spesifikt fag- eller arkivsystem i Systemkatalogen. Dette gjør dere ved å sende med `systemkatalogProduktId` i request body. Vi validerer at produktet tilhører leverandøren i Systemkatalogen.

Inntil videre er det vår brukerstøtte som registrerer leverandører i Systemkatalogen. 
Brukerstøtte kan også hjelpe dere med å registrere fag- eller arkivsystemene deres som produkter, og deretter oppgi `systemkatalogProduktId` dersom dere ønsker å bruke dette.

Fremgangsmåte:

1. Ta kontakt med brukerstøtte på `fiks@ksdigital.no` for å sikre at dere er registrert som leverandør i Systemkatalogen.
2. Hvis dere ønsker å koble den nye integrasjonen til et produkt i Systemkatalogen:
   - be brukerstøtten registrere fag- eller arkivsystemet som et eget produkt knyttet til leverandøren
   - send med `systemkatalogProduktId` i kall til migreringsendepunktet


## Få hjelp

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

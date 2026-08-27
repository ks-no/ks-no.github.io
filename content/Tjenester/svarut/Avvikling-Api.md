---
title: 'API: Avvikling'
aliases: [/tjenester/svarut/api/avvikling-api, /svarut/api/avvikling-api]
---

## Kort beskrivelse
Støtte for SOAP og REST v1 avvikles 1.1.2027. Les mer her: [Avvikling av SOAP- og REST v1-API for SvarUt](https://ksdigital.no/2026/01/13/avvikling-av-soap-og-rest-v-1-api-for-svarut/).

For å gjøre overgangen enklere tilbyr vi et migreringsendepunkt. Endepunktet lar deg bruke eksisterende BasicAuth-tilgang (SOAP/REST v1) for å opprette en ny Fiks-integrasjon som kan brukes videre mot REST v2/v3.

## Migreringsendepunkt
Migreringsendepunktet brukes når du skal gå fra SOAP/REST v1 til REST v2/v3.

- BasicAuth (brukernavn/passord) bekrefter at du har tilgang til SvarUt-kontoen det skal migreres fra.
- `maskinportenToken` i requesten identifiserer organisasjonen som skal bruke den nye integrasjonen.
- Ved gyldig autentisering oppretter vi en ny integrasjon med riktige tilganger til samme SvarUt-konto.
- Responsen inneholder `integrasjonId`, `passord` og `kontoId` som brukes videre i REST v2/v3.

Se [spec](https://developers.fiks.ks.no/api/integrasjon-migrering-api-v1.json) for detaljer om request og respons.

## Planlagt videreutvikling: kobling mot Systemkatalogen
### Hva er Systemkatalogen?
KS Digital utvikler en Systemkatalog for bedre oversikt over leverandører, fag- og arkivsystemer og hvilke integrasjoner de bruker mot KS Digital sine tjenester.
Dette vil gjøre det enklere å følge opp driftsavvik. For eksempel kan vi varsle riktig leverandør direkte dersom en integrasjon får 401-feil, i stedet for å gå via kommunen.

### Hvordan vil dette påvirke migreringsendepunktet?
Vi planlegger å utvide valideringen for kall mot migreringsendepunktet.
Planen er at organisasjonsnummeret i `maskinportenToken` må finnes som leverandør i Systemkatalogen.
I tillegg ønsker vi at nye integrasjoner kobles til riktig produkt/undersystem. Vi kommer tilbake med mer informasjon og fremgangsmåte når vi har fått dette på plass. 

[//]: # (Planlagt fremgangsmåte:)

[//]: # (- Ta kontakt med brukerstøtte for å bekrefte at hovedleverandøren deres er registrert i Systemkatalogen.)

[//]: # (- Sørg for at systemet som bruker integrasjonen er registrert som eget produkt under leverandøren.)

[//]: # (- Oppgi `produktId` i kall mot migreringsendepunktet når dette kravet innføres.)

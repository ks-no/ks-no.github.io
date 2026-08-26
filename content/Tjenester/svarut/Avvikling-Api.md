---
title: 'API: Avvikling'
aliases: [/tjenester/svarut/api/avvikling-api, /svarut/api/avvikling-api]
---

## Kort beskrivelse
Vi planlegger å avvikle støtte for REST V1 i løpet av 2026, du kan lese mer om det [her](https://ksdigital.no/2026/01/13/avvikling-av-soap-og-rest-v-1-api-for-svarut/).

I tillegg er vi i gang med å tilrettelegge for et eget migrerings-endepunkt som gjør det lettere å migrere fra SOAP og Rest v1 og over til Rest v2/v3.

## Migreringsendepunkt

Vi har utarbeidet et migreringsendepunkt hos oss som vi håper vil vere til hjelp i arbeidet med å migrere fra SOAP/Rest v1 til Rest v2/v3. 
Autentiseringsmekanismen for SOAP/Rest v1 er BasicAuth med brukernavn/passord, mens for Rest v2/v3 kreves det bruk av [integrasjoner](/fiks-platform/integrasjoner) sammen med [maskinporten-token](/fiks-platform/difiidportenklient).
Se [spec](https://developers.fiks.ks.no/api/integrasjon-migrering-api-v1.json) for informasjon om hvordan dette skal brukes. 

Endepunktet vil automatisk opprette en integrasjon med riktige tilganger til en spesifikk SvarUt-konto:
* Endepunktet autentiseres med BasicAuth (brukernavn+passord), der brukernavnet identifiserer SvarUt-konto det skal opprettes integrasjon på. 
* Det må legges ved et maskinporten-token i request-objektet som vil identifisere organisasjonsnummeret som skal få tilgang til den nye integrasjonen
* Vi vil på baksiden opprette en integrasjon med riktige tilganger til SvarUt-kontoen, og integrasjonId og passord blir returnert sammen med kontoId til SvarUt-konto


## Ikke på plass enda - sammenkobling mot Systemkatalogen
### Hva er Systemkatalogen?
KS Digital holder også på å lage en Systemkatalog der vi på sikt ønsker å ha oversikt over alle leverandører og fag- og arkiv-systemene som integrerer seg mot KS Digital sine tjenester,
og hvilke ressurser/integrasjoner de forskjellige fag- og arkiv-systemene bruker. Dette vil gjøre det enklere å ha oversikt over hvilke systemer som integrerer seg mot SvarUt, og hvilke ressurser de er konsumenter av. 

Et eksempel der dette vil komme til nytte, er når vi ser i våre logger at en bestemt integrasjon får 401 (typisk at passord er endret i fagsystem eller et nytt er generert via Fiks konfiguasjon). 
I dag kan vi bare kontakte kommunen som eier integrasjonen, som så tar kontakt med sine fagsystem. 
Systemkatalogen vil altså gjøre det mulig for oss å ta direkte kontakt med fagsystemet som bruker integrasjonen for å gi beskjed om eventuelle problemer vi ser fra vår side.  

### Hvordan passer Systemkatalogen inn med migreringsendepunktet?
Vi ønsker å legge til enda mer validering på de som bruker migreringsendepunktet. 
Dette betyr at vi kommer til å kreve at organiasasjonsnummeret som finnes i maskinporten-tokenet, finnes som en leverandør i Systemkatalogen. 

I tillegg ønsker vi å legge til rette for at de nye integrasjonene er koblet sammen med riktig produkt/undersystem. 

Fremgangsmåte: 
- Ta kontakt med Brukerstøtte hos oss for å vere sikker på at deres hovedleverandør er registrert i Systemkatalogen. Dette vil altså si at det finnes en leverandør i Systemkatalogen med organisasjonsnummeret som finnes i maskinporten-tokenet. 
- Systemet som bruker integrasjonen bør også vere registrert som et eget produkt under leverandøren. Denne vil da ha fått en egen produktId
- Legg ved produktId i kallet mot migreringsendepunktet. Vi vil da validere at dette faktisk er en produktId som finnes i Systemkatalogen (og hører til organisasjonsnummer til leverandør) og deretter koble integrasjon sammen med produktId
---
title: Digisos
date: 2018-08-30 
---

Fiks Digisos er en tjeneste for å tilrettelegge for kommunal saksbehandling via tjenester på nav.no Søknad og sak blir tilgjengelig på nav.no for bruker/innbygger. Saksbehandling foregår i kommunalt fagsystem. Fiks fasiliterer kommunikasjonen mellom nav.no og kommunalt fagsystem.

Tjenesten benytter flere komponeneter i fiks-plattformen(SvarInn 2, dokumentlager, SvarUt, konfigurasjon, autorisasjon, audit logging, ...):

* Enkelt oppsett for den enkelte kommune gjennom [Fiks Konfigurasjon]({{< ref "konfigurasjon.md" >}}) 
* Søknader om sosialhjelp fra nav.no blir levert til kommunenes fagsystem via SvarInn, eller kommunen kan manuelt hente disse via SvarInn manuelt grensesnitt.
* Når saken endrer seg i kommunenens fagsystem blir endringer registrert i Fiks. Sak og sakstatus blir så tilgjengelig på Fiks Innsyn og nav.no.
* Ansatte/brukerstøtte i nav kan se utvalgte deler av saken via nav sine systemer.
* Innbygger får fortløpende oppdatering på saksgang, tilgjengelig gjennom Fiks Innsyn og på nav.no.
* Innbygger får tilgang til alle dokumenter og mulighet til å sende inn nye søknader preutfylt med data fra tidligere søknader.
  
## Flyt

1. Innbygger fyller ut søknad om sosialstønad på nav.no, som sender denne til fiks-digisos gjennom et synkront http api.
2. Fiks-digisos mottar søknaden.
    1. Søknadsfilen legges i fiks-dokumentlager, kommunen og innbyggeren autoriseres for tilgang.
    2. Det gjøres oppslag i fiks-register for å se om det finnes en mottaker på nav-enhetsnummeret som er spesifisert, og om denne mottakeren er i stand til å behandle digisos-formatet.
    3. Det gjøres et kall mot fiks-svarinn, hvor filen blir validert og sendt til mottakeren.
    4. Hvis punktene over blir gjennomført ok opprettes en digisos-melding i Fiks Innsyn. Denne autoriseres for innbyggeren.
    5. Fiks returnerer 202 ACCEPTED på http-kallet fra Nav.
3. Kommunen mottar meldingen gjennom SvarInn2. Den vil være tilgjengelig i køen i en fastsatt periode. Om kommunen ikke bekrefter mottak før denne perioden går ut vil meldingen bli trukket og alternativ kanal benyttes (se punkt 6).
4. Søknanded opprettes i kommunalt fagsystem.
5. Det kommunale fagsystemet bekrefter mottak av søknaden og oppdaterer status i Fiks Digisos. 
    1. Evt. nye filer legges i Fiks Dokumentlager, autorisert for innbygger.
    2. Digisos saken i Fiks Innsyn oppdateres
    3. Saken er tilgengelig som nav.no og nav ansatte/brukerstøtte.
6. Om fagsystemet avviser eller unnlater å bekrefte mottak av saken vil SvarUt benyttes som alternativ kanal. I praksis betyr dette at meldingen blir sendt til kommunens Altinn-konto, evt. sendt til print og postlagt.     
    
![fiks_digisos](/images/fiks_digisos.png "Fiks Digisos")

---
title: Digisos
date: 2018-05-02 
---

Fiks Digisos er et knutepunkt for overføringer av søknader om sosialstønad fra Nav til den enkelte kommune, som så utfører saksbehandling og sender statusoppdateringer tilbake til Fiks og Nav.

Tjenesten er tett integrert med andre tjenester på Fiks plattformen, og tilbyr:

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
3. Kommunen mottar meldingen gjennom SvarInn2. Hvis meldingen ikke kan håndteres av det kommunale fagsystemet sendes beskjed til FiksDigisos, som oppdaterer status og videreformidler til Nav (7.)
4. Søknanded opprettes i kommunalt fagsystem.
5. Når det kommunale fagsystemet bekrefter mottak av søknaden og oppdateres status i Fiks Digisos.
6. Ved oppdateringer av saken i kommunalt fagsystem blir endringer/hele saken sendt fiks digisos.
6. Fiks-digisos oppdaterer sin interne database med den nye statusen. 
    1. Filer legges i Fiks Dokumentlager, autorisert for innbygger.
    2. Digisos saken i Fiks Innsyn oppdateres.
    3. Saken er tilgengelig som nav.no og nav ansatte/brukerstøtte.
    
![fiks_digisos](/images/fiks_digisos.png "Fiks Digisos")

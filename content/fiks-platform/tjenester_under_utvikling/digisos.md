---
title: Digisos
date: 2018-05-02 
---

Fiks Digisos er et knutepunkt for overføringer av søknader om sosialstønad fra Nav til den enkelte kommune, som så utfører saksbehandling og sender statusoppdateringer tilbake til Fiks og Nav.

Tjenesten er tett integrert med andre tjenester på Fiks plattformen, og tilbyr:

* Enkelt oppsett for den enkelte kommune gjennom [Fiks Konfigurasjon]({{< ref "konfigurasjon.md" >}}) 
* Overføring av søknader gjennom Fiks SvarInn og Fiks Dokumentlager. Disse kan hentes endten gjennom direkte integrasjon mot kommunens sak/arkiv eller fagyststem, eller manuelt gjennom fiks-svarinn-forvaltning. 
* Innbygger får fortløpende oppdatering på saksgang, tilgjengelig gjennom Fiks Innsyn og på nav.no. Nye hendelser i saksgang kan varsles gjennom fiks-sms.
  
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
5. Når det kommunale fagsystemet bekrefter mottak av søknaden og oppdateres status i Fiks Digisos gjennom en SvarInn melding
6. Fiks-digisos oppdaterer sin interne database med den nye statusen. 
    1. Svar-pdf legges i Fiks Dokumentlager, autorisert for innbyggeren
    2. Digisos saken i Fiks Innsyn oppdateres
    
![fiks_digisos](/images/fiks_digisos.png "Fiks Digisos")

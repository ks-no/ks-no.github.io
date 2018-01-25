---
title: MinSide: Søk
---

![minside_sok](images/sok.png "Minside Søk")

Søk er en modul i min-side som består av en SPA (single page webapp), en søketjeneste, og en indekseringstjeneste. En integrasjon benytter indekseringsapi'et for å tilgjengeliggjøre meldinger: hendelser, fakturaer, saker, journalposter, forsendelser, osv. En innbygger kan så benytte webapplikasjonen for å søke i disse.  

Indeksering er integrert mot Fiks SvarUt; forsendelser fra SvarUt vil fremkomme i søket om dette er aktivert gjennom Fiks Konfigurasjon. 

## Indekseringstjeneste [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/hendelse-indexer-api.json)

Integrasjoner gjør hendelser tilgjengelige i søkemotoren ved å benytte indekserings-api'et. Det er to primære endepunkt for dette, ett for å indeksere _grupper_, med eller uten hendelser, og ett for å legge en eller flere hendelser til en eksisterende gruppe.

For begge endepunkter gjelder fiks-platformens vanlige autentiseringsregler. I tilegg må integrasjonen har rett til å indeksere på vegne av  _fiks organisasjonen_ som er satt som eier den aktuelle hendelsesgruppen. Det samme gjelder for indeksering av hendelser, men her må i tillegg hendelsen være eid av samme _fiks organisasjon_ som det som er oppgitt på hendelsen.   

Begge endepunkter støtter batch av opptil 5000 elementer, og integrasjonsutviklere anbefales å benytte denne funksjonaliteten, da det skaper vesentlig mindre trykk på systemet.

Noen viktige punkter:

* Innloggingsnivå er et obligatorisk felt både på gruppe og hendelser, og gruppens innloggingsnivå settes til det høyeste av gruppens nivå og nivået til alle hendelser i gruppen. Dvs. at hvis en gruppe har en hendelse med nivå 4, vil ikke gruppen eller gruppens hendelser fremkomme i et søk gjort med innloggingsnivp 3, selv om noen av disse hendelsene skulle ha nivå 3.
* Dato er ikke et obligatorisk felt på gruppe, men det er obligatorisk på hendelser. Hvis ikke gruppen har dato vil dato bli satt til datoen til den første hendelsen i gruppen. Hvis gruppen er opprettet med en dato vil denne benyttes uavhengig av dato på gruppens hendelser. 
* Hvis man ikke har informasjon for å sette et felt (f.eks. om man ikke har "avsender" for en forsendelse) bør ikke feltet settes (i stede for å sette "null", "mangler" eller lignende).
* For _fiks organisasjon_ og _enhet_ kan man i tillegg til å sette identifikator også sette visningsnavn. Dette vil bli benyttet i webapplikasjonens grensesnitt og filter. Merk at hvis man endrer dette vil det nye navnet bare benyttes på grupper / hendelser som er indeksert etter endringen ble gjort. For å gjøre en fullstendig operasjon må hendelsene reindekseres.
* _Eksponert for_ angir hvem som skal kunne se forsendelsen. Dette kan være endten et organisasjonsnummer eller et fødselsnummer. Merk at  

## Søketjeneste [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/hendelse-indexer-api.json)
Grupper og hendelser som er indeksert gjennom api'et over kan søkes frem gjennom søketjenesten. Søkeresultatet kan filtereres, pagineres, og sorteres, men i hovedsak er løsningen basert på fritekstsøk av all data i en gruppe / hendelse. På dags dato støttes ikke søk i dokumentinnhold, men det vurderes å utvide med denne funksjonaliteten. 

Standardsøket benytter _relevans_ som sorteringskriterie. Dette er en kombinasjon av hvor godt søket traff eventuelle søkeord, hvor gammel den aktuelle gruppen er, og eventuell "boost" som gruppen / hendelsen har blitt tildelt. Kriterier for boost vil varierer avhengig av hvilke elementer som finnes i resultatet, uleste forsendelser anses for eksempel som mer relevante enn leste.

Alle søk er også filtrert på innloggingsnivå. Et søk gjort med innlogging på nivå tre vil ikke returnere grupper som er satt til nivå fire, uavhengig av om disse gruppene traff på søket. 


## Webapplikasjon [(test)](https://minside.fiks.test.ks.no/meldingsboks/sok)

Webapplikasjonen benyttes for å la innbyggere søke i sine egne forsendelser, eller i forsendelser som er eksponert for en organisasjon de har en rolle i. 

 
## SvarUt Integrasjon








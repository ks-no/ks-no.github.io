---
title: KS læring integrasjon
date: 2020-10-16
aliases: [/kslering/integrasjon]
hidden: true
---
**SIDEN ER UNDER UTVIKLING**

## Prosedyre for KS Læring HR API

1. Kommunens representant sender inn en en henvendelse til fiks@ks.no og informerer om at kommunen ønsker å begynne å bruke HR API
Med bakgrunn i dette skjemaet, opprettes en sak hos KS. All skriftlig kommunikasjon går via den saken.

2. Teknisk dokumentasjon til kommune og utvikler

[ks-hrdataapi_v3-20200128.pdf](https://github.com/ks-no/ks-no.github.io/files/6569985/ks-hrdataapi_v3-20200128.pdf) Dette dokumentet inneholder teknisk beskrivelse av KS HR API. Beskrivelsen er utarbeidet av Catalyst.

[Presentasjon API.pptx](https://github.com/ks-no/ks-no.github.io/files/6570229/Presentasjon.API.pptx)

Saksbehandler i KS-læring kan kalle inn til et teamsmøte mellom de som skal utføre det tekniske arbeidet på begge sider, hvis ønskelig. En slik henvendelse tas via saken som ble opprettet under punkt 1

Eksempelkode for KS Læring HR-adapter mot Visma: https://github.com/ks-no/kslaring-hradapter-visma

3. Utvikler hos kommunen leverer endepunktene som de har utviklet, til KS-læring (via saken som ble opprettet under punkt 1)
Her må KS Læring få URLene til de obligatoriske endepunktene. Bekreft at IP 18.185.188.40 (jumpserver for lab-miljøet) og 18.197.107.188 (jumpserver for prod-miljøet) er whitelisted. 

**Loginmetode:** Basic Auth med brukernavn og passord.

4. KS læring tester alle endepunktene via curl i serveren


5. KS Læring tester endepunktene Authority og Organisation først i LAB

Når data er på plass må KS bekrefte med bestiller at org strukturen ser riktig ut før KS begynner med Person og Employee_position


6. KS Læring tester endepunktene Person og Employee_position
Når kunden/kommunen har bekreftet at organisasjonsstrukturen i LAB er riktig kan vi gå over til å teste Person og Employee_position.

Når data har kommet inn kan kunde logge inn og bekrefte at dataene ser riktig ut og personer ligger i riktig enhet. Hvis alt er på plass, kan databasen rulles tilbake og KS kan sette det opp i produksjon

7. Når testingen er ferdig og alt ser bra ut i LAB kan KS sette opp APIet i prod.



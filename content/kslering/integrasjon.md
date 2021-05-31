---
title: KS læring integrasjon
date: 2020-10-16
---
SIDEN ER UNDER UTVIKLING
Detaljert teknisk dokumentasjon for ansatte i KS Læring, ligger i Confluence

## Prosedyre for KS Læring HR API

1. Kommunens representant sender inn en bestilling via skjemaet
https://skjema.kf.no/FormsEngine/?wizardId=5497&externalid=ks
Med bakrgunn i dette skjemaet, opprettes en sak hos KS. All skriftlig kommunikasjon går via den saken.

2. Saksbehandler i KS-læring, kaller inn til et temasmøte mellom de som skal utføre det tekniske arbeidet på begge sider. Der gjennomgås sentrale momenter for oppsett av integrasjon.

3.	Utvikler hos kommunen leverer endepunktene som de har utviklet, til KS-læring (via saken som ble opprettet under punkt 1)
Her må KS Læring få URLene til de obligatoriske endepuntkene. Bekreft at IP 18.185.188.40 og 18.197.107.188 er whitelisted. Hvis kommunen har satt opp Basic Auth så må vi få brukernavn og passord.

4. KS læring tester alle endepunktene via curl i serveren

Først testes forbindelse og hvorvidt dataene ser riktige ut. Data sammenlignes med det som står i swagger for å finne åpenbare feil.
Eks: curl -u brukernavn:passord https://test.kommune.no/api/ksl/v3/organisation
NB: hvis kunden har whitelist så må curl kjøres direkte fra KSL serveren.

5. KS Læring tester endepunktene Authority og Organisation først i LAB
Se neste side for oppsett av en kommune i KS Læring


6.	KS Læring tester endepunktene Person og Employee_position
Når kunden(kommunen har bekreftet at organisasjonsstrukturen i LAB er riktig kan vi gå over til å teste Person og Employee_position.
Lage dokumentasjon på snapshot
NB! Disse endpunktene inneholder fødselsnummer så det må lages en backup av databasen før du starter med testingen. Husk også å gi beskjed til de som jobber i LAB at data ikke blir lagret fra og med da du lagde et snapshot.
Når data har kommet inn kan kunde logge inn og bekrefte at dataene ser riktig ut og personer ligger i riktig enhet. Hvis alt er på plass og databasen kan rulles tilbake og vi kan sette det opp i produksjon

7. Når testingen er ferdig og alt ser bra ut i LAB kan vi sette opp APIet i prod.


## Single sign On (SSO)

## Azure AD
1. Logg inn i Azure AD portalen (https://aad.portal.azure.com)
![alt text](https://github.com/ks-no/ks-no.github.io/blob/source/content/kslering/image%20(7).png)

2. Gå til Basic SAML Configuration
3. Velg deretter "Single Sign on", og 

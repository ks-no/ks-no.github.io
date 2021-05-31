---
title: KS læring integrasjon
date: 2020-10-16
---

Dokumentasjon på integrajsoner mot KS læring kommer her.

##Prosedyre for KS Læring HR API

1. Kommunens representant sender inn en bestilling via tilleggstjenesteskjemaet
https://skjema.kf.no/FormsEngine/?wizardId=5497&externalid=ks

2. Saksbehandler i KS-læring, kaller inn til et temasmøte mellom de som skal utføre det tekniske arbeidet på begge sider, der sentrale momenter gjennomgås
Blant annet: https://kshrdata.catalyst-eu.net/
https://www.kslaring.no/pluginfile.php/58265/mod_book/chapter/763/2020-01-28%20ks-hrdataapi_v3-20200128.pdf

3.	Utvikler leverer endepunktene som de har utviklet, til KS-læring (via saken som ble opprettet under punkt 1)
Her må vi få URLene til de obligatoriske endepuntkene. Bekreft at IP 18.185.188.40 og 18.197.107.188 er whitelisted. Hvis de har satt opp Basic Auth så må vi få brukernavn og passord.

4. KS læring tester alle endepunktene via curl i serveren

Først testes forbindelse og hvorvidt dataene ser riktige ut. Data sammenlignes med det som står i swagger for å finne åpenbare feil.
Eks: curl -u brukernavn:passord https://test.kommune.no/api/ksl/v3/organisation
NB: hvis kunden har whitelist så må curl kjøres direkte fra KSL serveren.

5. KS Læring tester endepunktene Authority og Organisation først i LAB
Se neste side for oppsett av en kommune i KS Læring
Vi legger til endepunktene Authority og Organisation i LAB og lar cron jobben kjøre. Hvis det ikke opprettes noe data inne i myndighetsnoden så må det feilsøkes.
Når data er på plass må vi bekrefte med bestiller at org strukturen ser riktig ut før vi begynner med Person og Employee_position

6.	KS Læring tester endepunktene Person og Employee_position
Når kunden har bekreftet at organisasjonsstrukturen i LAB er riktig kan vi gå over til å teste Person og Employee_position.
Lage dokumentasjon på snapshot
NB! Disse endpunktene inneholder fødselsnummer så det må lages en backup av databasen før du starter med testingen. Husk også å gi beskjed til de som jobber i LAB at data ikke blir lagret fra og med da du lagde et snapshot.
Når data har kommet inn kan kunde logge inn og bekrefte at dataene ser riktig ut og personer ligger i riktig enhet. Hvis alt er på plass og databasen kan rulles tilbake og vi kan sette det opp i produksjon

7. Når testingen er ferdig og alt ser bra ut i LAB kan vi sette opp APIet i prod.


Single sign On (SSO)

Azure AD

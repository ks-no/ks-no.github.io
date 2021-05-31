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

2. Teknisk dokumentasjon til kommune og utvikler
[ks-hrdataapi_v3-20200128.pdf](https://github.com/ks-no/ks-no.github.io/files/6569985/ks-hrdataapi_v3-20200128.pdf)

Saksbehandler i KS-læring kan kalle inn til et teamsmøte mellom de som skal utføre det tekniske arbeidet på begge sider, hvis ønskelig. En slik henvendelse tas via saken som ble opprettet under punkt 1

3.	Utvikler hos kommunen leverer endepunktene som de har utviklet, til KS-læring (via saken som ble opprettet under punkt 1)
Her må KS Læring få URLene til de obligatoriske endepuntkene. Bekreft at IP 18.185.188.40 og 18.197.107.188 er whitelisted. Hvis kommunen har satt opp Basic Auth så må vi få brukernavn og passord.

4. KS læring tester alle endepunktene via curl i serveren

Først testes forbindelse og hvorvidt dataene ser riktige ut. Data sammenlignes med det som står i swagger for å finne åpenbare feil.
Eks: curl -u brukernavn:passord https://test.kommune.no/api/ksl/v3/organisation
NB: hvis kunden har whitelist så må curl kjøres direkte fra KSL serveren.

5. KS Læring tester endepunktene Authority og Organisation først i LAB

KS legger til endepunktene Authority og Organisation i LAB og lar cron jobben kjøre. Hvis det ikke opprettes noe data inne i myndighetsnoden så må det feilsøkes.
Når data er på plass må vi bekrefte med bestiller at org strukturen ser riktig ut før vi begynner med Person og Employee_position


6.	KS Læring tester endepunktene Person og Employee_position
Når kunden/kommunen har bekreftet at organisasjonsstrukturen i LAB er riktig kan vi gå over til å teste Person og Employee_position.
Lage dokumentasjon på snapshot
NB! Disse endpunktene inneholder fødselsnummer så tekniker i KS må opprette en backup av databasen før testingen starter opp. 

Når data har kommet inn kan kunde logge inn og bekrefte at dataene ser riktig ut og personer ligger i riktig enhet. Hvis alt er på plass, kan databasen rulles tilbake og KS kan sette det opp i produksjon

7. Når testingen er ferdig og alt ser bra ut i LAB kan vi sette opp APIet i prod.


## Single sign On (SSO)

## Azure AD
1. Logg inn i Azure AD portalen (https://aad.portal.azure.com)

2. Gå til Basic SAML Configuration

Entidy ID: https://www.kslaring.no/auth/saml2/sp/metadata.php

Reply URL: https://www.kslaring.no/auth/saml2/sp/saml2/-acs.php/www.kslaring.no

Logout URL: https://www.kslaring.no/auth/saml2/sp/saml2-logout.php/www.kslaring.no

![image (7)](https://user-images.githubusercontent.com/85100070/120184144-f031e880-c210-11eb-9dde-a442e8df21d4.png)

3. Velg deretter "Single Sign on"
![image (8)](https://user-images.githubusercontent.com/85100070/120185592-b3ff8780-c212-11eb-904c-54e4e96191cc.png)

4. 
![image (9)](https://user-images.githubusercontent.com/85100070/120188533-887e9c00-c216-11eb-8c65-c215f1b0d332.png)

5.
![image (10)](https://user-images.githubusercontent.com/85100070/120188771-d0052800-c216-11eb-9a40-e8668624c650.png)

6.
![image (11)](https://user-images.githubusercontent.com/85100070/120188786-d6939f80-c216-11eb-8025-be8e50f7bc7e.png)


---
title: KS læring integrasjon
date: 2020-10-16
---
**SIDEN ER UNDER UTVIKLING**

## Prosedyre for KS Læring HR API

1. Kommunens representant sender inn en bestilling via bestillingsskjemaet
https://skjema.kf.no/FormsEngine/?wizardId=5497&externalid=ks
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


## Single sign On (SSO)
1. Bestilling

Kommune / IKT samarbeidet sender bestilling med meta-datalenke. Gjerne i forbindelse med sak spm er opprettet under bestilling av HR API.

2. Grunnoppsett

Sertifikater
Manuelt importere rot-sertifikatet til KS fra lenke https://www.commfides.com/wp-content/uploads/2017/09/cpnrootcasha256class3.zip. Rot-sertifikatet skal installeres i mappen Trusted Root Certificates Authorities, Microsoft AD FS kan komme til å foreslå Intermediate Certification Authorities.

Relaying party trust
Sette opp relying party trust basert på provider meta-data link tilsendt i e-post. Eks: https://www.kslaring.no/auth/saml2/sp/metadata.php?idp=<kommunenavn>
Merk at det kan hende kommunesamarbeidet sitt navn skal stå istedet for kommunenavn, etter idp=

3. Oppsett i KS Læring (utføres av KS)
  
4. Testing

  a. Teste en pålogging via test-lenke 
  Logg inn via SSO, klikk på linken under. Bytt ut <id> med kommunenavn/kommunesamarbeid. 
  https://www.kslaring.no/auth/saml2/login.php?idp=<id> 
  Hvis det er feil i sertifikat, så får dere en "SAML2 exception: responder"-feil fra KS Læring. Dere må sjekke at nedlastet root-sertifikat er riktig installert og på riktig  server hos dere. 
  Hvis det er feil i claims, så får dere «You have logged in succesfully but we could not find your 'eksempel' attribute to associate you to an account in Moodle.» i KS Læring,  men får en feilmelding om feil mapping/attributt. Forsett til steg 3b, sjekk av attributter, via tilsendt lenke for dette. 

  b. 
  –  Når du er innlogget, klikk på linken under for å sjekke liste over attributter: (hos kommunen)
  https://www.kslaring.no/auth/saml2/test.php 

  c. Send den faktiske responsen fra test.php til KS 
  Må sendes som tekst - IKKE skjermbilde! 
  OBS! Faktisk fødselsnummer må fjernes fra teksten! 

5. Test på nytt
Test pålogging i nettlesere fra flere produsenter - Google Chrome, Apple Safari, Microsoft Internet Explorer, Mozilla Firefox, Opera etc. 
Dere sjekker at profilen stemmer overens med det som er forventet. 
Hvis dere får feil i profilen, tar dere kontakt med KS, via opprettet helpdesk-sak i innledense prosess. 

6. Meld i fra når ok
Gi skriftlig beskjed til KS når alt er OK, slik at saken kan avsluttes.   
  
  
## Azure AD
Konfigurere SSO med SAML for KS læring

  Se detaljert brukerveiledning her: [KS læring SSO Azure oppsett.pdf](https://github.com/ks-no/ks-no.github.io/blob/source/content/kslering/KS%20L%C3%A6ring%20SSO%20Azure%20oppsett.pdf) 
  
1. Logg på https://portal.azure.com med en bruker med tilstrekkelig rettigheter til å opprette Enterprise applikasjoner.
  ![image](https://user-images.githubusercontent.com/85100070/124441985-93c86880-dd7c-11eb-9779-a44c6caaa795.png)
  
  ![image](https://user-images.githubusercontent.com/85100070/124442074-a6db3880-dd7c-11eb-8079-e5eb5a0f5bfd.png)

  ![image](https://user-images.githubusercontent.com/85100070/124442105-ae024680-dd7c-11eb-8a19-0898cc88f206.png)

  ![image](https://user-images.githubusercontent.com/85100070/124442152-ba869f00-dd7c-11eb-8261-afba55bb79db.png)
  
  ![image](https://user-images.githubusercontent.com/85100070/124442175-c1adad00-dd7c-11eb-8356-f7145d6e22be.png)

  ![image](https://user-images.githubusercontent.com/85100070/124442200-c70af780-dd7c-11eb-8d31-5527aad05cbc.png)
  
  ![image](https://user-images.githubusercontent.com/85100070/124442232-ce320580-dd7c-11eb-8051-7ddb16f0d2ab.png)

  ![image](https://user-images.githubusercontent.com/85100070/124442253-d38f5000-dd7c-11eb-9ff3-6400036229cb.png)

* Identifier (Entity ID): https://www.kslaring.no/auth/saml2/sp/metadata.php
* Reply URL (Assertion Consumer Service URL): https://www.kslaring.no/auth/saml2/sp/saml2-acs.php/www.kslaring.no
* Logout Url: https://www.kslaring.no/auth/saml2/sp/saml2-logout.php/www.kslaring.no 


NB: Om du synker brukere fra on-prem AD, så må Azure AD Connect konfigureres slik at employeenumber attributet blir synket til Azure AD før neste steg kan gjennomføres.
Dette er beskrevet i denne artikkelen:
https://docs.microsoft.com/en-us/answers/questions/87509/how-do-i-sync-employee-number-attribute-from-onpre.html 

![image](https://user-images.githubusercontent.com/85100070/124442809-64662b80-dd7d-11eb-8202-88c01acbcdaa.png)

  ![image](https://user-images.githubusercontent.com/85100070/124442828-692adf80-dd7d-11eb-9d6b-cf394b241925.png)

  ![image](https://user-images.githubusercontent.com/85100070/124442840-6c25d000-dd7d-11eb-89be-9a296ebeb89b.png)

  **App Federation Metadata Url må sendes over til KS**

  



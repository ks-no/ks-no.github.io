---
title: Single Sign On
date: 2021-02-09
---
## Single sign On (SSO)
1. Bestilling

Kommune / IKT samarbeidet sender bestilling med meta-datalenke. Gjerne i forbindelse med sak som er opprettet under bestilling av HR API.

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
**Konfigurere SSO med SAML for KS læring**

  Se brukerveildeningen i pdf-format her: [KS læring SSO Azure oppsett2.pdf](https://github.com/ks-no/ks-no.github.io/blob/source/content/kslering/KS%20L%C3%A6ring%20SSO%20Azure%20oppsett2.pdf) 
  
* Logg på https://portal.azure.com med en bruker med tilstrekkelig rettigheter til å opprette Enterprise applikasjoner.
![image](https://user-images.githubusercontent.com/85100070/124573054-79a88c00-de49-11eb-842e-588f152bedfd.png)

 ![image](https://user-images.githubusercontent.com/85100070/124573083-81683080-de49-11eb-9285-600f9d434007.png)

![image](https://user-images.githubusercontent.com/85100070/124573110-888f3e80-de49-11eb-8ec5-cf2ecb933667.png)

![image](https://user-images.githubusercontent.com/85100070/124573132-8fb64c80-de49-11eb-9d83-8ac79b018fe1.png)

![image](https://user-images.githubusercontent.com/85100070/124573159-947b0080-de49-11eb-992e-1a2008e06831.png)

![image](https://user-images.githubusercontent.com/85100070/124573181-99d84b00-de49-11eb-8418-aa005f8dda9c.png)

![image](https://user-images.githubusercontent.com/85100070/124573217-9fce2c00-de49-11eb-98e6-461a51cbfc4c.png)

![image](https://user-images.githubusercontent.com/85100070/124573247-a492e000-de49-11eb-8cec-c0ea9c95ba0f.png)


* Identifier (Entity ID): https://www.kslaring.no/auth/saml2/sp/metadata.php
* Reply URL (Assertion Consumer Service URL): https://www.kslaring.no/auth/saml2/sp/saml2-acs.php/www.kslaring.no
* Logout Url: https://www.kslaring.no/auth/saml2/sp/saml2-logout.php/www.kslaring.no 


NB: Hvis du synker brukere fra on-prem AD, så må Azure AD Connect konfigureres slik at employeenumber attributet blir synket til Azure AD før neste steg kan gjennomføres.
Dette er beskrevet i denne artikkelen:
https://docs.microsoft.com/en-us/answers/questions/87509/how-do-i-sync-employee-number-attribute-from-onpre.html 

![image](https://user-images.githubusercontent.com/85100070/124573327-baa0a080-de49-11eb-807d-8d44842ea9dd.png)


![image](https://user-images.githubusercontent.com/85100070/124573345-bffdeb00-de49-11eb-97d7-4770554cdf86.png)

![image](https://user-images.githubusercontent.com/85100070/124581372-584b9e00-de51-11eb-8379-fb8e2e0d73f4.png)

  **App Federation Metadata Url må sendes over til KS**

![image](https://user-images.githubusercontent.com/85100070/124443030-9bd4d800-dd7d-11eb-9916-3e0f596a73e9.png)

  * Legg til rettigheter til de som skal benytte SSO mot KS læring
  
![image](https://user-images.githubusercontent.com/85100070/124443067-a8593080-dd7d-11eb-92b5-1fb1980507bd.png)

## Innlogging uten fødselsnummer
Hvis kommunen ønsker innlogging SSO uten fødselsnummer må de ta kontakt med fiks på fiks@ks.no
Vi bruker da en annen identifikator, fortrinnsvis en <id>@<fiksorgiden>. 

Når en ikke bruker fødselsnummer som id på brukeren, vil innlogginger med idporten resultere i en annen bruker. 
Hvis du logger inn med idporten vil du få en bruker som er identifisert med fødselsnummer, hvis du bruker SSO vil du få en bruker som har id <id>@<fiksordid>.
Disse 2 brukerene vil være helt forskjellige brukere og ikke dele hvilken kurs som er tatt.

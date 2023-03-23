---
title: Single Sign On
date: 2022-06-23
aliases: [/kslering/SingleSignOn]
hidden: true
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
   Hvis det er feil i sertifikat, så får dere en "SAML2 exception: responder"-feil fra KS Læring. Dere må sjekke at nedlastet root-sertifikat er riktig installert og på riktig server hos dere.
   Hvis det er feil i claims, så får dere «You have logged in succesfully but we could not find your 'eksempel' attribute to associate you to an account in Moodle.» i KS Læring, men får en feilmelding om feil mapping/attributt. Forsett til steg 3b, sjekk av attributter, via tilsendt lenke for dette.
   b.
   – Når du er innlogget, klikk på linken under for å sjekke liste over attributter: (hos kommunen)
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
Se brukerveildeningen i pdf-format her: https://portal.fiks.ks.no/wp-content/uploads/2023/03/SSO_med_fnr.pdf
* Identifier (Entity ID): https://www.kslaring.no/auth/saml2/sp/metadata.php
* Reply URL (Assertion Consumer Service URL): https://www.kslaring.no/auth/saml2/sp/saml2-acs.php/www.kslaring.no
* Logout Url: https://www.kslaring.no/auth/saml2/sp/saml2-logout.php/www.kslaring.no
## Innlogging uten fødselsnummer (valgfri identifikator)
Identifikator blir fortrinnsvis bygget opp slik: "id"@"fiksorgiden".
Se brukerveildeningen i pdf-format her: https://portal.fiks.ks.no/wp-content/uploads/2023/03/SSO_uten_fnr.pdf
Når en ikke bruker fødselsnummer som id på brukeren, vil innlogginger med idporten resultere i en annen bruker.
Hvis du logger inn med idporten vil du få en bruker som er identifisert med fødselsnummer, hvis du bruker SSO vil du få en bruker som har id <id>@<fiksordid>.
Disse 2 brukerene vil være helt forskjellige brukere og ikke dele hvilken kurs som er tatt.

Single sign On (SSO)
Bestilling
Kommune / IKT samarbeidet sender bestilling med meta-datalenke. Gjerne i forbindelse med sak spm er opprettet under bestilling av HR API.

Grunnoppsett
Sertifikater Manuelt importere rot-sertifikatet til KS fra lenke https://www.commfides.com/wp-content/uploads/2017/09/cpnrootcasha256class3.zip. Rot-sertifikatet skal installeres i mappen Trusted Root Certificates Authorities, Microsoft AD FS kan komme til å foreslå Intermediate Certification Authorities.

Relaying party trust Sette opp relying party trust basert på provider meta-data link tilsendt i e-post. Eks: https://www.kslaring.no/auth/saml2/sp/metadata.php?idp= Merk at det kan hende kommunesamarbeidet sitt navn skal stå istedet for kommunenavn, etter idp=

Oppsett i KS Læring (utføres av KS)

Testing

a. Teste en pålogging via test-lenke Logg inn via SSO, klikk på linken under. Bytt ut med kommunenavn/kommunesamarbeid. https://www.kslaring.no/auth/saml2/login.php?idp= Hvis det er feil i sertifikat, så får dere en "SAML2 exception: responder"-feil fra KS Læring. Dere må sjekke at nedlastet root-sertifikat er riktig installert og på riktig server hos dere. Hvis det er feil i claims, så får dere «You have logged in succesfully but we could not find your 'eksempel' attribute to associate you to an account in Moodle.» i KS Læring, men får en feilmelding om feil mapping/attributt. Forsett til steg 3b, sjekk av attributter, via tilsendt lenke for dette.

b. – Når du er innlogget, klikk på linken under for å sjekke liste over attributter: (hos kommunen) https://www.kslaring.no/auth/saml2/test.php

c. Send den faktiske responsen fra test.php til KS Må sendes som tekst - IKKE skjermbilde! OBS! Faktisk fødselsnummer må fjernes fra teksten!

Test på nytt Test pålogging i nettlesere fra flere produsenter - Google Chrome, Apple Safari, Microsoft Internet Explorer, Mozilla Firefox, Opera etc. Dere sjekker at profilen stemmer overens med det som er forventet. Hvis dere får feil i profilen, tar dere kontakt med KS, via opprettet helpdesk-sak i innledense prosess.

Meld i fra når ok Gi skriftlig beskjed til KS når alt er OK, slik at saken kan avsluttes.

Azure AD
Konfigurere SSO med SAML for KS læring

Se brukerveildeningen i pdf-format her: KS læring SSO Azure oppsett2.pdf

Logg på https://portal.azure.com med en bruker med tilstrekkelig rettigheter til å opprette Enterprise applikasjoner. image
image

image

image

image

image

image

image

Identifier (Entity ID): https://www.kslaring.no/auth/saml2/sp/metadata.php
Reply URL (Assertion Consumer Service URL): https://www.kslaring.no/auth/saml2/sp/saml2-acs.php/www.kslaring.no
Logout Url: https://www.kslaring.no/auth/saml2/sp/saml2-logout.php/www.kslaring.no
NB: Hvis du synker brukere fra on-prem AD, så må Azure AD Connect konfigureres slik at employeenumber attributet blir synket til Azure AD før neste steg kan gjennomføres. Dette er beskrevet i denne artikkelen: https://docs.microsoft.com/en-us/answers/questions/87509/how-do-i-sync-employee-number-attribute-from-onpre.html

image

image

image

App Federation Metadata Url må sendes over til KS

image

Legg til rettigheter til de som skal benytte SSO mot KS læring
image

---
title: Testmiljø
date: 2018-05-29
---

Fiks plattformens testmiljø er tilgjengelig for kommuner og leverandører som ønsker å teste konfigurasjon og integrasjoner. Miljøet er koblet til eksterne testmiljøer for integrerte komponenter: ID-Porten, Altinn og KS-SvarUt. Man kan dermed teste hele løpet, komplett med autentisering og autorisering. 

Fiks test blir brukt til å verifisere endringer før de går i produksjon, og vil derfor ligge litt foran produksjon. Vi har ingen garantier på oppetid i test, men forsøker å holde evt. nedetid så kort som mulig.

Merk at testmiljøet ikke har de samme sikkerhetsgarantiene som produksjon - det er dermed viktig at man ikke benytter sensitive data under test. 

### Tilgang til testmiljøet
Send mail til fiks@ks.no for tilgang til testmiljøet. Send gjerne med evt. eksisterende test brukere i ID-Porten slik at disse kan gjennbrukes for tilganger på Fiks plattformen.

### Hvor er testmiljøet?
Minside kan nås på https://minside.fiks.test.ks.no, konfigurasjon finnes på https://minside.fiks.test.ks.no/fiks-konfigurasjon/. Benytt ID-Porten testbruker for innlogging. 

SvarUt data for "Post fra kommunen" på Minside kommer fra SvarUts testmiljø. Aktiver avsendere i fiks konfigurasjon for å indeksere meldinger.

### Person-innlogging
Alle testbrukere dere får fra oss har "Min Id" innlogging i ID-Porten. Her anbefaler vi at dere setter tlfnr og epost slik at brukeren kan låses opp om noen skulle sperre den med feilede innloggingsforsøk.

### Integrasjon-innlogging
For å kunne teste integrasjoner mot Fiks plattformen i test må organisasjonen ha en ID-Porten konto. For å få dette må en henvende seg til idporten@difi.no og sende med orgnr i fra testvirksomhetssertifikat.

Etter at konto er registrert hos idporten kan integrasjonen opprettes og autoriseres i fiks konfigurasjon.

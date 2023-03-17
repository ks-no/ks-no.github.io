---
title: Testmiljø
date: 2018-05-29
aliases: ["/fiks-platform/testmiljo", "/fiks-plattform/testmiljo"]
---

Fiks-plattformens testmiljø er tilgjengelig for kommuner,fylkeskommuner og leverandører som ønsker å teste konfigurasjon og integrasjoner. Miljøet er koblet til eksterne testmiljøer for integrerte komponenter: ID-Porten, Altinn og KS-SvarUt. Man kan dermed teste hele løpet, komplett med autentisering og autorisering. 

Fiks test blir brukt til å verifisere endringer før de går i produksjon, og vil derfor ligge litt foran produksjon. Vi har ingen garantier på oppetid i test, men forsøker å holde eventuell nedetid så kort som mulig.

Merk at testmiljøet ikke har de samme sikkerhetsgarantiene som produksjon - det er dermed viktig at man ikke benytter sensitive data under test. 

## Tilgang til testmiljøet
Send e-post til fiks@ks.no for tilgang til testmiljøet. Send gjerne med eventuelle eksisterende testbrukere i ID-porten, slik at disse kan gjenbrukes for tilganger på Fiks-plattformen.

## Hvor er testmiljøet?

Konfigurasjon finnes på https://forvaltning.fiks.test.ks.no. 

Min kommune finnes på https://min.fiks.test.ks.no/

Bekymringsmelding finnes på https://bekymringsmelding.fiks.test.ks.no/

SvarUt finnes på https://test.svarut.ks.no

Benytt ID-porten testbruker for innlogging. 

SvarUt data for "Post fra kommunen" på Minside kommer fra SvarUts testmiljø. Aktiver avsendere i Fiks-konfigurasjonen for å indeksere meldinger.

## Ekstrene lenker til andre testmiljø

Altinn test: https://tt02.altinn.no

Digipost test: https://www.difitest.digipost.no/

eBoks test: http://demo2-www.e-boks.no/default.aspx

idporten brukerprofil (krr og valg av postkasse): https://brukerprofil-ver2.difi.no/minprofil/ og  https://brukerprofil-ver1.difi.no/minprofil/ Må endres begge plasser da forskjellige
tjenester bruker forskjellig testmiljø hos digdir.

Tenor testdata for f.eks folkeregisteret: https://www.skatteetaten.no/skjema/testdata/

## Personinnlogging
Alle testbrukere dere får fra oss har "Min Id"-innlogging i ID-Porten. Her anbefaler vi at dere setter telefonnummer og e-post slik at brukeren kan låses opp om noen skulle sperre den med feilede innloggingsforsøk.

## Integrasjoninnlogging
For å kunne teste integrasjoner mot Fiks-plattformen i test må organisasjonen ha en ID-porten-konto. For å få dette må en henvende seg til idporten@difi.no og sende med orgnr i fra testvirksomhetssertifikat.

Etter at konto er registrert hos ID-porten kan integrasjonen opprettes og autoriseres i Fiks-konfigurasjon.
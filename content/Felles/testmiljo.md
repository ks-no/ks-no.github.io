---
title: Testmiljø
date: 2026-10-10
aliases: ["/fiks-platform/testmiljo", "/fiks-plattform/testmiljo"]
---

Fiks-plattformens testmiljø er for kommuner, fylkeskommuner og leverandører som vil teste konfigurasjon og integrasjoner. Miljøet er koblet til testmiljøene til ID-porten, Altinn og SvarUt, så du kan teste hele løpet, med autentisering og autorisasjon.

Vi bruker testmiljøet til å verifisere endringer før de går i produksjon, så det ligger som regel litt foran produksjon. Vi garanterer ikke oppetid i test, men prøver å holde nedetid kort.

Testmiljøet har ikke samme sikkerhet som produksjon. Testmiljøet skal bare inneholde testdata. Produksjonsdata skal ikke inn i testmiljøet: ikke personopplysninger, ikke dokumenter og ikke annet som kommer fra reelle saker. Bruk syntetiske testpersoner. Organisasjoner er som regel deres egne fra Enhetsregisteret, og det er dem testvirksomhetssertifikatet er utstedt til.

## Tilgang til testmiljøet

Send e-post til [fiks@ksdigital.no](mailto:fiks@ksdigital.no). Har dere alt testbrukere i ID-porten, send dem med, så kan de få tilganger på Fiks-plattformen.

## Adresser i testmiljøet

| Hva | Adresse |
|---|---|
| Fiks forvaltning | https://forvaltning.fiks.test.ks.no/ |
| Min kommune | https://min.fiks.test.ks.no/ |
| Bekymringsmelding | https://bekymringsmelding.fiks.test.ks.no/ |
| SvarUt | https://test.svarut.ks.no/ |

Logg inn med en testbruker fra ID-porten.

«Post fra kommunen» på Minside henter data fra SvarUts testmiljø. Aktiver avsendere i Fiks forvaltning for å indeksere meldinger.

## Andre testmiljøer

| Hva | Adresse |
|---|---|
| Altinn test | https://tt02.altinn.no/ |
| Digipost test | https://www.difitest.digipost.no/ |
| Tenor testdata, for eksempel for Folkeregisteret | https://www.skatteetaten.no/testdata/ |

## Personinnlogging

Testbrukerne dere får fra oss, logger inn med MinID i ID-porten. Legg inn telefonnummer og e-post på dem, så kan brukeren låses opp hvis noen sperrer den med mislykkede innlogginger.

## Integrasjoner

For å teste integrasjoner trenger du en Maskinporten-klient i Digdirs testmiljø med scopet `ks:fiks`, og en Fiks-integrasjon i testmiljøet til Fiks forvaltning. Hvordan du får det på plass, står på [Integrasjoner]({{% ref "Felles/integrasjoner.md#test-og-produksjon" %}}).

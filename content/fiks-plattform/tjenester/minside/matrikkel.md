---
title: Matrikkel
date: 2019-08-14
aliases: [/fiks-platform/tjenester/matrikkel, /fiks-plattform/tjenester/matrikkel]
---

## Minside

Fiks-plattformen får med denne tjenesten støtte for matrikkelinformasjon. En innbyggers eiendommmer blir eksponert på minside.kommune.no, gjennom "Mine Eiendommer" og hovedsøket, og ved at Fiks Innsyn får støtte for å eksponere meldinger for eiere av en eiendom. Tilgang til denne meldingen vil da følge nye eiere av samme eiendom.

## Ta i bruk tjenesten
Matrikkelinformasjon lastes på nasjonalt nivå, det er dermed ikke nødvendig for den enkelte kommune å ta denne tjensten i bruk, men det er mulig å tilpasse den til kommunens behov. I utgangspunktet benyttes  [seeiendom.kartverket.no](https://seeiendom.kartverket.no) for detaljinformasjon om eiendommer på minside.kommune.no, men kommuner som har eksisterende eiendomstjenester kan registrere disse via Matrikkel-tjenesten i Fiks Konfigurasjon - lenker til disse tjenestene vil da være tilgjengelig på eiendommer innenfor kommunen.

![matrikkel](/images/matrikkel.png "Matrikkel")

## API
Gjennom matrikke-eier APIet kan det gjøres oppslag i matrikkelen. Enten for å finne hvilke eiendommer en person eller organisasjon eier, eller oppslag for å finne hvem som eier en spesifikk eiendom. En integrasjon må bli gitt MATRIKKEL.QUERY privilegiet på tjenesten Minside: Mine Eiendommer for å kunne bruke APIet.
 [API for Matrikkel-eier](https://editor.swagger.io/?url=https://ks-no.github.io/api/matrikkel-eier-oppslag-api-v1.json)

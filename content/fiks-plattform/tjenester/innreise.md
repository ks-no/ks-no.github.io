---
title: Innreiseregister fra Helsedirektoratet
date: 2021-04-27
---

### Status
Tjenesten er foreløpig bare tilgjengelig i test-miljøet til KS, ikke prod. 

### Formål
Fiks innreise er en tjeneste for å kunne gjøre oppslag mot Helsedirektoratet (HDIR) sitt innreiseregister. 
Datagrunnlaget vil vere basert på en daglig datadump fra HDIR: Hver natt vil KS importere data for de siste 10 dager fra HDIR. 
Siste oppdatering på dataene som ligger hos KS vil vere ved midnatt samme dag, og dette betyr at man ikkje kan spørre etter innreiser fra dagens dato.

### Produktbeskrivelse
Tjenesten vil tilby et api der kommuner, som er blitt gitt tilgang til tjenesten, kan spørre etter innreiser basert på et filter. 
Dette kan for eksemple vere å spørre etter innreiser til et gitt kommunenummer eller fødselsnummer/dnummer/preg-nummer (nytt nasjonalt hjelpenummer).

Fiks innreise gjør ingenting med dataene som blir importert fra HDIR, så feltene og innholdet blir styrt av HDIR.  

### Integrasjon [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/innreise-api-v1.json)
Autentisering skjer ved hjelp av en Integrasjon-mekanismen beskrevet [her](https://ks-no.github.io/fiks-plattform/integrasjoner/#integrasjon)

En kan enten velge å sende med fiksOrgId som en del av URL'en eller la API'et ta seg av å finne tilhørende fiksOrgId til integrasjonsId'en som spør.

Utover dette kan man sende med et request-objekt som inneholder filter-parametrene.

### Testdata
Data som ligger i test-miljøet er produksjonsdata KS har fått fra HDIR, som er vasket for personlig informasjon. 
Det er verdt å merke seg at testdataene stort sett vil vere eldre enn 10 dager. Produksjonsdata vil alltid vere yngre enn 10 dager gamle, så dette vil altså ikke vere gjenspeilet i testdatagrunnlaget.   
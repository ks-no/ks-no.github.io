---
title: Innreiseregister fra Helsedirektoratet
date: 2021-09-07
---

### Formål
KS har sammen med Helsedirektoratet (HDIR) utviklet et API som gjør det mulig å hente informasjon om innreisende elektronisk fra HDIR sitt 
nasjonale kontrollsenter for innreise, til kommunen. 
Tjenesten heter Fiks innreise. 
Flere leverandører (Fiks smittesporing (DHIS2), ReMin og Oslo kommune) arbeider med utvikling av funksjonalitet for innreiseoppfølging i kommunene. 
Fiks innreise er sammen med Fiks prøvesvar sentrale komponenter i dette arbeidet. 
API-et er også tilgjengelig for kommuner som benytter andre løsninger for innreiseoppfølging enn de nevnte.

### Produktbeskrivelse
Tjenesten tilbyr et API hvor kommuner kan spørre etter personer som er registrert som innreisende. 
Dette kan for eksempel være å spørre etter innreisende til et gitt kommunenummer eller fødselsnummer, d-nummer eller nasjonalt hjelpenummer (hentes fra PREG).

Fiks innreise gjør ingenting med dataene som blir importert fra HDIR. Datagrunnlaget vil være basert på en daglig uttrekk fra HDIR. 
Hver natt vil KS importere data for de siste 10 dager fra HDIR. Siste oppdatering på dataene som ligger hos KS vil være ved midnatt samme dag. 
Dette betyr at man ikke kan spørre etter innreiser fra dagens dato.

### Integrasjon [(api-spec)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/innreise-api-v1.json)
Autentisering skjer ved hjelp av en Integrasjon-mekanismen beskrevet [her](https://ks-no.github.io/fiks-plattform/integrasjoner/#integrasjon)

En kan enten velge å sende med fiksOrgId som en del av URL'en eller la API'et ta seg av å finne tilhørende fiksOrgId til integrasjonsId'en som spør.

Utover dette kan man sende med et request-objekt som inneholder filter-parametrene.

### Testdata
Data som ligger i test-miljøet er produksjonsdata KS har fått fra HDIR, som er vasket for personlig informasjon. 
Det er verdt å merke seg at testdataene stort sett vil vere eldre enn 10 dager. Produksjonsdata vil alltid vere yngre enn 10 dager gamle, så dette vil altså ikke vere gjenspeilet i testdatagrunnlaget.   
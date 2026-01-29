---
title: 'API: Integrasjon med REST v3'
date: 2026-02-02
---

# UNDER ARBEID
Denne versjonen av REST-APIet er under arbeid, og det kan forekomme endringer. Den er foreløpig tilgjengelig for bruk i våre test-miljø, og vi vil oppdatere her fortløpende når vi har tilgjengeliggjort denne i våre produksjons-miljø. 


## Nytt i denne versjonen

* Tilrettelegger for å kunne sende til en aktør innenfor Norsk Helsenett. Dette vil enten være fastlegen til en innbygger eller direkte til en spesifikk herId.
* Endepunkter for å sende en forsendelse er delt opp i flere endepunkter basert på om forsendelsen skal sendes til en privatperson, virksomhet, til en aktør innenfor Norsk Helsenett eller om forsendelsen skal rett til print

## Tilgang

Autentisering og autorisering skjer ved bruk av OAuth 2.0 med Fiks-integrasjoner og Maskinporten, som beskrevet [her](/felles/integrasjoner/). 
Tilganger må tildeles integrasjoner på alle kontoene de skal ha lov til å utføre operasjoner for. Tilgang til en forsendelse autoriseres via avsenderkontoen.

## Feilmeldinger
Generell informasjon om feilmeldinger på Fiks-plattformen finnes [her](https://developers.fiks.ks.no/felles/integrasjoner/#feilmeldinger).

## Forsendelse

### Send
Sending av forsendelser: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-send-api-v3.json)

De er i denne versjonen splittet opp i forskjellige endepunkter ut fra hvilken mottaker forsendelsen skal sendes til. Dette har vi gjort for å gjøre det enklere å vite hvilke valg man kan sette på en forsendelse. 
De forskjellige endepunktene er:
* send til privatperson - krever et gyldig fødsels- eller d-nummer. Dette brukes i oppslag mot kontaktregisteret for å finne ut om mottaker kan motta digital post og eventuell hvilken digital kanal SvarUt skal sende til (Digital Post til innbygger eller Altinn)
* send til virksomhet - krever et gyldig organisasjonsnummer som finnes i brønnøysundregisteret. 
* send til Norsk Helsenett. 
* send rett til print

Vi anbefaler at man bruker endepunktet for å sende rett til print så sjelden som mulig. 

For mer detaljer om sending av dokumenter, se [her](/tjenester/svarut/send-dokumenter).

### Status
Henting av status for forsendelser: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-status-api-v3.json)

## JVM-klient
Vi har laget en klient som vi benytter internt, som også kan benyttes av andre i JVM-miljøer. Denne bruker genererte modeller fra OpenAPI spesifikasjonene.
Koden kan finnes på [GitHub](https://github.com/ks-no/fiks-svarut-klient). 
Ferdig bygget klient kan hentes fra [Maven Central](https://central.sonatype.com/artifact/no.ks.fiks/fiks-svarut-klient/1.0.0/versions) med ditt foretrukne byggeverktøy.

Dersom man ønsker å bygge sin egen klient kan det være utfordringer med å benytte en som er generert direkte fra spesifikasjonen for endepunktene 
som benytter seg av multipart HTTP-requests. Dette gjelder per nå kun for sende-APIet.

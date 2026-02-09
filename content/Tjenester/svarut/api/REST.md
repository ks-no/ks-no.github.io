---
title: 'SvarUt REST'
---

## Tilgang

Autentisering og autorisering skjer ved bruk av OAuth 2.0 med Fiks-integrasjoner og Maskinporten, som beskrevet [her](/felles/integrasjoner/). 
Tilganger må tildeles integrasjoner på alle kontoene de skal ha lov til å utføre operasjoner for. Tilgang til en forsendelse autoriseres via avsenderkontoen.

## Feilmeldinger
Generell informasjon om feilmeldinger på Fiks-plattformen finnes [her](https://developers.fiks.ks.no/felles/integrasjoner/#feilmeldinger).

## Forsendelse

### Send
Sending av forsendelser: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-send-api-v3.json)  
For mer detaljer om sending av dokumenter, se [her](/tjenester/svarut/send-dokumenter).  

Endepunktet for sending i versjon 3 er delt opp basert på hvilken type mottaker forsendelsen skal sendes til. 
Dette har vi gjort for å gjøre det enklere å vite hvilke valg som er tilgjengelige for de forskjellige typene.
Det nye APIet har følgende endepunkter:
* Send til privatperson - krever et gyldig fødsels- eller d-nummer. Dette brukes i oppslag mot kontaktregisteret for å finne ut om mottaker kan motta digital post og eventuell hvilken digital kanal SvarUt skal sende til (Digital Post til innbygger eller Altinn).
* Send til virksomhet - krever et gyldig organisasjonsnummer som finnes i Enhetsregisteret.
* Send til mottaker i Norsk Helsenett - krever et fødselsnummer som har fastlege, eller en gyldig HER-id til mottaker.
* Send rett til print - krever kun gyldig postadresse. Bør så langt som mulig unngås av hensyn til både miljø og kostnader.

### Lest
Markering av forsendelser som lest eksternt: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-lest-api-v2.json)

### Slett
Sletting av forsendelser: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-slett-api-v2.json)

### Status
Henting av status for forsendelser: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-status-api-v3.json)

V3 introduserer noen nye statuser:
- FEILET_UNDER_MOTTAK - AVVIST status er nå endret til å gjelde spesifikke feil hvor SvarUt avviser forsendelsen, for eksempel grunnet valideringsfeil. Denne nye statusen dekker alle andre tilfeller som tidligere ble dekket av AVVIST.
- SENDT_NHN_MOTTAKER - Forsendelsen er sendt til NHN, men mottaker har ikke bekreftet mottak enda.
- LEVERT_NHN_MOTTAKER - Forsendelsen er sendt til NHN, og at mottaker har bekreftet at den er mottatt.
- SLETTET - Filer og metadata som ikke er nødvendig for statistikk og fakturering er slettet for forsendelsen.

### Hendelser
Henting av hendelser tilknyttet en forsendelse: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-hendelser-api-v2.json)

### Metadata
Henting av metadata tilknyttet en forsendelse: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-metadata-api-v2.json)

### Ekstern ref
Henting av forsendelser tilknyttet en ekstern referanse: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-eksternref-api-v2.json)

### Typer
Henting av forsendelsestyper: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-typer-api-v2.json)

## Mottakersystem
Henting av mottakersystem: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/mottakersystem-api-v2.json)

## JVM-klient
Vi har laget en klient som vi benytter internt, som også kan benyttes av andre i JVM-miljøer. Denne bruker genererte modeller fra OpenAPI spesifikasjonene.
Koden kan finnes på [GitHub](https://github.com/ks-no/fiks-svarut-klient). 
Ferdig bygget klient kan hentes fra [Maven Central](https://central.sonatype.com/artifact/no.ks.fiks/fiks-svarut-klient/1.0.0/versions) med ditt foretrukne byggeverktøy.

Dersom man ønsker å bygge sin egen klient kan det være utfordringer med å benytte en som er generert direkte fra spesifikasjonen for endepunktene 
som benytter seg av multipart HTTP-requests. Dette gjelder per nå kun for sende-APIet.

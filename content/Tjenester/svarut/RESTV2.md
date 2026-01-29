---
title: 'API: Integrasjon med REST'
date: 2022-03-01
---

## Nytt i denne versjonen

* Endepunkter delt opp i flere separate enheter som kan versjoneres hver for seg
* OpenAPI specs som definerer endepunktene
* Bruker samme autentiserings- og autoriseringsmekanismer som resten av Fiks-plattformen

## Tilgang

Autentisering og autorisering skjer ved bruk av OAuth 2.0 med Fiks-integrasjoner og Maskinporten, som beskrevet [her](/felles/integrasjoner/). 
Tilganger må tildeles integrasjoner på alle kontoene de skal ha lov til å utføre operasjoner for. Tilgang til en forsendelse autoriseres via avsenderkontoen.

## Feilmeldinger
Generell informasjon om feilmeldinger på Fiks-plattformen finnes [her](https://developers.fiks.ks.no/felles/integrasjoner/#feilmeldinger).

## Forsendelse

### Send
Sending av forsendelser: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-send-api-v2.json)

For mer detaljer om sending av dokumenter, se [her](/tjenester/svarut/send-dokumenter).

### Lest
Markering av forsendelser som lest eksternt: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-lest-api-v2.json)

### Slett
Sletting av forsendelser: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-slett-api-v2.json)

### Status
Henting av status for forsendelser: [OpenAPI spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-status-api-v2.json)

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

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

**Ved innsending av forsendelser anbefales det en timeout på 16 minutter. Dette for å håndtere innsending av større filer.** 

Innsending utføres ved bruk av en multipart HTTP request. Dette er ikke beskrevet i speccen. Første part må inneholde forsendelsens metadata, og ha navn "forsendelse".
Påfølgende parts skal inneholde dokumentene som skal sendes med forsendelsen. Disse må være i samme rekkefølge og ha samme navn som dokumentene definert i metadata.

Eksempel på en hvordan en slik request med to filer kan se ut:
```
POST /api/v2/kontoer/<konto-id>/forsendelser/ HTTP/1.1
Host: svarut.ks.no
Authorization: Bearer <Maskinporten-token>
IntegrasjonId: <integrasjon-id>
IntegrasjonPassord: <integrasjon-passord>
Content-Type: multipart/form-data; boundary=JettyHttpClientBoundarytt8xws4wfh61785q2obyg

--JettyHttpClientBoundarytt8xws4wfh61785q2obyg
Content-Disposition: form-data; name="forsendelse"
Content-Type: application/json;charset=UTF-8

{
  "mottaker": {
    "digitalId": "38850903357",
    "navn": "fce655ae-8a8f-43ec-be63-78f7321f47fc",
    "adresselinje1": "60b079d3-08a9-43fe-9ed8-b2ea6b5ddffb",
    "poststed": "d6d164ad-c302-4464-bf6f-0e4d39c56181",
    "postnummer": "0612",
  },
  "eksponertFor": [],
  "avgivendeSystem": "3e0842fb-170f-49f2-9a39-345fee600e52",
  "tittel": "5d624f2b-5eea-49ba-8d2d-dc6fa36e0d97",
  "konteringskode": "0caae250-6c3d-4e37-a",
  "utskriftskonfigurasjon": {
    "utskriftMedFarger": false,
    "tosidig": true
  },
  "dokumenter": [
    {
      "filnavn": "small.pdf",
      "mimeType": "application/pdf",
    },
    {
      "filnavn": "another.pdf",
      "mimeType": "application/pdf"
    }
  ]
}

--JettyHttpClientBoundarytt8xws4wfh61785q2obyg
Content-Disposition: form-data; name="name1"; filename="small.pdf"
Content-Type: application/octet-stream
... file data ...

--JettyHttpClientBoundarytt8xws4wfh61785q2obyg
Content-Disposition: form-data; name="name2"; filename="another.pdf"
Content-Type: application/octet-stream
... file data ...
```

Offentlige nøkler for kryptering:  
[TEST](https://test.svarut.ks.no/forsendelse/publickey/hent)  
[PROD](https://svarut.ks.no/forsendelse/publickey/hent)  

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

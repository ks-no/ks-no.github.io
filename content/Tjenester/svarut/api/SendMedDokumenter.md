---
title: 'Sending av dokumenter'
date: 2026-02-01
hidden: false
aliases: [/tjenester/svarut/send-dokumenter]
---

## Send med dokumenter

Innsending utføres ved bruk av en multipart HTTP request. Dette er ikke beskrevet i speccen. Første part må inneholde forsendelsens metadata, og ha navn "forsendelse".
Påfølgende parts skal inneholde dokumentene som skal sendes med forsendelsen. Disse må være i samme rekkefølge og ha samme navn som dokumentene definert i metadata.

Følgende begrensinger gjelder for innsending av dokumenter:
* Dersom forsendelsen skal kunne gå til print: 
  * PDF'ene som legges ved ma ha en totalt filstørrelse under 350MB, ellers avviser SvarUt forsendelsen. Dette er en begrensing knyttet mot printleverandør. Når SvarUt sender dokumentene som skal printes til printleverandør, så vil SvarUt legge de sammen til å bli en stor PDF. 
  * PDF'ene kan ikke vere passordbeskyttet. Dette er en typisk feil vi ser skjer med forsendelser som blir avvist.
* Dersom forsendelsen skal til NHN
  * Dersom forsendelsen skal til NHN kan det kun sendes 1 PDF som ikke kan overstige 18MB.
* Dersom man markerer forsendelse som kunDigital (til privatpersoner eller virksomheter) kan man sende større dokumentpakker enn 350MB. Her ligger det inne en tidsbegrensing hos oss, så all data må overføres innen 16 minutter.


Eksempel på en hvordan en slik request med to filer kan se ut dersom en sender inn en forsendelse via Rest v2 med 2 dokumenter:
```
POST /api/v3/kontoer/<konto-id>/forsendelser/ HTTP/1.1
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

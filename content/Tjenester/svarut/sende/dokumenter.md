---
title: Dokumenter og vedlegg
description: "Multipart-request, filtyper, størrelser, tidsavbrudd og kryptering."
date: 2026-11-01
weight: 10
aliases: [/tjenester/svarut/sendmeddokumenter/, /tjenester/svarut/send-dokumenter, /tjenester/svarut/api/sendmeddokumenter, /svarut/api/sendmeddokumenter]
---

En forsendelse sendes som en multipart-request (`multipart/form-data`). 
Første part skal inneholde JSON med metadata om forsendelsen, og alle påfølgende parts skal inneholde dokumentene som skal sendes.

## Oppbygging av requesten

- Første del må ha `name="forsendelse"` og `Content-Type: application/json`.
- Hver av de neste delene er ett dokument, med `Content-Type: application/octet-stream`.
- Dokumentene må komme i samme rekkefølge som i `dokumenter` i metadata.
- `filename` på hver del må være lik `filnavn` i metadata. `name` på dokumentdelene blir ikke brukt.
- Filnavn må være unike i forsendelsen og kan ikke inneholde noen av følgende tegn: `* : " \ / < > | ?`.

## Eksempel

En forsendelse til en privatperson med to PDF-er:

```http
POST /api/v3/kontoer/<konto-id>/forsendelser/person HTTP/1.1
Host: svarut.ks.no
Authorization: Bearer <access token fra Maskinporten>
IntegrasjonId: <integrasjons-id>
IntegrasjonPassord: <passord>
Content-Type: multipart/form-data; boundary=grense

--grense
Content-Disposition: form-data; name="forsendelse"
Content-Type: application/json;charset=UTF-8

{
  "tittel": "Vedtak om barnehageplass",
  "mottaker": {
    "navn": "Kari Nordmann",
    "digitalId": "<fødselsnummer>",
    "adresse": {
      "adresselinje1": "Storgata 1",
      "postnummer": "0155",
      "poststed": "Oslo"
    }
  },
  "avgivendeSystem": "Sak- og arkivsystem 4.2",
  "eksternReferanse": "2026/1234-5",
  "utskriftskonfigurasjon": {
    "tosidig": true
  },
  "dokumenter": [
    { "filnavn": "vedtak.pdf", "mimeType": "application/pdf" },
    { "filnavn": "vedlegg.pdf", "mimeType": "application/pdf" }
  ]
}
--grense
Content-Disposition: form-data; name="dokument"; filename="vedtak.pdf"
Content-Type: application/octet-stream

... filinnhold ...
--grense
Content-Disposition: form-data; name="dokument"; filename="vedlegg.pdf"
Content-Type: application/octet-stream

... filinnhold ...
--grense--
```

Svaret man får tilbake vil være på formatet `{"id": "<forsendelse-id>"}`.

Om forsendelsen markeres med kun digital levering trenger man ikke å ha med adressen, merk at dette betyr at vi ikke kan garantere leveranse.
Om det derimot ønskes at forsendelsen skal printes og sendes via Posten, må postadresse inkluderes. 

## Filtyper

Bare PDF kan printes. Sender du andre filtyper, for eksempel XML, lyd eller video, må du gjøre ett av disse:

- sette `skalEkskluderesFraUtskrift: true` på hver fil som ikke er PDF, eller
- sette `kunDigitalLevering: true` på forsendelsen. Dette medfører at forsendelsen ikke videresendes til print, og bør kun brukes når det er helt sikkert at mottakeren kan motta forsendelsen digitalt eller at det ikke er nødvendig å ettersende brevet via Post. 

PDF-er kan ikke være passordbeskyttet om forsendelsene skal gå til print. Om SvarUt ser at filene er passordbeskyttet, vil forsendelsen bli avvist.

Vil du ha med giroark, setter du `giroarkSide` på dokumentet. Siden printes på gult giroark. Første side er 1.

## Størrelser og grenser

| Grense                   | Gjelder                                                                                                                                                                                                  |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 350 MB totalt            | Forsendelser som kan gå til print må ha en total filstørrelse på maksimalt 350 MB. PDF-ene slås sammen til én fil når de sendes til printleverandøren. Er forsendelsen større, blir den avvist.          |
| Ingen fast grense        | Forsendelser med `kunDigitalLevering: true` kan sende dokumenter med hvilken som helst størrelse. Alt må være overført innen tidsgrensen oppgitt under.                                                  |
| 50 MiB eller 200 vedlegg | Er forsendelsen over 50 MiB eller den har mer enn 200 vedlegg, sender ikke SvarUt filene til Digipost eller e-Boks. Mottakeren får i stedet en melding med en lenke til hvert dokument og en lenke til en zip-fil med alle dokumentene. Dokumentene lastes ned fra SvarUt. |
| 18 MB                    | Forsendelser til Norsk Helsenett kan ha en total filstørrelse på maks 18 MB. Det er kun PDF som er godtatt                                                                                               |
| 10 MiB                   | Dokument som skal signeres. Det er kun 1 dokument som kan markeres for signering pr forsendelse.                                                                                                         |

### Tidsavbrudd

SvarUt avbryter innsendingen dersom det går mer enn 16 minutter. Sett lesetimeout i klienten til minst 16 minutter. 
Avbryter klienten først, kan forsendelsen være mottatt uten at du får id-en tilbake.

## Kryptering

Dere kan kryptere dokumentene før de sendes. Da må `kryptert` være `true`, og filene må være kryptert med CMS og den offentlige nøkkelen til SvarUt. 
Med `sikkerhetsniva: HOYESTE` må dokumentene krypteres før innsending. For mer informasjon, se [Sikkerhet](/tjenester/svarut/sikkerhet/).

Offentlig nøkkel for SvarUt:

- Test: <https://test.svarut.ks.no/forsendelse/publickey/hent>
- Produksjon: <https://svarut.ks.no/forsendelse/publickey/hent>

Nøkkelen ligger bak ID-porten innlogging.

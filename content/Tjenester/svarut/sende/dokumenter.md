---
title: Dokumenter og vedlegg
description: "Multipart-request, filtyper, størrelser, tidsavbrudd og kryptering."
date: 2026-02-01
weight: 10
aliases: [/tjenester/svarut/sendmeddokumenter/, /tjenester/svarut/send-dokumenter, /tjenester/svarut/api/sendmeddokumenter, /svarut/api/sendmeddokumenter]
---

En forsendelse sendes som én multipart-request (`multipart/form-data`). Første del er metadata for forsendelsen. Resten er dokumentene.

## Oppbygging av requesten

- Første del må ha `name="forsendelse"` og `Content-Type: application/json`.
- Hver av de neste delene er ett dokument, med `Content-Type: application/octet-stream`.
- Dokumentene må komme i samme rekkefølge som i `dokumenter` i metadata.
- `filename` på hver del må være lik `filnavn` i metadata. `name` på dokumentdelene blir ikke brukt.
- Filnavn må være unike i forsendelsen og kan ikke inneholde `* : " \ / < > | ?`.

Til Norsk Helsenett sendes nøyaktig ett dokument, og dokumentdelen må ha `Content-Type: application/pdf`. Se [Norsk Helsenett](/tjenester/svarut/sende/nhn/).

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

Svaret er `{"id": "<forsendelse-id>"}`.

Ta med adressen til mottakeren selv om du sender digitalt. Uten adresse kan ikke SvarUt sende på papir hvis digital levering feiler.

## Filtyper

Bare PDF kan printes. Sender du andre filtyper, for eksempel XML, lyd eller video, må du gjøre ett av disse:

- sette `skalEkskluderesFraUtskrift: true` på hver fil som ikke er PDF, eller
- sette `kunDigitalLevering: true` på forsendelsen.

PDF-er kan ikke være passordbeskyttet. Det er en vanlig grunn til at forsendelser blir avvist.

Vil du ha med giroark, setter du `giroarkSide` på dokumentet. Siden printes på gult giroark. Første side er 1.

## Størrelser og grenser

| Grense | Gjelder |
|---|---|
| 350 MB totalt | Forsendelser som kan gå til print. PDF-ene slås sammen til én fil hos printleverandøren. Er forsendelsen større, blir den avvist. |
| Ingen fast grense | Forsendelser med `kunDigitalLevering: true`. Alt må være overført innen tidsgrensen under. |
| 50 MiB eller 200 vedlegg | Over dette får digital postkasse en lenke til dokumentene i stedet for selve filene. Se [Store forsendelser til digital postkasse](#store-forsendelser-til-digital-postkasse). |
| 18 MB, ett dokument | Forsendelser til Norsk Helsenett. |
| 10 MiB | Dokument som skal signeres. |

### Tidsavbrudd

SvarUt bryter innsendingen etter 15 minutter. Sett lesetimeout i klienten til minst 16 minutter. Bryter klienten først, kan forsendelsen være mottatt uten at du får id-en tilbake.

### Store forsendelser til digital postkasse

Er forsendelsen over 50 MiB eller har den mer enn 200 vedlegg, sender ikke SvarUt filene til Digipost eller e-Boks. Mottakeren får i stedet en melding med en lenke til hvert dokument og en lenke til en zip-fil med alle dokumentene. Dokumentene lastes ned fra SvarUt.

## Kryptering

Dere kan kryptere dokumentene før de sendes. Da må `kryptert` være `true`, og filene må være kryptert med CMS og den offentlige nøkkelen til SvarUt. Med `sikkerhetsniva: HOYESTE` må dokumentene være kryptert. Se [Sikkerhet](/tjenester/svarut/sikkerhet/).

Offentlig nøkkel for SvarUt:

- Test: <https://test.svarut.ks.no/forsendelse/publickey/hent>
- Produksjon: <https://svarut.ks.no/forsendelse/publickey/hent>

Nøkkelen lastes ned i nettleseren, og du må logge inn med ID-porten.

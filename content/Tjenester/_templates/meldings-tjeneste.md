---
title: Fiks [Tjenestenavn]
date: YYYY-MM-DD
aliases: ["/fiks-plattform/tjenester/[tjenestenavn]/"]
---

<!--
  MAL: Meldingsbasert tjeneste
  Bruk denne malen for tjenester som leverer meldinger asynkront via Fiks IO
  / Fiks Protokoll (eks. Bekymringsmelding, Digisos, Fiks Arkiv).
  Slett kommentarer og seksjoner som ikke er relevante.
-->

## Kort beskrivelse

Fiks [Tjenestenavn] er en tjeneste for [...]. Meldingsutveksling skjer over [Fiks IO]({{< ref "fiksio.md" >}}) ved bruk av meldingsprotokollen `[no.ks.fiks.<navn>.v1]`.

Tjenesten tilbyr:

- [Kjernefunksjon 1]
- [Kjernefunksjon 2]
- [Kjernefunksjon 3]

## Tilgjengelige grensesnitt

| Grensesnitt       | Støtte |
|-------------------|--------|
| Web portal        | Ja / Nei |
| Fiks IO (meldinger) | Ja – protokoll `[no.ks.fiks.<navn>.v1]` |
| Maskin til maskin (REST) | [Api-spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json) |

## Kom i gang

1. Kommunen/organisasjonen må ha en aktiv Fiks-organisasjon.
2. Tjenesten må aktiveres via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
3. Fagsystemet må opprette et [Fiks Protokoll-system og -konto]({{< ref "fiksprotokoll/_index.md" >}}) med støtte for protokollen `[no.ks.fiks.<navn>.v1]`.
4. Konto må ha lastet opp en offentlig nøkkel (PEM) som brukes til ende-til-ende-kryptering av meldinger.
5. <!-- Tjenestespesifikke forutsetninger -->

## Beskrivelse av tjenesten

### Roller

- **Avsender (produsent)** – [...]
- **Mottaker (konsument)** – [...]

### Overordnet flyt

1. [Steg 1, f.eks. avsender bygger melding etter JSON-skjema]
2. [Steg 2, f.eks. melding pakkes i ASiC-E og krypteres med mottakers nøkkel]
3. [Steg 3, f.eks. melding sendes via Fiks IO]
4. [Steg 4, f.eks. mottaker bekrefter med kvittering]
5. [Steg 5, fallback ved feil – f.eks. brevpost]

<!-- Sekvensdiagram, f.eks. PlantUML eller PNG i ../images/ -->

### Sikkerhet og kryptering

All meldingsutveksling er ende-til-ende-kryptert med mottakers offentlige nøkkel som lastes opp på Fiks Protokoll-kontoen. Meldinger signeres som ASiC-E-pakker. Se [Fiks IO sikkerhet]({{< ref "fiksio.md" >}}#sikkerhet).

---

## Meldingsprotokoll

Fullstendig skjemadefinisjon med eksempler: [github.com/ks-no/fiks-io-[tjenestenavn]-protokoll](https://github.com/ks-no/fiks-io-[tjenestenavn]-protokoll)

### Meldingstyper

| Meldingstype | Retning | Body | Beskrivelse |
|--------------|---------|------|-------------|
| `no.ks.fiks.[tjenestenavn].[type1].v1` | Til mottaker | ASiC-E med JSON + PDF | [Beskrivelse] |
| `no.ks.fiks.[tjenestenavn].mottatt.v1` | Fra mottaker | Tom | Kvittering på mottatt melding |
| `no.ks.fiks.[tjenestenavn].feilet.v1`  | Fra mottaker | `feilmelding.json` | Feil ved håndtering hos mottaker |

### Standardmeldinger fra Fiks IO

Tjenesten benytter også standardmeldinger fra Fiks IO – se [Feilmeldinger fra Fiks IO]({{< ref "fiksio.md" >}}#feilmeldinger-fra-fiks-io):

- `no.ks.fiks.kvittering.tidsavbrudd` – meldingens TTL er utløpt
- `no.ks.fiks.kvittering.serverfeil.v1` – levering til mottaker feilet

### Anbefalt TTL

Sett `time-to-live` på Fiks IO-meldinger til **24 timer** med mindre tjenesten har andre krav.

---

## Mottakerintegrasjon (fagsystem som konsument)

Fagsystemet må:

1. Lytte på sin Fiks IO-konto for meldinger av type `no.ks.fiks.[tjenestenavn].[type1].v1`.
2. Dekryptere ASiC-E-pakken med kontoens private nøkkel.
3. Validere innhold mot [JSON-skjema](https://github.com/ks-no/fiks-io-[tjenestenavn]-protokoll).
4. Sende kvittering – `no.ks.fiks.[tjenestenavn].mottatt.v1` ved suksess, `no.ks.fiks.[tjenestenavn].feilet.v1` ved feil.

Bruk gjerne Fiks IO-klienten:

- Java: [fiks-io-klient-java](https://github.com/ks-no/fiks-io-klient-java)
- .NET: [fiks-io-client-dotnet](https://github.com/ks-no/fiks-io-client-dotnet)

---

## Avsenderintegrasjon (fagsystem som produsent)

<!-- Slett denne seksjonen hvis tjenesten kun har konsumenter. -->

Avsendere kan sende meldinger via REST API. Swagger-spec: [api-spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json).

### Miljøer

| Miljø | Base-URL |
|-------|----------|
| Test  | `https://api.fiks.test.ks.no/[tjenestenavn]/api/v1/` |
| Prod  | `https://api.fiks.ks.no/[tjenestenavn]/api/v1/` |

### Autentisering

Se [integrasjonsautentisering]({{< ref "integrasjoner.md" >}}#integrasjon) og [eksempel på autentisert kall]({{< ref "integrasjoner.md" >}}#eksempel-autentisert-kall).

### Innsending

`POST /[tjenestenavn]/api/v1/[endepunkt]` med multipart-request:

- `metadata` (`application/json`) – ifølge [JSON-skjema](https://github.com/ks-no/fiks-io-[tjenestenavn]-protokoll)
- `[fil]` – filen, kryptert med mottakers offentlige nøkkel hentet fra `[/api/v1/.../public-key]`

**Eksempel (Java, Jersey):**

```java
StreamDataBodyPart asice = new StreamDataBodyPart("asice", asiceInputStream, "asice.zip");
MultiPart multipart = new FormDataMultiPart().bodyPart(asice);

client.target(url)
    .request()
    .header("Authorization", "Bearer " + token)
    .header("IntegrasjonId", integrasjonId)
    .header("IntegrasjonPassord", integrasjonPassord)
    .post(Entity.entity(multipart, multipart.getMediaType()));
```

### Status og historikk

Tjenesten eksponerer et statusendepunkt som returnerer en liste av hendelser. Selve endepunktet er beskrevet i API-spec'en; her dokumenterer vi kun de mulige *tilstandene* og hva de betyr (dette står ikke i OpenAPI):

- `AKSEPTERT` – Mottatt og lagret av Fiks
- `SENDT_FAGSYSTEM` – Sendt til mottakers fagsystem
- `AVVIST_FAGSYSTEM` – Mottakers fagsystem avviste meldingen
- `LEVERT` – Endelig levert
- <!-- Andre tilstander spesifikke for tjenesten -->

---

## Klientbiblioteker

| Språk | Bibliotek |
|-------|-----------|
| Java  | [fiks-io-klient-java](https://github.com/ks-no/fiks-io-klient-java) |
| .NET  | [fiks-io-client-dotnet](https://github.com/ks-no/fiks-io-client-dotnet) |

---

## Versjonering

Meldingsprotokollen er versjonert (`v1`, `v2`, ...). Bakoverkompatibilitet skal opprettholdes innen samme major-versjon. Ved breaking changes opprettes en ny versjon med eget meldingstype-suffiks.

Mottakere bør publisere `støttetVersjon` i sitt konto-oppsett slik at avsendere kan velge riktig versjon.

---

## Relaterte tjenester

- [Fiks IO]({{< ref "fiksio.md" >}}) – meldingskanal
- [Fiks Protokoll]({{< ref "fiksprotokoll/_index.md" >}}) – protokollrammeverk
- [Fiks Dokumentlager]({{< ref "dokumentlager.md" >}}) – brukes ved store filer (>5 MB)
- [SvarUt/SvarInn]({{< ref "svarut/_index.md" >}}) – alternativ leveringskanal

## Kontakt

Tekniske spørsmål: `fiks-utvikling@ksdigital.no`. Øvrige henvendelser: `fiks@ksdigital.no`.




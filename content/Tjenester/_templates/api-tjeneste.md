---
title: Fiks [Tjenestenavn]
date: YYYY-MM-DD
aliases: ["/fiks-plattform/tjenester/[tjenestenavn]/"]
---

<!--
  MAL: REST API-tjeneste
  Bruk denne malen for tjenester som hovedsakelig tilbyr et synkront HTTP/REST API
  for fagsystem-integrasjon (eks. Dokumentlager, Samtykke, Kjøretøyregister).

  Prinsipp: Ikke dupliser informasjon som allerede finnes i API-spec'en
  (endepunkter, request/response-skjemaer, feltbeskrivelser, statuskoder).
  Lenk til Swagger i stedet, og bruk denne sida til å forklare ting som
  IKKE står i spec'en: kontekst, flyt, autentisering, miljøer, begreper
  og tjenestespesifikke regler.

  Slett alle <!-- ... --> kommentarer og avsnitt som ikke er relevante.
-->

## Kort beskrivelse

<!-- 2–4 setninger: hva tjenesten gjør og hvem den er for. -->

Fiks [Tjenestenavn] er en tjeneste som [...]. Tjenesten tilbyr:

- [Kjernefunksjon 1]
- [Kjernefunksjon 2]
- [Kjernefunksjon 3]

## Tilgjengelige grensesnitt

| Grensesnitt       | Støtte |
|-------------------|--------|
| Web portal        | Ja / Nei |
| Maskin til maskin | [Api-spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json) |

## Kom i gang

For å ta i bruk Fiks [Tjenestenavn] må følgende være på plass:

1. Kommunen/organisasjonen må ha en aktiv Fiks-organisasjon.
2. Tjenesten må aktiveres via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
3. Det må opprettes en [integrasjon]({{< ref "integrasjoner.md" >}}) som gis tilgang til tjenesten.
4. <!-- Eventuelle tjenestespesifikke forutsetninger, f.eks. avtale -->

## Beskrivelse av tjenesten

<!-- Funksjonell forklaring (uten API-detaljer som finnes i spec'en). -->

### Konsepter og begreper

<!-- Forklar de viktigste domeneobjektene og statusene som API-konsumenten må kjenne til. -->

| Begrep | Beskrivelse |
|--------|-------------|
| `[Begrep1]` | [...] |
| `[Begrep2]` | [...] |

### Overordnet flyt

1. [Steg 1]
2. [Steg 2]
3. [Steg 3]

<!-- Valgfritt diagram: ![diagram](../images/[diagram].png "[Alt-tekst]") -->

### Tjenestespesifikke regler

<!--
  Bruk denne seksjonen for forretningsregler og forutsetninger som IKKE
  fremkommer av API-spec'en. Eksempler:
  - Rekkefølge av kall (f.eks. "ressurs X må opprettes før Y kan kalles")
  - Statusoverganger / tilstandsmaskiner
  - Validering på tvers av felter
  - Idempotens, retries, eventuell konsistens
  - Begrensninger (filstørrelse, rate limits, batch-størrelser)
-->

---

## Integrasjonsutvikling

Det anbefales å lese [generell dokumentasjon for integrasjonsutvikling mot Fiks]({{< ref "integrasjoner.md" >}}) før du starter.

### Autentisering

Tjenesten bruker **integrasjonsautentisering** (maskin-til-maskin) som beskrevet [her]({{< ref "integrasjoner.md" >}}#integrasjon). Se [eksempel på autentisert kall]({{< ref "integrasjoner.md" >}}#eksempel-autentisert-kall) for hvilke headere som må settes.

### Miljøer

| Miljø | Base-URL |
|-------|----------|
| Test  | `https://api.fiks.test.ks.no/[tjenestenavn]/api/v1/` |
| Prod  | `https://api.fiks.ks.no/[tjenestenavn]/api/v1/` |

<!-- Hvis tjenesten har et dev-miljø, legg til det også. -->

### Testdata

<!-- Beskriv hvilke testdata som finnes i testmiljøet, og eventuelle begrensninger. -->

---

## API-referanse

Endepunkter, request/response-skjemaer, feltbeskrivelser og statuskoder vedlikeholdes i Swagger – ikke dupliser dette her:

[Api-spec for Fiks [Tjenestenavn]](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json)

<!--
  Bruk eventuelt denne seksjonen kun til:
  - Et minimalt "hello world"-eksempel som viser autentisering
  - Tjenestespesifikke regler som ikke kan uttrykkes i OpenAPI
-->

### Eksempel: enkleste kall

```bash
curl https://api.fiks.test.ks.no/[tjenestenavn]/api/v1/[endepunkt] \
  -H "Authorization: Bearer <access token>" \
  -H "IntegrasjonId: <integrasjons-id>" \
  -H "IntegrasjonPassord: <integrasjonspassord>"
```

---

## Klientbiblioteker

<!-- Slett seksjonen hvis KS ikke tilbyr offisielle klienter. -->

| Språk | Bibliotek |
|-------|-----------|
| Java  | [fiks-[tjenestenavn]-klient](https://github.com/ks-no/fiks-[tjenestenavn]-klient) |
| .NET  | [fiks-[tjenestenavn]-client-dotnet](https://github.com/ks-no/fiks-[tjenestenavn]-client-dotnet) |

---

## Feilmeldinger

Generell beskrivelse av feilformat: [feilmeldinger]({{< ref "integrasjoner.md" >}}#feilmeldinger).
Statuskoder per endepunkt er dokumentert i [API-spec'en](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json).

<!-- List kun tjenestespesifikke feilkoder/feilsituasjoner som ikke står i spec'en. -->

---

## Versjonering

Gjeldende versjon er `v1`. Endringer som ikke er bakoverkompatible vil resultere i en ny major-versjon (`v2`, ...).
Ikke-brytende endringer (nye felter, nye endepunkter) kan komme uten varsel innen samme major-versjon.

---

## Relaterte tjenester

- [Fiks Dokumentlager]({{< ref "dokumentlager.md" >}}) – kryptert dokumentlagring
- [Fiks IO]({{< ref "fiksio.md" >}}) – sikker maskin-til-maskin meldingskanal
- [Sikkerhet og autentisering]({{< ref "sikkerhet.md" >}})

## Kontakt

Tekniske spørsmål: `fiks-utvikling@ksdigital.no`. Øvrige henvendelser: `fiks@ksdigital.no`.


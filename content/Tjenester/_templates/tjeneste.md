---
title: Fiks [Tjenestenavn]
date: YYYY-MM-DD
aliases: ["/fiks-plattform/tjenester/[tjenestenavn]/"]
---

<!--
  GENERELL MAL FOR TJENESTEDOKUMENTASJON

  Denne malen dekker alle typer Fiks-tjenester:
    - REST API-tjenester (eks. Dokumentlager, Samtykke, Kjøretøyregister)
    - Meldingsbaserte tjenester via Fiks IO/Protokoll (eks. Bekymringsmelding, Digisos)
    - Innbyggerportal-tjenester (eks. min.kommune.no, Samtykke web)
    - Felleskomponenter (eks. Fiks SMS, Fiks del dokument)
    - Tjenestegrupper / paraplysider (eks. Fiks melding, Fiks register)

  Bruksanvisning:
    1. Kopier malen til content/Tjenester/[tjenestenavn].md
       (eller content/Tjenester/[tjenestegruppe]/[tjenestenavn].md).
    2. Slett seksjoner som ikke er relevante for din tjeneste – under hver
       overskrift står det en kommentar som forklarer når seksjonen er nyttig.
    3. Slett alle <!-- ... --> kommentarer før publisering.

  Prinsipp: Ikke dupliser informasjon som finnes ett annet sted.
    - API-detaljer (endepunkter, skjemaer, statuskoder)  → Swagger/OpenAPI
    - Autentisering, miljøer, cURL-eksempel, feilformat,
      versjoneringspolicy, autorisering                  → Felles/integrasjoner.md
    - Plattformsikkerhet, kryptering, audit              → Felles/sikkerhet.md
    - Testmiljø-tilgang og -URL-er                       → Felles/testmiljo.md
    - Fiks IO-mekanikk (ASiC-E, TTL, standardmeldinger)  → fiksio.md
    - Fiks Protokoll-oppsett (system, konto, tilganger)  → fiksprotokoll/_index.md

  Se [Hvor hører innholdet hjemme]({{< ref "_templates/_index.md" >}}) for full ansvarsdeling.
-->

## Kort beskrivelse

<!--
  PÅKREVD. Følg dette mønsteret:
    1. Én tagline-linje øverst som oppsummerer tjenesten i én setning.
       Skal kunne stå alene i en lenkepreview eller meny.
    2. 2–4 setninger som forklarer hva tjenesten gjør og hvem den er for.
    3. Bullet-liste med 3–5 kjernefunksjoner.
  En integrator skal kunne avgjøre relevans på under et minutt.
-->

**[Én tagline-linje. F.eks. "Sikker maskin-til-maskin meldingsutveksling mellom kommunale fagsystemer."]**

Fiks [Tjenestenavn] er en tjeneste som [...]. [Beskriv målgruppe og typisk bruksscenario.]

Tjenesten tilbyr:

- [Kjernefunksjon 1]
- [Kjernefunksjon 2]
- [Kjernefunksjon 3]

### Når passer ikke denne tjenesten?

<!--
  VALGFRITT, men ANBEFALT. Hjelp integratoren å unngå feilbruk ved å være
  eksplisitt om hva tjenesten IKKE er ment for. Slett hvis ikke relevant.

  Eksempler:
  - "Fiks IO er ikke designet for migrering av store datamengder."
  - "Fiks Bekymringsmelding er ikke en generell skjemamotor – kun bekymringsmeldinger til barnevern."
  - "Bruk SvarUt for utgående post med printfallback i stedet."
-->

<!--
  VALGFRITT: "Tilgjengelige grensesnitt"-tabell.

  Bruk en tabell KUN hvis hver rad bærer unik informasjon, f.eks. en
  innbygger-URL eller et meldingsprotokoll-navn. For en ren REST-tjeneste
  er en enkel lenke nok – fjern tabellen og la denne stå:

      API-spesifikasjon: [Swagger / OpenAPI](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json)

  Grensesnitt:

      | Type        | Detaljer |
      |--------------------|----------|
      | Fiks IO            | Protokoll `no.ks.fiks.[tjenestenavn].v1` |
      | Maskin til maskin  | [Api-spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json) |
-->

API-spesifikasjon: [Swagger / OpenAPI](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json)

## Kom i gang

Tjenestespesifikke forutsetninger:

1. Tjenesten må aktiveres via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
2. Integrasjonen må gis tilgang til tjenesten via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
3. <!-- Andre tjenestespesifikke krav, f.eks.:
       - signert avtale om bruk
       - opplasting av offentlig nøkkel (PEM) for ende-til-ende-kryptering
       - Fiks Protokoll-system og -konto med støtte for protokollen `no.ks.fiks.<navn>.v1`
   -->

## Beskrivelse av tjenesten

<!-- Funksjonell forklaring uten API-detaljer som finnes i spec'en. -->

### Konsepter og begreper

<!--
  VALGFRITT. Forklar domeneobjekter og statuser som API-konsumenten må kjenne til.
  Slett seksjonen hvis tjenesten ikke har domenespesifikke begreper.
-->

| Begrep | Beskrivelse |
|--------|-------------|
| `[Begrep1]` | [...] |
| `[Begrep2]` | [...] |


### Overordnet flyt

1. [Steg 1]
2. [Steg 2]
3. [Steg 3]

<!-- Valgfritt diagram: ![diagram](images/[diagram].png "[Alt-tekst]") -->

### Tjenestespesifikke regler

<!--
  Bruk denne seksjonen for forretningsregler og forutsetninger som IKKE
  fremkommer av API-spec'en. Eksempler:
    - Rekkefølge av kall ("ressurs X må opprettes før Y kan kalles")
    - Statusoverganger / tilstandsmaskiner
    - Validering på tvers av felter
    - Idempotens, retries, eventuell konsistens
    - Begrensninger (filstørrelse, rate limits, batch-størrelser)
    - Krypteringskrav for vedlegg, multipart-rekkefølge
    - Korrelasjons-id-konvensjoner
-->

### Testdata

<!-- VALGFRITT. Beskriv tjenestespesifikke testdata. Slett seksjonen hvis
     standard testdata fra Felles/testmiljo.md er tilstrekkelig. -->

---

## Meldingsprotokoll

<!--
  KUN for meldingsbaserte tjenester (Fiks IO / Fiks Protokoll).
  Slett hele seksjonen for rene REST-tjenester.

  Generell Fiks IO-mekanikk (ASiC-E, signering, ende-til-ende-kryptering, TTL,
  standardmeldinger som tidsavbrudd og serverfeil) er beskrevet i
  fiksio.md – ikke gjenta her.
-->

Fullstendig skjemadefinisjon med eksempler: [github.com/ks-no/fiks-io-[tjenestenavn]-protokoll](https://github.com/ks-no/fiks-io-[tjenestenavn]-protokoll)

| Meldingstype | Retning | Body | Beskrivelse |
|--------------|---------|------|-------------|
| `no.ks.fiks.[tjenestenavn].[type1].v1` | Til mottaker | ASiC-E med JSON + PDF | [Beskrivelse] |
| `no.ks.fiks.[tjenestenavn].mottatt.v1` | Fra mottaker | Tom | Kvittering på mottatt melding |
| `no.ks.fiks.[tjenestenavn].feilet.v1`  | Fra mottaker | `feilmelding.json` | Feil ved håndtering hos mottaker |

I tillegg gjelder [standardmeldinger fra Fiks IO]({{< ref "fiksio.md" >}}#feilmeldinger-fra-fiks-io) (`tidsavbrudd`, `serverfeil`).

Anbefalt `time-to-live`: **24 timer** (med mindre tjenesten har andre krav). Generell mekanikk: [Levetid og TTL]({{< ref "fiksio.md" >}}#levetid-på-melding-og-ttl).

---

## API-referanse

Endepunkter, request/response-skjemaer, feltbeskrivelser og statuskoder vedlikeholdes i Swagger – ikke dupliser dette her:

[Api-spec for Fiks [Tjenestenavn]](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json)

<!--
  Bruk denne seksjonen kun til ting som ikke kan uttrykkes i OpenAPI –
  f.eks. multipart-rekkefølge, krypteringskrav for vedlegg, navnekonvensjoner
  for filer, tjenestespesifikke errorCode-verdier, tilstandsmaskiner.
-->

---

## Tjenestespesifikke feilkoder

<!--
  VALGFRITT. Slett seksjonen hvis tjenesten kun bruker standard feilformatet
  fra Felles/integrasjoner.md#feilmeldinger. List ellers errorCode-verdier
  som er spesifikke for denne tjenesten.
-->

---

## Versjonering

<!--
  VALGFRITT. Slett seksjonen hvis tjenesten følger den generelle policy'en i
  Felles/integrasjoner.md#versjonering uten unntak.

  Bruk tabellen nedenfor til å gi integratorer en rask oversikt over hvilke
  versjoner som finnes, hva som er gjeldende, og hva som ev. er deprecated.
  Detaljert endringshistorikk hører hjemme i ## Endringslogg.
-->

| Versjon | Status | Utfasingsdato | Hva er nytt |
|---------|--------|---------------|-------------|
| [v1](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil]-v1.json) | ✅ Gjeldende | – | Første versjon |

<!--
  Eksempel med alle statusverdier (slett/tilpass til din tjeneste):

  | Versjon | Status               | Utfasingsdato | Hva er nytt |
  |---------|----------------------|---------------|-------------|
  | [v0](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil]-v0.json) | ❌ Avviklet        | 2024-01-01 | Første versjon – ikke lenger støttet |
  | [v1](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil]-v1.json) | ⚠️ Deprecated      | 2026-12-31 | La til støtte for ettersendelse |
  | [v2](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil]-v2.json) | ✅ Gjeldende       | –          | Nytt felt `andreSynspunkter`; kryptering påkrevd for alle vedlegg |
  | [v3](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil]-v3.json) | 🚧 Under utvikling | –          | Støtte for bulk-innsending (ikke klar for produksjon) |

  Statusverdier:
    ✅ Gjeldende        – anbefalt for alle nye integrasjoner
    ⚠️ Deprecated       – støttes fortsatt, men planlegges faset ut; migrer til gjeldende versjon
    ❌ Avviklet         – støttes ikke lenger; kall vil feile
    🚧 Under utvikling  – tilgjengelig i testmiljø, ikke klar for produksjon
-->

---

## Klientbibliotek

<!--
  VALGFRITT. Slett seksjonen hvis KS ikke tilbyr et offisielt
  klientbibliotek for denne tjenesten. Det er kun et fåtall tjenester som
  har dette – se Felles/klientbiblioteker.md for full oversikt.
-->

KS tilbyr et offisielt Java-bibliotek: [fiks-[tjenestenavn]-klient](https://github.com/ks-no/fiks-[tjenestenavn]-klient).
Se også [samlet oversikt over klientbiblioteker]({{< ref "klientbiblioteker.md" >}}).

---

## Brukes av følgende Fiks-tjenester

<!--
  KUN for felleskomponenter som brukes som byggekloss i andre tjenester.
  Slett seksjonen for selvstendige tjenester.
-->

- [Tjeneste A]({{< ref "[tjeneste-a].md" >}})
- [Tjeneste B]({{< ref "[tjeneste-b].md" >}})

---

## Relaterte tjenester

<!-- Lenk til andre Fiks-tjenester som er relevante for integratoren. -->

- [Fiks IO]({{< ref "fiksio.md" >}}) – sikker maskin-til-maskin meldingskanal
- [Fiks Dokumentlager]({{< ref "dokumentlager.md" >}}) – kryptert dokumentlagring
- [SvarUt/SvarInn]({{< ref "svarut/_index.md" >}}) – alternativ leveringskanal

---


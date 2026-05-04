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
  PÅKREVD. 2–4 setninger som forklarer hva tjenesten gjør og hvem den er for.
  En integrator skal kunne avgjøre relevans på under et minutt.
-->

Fiks [Tjenestenavn] er en tjeneste som [...]. Tjenesten tilbyr:

- [Kjernefunksjon 1]
- [Kjernefunksjon 2]
- [Kjernefunksjon 3]

<!--
  VALGFRITT: "Tilgjengelige grensesnitt"-tabell.

  Bruk en tabell KUN hvis hver rad bærer unik informasjon, f.eks. en
  innbygger-URL eller et meldingsprotokoll-navn. For en ren REST-tjeneste
  er en enkel lenke nok – fjern tabellen og la denne stå:

      API-spesifikasjon: [Swagger / OpenAPI](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json)

  Eksempel for portal-tjeneste:

      | Grensesnitt              | Detaljer |
      |--------------------------|----------|
      | Web portal (innbygger)   | https://[tjenestenavn].kommune.no (prod) / https://[tjenestenavn].test.ks.no (test) |
      | Maskin til maskin (REST) | [Api-spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json) |

  Eksempel for meldings-tjeneste:

      | Grensesnitt        | Detaljer |
      |--------------------|----------|
      | Fiks IO            | Protokoll `no.ks.fiks.[tjenestenavn].v1` |
      | Maskin til maskin  | [Api-spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json) |
-->

API-spesifikasjon: [Swagger / OpenAPI](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json)

## Kom i gang

For generelle steg (Fiks-organisasjon, Maskinporten, virksomhetssertifikat, opprettelse av integrasjon) – se [Hvordan komme i gang med utviklingen]({{< ref "integrasjoner.md" >}}#hvordan-komme-i-gang-med-utviklingen).

Tjenestespesifikke forutsetninger:

1. Tjenesten må aktiveres via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
2. Integrasjonen må gis tilgang til tjenesten med privilegiet `[privilegium]`.
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

### Roller

<!--
  VALGFRITT. Bruk denne hvis tjenesten involverer flere typer aktører
  (innbygger, saksbehandler, fagsystem, avsender/produsent, mottaker/konsument).
  Slett for tjenester med kun én aktørtype.
-->

- **[Rolle 1]** – [...]
- **[Rolle 2]** – [...]

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

---

## Integrasjonsutvikling

Autentisering, headere, miljøer, cURL-eksempel, feilformat og versjoneringspolicy er felles for alle Fiks-tjenester og dokumentert i [Integrasjoner]({{< ref "integrasjoner.md" >}}). Spesielt relevant:

- [Autentisering (Integrasjon)]({{< ref "integrasjoner.md" >}}#integrasjon)
- [Eksempel: autentisert kall]({{< ref "integrasjoner.md" >}}#eksempel-autentisert-kall)
- [Miljøer]({{< ref "integrasjoner.md" >}}#miljøer)
- [Feilmeldinger]({{< ref "integrasjoner.md" >}}#feilmeldinger)
- [Versjonering]({{< ref "integrasjoner.md" >}}#versjonering)

<!--
  For portal-tjenester med både innbygger- og fagsysteminnlogging, bytt ut
  lista over med en aktørtabell:

      | Aktør     | Mekanisme                                        | Detaljer |
      |-----------|--------------------------------------------------|----------|
      | Innbygger | ID-porten (OIDC)                                 | [Sikkerhet]({{< ref "sikkerhet.md" >}}#privatpersoner) |
      | Fagsystem | Integrasjon (Maskinporten + IntegrasjonId/Passord) | [Integrasjon]({{< ref "integrasjoner.md" >}}#integrasjon) |
-->

### Tjenestens base-sti

Under [API-base for miljøet]({{< ref "integrasjoner.md" >}}#miljøer) eksponeres tjenesten på:

```
/[tjenestenavn]/api/v1/
```

<!-- Hvis tjenesten har et dev-miljø eller andre miljøspesifikke avvik, dokumenter her. -->

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
  Felles/integrasjoner.md#versjonering. List ellers tjenestespesifikke
  unntak, f.eks.:
    - parallelle major-versjoner under aktiv vedlikehold (se bekymringsmelding/)
    - meldingsprotokoll-versjonering for Fiks IO-tjenester
-->

Gjeldende versjon: `v1`.

---

## Brukes av følgende Fiks-tjenester

<!--
  KUN for felleskomponenter som brukes som byggekloss i andre tjenester.
  Slett seksjonen for selvstendige tjenester.
-->

- [Tjeneste A]({{< ref "[tjeneste-a].md" >}})
- [Tjeneste B]({{< ref "[tjeneste-b].md" >}})

---

## Undertjenester

<!--
  KUN for tjenestegrupper / paraplysider. Slett for selvstendige tjenester.
  {{% children %}} lister automatisk undersider basert på Hugos
  innholdsstruktur. Alternativt list manuelt.
-->

{{% children %}}

---

## Relaterte tjenester

<!-- Lenk til andre Fiks-tjenester som er relevante for integratoren. -->

- [Fiks IO]({{< ref "fiksio.md" >}}) – sikker maskin-til-maskin meldingskanal
- [Fiks Dokumentlager]({{< ref "dokumentlager.md" >}}) – kryptert dokumentlagring
- [SvarUt/SvarInn]({{< ref "svarut/_index.md" >}}) – alternativ leveringskanal

<!--
  Tjenester med offisielt KS-klientbibliotek kan i tillegg legge til:

      ## Offisielt klientbibliotek
      KS tilbyr en Java-klient: [fiks-[tjenestenavn]-klient](https://github.com/ks-no/fiks-[tjenestenavn]-klient).
      Se også [samlet oversikt]({{< ref "klientbiblioteker.md" >}}).
-->


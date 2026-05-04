---
title: Fiks [Tjenestegruppenavn]
date: YYYY-MM-DD
aliases: ["/fiks-plattform/tjenester/[tjenestegruppenavn]/"]
---

<!--
  MAL: Tjenestegruppe (paraply-side)
  Bruk denne malen for indeks-sider som samler flere undertjenester
  (eks. Fiks melding, Fiks protokoll, Fiks register, SvarUt).
  Denne sida bør være kort og peke videre til underliggende tjenester.
-->

## Kort beskrivelse

Fiks [Tjenestegruppenavn] er en tjenestegruppe som samler flere relaterte tjenester under en felles paraply. Tjenestene i gruppen deler [autentiseringsmodell / avtalegrunnlag / fakturering / signering av tjenestevedlegg].

Tjenestegruppen inneholder:

{{% children %}}

<!-- Eller manuelt:
- [Tjeneste A]({{< ref "tjeneste-a.md" >}}) – [kort beskrivelse]
- [Tjeneste B]({{< ref "tjeneste-b.md" >}}) – [kort beskrivelse]
-->

## Når bruker man hva?

<!-- Hjelpe leseren å velge riktig undertjeneste. -->

| Behov | Bruk |
|-------|------|
| [Behov A] | [Tjeneste A] |
| [Behov B] | [Tjeneste B] |

## Tilgjengelige grensesnitt

| Grensesnitt       | Støtte |
|-------------------|--------|
| Web portal        | Ja / Nei |
| Maskin til maskin | Se hver enkelt undertjeneste |

## Felles for tjenestegruppen

### Kom i gang

1. Kommunen/organisasjonen må ha en aktiv Fiks-organisasjon.
2. Tjenestegruppen og ønskede undertjenester aktiveres via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
3. <!-- Eventuell felles konfigurasjon -->

### Felles begreper

<!-- Forklar begreper som går igjen i flere undertjenester. -->

| Begrep | Beskrivelse |
|--------|-------------|
| `[Begrep1]` | [...] |

### Felles autentisering

Alle tjenester i gruppen bruker [integrasjonsautentisering]({{< ref "integrasjoner.md" >}}#integrasjon) der ikke annet er angitt.

---

## Status og veikart

<!-- Valgfri seksjon for å vise modenhet/leveringsstatus per undertjeneste. -->

| Tjeneste | Status | Estimert ferdig |
|----------|--------|-----------------|
| [Tjeneste A] | [I produksjon / Pilot / Under utvikling] | [...] |
| [Tjeneste B] | [...] | [...] |

---

## Relaterte tjenester

- [Fiks IO]({{< ref "fiksio.md" >}})
- [Sikkerhet og autentisering]({{< ref "sikkerhet.md" >}})
- [Generell integrasjonsutvikling]({{< ref "integrasjoner.md" >}})

## Kontakt

Tekniske spørsmål: `fiks-utvikling@ksdigital.no`. Øvrige henvendelser: `fiks@ksdigital.no`.


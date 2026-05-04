---
title: Fiks [Komponentnavn]
date: YYYY-MM-DD
aliases: ["/fiks-plattform/tjenester/[komponentnavn]/"]
---

<!--
  MAL: Felleskomponent
  Bruk denne malen for komponenter som ikke er en selvstendig tjeneste,
  men som brukes som byggekloss i flere Fiks-tjenester
  (eks. Fiks SMS, Fiks del dokument, Maskinporten-klient).
-->

## Kort beskrivelse

Fiks [Komponentnavn] er en felleskomponent som brukes i flere av Fiks-tjenestene. En typisk oppgave for [Komponentnavn] er [...].

Komponenten kan også brukes direkte av kommunens fagsystem dersom man har et eget behov for [...].

## Tilgjengelige grensesnitt

| Grensesnitt       | Støtte |
|-------------------|--------|
| Web portal        | Ja / Nei |
| Maskin til maskin | [Api-spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json) |

## Bruk via API

### Autentisering

Se [integrasjonsautentisering]({{< ref "integrasjoner.md" >}}#integrasjon) og [eksempel på autentisert kall]({{< ref "integrasjoner.md" >}}#eksempel-autentisert-kall).

### Miljøer

| Miljø | Base-URL |
|-------|----------|
| Test  | `https://api.fiks.test.ks.no/[komponentnavn]/api/v1/` |
| Prod  | `https://api.fiks.ks.no/[komponentnavn]/api/v1/` |

### Begrensninger og forbehold

<!-- F.eks. størrelsesgrenser, tegnsett-begrensninger, kostnadsmodell. -->

- [Begrensning 1, f.eks. maks 1000 mottakere per batch]
- [Begrensning 2]

### API-referanse

Endepunkter, request/response-skjemaer og statuskoder vedlikeholdes i Swagger – ikke dupliser her:

[Api-spec for Fiks [Komponentnavn]](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json)

<!--
  Bruk denne seksjonen kun til komponentspesifikke regler som ikke kan
  uttrykkes i OpenAPI – f.eks. tegnsett-håndtering, oppdelingsregler,
  fakturering eller koblinger til andre tjenester.
-->

---

## Brukes av følgende Fiks-tjenester

<!-- List opp tjenestene som benytter denne komponenten. -->

- [Tjeneste A]({{< ref "[tjeneste-a].md" >}})
- [Tjeneste B]({{< ref "[tjeneste-b].md" >}})

---

## Klientbiblioteker

<!-- Slett seksjonen hvis komponenten ikke har offisielle klienter. -->

| Språk | Bibliotek |
|-------|-----------|
| Java  | [fiks-[komponentnavn]-klient](https://github.com/ks-no/fiks-[komponentnavn]-klient) |
| .NET  | [fiks-[komponentnavn]-client-dotnet](https://github.com/ks-no/fiks-[komponentnavn]-client-dotnet) |

---

## Versjonering

Gjeldende versjon er `v1`. Eventuelle brytende endringer gir ny major-versjon.

## Kontakt

Tekniske spørsmål: `fiks-utvikling@ksdigital.no`.




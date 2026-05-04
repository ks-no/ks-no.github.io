---
title: Fiks [Tjenestenavn]
date: YYYY-MM-DD
aliases: ["/fiks-plattform/tjenester/[tjenestenavn]/"]
---

<!--
  MAL: Innbyggerportal-tjeneste
  Bruk denne malen for tjenester som primært tilbyr en web-portal til
  innbyggere, ofte med tilhørende API for kommune/fagsystem
  (eks. min.kommune.no, Samtykke, Bekymringsmelding-skjema).
-->

## Kort beskrivelse

Fiks [Tjenestenavn] er en innbyggerportal som [...]. Innbyggere autentiseres via ID-porten og får tilgang til [...]. Tjenesten tilbyr i tillegg et API som lar kommunens fagsystem [...].

Tjenesten tilbyr:

- [Funksjon for innbygger]
- [Funksjon for kommune/fagsystem]
- [...]

## Tilgjengelige grensesnitt

| Grensesnitt       | Støtte |
|-------------------|--------|
| Web portal (innbygger) | Ja – `https://[tjenestenavn].kommune.no` (prod) / `https://[tjenestenavn].test.ks.no` (test) |
| Maskin til maskin | [Api-spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json) |

## For innbyggere

<!-- Beskriv hva innbygger ser og kan gjøre. Bruk gjerne skjermbilder. -->

Innbyggere logger inn via ID-porten på `https://[url]` og får tilgang til:

- [Funksjon 1]
- [Funksjon 2]

![skjermbilde](../images/[skjermbilde].png "[Alt-tekst]")

## For kommuner og fagsystemer

### Kom i gang

1. Kommunen må ha en aktiv Fiks-organisasjon og inngå avtale om bruk av tjenesten.
2. Tjenesten aktiveres via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
3. <!-- Eventuell konfigurasjon av kontoer, mottakere, e.l. -->
4. Det opprettes en [integrasjon]({{< ref "integrasjoner.md" >}}) for fagsystemet.

### Roller

- **Innbygger** – sluttbruker med ID-porten-innlogging
- **Saksbehandler** – kommunalt ansatt som administrerer tjenesten via Fiks Konfigurasjon eller fagsystem
- **Fagsystem** – integrert system som leser/skriver data via API

### Funksjonell flyt

1. [Saksbehandler/fagsystem oppretter ressurs]
2. [Innbygger logger inn og ser ressursen]
3. [Innbygger gjør en handling]
4. [Fagsystem mottar oppdatering]

---

## Integrasjonsutvikling

Det anbefales å lese [generell integrasjonsutvikling mot Fiks]({{< ref "integrasjoner.md" >}}) først.

### Autentisering

| Aktør | Mekanisme |
|-------|-----------|
| Innbygger | ID-porten (OIDC) |
| Fagsystem | [Integrasjonsautentisering]({{< ref "integrasjoner.md" >}}#integrasjon) (Maskinporten + IntegrasjonId/Passord) |

### Miljøer

| Miljø | API base-URL | Portal |
|-------|--------------|--------|
| Test  | `https://api.fiks.test.ks.no/[tjenestenavn]/api/v1/` | `https://[tjenestenavn].test.ks.no` |
| Prod  | `https://api.fiks.ks.no/[tjenestenavn]/api/v1/` | `https://[tjenestenavn].kommune.no` |

### API-referanse

Endepunkter, request/response-skjemaer, feltbeskrivelser og statuskoder vedlikeholdes i Swagger – ikke dupliser dette her:

[Api-spec for Fiks [Tjenestenavn]](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/[api-fil].json)

<!--
  Bruk eventuelt denne seksjonen kun til:
  - Tjenestespesifikke forretningsregler som ikke kan uttrykkes i OpenAPI
  - Et minimalt eksempel på autentisert kall
-->

---

## Klientbiblioteker

<!-- Slett hvis ikke relevant. -->

| Språk | Bibliotek |
|-------|-----------|
| Java  | [fiks-[tjenestenavn]-klient](https://github.com/ks-no/fiks-[tjenestenavn]-klient) |
| .NET  | [fiks-[tjenestenavn]-client-dotnet](https://github.com/ks-no/fiks-[tjenestenavn]-client-dotnet) |

---

## Versjonering

Gjeldende API-versjon er `v1`. Brytende endringer gir ny major-versjon.

---

## Relaterte tjenester

- [Sikkerhet og autentisering]({{< ref "sikkerhet.md" >}})
- [Fiks Dokumentlager]({{< ref "dokumentlager.md" >}})
- [Fiks IO]({{< ref "fiksio.md" >}})

## Kontakt

Tekniske spørsmål: `fiks-utvikling@ksdigital.no`. Øvrige henvendelser: `fiks@ksdigital.no`.



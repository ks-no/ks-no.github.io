---
title: SvarInn API
description: "Endepunkter i SvarInn V2 for å hente, laste ned og kvittere forsendelser."
weight: 10
aliases: [/tjenester/svarut/svarinn-rest/, /tjenester/svarut/api/svarinn-rest, /svarut/api/svarinn-rest]
---

Denne siden beskriver SvarInn V2. V1 er utgått, se [SvarInn V1](/tjenester/svarut/utgatt/svarinnv1/).

## Tilgang

SvarInn bruker HTTP Basic med id-en til mottakersystemet som brukernavn og servicepassordet som passord. Se [Sette opp et mottakersystem](/tjenester/svarut/motta/#sette-opp-et-mottakersystem).

Feil brukernavn eller passord gir `401 Unauthorized`. Ukjent URL gir `404`. Feilene har en melding som forklarer hva som er galt.

| Miljø | Base-URL |
|---|---|
| Test | `https://test.svarut.ks.no/api` |
| Produksjon | `https://svarut.ks.no/api` |

Spesifikasjon: [svarinn-api-v2.json](https://developers.fiks.ks.no/api/svarinn-api-v2.json) ([åpne i Swagger Editor](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/svarinn-api-v2.json))

## Endepunkter

| Hva | Endepunkt |
|---|---|
| Hente nye forsendelser | `GET /svarinn/v2/forsendelser` |
| Laste ned filene til en forsendelse | `GET /svarinn/v2/forsendelser/{forsendelseId}` |
| Kvittere eller melde feil | `PATCH /svarinn/v2/forsendelser/{forsendelseId}/status` |

### Hente nye forsendelser

Gir metadata for opptil 200 forsendelser som venter på mottakersystemet. Er det ingen, får du en tom liste. Er det flere enn 200, henter du igjen etter at du har kvittert for de første.

Metadata inneholder blant annet avsender, mottaker, tittel, `svarPaForsendelse`, `eksternRef` og Noark-metadata fra avsenders system (`metadataFraAvleverendeSystem` og `metadataForImport`). Bruk dem til å legge forsendelsen på riktig sak.

### Laste ned filer

Gir en zip-fil med alle filene i forsendelsen. Filen er kryptert med den offentlige nøkkelen til mottakersystemet og må dekrypteres, se [Kryptering](/tjenester/svarut/motta/kryptering/). Filnavnet står i `Content-Disposition`. Filene kan være store, så strøm dem til disk.

### Kvittere

Når forsendelsen er importert:

```json
{ "status": "MOTTATT" }
```

Forsendelsen får status `LEST`, og SvarUt sender den ikke videre.

Kan dere ikke importere forsendelsen:

```json
{ "status": "FEILET", "feil": { "feilmelding": "Ukjent saksnummer", "permanent": true } }
```

| `permanent` | Hva skjer |
|---|---|
| `true` | Forsendelsen går videre til Altinn, og eventuelt til print hvis avsender har slått på ettersending for virksomheter. |
| `false` | Feilmeldingen havner i hendelsesloggen, men forsendelsen blir liggende klar til neste henting. |

Forsendelser blir liggende i SvarInn til de er kvittert. Er en forsendelse ikke kvittert etter to timer, kommer den med i e-posten om manglende import.

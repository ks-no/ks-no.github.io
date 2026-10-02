---
title: Omsorgsansvar for fosterforeldre
date: 2026-10-02
---

## Kort beskrivelse

**Send endringer i fosterforeldres omsorgsansvar til Folkeregisteret via Fiks.**

API-et er laget for leverandører av fagsystemer til barnevernstjenestene. Fagsystemet kaller en av API-ets operasjoner for å registrere eller endre omsorgsansvar og henter behandlingsresultatet asynkront. Tjenesten er et produsent-API, ikke et API for oppslag i Folkeregisterets persondata.

> **Status:** API-et og kontrakten er under utvikling. Endepunkter, tilgang og tilgjengelighet i test og produksjon må avklares før integrasjon tas i bruk.

API-spesifikasjon: [OpenAPI på GitHub](https://github.com/ks-no/fiks-register-fosterforeldre-produsent-spec/blob/main/register-fosterforeldre-produsent.json).

## Kom i gang

Integrasjonen bruker Fiks integrasjonsinnlogging med Maskinporten. Se [felles veiledning for integrasjoner]({{% ref "integrasjoner.md" %}}) for opprettelse, autentisering og tilgang. TODO: avklare tilgangstyring

Følgende base-URL-er er **oppgitt i kontraktsutkastet**, ikke bekreftet som tilgjengelige:

| Miljø | Base-URL |
|-------|----------|
| Test | `https://api.test.fiks.ks.no/folkeregister/produsent` |
| Produksjon | `https://api.fiks.ks.no/folkeregister/produsent` |

TODO: Urler kan endre seg før endlig versjon er ferdig.

## Beskrivelse av tjenesten

### Overordnet flyt

1. Velg riktig operasjon og kall det tilhørende `POST`-endepunktet i API-et med JSON-data i forespørselen. Hvert kall gjelder én relasjon mellom fosterbarn og fosterforelder. Se [innsending]({{% ref "innsending.md" %}}).
2. Fiks kvitterer for mottak med `202 Accepted`. Dette er **ikke** Folkeregisterets beslutning.
3. Hent startsekvens og [poll tilbakemeldinger]({{% ref "tilbakemeldinger.md" %}}) for å finne ut om meldingen ble registrert eller avvist.

Se [brukseksemplene]({{% ref "brukseksempler.md" %}}) for valg av operasjon i typiske situasjoner.

## API-referanse

[OpenAPI-kontrakten på GitHub](https://github.com/ks-no/fiks-register-fosterforeldre-produsent-spec/blob/main/register-fosterforeldre-produsent.json) 

{{% children %}}

## Få hjelp

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

---
title: Fiks Nav hjelpemiddel API
date: 2026-03-09
aliases: ["/fiks-plattform/tjenester/fiks-nav-hjelpemiddel-api/"]
---

## Kort beskrivelse

**Integrasjon mot NAVs hjelpemiddel-API for kommunale lager- og logistikkløsninger.**

Fiks Nav hjelpemiddel gir kommuner tilgang til NAVs API via Fiks-plattformen. Tjenesten benyttes mot kommunens løsning for lager, logistikk og samhandling på hjelpemiddelområdet.

Tjenesten tilbyr:

- Oversikt over digitale søknader sendt fra kommunen
- Automatisk opprettelse av mottaksordre ved leveringer fra NAV
- Kobling mellom brukernummer og fødselsnummer
- Innsyn i andre bestilleres søknader ved tjenstlig behov
- Oversikt over hastesaker med begrunnelse

API-spesifikasjon: [Swagger / OpenAPI](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/nav-hjelpemiddel-v3.yaml)

## Kom i gang

Tjenestespesifikke forutsetninger:

1. Tjenesten må aktiveres via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
2. Integrasjonen må gis tilgang til tjenesten via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
3. Mottakerløsningen må innfri de juridiske kravene nedfelt i avtale med NAV.
4. Autentisering skjer ved hjelp av Integrasjon-mekanismen beskrevet under [generelle integrasjoner]({{% ref "felles/integrasjoner.md#integrasjon" %}}).

## Beskrivelse av tjenesten

### Overordnet flyt

1. Kommunen sender digitale søknader via fagsystemet.
2. NAV behandler søknaden og klargjør levering.
3. Kommunen mottar oversikt over kommende leveringer og får automatisk opprettet mottaksordre med bruker- og hjelpemiddelinformasjon.

### Søknader

- Se oversikt over alle digitale søknader som er sendt fra kommunen
- Be om innsyn i en annen bestillers søknad ved tjenstlig behov
- Se hastesak og begrunnelse

### Leveringer fra NAV

- Kommunen får oversikt over kommende leveringer fra NAV
- Kommunen får automatisk opprettet mottaksordre, slik at informasjon om bruker og hva de skal ha utlevert av hjelpemidler er knyttet sammen
- Brukernummer og fødselsnummer er knyttet sammen, slik at man slipper å søke opp brukere manuelt

### Testdata

I test er det lite data.
Logistikk-endepunktet krever et kjent kommunenr blant: 5616, 1505, 1506, 1579, 3207, 4601, 0301

---

## API-referanse


[Api-spec for Fiks Nav hjelpemiddel](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/nav-hjelpemiddel-v3.yaml)

---


{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

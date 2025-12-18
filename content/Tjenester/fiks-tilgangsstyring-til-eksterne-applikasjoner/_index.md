---
title: Fiks tilgangsstyring til eksterne applikasjoner
description: Tjeneste for å administrere tilgang til eksterne applikasjoner
weight: 100
---
Fiks tilgangsstyring til eksterne applikasjoner er en autorisasjonstjeneste som gjør det mulig for applikasjonstilbydere å verifisere om brukere i en organisasjon har tilgang til deres applikasjoner.

## Hva er tjenesten?

Tjenesten fungerer som en sentral autorisasjonsløsning der:

- **Applikasjonstilbydere** (for eksempel FHI, DiBK og NAV) registrerer sine applikasjoner for bruk i tilgangsstyring
- **Applikasjonskonsumenter** (kommuner og andre virksomheter) administrerer hvilke brukere som har tilgang
- **Eksterne applikasjoner** spør tjenesten om en bruker har tilgang ved innlogging

**Viktig:** Applikasjonene kjører i tilbyderens eget miljø – ikke hos Fiks. Tjenesten leverer kun autorisasjonsbeslutninger (ja/nei per bruker og organisasjon).  Det sendes ikke bruker- eller forretningsdata ut av tjenesten.

## Definisjon av roller

> **Applikasjonstilbyder** er virksomheten som registrerer én eller flere eksterne applikasjoner i Fiks tilgangsstyring til eksterne applikasjoner.

> **Applikasjonskonsument** er virksomheten som bruker Fiks tilgangsstyring til eksterne applikasjoner til å administrere tilgang til én eller flere applikasjoner levert av applikasjonstilbydere.

## Hvordan fungerer det?
![Hvordan fungerer det?](https://www.plantuml.com/plantuml/png/RP3BJYin38RtynHMLwtKYyvPTW4jue80gGia1AYRb75JCrCdSZoL-lPa4WPrACh2ilFxysylWXhHPbyNFaRw86zOOV1SDweRQIgKsPA3KHs02N2LAdtfJHKKXS5ul-RXpWLGgZV74cMKUfRUznjkgKeQQzY6e4SXjcs-PimeR5arLIPyEaP9b4Ut9-O-Q2KHGI79WYcZW8AAKITvS5if2dQAu0uekJ3Ef3dycyBA-u2gC4HEPbpEPmSiOOCxTnWLgGSc5_3T5YDloJQ2yNLRjB7dcM7h1Do9F-Hpr1q9v1jZHpgrcu_zu_V_5AwDhSccdYB_Hbnxu3ayEMjZ6fL0VIj5_3-TUc-wgV3wUm5ukooo3YOT-S6CpxQ1zuwQRSpXXK84baRDN-85Sjdiwoy0)

## API-dokumentasjon
- [Tilgang API (HTML)](https://developers.fiks.ks.no/api/?spec=https://developers.fiks.ks.no/api/fiks-tilgang-api-v1.json), [OpenAPI (JSON)](https://developers.fiks.ks.no/api/fiks-tilgang-api-v1.json)
- [Applikasjonstilbyder API (leverandor-tjenester-api-v1) (HTML)](https://developers.fiks.ks.no/api/?spec=https://developers.fiks.ks.no/api/leverandor-tjenester-api-v1.json), [OpenAPI (JSON)](https://developers.fiks.ks.no/api/leverandor-tjenester-api-v1.json)
- [Applikasjonskonsument bruker API (konsument-bruker-api-v1) (HTML)](https://developers.fiks.ks.no/api/?spec=https://developers.fiks.ks.no/api/konsument-bruker-api-v1.json), [OpenAPI (JSON)](https://developers.fiks.ks.no/api/konsument-bruker-api-v1.json)

## Kom i gang
- [Kom i gang som applikasjonstilbyder](tilbyder/)


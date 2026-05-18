---
title: Mal for tjenestedokumentasjon
weight: 999
---

# Mal for tjenestedokumentasjon

Denne mappen inneholder én generell mal som brukes som utgangspunkt når en ny Fiks-tjeneste skal dokumenteres på `developers.fiks.ks.no`:

- [`tjeneste.md`](tjeneste.md) – generell mal som dekker alle typer tjenester (REST API, meldingsbasert, innbyggerportal, felleskomponent, tjenestegruppe).

Malen er bevisst rikholdig. Hver seksjon har en kommentar som forklarer når den er relevant – slett alt du ikke trenger.

## Hvor hører innholdet hjemme?

For å unngå at samme informasjon vedlikeholdes flere steder, har vi en klar ansvarsdeling. **Ikke kopier innhold fra disse sidene inn i din tjenesteside – lenk til dem.**

| Tema | Hvor det skal stå | Anker |
|------|-------------------|-------|
| Hva en integrasjon er, opprettelse, autorisasjonsmodell | [`Felles/integrasjoner.md`]({{< ref "integrasjoner.md" >}}) | – |
| Steg-for-steg "Kom i gang" (sertifikat, Maskinporten, ID-porten) | [`Felles/integrasjoner.md`]({{< ref "integrasjoner.md" >}}) | `#hvordan-komme-i-gang-med-utviklingen` |
| Autentiseringsheadere (`Authorization`, `IntegrasjonId`, `IntegrasjonPassord`) | [`Felles/integrasjoner.md`]({{< ref "integrasjoner.md" >}}) | `#integrasjon` |
| cURL-eksempel | [`Felles/integrasjoner.md`]({{< ref "integrasjoner.md" >}}) | `#eksempel-autentisert-kall` |
| Maskinporten-klienter (Java/.NET) | [`Felles/integrasjoner.md`]({{< ref "integrasjoner.md" >}}) | `#maskinporten-klienter` |
| Miljøer (test/prod base-URL) | [`Felles/integrasjoner.md`]({{< ref "integrasjoner.md" >}}) | `#miljoer` |
| Feilmeldingsformat (`timestamp/status/errorId/...`) | [`Felles/integrasjoner.md`]({{< ref "integrasjoner.md" >}}) | `#feilmeldinger` |
| API-versjoneringspolicy | [`Felles/integrasjoner.md`]({{< ref "integrasjoner.md" >}}) | `#versjonering` |
| Autorisering / privilegier | [`Felles/integrasjoner.md`]({{< ref "integrasjoner.md" >}}) | `#autorisering` |
| Offisielle klientbiblioteker | [`Felles/klientbiblioteker.md`]({{< ref "klientbiblioteker.md" >}}) | Kun relevant for tjenester som faktisk har publiserte klienter |
| Plattformsikkerhet, kryptering, audit, ID-porten/Maskinporten på overordnet nivå | [`Felles/sikkerhet.md`]({{< ref "sikkerhet.md" >}}) | – |
| Testmiljø: tilgang, URL-er, testdata | [`Felles/testmiljo.md`]({{< ref "Felles/testmiljo.md" >}}) | – |
| Support-kanaler og kontaktinformasjon | [`Felles/support.md`]({{< ref "support.md" >}}) | – |
| Endepunkter, request/response-skjemaer, feltbeskrivelser, statuskoder | OpenAPI/Swagger | – |
| Fiks IO-mekanikk: ASiC-E, ende-til-ende-kryptering, TTL, standardmeldinger | [`fiksio.md`]({{< ref "fiksio.md" >}}) | – |
| Fiks Protokoll-oppsett: system, konto, tilganger | [`fiksprotokoll/_index.md`]({{< ref "fiksprotokoll/_index.md" >}}) | – |

## Hva hører hjemme på en tjenesteside (og beste praksis)?

Kun det som er *spesifikt* for tjenesten skal ligge på tjenestesiden. Fellesinformasjon (se tabellen over) skal det bare lenkes til. 

- **Tagline og kort beskrivelse øverst:** Start siden med én setning (tagline) som svarer på «hva er dette?» uten kontekst. Fortsett med maks 4 setninger som forklarer *hva* tjenesten gjør og *hvem* den er for. En integrator skal kunne avgjøre relevans på under et minutt.
- **Vær eksplisitt om hva tjenesten *ikke* er for:** En kort "Når passer ikke denne tjenesten?"-blokk forhindrer feilbruk og overflødig support.
- **Datoer og aliaser i front matter:** Sett `date` til siste større oppdatering og inkluder gamle URL-er som `aliases:` slik at eksisterende lenker og RSS-feeds oppdateres.
- **Lenk til API-spec tidlig:** Sett Swagger-lenken nær toppen av siden. Ikke dupliser API-spec! Endepunkter, request-/response-skjemaer, feltbeskrivelser og statuskoder skal vedlikeholdes i OpenAPI.
- **Tjenestespesifikke begreper og regler:** Domeneobjekter, statuser, funksjonell flyt, roller og forretningsregler som ikke kan uttrykkes i OpenAPI (rekkefølge, statusoverganger, idempotens, kryss-felt-validering).
- **Tjenestespesifikke verdier:** Base-sti under fellesmiljøene, testdata, begrensninger (filstørrelser, batch-grenser, rate limits) og `errorCode`-verdier (som ikke står i OpenAPI).
- **Eksempler skal være kjørbare og minimale:** Generelle cURL-eksempler ligger i integrasjonsveilederen. Tjenestesiden skal kun ha eksempler som viser noe *tjenestespesifikt* (f.eks. multipart-opplasting, signering).
- **Lenke til offisielt klientbibliotek:** Inkluderes hvis tjenesten har det.
- **Bruk Hugo-shortcodes for interne lenker:** Bruk formatet `{{</* ref "fil.md" */>}}` slik at lenker overlever flytting av sider.
- **Versjonering og endringslogg:** Hold en endringslogg for tjenester i aktiv utvikling. Beskriv ikke-brytende og enkle brytende endringer der. Separat v1/v2-dokumentasjon kreves kun når hele tjenestens oppførsel eller grensesnitt endres fundamentalt.
- **Få hjelp-boks:** Hver side skal ha en synlig boks med kontaktinformasjon (support e-post/Slack). Bruk partialen `get-help.html`.

## Fjern det du ikke trenger

Malen dekker mange typer tjenester. Slett seksjoner som ikke gjelder din tjeneste – det er bedre med kort, korrekt dokumentasjon enn lange seksjoner med plassholdertekst.

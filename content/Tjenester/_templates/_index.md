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
| Testmiljø: tilgang, URL-er, testdata | [`Felles/testmiljo.md`]({{< ref "testmiljo.md" >}}) | – |
| Endepunkter, request/response-skjemaer, feltbeskrivelser, statuskoder | OpenAPI/Swagger | – |
| Fiks IO-mekanikk: ASiC-E, ende-til-ende-kryptering, TTL, standardmeldinger | [`fiksio.md`]({{< ref "fiksio.md" >}}) | – |
| Fiks Protokoll-oppsett: system, konto, tilganger | [`fiksprotokoll/_index.md`]({{< ref "fiksprotokoll/_index.md" >}}) | – |

### Hva hører hjemme på en tjenesteside?

Kun det som er *spesifikt* for tjenesten:

- Hva tjenesten gjør og hvem den er for
- Domeneobjekter, statuser og begreper unike for tjenesten
- Funksjonell flyt og roller
- Forretningsregler som ikke kan uttrykkes i OpenAPI (rekkefølge, statusoverganger, idempotens, kryss-felt-validering)
- Tjenestespesifikke begrensninger (filstørrelser, batch-grenser, rate limits)
- Tjenestens base-sti under fellesmiljøene
- Tjenestespesifikke testdata
- Lenker til API-spec, JSON-skjemaer og Swagger
- Tjenestespesifikke `errorCode`-verdier (kun de som ikke står i OpenAPI)
- Lenke til offisielt klientbibliotek, men bare hvis tjenesten faktisk har et

## Beste praksis

1. **Fellesinformasjon vedlikeholdes ett sted.** Bruk tabellen over – lenk til ankrene i `Felles/`-sidene fremfor å gjenta innholdet.
2. **Ikke dupliser API-spec'en.** Endepunkter, request-/response-skjemaer, feltbeskrivelser og statuskoder skal vedlikeholdes i OpenAPI – lenk til Swagger.
3. **Start med "Kort beskrivelse"** – maks 4 setninger som forklarer *hva* tjenesten gjør og *hvem* den er for. En integrator skal kunne avgjøre relevans på under et minutt.
4. **Lenk til API-spec tidlig** – sett Swagger-lenken nær toppen av siden. Bruk en `Web portal / Maskin til maskin`-tabell *kun* hvis hver rad bærer unik informasjon (f.eks. innbygger-URL eller meldingsprotokoll-navn). Ellers er en enkel lenke til API-spec mer ærlig enn en tabell der "Maskin til maskin: Ja" er tautologi.
5. **Skill brukerveiledning og integrasjonsutvikling** – ikke bland forvaltningsskjermbilder med integrasjonsdetaljer.
6. **Eksempler skal være kjørbare og minimale** – generelt cURL-eksempel ligger i [`integrasjoner.md`]({{< ref "integrasjoner.md" >}}#eksempel-autentisert-kall). Tjenestesiden skal kun ha eksempler som viser noe *tjenestespesifikt* (f.eks. multipart-opplasting, signering, kryptering).
7. **Bruk Hugo-shortcodes for interne lenker**: `{{</* ref "fil.md" */>}}` slik at lenker overlever flytting av sider.
8. **Datoer og aliaser i front matter** – sett `date` til siste større oppdatering og inkluder gamle URL-er som `aliases:` slik at eksisterende lenker fortsatt fungerer.
9. **Versjonering** – ved breaking changes skal v1 og v2 dokumenteres separat (se mønster i `bekymringsmelding/`).
10. **Tagline øverst** – én setning som oppsummerer tjenesten og kan stå alene i menyer og lenkepreviews. Hjelper skanning kraftig.
11. **Vær eksplisitt om hva tjenesten *ikke* er for** – en kort "Når passer ikke denne tjenesten?"-blokk forhindrer feilbruk og overflødig support. Stripe og AWS bruker dette mønsteret konsekvent.
12. **Hold endringslogg for tjenester i aktiv utvikling** – integratorer trenger å vite hva som har endret seg, særlig ikke-brytende endringer som ikke utløser ny major-versjon.
13. **Hver side skal ha en synlig "Få hjelp"-boks** – e-post og Slack-kanal. Bedre én sentral support-kanal enn ingen lenke i det hele tatt.

## Fjern det du ikke trenger

Malen dekker mange typer tjenester. Slett seksjoner som ikke gjelder din tjeneste – det er bedre med kort, korrekt dokumentasjon enn lange seksjoner med plassholdertekst.



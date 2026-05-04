---
title: Fiks kjøretøyregister
date: 2019-12-11
aliases: [/fiks-platform/tjenester/kjoretoyregister, /fiks-plattform/tjenester/kjoretoyregister]
---

## Kort beskrivelse

**Oppslag i Statens Vegvesens kjøretøyregister via Fiks-plattformen.**

Fiks Kjøretøyregister speiler [Kjøretøyoppslag](https://autosys-kjoretoy-api.atlas.vegvesen.no/api-ui/index-kjoretoyoppslag.html) og [Kjøretøysøk](https://autosys-kjoretoy-api.atlas.vegvesen.no/api-ui/index-kjoretoysok.html) fra Statens Vegvesen (Autosys) på Fiks-plattformen. Tjenesten lar kommunale fagsystemer slå opp kjøretøy og eierforhold uten egen avtale med SVV.

Tjenesten tilbyr:

- Oppslag på kjennemerke, kuid (SVV-identifikator) eller understellsnummer
- Eierforhold på nåværende eller historisk tidspunkt
- Kjøretøysøk på eiernavn

### Når passer ikke denne tjenesten?

- Trenger du sanntids-strøm av endringer i kjøretøyregisteret – bruk SVVs egne event-API-er direkte.
- Trenger du tilgang uten Fiks-organisasjon – bruk SVVs åpne API-er der det er tilgjengelig.

API-spesifikasjon: [Swagger / OpenAPI (SVV)](https://autosys-kjoretoy-api.atlas.vegvesen.no/swagger-ui/index-akf.html)

## Kom i gang

Tjenestespesifikke forutsetninger:

1. Tjenesten må aktiveres via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
2. Integrasjonen må gis tilgang til tjenesten via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).

Fiks Kjøretøyregister er en ren maskin-til-maskin-tjeneste. Det finnes per i dag ikke noe administrativt grensesnitt for kommuneansatte.

## Beskrivelse av tjenesten

### Konsepter og begreper

| Begrep | Beskrivelse |
|--------|-------------|
| `kjennemerke` | Registreringsnummer (f.eks. "BR12345") |
| `kuid` | SVV sin unike identifikator for et kjøretøy |
| `understellsnummer` | Chassisnummer / VIN |
| `fiksOrgId` | UUID for Fiks-organisasjonen spørringen gjøres på vegne av |

### Overordnet flyt

1. Fagsystem autentiserer seg mot Fiks-plattformen (Maskinporten + IntegrasjonId/Passord).
2. Fagsystem sender oppslag/søk til Fiks Kjøretøyregister med `fiksOrgId` i URL-stien.
3. Fiks Kjøretøyregister videresender forespørselen til SVV Autosys.
4. Svar fra SVV returneres til fagsystem.

### Tjenestespesifikke regler

- API-kall følger [SVVs Swagger-spesifikasjon](https://autosys-kjoretoy-api.atlas.vegvesen.no/swagger-ui/index-akf.html) med følgende avvik:
  - Autorisering skjer via Fiks-plattformen (ikke direkte mot SVV). Se [Felles/integrasjoner]({{< ref "integrasjoner.md" >}}).
  - `fiksOrgId` blir en del av URL-stien for alle forespørsler.

- **Base-URL prod:** `https://api.fiks.ks.no/kjoretoyregister/api/{fiksOrgId}`
- **Base-URL test:** `https://api.fiks.test.ks.no/kjoretoyregister/api/{fiksOrgId}`

Endepunkter relativt til base-URL:

| Metode | Sti | Beskrivelse |
|--------|-----|-------------|
| POST | `/rest/distribusjon/kjoretoy/v2.0/bulk/kjennemerke` | Oppslag på kjennemerke(r) |
| POST | `/rest/distribusjon/kjoretoy/v2.0/bulk/kuid` | Oppslag på kuid(er) |
| GET  | `/rest/distribusjon/kjoretoy/v2.0/bulk/understellsnummer/{understellsnummer}` | Oppslag på understellsnummer |
| GET  | `/rest/distribusjon/kjoretoy/v2.0/sok/eiernavn?navn={navn}` | Søk på eiernavn |

**Eksempel: oppslag på kjennemerke med historisk dato:**

```json
[
  {
    "kjennemerke": "BR12345",
    "dtg": "2018-11-15T23:00:00.000+01:00"
  }
]
```

### Testdata

I testmiljøet rutes alle kall mot SVVs [syntetiske testdatasett](https://autosys-kjoretoy-api.atlas.vegvesen.no/api-ui/index-kjoretoyoppslag.html#testmiljo).

---

## API-referanse

Endepunkter, request/response-skjemaer og statuskoder er dokumentert i SVVs Swagger:

[Api-spec (SVV Autosys)](https://autosys-kjoretoy-api.atlas.vegvesen.no/swagger-ui/index-akf.html)

Fiks-spesifikke avvik fra SVVs spec:
- Alle URL-er prefixes med `https://api.fiks.ks.no/kjoretoyregister/api/{fiksOrgId}`
- Autentisering skjer mot Fiks, ikke mot SVV

---

## Relaterte tjenester

- [Fiks Register – Folkeregisteret]({{< ref "folkeregister.md" >}}) – kan brukes for å slå opp eier basert på fødselsnummer

---

## Få hjelp

- Tekniske spørsmål og feilmeldinger: `fiks-utvikling@ksdigital.no`
- Feil returnert med `svvguid` i JSON: kontakt `api-kjoretoy@vegvesen.no` direkte
- Generelle henvendelser: `fiks@ksdigital.no`


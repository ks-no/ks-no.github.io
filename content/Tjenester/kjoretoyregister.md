---
title: Fiks Kjøretøyregister
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

API-spesifikasjon: [Swagger / OpenAPI (SVV)](https://autosys-kjoretoy-api.atlas.vegvesen.no/swagger-ui/index-akf.html)

## Kom i gang

Tjenestespesifikke forutsetninger:

1. Tjenesten må aktiveres via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).
2. Integrasjonen må gis tilgang til tjenesten via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).

Fiks Kjøretøyregister er en ren maskin-til-maskin-tjeneste. Det finnes per i dag ikke noe administrativt grensesnitt for kommuneansatte. På sikt vil det bli vurdert å utvikle et administrativt grensesnitt for kommuneansatte.

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

API-kall følger [SVVs Swagger-spesifikasjon](https://autosys-kjoretoy-api.atlas.vegvesen.no/swagger-ui/index-akf.html) med følgende avvik:

- Autorisering skjer via Fiks-plattformen (ikke direkte mot SVV) med et access token fra Maskinporten basert på organisasjonens virksomhetssertifikat. Token må ha scope `ks:fiks`, og headere for `IntegrasjonId` og `IntegrasjonPassord` må settes på requesten. Se [Felles/integrasjoner]({{% ref "integrasjoner.md" %}}) for detaljer.
- `fiksOrgId` blir en del av URL-stien for alle forespørsler.

### Testdata

I testmiljøet rutes alle kall mot SVVs [syntetiske testdatasett](https://autosys-kjoretoy-api.atlas.vegvesen.no/api-ui/index-kjoretoyoppslag.html#testmiljo).

---

## API-referanse

Endepunkter, request/response-skjemaer og statuskoder er dokumentert i SVVs Swagger:

[Api-spec (SVV Autosys)](https://autosys-kjoretoy-api.atlas.vegvesen.no/swagger-ui/index-akf.html)

### Miljøer og endepunkter

**Base-URL per miljø:**
- **Test:** `https://api.fiks.test.ks.no/kjoretoyregister/api/{fiksOrgId}`
- **Produksjon:** `https://api.fiks.ks.no/kjoretoyregister/api/{fiksOrgId}`

Hvor `{fiksOrgId}` er ID-en til Fiks-organisasjonen spørringen gjøres på vegne av.

### Endepunkter

Endepunkter relativt til base-URL:

| Metode | Sti | Beskrivelse |
|--------|-----|-------------|
| `POST` | `/rest/distribusjon/kjoretoy/v2.0/bulk/kjennemerke` | Oppslag på kjennemerke(r). Body inneholder en liste av kjennemerker. |
| `POST` | `/rest/distribusjon/kjoretoy/v2.0/bulk/kuid` | Oppslag på kuid(er). Body inneholder en liste av kuider. |
| `GET`  | `/rest/distribusjon/kjoretoy/v2.0/bulk/understellsnummer/{understellsnummer}` | Oppslag på understellsnummer |
| `GET`  | `/rest/distribusjon/kjoretoy/v2.0/sok/eiernavn?navn={navn}` | Søk på eiernavn |

**Eksempel: oppslag på kjennemerke med historisk dato:**

```json
[
  {
    "kjennemerke": "BR12345",
    "dtg": "2018-11-15T23:00:00.000+01:00"
  }
]
```

---

## Få hjelp

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

*Feil returnert med `svvguid` i JSON fra SVV: kontakt `api-kjoretoy@vegvesen.no` direkte.*

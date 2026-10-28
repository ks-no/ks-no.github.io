---
title: KS Besøksbidrag
date: 2026-10-28
aliases: [/tjenester/besoksbidrag]
---

## Kort beskrivelse

**Rapportering av besøksbidrag for overnattingstilbydere og mellomledd.**

KS Besøksbidrag er en nasjonal tjeneste som hjelper kommuner med å administrere besøksbidraget som er innført gjennom besøksbidragsloven. Denne siden er for deg som er overnattingstilbyder, bookingplattform eller annet mellomledd, og for leverandører som lager systemer for dem. Her finner du hvordan du finner ut hvilke kommuner og perioder som har besøksbidrag, og hvordan du rapporterer omsetning.

Tjenesten tilbyr:

- Åpent kommuneregister (Register-API) over kommuner som har besøksbidrag, og i hvilke perioder
- Rapportering av omsetning fra overnatting via Altinn-skjema (kommer)
- Rapportering via API for automatisert innsending fra egne systemer (kommer)

> **Status:** Foreløpig er kun Register-API-et tilgjengelig. API-et kan endres frem til 1. desember. Skjema for rapportering publiseres via Altinn senere, og denne siden oppdateres når det er klart.

### Hvem er dette for?

- **Overnattingstilbydere:** hoteller, campingplasser, hytteutleiere og private utleiere som skal rapportere omsetning som er omfattet av besøksbidrag som ønsker å bruke apiene.
- **Mellomledd:** bookingplattformer og andre som rapporterer på vegne av overnattingstilbydere som ønsker å bruke apiene.
- **Systemleverandører:** leverandører av booking-, PMS- og regnskapssystemer som skal støtte automatisk rapportering via apiene.

### Tilgjengelige grensesnitt

| Grensesnitt | Status | Detaljer |
|-------------|--------|----------|
| Register-API | ✅ Tilgjengelig. Kan endres frem til 1. desember | [Swagger / OpenAPI](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/besoksbidrag-register-api-v1.json) |
| Rapportering via Altinn (skjema) | 🚧 Kommer | Skjema publiseres via Altinn |
| Rapportering via API | 🚧 Kommer | Ikke publisert |

## Kom i gang

1. Bruk Register-API-et for å finne ut hvilke kommuner som har besøksbidrag, og hvilke perioder som gjelder. Du kan kalle det direkte.
2. Rapportering: skjema og eventuelt rapporterings-API er ikke publisert ennå. Se [API-referanse](#api-referanse) for status.

Register-API-et er åpent. Det krever ingen autentisering, integrasjon eller aktivering i [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester). Kommende rapporterings-API vil sannsynligvis kreve tilgang. Se [Integrasjoner]({{% ref "integrasjoner.md" %}}) for generell veiledning om autentisering på Fiks-plattformen, men vent med å bygge på dette til kravene er publisert.

## Beskrivelse av tjenesten

### Konsepter og begreper

| Begrep | Beskrivelse |
|--------|-------------|
| Besøksbidrag | Bidrag kommuner kan kreve inn for overnattinger, hjemlet i besøksbidragsloven |
| Periode | Tidsrom (start- og sluttdato, begge inkludert) der kommunen krever inn besøksbidrag. Kan gå over årsskiftet |
| Forskriftsdato | Datoen kommunens forskrift om besøksbidrag trer i kraft. Kan avvike fra periodene det faktisk kreves inn bidrag |
| Omsetning | Omsetning fra overnatting som du rapporterer, og som kommunen beregner besøksbidrag av |
| Mellomledd | Bookingplattformer og andre som rapporterer på vegne av overnattingstilbydere |

### Overordnet flyt

1. Slå opp i Register-API-et hvilke kommuner som har besøksbidrag, og i hvilke perioder.
2. Rapporter omsetning for overnattinger i kommuner og perioder som er omfattet, manuelt via Altinn eller automatisk via API (kommer).
3. KS Besøksbidrag validerer dataene og beregner fakturagrunnlag for kommunen.
4. Kommunen fakturerer og følger opp i sitt eget økonomisystem.

### Tjenestespesifikke regler

- Registeret inneholder kommuner med minst én konfigurert periode.
- Listen er sortert på kommunenummer. Kommuner uten kommunenummer ligger sist, sortert på navn.
- Gjentakende perioder vises for inneværende kalenderår og de ni neste årene.
- Svaret caches og kan være opptil 10 minutter gammelt. Ikke bruk registeret til å hente oppdateringer oftere enn nødvendig.
- `regulationEffectiveDate` kan være `null` hvis verdien ikke er satt av kommunen.
- Rapporteringsregler (hva som skal rapporteres, frister og format) publiseres på [Min kommune](https://min.kommune.no/besoksbidrag) når det er klart.

## API-referanse

### Register-API

[Api-spec for KS Besøksbidrag Register](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/besoksbidrag-register-api-v1.json)

**Base-URL per miljø:**

- **Test:** `https://api.test.fiks.ks.no/besoksbidrag-register/api/v1`
- **Produksjon:** `https://api.fiks.ks.no/besoksbidrag-register/api/v1`

Eksempel:

```
curl https://api.fiks.ks.no/besoksbidrag-register/api/v1/municipalities
```

```json
{
  "municipalities": [
    {
      "organizationNumber": "958935420",
      "municipalityNumber": "0301",
      "municipalityName": "Oslo kommune",
      "regulationEffectiveDate": "2026-07-01",
      "periods": [
        { "startDate": "2027-04-15", "endDate": "2027-09-15" }
      ]
    }
  ]
}
```

### Rapporterings-API og skjema

Ikke publisert ennå. Skjema kommer via Altinn, og API-spesifikasjon for automatisert rapportering lenkes her når den er klar.

---

## Tjenestespesifikke feilkoder

Feil returneres på [standard feilformat]({{% ref "integrasjoner.md" %}}#feilmeldinger). Register-API-et kan returnere:

| Status | Beskrivelse |
|--------|-------------|
| 500 | Intern feil |
| 503 | Tjenesten er midlertidig utilgjengelig. Prøv igjen senere |

---

## Versjonering

| Versjon | Status | Utfasingsdato | Hva er nytt |
|---------|--------|---------------|-------------|
| [v1](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/besoksbidrag-register-api-v1.json) | ✅ Gjeldende | – | Første versjon av Register-API |

---

## Relaterte tjenester

- [Fiks register]({{% ref "register/_index.md" %}}) – øvrige registertjenester på Fiks-plattformen

---

## Få hjelp

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

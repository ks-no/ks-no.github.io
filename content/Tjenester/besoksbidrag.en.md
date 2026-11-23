---
title: KS Besøksbidrag
date: 2026-10-28
---

## Short description

**Technical documentation for KS Besøksbidrag**

KS Besøksbidrag is a national service that supports municipalities in administering the visitor levy for accommodation. The accommodation levy is regulated by the [Visitor Levy Act (besøksbidragsloven)](https://lovdata.no/dokument/NL/lov/2025-06-20-104) and the [Regulations on the accommodation levy (forskriften om overnattingsavgift)](https://lovdata.no/dokument/SF/forskrift/2026-05-22-895).

The service offers:

- An open municipality register (Register API) of municipalities with visitor levy, and the periods in which it applies
- Reporting of accommodation turnover through an Altinn form (coming)
- Reporting through an API for automated submission from your own systems (coming)

> **Status:** Currently only the Register API is available. The API may change until 1 December. The reporting schema will be published through Altinn later, and this page will be updated when it is ready.

### Who is this for?

- **Municipalities:** technical staff and vendors who need to understand how KS Besøksbidrag works and assess integrations with the municipality's systems.
- **Accommodation providers:** businesses that will report turnover and want to use the APIs.
- **Intermediaries:** booking platforms and others who report on behalf of accommodation providers and want to use the APIs.
- **System vendors:** vendors of booking, PMS and accounting systems that will support reporting and integrations via the APIs.

### Available interfaces

| Interface | Status | Details |
|-----------|--------|---------|
| Register API | ✅ Available. May change until 1 December | [Swagger / OpenAPI](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/besoksbidrag-register-api-v1.json) |
| Reporting via Altinn (form) | 🚧 Coming | Schema will be published through Altinn |
| Reporting via API | 🚧 Coming | Not published |

## Getting started

1. Use the Register API to find out which municipalities have visitor levy, and which periods apply. You can call it directly.
2. Reporting: the form and any reporting API are not yet published. See [API reference](#api-reference) for status.

The Register API is open. It requires no authentication, integration or activation.

## Description of the service

### Concepts and terms

| Term | Description |
|------|-------------|
| Visitor levy (besøksbidrag) | A levy municipalities may collect for overnight stays, based on the [Besøksbidragsloven](https://lovdata.no/lov/2025-06-20-104) |
| Period | Time span (start and end date, both inclusive) in which the municipality collects the levy. May cross new year |
| Regulation effective date | The date the municipality's visitor levy regulation (forskrift) takes effect. May differ from the periods in which the levy is actually collected |
| Turnover | Accommodation turnover you report, and from which the municipality calculates the levy |
| Intermediary | Booking platforms and others who report on behalf of accommodation providers |

### Overall flow

1. Look up in the Register API which municipalities have visitor levy, and in which periods.
2. Report turnover for stays in covered municipalities and periods, manually through Altinn or automatically through the API (coming).
3. KS Besøksbidrag validates the data and calculates the invoice basis for the municipality.
4. The municipality invoices and follows up in its own finance system.

### Service-specific rules

- The register contains municipalities with at least one configured period.
- Recurring periods are shown for the current calendar year and the following nine years.
- The response is cached and may be up to 10 minutes old. Do not poll more often than necessary.
- `regulationEffectiveDate` may be `null` if the value has not been set by the municipality.
- Reporting rules (what to report, deadlines and format) will be published on [Min kommune](https://min.kommune.no/besoksbidrag) when ready.

## API reference

### Register API

[API spec for KS Besøksbidrag Register](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/besoksbidrag-register-api-v1.json)

**Base URL per environment:**

- **Test:** `https://api.test.fiks.ks.no/besoksbidrag-register/api/v1`
- **Production:** `https://api.fiks.ks.no/besoksbidrag-register/api/v1`

Example:

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

### Reporting API and schema

Not published yet. The schema will come through Altinn, and the API specification for automated reporting will be linked here when ready.

---

## Service-specific errors

Errors are returned in the [standard error format](/felles/integrasjoner/#feilmeldinger) (Norwegian). The Register API may return:

| Status | Description |
|--------|-------------|
| 500 | Internal error |
| 503 | Service temporarily unavailable. Try again later |

---

## Versioning

| Version | Status | Deprecation date | What's new |
|---------|--------|------------------|------------|
| [v1](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/besoksbidrag-register-api-v1.json) | ✅ Current | – | First version of the Register API |

---

{{< get-help email="fiks@ksdigital.no" support_page="/en/felles/support/" >}}

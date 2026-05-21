---
title: Tilgangsstyring
date: 2026-05-20
weight: 30
---

**Hvordan gi og be om tilgang til å sende meldinger mellom systemer i Fiks Protokoll.**

Tilganger til Fiks Protokoll-systemer styres per konto. En konto kan gi et annet system tilgang til å sende meldinger til seg.

Når et system opprettes vil det kun være synlig for kontoer under egen organisasjon. Skal systemet være synlig for kontoer i andre organisasjoner, må *Tilgjengelig for andre organisasjoner* slås på (per nå kun mulig via API).

Tilgangsstyring kan gjøres både i Fiks Forvaltning og via API. Skal du gjøre det via API, finner du autentisering og generell arbeidsflyt under [Konfigurere systemet via API]({{% ref "konfigurasjon-api.md" %}}) — denne siden viser de tilgangsspesifikke kallene.

## Gi tilgang til system

**Forvaltning:** Velg konto under system. Velg *Søk etter systemer*. Når ønsket system er funnet, velg *Gi tilgang*.

**API:**
```
POST /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}/kontoer/{kontoId}/tilganger/{eksternSystemId}
```

- `fiksOrgId` – Fiks organisasjons-ID
- `systemId` – System-ID som eier konto `kontoId`
- `kontoId` – Konto som system `eksternSystemId` skal få tilgang til
- `eksternSystemId` – System-ID som skal gis tilgang til konto `kontoId`

For å fjerne tilgang:
```
DELETE /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}/kontoer/{kontoId}/tilganger/{eksternSystemId}
```

[OpenAPI Specification (Fiks Protokoll API)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json)

## Be om tilgang til system

Det er mulig å sende en forespørsel om tilgang til en konto via API. Dette er ikke ferdig implementert i Fiks Forvaltning.

```
POST {fiksOrgId}/systemer/{systemId}/forespurteTilganger/{eksternKonto}
```

- `fiksOrgId` – Fiks organisasjons-ID
- `systemId` – System-ID som forespør tilgang
- `eksternKonto` – Konto en ønsker tilgang til

For å fjerne forespørsel:
```
DELETE {fiksOrgId}/systemer/{systemId}/forespurteTilganger/{eksternKonto}
```

[OpenAPI Specification (Fiks Protokoll API)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json)

Merk: Søk etter systemer er ikke implementert ennå, så det kan være vanskelig å finne systemer å be om tilgang til.

## Kontoer et system kan sende meldinger til

APIet støtter å hente hvilke kontoer et system kan sende meldinger til. Kun kontoer som er parter fra samme protokoll (samme navn og versjon), og som er støttet part (er i listen `stottedeParter` hos mottaker), kan utveksle meldinger. Dersom et system ikke har en konto som er støttet part, må en slik konto opprettes før meldinger kan sendes.

```
GET /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}
```

I responsen vil `tilgangTilKontoer` inneholde listen over kontoer (`EksternProtokollKontoResponse`) som systemet kan sende meldinger til.

[OpenAPI Specification (Fiks Protokoll API)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json)

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

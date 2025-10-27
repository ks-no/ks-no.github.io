---
title: Fiks Send SMS
date: 2023-01-06
---

## Kort beskrivelse
Fiks Send SMS er en felleskomponent som brukes i flere av Fiks tjenestene. En typisk oppgave for Fiks Send SMS er utsendelse av tekstmelding til innbyggere i kommunen som har til formål å få innbygger til å utføre en handling. Dette kan være alt fra informasjon til innbyggere, til å varsle om flom eller nedetid for vanntjenester.

## Bruk av Fiks SMS
Swagger-dokumentasjon: https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/varsling-sms-api-v2.json

For å sende enkel SMS: `POST /varsling/api/v2/sms/{kontoId}/send`

```json
{
  "tekst": "string",
  "fnr": "08956609002",
  "telefonnummer": "string"
}
```

For å sende batch SMS på opptil 1000 mottakere: `POST /varsling/api/v2/sms/{kontoId}/sendBatch`

```json
{
  "telefonnummere": [
    "string"
  ],
  "tekst": "string"
}
```

For å gjøre oppslag i Kontakt- og reservasjonsregisteret på opp til 1000 fødselsnummer: `POST /varsling/api/v2/sms/{kontoId}/oppslag`

```json 
[
  {
    "fnrOrgnr": "string",
    "telefonnummer": "string",
    "telefonnummerStatus": "GYLDIG"
  }
]
```













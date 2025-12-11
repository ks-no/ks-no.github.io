---
title: Fiks Send SMS
date: 2023-01-06
---

## Kort beskrivelse
Fiks Send SMS er en felleskomponent som brukes i flere av Fiks tjenestene. En typisk oppgave for Fiks Send SMS er utsendelse av tekstmelding til innbyggere i kommunen som har til formål å få innbygger til å utføre en handling. Dette kan være alt fra informasjon til innbyggere, til å varsle om flom eller nedetid for vanntjenester.

## Bruk av Fiks SMS
Swagger-dokumentasjon: https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/varsling-sms-api-v2.json

**Viktig angående meldingstekst for SMS**:
- SMS benytter GSM-7 encoding som standard. Dersom alle tegn kan encodes som GSM-7 vil maksimalt antall tegn per SMS være 160 ved én SMS, eller 153 dersom melding må deles opp i flere SMS. Dette grunnet en header som legges på for å knytte meldingene sammen.
- Enkelte tegn er en del av en "utvidet" GSM-7 encoding og vil derfor bruke to tegn i SMS-meldingen. Dette gjelder: ^, {, }, \, [, ], ~, |, €
- Dersom det finnes tegn som ikke er GSM-7 vil hele meldingen encodes som unicode (UCS-2). Maksimalt antall tegn reduseres til 70 ved én SMS, eller 67 dersom den må deles opp i flere.
- Unicode karakterer kan bruke flere tegn i SMS-meldingen. For eksempel vil emojis typisk bruke to eller flere tegn.
- Det kan være lurt å informere brukerene som skriver meldingsteksten om at dette, spesielt ved masseutsendelser, kan gjøre at små forskjeller i tekst fører til store kostnader, for eksempel om man bruker « » som anførselstegn i stedet for " ". 

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













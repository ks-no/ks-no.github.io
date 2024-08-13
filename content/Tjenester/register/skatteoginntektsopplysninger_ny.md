---
title: Skatte- og inntektsopplysninger (Ny)
date: 2024-08-13
aliases: [/fiks-plattform/tjenester/fiksregister/skatteoginntektsopplysninger_ny/, /fiks-plattform/tjenester/fiksregister/skatteoginntekstopplysninger_ny]
---

### Kort beskrivelse
Fiks register tilbyr skatte- og inntektsopplysninger for kommunalt ansatte via et web-basert grensesnitt for innbyggere som søker om kommunale tjenester. Dette grensesnittet er også tilgjengelig som API for kommunene sine fagsystem. API-grensesnittet er ikke ferdig utviklet og endringer kan fortsatt forekomme.

## Tilgjengelige grensesnitt
| Grensesnitt       | Støtte                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Web portal        | Ja                                                                                                                          |
| Maskin til maskin | [Api spec](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/register-skatteoginntektsopplysninger-beregning-api-v1.json) |


## Beskrivelse av tjenesten
| Innbyggertjeneste                         | Gyldige tjenesteområde for rollen            | Beregningstype              |
| ----------------------------------------- | -------------------------------------------- | --------------------------- |
| Redusert foreldrebetaling SFO/barnehage   | Foreldrebetaling SFO/barnehage               | BARNEHAGE_SFO               |
| Praktisk bistand og opplæring             | Helse og omsorg: Praktisk bistand            | PRAKTISK_BISTAND            |
| Langtidsopphold institusjon               | Helse og omsorg: Langtidsopphold institusjon | LANGTIDSOPPHOLD_INSTITUSJON |

___For å bruke API-ene, både proxy og vårt overbygg, må rollen som opprettes være i rett tjenesteområde.___

### Miljø

| Miljø              | URL                                |
| ------------------ | ---------------------------------- |
| Test (Integrasjon) | http&#8203;s://api.fiks.test.ks.no |
| Produksjon         | http&#8203;s://api.fiks.ks.no      |

APIene er tilgjengelig via Fiks-plattformen som proxy-tjeneste eller via vårt overbygg. ___Hendelseslister er ikke tilgjengelig via vår løsning pr nå og må hentes fra skatteetatens eget API.___

### Oppslag via overbygg
Vi har laget vårt eget overbygg som gir mulighet for å søke på flere personer. Vi søker om personene har stadie ___OPPGJØR___. Ved redusert foreldrebetaling SFO/barnehage, søkes det også etter ___UTKAST___ dersom de ikke har ___OPPGJØR___. Datamodellen er en sammenstilling av det som kommer fra skatteetaten sine APIer og har summert alle poster som hører sammen. For hver tjeneste finnes det en beregningstype som må sendes inn som en del av payloaden, dette erstatter behovet for å bruke rettighetspakke.

URL for fiks-api (POST): ```<MILJØ_URL>/register/api/v1/ks/{rolleId}/skatteoginntektsopplysninger/beregning``` [Payload, se swagger dokumentasjon](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/register-skatteoginntektsopplysninger-beregning-api-v1.json)

#### API-dokumentasjon
[Swagger dokumentasjon for overbygg finner du her.](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/register-skatteoginntektsopplysninger-beregning-api-v1.json) Bruk også dokumentasjon fra Skatteetaten.


#### Manuelle poster
Det finnes også en del ulike poster som har andre kilder enn Skatteetaten. Disse kan sendes med som en del av requesten, og vil da bli kalkulert sammen med data fra Skatteetaten. For å hente ut hvilke poster som er gyldig kan endepunktet ```<MILJØ_URL>/register/api/v1/ks/{rolleId}/skatteoginntektsopplysninger/verdier``` brukes.

#### Eksempel med bruk av API-overbygg
Payload
```json
    {
  "personer": [
    {
      "identifikator": "10498896321",
      "type": "SOEKER",
      "ekstraposter": [
        {
          "tekniskNavn": "string",
          "visningstekst": "string",
          "beloep": 0
        }
      ]
    }
  ],
  "inntektsaar": 2021,
  "beregningstype": "PRAKTISK_BISTAND"
}
```

Svar
```json
{
  "inntektsaar": 0,
  "stadie": "OPPGJOER",
  "personer": [
    {
      "identifikator": "22119408289",
      "navn": {
        "etternavn": "string",
        "fornavn": "string",
        "mellomnavn": "string"
      },
      "type": "SOEKER",
      "skjermet": true,
      "skatteoppgjoersdato": "2024-08-13",
      "stadie": "OPPGJOER",
      "registreringstidpunkt": "2024-08-13T13:40:20.722Z"
    }
  ],
  "visningsposter": [
    {
      "kategori": "INNTEKT",
      "poster": [
        {
          "personer": [
            {
              "identifikator": "58443237337",
              "beloep": 0
            }
          ],
          "beloep": 0,
          "tekniskNavn": "string",
          "visningstekst": "string",
          "infotekst": "string"
        }
      ]
    }
  ],
  "beregningsbeloep": 0,
  "inntekt": {
    "beloep": 0,
    "beregning": [
      {
        "tekniskNavn": "string",
        "visningstekst": "string",
        "beloep": 0,
        "operasjon": "ADDERE",
        "type": "GRUNNLAG",
        "beregningsgrunnlag": [
          {
            "tekniskNavn": "string",
            "visningstekst": "string",
            "beloep": 0,
            "operasjon": "ADDERE",
            "beregningsposter": [
              {
                "tekniskNavn": "string",
                "visningstekst": "string",
                "operasjon": "ADDERE",
                "beloep": 0,
                "kilde": "SKATTEETATEN",
                "kanEndreVisningstekst": true,
                "identifikator": "39813924484",
                "infotekst": "string",
                "eksempeltekst": "string"
              }
            ]
          }
        ],
        "beregningsposter": [
          {
            "tekniskNavn": "string",
            "visningstekst": "string",
            "operasjon": "ADDERE",
            "beloep": 0,
            "kilde": "SKATTEETATEN",
            "kanEndreVisningstekst": true,
            "identifikator": "76735691715",
            "infotekst": "string",
            "eksempeltekst": "string"
          }
        ]
      }
    ]
  },
  "fradrag": {
    "beloep": 0,
    "beregning": [
      {
        "tekniskNavn": "string",
        "visningstekst": "string",
        "beloep": 0,
        "operasjon": "ADDERE",
        "type": "GRUNNLAG",
        "beregningsgrunnlag": [
          {
            "tekniskNavn": "string",
            "visningstekst": "string",
            "beloep": 0,
            "operasjon": "ADDERE",
            "beregningsposter": [
              {
                "tekniskNavn": "string",
                "visningstekst": "string",
                "operasjon": "ADDERE",
                "beloep": 0,
                "kilde": "SKATTEETATEN",
                "kanEndreVisningstekst": true,
                "identifikator": "74764057758",
                "infotekst": "string",
                "eksempeltekst": "string"
              }
            ]
          }
        ],
        "beregningsposter": [
          {
            "tekniskNavn": "string",
            "visningstekst": "string",
            "operasjon": "ADDERE",
            "beloep": 0,
            "kilde": "SKATTEETATEN",
            "kanEndreVisningstekst": true,
            "identifikator": "35224467268",
            "infotekst": "string",
            "eksempeltekst": "string"
          }
        ]
      }
    ]
  },
  "soeketidspunkt": "2024-08-13T13:40:20.722Z",
  "beregningstype": "PRAKTISK_BISTAND",
  "feilmeldinger": [
    {
      "kode": "string",
      "melding": "string"
    }
  ]
}
```
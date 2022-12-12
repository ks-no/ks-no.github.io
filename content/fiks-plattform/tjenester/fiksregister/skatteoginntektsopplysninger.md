---
title: Skatte og inntektsopplysninger
date: 2022-12-02
---

| Innbyggertjeneste                         | Gyldige tjenesteområde for rollen | Rettighetspakke            |
| ----------------------------------------- | --------------------------------- | -------------------------- |
| Barnehage SFO - redusert foreldrebetaling | Foreldrebetaling SFO/barnehage    | kommuneforeldrebetaling    |
| Kommunal bolig- og bostøtte               | N/A                               | kommuneboligsosialeformaal |
| Personlig assistanse / praktisk bistand   | N/A                               | kommunepersonligassistanse |
| Sykehjem langtidsopphold                  | N/A                               | N/A                        |

___For å bruke API-ene, både proxy og vårt overbygg, må rollen som opprettes være i rett tjenesteområde. Pr i dag har vi kun støtte for redusert foreldrebetaling barnehage og SFO.___

## Miljø

| Miljø              | URL                                |
| ------------------ | ---------------------------------- |
| Test (Integrasjon) | http&#8203;s://api.fiks.test.ks.no |
| Produksjon         | http&#8203;s://api.fiks.ks.no      |

APIene er tilgjengelig via Fiks-plattformen som proxy-tjeneste eller via vårt overbygg. ___Hendelseslister er ikke tilgjengelig via vår løsning pr nå.___

URL for proxy-api (GET):
```<MILJØ_URL>/skatteetaten/formueinntekt/summertskatt/api/v1/{ROLLE_ID}/{STADIE}/{RETTIGHETSPAKKE}/{INNTEKTSAAR}/{PERSONIDENTIFIKATOR}```

URL for fiks-api (POST):
```<MILJØ_URL>/register/api/v1/{ROLLE_ID}/summertskattegrunnlag``` Payload ```{"personidentifikatorer":["{PERSONIDENTIFIKATOR}"],"inntektsaar":"{INNTEKTSAAR}"}```

## API-dokumentasjon
Skatteetaten har lagt ut dokumentasjon her [Summert skattegrunnlag](https://skatteetaten.github.io/datasamarbeid-api-dokumentasjon/reference_summertskattegrunnlag.html) og [Swagger](https://app.swaggerhub.com/apis/Skatteetaten_Deling/summert-skattegrunnlag-api)

Vårt overbygg har [swagger dokumentasjon her](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/register-api-v1.json)

## Eksempel med bruk av proxy

```json
{
  "personidentifikator": "03870349520",
  "inntektsaar": "2021",
  "skjermet": false,
  "grunnlag": [
    {
      "tekniskNavn": "samledeOpptjenteRenterIInnenlandskeBanker",
      "beloep": 19015,
      "kategori": ["inntekt"]
    },
    {
      "tekniskNavn": "samletPensjonFraFolketrygden",
      "beloep": 894828,
      "kategori": ["inntekt"]
    },
    {
      "tekniskNavn": "samletAvkastningAvKapitalforsikringsavtale",
      "beloep": 286299,
      "kategori": ["inntekt"]
    }
  ],
  "skatteoppgjoersdato": "2022-02-10",
  "stadie": "oppgjoer",
  "registreringstidpunkt": "2022-02-10T15:17:37Z"
}
```

## Eksempel med bruk av Fiks-utvidelse

```json
{
  "totaltSummertGrunnlag": 1200142,
  "tidspunkt": "2022-12-02T08:06:14.799283611Z",
  "inntektsaar": 2021,
  "stadie": "OPPGJOER",
  "summertSkattegrunnlagPersoner": [
    {
      "personidentifikator": "03870349520",
      "personnavn": {
        "etternavn": "EKSAMEN",
        "fornavn": "VISSEN",
        "mellomnavn": null
      },
      "inntektsaar": 2021,
      "skjermet": false,
      "grunnlag": [
        {
          "tekniskNavn": "samledeOpptjenteRenterIInnenlandskeBanker",
          "beloep": 19015,
          "kategori": ["inntekt"],
          "visningstekst": "Renter av bankinnskudd"
        },
        {
          "tekniskNavn": "samletPensjonFraFolketrygden",
          "beloep": 894828,
          "kategori": ["inntekt"],
          "visningstekst": "Alderspensjon fra folketrygden"
        },
        {
          "tekniskNavn": "samletAvkastningAvKapitalforsikringsavtale",
          "beloep": 286299,
          "kategori": ["inntekt"],
          "visningstekst": "Avkastning/gevinst av kapitalforsikring"
        }
      ],
      "summertGrunnlag": 1200142,
      "skatteoppgjoersdato": "2022-02-10",
      "svalbardGrunnlag": [],
      "summertSvalbardGrunnlag": 0,
      "kildeskattPaaLoennGrunnlag": [],
      "summertKildeskattPaaLoennGrunnlag": 0,
      "stadie": "OPPGJOER",
      "registreringstidpunkt": "2022-02-10T15:17:37Z",
      "totaltSummertGrunnlagPerson": 1200142
    }
  ]
}
```

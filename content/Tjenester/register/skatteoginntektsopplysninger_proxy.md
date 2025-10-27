---
title: Skatte- og inntektsopplysninger proxy
date: 2022-12-02
aliases: [/fiks-plattform/tjenester/fiksregister/skatteoginntektsopplysninger/proxy, /fiks-plattform/tjenester/fiksregister/skatteoginntekstopplysninger/proxy]
---

### Oppslag via proxy
Det er mulig å bruke Skatteetatens delingstjeneste for skatte og inntektsopplysninger som en proxy-tjeneste i Fiks register og samtidig benytte seg av roller, rettighetsstyring og dataminimering som Fiks register tilbyr. Oppbygging av URL gjøres så likt som mulig Skatteetatens egen URL. Datamodellen forblir uendret.


#### Summert skattegrunnlag
URL for proxy-api (GET):
```<MILJØ_URL>/skatteetaten/formueinntekt/summertskatt/api/v2/{ROLLE_ID}/{STADIE}/{RETTIGHETSPAKKE}/{INNTEKTSAAR}/{PERSONIDENTIFIKATOR}```

##### API-dokumentasjon
Skatteetaten har lagt ut dokumentasjon her [Summert skattegrunnlag](https://skatteetaten.github.io/api-dokumentasjon/api/summertskattegrunnlag) og [Swagger](https://app.swaggerhub.com/apis/skatteetaten/summert-skattegrunnlag-api/2.0.0)

##### Eksempel

```json
{
  "personidentifikator": "03870349520",
  "inntektsaar": "2021",
  "skjermet": false,
  "grunnlag": [
    {
      "tekniskNavn": "samledeOpptjenteRenterIInnenlandskeBanker",
      "beloep": 19015,
      "kategori": "inntekt"
    },
    {
      "tekniskNavn": "samletPensjonFraFolketrygden",
      "beloep": 894828,
      "kategori": "inntekt"
    },
    {
      "tekniskNavn": "samletAvkastningAvKapitalforsikringsavtale",
      "beloep": 286299,
      "kategori": "inntekt"
    }
  ],
  "skatteoppgjoersdato": "2022-02-10",
  "stadie": "oppgjoer",
  "ajourholdstidspunkt": "2022-02-10T15:17:37Z"
}
```

#### Beregnet skatt
URL for proxy-api (GET):
```<MILJØ_URL>/skatteetaten/formueinntekt/beregnetskatt/api/v1/{ROLLE_ID}/{RETTIGHETSPAKKE}/{INNTEKTSAAR}/{PERSONIDENTIFIKATOR}```

##### API-dokumentasjon
Skatteetaten har lagt ut dokumentasjon her [Beregnet skatt](https://skatteetaten.github.io/api-dokumentasjon/api/beregnetskatt) og [Swagger](https://app.swaggerhub.com/apis/skatteetaten/beregnet-skatt-api/2.1.0)

##### Eksempel
```json
  {
  "personidentifikator": "12345678910",
  "inntektsaar": 2022,
  "skjermet": false,
  "beregnetSkattFastland": {
    "skatteklasse": "1",
    "beregnetSkatt": 120148,
    "beregnetSkattFoerSkattefradrag": 120148,
    "skatteregnskapskommune": "3816",
    "anvendtStandardfradrag": false,
    "skattOgAvgift": {
      "formuesskattTilStat": {
        "grunnlag": 5200000,
        "beloep": 8750
      },
      "inntektsskattTilKommune": {
        "kommunefordeltSkatt": [
          {
            "kommune": "3816",
            "grunnlag": 305050,
            "beloep": 27025
          }
        ],
        "grunnlag": 305050,
        "beloep": 27025
      },
      "inntektsskattTilFylkeskommune": {
        "kommunefordeltSkatt": [
          {
            "kommune": "3816",
            "grunnlag": 305050,
            "beloep": 5923
          }
        ],
        "grunnlag": 305050,
        "beloep": 5923
      },
      "inntektsskattTilKommuneOgFylkeskommune": {
        "grunnlag": 305050,
        "beloep": 32948
      },
      "formuesskattTilKommune": {
        "kommunefordeltSkatt": [
          {
            "kommune": "3816",
            "grunnlag": 5200000,
            "beloep": 24500
          }
        ],
        "grunnlag": 5200000,
        "beloep": 24500
      },
      "fellesskatt": {
        "grunnlag": 305050,
        "beloep": 21348
      },
      "trinnskatt": {
        "grunnlag": 350000,
        "beloep": 4602
      },
      "trygdeavgiftAvLoennsinntekt": {
        "grunnlag": 350000,
        "beloep": 28000
      },
      "sumTrygdeavgift": {
        "grunnlag": 350000,
        "beloep": 28000
      }
    },
    "oevrigeResultaterAvBeregning": {
      "alminneligInntektFoerSaerfradrag": 355050,
      "anvendtSaerfradrag": 50000,
      "pensjonsgivendeInntekt": 350000,
      "samletGrunnlagForInntektsskattTilKommuneOgFylkeskommuneStatsskattOgFellesskatt": 305050,
      "alminneligInntektFoerFordelingsfradrag": [
        {
          "beloep": 355050
        }
      ],
      "oevrigFormue": [
        {
          "beloep": 350000
        }
      ]
    },
    "informasjonTilSkattelister": {
      "nettoinntekt": 355050,
      "nettoformue": 5200000,
      "beregnetSkatt": 120148,
      "kommune": [
        "3816"
      ]
    }
  },
  "skatteoppgjoersdato": "2022-09-27",
  "anvendtTolvdelForTrinnskatt": 12,
  "anvendtTolvdelVedArbeidsoppholdINorge": 12
}
```


#### Avregning 
URL for proxy-api (GET):
```<MILJØ_URL>/skatteetaten/formueinntekt/avregning/api/v1/{ROLLE_ID}/{RETTIGHETSPAKKE}/{INNTEKTSAAR}/{PERSONIDENTIFIKATOR}```

##### API-dokumentasjon
Skatteetaten har lagt ut dokumentasjon her [Avregning](https://skatteetaten.github.io/api-dokumentasjon/api/avregning) og [Swagger](https://app.swaggerhub.com/apis/skatteetaten/avregning-api/2.2.0)

##### Eksempel
```json
{
  "personidentifikator": "12345678910",
  "inntektsaar": "2020",
  "skjermet": false,
  "skatteoppgjoersdato": "2021-02-04",
  "fastland": {
    "restskatt": 2300,
    "avregnetForskuddstrekk": 90000,
    "beloepTilgode": 9271429
  },
  "svalbard": {
    "restskatt": 500,
    "avregnetForskuddstrekk": 7000,
    "beloepTilgode": 1529
  }
}
```


#### Skatteoppgjør hendelser
URL-er for proxy-api for skatteoppgjør hendelser (GET):
```<MILJØ_URL>/skatteetaten/hendelser/api/v1/{ROLLE_ID}/hendelser/start?dato=<DATO>```
```<MILJØ_URL>/skatteetaten/hendelser/api/v1/{ROLLE_ID}/hendelser?fraSekvensnummer=<SEKVENSNUMMER>&antall=<ANTALL>```

Query parameterene er optional.

##### API-dokumentasjon
Skatteetaten har lagt ut dokumentasjon her [Hendelser](https://skatteetaten.github.io/api-dokumentasjon/api/hendelser) og [Swagger](https://app.swaggerhub.com/apis/skatteetaten/skatteoppgjor-hendelser-api/1.3.1)

##### Eksempel på response for ```/hendelser/start```
```json
{
  "sekvensnummer": 0
}
```

##### Eksempel på response for ```/hendelser```
```json
{
  "hendelser": [
    {
      "sekvensnummer": 0,
      "identifikator": "string",
      "gjelderPeriode": "string",
      "registreringstidspunkt": "2025-10-27T13:33:59.829Z",
      "hendelsetype": "string",
      "ajourholdstidspunkt": "2025-10-27T13:33:59.829Z"
    }
  ]
}
```

### Oppslag via proxy (gammel)
Det er mulig å bruke Skatteetatens delingstjeneste for skatte og inntektsopplysninger som en proxy-tjeneste i Fiks register og samtidig benytte seg av roller, rettighetsstyring og dataminimering som Fiks register tilbyr. Oppbygging av URL gjøres så likt som mulig Skatteetatens egen URL. Datamodellen forblir uendret.

URL for proxy-api (GET):
```<MILJØ_URL>/skatteetaten/formueinntekt/summertskatt/api/v1/{ROLLE_ID}/{STADIE}/{RETTIGHETSPAKKE}/{INNTEKTSAAR}/{PERSONIDENTIFIKATOR}```

#### API-dokumentasjon
Skatteetaten har lagt ut dokumentasjon her [Summert skattegrunnlag](https://skatteetaten.github.io/api-dokumentasjon/api/summertskattegrunnlag) og [Swagger](https://app.swaggerhub.com/apis/Skatteetaten_Deling/summert-skattegrunnlag-api)

#### Eksempel

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

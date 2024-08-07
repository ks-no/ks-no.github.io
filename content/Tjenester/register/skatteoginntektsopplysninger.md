---
title: Skatte- og inntektsopplysninger
date: 2022-12-02
aliases: [/fiks-plattform/tjenester/fiksregister/skatteoginntektsopplysninger/, /fiks-plattform/tjenester/fiksregister/skatteoginntekstopplysninger]
---

## Kort beskrivelse
Fiks register tilbyr skatte- og inntektsopplysninger for kommunalt ansatte via et web-basert grensesnitt for innbyggere som søker om kommunale tjenester. Dette grensesnittet er også tilgjengelig som API for kommunene sine fagsystem. API-grensesnittet er ikke ferdig utviklet og endringer kan fortsatt forekomme.

## Tilgjengelige grensesnitt
| Grensesnitt       | Støtte                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Web portal        | Ja                                                                                                                          |
| Maskin til maskin | [Api spec v2](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/register-summert-skattegrunnlag-api-v2.json) |


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

URL for fiks-api (POST): ```<MILJØ_URL>/register/api/v2/ks/{rolleId}/summertskattegrunnlag``` [Payload, se swagger dokumentasjon](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/register-summert-skattegrunnlag-api-v2.json) 

#### API-dokumentasjon
[Swagger dokumentasjon for overbygg finner du her.](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/register-summert-skattegrunnlag-api-v2.json) Bruk også dokumentasjon fra Skatteetaten.

#### Manuelle poster

Det finnes også en del ulike poster som har andre kilder enn Skatteetaten. Disse kan sendes med som en del av requesten, og vil da bli kalkulert sammen med data fra Skatteetaten. For å hente ut hvilke poster som er gyldig kan endepunktet ```<MILJØ_URL>/register/api/v2/ks/{rolleId}/summertskattegrunnlag/verdier/{beregningstype}/{inntektsaar}``` brukes. Hvilke poster som er gyldige er avhengig av beregningstype, inntektsår og persontype.

#### Eksempel med bruk av API-overbygg
Payload
```json
{
  "soekere": [
    {
      "personidentifikator": "25851449852",
      "personType": "SOEKER",
      "poster": [
        {
          "tekniskNavn": "nav.hjelpestoenadFraFolketrygden",
          "beloep": "2000"
        },
        {
          "tekniskNavn": "nav.omsorgsloennEtterHelseOgOmsorgstjenesteloven",
          "beloep": "1000"
        },
        {
          "tekniskNavn": "kommune.skjoennsmessigeFradrag",
          "visningsnavn": "Fradrag 1",
          "beloep": "3000"
        }
      ]
    },
    {
      "personidentifikator": "06882949409",
      "personType": "EKTEFELLE"
    }
  ],
  "beregningstype": "PRAKTISK_BISTAND",
  "inntektsaar": 2021
}
```
Svar
```json
{
  "inntektsaar": 2021,
  "stadie": "OPPGJOER",
  "summertSkattegrunnlagPersoner": [
    {
      "personidentifikator": "25851449852",
      "personType": "SOEKER",
      "skjermet": false,
      "stadie": "OPPGJOER",
      "beloep": 93431,
      "grunnlag": [
        {
          "navn": "1",
          "beskrivelse": "Alminnelig inntekt før særfradrag",
          "beloep": 6700,
          "operasjon": "ADDERE",
          "poster": [
            {
              "tekniskNavn": "alminneligInntektFoerSaerfradrag",
              "visningsnavn": "Alminnelig inntekt før særfradrag",
              "beloep": 6700,
              "kilde": "SKATTEETATEN",
              "kanEndreVisningsnavn": false
            }
          ]
        },
        {
          "navn": "3",
          "beskrivelse": "Summerte poster oppjustert av gevinst",
          "beloep": 39199,
          "operasjon": "SUBTRAHERE",
          "poster": [
            {
              "tekniskNavn": "oppjustertTilleggTilGevinstVedRealisasjonAvAksje",
              "visningsnavn": "Oppjustering av gevinst ved salg av aksjer",
              "beloep": 39199,
              "kilde": "SKATTEETATEN",
              "kanEndreVisningsnavn": false
            }
          ]
        },
        {
          "navn": "4",
          "beskrivelse": "Summerte poster tap",
          "beloep": 88840,
          "operasjon": "ADDERE",
          "poster": [
            {
              "tekniskNavn": "tapVedRealisasjonAvAksje",
              "visningsnavn": "Tap ved salg av aksjer",
              "beloep": 88840,
              "kilde": "SKATTEETATEN",
              "kanEndreVisningsnavn": false
            }
          ]
        },
        {
          "navn": "5",
          "beskrivelse": "Summerte poster oppjustering av tap",
          "beloep": 39090,
          "operasjon": "ADDERE",
          "poster": [
            {
              "tekniskNavn": "oppjustertTilleggTilTapVedRealisasjonAvAksje",
              "visningsnavn": "Oppjustering av tap ved salg av aksjer",
              "beloep": 39090,
              "kilde": "SKATTEETATEN",
              "kanEndreVisningsnavn": false
            }
          ]
        },
        {
          "navn": "NAV.HJELPESTOENADFRAFOLKETRYGDEN",
          "beskrivelse": "Hjelpestønad fra Folketrygden",
          "beloep": 2000,
          "operasjon": "ADDERE",
          "poster": [
            {
              "tekniskNavn": "nav.hjelpestoenadFraFolketrygden",
              "visningsnavn": "Hjelpestønad fra Folketrygden",
              "beloep": 2000,
              "kilde": "NAV",
              "kanEndreVisningsnavn": false
            }
          ]
        },
        {
          "navn": "NAV.OMSORGSLOENNETTERHELSEOGOMSORGSTJENESTELOVEN",
          "beskrivelse": "Omsorgslønn etter helse- og omsorgstjenesteloven § 3-6",
          "beloep": 1000,
          "operasjon": "SUBTRAHERE",
          "poster": [
            {
              "tekniskNavn": "nav.omsorgsloennEtterHelseOgOmsorgstjenesteloven",
              "visningsnavn": "Omsorgslønn etter helse- og omsorgstjenesteloven § 3-6",
              "beloep": 1000,
              "kilde": "NAV",
              "kanEndreVisningsnavn": false
            }
          ]
        },
        {
          "navn": "KOMMUNE.SKJOENNSMESSIGEFRADRAG",
          "beskrivelse": "Skjønnsmessig fradrag",
          "beloep": 3000,
          "operasjon": "SUBTRAHERE",
          "poster": [
            {
              "tekniskNavn": "kommune.skjoennsmessigeFradrag",
              "visningsnavn": "Fradrag 1",
              "beloep": 3000,
              "kilde": "KOMMUNE",
              "kanEndreVisningsnavn": true
            }
          ]
        }
      ],
      "personnavn": {
        "etternavn": "APPELSIN",
        "fornavn": "GLAD",
        "mellomnavn": null
      },
      "skatteoppgjoersdato": "2023-08-30",
      "registreringstidpunkt": "2023-08-30T13:04:58Z",
      "skattFeilmelding": null
    },
    {
      "personidentifikator": "06882949409",
      "personType": "EKTEFELLE",
      "skjermet": false,
      "stadie": "OPPGJOER",
      "beloep": 6381000,
      "grunnlag": [
        {
          "navn": "1",
          "beskrivelse": "Alminnelig inntekt før særfradrag",
          "beloep": 6801000,
          "operasjon": "ADDERE",
          "poster": [
            {
              "tekniskNavn": "alminneligInntektFoerSaerfradrag",
              "visningsnavn": "Alminnelig inntekt før særfradrag",
              "beloep": 6801000,
              "kilde": "SKATTEETATEN",
              "kanEndreVisningsnavn": false
            }
          ]
        },
        {
          "navn": "2",
          "beskrivelse": "Summerte gevinstposter",
          "beloep": 200000,
          "operasjon": "SUBTRAHERE",
          "poster": [
            {
              "tekniskNavn": "gevinstVedSalgAvAndelISDF",
              "visningsnavn": "Gevinst ved salg mv. av andel i selskap med deltakerfastsetting",
              "beloep": 200000,
              "kilde": "SKATTEETATEN",
              "kanEndreVisningsnavn": false
            }
          ]
        },
        {
          "navn": "3",
          "beskrivelse": "Summerte poster oppjustert av gevinst",
          "beloep": 88000,
          "operasjon": "SUBTRAHERE",
          "poster": [
            {
              "tekniskNavn": "oppjustertTilleggTilGevinstVedSalgAvAndelISDF",
              "visningsnavn": "Oppjustering av gevinst ved salg mv. av andel i selskap med deltakerfastsetting",
              "beloep": 88000,
              "kilde": "SKATTEETATEN",
              "kanEndreVisningsnavn": false
            }
          ]
        },
        {
          "navn": "7",
          "beskrivelse": "Summerte poster oppjustering av utbytte",
          "beloep": 132000,
          "operasjon": "SUBTRAHERE",
          "poster": [
            {
              "tekniskNavn": "oppjustertTilleggTilAndelIFellesTilleggIAlminneligInntektFraSDFInnenAnnenNaering",
              "visningsnavn": "Oppjustering av tillegg i alminnelig inntekt fra selskap med deltakerfastsetting",
              "beloep": 132000,
              "kilde": "SKATTEETATEN",
              "kanEndreVisningsnavn": false
            }
          ]
        }
      ],
      "personnavn": {
        "etternavn": "VEVSTOL",
        "fornavn": "KONSERVATIV",
        "mellomnavn": null
      },
      "skatteoppgjoersdato": "2023-08-30",
      "registreringstidpunkt": "2023-08-30T13:04:56Z",
      "skattFeilmelding": null
    }
  ],
  "samletBeloep": 6474431,
  "samletGrunnlag": [
    {
      "navn": "1",
      "beskrivelse": "Alminnelig inntekt før særfradrag",
      "beloep": 6807700,
      "operasjon": "ADDERE",
      "poster": [
        {
          "tekniskNavn": "alminneligInntektFoerSaerfradrag",
          "visningsnavn": "Alminnelig inntekt før særfradrag",
          "beloep": 6807700,
          "kilde": "SKATTEETATEN",
          "kanEndreVisningsnavn": false
        }
      ]
    },
    {
      "navn": "2",
      "beskrivelse": "Summerte gevinstposter",
      "beloep": 200000,
      "operasjon": "SUBTRAHERE",
      "poster": [
        {
          "tekniskNavn": "gevinstVedSalgAvAndelISDF",
          "visningsnavn": "Gevinst ved salg mv. av andel i selskap med deltakerfastsetting",
          "beloep": 200000,
          "kilde": "SKATTEETATEN",
          "kanEndreVisningsnavn": false
        }
      ]
    },
    {
      "navn": "3",
      "beskrivelse": "Summerte poster oppjustert av gevinst",
      "beloep": 127199,
      "operasjon": "SUBTRAHERE",
      "poster": [
        {
          "tekniskNavn": "oppjustertTilleggTilGevinstVedRealisasjonAvAksje",
          "visningsnavn": "Oppjustering av gevinst ved salg av aksjer",
          "beloep": 39199,
          "kilde": "SKATTEETATEN",
          "kanEndreVisningsnavn": false
        },
        {
          "tekniskNavn": "oppjustertTilleggTilGevinstVedSalgAvAndelISDF",
          "visningsnavn": "Oppjustering av gevinst ved salg mv. av andel i selskap med deltakerfastsetting",
          "beloep": 88000,
          "kilde": "SKATTEETATEN",
          "kanEndreVisningsnavn": false
        }
      ]
    },
    {
      "navn": "4",
      "beskrivelse": "Summerte poster tap",
      "beloep": 88840,
      "operasjon": "ADDERE",
      "poster": [
        {
          "tekniskNavn": "tapVedRealisasjonAvAksje",
          "visningsnavn": "Tap ved salg av aksjer",
          "beloep": 88840,
          "kilde": "SKATTEETATEN",
          "kanEndreVisningsnavn": false
        }
      ]
    },
    {
      "navn": "5",
      "beskrivelse": "Summerte poster oppjustering av tap",
      "beloep": 39090,
      "operasjon": "ADDERE",
      "poster": [
        {
          "tekniskNavn": "oppjustertTilleggTilTapVedRealisasjonAvAksje",
          "visningsnavn": "Oppjustering av tap ved salg av aksjer",
          "beloep": 39090,
          "kilde": "SKATTEETATEN",
          "kanEndreVisningsnavn": false
        }
      ]
    },
    {
      "navn": "7",
      "beskrivelse": "Summerte poster oppjustering av utbytte",
      "beloep": 132000,
      "operasjon": "SUBTRAHERE",
      "poster": [
        {
          "tekniskNavn": "oppjustertTilleggTilAndelIFellesTilleggIAlminneligInntektFraSDFInnenAnnenNaering",
          "visningsnavn": "Oppjustering av tillegg i alminnelig inntekt fra selskap med deltakerfastsetting",
          "beloep": 132000,
          "kilde": "SKATTEETATEN",
          "kanEndreVisningsnavn": false
        }
      ]
    },
    {
      "navn": "NAV.HJELPESTOENADFRAFOLKETRYGDEN",
      "beskrivelse": "Hjelpestønad fra Folketrygden",
      "beloep": 2000,
      "operasjon": "ADDERE",
      "poster": [
        {
          "tekniskNavn": "nav.hjelpestoenadFraFolketrygden",
          "visningsnavn": "Hjelpestønad fra Folketrygden",
          "beloep": 2000,
          "kilde": "NAV",
          "kanEndreVisningsnavn": false
        }
      ]
    },
    {
      "navn": "NAV.OMSORGSLOENNETTERHELSEOGOMSORGSTJENESTELOVEN",
      "beskrivelse": "Omsorgslønn etter helse- og omsorgstjenesteloven § 3-6",
      "beloep": 1000,
      "operasjon": "SUBTRAHERE",
      "poster": [
        {
          "tekniskNavn": "nav.omsorgsloennEtterHelseOgOmsorgstjenesteloven",
          "visningsnavn": "Omsorgslønn etter helse- og omsorgstjenesteloven § 3-6",
          "beloep": 1000,
          "kilde": "NAV",
          "kanEndreVisningsnavn": false
        }
      ]
    },
    {
      "navn": "KOMMUNE.SKJOENNSMESSIGEFRADRAG",
      "beskrivelse": "Skjønnsmessig fradrag",
      "beloep": 3000,
      "operasjon": "SUBTRAHERE",
      "poster": [
        {
          "tekniskNavn": "kommune.skjoennsmessigeFradrag",
          "visningsnavn": "Fradrag 1",
          "beloep": 3000,
          "kilde": "KOMMUNE",
          "kanEndreVisningsnavn": true
        }
      ]
    }
  ],
  "soeketidspunkt": "2023-09-27T10:47:23.356207606+02:00",
  "beregningstype": "PRAKTISK_BISTAND"
}
```

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



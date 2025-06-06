---
title: Skatte- og inntektsopplysninger (Gammel)
date: 2022-12-02
aliases: [/fiks-plattform/tjenester/fiksregister/skatteoginntektsopplysninger/, /fiks-plattform/tjenester/fiksregister/skatteoginntekstopplysninger]
---

## Kort beskrivelse
Fiks register tilbyr skatte- og inntektsopplysninger for kommunalt ansatte via et web-basert grensesnitt for innbyggere som søker om kommunale tjenester. Dette grensesnittet er også tilgjengelig som API for kommunene sine fagsystem. API-grensesnittet er ikke ferdig utviklet og endringer kan fortsatt forekomme.

## Tilgjengelige grensesnitt
| Grensesnitt       | Støtte                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Web portal        | Ja                                                                                                                          |
| Maskin til maskin | [Api spec v2](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/register-summert-skattegrunnlag-api-v2.json) |


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

APIene er tilgjengelig via Fiks-plattformen som proxy-tjeneste eller via vårt overbygg.

### Oppslag via overbygg
Vi har laget vårt eget overbygg som gir mulighet for å søke på flere personer. Vi søker om personene har stadie ___OPPGJØR___. Ved redusert foreldrebetaling SFO/barnehage, søkes det også etter ___UTKAST___ dersom de ikke har ___OPPGJØR___. Datamodellen er en sammenstilling av det som kommer fra skatteetaten sine APIer og har summert alle poster som hører sammen. For hver tjeneste finnes det en beregningstype som må sendes inn som en del av payloaden, dette erstatter behovet for å bruke rettighetspakke.

URL for fiks-api (POST): ```<MILJØ_URL>/register/api/v2/ks/{rolleId}/summertskattegrunnlag``` [Payload, se swagger dokumentasjon](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/register-summert-skattegrunnlag-api-v2.json) 

#### API-dokumentasjon
[Swagger dokumentasjon for overbygg finner du her.](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/register-summert-skattegrunnlag-api-v2.json) Bruk også dokumentasjon fra Skatteetaten.

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

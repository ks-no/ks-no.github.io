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


#### Ekstraposter
Det finnes også en del ulike poster som har andre kilder enn Skatteetaten. Disse kan sendes med som en del av requesten, og vil da bli kalkulert sammen med data fra Skatteetaten. For å hente ut hvilke poster som er gyldig kan endepunktet ```<MILJØ_URL>/register/api/v1/ks/{rolleId}/skatteoginntektsopplysninger/verdier``` brukes.

#### Eksempel med bruk av API-overbygg
Payload
```json
{
   "beregningstype":"LANGTIDSOPPHOLD_INSTITUSJON",
   "inntektsaar":2023,
   "personer":[
      {
         "identifikator":"04817299771",
         "type":"SOEKER",
         "ekstraposter":[
            
         ]
      },
      {
         "identifikator":"27847099416",
         "type":"PARTNER",
         "ekstraposter":[
            {
               "tekniskNavn":"kommune.tenktEtterlattePensjon",
               "beloep":0
            }
         ]
      }
   ]
}
```

Svar
```json
{
   "inntektsaar":2023,
   "stadie":"OPPGJOER",
   "personer":[
      {
         "identifikator":"04817299771",
         "type":"SOEKER",
         "skjermet":false,
         "stadie":"OPPGJOER",
         "navn":{
            "etternavn":"PÅFUNN",
            "fornavn":"UPERSONLIG",
            "mellomnavn":null
         },
         "skatteoppgjoersdato":"2024-02-15",
         "registreringstidpunkt":"2024-02-15T09:47:37.874Z"
      },
      {
         "identifikator":"27847099416",
         "type":"PARTNER",
         "skjermet":false,
         "stadie":"OPPGJOER",
         "navn":{
            "etternavn":"DAMESYKKEL",
            "fornavn":"OPPRIKTIG",
            "mellomnavn":null
         },
         "skatteoppgjoersdato":"2024-02-19",
         "registreringstidpunkt":"2024-02-19T07:21:24.518Z"
      }
   ],
   "visningsposter":[
      {
         "kategori":"INNTEKT",
         "poster":[
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":4392
                  },
                  {
                     "identifikator":"27847099416",
                     "beloep":3600
                  }
               ],
               "beloep":7992,
               "tekniskNavn":"avkortetFordelVedElektroniskKommunikasjon",
               "visningstekst":"Fordel elektronisk kommunikasjon",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":767670
                  },
                  {
                     "identifikator":"27847099416",
                     "beloep":142622
                  }
               ],
               "beloep":910292,
               "tekniskNavn":"samletLoennsinntektMedTrygdeavgiftspliktOgMedTrekkplikt",
               "visningstekst":"Lønn og naturalytelser med mer",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":0
                  }
               ],
               "beloep":0,
               "tekniskNavn":"/beregnetSkattFastland/skattOgAvgift/trygdeavgiftAvNaeringsinntekt",
               "visningstekst":"Personinntekt fra næringsinntekt",
               "infotekst":"Samlepost for pårørendes næringsinntekt. Se veileder for mer informasjon."
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":2163
                  }
               ],
               "beloep":2163,
               "tekniskNavn":"samledeOpptjenteRenterIInnenlandskeBanker",
               "visningstekst":"Renter av bankinnskudd",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"27847099416",
                     "beloep":2234
                  }
               ],
               "beloep":2234,
               "tekniskNavn":"renteinntektAvSkadeforsikring",
               "visningstekst":"Renter av skadeforsikring",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":27493
                  }
               ],
               "beloep":27493,
               "tekniskNavn":"utbytteFraAksje",
               "visningstekst":"Aksjeutbytte",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":19795
                  }
               ],
               "beloep":19795,
               "tekniskNavn":"oppjustertTilleggTilUtbytteFraAksje",
               "visningstekst":"Oppjustering av aksjeutbytte",
               "infotekst":null
            }
         ]
      },
      {
         "kategori":"FRADRAG",
         "poster":[
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":234591
                  }
               ],
               "beloep":234591,
               "tekniskNavn":"/beregnetSkattFastland/informasjonTilSkattelister/beregnetSkatt",
               "visningstekst":"Beregnet skatt",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":8211577
                  },
                  {
                     "identifikator":"27847099416",
                     "beloep":0
                  }
               ],
               "beloep":8211577,
               "tekniskNavn":"/fastland/beloepTilgode",
               "visningstekst":"For mye innbetalt skatt - til utbetaling",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":0
                  }
               ],
               "beloep":0,
               "tekniskNavn":"/beregnetSkattFastland/skattOgAvgift/formuesskattTilKommune/beloep",
               "visningstekst":"Formuesskatt til kommune",
               "infotekst":"Kommuner som gir fradrag for formueskatt må justere denne bort. Se veileder for mer informasjon."
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":0
                  }
               ],
               "beloep":0,
               "tekniskNavn":"/beregnetSkattFastland/skattOgAvgift/formuesskattTilStat/beloep",
               "visningstekst":"Formueskatt til stat",
               "infotekst":"Kommuner som gir fradrag for formueskatt må justere denne bort. Se veileder for mer informasjon."
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":0
                  }
               ],
               "beloep":0,
               "tekniskNavn":"/beregnetSkattFastland/skattefradrag/skattefradragForFormuesskattBetaltIUtlandet",
               "visningstekst":"Skattefradrag for formuesskatt betalt i utlandet",
               "infotekst":"Kommuner som gir fradrag for skatt betalt i utlandet må justere denne bort. Se veileder for mer informasjon."
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":0
                  }
               ],
               "beloep":0,
               "tekniskNavn":"/beregnetSkattFastland/skattefradrag/skattefradragForInntektsskattBetaltIUtlandet",
               "visningstekst":"Skattefradrag for inntektsskatt betalt i utlandet",
               "infotekst":"Kommuner som gir fradrag for skatt betalt i utlandet må justere denne bort. Se veileder for mer informasjon."
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":0
                  },
                  {
                     "identifikator":"27847099416",
                     "beloep":9290575
                  }
               ],
               "beloep":9290575,
               "tekniskNavn":"/fastland/restskatt",
               "visningstekst":"Skyldig restskatt",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":0
                  },
                  {
                     "identifikator":"27847099416",
                     "beloep":0
                  }
               ],
               "beloep":0,
               "tekniskNavn":"/fastland/avregnetForskuddstrekk",
               "visningstekst":"Sum innbetalt skatt",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"27847099416",
                     "beloep":876
                  }
               ],
               "beloep":876,
               "tekniskNavn":"betalteForsinkelsesrenter",
               "visningstekst":"Betalte forsinkelsesrenter",
               "infotekst":null
            }
         ]
      },
      {
         "kategori":"FORMUE",
         "poster":[
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":108147
                  }
               ],
               "beloep":108147,
               "tekniskNavn":"innskudd",
               "visningstekst":"Bankinnskudd",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":1135929
                  }
               ],
               "beloep":1135929,
               "tekniskNavn":"bruttoformue",
               "visningstekst":"Bruttoformue",
               "infotekst":null
            }
         ]
      },
      {
         "kategori":"GJELD",
         "poster":[
            {
               "personer":[
                  {
                     "identifikator":"27847099416",
                     "beloep":29188
                  }
               ],
               "beloep":29188,
               "tekniskNavn":"samletGjeld",
               "visningstekst":"Sum gjeld",
               "infotekst":null
            }
         ]
      },
      {
         "kategori":"ANNET",
         "poster":[
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":717063
                  },
                  {
                     "identifikator":"27847099416",
                     "beloep":80318
                  }
               ],
               "beloep":797381,
               "tekniskNavn":"alminneligInntektFoerSaerfradrag",
               "visningstekst":"Alminnelig inntekt før særfradrag",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":104450
                  },
                  {
                     "identifikator":"27847099416",
                     "beloep":67262
                  }
               ],
               "beloep":171712,
               "tekniskNavn":"minstefradragIInntekt",
               "visningstekst":"Minstefradrag i egen inntekt",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":821513
                  },
                  {
                     "identifikator":"27847099416",
                     "beloep":148456
                  }
               ],
               "beloep":969969,
               "tekniskNavn":"sumInntekterIAlminneligInntektFoerFordelingsfradrag",
               "visningstekst":"Sum inntekter",
               "infotekst":null
            },
            {
               "personer":[
                  {
                     "identifikator":"04817299771",
                     "beloep":1284727
                  }
               ],
               "beloep":1284727,
               "tekniskNavn":"verdiFoerVerdsettingsrabattForAksje",
               "visningstekst":"Aksjer",
               "infotekst":null
            }
         ]
      }
   ],
   "beregningsbeloep":567127,
   "inntekt":{
      "beloep":801718,
      "beregning":[
         {
            "tekniskNavn":"arbeidsinntekt",
            "visningstekst":"Arbeidsinntekt",
            "beloep":772062,
            "operasjon":"ADDERE",
            "type":"POST",
            "beregningsgrunnlag":[
               
            ],
            "beregningsposter":[
               {
                  "tekniskNavn":"samletLoennsinntektMedTrygdeavgiftspliktOgMedTrekkplikt",
                  "visningstekst":"Lønn og naturalytelser med mer",
                  "operasjon":"ADDERE",
                  "beloep":767670,
                  "kilde":"SKATTEETATEN",
                  "kanEndreVisningstekst":false,
                  "identifikator":"04817299771",
                  "infotekst":null,
                  "eksempeltekst":null
               },
               {
                  "tekniskNavn":"avkortetFordelVedElektroniskKommunikasjon",
                  "visningstekst":"Fordel elektronisk kommunikasjon",
                  "operasjon":"ADDERE",
                  "beloep":4392,
                  "kilde":"SKATTEETATEN",
                  "kanEndreVisningstekst":false,
                  "identifikator":"04817299771",
                  "infotekst":null,
                  "eksempeltekst":null
               }
            ]
         },
         {
            "tekniskNavn":"renteinntekt",
            "visningstekst":"Renteinntekt",
            "beloep":2163,
            "operasjon":"ADDERE",
            "type":"POST",
            "beregningsgrunnlag":[
               
            ],
            "beregningsposter":[
               {
                  "tekniskNavn":"samledeOpptjenteRenterIInnenlandskeBanker",
                  "visningstekst":"Renter av bankinnskudd",
                  "operasjon":"ADDERE",
                  "beloep":2163,
                  "kilde":"SKATTEETATEN",
                  "kanEndreVisningstekst":false,
                  "identifikator":"04817299771",
                  "infotekst":null,
                  "eksempeltekst":null
               }
            ]
         },
         {
            "tekniskNavn":"avkastningFormue",
            "visningstekst":"Avkastning av formue",
            "beloep":27493,
            "operasjon":"ADDERE",
            "type":"POST",
            "beregningsgrunnlag":[
               
            ],
            "beregningsposter":[
               {
                  "tekniskNavn":"utbytteFraAksje",
                  "visningstekst":"Aksjeutbytte",
                  "operasjon":"ADDERE",
                  "beloep":27493,
                  "kilde":"SKATTEETATEN",
                  "kanEndreVisningstekst":false,
                  "identifikator":"04817299771",
                  "infotekst":null,
                  "eksempeltekst":null
               }
            ]
         }
      ]
   },
   "fradrag":{
      "beloep":234591,
      "beregning":[
         {
            "tekniskNavn":"skatt",
            "visningstekst":"Skatt",
            "beloep":234591,
            "operasjon":"ADDERE",
            "type":"GRUNNLAG",
            "beregningsgrunnlag":[
               {
                  "tekniskNavn":"beregnetSkatt",
                  "visningstekst":"Beregnet skatt",
                  "beloep":234591,
                  "operasjon":"ADDERE",
                  "beregningsposter":[
                     {
                        "tekniskNavn":"/beregnetSkattFastland/informasjonTilSkattelister/beregnetSkatt",
                        "visningstekst":"Beregnet skatt",
                        "operasjon":"ADDERE",
                        "beloep":234591,
                        "kilde":"SKATTEETATEN",
                        "kanEndreVisningstekst":false,
                        "identifikator":"04817299771",
                        "infotekst":null,
                        "eksempeltekst":null
                     }
                  ]
               }
            ],
            "beregningsposter":[
               
            ]
         },
         {
            "tekniskNavn":"forsorgerfradrag",
            "visningstekst":"Forsørgerfradrag",
            "beloep":0,
            "operasjon":"ADDERE",
            "type":"GRUNNLAG",
            "beregningsgrunnlag":[
               {
                  "tekniskNavn":"mellomregningPaarorende",
                  "visningstekst":"Forsørgerfradrag OPPRIKTIG DAMESYKKEL (PARTNER)",
                  "beloep":0,
                  "operasjon":"ADDERE",
                  "beregningsposter":[
                     {
                        "tekniskNavn":"kommune.tenktEtterlattePensjon",
                        "visningstekst":"Tenkt etterlattepensjon",
                        "operasjon":"ADDERE",
                        "beloep":0,
                        "kilde":"MANUELL_INPUT",
                        "kanEndreVisningstekst":false,
                        "identifikator":"27847099416",
                        "infotekst":null,
                        "eksempeltekst":"Tenkt etterlattepensjon beregnes etter reglene i egenandelsforskriften. Hvis etterlattepensjon ikke er aktuelt, fyller du inn 0."
                     },
                     {
                        "tekniskNavn":"avkortetFordelVedElektroniskKommunikasjon",
                        "visningstekst":"Fordel elektronisk kommunikasjon",
                        "operasjon":"SUBTRAHERE",
                        "beloep":3600,
                        "kilde":"SKATTEETATEN",
                        "kanEndreVisningstekst":false,
                        "identifikator":"27847099416",
                        "infotekst":null,
                        "eksempeltekst":null
                     },
                     {
                        "tekniskNavn":"samletLoennsinntektMedTrygdeavgiftspliktOgMedTrekkplikt",
                        "visningstekst":"Lønn og naturalytelser med mer",
                        "operasjon":"SUBTRAHERE",
                        "beloep":142622,
                        "kilde":"SKATTEETATEN",
                        "kanEndreVisningstekst":false,
                        "identifikator":"27847099416",
                        "infotekst":null,
                        "eksempeltekst":null
                     }
                  ]
               }
            ],
            "beregningsposter":[
               
            ]
         }
      ]
   },
   "soeketidspunkt":"2024-08-13T13:47:36.829089195Z",
   "beregningstype":"LANGTIDSOPPHOLD_INSTITUSJON",
   "feilmeldinger":[
      
   ]
}
```
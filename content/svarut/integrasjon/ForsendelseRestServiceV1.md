---
title: ForsendelseRestServiceV1
date: 2019-04-11
---
### Tilgang

For å benytte web-tjenesten må en bruke HTTP Basic autentication med brukernavn og service-passord. 
Avsender opprettes, og passord genereres, av administrator for SvarUt via [Fiks konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester/svarut).

### Nytt i denne versjonen

* Erstatter SOAP-tjenesten.

## Endepunkter

Base URL: `/tjenester/api/forsendelse/v1`

| Url                      | Method | Innput                      | Utdata                                                     | Kort beskrivelse                                                                            |
|--------------------------|--------|-----------------------------|------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| /sendForsendelse         | POST   | Forsendelse                 | ForsendelsesId                                             | Hovedtjeneste som sender inn forsendelse til ekspedering av KS-SvarUt.                      |
| /startNyForsendelse      | POST   |                             | ForsendelsesId                                             | Genererer forsendelsesid som brukes sammen med sendForsendelseMedId.                        |
| /{id}/sendForsendelse    | POST   | Forsendelse, ForsendelsesId | ForsendelsesId                                             | Se sendForsendelse.                                                                         |
| /{id}/status             | GET    | ForsendelsesId              | ForsendelsesStatus                                         | Henter status for en forsendelse.                                                           |
| /{id}/dokumentMetadata   | GET    | ForsendelsesId              | List\<DokumentMetadata\>                                   | Henter liste med informasjon om dokumentene til en forsendelse.                             |
| /{id}/historikk          | GET    | ForsendelsesId              | ForsendelsesHistorikk                                      | Henter historikk for en forsendelse, tilsvarer ekspederingsloggen i forsendelsesoversikten. |
| /{id}/signeringhistorikk | GET    | ForsendelsesId              | SigneringsHistorikk                                        | Henter signeringshistorikk (logg) på en forsendelse som er markert for signering.           |
| /{id}/settLest           | POST   | LestAv                      |                                                            | Benyttes for å sette status til lest når dokumentet har blitt lest utenfor vårt system.     |
| /statuser                | POST   | List\<ForsendelsesId\>      | List\<ForsendelsesStatus\>                                 | Henter status for flere forsendelser.                                                       |
| /forsendelseTyper        | GET    |                             | List\<String\>                                             | Henter alle forsendelsestyper som kan brukes i SvarInn.                                     |
| /mottakersystem/{orgnr}  | GET    | OrganisasjonsNummer         | List\<MottakerForsendelsesTyper\>                          | Henter alle konfigurerte mottakersystem for orgnr.                                          |
| /eksternref/{eksternref} | String | List\<ForsendelsesId\>      | Henter liste med forsendelseider som har denne eksternRef. |


Klientbibliotek laget i Java finnes her: https://github.com/ks-no/svarut-rest-klient

### Feilmeldinger
[Beskrivelse av feilmeldinger](../../../fiks-plattform/integrasjoner/#feilmeldinger)

### VIKTIG!
/sendForsendelse bør ha readtimeout på 16min. SvarUT har Timeout på 15min. SvarUt kan ta i mot ganske store filer, derfor er denne timeouten så høg. 

Content-Type må være 'multipart/form-data'
Første part må være name="forsendelse" med [JSON](https://github.com/ks-no/svarut-rest-klient/blob/master/svarut-rest-klient/json/forsendelse.json)

Parts med dokumenter må være content-type application/octet-stream


### Eksempel på forsendelse JSON
Dette er ment som eksempel på JSON som sendes inn sammen med dokumenter.
Utvidet beskrivelse av felter finnes lenger ned på siden.
```json
{
    "mottaker": {
        "postAdresse": {
            "navn": "Ole Olsen",
            "adresse1": "Gamleveien 1",
            "postNummer": "5258",
            "postSted": "Poststed"
        },
        "digitalAdresse": {
            "fodselsNummer": "12345678912"
        }
    },
    "eksponertFor": [],
    "avgivendeSystem": "S002-SAK",
    "tittel": "Tittel for sak",
    "kunDigitalLevering": false,
    "kryptert": false,
    "utskriftsKonfigurasjon": {
        "utskriftMedFarger": false,
        "tosidig": false
    },
    "krevNiva4Innlogging": false,
    "dokumenter": [
        {
            "filnavn": "doc.pdf",
            "mimeType": "application/pdf",
            "skalSigneres": false,
            "ekskluderesFraUtskrift": false
        }
    ],
    "lenker": [],
    "svarPaForsendelseLink": false
}
```

### Request eksempel
Dette er eksempel på oppbygging av en gyldig request med multipart
```
POST /tjenester/api/forsendelse/v1/sendForsendelse HTTP/1.1
Host: svarut.fiks.test.ks.no
Authorization: Basic QXVkdW5UZXN0ZXJBdnNlbmRlcjpk.....
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="forsendelse"

{
    "mottaker": {
        "postAdresse": {
            "navn": "Ole Olsen",
            "adresse1": "Gamleveien 1",
            "postNummer": "5258",
            "postSted": "Poststed"
        },
        "digitalAdresse": {
            "fodselsNummer": "12345678912"
        }
    },
    "eksponertFor": [],
    "avgivendeSystem": "S002-SAK",
    "tittel": "Tittel for sak",
    "kunDigitalLevering": false,
    "kryptert": false,
    "utskriftsKonfigurasjon": {
        "utskriftMedFarger": false,
        "tosidig": false
    },
    "krevNiva4Innlogging": false,
    "dokumenter": [
        {
            "filnavn": "sample.pdf",
            "mimeType": "application/pdf",
            "skalSigneres": false,
            "ekskluderesFraUtskrift": false
        }
    ],
    "lenker": [],
    "svarPaForsendelseLink": false
}
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="sample.pdf"; filename="sample.pdf"
Content-Type: application/pdf


------WebKitFormBoundary7MA4YWxkTrZu0gW--
``` 

### Modeller

Datamodellene for REST-servicen finnes i JSON spec på https://github.com/ks-no/svarut-rest-klient/tree/master/svarut-rest-klient/json.

#### ForsendelsesId
| Felt | Type | Beskrivelse | Validering |
|------|------|-------------|------------|
| id   | UUID |             |            |

#### Forsendelse
| Felt                         | Type                                  | Beskrivelse                                                                                                                                                                                                                                                                                                                                                                                         | Validering                                            |
|------------------------------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| mottaker                     | Adresse                               | Addresse, full post adresse må være utfylt, for sending til Altinn må digitaladresse med orgnr/fødselsnr være utfylt. Støtte for utenlandske adresser.                                                                                                                                                                                                                                              | Ved signeringsoppdrag må PersonDigitalAdresse brukes. |
| avgivendeSystem              | String                                | Identifikator som identifiserer systemet som gjør web-service kallet, vil blant annet kunne benyttes for statistikk og feilsøking. Bruk følgende for sak/arkivsystemene: Doculive, Ephorte, ESA, 360 og Websak. For andre fagsystemer avtales dette med KS KommIT på [svarut@ks.no](mailto:svarut@ks.no). Obligatorisk felt.                                                                        |                                                       |
| tittel                       | String                                | Tittel på forsendelsen. Tittel blir vist i tittelfeltet på melding til Altinn, og i listen over innkommende meldinger.                                                                                                                                                                                                                                                                              | Må være utfylt                                        |
| konteringsKode               | String                                | Kode som beskriver faktureringskonto for forsendelsen. Kan benyttes for å gruppere meldingsstatistikk gjennom forvaltningsløsningen, og sendes videre til print-leverandør.                                                                                                                                                                                                                         | ^[a-zA-Z0-9\-\.øæåØÆÅ]{0,20}$                         |
| kunDigitalLevering           | boolean                               | Dersom denne settes til true vil forsendelsen ikke under noen omstendigheter bli printet. INGEN GARANTI OM LEVERANSE. Vi prøver så godt vi kan, men funker ingen digitale kanaler får avsender ingen tilbakemelding. Brukes typisk til reklame.                                                                                                                                                     |                                                       |
| kryptert                     | boolean                               | Settes til true dersom fil(ene) som sendes er kryptert. Dersom kryptering ikke er brukt må denne være satt til false. Se kodeeksempler for eksempel på kryptering. Det må være kryptert med CMS med svarut sin publickey. [Den offentlige nøkkelen PROD](https://svarut.ks.no/forsendelse/publickey/hent), [Den offentlige nøkkelen for TEST](https://test.svarut.ks.no/forsendelse/publickey/hent) |                                                       |
| utskriftsKonfigurasjon       | UtskriftsKonfigurasjon                | Konfigurasjon for hvordan dokumentet skal printes, dobbeltsidig, fargeprint                                                                                                                                                                                                                                                                                                                         |                                                       |
| krevNiva4Innlogging          | boolean                               | Forsendelsen krever nivå 4-innlogging for å kunne lastes ned eller signeres. Disse forsendelsene må være kryptert.                                                                                                                                                                                                                                                                                  |                                                       |
| metadataFraAvleverendeSystem | NoarkMetadataFraAvleverendeSaksSystem | Noark5 metadata fra avleverende system                                                                                                                                                                                                                                                                                                                                                              |                                                       |
| metadataForImport            | NoarkMetadataForImport                | Noark5 metadata som stemmer med mottakende system. Kan brukes til å legge dokumentet på rett sak.                                                                                                                                                                                                                                                                                                   |                                                       |
| svarSendesTil                | Adresse                               | Dette er mottaker som en skal sende til om en vil svare på forsendelsen. Valgfritt å fylle ut. Utfylt adresse blir validert,se PostAdresse.                                                                                                                                                                                                                                                         |                                                       |
| svarPaForsendelse            | ForsendelsesId                        | Forsendelsesid til forsendelse dette er et svar på.                                                                                                                                                                                                                                                                                                                                                 |                                                       |
| dokumenter                   | List<Dokument>                        | Rekkefølgen er rekkefølgen de kommer i brevet. Total filstørrelse inntil 350MB er støttet når det skal printes. Ellers er det ikke begrensning.                                                                                                                                                                                                                                                     |                                                       |
| lenker                       | List<Lenke>                           | Rekkefølgen er samme som de vil komme i brevet. Kan være tom.                                                                                                                                                                                                                                                                                                                                       |                                                       |
| forsendelsesType             | String                                | Fritekst felt for å kunne identifisere forsendelse type.                                                                                                                                                                                                                                                                                                                                            |                                                       |
| eksternReferanse             | String                                | Ekstern id for forsendelsen, ingen sjekk på innhold i SvarUt. Det vil komme mulighet for å hente ut forsendelser i søk og via api på eksternref.                                                                                                                                                                                                                                                    |                                                       |
| svarPaForsendelseLink        | boolean                               | Mottaker kan svare på forsendelse. Orgnr i svar sendes til må matche et orgnr i edialog mottakere.                                                                                                                                                                                                                                                                                                  |                                                       |
| signeringUtloper             | Date                                  | Angi hvor lenge signeringsoppdraget er gyldig, minimum 1 dag.                                                                                                                                                                                                                                                                                                                                       | Må angis ved signeringsforsendelser                   |
| signaturType                 | SignaturType                          | Velge mellom autentisert eller avansert signering.                                                                                                                                                                                                                                                                                                                                                  | Må angis ved signeringsforsendelser                   |
| eksponertFor                 | List<DigitalAdresse>                  | Orgnr og fødselsnr i liste får også log å laste ned forsendelse filene.                                                                                                                                                                                                                                                                                                                             |                                                       |
| taushetsbelagtPost           | boolean                               | Dersom denne settes til true vil forsendelsen, om den går til Altinn og mottaker er en organisasjon, sendes til tjenesten for taushetsbelagt post. Les mer om tilgangsstyring for taushetsbelagt post på https://minside.kommune.no/tbp.                                                                                                                                                            |                                                       |

#### LestAv
| Felt                 | Type           | Beskrivelse | Validering |
|----------------------|----------------|-------------|------------|
| forsendelsesId       | ForsendelsesId |             |            |
| lestAvFodselsNummer  | String         |             |            |
| navnPaEksterntSystem | String         |             |            |
| datoLest             | Date           |             |            |

#### OrganisasjonsNummer
| Felt | Type   | Beskrivelse | Validering |
|------|--------|-------------|------------|
| id   | String |             |            |

#### ForsendelsesStatus
| Felt               | Type           | Beskrivelse | Validering |
|--------------------|----------------|-------------|------------|
| forsendelsesId     | ForsendelsesId |             |            |
| sisteStatusEndring | Date           |             |            |
| status             | Status         |             |            |

#### Status
| Verdi            | Beskrivelse                                                                                                                                                   |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| MOTTATT          | Et kall mottatt på forsendelses-service. En id blir tildelt forsendelsen.                                                                                     | 
| AKSEPTERT        | Meldingen er validert og forsendelsesfil dannet.                                                                                                              | 
| KLAR_FOR_MOTTAK  | Venter på at forsendelse skal bli lastet ned av mottaker.                                                                                                     | 
| VARSLET          | Et varsel om forsendelsen er sendt til varslingstjenesten.                                                                                                    | 
| LEST             | En forsendelse er lest når hele forsendelsesfilen er lastet ned av mottaker.                                                                                  | 
| SENDT_PRINT      | Forsendelsen er blitt overført til printleverandør.                                                                                                           | 
| SENDT_DIGITALT   | Forsendelsen er motatt og sendt slik den skal. Ikke blitt lest enda. Forsendelser med denne status vil kun leveres digitalt, og vil aldri gå til print.       | 
| SENDT_SDP        | Forsendelsen er motatt og sendt til Sikker digital postkasse.                                                                                                 | 
| LEVERT_SDP       | Forsendelsen er motatt og sendt til Sikker digital postkasse. Vi har motatt Leveringskvittering fra SDP. Forsendelsen skal da være tilgjengelig for mottaker. | 
| PRINTET          | Printkvittering mottatt fra printleverandør eller manuell print bekreftet(via webgrensesnitt).                                                                | 
| AVVIST           | Forsendelsen er ikke validert pga. manglende/korrupt metadata, eller fordi forsendelsesfil ikke kunne dannes.                                                 | 
| IKKE_LEVERT      | Kun digital leveranse hvor vi ikke har klart å levere forsendelsen.                                                                                           | 
| MANUELT_HANDTERT | Forsendelsen er manuelt avsluttet, f.eks. pga en feilsituasjon.                                                                                               | 


#### ForsendelsesHistorikk
| Felt            | Type                  | Beskrivelse | Validering |
|-----------------|-----------------------|-------------|------------|
| hendelsesLogger | List\<HendelsesLogg\> |             |            |

#### SigneringsHistorikk
| Felt           | Type                   | Beskrivelse | Validering |
|----------------|------------------------|-------------|------------|
| forsendelsesId | ForsendelsesId         |             |            |
| logg           | List\<SigneringsLogg\> |             |            |

#### MottakerForsendelsesTyper
| Felt                | Type                | Beskrivelse | Validering |
|---------------------|---------------------|-------------|------------|
| organisasjonsNummer | OrganisasjonsNummer |             |            |
| forsendelsesType    | String              |             |            |
| mottakerSystem      | String              |             |            |
| mottakerId          | String              |             |            |
| niva                | Integer             |             |            |

#### DokumentMetadata
| Felt                                | Type          | Beskrivelse                                       | Validering                                                         |
|-------------------------------------|---------------|---------------------------------------------------|--------------------------------------------------------------------|
| mimeType                            | String        |                                                   |                                                                    |
| filnavn                             | String        |                                                   |                                                                    |
| kanSigneres                         | Boolean       | Bare en fil kan signeres og skal være av type PDF | Validerer at maks ett dokument pr forsendelse har flagget slått på |
| sizeInBytes                         | Long          |                                                   |                                                                    |
| sha256hash                          | String        |                                                   |                                                                    |
| dokumentType                        | String        |                                                   |                                                                    |
| nedlasningsUrl                      | String        |                                                   |                                                                    |
| signeringsUrl                       | String        |                                                   |                                                                    |
| ekstraMetadata                      | List\<Entry\> |                                                   |                                                                    |
| inneholderPersonsensitivInformasjon | Boolean       |                                                   |                                                                    |

#### HendelsesLogg
| Felt      | Type   | Beskrivelse | Validering |
|-----------|--------|-------------|------------|
| tidspunkt | String |             |            |
| hendelse  | String |             |            |

#### SigneringsLogg
| Felt      | Type             | Beskrivelse | Validering |
|-----------|------------------|-------------|------------|
| tidspunkt | Date             |             |            |
| type      | Signeringsstatus |             |            |
| hendelse  | String           |             |            |

#### Adresse
| Felt           | Type           | Beskrivelse                                                  | Validering         |
|----------------|----------------|--------------------------------------------------------------|--------------------|
| postAdresse    | PostAdresse    | Adressen forsendelsen sendes til dersom den går via brevpost | Kan ikke være null |
| digitalAdresse | DigitalAdresse | Se OrganisasjonDigitalAdresse og PersonDigitalAdresse        |                    |

#### PostAdresse
| Felt       | Type   | Beskrivelse      | Validering                                                                               |
|------------|--------|------------------|------------------------------------------------------------------------------------------|
| navn       | String | Navn på mottaker | Må være utfylt.                                                                          |
| adresse1   | String | Adresselinje1    |                                                                                          |
| adresse2   | String | Adresselinje2    |                                                                                          |
| adresse3   | String | Adresselinje3    |                                                                                          |
| postSted   | String | Poststed         | Må være utfylt dersom forsendelsen ikke er kun digital.                                  |
| postNummer | String | Postnummer       | Må være utfylt dersom forsendelsen ikke er kun digital. Fire siffer for norske adresser. |
| land       | String | Land             | Må være utfylt dersom forsendelsen ikke er kun digital.                                  |

#### DigitalAdresse
Se OrganisasjonDigitalAdresse og PersonDigitalAdresse

#### OrganisasjonDigitalAdresse
| Felt                | Type                | Beskrivelse                                   | Validering |
|---------------------|---------------------|-----------------------------------------------|------------|
| organisasjonsNummer | OrganisasjonsNummer | Må være utfylt for å kunne levere til altinn. |            |

#### PersonDigitalAdresse
| Felt          | Type   | Beskrivelse                                   | Validering                                         |
|---------------|--------|-----------------------------------------------|----------------------------------------------------|
| fodselsNummer | String | Må være utfylt for å kunne levere til altinn. | Ved signeringsoppdrag må dette feltet være utfylt. |

#### UtskriftsKonfigurasjon
| Felt              | Type    | Beskrivelse | Validering |
|-------------------|---------|-------------|------------|
| utskriftMedFarger | boolean |             |            |
| tosidig           | boolean |             |            |

#### NoarkMetadataFraAvleverendeSaksSystem
| Felt                 | Type          | Beskrivelse | Validering |
|----------------------|---------------|-------------|------------|
| saksSekvensNummer    | Integer       |             |            |
| saksAar              | Integer       |             |            |
| journalAar           | Integer       |             |            |
| journalSekvensNummer | Integer       |             |            |
| journalPostNummer    | Integer       |             |            |
| journalPostType      | String        |             |            |
| journalStatus        | String        |             |            |
| journalDato          | Date          |             |            |
| dokumentetsDato      | Date          |             |            |
| tittel               | String        |             |            |
| saksBehandler        | String        |             |            |
| ekstraMetadata       | List\<Entry\> |             |            |

#### NoarkMetadataForImport
| Felt              | Type    | Beskrivelse | Validering |
|-------------------|---------|-------------|------------|
| saksSekvensNummer | Integer |             |            |
| saksAar           | Integer |             |            |
| journalPostType   | String  |             |            |
| journalStatus     | String  |             |            |
| dokumentetsDato   | Date    |             |            |
| tittel            | String  |             |            |

#### Dokument
| Felt                                | Type           | Beskrivelse                                                                                                                                               | Validering                                                                                                                                                                                                                                                 |
|-------------------------------------|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| filnavn                             | String         | Filnavn er for intern bruk, må være unikt i en forsendelse.                                                                                               | Max 226 tegn. Må ikke inneholde mappe, kun filnavn. (ingen / eller \) Disse tegnene er også ugyldige " < > ? * &#124; : De har andre funksjoner i windows og kan ikke brukes i filnavn på windows. Skiller ikke mellom store og små bokstaver i filnavnet. |
| mimeType                            | String         | Mimetype på være application/pdf hvis den skal til print. Kun digital levering er valgt kan vi ta imot annet.                                             | Kun application/pdf hvis den skal til print                                                                                                                                                                                                                |
| skalSigneres                        | Boolean        | Angir om dokumentet skal signeres                                                                                                                         | Bare et dokument kan signeres og må være av type PDF                                                                                                                                                                                                       | 
| dokumentType                        | String         | Fritekstfelt som kan brukes til å fortelle noe om dokumentTypen til feltet. Kan brukes til noark4 dokumenttyper                                           |                                                                                                                                                                                                                                                            |
| data                                | DataHandler    | Fildata                                                                                                                                                   |                                                                                                                                                                                                                                                            |
| giroarkSider                        | Set<\Integer\> | Liste med sidetall som skal printes på gult giroark. Digital versjon vil få grått giroark. Første side er 1.                                              |                                                                                                                                                                                                                                                            |
| ekskluderesFraUtskrift              | Boolean        | Dette dokumentet blir ikke med i utskrift av forsendelsen. Brukes til filer som kun er interessant for digital levering. F.eks xml, video eller lyd filer |                                                                                                                                                                                                                                                            |
| ekstraMetadata                      | List\<Entry\>  | Brukes til andre data som avsender vil ha med i forsendelsen                                                                                              |                                                                                                                                                                                                                                                            |
| inneholderPersonsensitivInformasjon | Boolean        | Brukes for å gjøre mottaker oppmerksom på at dokumentet kan inneholde sensitiv informasjon                                                                |                                                                                                                                                                                                                                                            |


#### Lenke
| Felt      | Type   | Beskrivelse                            | Validering                                                                                      |
|-----------|--------|----------------------------------------|-------------------------------------------------------------------------------------------------|
| urlLenke  | String | Selve lenken til dokument/nettside     | Må være utfylt og være i gyldig lenke format, altså (http/https/ftp)://(nettside).(com/no/ etc) |
| urlTekst  | String |                                        | Må være utfylt                                                                                  |
| ledeTekst | String | Teksten som kommer før lenken i brevet |                                                                                                 |

#### SignaturType
| Verdi                | Beskrivelse |
|----------------------|-------------|
| AUTENTISERT_SIGNATUR |             | 
| AVANSERT_SIGNATUR    |             | 

#### Entry
| Felt  | Type   | Beskrivelse | Validering |
|-------|--------|-------------|------------|
| key   | String |             |            |
| value | String |             |            |


#### Leveringsmetode
| Verdi                                             | Beskrivelse                                                                                                       |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| STANDARD_SVARUT_LEVERANSE                         | Standard leveringsmetode og vil oppføre seg på samme måte som om feltet kunDigitalLevering var satt til usann     | 
| KUN_DIGITAL_UTEN_LEVERANSEGARANTI                 | Vil avvise forsendelser til privatpersoner dersom KRR ikke finner vedkommende eller vedkommende har reservert seg |
| KUN_DIGITAL_UTEN_LEVERANSEGARANTI_MASSEUTSENDELSE | Vil oppføre seg på samme måte som om feltet kunDigitalLevering var satt til sann                                  |

#### Signeringsstatus
| Verdi               | Beskrivelse |
|---------------------|-------------|
| AVVIST_AV_SVARUT    |             | 
| VENTER_SIGNERING    |             | 
| SIGNERT_AV_MOTTAKER |             | 
| AVVIST_AV_MOTTAKER  |             | 
| UTLOPT              |             |  


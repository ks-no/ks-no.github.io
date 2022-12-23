---
title: ForsendelsesServiceV10
date: 2018-05-11
---
### Tilgang

For å benytte web-tjenesten må en bruke HTTP Basic autentication med brukernavn(avsendernavn) og service-passord. Avsender opprettes av KS-SvarUt administrator/organisasjons administrator. Service-passordet genereres av avsender-ansvarlig via [konfigurasjon](https://svarut.ks.no/konfigurasjon/)-siden.

### Nytt i denne versjonen

* Ny operasjon: retrieveDokumentMetadata. Denne er lagt inn for å kunne hente ut informasjon om bl.a. hvor dokumentet kan lastes ned og eventuelt lenke til signeringsoppdrag.
* Endret operasjon: setForsendelseLestAvEksterntSystem. Denne er oppdatert til å ta imot objekt av type LestAv.
* Endret operasjoner: retrieveForsendelsesStatus og retrieveForsendelsesStatuser, begge returnerer nå samme modell-objekt (ForsendelsesStatus). Sistnevnte operasjon har pakket resultatet i en liste.
* Forsendelsesid og organisasjonsnummer er kapslet inn i egne typer.
* Modell-objektet StatusResult heter nå ForsendelsesStatus. Gamle ForsendelseStatus heter nå Status og blir returnert som en del av ForsendelsesStatus.
* Modell-objektet Brevpost er ikke lenger i bruk og er fjernet.
* Modell-objektet PrintKonfigurasjon heter nå UtskriftsKonfigurasjon.
* Alle modell-objektene er oppdatert til å bruke camelCase på felt og attributter.

## Tjenester

Forsendelsesservicet tilbyr følgende funksjonalitet:

| Operasjon                                       | Inndata                     | Utdata                            | Kort beskrivelse                                                                            |
|-------------------------------------------------|-----------------------------|-----------------------------------|---------------------------------------------------------------------------------------------|
| sendForsendelse                                 | Forsendelse                 | ForsendelsesId                    | Hovedtjeneste som sender inn forsendelse til ekspedering av KS-SvarUt.                      |
| sendForsendelseMedId                            | Forsendelse, ForsendelsesId | ForsendelsesId                    | Se sendForsendelse.                                                                         |
| startNyForsendelse                              |                             | ForsendelsesId                    | Genererer forsendelsesid som brukes sammen med sendForsendelseMedId.                        |
| retrieveForsendelsesStatus                      | ForsendelsesId              | ForsendelsesStatus                | Henter status for en forsendelse.                                                           |
| retrieveForsendelsesStatuser                    | List\<ForsendelsesId\>      | List\<ForsendelsesStatus\>        | Henter status for flere forsendelser.                                                       |
| retrieveForsendelsesHistorikk                   | ForsendelsesId              | ForsendelsesHistorikk             | Henter historikk for en forsendelse, tilsvarer ekspederingsloggen i forsendelsesoversikten. |
| retrieveSigneringsHistorikk                     | ForsendelsesId              | SigneringsHistorikk               | Henter signeringshistorikk (logg) på en forsendelse som er markert for signering.           |
| retrieveSigneringsHistorikkForFlereForsendelser | List\<ForsendelsesId\>      | List\<SigneringsHistorikk\>       | Henter signeringshistorikk for opp til 10 forsendelser.                                     |
| setForsendelseLestAvEksterntSystem              | LestAv                      |                                   | Benyttes for å sette status til lest når dokumentet har blitt lest utenfor vårt system.     |
| retreiveForsendelsesTyper                       |                             | Set\<String\>                     | Henter alle forsendelsestyper som kan brukes i SvarInn.                                     |
| retrieveMottakerSystemForOrgnr                  | OrganisasjonsNummer         | List\<MottakerForsendelsesTyper\> | Henter alle konfigurerte mottakersystem for orgnr.                                          |
| retrieveForsendelsesIderByEksternRef            | String                      | List\<ForsendelsesId\>            | Henter liste med forsendelseider som har denne eksternRef.                                  |
| retrieveDokumentMetadata                        | ForsendelsesId              | List\<DokumentMetadata\>          | Henter liste med informasjon om dokumentene til en forsendelse.                             |

Definisjonsfil (WSDL) for tjenesten finnes her https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV10?wsdl

### Operasjoner
#### sendForsendelse
Hovedtjeneste som sender inn forsendelse til ekspedering av KS-SvarUt.

SendForsendelse for ekspedering i SvarUt. Hvis du får HTTP 200 ok er forsendelsen er mottat og akseptert av SvarUt. Dette betyr at vi da vil garantere levering til mottaker (kunDigital har ikke garantert levering). Hvis det skulle oppstå problemer vil avsender bli kontaktet. Dette betyr at jobben til avleverende system nå er ferdig.

Feilmeldinger på tjeneste skal kunne presenteres for bruker. Det kan komme tekniske feilmeldinger, men da er disse greit å vise hvis de skal kontakte SvarUt for hjelp.

#### sendForsendelseMedId
Samme som sendForsendelse, men avsender setter forsendelsesid. Id må være av type UUID. Se sendForsendelse.

#### startNyForsendelse
Genererer forsendelsesid (UUID) som brukes sammen med sendForsendelseMedId.

#### retrieveForsendelsesStatus
Henter status for en forsendelse. Denne bør brukers når det er behov for å vise status. Tenkt brukt f.eks om saksbehandler lurer på hva som er status på forsendelsen. Status kan endre seg på kort varsel, vi anbefaler derfor å ikke mellomlagre disse verdiene i eget system, men heller hente de når de skal vises.

#### retrieveForsendelsesStatuser
Henter status for flere forsendelseer. Samme som retrieveForsendelseStatus bare for flere forsendelser i samme kall.

#### retrieveForsendelsesHistorikk
Henter historikk for en forsendelse. Returnerer en liste med beskrivelse av hva som har skjedd og når det inntraff. Listen tilsvarer ekspederingsloggen i forsendelsesoversikten. Tenkt brukt hvis saksbehandler eller kundestøtte trenger å vite detaljene om en forsendelse.

#### retrieveSigneringsHistorikk
Henter signeringshistorikk for en gitt forsendelse.

#### retrieveSigneringsHistorikkForFlereForsendelser
Samme som retrieveSigneringshistorikk bare for flere forsendelser i samme kall, opp til 10 forsendelser.

#### setForsendelseLestAvEksterntSystem
Setter status for en forsendelse til lest basert på forsendelsesId. Benyttes for å sette status til lest når dokumentet har blitt lest utenfor vårt system.

#### retreiveForsendelsesTyper
Henter alle forsendelsestyper som Svarinn-mottakersystem kan konfigureres til å bruke.

#### retrieveMottakerSystemForOrgnr
Henter mottakersystem som er konfigurert for orgnr. Kan brukes hvis en vil vite om mottaker har konfigurert SvarInn og til hvilket system det vil havne.

#### retrieveForsendelsesIderByEksternRef
Henter liste med forsendelseider som har denne eksternRef.

#### retrieveDokumentMetadata
Henter liste med informasjon om dokumentene til en forsendelse.

### Modeller
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
| kunDigitalLevering           | boolean                               | Vi leverer kun digitalt, ingen print og postlegging. Hvis dokumentet ikke kan leveres digital blir det ikke levert. Hvis KunDigitalLevering er valgt må fødselsnr eller orgnr være utfylt.                                                                                                                                                                                                          |                                                       |
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
| svarPaForsendelseLink        | boolean                               | Dersom dette feltet settes til true vil forsendelsen avvises om svarSendesTil ikke inneholder en gyldig adresse med organisasjonsnummer. Hvis forsendelsen aksepteres og sendes digitalt, vil det genereres en lenke hvor mottaker kan sende et svar tilbake til adressen spesifisert i svarSendesTil.                                                                                              |                                                       |
| signeringUtloper             | Date                                  | Angi hvor lenge signeringsoppdraget er gyldig, minimum 1 dag.                                                                                                                                                                                                                                                                                                                                       | Må angis ved signeringsforsendelser                   |
| signaturType                 | SignaturType                          | Velge mellom autentisert eller avansert signering.                                                                                                                                                                                                                                                                                                                                                  | Må angis ved signeringsforsendelser                   |

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
| Felt           | Type    | Beskrivelse                                       | Validering                                                         |
|----------------|---------|---------------------------------------------------|--------------------------------------------------------------------|
| mimeType       | String  |                                                   |                                                                    |
| filnavn        | String  |                                                   |                                                                    |
| kanSigneres    | Boolean | Bare en fil kan signeres og skal være av type PDF | Validerer at maks ett dokument pr forsendelse har flagget slått på |
| sizeInBytes    | Long    |                                                   |                                                                    |
| sha256hash     | String  |                                                   |                                                                    |
| dokumentType   | String  |                                                   |                                                                    |
| nedlasningsUrl | String  |                                                   |                                                                    |
| signeringsUrl  | String  |                                                   |                                                                    |

#### HendelsesLogg
| Felt      | Type   | Beskrivelse | Validering |
|-----------|--------|-------------|------------|
| tidspunkt | String |             |            |
| hendelse  | String |             |            |

#### SigneringsLogg
| Felt      | Type   | Beskrivelse | Validering |
|-----------|--------|-------------|------------|
| tidspunkt | String |             |            |
| type      | String |             |            |
| hendelse  | String |             |            |

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
| Felt                   | Type           | Beskrivelse                                                                                                                                               | Validering                                                                                                                                                                                                                                                 |
|------------------------|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| filnavn                | String         | Filnavn er for intern bruk, må være unikt i en forsendelse.                                                                                               | Max 226 tegn. Må ikke inneholde mappe, kun filnavn. (ingen / eller \) Disse tegnene er også ugyldige " < > ? * &#124; : De har andre funksjoner i windows og kan ikke brukes i filnavn på windows. Skiller ikke mellom store og små bokstaver i filnavnet. |
| mimeType               | String         | Mimetype på være application/pdf hvis den skal til print. Kun digital levering er valgt kan vi ta imot annet.                                             | Kun application/pdf hvis den skal til print                                                                                                                                                                                                                |
| skalSigneres           | Boolean        | Angir om dokumentet skal signeres                                                                                                                         | Bare et dokument kan signeres og må være av type PDF                                                                                                                                                                                                       | 
| dokumentType           | String         | Fritekstfelt som kan brukes til å fortelle noe om dokumentTypen til feltet. Kan brukes til noark4 dokumenttyper                                           |                                                                                                                                                                                                                                                            |
| data                   | DataHandler    | Fildata                                                                                                                                                   |                                                                                                                                                                                                                                                            |
| giroarkSider           | Set<\Integer\> | Liste med sidetall som skal printes på gult giroark. Digital versjon vil få grått giroark. Første side er 1.                                              |                                                                                                                                                                                                                                                            |
| ekskluderesFraUtskrift | Boolean        | Dette dokumentet blir ikke med i utskrift av forsendelsen. Brukes til filer som kun er interessant for digital levering. F.eks xml, video eller lyd filer |                                                                                                                                                                                                                                                            |

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




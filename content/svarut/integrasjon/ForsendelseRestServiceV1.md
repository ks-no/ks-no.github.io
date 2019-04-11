---
title: ForsendelseRestServiceV1
date: 2019-04-11
---
### Tilgang

For å benytte web-tjenesten må en bruke HTTP Basic autentication med brukernavn(avsendernavn) og service-passord. Avsender opprettes av KS-SvarUt administrator/organisasjons administrator. Service-passordet genereres av avsender-ansvarlig via [konfigurasjon](https://svarut.ks.no/konfigurasjon/)-siden.

### Nytt i denne versjonen

*Erstatter Soap servicen.

## Tjenester

Forsendelsesservicet tilbyr følgende funksjonalitet:

baseurl: /tjenester/api/forsendelse/v1

| Url                                       | Method     | Innput                | Utdata                         | Kort beskrivelse                                                                            |
| ---------------------------------|--------- | --------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------- |
| /sendForsendelse                    |POST            | Forsendelse                 | ForsendelsesId                    | Hovedtjeneste som sender inn forsendelse til ekspedering av KS-SvarUt.                      |
| /startNyForsendelse                  |POST           |                             | ForsendelsesId                    | Genererer forsendelsesid som brukes sammen med sendForsendelseMedId.                        |
| /{id}/sendForsendelse                |POST           | Forsendelse, ForsendelsesId | ForsendelsesId                    | Se sendForsendelse.                                                                         |
| /{id}/status                         |GET           | ForsendelsesId              | ForsendelsesStatus                | Henter status for en forsendelse.                                                           |
| /{id}/dokuemntMetadata             |GET           | ForsendelsesId              | List\<DokumentMetadata\>          | Henter liste med informasjon om dokumentene til en forsendelse.                             |
| /{id}/historikk                   |GET    | ForsendelsesId              | ForsendelsesHistorikk             | Henter historikk for en forsendelse, tilsvarer ekspederingsloggen i forsendelsesoversikten. |
| /{id}/signeringhistorikk          |GET          | ForsendelsesId              | SigneringsHistorikk               | Henter signeringshistorikk (logg) på en forsendelse som er markert for signering.           |
| /{id}/settLest                |POST              | LestAv                      |                                   | Benyttes for å sette status til lest når dokumentet har blitt lest utenfor vårt system.     |
| /statuser                            |POST    | List\<ForsendelsesId\>      | List\<ForsendelsesStatus\>        | Henter status for flere forsendelser.                                                       |
| /forsendelseTyper      |GET                 |                             | List\<String\>                     | Henter alle forsendelsestyper som kan brukes i SvarInn.                                     |
| /mottakersystem/{orgnr}  |GET                | OrganisasjonsNummer         | List\<MottakerForsendelsesTyper\> | Henter alle konfigurerte mottakersystem for orgnr.                                          |
| /eksternref/{eksternref}         | String                      | List\<ForsendelsesId\>            | Henter liste med forsendelseider som har denne eksternRef.                                  |


Klientbibliotek laget i java finnes her: https://github.com/ks-no/svarut-rest-klient

### Modeller
Datamodellene for rest servicen, finne si json spec i java klient biblioteket: https://github.com/ks-no/svarut-rest-klient/tree/master/svarut-rest-klient/json
Disse json spec filene kan brukes av alle. De blir løpende oppdatert om vi legge til nye felt, og de kan få bedre validering etter hvert, som vi oppdager mangler.


### VIKTIG!
/sendForsendelse bør ha readtimeout på 16min. SvarUT har Timeout på 15min. SvarUt kan ta i mot ganske store filer, derfor er denne timeouten så høg. 

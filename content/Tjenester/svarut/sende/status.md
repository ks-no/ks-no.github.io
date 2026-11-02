---
title: Status
description: "Alle statuser i status-API v3, og hva de betyr."
weight: 20
---

En forsendelse går gjennom flere statuser fra den blir mottatt til den har nådd sin endelige status, dette kan for eksempel være at det er lest, printet eller ikke kan leveres til mottakeren. Hent status for en forsendelse med `POST /v3/kontoer/{kontoId}/forsendelser/status/sok` ([spesifikasjon](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-status-api-v3.json)). Du kan spørre om flere forsendelser i samme kall.

![Statusreisen: alle 18 statuser i REST v3 og overgangene mellom dem](/images/svarut/SvarUt-statusreisen.png)

## Alle statuser

| Status | Betyr | Endelig? |
|---|---|---|
| `MOTTATT` | SvarUt har tatt imot forsendelsen og gitt den en id. | Nei |
| `AKSEPTERT` | Forsendelsen er validert, og brevet er laget. | Nei |
| `AVVIST` | SvarUt avviste forsendelsen, for eksempel fordi metadata eller dokumenter ikke er gyldige. | Ja |
| `FEILET_UNDER_MOTTAK` | Noe feilet hos SvarUt under mottak. Send forsendelsen på nytt, eller kontakt brukerstøtte om det skjer igjen. | Ja |
| `KLAR_FOR_MOTTAK` | Forsendelsen ligger klar for henting i et SvarInn-mottakersystem. | Nei |
| `SENDT_SDP` | Sendt til digital postkasse (Digipost eller e-Boks). | Nei |
| `LEVERT_SDP` | Digital postkasse har bekreftet levering. | I praksis ja. Kan bli `LEST`. |
| `SENDT_ALTINN` | Sendt til Altinn. | Nei |
| `LEVERT_ALTINN` | Publisert i Altinn. | Nei |
| `SENDT_NHN_MOTTAKER` | Sendt til Norsk Helsenett. Mottakeren har ikke bekreftet ennå. | Nei |
| `LEVERT_NHN_MOTTAKER` | Mottakeren i Norsk Helsenett har bekreftet mottak. | Ja |
| `SENDT_DIGITALT` | Sendt digitalt med `kunDigitalLevering`, men ikke lest ennå. | I praksis ja. Kan bli `LEST`. |
| `SENDT_PRINT` | Sendt til printleverandør. | Nei |
| `PRINTET` | Printleverandøren har bekreftet utskrift. | Ja |
| `LEST` | Mottakeren har lastet ned eller åpnet forsendelsen, eller SvarInn har kvittert. | Ja |
| `IKKE_LEVERT` | Forsendelsen var `kunDigitalLevering` og kunne ikke leveres digitalt. Dette kan vere fordi mottaker ikke finnes i Kontaktregisteret, har reservert seg mot digital post eller ikke har oppdatert kontaktinformasjonen siste 18 måneder. | Ja |
| `MANUELT_HANDTERT` | Forsendelsen er håndtert manuelt via SvarUt GUI. Kan skje når som helst. | Ja |
| `SLETTET` | Filer og metadata som ikke trengs til statistikk og fakturering, er slettet. Kan skje når som helst. | Ja |

Når en kanal feiler, prøver SvarUt neste kanal. Eksempel på dette: 
* Forsendelsen har hatt status SENDT_SDP, men deretter får SvarUt en kvittering fra Digipost eller e-Boks om at varsling feilet. SvarUt prøver deretter neste kanal, som er Altinn.
* Forsendelsen har hatt status LEVERT_ALTINN, men mottakeren har ikke lest forsendelsen innen lesefristen. SvarUt prøver da neste kanal, som er print.

## Hendelser

Status forteller hvor forsendelsen er nå. Hendelsesloggen forteller hva som har skjedd underveis, for eksempel hvorfor den gikk til print. Hent den med `GET /v2/forsendelser/{forsendelseId}/hendelser` ([spesifikasjon](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/forsendelse-hendelser-api-v2.json)). Loggen er den samme som ekspederingsloggen i SvarUt-portalen.

## Hvor ofte skal jeg spørre?

Vi anbefaler å spørre om status for flere forsendelser i samme kall, og spør sjeldnere jo eldre forsendelsen er. Slutt å spørre når forsendelsen har en endelig status.

## Fra status v2 til v3

Status v3 har fått flere nye statuser enn hva tidligere API'er har hatt, så om dere for eksempel går fra v2 til v3, må dere håndtere disse:

| Status i v3 | Status i v2 |
|---|---|
| `FEILET_UNDER_MOTTAK` | `AVVIST` |
| `SLETTET` | `AVVIST` |
| `SENDT_ALTINN` | `VARSLET` |
| `LEVERT_ALTINN` | `VARSLET` |
| `SENDT_NHN_MOTTAKER` | `VARSLET` |
| `LEVERT_NHN_MOTTAKER` | `LEST` |

De andre statusene er like i v2 og v3.

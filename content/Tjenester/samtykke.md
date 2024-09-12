---
title: Fiks samtykke
date: 2024-09-12
alias: [/fiks-plattform/tjenester/samtykke/]
---

## Kort beskrivelse

Fiks samtykke er en løsning laget for Norges innbyggere for å kunne ta stilling til ulike samtykker. Løsningen består av en web-portal brukt av innbyggere til å ta stilling til samtykke og et API for eksterne fag-system brukt saksbehandlere til å opprette og endre samtykker.

Første iterasjon av denne tjenesten omfatter samtykker knyttet til Barnevern, og det er den løsningen som i hovedsak beskrives her.

## Tilgjengelige grensesnitt
| Grensesnitt | Støtte |
|------|------|
| Web portal | Ja |
| Maskin til maskin | Ja |

## Beskrivelse av api
### Statuser
Det er to typer statuser som er definert i samtykke-løsningen. En overordnet samtykkeStatus per samtykke og en samtykkeSvarStatus per part.

#### SamtykkeStatus
SamtykkeStatus kan være følgende verdier:
- SAMTYKKET("Samtykket"): Forteller at alle partene for et samtykke har samtykket.
- TRUKKET ("Trukket"): Forteller at minst en part tilknyttet et samtykket har trukket samtykket.
- IKKE_SAMTYKKET("IkkeSamtykket"): Forteller at minst en part tilknyttet samtykket har avslått samtykket.
- VENTER_PAA_SVAR("VenterPaaSvar"): Forteller at det er minst en part som fortsatt har status "VenterPaaSvar" tilknyttet samtykket
- SVARFRIST_PASSERT("SvarfristPassert"): Forteller at svarfristen er passert.
- UTLOPT("Utlopt"): Forteller at samtykket har utløpt.

#### SamtykkeSvarStatus
SamtykkeSvarStatus kan være følgende verdier:
- VENTER_PAA_SVAR("VenterPaaSvar"): Forteller at part ikke har tatt stilling til samtykket.
- SAMTYKKET ("Samtykket"): Forteller at part har samtykket.
- IKKE_SAMTYKKET("IkkeSamtykket"): Forteller at part har avslått samtykket.
- TRUKKET("Trukket"): Forteller at part har trukket samtykket.

### Ekstern-api
#### [api-spec](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/samtykke-ekstern-api-v1.json)
#### POST /opprettSamtykke
Et samtykke opprettes av saksbehandler i fagsystem via API. I denne requesten sendes informasjon om samtykket, tilhørende mappe, saksbehandler og involverte personer.
Vær oppmerksom på flagget "harTilgangTilInnbyggerTjenester" som styrer om innbygger skal kunne se samtykket i web-portal eller ikke.
Dette api-endepunktet returnerer en nyopprettet SamtykkeId (UUID)

#### PUT /endreSamtykke/{samtykkeId}
En saksbehandler kan endre et samtykke. Ptt er det svarfrist og utløpsdato som kan endres via dette endepunktet. 
Det er ingen validering på disse datoene mot hverandre eller bakover i tid verken ved opprettelse eller endring på vår side grunnet behov for opprettelse av historiske samtykker.

#### GET /samtykkeHistorikk/{samtykkeId}
Et fagsystem kan hente samtykkeHistorikk for et samtykke. Dette gir en oversikt over alle endringer som er gjort på samtykket.

#### PUT /oppdaterSamtykkeStatusForPart/{samtykkeId}
Dette endepunktet brukes for å oppdatere status for en part i et samtykke. Dette kan være tilfeller der en part ikke har tilgang til innbyggertjenester eller der en part ønsker å utføre en handling som ikke støttes i web-portal og må ta kontakt med saksbehandler.
Reglene for hvilke handlinger som kan utføres er friere enn i web-portalen for innbyggere.

##### Matrise for regler vedrørende endring av samtykke-status for part
| Nåværende/Neste | Samtykket | Ikke samtykket | Venter på svar | Trukket |
|-----------------|-----------|----------------|----------------|---------|
| Samtykket       | Nei       | Nei            | Ja             | Ja      |
| Ikke samtykket  | Ja        | Nei            | Ja             | Nei     |
| Venter på svar  | Ja        | Ja             | Nei            | Nei     |
| Trukket         | Ja        | Nei            | Ja             | Nei     |

Altså:
- Ingen statuser kan endres til samme status.
- "Samtykket" kan endres tilbake til "Venter på svar" eller til "Trukket", men ikke til "Ikke samtykket" siden den statusen innebærer at part ikke har samtykket fra før.
- "Ikke samtykket" kan endres rett til "Samtykket" eller "Venter på svar", men ikke til "Trukket" siden den statusen innebærer at part først har samtykket.
- "Venter på svar" kan endres til "Samtykke" eller "Ikke samtykket", men ikke til "Trukket" siden den statusen innebærer at part først har samtykket.
- "Trukket" kan endres til "Samtykket" eller "Venter på svar", men ikke til "Ikke samtykket" siden den statusen innebærer at part ikke har samtykket.

#### PUT /endreInnbyggertjenesteTilgangForPart/{samtykkeId}
Dette endepunktet brukes av en saksbehandler for å endre tilgang til innbyggertjenester for en part i et samtykke. 

### Intern-api
#### [api-spec](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/samtykke-intern-api-v1.json)
#### POST /aksepterSamtykke/
Dette endepunktet brukes av innbygger for å akseptere et samtykke. Dette endepunktet er kun tilgjengelig for innbyggere med tilgang til innbyggertjenester.
Merk at denne handlingen kun kan utføres for et samtykke med status "Venter på svar".

#### POST /trekkSamtykke/
Dette endepunktet brukes av innbygger for å trekke et samtykke. Dette endepunktet er kun tilgjengelig for innbyggere med tilgang til innbyggertjenester.
Merk at denne handlingen kun kan utføres for et samtykke med status "Samtykket".

#### GET /hentSamtykke/{samtykkeId}
Dette endepunktet brukes for å hente et samtykke. Dette endepunktet er kun tilgjengelig for innbyggere med tilgang til innbyggertjenester.

#### GET /hentSamtykkerForSak/{dokumentId}
Dette endepunktet brukes for å hente samtykker for en sak. Dette endepunktet er kun tilgjengelig for innbyggere med tilgang til innbyggertjenester.

### Konfigurasjon-api
#### [api-spec](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/samtykke-konfigurasjon-api-v1.json)
#### POST /opprettTilgang
Dette endepunktet benyttes av en administrator for å opprette tilgang til en organisasjon mot samtykke-ekstern-api.
Det returneres en integrasjonsId som brukes for å autentisere mot API-et med tilhørende passord.

## Diverse
- linker
  - Base-path innbygger-api dev: ``https://forvaltning.fiks.dev.ks.no/samtykke/api/v1/innbygger/``
  - Base-path innbygger-api test: ``https://forvaltning.fiks.test.ks.no/samtykke/api/v1/innbygger/``
  - Base-path innbygger-api prod: ``https://forvaltning.fiks.ks.no/samtykke/api/v1/innbygger/``
  - Base-path ekstern-api dev: ``https://api.fiks.dev.ks.no/samtykke/api/v1/ekstern/``
  - Base-path ekstern-api test: ``https://api.fiks.test.ks.no/samtykke/api/v1/ekstern/``
  - Base-path ekstern-api prod: ``https://api.fiks.ks.no/samtykke/api/v1/ekstern/``  
  - Base-path innbygger-api dev: ``https://forvaltning.fiks.dev.ks.no/samtykke/api/v1/konfigurasjon/``
  - Base-path innbygger-api test: ``https://forvaltning.fiks.test.ks.no/samtykke/api/v1/konfigurasjon/``
  - Base-path innbygger-api prod: ``https://forvaltning.fiks.ks.no/samtykke/api/v1/konfigurasjon/``
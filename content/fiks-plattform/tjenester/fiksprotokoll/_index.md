---
title: Fiks Protokoll (Test)
date: 2022-07-05
aliases: [/fiks-platform/tjenester/fiksprotokoll]
---

Fiks Protokoll er en meldingstandard for meldinger som sendes over [Fiks IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksprotokoll/fiksio), for sikker maskin-til-maskin integrasjon

### Hvordan tar man i bruk Fiks Protokoll?
Fiks protokoll administreres i Fiks Forvaltning og via API.
![fiks protokoll](https://ks-no.github.io/fiks-plattform/images/forvaltning-protokoll-system-create.png "Opprett system")

Når system er opprettet, kan kontoer og tilganger administreres i Fiks forvaltning, og API.
API autorisering skjer på fiks plattformen med et access token fra Maskinporten basert på organisasjonesn virksomhetssertifikat som beskrevet under [Integrasjonsutvikling](https://ks-no.github.io/fiks-plattform/integrasjoner/).

Bruk integrasjonsid og integrasjonspassord som blir opprettet under opprettelse av Protokoll System.

[Fiks Protokoll API] (https://editor.swagger.io/?url=https://ks-no.github.io/api/fiks-protokoll-konfigurasjon-api-v1.json)

Etter at Fiks Protokoll er satt opp, benyttes [Fiks IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksprotokoll/fiksio) for meldingsutveksling.

### Fiks Protokoll Konto
Konto opprettes i forvaltning eller via API.
Når konto opprettes må en ha tilgjengelig offentlig nøkkel i PEM format. Denne benyttes for kryptering av meldinger som skal mottas.
Forvalting:
![fiks protokoll](https://ks-no.github.io/fiks-plattform/images/forvaltning-protokoll-system-create.png "Opprett system")

API:
`POST /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}/kontoer`
Payload:
```json
{
  "navn": "Arkivsystem",
  "beskrivelse": "Arkivsystem beskrivelse",
  "stottetProtokollNavn": "	no.ks.fiks.arkiv",
  "stottetProtokollVersjon": "v1",
  "part": "arkiv.levenrandor",
  "offentligNokkel": "......"
}
```

### Tilganger

### Be om tilgang til system
En kan legge inn forespørsel om tilgang til konto, for system. Ved hjelp av API. Dette er ikke ferdig implementert i forvaltning.

`POST {fiksOrgId}/systemer/{systemId}/forespurteTilganger/{eksternKonto}`
- fiksOrgId: Fiks organisasjon Id
- systemId: System ID som forespør tilgang
- eksternKonto: Konto en ønsker tilgang til


### Gi tilgang til system
Tilganger tildeles Protokoll system fra konto. Konto kan gi annet system tilgang til å sende meldinger til konto en oppretter tilgang fra. 

Når system opprettes vil systemet kun være synlig for kontoer under egen organisasjon. Dersom systemet skal være synlig for kontoer utenfor egen organisasjon, må _Tilgjengelig for andre organisasjoner_ slås på.

Forvaltning:
Velg konto under system. Velg _Søk etter systemer_. Når ønsket system er funnet, velg _Gi tilgang_.

API:
`POST /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}/kontoer/{kontoId}/tilganger/{eksternSystemId}`
- fiksOrgId: Fiks organisasjon Id
- systemId: System ID som er eier av konto _kontoId_
- kontoId: Konto som system _eksternSystemId_ skal få tilgang til
- eksternSystemId: System Id som skal gis tilgang til konto med id _kontoId_

Tilsvarende for å fjerne tilgang
`DELETE /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}/kontoer/{kontoId}/tilganger/{eksternSystemId}`

#### Sende meldinger på konto 
Benytt [Fiks IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksprotokoll/fiksio) når meldinger skal sendes på konto.
Dette er IDen til kontoen og er den samme som den tilhørende Fiks IO-kontoen. ID brukes når systemet skal sende meldinger fra kontoen, og når andre systemer skal sende meldinger til kontoen.

* _Fiks-IO java klient_: [Java klient](https://github.com/ks-no/fiks-io-klient-java) som tilbyr funksjonalitet for å bygge, signere, kryptere, og sende meldinger som ASiC-E pakker, samt mottak og dekryptering på andre siden.
* _Fiks-IO .net klient_: [.net core](https://github.com/ks-no/fiks-io-client-dotnet) implementasjon av samme funksjonalitet som klienten over.


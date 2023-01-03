---
title: Fiks protokoll 
date: 2022-07-05
aliases: [/fiks-platform/tjenester/fiksprotokoll]
---
Fiks protokoll er en tjenestegruppe som inneholder flere tjenester. Felles for disse tjenestene er at de gjelder meldinger som sendes over [Fiks IO](https://ks-no.github.io/tjenester/fiksprotokoll/fiksio), for sikker maskin-til-maskin integrasjon. 
Tjenestene består både av et sett av protokoller med meldingstyper, f.eks. Fiks Arkiv og Fiks Plan, og et miljø for å administrere systemer som implementerer disse protokollene over Fiks IO.

# Tjenester under Fiks protokoll 
{{% children style="h5" depth="1" description="true" %}}

# Termer
* Protokollsystem - Representerer et system som skal sende og motta meldinger over Fiks Protokoll. Dette vil være et arkiv, et fagsystem som skal arkivere, en matrikkelklient etc. Merk: Et system kan bruke flere protokoller, f.eks. både Fiks Arkiv og Fiks Plan.
* Protokollkonto - Et protokollsystem kan ha flere protokollkontoer. En protokollkonto er en Fiks IO-konto som er en part i en protokoll. F.eks: 
  * En konto i et arkiv, som støtter arkivering og søk
  * En konto i et fagsystem som skal søke i et arkiv
  * En konto i eByggesak som skal matrikkelføre
* Protokoll - Definisjon av en spesifikk protokoll, med meldingstyper og parter. F.eks. no.ks.fiks.arkiv.v1 og no.ks.fiks.plan.v1 
* Meldingstype - Meldinger som sendes må ha en meldingstype. Gyldige meldingstyper defineres av protokollen, og vil typisk måtte følge meldingsskjema definert i enten xsd eller json skjema. 
* Protokollpart - Meldinger i Fiks Protokoll sendes mellom parter av protokollen. F.eks. fagsystem og arkiv, eller eByggesak og matrikkelklient. Noen protokollen vil definere mer spesifike parter, som no.ks.fiks.arkiv.v1.arkiv.arkivering og no.ks.fiks.arkiv.v1.fagsystem.arkivering som henholdsvis kan ta imot og sende arkiveringsmeldinger, men ikke tillater søk.
* Integrasjon - På Fiks Plattformen brukes integrasjoner for maskinpålogging sammen med maskinporten. Hvert system får opprettet en integrasjon som brukes for alle kontoer under systemet. Integrasjonen vil kunne sende og motta meldinger, og dersom valgt, vil også kunne konfigurere systemet og opprette nye kontoer. [Les mer her](https://ks-no.github.io/felles/integrasjoner/)
* Fiks IO - Dette er kanalen som brukes for å sende meldinger i Fiks Protokoll.  [Les mer her](https://ks-no.github.io/tjenester/fiksprotokoll/fiksio)
* Fiks IO-konto - Meldinger sendes og mottas over Fiks IO med en Fiks IO-konto. Fiks IO-kontoen har samme ID som protokollkontoen. Protokollkontoen er wrapper rundt Fiks IO-kontoen for å muliggjøre tilgangsstyring i Fiks Protokoll, og validering av meldinger.


# Hvordan tar man i bruk Fiks Protokoll?
Først må Fiks Protokoll-tjenesten tas i bruk for kommunen og avtale må underskrives. Dette må gjøres av administrator i Fiks Organisasjonen (typisk kommunen).

Deretter må det opprettes et system i Fiks Protokoll. Dette må gjøres i grensesnittet i Fiks Forvaltning av en administrator på Fiks Protokoll (dvs. en administrator i Fiks Organisasjonen, eller personer som er blitt gitt administratortilgang på Fiks Protokoll).

![fiks protokoll](./images/forvaltning-protokoll-system-create.png "Opprett system")

Merk at det sammen med systemet opprettes en tilhørende integrasjon som skal brukes til å sende og motta meldinger over [Fiks IO](https://ks-no.github.io/tjenester/fiksprotokoll/fiksio)

Et system kan settes opp til å konfigureres av integrasjon. Da vil den tilhørende integrasjonen få tilgang til å administrere systemet og vil kunne gjøre det samme som en administrator kan gjøre på Fiks Forvaltning (med visse unntak som sletting av system og resetting av passord)

APIet for konfigurering med integrasjon er definert her: [Fiks Protokoll API](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json)

# Fiks Protokoll Konto
Konto opprettes i forvaltning eller via API.
Når konto opprettes må en ha tilgjengelig offentlig nøkkel i PEM format. Denne benyttes for kryptering av meldinger som skal mottas.
Forvalting:
![fiks protokoll](./images/forvaltning-protokoll-system-konto-create.png "Opprett system")

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

# Tilganger
Merk: Tilgangsstyringen er ikke implementert i Fiks IO ennå i Test, så reglene beskrevet under blir per nå ikke håndhevet. Men det vil komme før løsninger går ut i produksjon

## Gi tilgang til system
Tilganger tildeles Protokoll system fra konto. Konto kan gi annet system tilgang til å sende meldinger til konto en oppretter tilgang fra. 

Når system opprettes vil systemet kun være synlig for kontoer under egen organisasjon. Dersom systemet skal være synlig for kontoer utenfor egen organisasjon, må _Tilgjengelig for andre organisasjoner_ slås på. (Per nå kun mulig via API)

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

## Be om tilgang til system
En kan legge inn forespørsel om tilgang til konto, for system. Ved hjelp av API. Dette er ikke ferdig implementert i forvaltning.

`POST {fiksOrgId}/systemer/{systemId}/forespurteTilganger/{eksternKonto}`
- fiksOrgId: Fiks organisasjon Id
- systemId: System ID som forespør tilgang
- eksternKonto: Konto en ønsker tilgang til

Tilsvarende for å fjerne forespørsel

`DELETE {fiksOrgId}/systemer/{systemId}/forespurteTilganger/{eksternKonto}`



Merk: Søk etter systemer er ikke implementert ennå, så det kan være vanskelig å finne systemer å be om tilgang til

## Kontoer et system kan sende meldinger til
Hvilke kontoer et system kan sende meldinger til finnes på system-responsen fra `GET /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}`. Der vil `tilgangTilKontoer` ha en liste over kontoer (`EksternProtokollKontoResponseEksternProtokollKontoResponse`) systemet kan sende meldinger til.
Kun kontoer som er parter fra samme protokoll (samme navn og versjon) og som er støttet part (er i listen av stottedeParter hos motaker) som kan sende meldinger til hverandre. Dersom et system ikke ha en konto som er støttet part, så må en slik konto opprettes før meldinger kan sendes. 

Definisjon av `EksternProtokollKontoResponseEksternProtokollKontoResponse`:
```json
{
  "id": "ID på kontoen. Det er denne IDen Fiks IO skal sende til",
  "navn": "Navn på konto",
  "beskrivelse": "Beskrivelse av konto",
  "part": {
    // Definerer parten som kontoen implementerer
    "navn": "Navn på part (f.eks. arkiv.full)",
    "beskrivelse": "Beskrivelse av parten",
    "protokollnavn": "Navn på protokoll (f.eks. no.ks.fiks.arkiv)",
    "protokollversjon": "Protokollversjon (f.eks. v1)",
    "avsenderMeldingstyper": [
      // Liste av meldingstyper kontoen støtter å sende
    ],
    "mottakerMeldingstyper": [
      // Liste av meldingstyper kontoen støtter å motta
    ],
    "stottedeParter": [
      // Liste av parter som kan sende meldinger til kontoen.
    ]
  },
  "system": {
    // Beskrivelse av systemet som eier kontoen
  }
}
```


# Sende meldinger på konto 
Benytt [Fiks IO](https://ks-no.github.io/tjenester/fiksprotokoll/fiksio) når meldinger skal sendes på konto.
Dette er IDen til kontoen og er den samme som den tilhørende Fiks IO-kontoen. ID brukes når systemet skal sende meldinger fra kontoen, og når andre systemer skal sende meldinger til kontoen.

* _Fiks-IO java klient_: [Java klient](https://github.com/ks-no/fiks-io-klient-java) som tilbyr funksjonalitet for å bygge, signere, kryptere, og sende meldinger som ASiC-E pakker, samt mottak og dekryptering på andre siden.
* _Fiks-IO .net klient_: [.net core](https://github.com/ks-no/fiks-io-client-dotnet) implementasjon av samme funksjonalitet som klienten over.


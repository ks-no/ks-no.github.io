---
title: 1. Huskeliste før man starter å sette opp protokoll
date: 2022-09-23
alias: [/fiks-plattform/tjenester/fiksprotokoll/brukerveiledning/huskeliste]
---

## Hvorfor

Før man begynner på arbeidet med å sette opp Fiks Protokoll er det lurt å sjekke at man har alt man trenger og personer med riktig tilgang tilgjengelig.

## Personer

### Person fra kunden
Det må være en person fra kundeorganisasjonen (kommunen) som skal opprette protokoll system/konto, og som da kan logge seg på Fiks forvaltning og gjøre minstekravet for oppsett.
Minstekravet for oppsettet er å få opprettet et *"system"* hvis leverandør(ene) setter opp resten via API. Se mer om dette lenger nede.

Denne personen må ha rettighet til å:
* Signere avtale for bruk av Fiks protokoll hvis ikke dette er gjort tidligere
* Tilgang til Fiks protokoll som tjeneste i Fiks Forvaltning. 

### Person(er) fra leverandør/tjenestetilbyder
Det bør være en person for hver leverandør/tjenestetilbyder som kan hjelpe til med eventuelle mangler og som har tilgang til ressurser som trengs.
Se huskelisten lenger nede for hvilke ressurser det gjelder. 

## Huskeliste

### 1. Maskinporten
Leverandør(ene) skal ha satt opp integrasjon med Maskinporten med **sitt** organsiasasjonsnummer på forhånd. Dette organsiasjonsnummeret skal brukes i oppsett av *"system"*

### 2. Avtale om å bruke Fiks Protokoll
Person fra kundeorganisasjon oppretter avtale om bruk av Fiks protokoll hvis ikke dette er gjort tidligere.

### 3. Opprette *"system"* under Fiks Protokoll
Person fra kundeorganisasjon oppretter *"system"* og bruker organisasjonsnummer til leverandøren (se punkt 1) som leverandøren har registrert hos Maskinporten. Dette organisasjonsnummeret må man ha klart til oppsett.
*"Systemet*" blir da et system for leverandøren som kan inneholder protokoll-kontoer for flere forskjellige protokoller. Et godt navn på *"system"* kan være leverandørens navn pluss eventuelt leverandørens navn på applikasjon, eller internt navn i organisasjonen på systemet.

#### 3.1 Skal *"system"* støtte API?
Leverandør(ene) må ha avklart på forhånd om *"systemet"* som settes opp for dem skal støtte å bruke API. Dette er et valg man må gjøre under oppsett av *"system"* 

### 4. Dele integrasjonsid og passord
Når *"system*" er opprettet skal integrasjonsid og integrasjonspassord som man får i oppsettet deles med leverandøren på en sikker måte. Hvordan dette kan deles på en sikker måte bør man ha klarert på forhånd.

Hvis leverandør skal bruke API for resten av oppsett er man ferdig, hvis ikke se videre i huskelisten

### 5. Gyldig generert public key
Når man setter opp en *"protokoll-konto"* i forvaltningssidene  må leverandøren ha gjort klar en public-key som man har generert på forhånd i korrekt format. Dette må personen fra kundeorganisasjon ha fått slik at man kan laste det opp i forvaltningssidene. 

### 6. Valg av protokoll og part
Leverandør(ene) har klart hvilken protokoll og hvilken *"part*" sin side skal være i kommunikasjonen

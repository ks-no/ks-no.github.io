---
title: Veiledning 1 - Huskeliste før man starter å sette opp protokoll
date: 2022-09-23
alias: [/fiks-plattform/tjenester/fiksprotokoll/brukerveiledning/huskeliste]
---

## Hvorfor

Før man begynner på arbeidet med å sette opp Fiks Protokoll er det lurt å sjekke at man har alt man trenger og personer med riktig tilgang tilgjengelig.

## Personer

### Person fra kunden
Det må være en person fra kundeorganisasjonen (kommunen) som skal opprette protokoll system/konto, og som da kan logge seg på Fiks forvaltning og gjøre minstekravet for oppsett.
Minstekravet for oppsettet er å få opprettet et *"system"* hvis leverandør(ene) setter opp resten via API. Se mer om dette lenger nede.

Person fra kundeorganisasjon må da på forhånd ha registrert brukerkonto på Fiks plattformen slik at det kun er å logge inn.

Denne personen må også ha rettighet og tilgang til å:
* Signere avtale for bruk av Fiks protokoll hvis ikke dette er gjort tidligere
* Tilgang til Fiks protokoll som tjeneste i Fiks Forvaltning. 

### Person(er) fra leverandør/tjenestetilbyder
Det bør være en person for hver leverandør/tjenestetilbyder som kan hjelpe til med eventuelle mangler og som har tilgang til ressurser som trengs.
Se huskelisten lenger nede for hvilke ressurser det gjelder. 

## Huskeliste

### 1. Maskinporten
Leverandør(ene) skal ha satt opp integrasjon med Maskinporten på forhånd. 
Her kan man velge å enten bruke leverandøren sitt organisasjonsnummer med leverandørens virksomhetssertifikat, eller kunden (kommunen) sitt organisasjonsnummer med kundens virksomhetssertifikat. 
Det samme organsiasjonsnummeret som man velger å bruke **må** brukes i oppsett av *"system"* i FIKS forvaltning. Se mer om dette i punkt 3.

### 2. Avtale om å bruke Fiks Protokoll
Person fra kundeorganisasjon oppretter avtale om bruk av Fiks protokoll hvis ikke dette er gjort tidligere.

### 3. Opprette *"system"* under Fiks Protokoll
Person fra kundeorganisasjon oppretter *"system"* og bruker det samme organisasjonsnummeret som ble brukt i maskinporten integrasjonen og i det tilhørende virksomhetssertifikatet  (se punkt 1). Dette organisasjonsnummeret må man ha klart til oppsett.
*"Systemet*" blir da et system for leverandøren som kan inneholder protokoll-kontoer for flere forskjellige protokoller. 

Et godt valg av navn på *"system"* er leverandørens navn pluss eventuelt leverandørens navn på applikasjon, eller internt navn i organisasjonen på systemet. 
Da er det lett å kjenne igjen og forstå hva det er i listen over systemer man etter hvert kan få.

#### 3.1 Skal *"system"* støtte API?
Leverandør(ene) må ha avklart på forhånd om *"systemet"* som settes opp for dem skal støtte å bruke API. Dette er et valg man må gjøre under oppsett av *"system"*. 

### 4. Dele integrasjonsid og passord
Når *"system*" er opprettet skal integrasjonsid og integrasjonspassord som man får i oppsettet deles med leverandøren på en sikker måte. Hvordan dette kan deles på en sikker måte bør man ha klarert på forhånd.

Hvis leverandør skal bruke API for resten av oppsett er man ferdig, hvis ikke se videre i huskelisten

### 5. Gyldig generert public key
Når man setter opp en *"protokoll-konto"* i forvaltningssidene  må leverandøren ha gjort klar en public-key som man har generert på forhånd i form av et X509 sertifikat lagret i .pem filformat.
Dette må personen fra kundeorganisasjon ha fått slik at man kan laste det opp i forvaltningssidene. 
Vi anbefaler at leverandøren deler filen slik at den kan lastes ned.

**Husk:** Ikke alle e-post kontoer godtar filformatene for public-key og deling via e-post anbefales dermed ikke.


### 6. Valg av protokoll og part
Leverandør(ene) har klart hvilken protokoll og hvilken *"part*" sin side skal være i kommunikasjonen

### 7. Gi tilgang
Man må huske å gi tilganger mellom kontoene. Det enkleste er å gjøre det fra "tjener" siden, søke opp og gi tilgang til "klient" kontoen slik at "klient" konto kan sende meldinger til "tjener" kontoen.
Alternativt kan man søke opp "tjener" kontoen man ønsker å sende meldinger til fra "klient" siden, og så be om å få tilgang. Men da må man inn på "tjener" siden igjen og bekrefte tilgangsforespørselen.

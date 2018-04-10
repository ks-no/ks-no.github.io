---
title: Integrasjonsutvikling
---

### Integrasjoner
Før eksterne systemer kan integreres med plattformen må det opprettes en integrasjon inne i konfigurasjonsgrensesnittet.
Integrasjonen bør gis et beskrivende navn, i tillegg til at organisasjonsnummeret som ligger i virksomhetssertifikatet som
skal brukes til å kalle tjenesten må skrives inn. Etter at integrasjonen er opprettet vil den være tilgjengelig for alle 
tjenester tilhørende organisasjonen den ble opprettet for.

En integrasjon må autoriseres for å bruke tjenester i plattformen. Om man for eksempel ønsker å aktivere en integrasjon
som skal kunne indeksere meldinger for MinSide Søk må dette gjøres på konfigurasjonssiden. Dette vil sørge for at 
nødvendige rettigheter blir tildelt.

Plattformen har også noen integrasjoner som kalles "globale integrasjoner". Dette er integrasjoner som er tilgjengelig for
alle organisasjoner. Dette kan for eksempel være integrasjonen som henter meldinger fra SvarUt og gjør disse tilgjengelig 
i MinSide Søk.

## Teknologier

### REST
Vi benytter REST lignenede grensesnitt på alle api så lenge det er gunstig. Kun ved spesielle behov vil det bli benyttet 
annen teknologi. Spesifikasjonen vil bli publisert ved OpenAPI spec. Da finnes det mange verktøy for å lage klienter i 
forskjellige språk og teknologier. Vi vil benytte UTF-8 charset på alt om ikke annet er spesifisert.

Readtimeout på 30 sekund er fint som default. De operasjoenen som trenger noe annet vil spesifisere det.

### Innlogging og autorisasjon
Tjenestene vil være beskyttet ved OAuth2. Access_token må være utstedt fra idporten. For tjenester som bruker av 
innbygger eller personer vil vi benytte OpenID Connect fra idporten. Programintegrasjoner kan benytte OAuth2 fra idporten. 

Vi støtter i første omgang kun JWT access_tokens, dette må konfigureres hos idporten.

På alle requester må OnBehalfOf header være satt til org eller fnr. Som regel vil dette være samme orgnr/fnr som i 
access_token et fra idporten. Hvis det ikke er det sjekker vi om du har lov til å utføre på vegne av en annen 
person/organisasjon.

### Huskeliste
* access_token fra idporten
* access_token må ha scope ks
* OnBehalfOf-header må være satt til orgnr eller fnr
* Read timeout: 30 sekunder
* Charset UTF-8


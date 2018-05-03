---
title: Sikkerhet og personvern
date: 2018-01-02
---

## Sikkerhet i løsningen

Under kommer generelle retningslinjer for hvordan vi har sikret applikasjonene, skulle noe avvike fra dette vil det 
være spesifisert i hver tjeneste.

### Sikring av kommunikasjon

All kommunikasjon med FIKS utenfra er kryptert med TLS. 
Innlogging og autentisering er løst av idporten, hvor vi benytter OpenID connect og OAuth2. 

### Sikring av data

Alle filer med data er kryptert på disk. All backup er kryptert. Vi har laget egne servere for dekryptering av data.
Disse er spesielt godt sikret, nettverks og tilgangs kontroll. 

### Autentisering og autorisering
Aktører som bruker Fiks-platformen havner i tre kategorier:

* Personer som bruker tjenester på vegne av seg selv, for eksempel en innbygger som søker barnehagesøknaden sin i meldingsboksen.
* Personer som bruker tjenester på vegne av en bedrift hvor de har en rolle, for eksempel en innbygger som henter ned en forsendelse til bedriften fra svarut.
* Systemer som er installert i en organisasjon som integrerer seg mot en tjeneste på fiks-platformen.  

#### Personer
Personer autentiseres ved hjelp av Open-Id Connect løsningen til ID-Porten. Dette vil si at de (om de ikke allerede er innlogget) dirigeres til ID-Porten for innlogging ved hjelp av for eksempel MinId eller BankId. ID-Porten og Fiks utveksler så informasjon for å bekrefte brukerens identitet og hvilket innloggingsnivå som er benyttet. Utgåtte innlogginger vil automatisk bli fornyet.

En person har mulighet til å agere på vegne av en organisasjon, for eksempel en bedrift hvor personen har en rolle. Se avsnittet om [fullmakter]{{< relref "fullmakt.md" >}} for mer informasjon om dette.

#### Integrasjoner
Flere tjenester på fiks-platformen vil ha mulighet for maskin-til-maskin kommunikasjon, for eksempel ved at et saksystem laster opp meldinger til meldingsboksen. Dette gjøres gjennom å opprette  _integrasjoner_, som autentiseres ved hjelp av et access token utstedt av ID-Porten i kombinasjon med integrasjonsid og passord generert av Fiks-Konfigurasjon. Se [integrasjoner]{{< relref "integrasjoner.md" >}} for mer informasjon om oppsett av dette.

En integrasjon vil ofte kunne jobbe på vegne av flere fiks-organisasjoner, for eksempel vil integrasjonen mellom SvarUt og Meldingsboksen kunne indeksere meldinger som tilhører mange kommuner. Dermed må integrasjoner autorisereres av fiks-organisasjonen som skal benytte den. Dette gjøres gjennom Fiks-Konfigurasjon. 

## Personvern

Løsningen er i utgangspunktet laget for å gi tilgang til tjenester og data for Innbyggere og Organisasjoner. Det er ikke mulig
å hente ut annen informasjon enn den som er lagt inn til deg. Tjenester som skal gjør tilgjengelig data for flere
personer/organisasjoner vil være beskrevet under tjenesten. Disse vil også måtte ha en audit log på hvem som har bedt 
om hvilke data. Det må også være en lovhjemel for å kunne gjør dette.

### Sletting av data

Dataeier (kommunen) vil kunne slette data som han har lastet opp i løsningen vår. 
Det vil også bli laget en løsning for Innbygger/Organisasjon å slette sine data
om de ikke ønsker at de skal være tilgjengelig i løsningen. Per 25.01.2017 er ikke dette på plass enda.

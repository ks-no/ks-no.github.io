---
title: Sikkerhet og personvern
---

# Sikkerhet i løsningen

Under kommer generelle retningslinjer for hvordan vi har sikret applikasjonene, skulle noe avvike fra dette vil det 
være spesifisert i hver tjeneste.

### Sikring av kommunikasjon

All kommunikasjon med FIKS utenfra er kryptert med TLS. 
Innlogging og autentisering er løst av idporten, hvor vi benytter OpenID connect og OAuth2. 

### Sikring av data

Alle filer med data er kryptert på disk. All backup er kryptert. Vi har laget egne servere for dekryptering av data.
Disse er spesielt godt sikret, nettverks og tilgangs kontroll. 

### Kubernetes

Løsningen kjører på et kubernetes cluster, all kommunikasjon som går ut fra dette til f.eks databaser og andre eksterne tjenester
er sikret med TLS.

Alle komponenter/micro servicer i kubernetes er ansvarlig for å sjekke autentisering og autorisasjon. Skulle en klare å få
direkte tilgang til disse tjenestene må en fortsatt ha et gyldig access_token fra idporten.


# Personvern

Løsningen er i utgangspunktet laget for å gi tilgang til tjenester og data for Innbyggere og Organisasjoner. Det er ikke mulig
å hente ut annen informasjon enn den som er lagt inn til deg. Tjenester som skal gjør tilgjengelig data for flere
personer/organisasjoner vil være beskrevet under tjenesten. Disse vil også måtte ha en audit log på hvem som har bedt 
om hvilke data. Det må også være en lovhjemel for å kunne gjør dette.

### Sletting av data

Dataeier (kommunen) vil kunne slette data som han har lastet opp i løsningen vår. 
Det vil også bli laget en løsning for Innbygger/Organisasjon å slette sine data
om de ikke ønsker at de skal være tilgjengelig i løsningen. Per 25.01.2017 er ikke dette på plass enda.

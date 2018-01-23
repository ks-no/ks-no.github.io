## Integrasjon mot api.fiks.ks.no

Apiene vil i hovedsak benytte følgende tenknologi:

### Rest
Vi benytter REST lignenede grensesnitt på alle api så lenge det er gunstig. Kun ved spesielle behov vil det bli benyttet annen teknologi.
Spesifikasjonen vil bli publisert ved OpenAPI spec. Da finnes det mange verktøy for å lage klienter i forskjellige språk og teknologier.
Vi vil benytte UTF-8 charset på alt om ikke annet er spesifisert.

Readtimeout på 30 sekund er fint som default. De operasjoenen som trenger noe annet vil spesifisere det.

### Inlogging og autorisasjon
Tjenestene vil være beskyttet ved OAuth2. Access_token må være utstedt fra idporten. For tjenester som bruker av innbygger eller personer vil vi benytte OpenID Connect fra idporten.
Program integrasjoner kan benytte OAuth2 fra idporten. 

Vi støtter i første omgang kun jwt access_tokens, dette må konfigureres hos idporten.

På alle requester må OnBehalfOf header være satt til org eller fnr. Som regel vil dette være samme orgnr/fnr som i access_token et fra idporten.
Hvis det ikke er det sjekker vi om du har lov til å utføre på vegne av en annen person/organisasjon.


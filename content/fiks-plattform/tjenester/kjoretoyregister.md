---
title: Kjøretøyregister
date: 2019-12-11
aliases: [/fiks-platform/tjenester/kjoretoyregister]
---

### Hva er Fiks Kjøretøyregister
Fiks Kjøretøyregister er en tjeneste for å gjøre oppslag i Statens Vegvesen sitt [Kjøretøy register](https://vegvesen.github.io/ak-api/) (Autosys). Fiks Kjøretøyregister speiler [Kjøretøyoppslag](https://vegvesen.github.io/ak-api/api/#kjoretoyoppslag) og [Kjøretøysøk](https://vegvesen.github.io/ak-api/api/#kjoretoysok) tjenestene til Statens Vegvesen på Fiks plattformen. Den gjør det mulig å slå opp et eller flere kjøretøy basert på *kjennemerke*, *kuid* (svv-identifikator), eller *understellsnummer*. Oppslaget vil gi informasjon om kjøretøyet og eierforhold på nåværende tidspunkt, eller på et spesifisert tidspunkt som angis i søket.  

### Hvordan tar jeg i bruk Fiks Kjøretøyregister

Fiks Kjøretøyregister er en tjeneste for maskin-til-maskin integrasjon. For å ta i bruk Fiks Kjøretøyregister trenger du derfor at en leverandør av fagsystem utvikler en integrasjon tjenesten.

På sikt vil de bli vurdert å utvikle et administrativt grensesnitt mot Fiks Kjøretøyregister for kommuneansatte.
 
### Integrasjon
 
Api kall gjøres i henhold til [swagger spesifikasjonen](https://vegvesen.github.io/ak-api/api/#kjoretoyoppslag) til Statens Vegvesen, med følgende endringer:
  
  * Autorisering skjer på fiks plattformen med leverandørens virksomhetssertifikat som beskrevet [her](https://ks-no.github.io/fiks-plattform/integrasjoner/#integrasjon), ikke med Basic auth.
  * Fiks-org som spørringen gjøres på vegne av blir en del av url'en for alle forespørsler.
  
Swagger filen til SVV spesifiserer en basePath som `/ws/no/vegvesen/kjoretoy/felles/v2`. Denne må erstattes med `https://api.fiks.ks.no/kjoretoyregister/api/{fiksOrgId}` hvor `{fiksOrgId}` er fiks org til organisasjonen spørringen gjøres på vegne av. Resten av url'en er som spesifisert for de enkelte endepunktene i swagger filen:
  
  * `/rest/distribusjon/kjoretoy/v2.0/bulk/kjennemerke`
  * `/rest/distribusjon/kjoretoy/v2.0/bulk/kuid`
  * `/rest/distribusjon/kjoretoy/v2.0/bulk/understellsnummer/{understellsnummer}`

Oppslag på *understellsummer* utføres med en `GET` request. Oppslag på *kjennemerke* og *kuid* utføres med en `POST` request hvor body inneholder en liste av id'er det skal søkes på. Eksempel forespørsel for kjennemerke på angitt dato:
```
[
  { 
    "kjennemerke": "br12345",
    "dtg": "2018-11-15T23:00:00.000+01:00"
  }
]
```

For kjøretøysøk gjøres det en `GET` request med query parameter. F.eks for å søke på eier-navn:

  * `/rest/distribusjon/kjoretoy/v2.0/sok/eiernavn?navn=[navn]`

I test miljøet (`https://api.fiks.test.ks.no/kjoretoyregister/api/{fixOrgId}`) går alle api kall mot et syntetisk datasett hos SVV (https://vegvesen.github.io/ak-api/envs/#sisdinky). Informasjon om kjøretøy som inngår i det syntetiske datasettet finnes [her](https://vegvesen.github.io/ak-api/filer/testdata-sisdinky.xlsx).

Hvis du opplever feil som blir returnert med json fra SVV med f.eks en svvguid kan en kontakte akfsupport@vegvesen.no.
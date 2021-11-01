---
title: Sentralisert brukerstyring på Fiks-plattformen
date: 2021-10-28
aliases: [/fiks-platform/sentralisert_brukerstyring]
---

Sentralisert brukerstyring er en ny funksjonalitet som er under utvikling for Fiks-plattformen som skal sørge for at brukere og grupper skal kunne synkroniseres fra kommunene og fylkeskommunene sitt eget tilgangsstyringssystem til Fiks plattformen. Målet er at det skal bli lettere å vedlikeholde tilganger i den samme plattformen man allerede bruker

## Mål
I første fase jobber vi med å støtte Microsoft Azure AD som kilde for brukere og grupper. Dette vil først og fremst støtter personbrukere som skal bruke Fiks forvaltning, for eksempel til å søke i folkeregisteret. Påloggingen vil fremdeles skje med ID porten noe som betyr at vi må ha fødselsnummer med i de synkroniserte brukerprofilene. Dermed vil man kunne gi tilgang til ulike tjenester og ressurser på Fiks-plattformen til grupper som lever i kommunenes eget tilgangsstyringssystem. 
Dermed sikrer man også at ansatte som slutter eller går over i en annen stilling mister tilganger de ikke lengre skal ha også på Fiks-plattformen.
Selv om vi i første fase jobber hovedsaklig med Azure AD ser vi også for oss å på sikt kunne støtte andre systemer for tilgangsstyring.


### Om SCIM2
Vi har valgt å støtte oss på SCIM2 standarden som er laget for formålet og som støttes både av Microsoft Active Directory i tillegg til alle store leverandører av Identity management plattformer. Konkret har vi utviklet et SCIM2 endepunkt som Azure AD og andre kan bruke til å synkronisere sine brukere og grupper til oss. Dokumentasjon av standarden finnes i [RFC-7642](https://tools.ietf.org/html/rfc7642), [RFC-7643](https://tools.ietf.org/html/rfc7643), [RFC-7644](https://tools.ietf.org/html/rfc7644) og på [SCIM2 nettstedet](http://www.simplecloud.info/).

![Systemskisse sentralisert brukerstyring](/images/sentralisert_brukerstyring_overordnet.png)

## Status
Vi jobber nå med å sikre at SCIM2 endepunktet er kompatibelt med Azure og at det vi kan sikre selve overføringen av data på en god måte. Det er etablert en pilotgruppe med kommuner som skal bidra til å teste løsningen i vårt testmiljø. 

## Oppsett for test
Dette trenger du får å få satt opp test:

1. bruker med admintilgang på organisasjon på Fiks test
1. admin tilgang til test-tennant på Azure AD 

### Guide
Først må du logge på Azure portalen, velge Active directory og sikre at du er på rett tennant. Kopier _Tenant ID_ som fra skjermbildet under:

![Skjermbilde Azure AD portal](/images/sd_1.png)

Åpne en ny fane og logg på [Fiks forvaltning i test](https://forvaltning.fiks.test.ks.no/) med bruker som har administrasjonstilgang til den organisasjonen du skal synkronisere brukere til. Velg konfigurasjon i det første skjermbildet

![Fiks forvaltning konfigurasjon](/images/sd_2.png)

I venstremenyen nederst ligger det et valg som heter _Brukerstyring_. Trykk på dette

![Fiks forvaltning konfigurasjon venstremeny](/images/sd_3.png)

I det neste skjermbildet trykker du på knappen _Legg til ekstern kilde_ og får opp en veiviser der du må velge Azure AD som kildesystem, legge inn et navn og _Tennant ID_ fra Azure AD som du fant tidligere. Til slutt vil du få presentert URL til vårt SCIM endepunkt samt et token som Azure skal bruke for autentisering. Kopier disse verdiene eller hold vinduet åpent, for disse skal vi bruke i Azure portalen

![Fiks forvaltning brukerstyring ny kildedialog](/images/sd_4.png)

Gå tilbake til Azure AD fanen. Nå skal vi sette opp selve konfigurasjonen.
I Active Directory grensesnittet velger du først _Enterprise applications_ og deretter trykker du på _New application_. Lag et navn på integrasjonen og velg _Integrate any other application you don't find in the gallery (Non-gallery)_

![Azure AD legg til ny applikasjon](/images/sd_5.png)

I det neste skjermbildet velger du _3. Provision User Accounts_ (evt. _Provisioning_ fra venstremenyen). Deretter trykker du på _Get started_. 
I det neste skjermbildet velger du _Automatic_ for _Provisioning Mode_. Kopier den URL-en du fikk da du opprettet kilden i Fiks forvalgning under _Tenant URL_ og legg inn tokenet i feltet _Secret Token_. Trykk _Test connection_ for å verifisere at oppsettet er rikitig. Trykk _Save_ når du er ferdig.

![Azure AD provisjoneringsoppsett](/images/sd_6.png)

#### Endre mapping for Azure AD til også å levere fødselsnummer

Om brukerene skal kunne bruke ID-porten til å logge på Fiks må du også se til at fødselsnummer blir levert vårt SCIM endepunkt. For å få til dette må du endre standardmappingen for brukerprovisjonering i Azure AD.
I så fall går du inn på den _Enterprise application_-instansen du laget tidlgere, velger _Provisioning_ i venstremenyen. Velg så 

1. _Edit provisioning_
1. Ekspander _Mappings_ 
1. Trykk på _Provision Azure Active Directory Users_
1. Nederst i det neste skjermbilde er det en boks for _Show advanced options_. Sjekk av denne
1. Under _Supported Attributes_, velg _Edit attribute list for customapsso_
1. I bunnen av listen, legg til nytt element av typen _String_ med verdi   `urn:ietf:params:scim:schemas:extension:ks:personidentifikasjon:1.0:foedselsnummer`. Dette er det feltet vi forventer å få inn fødselsnummeret i.  
1. Du kan nå mappe det feltet du har valgt å legge fødselsnummer i din AD tennant til det nye fødselsnummerfeltet.  

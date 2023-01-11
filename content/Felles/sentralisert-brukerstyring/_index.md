---
title: Sentralisert brukerstyring
aliases: [/fiks-platform/brukerstyring/, /fiks-platform/sentralisert_brukerstyring/, /fiks-plattform/sentralisertbrukerstyring/, /fiks-plattform/sentralisert-brukerstyring/]
--- 

Sentralisert brukerstyring er en ny funksjon som skal gjøre det lettere å håndtere tilganger for ansatte til ressurser på Fiks-plattformen. 

## Bakgrunn
For å kunne støtte mange forskjellige tilgangsstyringssystemer har vi valgt å bygge på SCIM2 standarden. Denne støttes av alle store leverandører av _identity management_-plattformer inkludert Microsoft Azure AD, Google m.fl. I første fase har vi lagt oss på en slags minimumsimplementasjon av standarden og støtter synkronisering av brukere og grupper. Mer om SCIM2-standarden finner du i [RFC-7642](https://tools.ietf.org/html/rfc7642), [RFC-7643](https://tools.ietf.org/html/rfc7643), [RFC-7644](https://tools.ietf.org/html/rfc7644) og på [SCIM2 nettstedet](http://www.simplecloud.info/). Kort fortalt støtter vi oppretting, oppdatering (med _PATCH_) og sletting av brukere og grupper.  

Under utvikling av vårt SCIM2 endepunkt har vi hovedsaklig testet mot Microsoft Azure AD, men siden det bygger på en åpen standard er det ingenting i veien for å bruke andre baksystemer. Vi har tilgjengelig et testmiljø dersom noen ønsker å teste enten med egenutviklet integrasjon eller med programvare fra andre etablerte leverandører.
![Systemskisse sentralisert brukerstyring](/images/sentralisert_brukerstyring_generell.png). 

Ønsker du å teste oppsett med Azure AD? [Sjekk denne guiden](./azure/)

## Hva kreves for å sette det opp?
For å kunne starte synkronisering av grupper og brukere til Fiks-plattformen må en person som har adminrettigheter til kommunenes konfigurasjon opprette et nytt kildesystem og få generert et token til bruk for autentisering. Deretter kan man starte synkronisering fra sitt baksystem.  

### Autentisering mot SCIM endepunktet
I første omgang støttes autentisering med langtlevende (6 mnd) Bearer token. Dette var også det eneste som var støttet på det tidspunktet vi utviklet denne funksjonen. På sikt satser vi på også å støtte egen OAUTH2 client flow mot vårt eget OAUTH endepunkt. Tokenet får man første gang når man oppretter kildesystemet i Fiks forvaltning konfigurasjon. Det er også der man kan generere nytt token for eksisterende kildesystem.

![Fiks forvaltning brukerstyring ny kildedialog](/images/sd_4.png)

### Fødselsnummer for ID-porten autentisering av sluttbrukere
Siden Fiks forvaltning krever ID-porten pålogging, må synkroniserte brukere også inkludere fødselsnummeret til brukeren. For å støtte overføring av fødselsnummer til oss har vi laget et eget SCIM2 extension schema (_urn:ietf:params:scim:schemas:extension:ks:personidentifikasjon_). Se eksempel under på bruker med dette extension schemaet på: 
```json
{
  "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User",
        "urn:ietf:params:scim:schemas:extension:ks:personidentifikasjon:1.0"
      ],
      "id": "1d17878e-1433-4d65-a9cf-5588274ae286",
      "externalId": "kari",
      "userName": "kari.nordmann@test.kommune.no",
      "name": {
        "formatted": "Kari Nordmann",
        "familyName": "Nordmann",
        "givenName": "Kari"
      },
      "displayName": "Kari Nordmann",
      "active": true,
      "urn:ietf:params:scim:schemas:extension:ks:personidentifikasjon:1.0": {
        "foedselsnummer": "01017012345"
      }
}
```
Det er fullt mulig å synkronisere brukere uten fødselsnummer, men du vil da ikke kunne gi de tilganger på plattformen.

### Grupper
Grupper er en enkel struktur og krever ingen extension skjema for å fungere med Fiks-plattformen. Eksempel på gruppe:
```json
{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "id": "e9e30dba-f08f-4109-8486-d5c6a331660a",
    "displayName": "Saksbehandlere eiendom",
    "members": [
        {
            "value": "1d17878e-1433-4d65-a9cf-5588274ae286"
        }
    ]
}
```


## Hvilke tjenester på Fiks-plattformen er støttet?
Målet er å støtte alle tjenester på Fiks-plattformen som er i direkte bruk av ansatte i kommunal sektor. I første omgang har vi begynt med [Fiks folkeregister](/tjenester/folkeregister/) slik at man kan knytte synkroniserte grupper og brukere til roller.

### Fiks folkeregister
For å kunne bruke sentralisert brukerstyring med Fiks folkeregister må dette aktiveres av en tjenesteadministrator i Fiks forvaltning konfigurasjon. Når det aktiveres kan man først få lastet ned en Excelfil med oversikt over alle personbrukere som har tilganger til de rollene man har opprettet. Går man så videre og trykker på knappen slettes alle de eksisterende persontilgangene. Det er defor viktig at man sørger for at de personer som skal ha tilgang er synkronisert over til oss slik at man kan gi de tilgang til de rollene de trenger enten via medlemskap i en gruppe eller brukertilgang. Integrasjoner blir ikke berørt av dette siden de ikke inngår i sentralisert brukerstyring.
![Dialog for aktivering av sentralisert brukerstyring i konfigurasjon av Fiks folkeregister](/images/sd_aktivere_folkeregister.png)

Når sentralisert brukerstyring er aktivert vil det være enklere enn tidligere å gi tilgang da man enten kan velge gruppe fra en liste eller søke i navnet på synkroniserte brukere.
![Dialog for å gi tilgang til ekstern bruker](/images/sd_folkeregister_ekstern_bruker.png)
![Dialog for å gi tilgang til ekstern gruppe](/images/sd_folkeregister_ekstern_gruppe.png)


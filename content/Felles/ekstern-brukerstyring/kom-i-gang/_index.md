---
title: Sette opp Fiks forvaltning
date: 2025-11-24
weight: 10
---

Logg inn på Fiks forvaltning via https://forvaltning.fiks.ks.no med en administratorkonto.

Gå inn på konfigurasjon for din organisasjon og velg "Brukeradministrasjon" og deretter "Import av brukere" i menyen til
venstre.

Her kommer du til en veiviser for å sette opp brukersynkronisering.

I veiviseren legger du inn navn på kildesystemet og en tenantid dersom det er Microsoft Entra.
Når det er gjort får du et SCIM endepunkt og SCIM token som du må legge inn i din IDM-løsning.
Og når det er gjort vil brukere og grupper begynne å synkronisere til Fiks forvaltning og de er tilgjengelig for
tildeling av roller og tilganger i Fiks forvaltning.

Når du setter opp synkronisering fra IDM-løsningen må kan du velge hvilke brukere og grupper du synkroniserer over. Se
**[Brukere og grupper](./brukere-og-grupper)** for hvilke felter som kan være med i synkroniseringen.

### Mapping av Scim2 attributter til Fiks forvaltning
Minimum av felter som må være med i synkroniseringen for at brukeren skal kunne synkroniseres til Fiks forvaltning:

| attribute      | urn:ietf:params:scim:schemas           | forklaring                                                                                         |
|----------------|----------------------------------------|----------------------------------------------------------------------------------------------------|
| id             | :core:2.0:User                         | Generert av brukersynkronisering                                                                   |
| foedselsnummer | :extension:ks:personidentifikasjon:1.0 | Brukere uten fnr/dnr vil ikke være tilgjengelig for i Fiks forvaltning fordi IdPorten krever dette |
| displayName    | :core:2.0:User                         | Brukes som navnefelt                                                                               |
| name.formatted | :core:2.0:User                         | Brukes som navnefelt dersom displayName ikke eksisterer                                            |
| externalId     | :core:2.0:User                         | Unik id som representerer bruker sett fra avgivende system                                     |

Det er påkrevd med enten displayName eller formatted for at brukeren skal kunne synkroniseres. Dersom
fødselsnummer/d-nummer ikke sendes med kan vi ikke synkronisere brukeren til Fiks forvaltning. Det vil komme støtte for
å legge dette inn manuelt i etterkant.

Eksempel:

```json
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:User",
    "urn:ietf:params:scim:schemas:extension:ks:personidentifikasjon:1.0"
  ],
  "externalId": "kari",
  "displayName": "Kari Nordmann",
  "urn:ietf:params:scim:schemas:extension:ks:personidentifikasjon:1.0": {
    "foedselsnummer": "01017012345"
  }
}
```

### Forslag til ny mapping av Scim2 attributter til Fiks forvaltning

Vi planlegger nytt oppsett for brukersynkronisering i Fiks forvaltning i løpet av 2026. Dette vil gjøre det enklere å
sette opp og administrere synkronisering av brukere og grupper.

| attribute        | urn:ietf:params:scim:schemas           | forklaring                                                             |
|------------------|----------------------------------------|------------------------------------------------------------------------|
| id               | :core:2.0:User                         | Generert av brukersynkronisering                                       |
| externalId       | :core:2.0:User                         | Unik id som representerer bruker sett fra avgivende system         |
| userName         | :core:2.0:User                         | Brukernavn som brukes for å logge inn med Single Sign-on fra Microsoft | 
| foedselsnummer   | :extension:ks:personidentifikasjon:1.0 | Brukere uten fnr/dnr kan bare logge inn med SSO via Microsoft          |
| name.givenName   | :core:2.0:User                         | Fornavn (legg inn eventuelle mellomnavn her også)                      | 
| name.familyName  | :core:2.0:User                         | Etternavn                                                              |
| emails.0.value   | :core:2.0:User                         | Vi tar den første e-postadressen dersom den er oppgitt                 |
| active           | :core:2.0:User                         |                                                                        |

Eksempel:

```json
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:User",
    "urn:ietf:params:scim:schemas:extension:ks:personidentifikasjon:1.0"
  ],
  "externalId": "kari",
  "userName": "kari.nordmann@test.kommune.no",
  "name": {
    "familyName": "Nordmann",
    "givenName": "Kari"
  },
  "active": true,
  "urn:ietf:params:scim:schemas:extension:ks:personidentifikasjon:1.0": {
    "foedselsnummer": "01017012345"
  },
  "emails":[
    {
      "value":"kari.nordmann@test.kommune.no",
      "type":"work",
      "primary": true
    }
  ]
}
```

## Fiks forvaltning - Oppsett i Azure AD

https://portal.fiks.ks.no/wp-content/uploads/2023/11/SBS_forvaltning.pdf

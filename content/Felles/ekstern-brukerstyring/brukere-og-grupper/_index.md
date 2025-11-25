---
title: Brukere og grupper
date: 2021-07-29
weight: 20
---
### Fødselsnummer for ID-porten autentisering av sluttbrukere
Ettersom Fiks forvaltning krever ID-porten pålogging, må synkroniserte brukere også inkludere fødselsnummeret til brukeren. For å støtte overføring av fødselsnummer til oss har vi laget et eget SCIM2 extension schema (_urn:ietf:params:scim:schemas:extension:ks:personidentifikasjon_). Se eksempel under på bruker med dette extension schemaet på:
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
Det er fullt mulig å synkronisere brukere uten fødselsnummer, men du vil da ikke kunne gi de tilganger på Fiks-forvaltning. KS Kunnskap støtter innlogging uten fødselsnummer ved bruk av Single Sign-On (SSO) via Microsoft Entra ID.
Brukere uten fødselsnummer må manuelt oppdateres før de kan brukes i Fiks forvaltning.


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
SCIM2-standarden støtter ikke hierarkiske grupper. Vi tilbyr derfor ikke støtte for dette i Ekstern brukerstyring.

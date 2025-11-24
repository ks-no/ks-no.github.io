---
title: Sette opp KS Kunnskap
date: 2025-11-24
weight: 15
---
## KS Læring

###  Oppsett i Azure AD
https://portal.fiks.ks.no/wp-content/uploads/2023/11/SBS_KSL.pdf

### Mapping av Scim2 User felter til KS Læring

Feltene som mappes fra Scim2 User ressursen tilhører et av følgende schema:
- `urn:ietf:params:scim:schemas:core:2.0:User`
- `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`
- `urn:ietf:params:scim:schemas:extension:ks:personidentifikasjon:1.0`

Følgende tabell lister feltene som er i bruk i KS Læring
(foedselsnummer og active er ikke tatt i bruk enda)

| scim2 User      | schema                                 | kslæring  | forklaring                                      |
|-----------------|----------------------------------------|-----------|-------------------------------------------------|
| id              | :core:2.0:User                         |           | Generert av brukersynkronisering                |
| externalId      | :core:2.0:User                         | username  | username mapping valgt i konfig                 |
| userName        | :core:2.0:User                         | username  | username mapping valgt i konfig                 |
| employeeNumber  | :extension:enterprise:2.0:User         | username  | username mapping valgt i konfig                 |
| foedselsnummer  | :extension:ks:personidentifikasjon:1.0 |           | Blir ikke synkronisert til KSL per i dag        |
| name.givenName  | :core:2.0:User                         | firstname | Fornavn                                         |
| name.familyName | :core:2.0:User                         | lastname  | Etternavn                                       |
| emails.0.value  | :core:2.0:User                         | email     | Første email i listen som er primary eller work |
| active          | :core:2.0:User                         |           | Blir ikke synkronisert til KSL per i dag        |

Hvilket av feltene `externalId`, `userName`, og `employeeNumber` som mappes til `username` i KS Læriing konfigureres
i veiviseren for KS Læring brukerstyring.

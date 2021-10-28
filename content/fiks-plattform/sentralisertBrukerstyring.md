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




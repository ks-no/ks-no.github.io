---
title: Sette opp Fiks forvaltning
date: 2025-11-24
weight: 10
---
Logg inn på Fiks forvaltning via https://forvaltning.fiks.ks.no med en administratorkonto.

Gå inn på konfigurasjon for din organisasjon og velg "Brukeradministrasjon" og deretter "Import av brukere" i menyen til venstre.

Her kommer du til en veiviser for å sette opp brukersynkronisering.

I veiviseren legger du inn navn på kildesystemet og en tenantid dersom det er Microsoft Entra.
Når det er gjort får du et SCIM endepunkt og SCIM token som du må legge inn i din IDM-løsning. 
Og når det er gjort vil brukere og grupper begynne å synkronisere til Fiks forvaltning og de er tilgjengelig for tildeling av roller og tilganger i Fiks forvaltning.

Når du setter opp synkronisering fra IDM-løsningen må kan du velge hvilke brukere og grupper du synkroniserer over. Se  **[Brukere og grupper](./brukere-og-grupper)** for hvilke felter som kan være med i synkroniseringen.


## Fiks forvaltning - Oppsett i Azure AD
https://portal.fiks.ks.no/wp-content/uploads/2023/11/SBS_forvaltning.pdf

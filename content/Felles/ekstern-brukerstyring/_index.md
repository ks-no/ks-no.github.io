---
title: Ekstern brukerstyring
aliases: [
  "/fiks-platform/brukerstyring/",
  "/fiks-platform/sentralisert_brukerstyring/",
  "/fiks-plattform/sentralisertbrukerstyring/",
  "/fiks-plattform/sentralisert-brukerstyring/"
]
ordersectionsby: weight
---

Ekstern brukerstyring gjør det mulig for organisasjoner å synkronisere brukere og grupper direkte fra egne Identity Management-systemer (IDM) inn i Fiks-plattformen.  
Når brukere **opprettes, endres eller slettes** i IDM-løsningen, oppdateres dette automatisk i Fiks. Det betyr at organisasjonen slipper manuelt vedlikehold, og at tilganger til Fiks-tjenester alltid gis til riktig bruker.

Løsningen bygger på **SCIM 2.0**, en åpen standard som støttes av blant annet Microsoft Entra ID og andre moderne IDM- og IGA-løsninger.

Fiks-plattformen støtter to typer brukere:

- **Eksterne brukere** – synkronisert automatisk via SCIM
- **Lokale brukere** – opprettes og administreres manuelt

Denne siden gir en oversikt over ekstern brukerstyring og viser hvor du finner den tekniske dokumentasjonen.

---

## Bakgrunn

Organisasjoner har mange systemer som ansatte og innleide skal ha tilgang til. Manuelt vedlikehold av brukere på tvers av systemer er både tidkrevende og feilutsatt.

Ekstern brukerstyring løser dette ved å la organisasjonens IDM være den autoritative kilden for brukere og grupper.  
Endringer i IDM, som:

- nye brukere
- navneendringer
- sletting/deaktivering

gjenspeiles automatisk i Fiks-plattformen gjennom SCIM-synkronisering.

Dette gjør administrasjonen enklere og sikrer bedre kontroll.

---

## Oversiktsarkitektur

![Flyt for ekstern brukerstyring](/images/ekstern-brukerstyring-flyt.gif)

Administrator kan sette opp synkronisering fra IDM-systemet til Fiks-plattformen via SCIM 2.0. Alternativt må brukere opprettes manuelt som lokale brukere. Støtte for å legge fødselsnummer/d-nummer inn manuelt i etterkant av synkronisering kommer snart.

---

## Hvordan det settes opp

For å ta i bruk ekstern brukerstyring trenger organisasjonen:

1. Et IDM-system som støtter SCIM 2.0
2. Et **kildesystem** registrert i Fiks konfigurasjon
3. Et SCIM-token for autentisering
4. Konfigurasjon i IDM som peker mot SCIM-endepunktet i Fiks

Steg-for-steg dokumentasjon finner du her: **[Kom i gang med SCIM-synkronisering](./kom-i-gang)**

---

## KS Kunnskap (tidligere KS Læring)

De fleste organisasjoner ønsker som oftest å gi *alle ansatte* tilgang til **KS Kunnskap**.  
Vi anbefaler derfor å sette opp en **egen SCIM-synkronisering direkte til KS Kunnskap**, slik at alle ansatte synkroniseres uavhengig av hvilke brukere organisasjonen synkroniserer til Fiks-plattformen.

Egen dokumentasjon finner du her: **[Synkronisering til KS Kunnskap](./ks-kunnskap)**

---

## Brukere og grupper

For detaljer om:

- struktur på brukere
- grupper i SCIM
- extension-schema for fødselsnummer
- felter som kreves av Fiks-plattformen

se: **[Brukere og grupper i SCIM](./brukere-og-grupper/)**


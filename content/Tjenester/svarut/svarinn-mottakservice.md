---
title: Svarinn
date: 2017-01-01
hidden: false
---

Mottaksservice tilsvarer svarinn og gjør det mulig å laste ned og kvittere ut forsendelser før de varsles gjennom Altinn og sendes til eventuell printing.

## Hva er Mottaksservice?

Primært brukes Mottaksservice til å automatisere nedlasting og import av forsendelser direkte i sakssystemer. Fra en forsendelse er mottatt i SvarUt er den tilgjengelig for nedlasting via mottaksservicen. Dersom forsendelsen ikke blir lastet ned innen 2 timer vil mottakersystem få en advarsel mail.

Mottaksservice gir mulighet for å laste ned sensitive forsendelser. Dette betyr at mottaker må legge inn sitt offentlige sertifikat i SvarUt, og bruke sin private nøkkel til å dekryptere forsendelsesfilene som blir lastet ned. Alle forsendelser blir sendt på denne måten selv, uavhengig av om forsendelsen er nivå 3 eller 4.

Mottaksservicen består av 3 tjenester (se også [detaljert beskrivelse](/svarut/integrasjon/mottaksservice-rest)):

1.  **hentNyeForsendelser -** Henter nye forsendelser som er klar for import.
2.  **getForsendelsefil -** Henter filen for en gitt forsendelse, enten som PDF eller zipfil. Filen vil være kryptert og må dekrypteres etter nedlasting.
3.  **kvitterMottak -** Kvitterer ut en gitt forsendelse. Forsendelsesstatus vil bli satt til lest. Dette stopper varsel til Altinn og senere printing.

Sakssystemer må klargjøres for bruk av mottaksservicen. SvarUt-teamet har laget en modul som kan brukes for noen leverandører, samt fungere som et eksempel på hva som er nødvendig for integrasjon med SvarUt. Denne modulen er tilgjengelig [her](https://github.com/ks-no/svarut-sak-mottak).

## Hvordan bruke Mottaksservice?

Mottaksservicen konfigureres under menypunktet Mottakersystem. Her kan administrator opprette nye mottakersystem og gi personer tilgang til mottakersystemet. Deretter kan personene som har fått tilgang selv utføre resten av stegene. De første 3 stegene utføres kun én gang, steg 4 en gang som en test. De siste tre stegene bør settes opp som en regelmessig jobb som kjøres hvert 15\. minutt.

1.  **Opprett mottakersystem**

En administrator oppretter et mottakersystem som skal ha tilgang til forsendelser. I dette steget legges det inn minst én person som har tilgang til dette mottakersystemet. Personen blir gitt tilgang basert på fødselsnummeret sitt.

3.  **Legg til organisasjon**

Personen som ble gitt tilgang i punktet over legger inn organisasjoner som mottakersystemet skal ha tilgang til. SvarUt sjekker om personen har tilgang til organisasjonsnummeret ved å spørre Altinn.

5.  **Generer servicepassord**

Personen genererer et servicepassord. Dette passordet brukes for å validere mottakersystemet mot automatisk importtjeneste. Dette gjøres via Mottakersystem-siden, under "Service" fanen for et mottakersystem. Mottakersystemet må bruke brukernavnet og servicepassordet for autentisering ved hver nedlasting.

7.  **Registrér offentlig sertifikat**

Personen må laste opp mottakersystemets offentlige sertifikat. Dette gjøres også via Mottakersystem-siden, under "Service" fanen for et mottakersystem. Den private nøkkelen brukes i mottakersystemet for å dekryptere forsendelsesfiler etter nedlasting (se [her](https://github.com/ks-no/svarut-sak-mottak) for et eksempel på integrasjon).

9.  **Send forsendelse**

Opprett minst en forsendelse til en organisasjon som personen har tilgang til.

11.  **Hent nye forsendelser**

Kall automatisk importtjeneste og oppgi brukernavn og servicepassord ved autentisering. Alle forsendelser mottakersystemet har tilgang til returneres som en liste. Merk at listen ikke inneholder selve filene, kun informasjon om forsendelsen.

13.  **Hent forsendelsefil**

Etter autentisering og nedlasting av forsendelser, oppgi forsendelseid til en forsendelse til importtjenesten. Dette kallet returnerer selve filen enten som zip-fil eller som PDF.

15.  **Kvittér for mottak**

Siste steg er å kvittere ut forsendelsen. Oppgi forsendelsesid til importtjenesten, og forsendelsen markeres som lest.

### Forsendelsesflyt i SvarUt

![forsendelsestatusoversikt](https://raw.githubusercontent.com/wiki/ks-no/svarut-dokumentasjon/mottakerserviceflyt.png)


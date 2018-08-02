---
title: Integrasjon mot SvarUt
---

For utsending av forsendelser via KS-SvarUt benyttes en SOAP basert web-service. Denne servicen mottar forsendelsen og relevante metadata, og besørger videre ekspedering via elektroniske meldingstjenester eller vanlig post.

For å sikre bakoverkompabilitet versjoneres servicen. Når grensesnittet endres deployes en ny versjon slik at eksisterende klienter selv kan velge når de ønsker å ta i bruk ny versjon. Se tabell under for hvilke versjoner som til enhver tid er støttet. Hver versjon dokumenteres separat. Deprecated bør ikke brukes i nye integrasjoner.

Kall mot svarut, timer ut hvis de tar meir enn 15 minutt. Derfor kan det være lurt å ha timeout på tilkoplingen som er lenger enn dette. Da får avsender ikke timeout uten at den er initiert av SvarUt. Ellers kan avsender risikere å ikke få forsendelse id på forsendelser som har gått ok.

| Versjon | WSDL | Status | Endringer |
| --- | --- | --- | --- |
| [ForsendelseServiceV1](forsendelseservicev1) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV1?wsdl) | Deprecated | NA | 
| [ForsendelseServiceV2](forsendelseservicev2) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV2?wsdl) | Deprecated | <ul><li>Støtte for mottakeradresse ihht NOARK5 (inkl. Land)</li><li>Ny metode for å hente historikk for en spesifikk forsendelse</li><li>Kun digital levering (dvs. dokumenter som ikke skal til print)</li><li>Støtte for giroark i forsendelse</li><li>Ny metode for å sette status lest fra eksternt system</li></ul> |
| [ForsendelseServiceV3](forsendelseservicev3) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV3?wsdl) | Deprecated | <ul><li>Støtte for lenker i forsendelser</li><li>Støtte for metadata til bruk i automatisk import service</li></ul> | 
| [ForsendelseServiceV4](forsendelseservicev4) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV4?wsdl) | Deprecated | <ul><li>Støtte for krypterte forsendelser</li><li>Utvidede metadata til bruk i automatisk import service</li><li>Støtte forsendelser som krever nivå4-innlogging</li></ul> |
| [ForsendelseServiceV5](forsendelseservicev5) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV5?wsdl) | Deprecated | <ul><li>Kan fylle ut SvarSendesTil for å gi informasjon om hvem svar på forsendelsen skal sendes til, dette blir brukt som avsender adresse på postlagt brev også.</li><li>Kan spesifisere om dette er et svar på en tidligere forsendelse.</li><li>Lagt til dokumentType for å si hvilken type forsendelse dette er(blir renamet til forsendelseType i v7)</li><li>Eksternref en id som kan brukes til å finne forsendelser</li></ul> |
| [ForsendelseServiceV6](forsendelseservicev6) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV6?wsdl) | Deprecated | <ul><li>Kan legge med svar på forsendelse link, slik at mottaker kan svare på forsendelsen.</li><li>Søke opp forsendelseid basert på eksternref</li></ul> |
| [ForsendelseServiceV7](forsendelseservicev7) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV7?wsdl) | Deprecated | <ul><li>dokumentType heter nå forsendelsetype</li><li>Støtte for difi sin signeringstjeneste. Beskrivelse av [Signeringstjeneste](Signeringstjeneste)</li></ul> |
| [ForsendelseServiceV8](forsendelseservicev8) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV8?wsdl) | Stabil | <ul><li>dokumentType lagt til på hver fil. Denne er tilgjengelig i Svarinn. </li><li>Kan hente liste med mottakersystem for et orgnr</li><li>Kan hente forsendelseTyper som kan brukes i SvarUt</li></ul> |
| [ForsendelseServiceV9](forsendelseservicev9) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV9?wsdl) | Stabil | <ul><li>Hente ut signeringshistorikk på en forsendelse</li><li>Dokument har fått ekskluderesFraPrint, da er ikke filen med i print av forsendelsen. Brukes typisk til filer som kun er interesange om forsendelsen lastes ned digitalt. Xml, lyd, video filer osv.</li></ul> |
| [ForsendelsesServiceV10](forsendelsesservicev10) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV10?wsdl) | Under utvikling | <ul></ul> |

# Nedlasting av forsendelser direkte til sakssystem

Sakssystemer kan kalle Svarut for å laste ned forsendelser direkte ved å bruke enten en REST-tjeneste eller en SOAP web-service.

For å sikre bakoverkompabilitet versjoneres servicen. Når grensesnittet endres deployes en ny versjon slik at eksisterende klienter selv kan velge når de ønsker å ta i bruk ny versjon. Se tabell under for hvilke versjoner som til enhver tid er støttet. Hver versjon dokumenteres separat.

| Dokumentasjon | Status | Endringer |
| --- | --- | --- |
| [MottaksService V1 REST](mottaksservice-rest) | Stabil | NA |



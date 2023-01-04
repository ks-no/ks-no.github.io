---
title: SvarUt
---

# Kort beskrivelse
KS FIKS meldingformidler er en sentralisert løsning som formidler dokumenter mellom avsender og mottaker via ulike kanaler. Kommuner og andre kan benytte KS FIKS plattform. SvarUt benyttes for utgående post, mens SvarInn benyttes for innkommet post.

Edialog er grensesnittet som tilbys innbygger for å fylle ut et skjema som skal returneres til kommunen.

# Tilgjengelige grensesnitt
| Grensesnitt | Støtte |
|------|------|
| Web portal | Ja |
| Maskin til maskin | Ja |

# Beskrivelse av tjenesten
Svarut er en tjeneste som tilbyr et grensesnitt for aktørene i en digital dialog mellom kommune og innbygger. 
Beskrivelser av de forskjellige konfigurasjonene:

{{% children style="h5" showhidden= "true" %}}


## Teknisk oversikt skisse
![alternative text](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/wiki/ks-no/svarut-dokumentasjon/edialog/edialog.puml?2)

## Konfigurasjon av Svarut
[Konfigurasjon av SvarUt](https://svarut.wordpress.com/hjelp/konfigurasjon-av-svarut/)

## Integrasjon mot Svarut
For utsending av forsendelser via KS-SvarUt benyttes en SOAP basert web-service. Denne servicen mottar forsendelsen og relevante metadata, og besørger videre ekspedering via elektroniske meldingstjenester eller vanlig post.

For å sikre bakoverkompabilitet versjoneres servicen. Når grensesnittet endres deployes en ny versjon slik at eksisterende klienter selv kan velge når de ønsker å ta i bruk ny versjon. Se tabell under for hvilke versjoner som til enhver tid er støttet. Hver versjon dokumenteres separat. Deprecated bør ikke brukes i nye integrasjoner.

Kall mot SvarUt, timer ut hvis de tar mer enn 15 minutter. Derfor kan det være lurt å ha timeout på tilkoblingen som er lenger enn dette. Da får avsender ikke timeout uten at den er initiert av SvarUt. Ellers kan avsender risikere å ikke få forsendelseID på forsendelser som har gått ok.

| Versjon | WSDL | Status | Endringer |
| --- | --- | --- | --- |
| ForsendelseServiceV1 |  | Fjernet |  | 
| ForsendelseServiceV2 |  | Fjernet | <ul><li>Støtte for mottakeradresse ihht NOARK5 (inkl. Land)</li><li>Ny metode for å hente historikk for en spesifikk forsendelse</li><li>Kun digital levering (dvs. dokumenter som ikke skal til print)</li><li>Støtte for giroark i forsendelse</li><li>Ny metode for å sette status lest fra eksternt system</li></ul> |
| ForsendelseServiceV3 |  | Fjernet | <ul><li>Støtte for lenker i forsendelser</li><li>Støtte for metadata til bruk i automatisk import service</li></ul> | 
| [ForsendelseServiceV4](forsendelseservicev4) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV4?wsdl) | Deprecated | <ul><li>Støtte for krypterte forsendelser</li><li>Utvidede metadata til bruk i automatisk import service</li><li>Støtte forsendelser som krever nivå4-innlogging</li></ul> |
| [ForsendelseServiceV5](forsendelseservicev5) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV5?wsdl) | Deprecated | <ul><li>Kan fylle ut SvarSendesTil for å gi informasjon om hvem svar på forsendelsen skal sendes til. Dette blir brukt som avsenderadresse på postlagt brev også.</li><li>Kan spesifisere om dette er et svar på en tidligere forsendelse.</li><li>Lagt til dokumentType for å si hvilken type forsendelse dette er(blir renamet til forsendelseType i v7)</li><li>Eksternref en id som kan brukes til å finne forsendelser</li></ul> |
| [ForsendelseServiceV6](forsendelseservicev6) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV6?wsdl) | Deprecated | <ul><li>Kan legge med svar på forsendelse link, slik at mottaker kan svare på forsendelsen.</li><li>Søke opp forsendelseid basert på eksternref</li></ul> |
| [ForsendelseServiceV7](forsendelseservicev7) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV7?wsdl) | Deprecated | <ul><li>dokumentType heter nå forsendelsetype</li><li>Støtte for Digdir sin signeringstjeneste. Beskrivelse av [Signeringstjeneste](Signeringstjeneste)</li></ul> |
| [ForsendelseServiceV8](forsendelseservicev8) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV8?wsdl) | Deprecated | <ul><li>dokumentType lagt til på hver fil. Denne er tilgjengelig i Svarinn. </li><li>Kan hente liste med mottakersystem for et orgnr</li><li>Kan hente forsendelseTyper som kan brukes i SvarUt</li></ul> |
| [ForsendelseServiceV9](forsendelseservicev9) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV9?wsdl) | Deprecated | <ul><li>Hente ut signeringshistorikk på en forsendelse</li><li>Dokument har fått ekskluderesFraPrint, da er ikke filen med i print av forsendelsen. Brukes typisk til filer som kun er interesange om forsendelsen lastes ned digitalt. Xml, lyd, video filer osv.</li></ul> |
| [ForsendelsesServiceV10](forsendelsesservicev10) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV10?wsdl) | Deprecated | <ul><li> Ny operasjon: retrieveDokumentMetadata. Denne er lagt inn for å kunne hente ut informasjon om bl.a. hvor dokumentet kan lastes ned og eventuelt lenke til signeringsoppdrag.</li><li> Endret operasjon: setForsendelseLestAvEksterntSystem. Denne er oppdatert til å ta imot objekt av type LestAv.</li><li> Endret operasjoner: retrieveForsendelsesStatus og retrieveForsendelsesStatuser, begge returnerer nå samme modell-objekt (ForsendelsesStatus). Sistnevnte operasjon har pakket resultatet i en liste.</li><li> Forsendelsesid og organisasjonsnummer er kapslet inn i egne typer.</li><li> Modell-objektet StatusResult heter nå ForsendelsesStatus. Gamle ForsendelseStatus heter nå Status og blir returnert som en del av ForsendelsesStatus.</li><li> Modell-objektet Brevpost er ikke lenger i bruk og er fjernet.</li><li> Modell-objektet PrintKonfigurasjon heter nå UtskriftsKonfigurasjon.</li><li> Alle modell-objektene er oppdatert til å bruke camelCase på felt og attributter.</li></ul> |
| [ForsendelsesServiceV11](forsendelsesservicev11) | [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV11?wsdl) | Stabil | <ul><li>EksponertFor, kan gjør forsendelse tilgjengelig for andre enn mottaker. Brukes av edialog for å tilate innsender å laste ned filene. </li></ul> |

## Rest versjoner av forsendelseService

Det kommer ikke ny funksjonalitet etter v11 av soap servicen. Nye endringer og features vil komme i Rest servicene.
Når vi brekker json strukturen vil det komme ny versjon av servicen. Alle implementasjoner må takle json felt som ikke er spesifisert. Det vil komme nye felt og eksisterende ikke obligatoriske felt kan forsvinne.

| Versjon | Status | Endringer |
| --- | --- | --- |
| [ForsendelseRestServiceV1](forsendelserestservicev1) | Stabil | <ul><li>Funksjonaliteten i V11 flyttet til http/json basert api.</li></ul> |

## Nedlasting av forsendelser direkte til sakssystem

Sakssystemer kan kalle SvarUt for å laste ned forsendelser direkte ved å bruke enten en REST-tjeneste eller en SOAP web-service.

For å sikre bakoverkompabilitet versjoneres servicen. Når grensesnittet endres deployes en ny versjon slik at eksisterende klienter selv kan velge når de ønsker å ta i bruk ny versjon. Se tabell under for hvilke versjoner som til enhver tid er støttet. Hver versjon dokumenteres separat.

| Dokumentasjon | Status | Endringer |
| --- | --- | --- |
| [MottaksService V1 REST](mottaksservice-rest) | Stabil | NA |


## IPer

Hvis dere må åpne i brannvegg ligger svarut bak disse ipene:

| SvarUT-Test | SvarUT-PROD |
| --- | --- |
|137.221.25.65 | 137.221.25.66| 
| 137.221.28.65 | 137.221.28.66 | 





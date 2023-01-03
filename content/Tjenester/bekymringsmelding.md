---
title: Fiks bekymringsmelding
date: 2019-11-25 
aliases: ["/fiks-platform/tjenester/bekymringsmelding", "/fiks-platform/tjenester_under_utvikling/bekymringsmelding"]
---

# Kort beskrivelse

Fiks bekymringsmelding er en portal laget for Norges innbyggere for å varsle bekymring ovenfor et barn til barnevernet. Løsningen består av to ulike skjema, ett for privat melder og ett for offentlige ansatte.

Brukerne logger seg inn på portalen, fyller ut og sender inn bekymringsmeldingen. Løsningen vil deretter levere bekymringsmeldingen på en eller flere av følgende måter:

* Direkte i fagsystem (Strukturert informasjon)
* Manuell nedlastning, ustrukturert informasjon i digital form – PDF
* Tilsendt som brevpost

# Tilgjengelige grensesnitt
| Grensesnitt | Støtte |
|------|------|
| Web portal | Ja |
| Maskin til maskin | Nei |

# Beskrivelse av tjenesten
Når bekymringsmeldingen er sendt vil systemet forsøke å levere den som strukturert data via Fiks-plattformen til kommunens fagsystem. Dersom kommunens fagsystem ikke støtter integrasjon mot [Fiks IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksprotokoll/fiksio/) finnes det en løsning for å laste ned bekymeringsmeldingen manuelt. Bekymringsmeldinger som ikke markeres som mottatt sendes ut som brevpost.

## Teknisk oversikt skisse
![alt text](https://ks-no.github.io/images/Bekymringsmelding_4.png "Overordnet designløsning")

Bekymringsmeldingen blir omgjort til strukturert data (JSON) for integrasjon mot fagsystem og ustrukturert data (PDF) til manuell nedlastning og for brevpost. All kommunikasjon mellom bruker og løsningen er kanalkryptert. I tillegg lagres både strukturert og ustrukturert data kryptert med mottakersystemets offentlige nøkkel (fagsystem, utskriftsleverandør, manuell nedlastning).  

Portalen tilbyr også et API hvor det er mulig å sende en bekymringsmelding fra fagsystemet til en annen kommunes barneverntjeneste.

## Teknisk beskrivelse av løsning og integrasjon
### Hvordan tar man i bruk Fiks Bekymringsmelding?
Portalen inneholder to skjema, en for innbyggere og en for offentlig ansatte, som kan brukes for å melde inn bekymringsmeldinger.

Noen ganger kan det være hensiktsmessig å ha skjema for offentlig melder som en integrert del av et eget fagsystem (eks: skole, politi, ol) og da kan man benytte API for bekymringsmelding for å implementere dette. API-et støtter maskin-til-maskin integrasjon både som produsent (avsender) av bekymringsmelding og konsument (mottaker) av bekymringsmelding. Ta kontakt med din leverandør av fagsystem og hør om de støtter integrasjon mot bekymringsmelding. 

Dersom fagsystemet støtter integrasjon kan dere konfigurere bekymringsmeldingstjeneste til å konsumere og/eller produsere bekymringsmeldinger. Dersom fagsystem ikke støtter maskin-til-maskin integrasjon for å konsumere bekymringsmeldinger er det mulig å laste bekymringsmeldingene ned manuelt.

Dersom en bekymringsmelding ikke er lastet ned innen 2 virkedager vil den bli sendt ut som brevpost.

Før løsningen kan tas i bruk må kommunen inngå en [avtale](https://svarut.wordpress.com/fiks/avtalen/) om bruk.

### Integrasjonsutvikling
Fagsystemet kan produsere og sende inn bekymringsmeldinger til et API eller man kan benytte seg av å sende inn via skjema. Benyttes skjema så vil skjemaet produsere PDF og JSON-fil, men hvis fagsystemet skal sende inn til API, må fagsystemet sende med dette.

Informasjon om generell integrasjonsutvikling mot Fiks, som blant annet autentisering, finner man [her](https://ks-no.github.io/fiks-plattform/integrasjoner/).

#### Fagsystem som konsument
Ved bruk av Fiks IO som leveringskanal må fagsystemet støtte meldingsprotokollen ```no.ks.fiks.bekymringsmelding.v1```, som er definert til bruk av bekymringsmeldinger. Meldingsprotokollen vil inneholde kontrakter i form av JSON-skjema som gjelder både for mottak og svar på Fiks IO-meldinger.

**Til fagsystem - mottak av bekymringsmeldinger**
Fagsystemet vil motta enten en privat bekymringsmelding, ```no.ks.fiks.bekymringsmelding.privat.v1```, med en ASiC-E-fil i body eller en offentlig bekymringsmelding, ```no.ks.fiks.bekymringsmelding.offentlig.v1```, med en ASiC-E-fil i body. I tillegg vil det være en header «bydel-ressurs-id», som vil være ID til bydelsressursen, og en header «bekymringsmelding-id» som vil være bekymringsmeldingens unike ID. I de fleste tilfeller kan man se bort fra disse.

AsiC-E-filen er på navneformatet «FiksIO\_encrypted_[FIKS_ORG_ID]\_[BYDELSNUMMER].zip», hvor FIKS_ORG_ID er en unik ID for kommunen, mens bydelsnummeret vil være et tosifret tall. Er det en kommune uten bydeler, vil bydelsnummeret være «00».

ASiC-E-filen vil inneholde to filer, «bekymringsmelding.json» og «bekymringsmelding.pdf». «bekymringsmelding.json» er en JSON-fil definert i JSON-skjema for [privat bekymringsmelding](https://raw.githubusercontent.com/ks-no/fiks-io-bekymringsmelding-protokoll/master/schema/domain/privat.bekymringsmelding.v1.json) eller [offentlig bekymringsmelding](https://raw.githubusercontent.com/ks-no/fiks-io-bekymringsmelding-protokoll/master/schema/domain/offentlig.bekymringsmelding.v1.json) - avhengig om meldingstypen er en privat eller offentlig bekymringsmelding. «bekymringsmelding.pdf» vil være bekymringsmeldingen på PDF-format.

**Fra fagsystem - kvittering på mottatt bekymringsmelding**
Når fagsystemet har importert og lagret bekymringsmeldingen må det sendes tilbake en kvittering som bekrefter mottatt bekymringsmelding, ```no.ks.fiks.bekymringsmelding.mottatt.v1```, med tom body.\
Dersom fagsystemet ikke klarer å lagre bekymringsmeldingen kan man sende tilbake en kvittering som signaliserer feil ved mottak, ```no.ks.fiks.bekymringsmelding.feilet.v1```, med body bestående av en JSON-fil «feilmelding.json» med hva som gikk galt. JSON-skjema finnes [her](https://raw.githubusercontent.com/ks-no/fiks-io-bekymringsmelding-protokoll/master/schema/domain/feilmelding.json). Ved feil vil bekymringsmeldingen bli sendt som brevpost. 

Fullstendig skjemadefinisjon med eksempler finner man [her](https://github.com/ks-no/fiks-io-bekymringsmelding-protokoll). Det anbefales at man setter ttl (time-to-live) for en Fiks IO-melding til 24 timer. Får man meldingstype ```no.ks.fiks.kvittering.tidsavbrudd```, så trenger dere ikke sende noe tilbake, da vi alltid har en fallback til brevpost. Men det anbefales at man logger det, og sier fra så vi kan feilsøke. For mer informasjon om Fiks IO, se [dokumentasjon for Fiks IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksprotokoll/fiksio/). Trondheim kommune har også laget en Fiks IO-klient i Go som er spesifikt rettet mot bekymringsmelding. Den finner man [her](https://github.com/tktip/fiks-bekymringsmelding-konsument).

#### Fagsystem som produsent
Swagger-spesifikasjon for å sende inn bekymringsmeldinger via API finnes her: [Bekymringsmelding mottak fagsystem](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/bekymringsmelding-mottak-fagsystem-api-v1.json) og [Bekymringsmelding kommune service](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/bekymringsmelding-kommune-api-v1.json). Merk at filene som skal sendes med, sendes som multipart request. Ikke alle Swagger-genererte klienter genererer dette riktig i henhold til OpenAPI 3.0-spesifikasjonen. Du kan se et eksempel på multipartforsendelse i Java [her](#eksempel-på-innsending-java-med-jersey-client).

Feltet "Leveringskanal", jmf JSON-skjemaene, skal settes til navn på organisasjonen (Politiet, navnet på skolen, etc.) som sender bekymringsmeldingen. Feltet "Sendingstidspunkt" forventer ISO-8601 norsk tid uten tidssone, eksempelvis "2021-11-08T09:24:45".

 **Filer**
Det må sendes med to krypterte filer, en AsiC-E-fil og en PDF-fil. De offentlige nøklene som brukes ved kryptering hentes fra API-et [Bekymringsmelding mottak fagsystem](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/bekymringsmelding-mottak-fagsystem-api-v1.json). 

**AsiC-E-fil**
AsiC-E-filen må inneholde to filer, «bekymringsmelding.json» og «bekymringsmelding.pdf». «bekymringsmelding.json» er en JSON-fil definert i JSON-skjema for [privat bekymringsmelding](https://raw.githubusercontent.com/ks-no/fiks-io-bekymringsmelding-protokoll/master/schema/domain/privat.bekymringsmelding.v1.json) eller [offentlig bekymringsmelding](https://raw.githubusercontent.com/ks-no/fiks-io-bekymringsmelding-protokoll/master/schema/domain/offentlig.bekymringsmelding.v1.json) - avhengig om meldingstypen er en privat eller offentlig bekymringsmelding. Skjemadefinisjon med eksempler finner man [her](https://github.com/ks-no/fiks-io-bekymringsmelding-protokoll). AsiC-E-filen må være kryptert med mottakersystemets offentlige nøkkel.

**PDF-fil**
«bekymringsmelding.pdf» vil være selve bekymringsmeldingen på PDF-format og må være kryptert med printleverandørens offentlige nøkkel. Fagsystemet har ansvar for å lage PDF. Eksempler på PDF for [privat melder](http://ks-no.github.io/images/eksempel-privat-melder.pdf) og [offentlig melder](http://ks-no.github.io/images/eksempel-offentlig-melder.pdf). 


**Sekvensdiagram**
![alt text](https://ks-no.github.io/images/FagsystemSomProdusentv3.png "Sekvensdiagram")

1 - 2. Før fagsystemet skal sende bekymringsmelding må det gjøres et oppslag på kommunenummer for å finne ut hvilke barnevernskontorer (bydeler) som støttes av løsningen. Returnerer liste med bydeler i kommunen. Dersom det returneres en tom liste har ikke kommunen aktivert løsningen. Dersom listen ikke er tom vil det alltid være et element (en bydel) som er satt opp som kan brukes dersom bydel/barnevernskontor er ukjent.

3 - 4. Når kommune og bydel er valgt må fagsystemet hente krypteringsnøkler. Det returneres en liste med to elementer som inneholder krypteringsnøkler. Den ene nøkkelen brukes for å kryptere PDF-versjonen av bekymringsmeldingen slik at det er mulig å sende den som brevpost. Den andre nøkkelen brukes for å kryptere ASIC-E filen som inneholder både JSON-dokumentet og PDF-dokumentet for nedlastning via fagsystem, alternativt via manuell nedlastning.

5 - 5. Fagsystemet må lage PDF basert på innholdet i bekymringsmeldingen. PDF må krypteres med printleverandør sin nøkkel.

6 - 6. Fagsystemet må lage PDF og JSON-dokument basert på innholdet i bekymringsmeldingen. Både PDF og JSON-dokument må pakkes inn i ASiC-E-kontainer, som deretter krypteres med nøkkel for maskinintegrasjon.

7 - 10. De krypterte filene (bekymringsmelding.pdf og asice.zip) sendes over til bekymringsmeldingsapiet som multipart-filer. Endepunkt bestemmes av om det er en privat melder eller offentlig melder som har skrevet bekymringsmeldingen. API-et returnerer en UUID som referanse på forsendelsen. Størrelsen på forsendelsen kan ikke overstige 5MB.

**Eksempel på innsending (Java med Jersey client)**
```java
        StreamDataBodyPart bekymringsmeldingPdf = new StreamDataBodyPart("bekymringsmelding", {bekymringsmeldingPdfInputStream}, "bekymringsmelding.pdf");
        StreamDataBodyPart asiceZip = new StreamDataBodyPart("asice", {bekymringsmeldingAsiceInputStream}, "asice.zip");

        Client client = ClientBuilder.newBuilder().register(MultiPartFeature.class).build();
        MultiPart multipart = new FormDataMultiPart().bodyPart(bekymringsmeldingPdf).bodyPart(asiceZip);

        client.target({url})
                .request()
                .header("IntegrasjonId", {integrasjonId})
                .header("IntegrasjonPassord", {integrasjonPassord})
                .header("Authorization", "Bearer {token}")
                .post(Entity.entity(multipart, multipart.getMediaType()));
```
hvor:

- bekymringsmeldingPdfInputStream: InputStream av bekymringsmelding.pdf

- bekymringsmeldingAsiceInputStream: InputStream av asice.zip

- url

  - Privat bekymringsmelding test: ``https://api.fiks.test.ks.no/bekymringsmelding/api/v1/mottak/fagsystem/{fraFiksOrgId}/{kommunenummer}/{bydelsnummer}/privat``

  - Offentlig bekymringsmelding test: ``https://api.fiks.test.ks.no/bekymringsmelding/api/v1/mottak/fagsystem/{fraFiksOrgId}/{kommunenummer}/{bydelsnummer}/offentlig``

  - Privat bekymringsmelding prod: ``https://api.fiks.ks.no/bekymringsmelding/api/v1/mottak/fagsystem/{fraFiksOrgId}/{kommunenummer}/{bydelsnummer}/privat``

  - Offentlig bekymringsmelding prod: ``https://api.fiks.ks.no/bekymringsmelding/api/v1/mottak/fagsystem/{fraFiksOrgId}/{kommunenummer}/{bydelsnummer}/offentlig``
- Url-param fraFiksOrgId: Fiks Organisasjon ID til organisasjonen som fagsystemet sender meldinger på vegne av
- Url-param kommunenummer: Kommunenummer man sender til
- Url-param bydelsnummer: Bydelsnummer man sender til
- integrasjonsId: Integrasjonsid i form av en UUID
- integrasjonPassord: Integrasjonspassord
- token: Gyldig aksesstoken fra maskinporten

**Hente status for sendt bekymringsmelding**
Et fagsystem kan hente status med tilhørende historikk for sendte bekymringsmeldinger via API-et [Bekymringsmelding mottak fagsystem](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/bekymringsmelding-mottak-fagsystem-api-v1.json).

Endepunktet `/bekymringsmelding/api/v1/mottak/fagsystem/{fraFiksOrgId}/bekymringsmelding/{bekymringsmeldingId}/status` returnerer en liste av alle hendelsene for den angitte bekymringsmelding-id-en. Hver hendelse inneholder en tilstand for bekymringsmeldingen, som kan inneholde følgende verdier:

* `AKSEPTERT` (alltid 1. tilstand) - Fiks Bekymringsmelding har mottatt og lagret bekymringsmeldingen.
* `SENDT_FAGSYSTEM` (alltid 2. tilstand) - Bekymringsmeldingen er sendt til fagsystemet til mottakeren.
* `AVVIST_FAGSYSTEM` - Fagsystemet har avvist mottak av bekymringsmeldingen. Fiks Bekymringsmelding vil automatisk sende denne til brevpost.
* `SENDT_PRINT` - Bekymringsmeldingen er sendt til printleverandør for å sende den med brevpost.
* `AVVIST_PRINT` - Printleverandøren kan ikke printe ut bekymringsmeldingen for brevpost. Fiks følger opp bekymringsmeldingen manuelt.
* `LEVERT` (alltid siste tilstand) - Bekymringsmeldingen er levert fagsystem eller sendt som brevpost til barnevernskontoret.

`LEVERT` vil alltid være den siste endelige tilstanden til en bekymringsmelding. Da vil den enten ha blitt bekreftet mottatt til fagsystemet, eller i tilfelle man tidligere har mottatt `SENDT_PRINT`, så vil den ha blitt levert posten for levering som brevpost. 

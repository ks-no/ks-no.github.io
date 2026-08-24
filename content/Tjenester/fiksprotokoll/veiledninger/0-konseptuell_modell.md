---
title: Konseptuell modell for Fiks Protokoll
date: 2026-08-24
weight: 0
aliases:
  - /tjenester/fiksprotokoll/veiledning_0_konseptuell_modell/
  - /fiks-plattform/tjenester/fiksprotokoll/brukerveiledning/konseptuell_modell/
---

**Fiks Protokoll** er et produkt fra KS Digital som muliggjør maskin-til-maskin kommunikasjon mellom forskjellige programvare-systemer.  Det fungerer som et nav i et hjul, som mottar meldinger fra et system og sender det videre til et annet.  Hvilke systemer som kommuniserer, på vegne av hvem, om hva, er en del av Fiks Protokoll sin konfigurasjon. 

I Fiks Protokoll vil du møte på en del begreper som kan oppfattes som abstrakte og vanskelige å forstå. Her vil vi ta en liten rundtur i Fiks Protokoll sin konseptuelle modell, og prøve å kaste litt lys på hva de forskjellige elementene egentlig er. 

## Protokoll 

I Fiks Protokoll er **Protokoll** et begrep som definerer en standard for hvilke meldinger som kan sendes mellom systemer som støtter protokollen, og hvilken informasjon som inngår i de forskjellige meldingene.  Et fagsystem vil kunne kommunisere  med alle systemer som støtter den protokollen fagsystemet trenger, og som den har fått tilgang til gjennom tilgangsstyringen. 

Et eksempel på en protokoll i Fiks Protokoll er Fiks-Arkiv.  Dette er en protokoll som beskriver hvilke meldinger som kan sendes og mottas mellom et fagsystem og et arkivsystem som skal arkivere dokumenter og annen informasjon på vegne av fagsystemet. For Fiks arkiv  er dette begreper som **Saksmappe**, **Journalpost**, **Dokumentobjekt** osv

En Protokoll kan eksistere i forskjellige versjoner.  


## Part 

En **Protokoll** kan ha 1 eller flere **Part**er.  En **Part** er en samling meldingstyper som en **Protokoll** kan sende og/eller motta.  Ofte vil en **Part** defineres i forhold til et spesifikt bruksområde for **Protokollen**

For eksempel har **Fiks Arkiv** bl.a partene _arkiv.arkivering_, _arkiv.innsyn_, _klient.arkivering_, hvor de to førstnevnte støttes av arkivsystemet, og sistnevnte støttes av systemet som er en klient av arkivsystemet. 

Hvilke **Part**er som finnes for en **Protokoll** og hvilke meldingstyper som inngår i disse er definert av **Fiks Protokoll**, og kan ikke konfigureres i Fiks Forvaltning.  Innholdet i Partene vil også variere mellom de forskjellige versjonene av Protokollen. 

## Melding 

En melding er en stykke informasjon som sendes mellom to Systemer i en **Integrasjon** mellom 2 **System**er.  Innholdet i den er definert av en meldingstype i en spesifikk **Protokoll** versjon.

## System 

Et **System** er enten et fagsystem eller et leverandørsystem.  Et system må ha en **Integrasjon** for å kunne kommunisere med **Fiks Protokoll**.  I tillegg må det ha fått tilgang til minst en **Konto**

## Integrasjon 

Et **System** må ha en **Integrasjon** definert for å kunne kommunisere vha **Fiks Protokoll**.  Det brukes til å koble et fagsystem til en tjeneste  hos oss. En **Integrasjon** har bl.a  følgende attributter: 

- id (brukernavn)
- et passord 
- organisasjonsnummer for **Virksomhetssertifikatet** systemet/integrasjonen kommuniserer på vegne av 
- Beskrivelse - fritekst som beskriver omfanget av integrasjonen

Integrasjonen sier med andre ord hvem systemet opererer på vegne av.  Organisasjonsnummeret kan være Leverandøren sitt eller tilhøre kunden leverandøren opererer på vegne av. 

## Konto 

En **Konto** er en kanal eller kø hvor det flyter **Melding**er i henhold til en gitt **Protokoll**. En **Konto** støtter en eller flere **Part**er.  En **Konto** definerer en kopling mellom **Fiks Protokoll** og et **System**

Et eksempel kan være  **Storevik kommune** benytter systemet fagsystemet _KommuneJournal_ for sin epost-journal, og arkivsystemet  _Mega Arkiv 2000_ som arkiv for denne.  I **Fiks Protokoll**  er det da definert to **Konto**er for denne koplingen.  En for _KommuneJournal_ og en for _Mega Arkiv 2000_.  Kontoen for førstnevnte støtter **Part**en _klient.arkivering_ og sistnevnte **Part**en _arkiv.arkivering_ 

## Tilgangskontroll 

Et **System** vil ikke ha tilgang til en **Konto** med mindre en administrator har koplet Konten til Systemet.  Et System kan be om tilgang til en **Konto** som tilhører et **System** fra en annen eierorganisasjon.  I så fall må en administrator for den andre eierorganisasjonen godkjenne denne tilgangen før meldinger kan sendes gjennom **Kontoen**

## Virksomhetssertifikat 

Et **virksomhetssertifikat** er et digitalt sertifikat (elektronisk ID) som er utstedt til en virksomhet (bedrift, organisasjon eller offentlig etat) i stedet for til en enkeltperson. Det brukes til å bekrefte virksomhetens identitet elektronisk og til å sikre kommunikasjon og transaksjoner digitalt.

## Offentlig Nøkkel 

Alle meldinger som sendes gjennom **Fiks Protokoll** er krypterte, slik at innholdet i disse kun er forståelige for avsender og mottaker.  For at en mottaker skal kunne dekryptere en melding sendt av en avsender, trenger mottakeren tilgang til avsenderens offentlige nøkkel. Dette er også et digitalt sertifikat, men må ikke forveksles med **Virksomhetssertifikat**et diskutert ovenfor. 



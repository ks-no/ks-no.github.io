---
title: Konseptuell modell for Fiks Protokoll
date: 2026-08-24
weight: 1
aliases:
  - /tjenester/fiksprotokoll/konseptuell_modell/
  - /fiks-plattform/tjenester/fiksprotokoll/konseptuell_modell/
---

**Fiks Protokoll** er et produkt fra KS Digital som muliggjør maskin-til-maskin kommunikasjon mellom forskjellige programvare-systemer.  Det fungerer som et nav i et hjul, som mottar meldinger fra et system og sender det videre til et annet.  Hvilke systemer som kommuniserer, på vegne av hvem, om hva, er en del av Fiks Protokoll sin konfigurasjon. 

I Fiks Protokoll vil du møte på en del begreper som kan oppfattes som abstrakte og vanskelige å forstå. Her vil vi ta en liten rundtur i Fiks Protokoll sin konseptuelle modell, og prøve å kaste litt lys på hva de forskjellige elementene egentlig er. 

## Protokoll 

**Protokoll** – definisjon av en spesifikk protokoll, med meldingstyper og parter. F.eks. `no.ks.fiks.arkiv.v1` og `no.ks.fiks.plan.v1`.

I Fiks Protokoll er **Protokoll** et begrep som definerer en standard for hvilke meldinger som kan sendes mellom systemer som støtter protokollen, og hvilken informasjon som inngår i de forskjellige meldingene.  Et fagsystem vil kunne kommunisere  med alle systemer som støtter den protokollen fagsystemet trenger, og som den har fått tilgang til gjennom tilgangsstyringen. 

Et eksempel på en protokoll i Fiks Protokoll er Fiks-Arkiv.  Dette er en protokoll som beskriver hvilke meldinger som kan sendes og mottas mellom et fagsystem og et arkivsystem som skal arkivere dokumenter og annen informasjon på vegne av fagsystemet. For Fiks arkiv  er dette begreper som **Saksmappe**, **Journalpost**, **Dokumentobjekt** osv

En Protokoll kan eksistere i forskjellige versjoner.  


## Part 

**Protokollpart** – en rolle som er definert i en protokoll. Hver part bestemmer hvilke meldingstyper en konto kan sende og motta, og hvilke andre parter den kan utveksle meldinger med. Når du oppretter en konto, velger du hvilken part den skal være — typisk fagsystem-siden eller arkiv-siden i en protokoll. To kontoer kan bare utveksle meldinger hvis partene deres er definert til å kommunisere med hverandre. Hvilke parter en protokoll har, ser du i [protokollens beskrivelse]({{% ref "protokoller" %}}).

For eksempel har **Fiks Arkiv** bl.a partene _arkiv.arkivering_, _arkiv.innsyn_, _klient.arkivering_, hvor de to førstnevnte støttes av arkivsystemet, og sistnevnte støttes av systemet som er en klient av arkivsystemet. 

Hvilke **Part**er som finnes for en **Protokoll** og hvilke meldingstyper som inngår i disse er definert av **Fiks Protokoll**, og kan ikke konfigureres i Fiks Forvaltning.  Innholdet i Partene kan og vil også variere mellom de forskjellige versjonene av Protokollen. 

## Melding 

En **Melding** er et stykke informasjon som sendes mellom to Systemer i en **Integrasjon** mellom 2 **System**er.  Innholdet i den er definert av en **Meldingstype** i en spesifikk **Protokoll** versjon.

## Meldingstype

**Meldingstype** – meldinger som sendes må ha en meldingstype. Gyldige meldingstyper defineres av protokollen, og vil typisk måtte følge meldingsskjema definert i enten XSD eller JSON-skjema.

## System 

**Protokollsystem** – et system som skal sende og motta meldinger over Fiks Protokoll (f.eks. et arkiv, et fagsystem som skal arkivere, en matrikkelklient). Et system kan bruke flere protokoller, f.eks. både Fiks Arkiv og Fiks Plan.

For at et **Protokollsystem** skal kunne kommunisere med et annet system vha Fiks Protokoll, må det være definert som et System i Fiks Protokoll. I tillegg må det være definert en **Integrasjon** for Systemet, og Systemet må ha blitt gitt tilgang til minst en **Konto**

## Integrasjon 

* **Integrasjon** – på Fiks-plattformen brukes integrasjoner for maskinpålogging sammen med Maskinporten. Hvert system får opprettet en integrasjon som brukes for alle kontoer under systemet. Integrasjonen kan sende og motta meldinger, og dersom valgt også konfigurere systemet og opprette nye kontoer. Se [Felles → Integrasjoner]({{% ref "/Felles/integrasjoner.md" %}}).

Et **System** må ha en **Integrasjon** definert for å kunne kommunisere vha **Fiks Protokoll**.  Integrasjonen brukes til å koble et fagsystem til en tjeneste  hos oss, og forteller hvem systemet opererer på vegne av.  En **Integrasjon** har bl.a  følgende attributter: 

- id (brukernavn)
- et passord 
- organisasjonsnummer for **Virksomhetssertifikatet** systemet/integrasjonen kommuniserer på vegne av 
- Beskrivelse - fritekst som beskriver omfanget av integrasjonen

Organisasjonsnummeret kan være Leverandøren sitt eller tilhøre kunden leverandøren opererer på vegne av.  Kunde og Leverandør bør avklare på et tidlig tidspunkt hvilken verdi som skal benyttes her. 

En Integrasjon har også et sett med tilganger, som beskriver hvilke ressurser/systemer den har tillatelse til interagere med.  

## Konto 

En **Protokollkonto** er en kanal eller kø hvor det flyter **Melding**er i henhold til en gitt **Protokoll**. En **Konto** støtter en eller flere **Part**er.  En **Konto** definerer en kopling mellom **Fiks Protokoll** og et **System**. Et **Protokollsystem** kan ha flere protokollkontoer. 

Et eksempel kan være  **Storevik kommune** benytter systemet fagsystemet _KommuneJournal_ for sin epost-journal, og arkivsystemet  _Mega Arkiv 2000_ som arkiv for denne.  I **Fiks Protokoll**  er det da definert to **Konto**er for denne koplingen.  En for _KommuneJournal_ og en for _Mega Arkiv 2000_.  Kontoen for førstnevnte støtter **Part**en _klient.arkivering_ og sistnevnte **Part**en _arkiv.arkivering_ 

## Fiks IO 

**Fiks IO** – kanalen som brukes for å sende meldinger i Fiks Protokoll. Se [Fiks IO]({{% ref "fiksio.md" %}}).

**Fiks IO-konto** – meldinger sendes og mottas over Fiks IO med en Fiks IO-konto. Fiks IO-kontoen har samme ID som protokollkontoen. Protokollkontoen er en wrapper rundt Fiks IO-kontoen for å muliggjøre tilgangsstyring i Fiks Protokoll og validering av meldinger. En Fiks IO-konto er også en kø som holder på meldingene den mottar.

## Tilgangskontroll 

Et **System** vil ikke ha tilgang til en **Konto** med mindre en administrator har koplet Konten til Systemet.  Et System kan be om tilgang til en **Konto** som tilhører et **System** fra en annen eierorganisasjon.  I så fall må en administrator for den andre eierorganisasjonen godkjenne denne tilgangen før meldinger kan sendes gjennom **Kontoen**

## Virksomhetssertifikat 

Et **virksomhetssertifikat** er et digitalt sertifikat (elektronisk ID) som er utstedt til en virksomhet (bedrift, organisasjon eller offentlig etat) i stedet for til en enkeltperson. Det brukes til å bekrefte virksomhetens identitet elektronisk og til å sikre kommunikasjon og transaksjoner digitalt.

## Offentlig Nøkkel 

Alle meldinger som sendes gjennom **Fiks Protokoll** er krypterte, slik at innholdet i disse kun er forståelige for avsender og mottaker.  For at en mottaker skal kunne dekryptere en melding sendt av en avsender, trenger mottakeren tilgang til avsenderens offentlige nøkkel. Dette er også et digitalt sertifikat, men må ikke forveksles med **Virksomhetssertifikat**et diskutert ovenfor. 


## Arkitektur

Her er en forenklet oversikt over Fiks Protokoll-arkitekturen:

![Fiks Protokoll arkitektur](/tjenester/images/fiks-protokoll-arkitektur-innsikt.png "Fiks Protokoll arkitektur oversikt")

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

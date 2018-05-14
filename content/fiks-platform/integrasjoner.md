---
title: Integrasjonsutvikling
date: 2018-01-02
---

### Integrasjoner
Før eksterne systemer kan integreres med plattformen må det opprettes en integrasjon inne i konfigurasjonsgrensesnittet.
Integrasjonen bør gis et beskrivende navn, i tillegg til at organisasjonsnummeret som ligger i virksomhetssertifikatet som
skal brukes til å kalle tjenesten må skrives inn. Etter at integrasjonen er opprettet vil den være tilgjengelig for alle 
tjenester tilhørende organisasjonen den ble opprettet for.

En integrasjon må autoriseres for å bruke tjenester i plattformen. Om man for eksempel ønsker å aktivere en integrasjon
som skal kunne indeksere meldinger for MinSide Søk må dette gjøres på konfigurasjonssiden. Dette vil sørge for at 
nødvendige rettigheter blir tildelt.

Plattformen har også noen integrasjoner som kalles "globale integrasjoner". Dette er integrasjoner som er tilgjengelig for
alle organisasjoner. Dette kan for eksempel være integrasjonen som henter meldinger fra SvarUt og gjør disse tilgjengelig 
i MinSide Søk.

## Teknologier

### REST
Vi benytter REST lignenede grensesnitt på alle api så lenge det er gunstig. Kun ved spesielle behov vil det bli benyttet 
annen teknologi. Spesifikasjonen vil bli publisert ved OpenAPI spec. Da finnes det mange verktøy for å lage klienter i 
forskjellige språk og teknologier. Vi vil benytte UTF-8 charset på alt om ikke annet er spesifisert.

Readtimeout på 30 sekund er fint som default. De operasjoenen som trenger noe annet vil spesifisere det.

## Konfigurasjon
Følgende må gjøres i fiks konfigurasjon for å opprette og konfigurere en integrasjon:

* _Sett autorisert organisasjon_. Dette vil som regel være organisasjonen som eier systemet som skal integrere seg mot Fiks, for eksempel hvis et fagsystem installert hos Bergen Kommune skal integreres mot meldingsboksen. 
* _Genererer servicepassord_.
* _Tildel navn_. Et visningsnavn for integrasjonen.
* _Sett beskrivelse_. En beskrivelse av hva integrasjonen er og hvilke oppgaver den løsner. 
* _Sett tjenester_. Hvilke tjenester er denne integrasjonen aktuell for?

### Autentisering
Integrasjoner autentiseres ved hjelp av to mekanismer:

 Organisasjonen henter et OAuth 2.0 access token fra ID-Porten, basert på organisasjonens virksomhetssertifikat. Dokumentasjon for dette finnes [her](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_auth_server-to-server-oauth2.html). Vi støtter i første omgang kun JWT access_tokens, dette må konfigureres hos idporten.  I tillegg trengs en brukernavn/passord header: integrasjonens id plasseres i en IntegrasjonId header på requesten, sammen med et ServicePassword. Disse generereres under oppretting av en integrasjon på [fiks-konfigurasjon]({{< ref "konfigurasjon.md" >}}). 
   
Kallet mot Fiks-platform tjenesten trenger dermed følgende HTTP headere:
 
* _Authorization_: OAuth-2.0 Jwt Access token som bekrefter organisasjonens identitet, signert av ID-Porten. Scope skal være "ks".
* _IntegrasjonId_: Id for integrasjonen, generert i Fiks-Konfigurasjon. Orgnr i Jwt'en i _Authorization_ header må være konfigurert som autorisert organisasjon for integrasjonen.
* _ServicePassword_: Passord for integrasjonen, generert i Fiks-Konfigurasjon

### Autorisering
I tillegg må integrasjonen autoriseres for tilgang til en spesifikk tjeneste. Hvis for eksempel et fagsystem skal kunne laste opp meldinger til Meldingsboksen må en administrator i kommunen benytte Fiks-Konfigurasjon for å legge til denne tilgangen hos den relvante kommunen.

Dette gjelder også for integrasjoner som leveres som en del av fiks-plattformen. Skal SvarUt kunne indeksere forsendelse i meldingsboksen må også her kommunen eksplisitt autorisere dette.

### Huskeliste
* access_token fra idporten
* access_token må ha scope ks
* Read timeout: 30 sekunder
* Charset UTF-8

ls

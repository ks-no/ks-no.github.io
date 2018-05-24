---
title: Integrasjonsutvikling
date: 2018-01-02
---

En _integrasjon_ på fiks-plattformen er en maskin-til-maskin klient som benytter tjenestelaget for å utføre oppgaver på vegne av en fiks-organisasjon. Dette kan for eksempel være et arkivsystem som sender saker gjennom [fiks-svarinn]({{< ref "svarInn.md" >}}), eller et fagsystem som oppdaterer meldinger i [fiks-meldingsboks]({{< ref "meldingsboks.md" >}}).

Når en fiks-organisasjon tar i bruk plattformen vil man se at det allerede finnes en del forhåndsdefinerte integrasjoner, for eksempel en SvarUt integrasjon mot meldingsboksen. Dette er "globale integrasjoner" som blir tilgjengelig for alle fiks-organisasjoner uten at hver organisasjon trenger å opprette dem. Ta kontakt med fiks-kundeservice om du ønsker å opprette en global integrasjon.

Hver fiks-organisasjon kan også opprette sine egne integrasjoner - dette gjøres gjennom [fiks-konfigurasjon]({{< ref "konfigurasjon.md" >}}). Her opprettes integrajonen, og man definerer hvilken organisasjon som skal ha rett til å gjøre kall med integrasjonen. Dette kan være fiks-organisasjonen selv, eller en tredjepart som drifter løsningen på vegne av organisasjonen. Se under for detaljer om opprettelse av integrasjoner.

Etter organisasjonen er opprettet må den autoriseres for å kunne handle på vegne av en fiks-organisasjon. Om man for eksempel ønsker å autorisere en integrasjon for å indeksere meldinger [fiks-meldingsboks]({{< ref "meldingsboks.md" >}}) må det relevante privilegiet tildeles på konfigurasjonssiden for denne tjenesten.

## Grensesnitt
Tjenestene på fiks-plattformen vil som hovedregel benytte REST/json.

Vi publiserer [OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification) basert dokumentasjon for alle api'er. I dag benyttes 2.0, med plan om migrering til 3.0 når denne får videre støtte. Disse spesifikasjonene er nyttige både som dokumentasjon for rest-grensesnittet, men kan også brukes for å automatisk generere klienter og modell-objekter, for eksempel ved bruk av [Swagger Codegen](https://swagger.io/swagger-codegen/). 

## Konfigurasjon
En fiks-organisasjon kan opprette egen integrasjoner gjennom [fiks-konfigurasjon]({{< ref "konfigurasjon.md" >}}).

* _Sett autorisert organisasjon_. Dette vil som regel være organisasjonen som drifter systemet som skal integreres, enten fiks-organisasjonen selv eller en tredjepart.
* _Genererer servicepassord_. Dette må opplyses for å autentisere integrasjonen, se under for detaljer.
* _Tildel navn_. Et visningsnavn for integrasjonen.
* _Sett beskrivelse_. En beskrivelse av hva integrasjonen er og hvilke oppgaver den løsner. 
* _Sett tjenester_. Hvilke tjenester er denne integrasjonen aktuell for?

## Autentisering
Integrasjoner autentiseres ved hjelp av to mekanismer:

 Organisasjonen henter et OAuth 2.0 access token fra ID-Porten, basert på organisasjonens virksomhetssertifikat. Dokumentasjon for dette finnes [her](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_auth_server-to-server-oauth2.html). Vi støtter i første omgang kun JWT access_tokens, dette må konfigureres hos idporten.  I tillegg trengs en brukernavn/passord header: integrasjonens id plasseres i en IntegrasjonId header på requesten, sammen med et ServicePassword. Disse generereres under oppretting av en integrasjon på [fiks-konfigurasjon]({{< ref "konfigurasjon.md" >}}). 
   
Kallet mot Fiks-platform tjenesten trenger dermed følgende HTTP headere:
 
* _Authorization_: OAuth-2.0 Jwt Access token som bekrefter organisasjonens identitet, signert av ID-Porten. Scope skal være "ks".
* _IntegrasjonId_: Id for integrasjonen, generert i Fiks-Konfigurasjon. Orgnr i Jwt'en i _Authorization_ header må være konfigurert som autorisert organisasjon for integrasjonen.
* _ServicePassword_: Passord for integrasjonen, generert i Fiks-Konfigurasjon

## Autorisering
I tillegg må integrasjonen autoriseres for tilgang til en spesifikk tjeneste. Hvis for eksempel et fagsystem skal kunne laste opp meldinger til Meldingsboksen må en administrator i kommunen benytte Fiks-Konfigurasjon for å legge til denne tilgangen hos den relvante kommunen.

Dette gjelder også for integrasjoner som leveres som en del av fiks-plattformen. Skal SvarUt kunne indeksere forsendelse i meldingsboksen må også her kommunen eksplisitt autorisere dette.

## Huskeliste
* access_token fra idporten
* access_token må ha scope ks
* Read timeout: 30 sekunder
* Charset UTF-8

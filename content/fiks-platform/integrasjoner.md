---
title: Integrasjonsutvikling
date: 2018-01-02
---

En _integrasjon_ på fiks-plattformen er en maskin-til-maskin klient som benytter tjenestelaget for å utføre oppgaver på vegne av en fiks-organisasjon. Dette kan for eksempel være et arkivsystem som sender saker gjennom [Fiks SvarInn]({{< ref "svarInn.md" >}}), eller et fagsystem som oppdaterer meldinger i [Fiks Innsyn]({{< ref "innsyn.md" >}}).

Når en fiks-organisasjon tar i bruk plattformen vil man se at det allerede finnes en del forhåndsdefinerte integrasjoner, for eksempel en SvarUt integrasjon mot Fiks Innsyn. Dette er "globale integrasjoner" som blir tilgjengelig for alle fiks-organisasjoner uten at hver organisasjon trenger å opprette dem. Ta kontakt med fiks-kundeservice om du på denne måten ønsker å gjøre en av dine integrasjoner tilgjengelig på hele plattformen. Dette er for det meste relevant for leverandører av skyløsninger for flere kommuner.

Hver fiks-organisasjon kan også opprette sine egne "lokale" integrasjoner - dette gjøres gjennom [Fiks Konfigurasjon]({{< ref "konfigurasjon.md" >}}). Her opprettes integrasjonen, og man definerer hvilken organisasjon som skal ha rett til å sende forespørseler til fiks-plattformen på vegne av denne. Organisasjonen kan være fiks-organisasjonen selv, eller en tredjepart som har driftsansvar. Se under for detaljer om opprettelse av integrasjoner.

Etter organisasjonen er opprettet må den autoriseres for å kunne handle på vegne av en fiks-organisasjon. Om man for eksempel ønsker å autorisere en integrasjon for å indeksere meldinger [Fiks Innsyn]({{< ref "innsyn.md" >}}) må det relevante privilegiet tildeles på konfigurasjonssiden for denne tjenesten. Dette gjelder også for globale integrasjoner.

## Grensesnitt
Integrasjoner mot fiks-plattformen vil hovedsakelig benytte grensesnitt basert på REST/json.

Vi publiserer [OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification) for alle api'er. I dag benyttes versjon 2.0, med plan om migrering til 3.0 etter hvert som verktøy får støtte for denne. Disse spesifikasjonene er nyttige både som dokumentasjon for rest-grensesnittet og som grunnlag for automatisk generering av klienter og modell-objekter. Dette kan for eksempel gjøres ved bruk av [Swagger Codegen](https://swagger.io/swagger-codegen/). 

## Konfigurasjon
En fiks-organisasjon kan opprette egen integrasjoner gjennom [fiks-konfigurasjon]({{< ref "konfigurasjon.md" >}}).

* _Sett autorisert organisasjon_. Dette vil som regel være organisasjonen som drifter systemet som skal integreres, enten fiks-organisasjonen selv eller en tredjepart.
* _Genererer servicepassord_. Dette må opplyses for å autentisere integrasjonen, se under for detaljer.
* _Tildel navn_. Et visningsnavn for integrasjonen.
* _Sett beskrivelse_. En beskrivelse av hva integrasjonen er og hvilke oppgaver den løsner. 
* _Sett tjenester_. Hvilke tjenester er denne integrasjonen aktuell for?

## Autentisering
Integrasjoner autentiseres på to ulike måter: som "integrasjon" med oAuth 2.0, eller "integrasjon-person" m. Open Id Connect (OIDC). 

### Integrasjon
Denne metoden benyttes for ren server til server integrasjon, for eksempel når et fagsystem skal laste opp meldinger til  [Fiks Innsyn]({{< ref "innsyn.md" >}}). Organisasjonen henter et OAuth 2.0 access token med scope "ks" fra ID-Porten, basert på organisasjonens virksomhetssertifikat. Dokumentasjon for dette finnes [her](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_auth_server-to-server-oauth2.html). Vi støtter i første omgang kun JWT access_tokens, dette må konfigureres hos ID-Porten.  I tillegg til dette tokenet må man ha en header for integrasjonId og for integrasjonPassord. 
   
Kallet mot Fiks-platform tjenesten trenger dermed følgende HTTP headere:
 
* _Authorization_: OAuth-2.0 Jwt Access token som bekrefter organisasjonens identitet, signert av ID-Porten. Scope skal være "ks".
* _IntegrasjonId_: Id for integrasjonen, generert i Fiks-konfigurasjon. Orgnr i Jwt'en i _Authorization_ header må være konfigurert som autorisert organisasjon for integrasjonen.
* _IntegrasjonPassord_: Passord for integrasjonen (fra fiks-konfigurasjon)

### Integrasjon-person
Denne metoden benyttes hvis en innbygger er logget inn på en server i en kommune, og man ønsker å gjøre en forespørsel på vegne av denne inbyggeren. Man trenger fortsatt integrasjonid og integrasjonpassord, men i stede for virksomhetens access token sender man brukerens, innhentet med "ks" scope via OIDC fra ID-Porten.  
   
Kallet mot Fiks-platform tjenesten trenger dermed følgende HTTP headere:
 
* _Authorization_: OAuth-2.0 Jwt Access token som bekrefter inbyggerens identitet (fnr), signert av ID-Porten. Scope skal være "ks".
* _IntegrasjonId_: Id for integrasjonen, generert i Fiks-konfigurasjon. Orgnr i Jwt'en i _Authorization_ header må være konfigurert som autorisert organisasjon for integrasjonen.
* _IntegrasjonPassord_: Passord for integrasjonen (fra fiks-konfigurasjon)

{{< highlight sh}}
http POST https://api.fiks.test.ks.no/innsyn-sok/api/v1/sok \
"IntegrasjonId: <din integrasjon id>" \
"IntegrasjonPassord: <ditt integrasjon passord" \
"Authorization: Bearer <gyldig access token jwt fra id-porten>"
{{< / highlight >}}

## Autorisering
I tillegg må integrasjonen autoriseres for tilgang til en spesifikk tjeneste. Hvis for eksempel et fagsystem skal kunne laste opp meldinger til Fiks Innsyn må en administrator i kommunen benytte Fiks-Konfigurasjon for å legge til denne tilgangen hos den relvante kommunen.

Dette gjelder også for integrasjoner som leveres som en del av fiks-plattformen. Skal SvarUt kunne indeksere forsendelse i Fiks Innsyn må også her kommunen eksplisitt autorisere dette.


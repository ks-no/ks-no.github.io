---
title: Integrasjonsutvikling
date: 2019-09-19
aliases: [/fiks-platform/integrasjoner]
---

En _integrasjon_ på Fiks-plattformen er en maskin-til-maskin klient som benytter tjenestelaget for å utføre oppgaver på vegne av en fiks-organisasjon. Dette kan for eksempel være et arkivsystem som sender saker gjennom [Fiks SvarInn]({{< ref "fiksio.md" >}}), eller et fagsystem som oppdaterer meldinger i [Fiks Innsyn]({{< ref "innsyn.md" >}}).

Når en Fiks-organisasjon tar i bruk plattformen vil man se at det allerede finnes en del forhåndsdefinerte integrasjoner, for eksempel en SvarUt-integrasjon mot Fiks Innsyn. Dette er "globale integrasjoner" som blir tilgjengelig for alle Fiks-organisasjoner uten at hver organisasjon trenger å opprette dem. Ta kontakt med fiks-kundeservice om du på denne måten ønsker å gjøre en av dine integrasjoner tilgjengelig på hele plattformen. Dette er for det meste relevant for leverandører av skyløsninger for flere kommuner.

Hver Fiks-organisasjon kan også opprette sine egne "lokale" integrasjoner - dette gjøres gjennom Fiks Konfigurasjon. Her opprettes integrasjonen, og man definerer hvilken organisasjon som skal ha rett til å sende forespørseler til Fiks-plattformen på vegne av denne. Organisasjonen kan være Fiks-organisasjonen selv, eller en tredjepart som har driftsansvar. Se under for detaljer om opprettelse av integrasjoner.

Etter organisasjonen er opprettet må den autoriseres for å kunne handle på vegne av en Fiks-organisasjon. Om man for eksempel ønsker å autorisere en integrasjon for å indeksere meldinger [Fiks Innsyn]({{< ref "innsyn.md" >}}) må det relevante privilegiet tildeles på konfigurasjonssiden for denne tjenesten. Dette gjelder også for globale integrasjoner.

## Hvordan komme i gang med utviklingen

1. Bestill virksomhetssertifikat fra comfides eller buypass for test. **NB!** På grunn av krav fra DIFI/Maskinporten kan du ikke bruke _selvsignert sertifikat_ hverken i test eller produksjonsmiljø
1. Vi må ha org.nr på kontoen hos ID-porten (samme som i virksomhetssertifikatet), slik at vi får gitt dere tilgang til "ks:fiks"-scopet. Sendes til fiks-utvikling@ks.no
1. [Følg oppskrift her for å lage klient hos idporten](../difiidportenklient) 
1. Send en e-post til fiks-utvikling@ks.no med e-postadresser som vil ha tilgang til vår Slack support-kanal. Vi liker best å ta support på Slack-chat.
1. Har dere personinnlogginger i ID-porten test, send disse i en e-post til oss slik at vi kan sette opp test kommune/organisasjon i test. fiks-utvikling@ks.no Hvis ikke får dere testpersoner av oss.
1. Ta kontakt på Slack-kanalen hvis dere står fast eller ønsker å få tilbakemelding på om dere bruker api-ene korrekt.

## Hvordan få tilgang i produksjon

1. Bestill virksomhetsertifikat fra comfides (https://www.commfides.com/commfides-virksomhetssertifikat/) eller buypass ( https://www.buypass.no/produkter/virksomhetssertifikat-esegl ), hvis dere ikke har et.
1. Send orgnr til oss (hovedorgnr til organisasjonen) det som ligger i virksomhetsertifikatet. fiks-utvikling@ks.no og si dere trenger tilgang til fiks.
1. Bestill tilgang til Maskinporten/Idporten hos difi. For personinnlogga websider må du ha idporten, for applikasjoner der du ikke er logget inn via idporten må en ha maskinporten.
  * For å opprette tilgang må en bruke selvbetjening: https://samarbeid.digdir.no/maskinporten/ta-i-bruk-maskinporten/97
  * Gå inn på https://minside-samarbeid.digdir.no/my-organisation/integrations/admin
  *  [Følg oppskrift her for å lage klient hos idporten](../difiidportenklient) 
1. Gå til https://forvaltning.fiks.ks.no og lag en integrasjon. Og gi tilgang til de tjenestene applikasjonen trenger.

## Grensesnitt
Integrasjoner mot Fiks-plattformen vil hovedsakelig benytte grensesnitt basert på REST/json.

Vi publiserer [OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification) for alle api'er. I dag benyttes versjon 3.0, noen tjenester kan være fortsatt være på 2.0. Disse spesifikasjonene er nyttige både som dokumentasjon for rest-grensesnittet og som grunnlag for automatisk generering av klienter og modell-objekter. Dette kan for eksempel gjøres ved bruk av [Swagger Codegen](https://swagger.io/swagger-codegen/). 

## Konfigurasjon
En Fiks-organisasjon kan opprette egen integrasjoner gjennom Fiks konfigurasjon.

* _Sett autorisert organisasjon_. Dette vil som regel være organisasjonen som drifter systemet som skal integreres, enten fiks-organisasjonen selv eller en tredjepart.
* _Genererer servicepassord_. Dette må opplyses for å autentisere integrasjonen, se under for detaljer.
* _Tildel navn_. Et visningsnavn for integrasjonen.
* _Sett beskrivelse_. En beskrivelse av hva integrasjonen er og hvilke oppgaver den løsner. 
* _Sett tjenester_. Hvilke tjenester er denne integrasjonen aktuell for?

## Autentisering
Integrasjoner autentiseres på to ulike måter: som "integrasjon" med oAuth 2.0, eller "integrasjon-person" m. Open Id Connect (OIDC). Fiks har laget klienter for å generere access token fra Maskinporten basert på et virksomhetssertifikat, en issuer (konto hos Difi) og ett eller flere scopes. Java-klient: [https://github.com/ks-no/fiks-maskinporten](https://github.com/ks-no/fiks-maskinporten), .net-klient: [https://github.com/ks-no/fiks-maskinporten-client-dotnet](https://github.com/ks-no/fiks-maskinporten).

### Integrasjon
Denne metoden benyttes for ren server til server integrasjon, for eksempel når et fagsystem skal laste opp meldinger til  [Fiks Innsyn]({{< ref "innsyn.md" >}}). Organisasjonen henter et OAuth 2.0 access token med scope "ks:fiks" fra ID-Porten, basert på organisasjonens virksomhetssertifikat. Dokumentasjon for dette finnes [her](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_auth_server-to-server-oauth2.html). Vi støtter i første omgang kun JWT access_tokens, dette må konfigureres hos ID-Porten.  I tillegg til dette tokenet må man ha en header for integrasjonId og for integrasjonPassord. 
   
Kallet mot Fiks-plattformtjenesten trenger dermed følgende HTTP headere:
 
* _Authorization_: OAuth-2.0 Jwt Access token som bekrefter organisasjonens identitet, signert av ID-Porten. Scope skal være "ks:fiks".
* _IntegrasjonId_: Id for integrasjonen, generert i Fiks-konfigurasjon. Org.nr i Jwt'en i _Authorization_ header må være konfigurert som autorisert organisasjon for integrasjonen.
* _IntegrasjonPassord_: Passord for integrasjonen (fra Fiks-konfigurasjon)

### Integrasjon-person
Denne metoden benyttes hvis en innbygger er logget inn på en server i en kommune, og man ønsker å gjøre en forespørsel på vegne av denne innbyggeren. Man trenger fortsatt integrasjon-ID og integrasjonpassord, men i stedet for virksomhetens access token sender man brukerens, innhentet med "ks:fiks" scope via OIDC fra ID-Porten.  
   
Kallet mot Fiks-plattformtjenesten trenger dermed følgende HTTP headere:
 
* _Authorization_: OAuth-2.0 Jwt Access token som bekrefter inbyggerens identitet (fnr), signert av ID-Porten. Scope skal være "ks:fiks".
* _IntegrasjonId_: Id for integrasjonen, generert i Fiks-konfigurasjon. Orgnr i Jwt'en i _Authorization_ header må være konfigurert som autorisert organisasjon for integrasjonen.
* _IntegrasjonPassord_: Passord for integrasjonen (fra fiks-konfigurasjon)

{{< highlight bash>}}
http POST https://api.fiks.test.ks.no/innsyn-sok/api/v1/sok \
"IntegrasjonId: <din integrasjon id>" \
"IntegrasjonPassord: <ditt integrasjon passord" \
"Authorization: Bearer <gyldig innbygger access token jwt fra id-porten>"
{{< / highlight >}}

## Autorisering
I tillegg må integrasjonen autoriseres for tilgang til en spesifikk tjeneste. Hvis for eksempel et fagsystem skal kunne laste opp meldinger til Fiks Innsyn må en administrator i kommunen benytte Fiks-Konfigurasjon for å legge til denne tilgangen hos den relvante kommunen.

Dette gjelder også for integrasjoner som leveres som en del av Fiks-plattformen. Skal SvarUt kunne indeksere forsendelse i Fiks Innsyn må også her kommunen eksplisitt autorisere dette.

## Feilmeldinger

De fleste REST API-ene returnerer feilmeldinger på følgende format:
```json
{
  "timestamp": 1637218198035,
  "status": 400,
  "error": "Bad Request",
  "errorId": "3389ad1b-afa4-42e1-b6f8-76f63e560ad5",
  "path": "/tjeneste/api/v1/ressurs/123456",
  "originalPath": "/tjeneste/api/v1/ressurs",
  "message": "Beskrivelse av feilen",
  "errorCode": "FEILKODE",
  "errorJson": {"antall":13}
}
```

- `timestamp` - Tidspunktet feilen oppstod i millisekunder siden epoch.
- `status` - HTTP-statuskode, f.eks. 400 eller 500.
- `error` - Beskrivelse av HTTP-statuskoden, f.eks. Bad Request eller Internal Server Error.
- `errorId` - Intern id som brukes til å finne informasjon relatert til feilen under feilsøking.
- `path` - Path requesten ble gjort mot.
- `originalPath` - Vil i sjeldne feilsituasjoner være noe annet enn det som er satt i path, og ellers ikke være satt.
- `message` - Menneskelig lesbar beskrivelse av feilen som oppstod.
- `errorCode` - Tjenestespesifikk feilkode for maskinell tolkning. Vil i de fleste situasjoner ikke være satt.
- `errorJson` - Detaljer knyttet til errorCode i JSON-format.

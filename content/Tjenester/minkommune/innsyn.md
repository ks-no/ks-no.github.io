---
title: Min kommune - innsyn
date: 2022-06-28
hidden: false
aliases: [/fiks-platform/tjenester/innsyn, /fiks-plattform/tjenester/innsyn, /fiks-plattform/tjenester/minside/innsyn/, /fiks-plattform/tjenester/minkommune/innsyn]
---

Norske kommuner har mengder av informasjon om sine innbyggere. Denne informasjonen er spredd rundt i arkiver, fagsystemer, dokumentlagre og eksterne skyløsninger. Fiks Innsyn lagrer metadata som beskriver denne informasjonen, og gjør den tilgjengelig for innbyggeren via en kraftig søkemotor. 

## Hvordan tar man i bruk Fiks Innsyn?
En kommune kan bruke Fiks Innsyn for å gjøre kommunal informasjon (forsendelser, byggesaker, eiendommer, fakturaer osv) tilgjengelig for innbyggere, endten på min.kommune.no eller i kommunens eksisterende løsninger.
![minside_integrasjoner](/images/innsyn_konfigurasjon_integrasjoner.png "Innsyn integrasjoner")

Uansett er første steg å sørge for metadata som beskriver informasjonen finnes i søkemotoren. Dette gjøres ved å legge til datakilder i konfigurasjonen av [innsyntjenesten](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester/innsyn) på forvaltning.fiks.ks.no. i form av integrasjoner. Dette kan være "nøkkelklare" integrasjoner levert av KS eller tredjepartsleverandører, for eksempel forsendelser fra SvarUt eller byggesaker fra GeoMatikk, eller integrasjoner kommunen lager selv. I skjermbildet over har en kommune lagt til SvarUt integrasjonen som kilde for innsyn, som gjør at alle forsendelser fra SvarUt-avsendere spesifisert i integrasjonens konfigurasjon blir tilgjengelig i "Post fra kommunen" på minside.kommune.no.  

Hvis kommunen benytter min.kommune.no er nå alt klart: innloggede innbyggere vil se sine meldinger i "Post fra kommunen" og andre innsyn-drevede tjenester. 

Hvis kommunen benytter en egen minside-løsning må også søket mot Fiks Innsyn gjøres via en integrasjon, som legges til på samme måte som datakilde-integrasjonene over. I noen tilfeller vil det finnes nøkkelklare leverandør-integrasjoner for dette, i andre må kommunen lage en egen integrasjon som leverandøren kan benytte. Kontakt leverandør for å avklare dette.

## Hvordan virker Fiks Innsyn?
![minside_sok](https://www.lucidchart.com/publicSegments/view/db355c1a-7955-4c4a-8ccf-ccd7e64424fd/image.png "Innsyn")
Tjenesten består av tre hovedkomponenter:
 
 * _Innsyn-webapplikasjoner_, et sett med SPA (Single Page Applications) på min.kommune.no som innbyggere benytter for å søke i innsynsdatabasen. Eksempler er "Post fra kommunen", "Byggesaker", osv.
 * _Innsyn-søk_, søkemotoren som utgjør back-end for webappliasjonene. Støtter fritekstsøk og score-rangerte resultater. 
 * _Innsyn-indexer_, en indekseringstjeneste som integrasjoner kan benytte for å laste opp metadata om informasjonen kommunen sitter på: hendelser, fakturaer, saker, journalposter, forsendelser, osv.  

Søk i innsyn gjøres via applikasjonene på min.kommune.no, eller direkte via et REST grensesnitt. Uansett baserer autentisering seg på innlogging via ID-Porten. En autentisert innbygger autoriserers for å lese en melding på en av fire måter:

* Meldingen er eksponert for innbyggerens fødselsnummer
* Innbyggeren har rollene "post/arkiv" eller "kommunale tjenester" i Altinn for organisasjonsnummeret meldingen er eksponert for
* Innbyggeren er markert som eier av matrikkelenheten meldingen er eksponert for, endten direkte eller via organisasjon.
* Meldingen er eksponert med type "offentlig", og er dermed tilgjengelig for alle autentiserte innbyggere.

Søket er i hovedsak basert på fri-tekst, og vil også da kompenserer for stavefeil, bøyeform eller orddeling. Noe filtrering er mulig (for eksempel på dato, avsender-organisasjon osv). Alle søk er også filtrert på innloggingsnivå. Et søk gjort med innlogging på nivå tre vil ikke returnere grupper som er satt til nivå fire, uavhengig av om disse gruppene traff på søket. Hvilket innloggingsnivå som kreves for å se hver enkelt melding er bestemt av interasjonen som indekserte meldingen i Innsyn.

Søkeresultatet scores og sorteres basert på relevans: nye meldinger scores høyere enn gamle, uleste dokumenter høyere enn de du har lest, ubetalte faktura høyere enn de du har betalt, og så videre. Det er også mulig å få resultatet sortert på dato.  

Søkemotoren inneholder utelukkende metadata, ikke selve dokumentet. Om meldingen skal peke til et dokument, bilde eller annen fil gjøres dette i form av en lenke: denne kan for eksempel peke til en fil i [Fiks Dokumentlager]({{< ref "dokumentlager.md" >}}), en sak i et kommunalt filarkiv, eller en annen tjeneste. Så lenge disse støtter innlogging gjennom ID-Porten vil nedlastingen oppleves sømløst av innbygger.

## Uvikling av integrasjoner som leverer data til Innsyn: 
Noen grunnleggende prinsipper for forvalting av meldinger i innsyn:

* _Alle dokumenter eies av en Fiks Organisasjon._ I de fleste tilfeller vil dette være en kommune eller en fylkeskommune. Det er denne organisasjonen som autoriserer indeksering av data, og har rett til å oppdatere eller slette disse, enten direkte eller via tredjepart.
* _Integrasjoner må autoriseres for å indeksere data på vegne av en av organisasjon._ Dette gjøres gjennom å tildele "Innsyn Index" privilegiet til integrasjonen i Fiks Konfigurasjon. Nøkkelklare integrasjoner vil automatisk bli tildelt de nødvendige privilegiene når de blir lagt til i Innsyn konfigurasjonen.
* _Hver integrasjon styrer dokumentene de har lastet opp på vegne av organisasjonen._ Dvs. at integrasjon A ikke kan slette eller oppdatere dokumenter lastet opp av integrasjon B. Merk at tjenesteadministrator når som helst kan slette meldinger gjennom Fiks Konfigurasjon, uavhengig av hvilke integrasjon som har indeksert meldingene. 

### API

Meldinger til Innsyn indekseres gjennom [Innsyn Index API Versjon 2](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/innsyn-index-api-v2.json) 

Merk at JSON-metadata må Base64 encodes før det sendes til APIet, dette hovedsaklig for å unngå JSON escape problematikk. Gyldige verdier for "versjon"-feltet er definert i tabellen under.

| Meldingstype       | Versjon            |                                                                                                          |
|--------------------|--------------------|----------------------------------------------------------------------------------------------------------|
| Faktura V1         | FAKTURA_V1         | [Spec](https://github.com/ks-no/fiks-innsyn-json-schema/blob/main/schema/domain/faktura.v1.json)         |
| Innsendt Skjema V1 | INNSENDT_SKJEMA_V1 | [Spec](https://github.com/ks-no/fiks-innsyn-json-schema/blob/main/schema/domain/innsendt.skjema.v1.json) |
| Skjemakladd V1     | SKJEMAKLADD_V1     | [Spec](https://github.com/ks-no/fiks-innsyn-json-schema/blob/main/schema/domain/skjema.kladd.v1.json)    |
| Mappe V1           | MAPPE_V1           | [Spec](https://github.com/ks-no/fiks-innsyn-json-schema/blob/main/schema/domain/mappe/mappe.v1.json)       |
| Journalpost V1     | JOURNALPOST_V1     | [Spec](https://github.com/ks-no/fiks-innsyn-json-schema/blob/main/schema/domain/mappe/journalpost.v1.json) |

Alle JSON-schema definisjoner finnes i følgende GitHub repository: [ks-no / fiks-innsyn-json-schema](https://github.com/ks-no/fiks-innsyn-json-schema). Disse kan også brukes til å generere modeller for deres valgte språk. 
Det finnes allerede en Maven-modul for Java-brukere som er deployet til Maven Central. Mer informasjon rundt dette finnes i prosjektets README på GitHub.

#### Gamle APIer
[Versjon 1](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/innsyn-index-api-v1.json) av innsyn index støttes fortsatt for eksisterende integrasjoner, men bør ikke benyttes for nyutvikling.

Hovedforskjellen fra versjon 2 er at metadata for meldingstypene er definert i API-speccen, i stedet for eksterne JSON-schemas.

### Indeksering
Indekseringstjenesten lar integrasjoner opprette meldinger, eller fjerne / endre meldinger som alt er opprettet. Hver melding har en meldingId som settes av integrasjonen. Hvis man indekserer to meldinger på samme melding-id vil den første meldingen bli overskrevet av den andre. 

Når man lager en integrasjon mot indekseringstjenesten er det viktig å være bevisst på at Innsyn bør betraktes som en cache: man bør ikke forvente at meldingene man laster opp vil ligge der til evig tid: en forvalter med admin-privilegier på innsyn-tjenesten kan for eksempel når som helst slette meldinger. Hvis man ønsker en robust løsning er det derfor viktig at man støtter _replay_: muligheten til å re-indexere alle meldinger til Innsyn. 

De vanlige [autentiseringsreglene]({{< ref "sikkerhet.md" >}}) for Fiks-plattformen gjelder for denne tjenesten, men i tilegg må integrasjonen har rett til å indeksere på vegne av  _fiks organisasjonen_ som er satt som eier den aktuelle meldingen.

Endepunktet støtter batch av opptil 5000 elementer, og integrasjonsutviklere anbefales å benytte denne funksjonaliteten, da det skaper vesentlig mindre trykk på systemet. Merk at indeksering ikke er en atomisk transaksjon: deler av elementene i en batch kan bli indeksert selv om andre feiler.

En indekseringsoperasjon kan ha følgende utfall:

* _200_. Meldingene ble indexert. Merk at det kan ta noe tid før disse blir synlige for et søk.
* _4XX_. Et problem på klientsiden førte til at meldingene ikke kan behandles. Ved 4XX feil vil ingen av meldingene i batchen bli skrevet til Innsyn.
  - Hvis deserialisering av json mislykkes får man en ren 400 BAD REQUEST. Dette indikerer som oftest at json modellen i forespørselen ikke stemmer med api-spec.
  - Hvis deserialisering var vellykket men en eller flere meldinger ikke validerte får man en meldinger som feilet, og en beskrivelse av hvorfor. Dette indikerer som oftest at et påkrevet feil mangeler, eller at det har en ugyldig verdi. Dette bør utbedres, eller meldingene med ugyldige verdier bør fjernes før man prøver igjen.
* _5XX_. Indeksering av batchen feilet. Dette betyr som oftest at noe gikk galt på server-siden. Noen av meldingene i batchen kan likevel være indeksert. Man bør derfor forsøke å indeksere alle meldingene på nytt.

Gjennomføring av batch-operasjoner skjer synkront fra ståstedet til en bruker av tjenesten: responsen blir ikke sendt før batchen er gjennomført. Dermed vil man kunne vite at en gruppe opprettet i batch 1 eksisterer når batch 2 gjennomføres, så lenge disse utføres sekvensielt.

#### Eksempel på index request med en journalpost:
```json
{
  "meldinger": [
    {
      "meldingId": "02ba5fc7-f36e-4e01-9ca2-c9ed5b9ea10b",
      "sikkerhetsniva": 3,
      "eksponertFor": {
        "identifikatorType": "FODSELSNUMMER",
        "verdi": "28422155364"
      },
      "fiksOrganisasjonId": "aa1bfb4a-e164-415a-a446-c2cc2787519b",
      "versjon": "JOURNALPOST_V1",
      "meldingMetadata": "eyJqb3VybmFscG9zdHR5cGUiOiJOIiwidGl0dGVsIjoiZjlkZjYxMWYtYTQ2MC00NmI4LTk3NDEtN2Q4NDM3MmE4ZDg2In0="
    }
  ]
}
```
meldingMetadata-feltet inneholder følgende JSON som har blitt Base64 encodet:
```json
{
  "journalposttype": "N",
  "tittel": "f9df611f-a460-46b8-9741-7d84372a8d86"
}
```

### Eksponering av meldinger
_Eksponert for_ i en indekseringsforespørsel angir hvem som skal kunne se meldingen. Dette kan ha en av følgende verdier:

* _fødselsnummer_: Meldingen blir tilgjengelig for innbyggeren som er autentisert med det spesifiserte fødselsnummeret.
* _organisasjonsnummer_: Meldingen blir tilgjengelig for innbyggere som innehar rollene "post/arkiv" eller "kommunale tjenester" i Altinn på det spesifiserte organisasjonsnummeret.
* _matrikkelnummer_: Meldingen blir tilgjengelig for personer som er ført som eiere av matrikkelenheten med det spesifiserte nummeret, eller som innehar rollene "post/arkiv" eller "kommunale tjenester" for en organisasjon som er ført som eier av den aktuelle matrikkelenheten. Endringer i eierskap vil automatisk bli tatt hensyn til, uten at reindeksering av meldingen er nødvendig.
* _offentlig_: Meldingen er åpent tilgjengelig for alle autentiserte personer, denne eksponert-for typen bør benyttes med varsomhet.

Det er viktig at man har et bevisst forhold til hvem meldinger eksponeres for, spesielt når man eksponerer for en matrikkelenhet, da endringer i eierskap vil medføre at nye personer får tilgang til meldingen. Man bør derfor aldri eksponere sensitive data via denne metoden.

### Versjonering
Over tid vil json-modellen for en melding endrer seg. Innsyn løser dette ved at alle metadatamodellene er versjonert, for eksempel som Forsendelse V1, Forsendelse V2 osv. Alle tidligere versjoner er støttet, så om din integrasjon indekserer V1 av forsendelser i dag vil dette fortsette å virke selv om V2 blir gjort tilgjengelig.

Hvis man ønsker å oppgradere eksisterende meldinger til ny versjon, for eksempel for å benytte felt som er lagt til i oppdateringen, gjøres dette gjennom _replay_; alle meldinger re-indekseres på eksisterende meldingId med ny versjon av metadata.  

#### Sletting
Indekserte meldinger kan fjernes ved å benytte [slette-API](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/innsyn-delete-api-v1.json). Her gjelder de samme reglene som over: en integrasjon må være autorisert for å handle på vegne av en ansvarlig organisasjon for at sletting kan gjennomføres, og en integrasjon kan bare slette meldinger den selv har indeksert.

Merk at sletting på samme måte som indeksering ikke gjennomføres i en atomisk transaksjon: deler av meldingene i batchen kan bli slettet selv om andre feiler. 

#### Håndtering av filer
Mange meldingstyper vil referere til filer i eksterne systemer, som for eksempel dokumenter i "Forsendelse" typen. Innsyn har i seg selv ikke noe forhold til binære filer, og betrakter dem utelukkende som en lenke. Hvis filene allerede er tilgjengelig i et ID-Porten kompatibelt filarkiv trenger man ikke å laste disse opp på nytt, hvis man ikke har en slik tjeneste fra før kan man benytte Fiks Dokumentlager til dette. 

## Uvikling av integrasjoner for å søke i innsyn
### Gjennomføring av søk 
Hvis kommunen benytter min.kommune.no er det ikke behov for å utvikle noen egne integrasjoner for søk, men det kan ofte være aktuelt å søke i Innsyn fra annen løsning, for eksempel for å få "Post fra kommunen" fram på kommunens eksisterende minside-løsning. 

Innsyn tilbyr følgende søke-api'er for eksterne integrasjoner:

* [Eiendom-søk](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/openapi-sok-eiendom-v1.json) Søk i matrikkelenheter fra kartverket.
* [Faktura-søk](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/openapi-sok-faktura-v1.json) Søk i innbyggerens fakturaer.
* [Post-søk](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/openapi-sok-post-v1.json) Søk i post sendt fra kommunen til inbyggeren via KS-SvarUt.
* [Skjema-søk](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/openapi-sok-skjema-v1.json) Søk i skjema og skjemakladder sendt fra innbyggeren til kommunen.
* [Multi-søk](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/openapi-sok-multi-v1.json) Samtidig søk i alle meldingstyper.
* [Legacy-søk](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/openapi-sok-legacy-v1.json) Innsyns gamle søke-api. Dette støttes fortsatt for eksisterende integrasjoner, ved nyutvikling bør man velge et av endepunktene over.

I tillegg til søke-apier er det mulig å benytte [Innsyn Oppslag api](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/openapi-oppslag-v1.json) for å hente meldinger. Gjennom dette api'et kan man hente en enkeltmelding (basert på melding-id), alle meldinger som har samme korrelasjon-id, eller alle meldinger som er barn av en spesifisert forelder-melding. 

Integrasjonen som skal utføre søk eller oppslag må benytte [integrasjon-person]({{< ref "integrasjoner.md" >}}) autentisering, dvs at de må fremvise den innloggede innbyggers ID-Porten token i kombinasjon med integrasjonId og Integrasjonpassord. I tillegg må integrasjonen ha "innsyn søk" privilegiet på den aktuelle Fiks-organisasjonen (tildelse via Innsyn konfigurasjon på forvaltning.fiks.ks.no). Søkeresultatet vil være begrenset til meldinger autorisert for den innloggede personen og eid av den aktuelle Fiks-organisasjonen.

### Versjonering av melding-metadata
Meldinger i Innsyn er versjonert, for eksempel som "ForsendelseV1" eller "ForsendelseV2", og nye versjoner av en melding blir lagt til uten forvarsel.

Det er derfor viktig at man spesifisere "aksepterte-versjoner" (se api-spek'ene over) når man gjør et søk - en nyere versjon av en melding vil da bli nedgradert til den spesifiserte versjonen. Hvis man ikke gjør dette vil man få det som til enhver tid er nyeste versjon, hvor endringer kan brekke parsing av JSON metadata.

### Å søke på vegne av andre
Innsyn tilbyr støtte for å søke på vegne av en organisasjon hvor man innhar rollen "Post/Arkiv" i Altinn. Denne settes som en query-param på søket (se api-spekk'er over). Det vil da bli sjekket om personen faktisk innehar denne fullmakten, og hvis dette er tilfellet vil søkeresultatet inneholde meldinger som er eksponert for organisasjonen eller matrikkelenheter organisasjonen eier heller enn personen som er autentisert gjennom ID-Porten tokenent. 

"Legacy søk" api'et støtter den samme funksjonaliteten gjennom en ON_BEHALF_OF http-header, men et anbefales å ikke benytte denne metoden ved nyutvikling.

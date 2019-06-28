---
title: Innsyn
date: 2019-06-27
---

Norske kommuner har mengder av informasjon om sine innbyggere. Denne informasjonen er spredd rundt i arkiver, fagsystemer, dokumentlagre og eksterne skyløsninger. Fiks Innsyn lagrer metadata som beskriver denne informasjonen, og gjør den tilgjengelig for innbyggeren via en kraftig søkemotor.

### Hvordan tar man i bruk Fiks Innsyn?
En kommune kan bruke Fiks Innsyn for å gjøre kommunal informasjon (forsendelser, byggesaker, eiendommer, fakturaer osv) tilgjengelig for innbyggere, endten på minside.kommune.no eller på kommunens eksisterende minside løsning.
![minside_integrasjoner](/images/innsyn_konfigurasjon_integrasjoner.png "Innsyn integrasjoner")

Uansett er første steg å sørge for metadata som beskriver informasjonen finnes i søkemotoren. Dette gjøres ved å legge til integrasjoner i konfigurasjonen av [innsyntjenesten](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester/innsyn) på forvaltning.fiks.ks.no. Hver av disse integrasjonene representerer en datakilde. Dette kan være "nøkkelklare" integrasjoner levert av KS eller tredjepartsleverandører, for eksempel forsendelser fra SvarUt eller byggesaker fra GeoMatikk, eller integrasjoner kommunen lager selv. I skjermbildet over har en kommune lagt til SvarUt integrasjonen som kilde for innsyn, som gjør at alle forsendelser fra SvarUt-avsendere spesifisert i integrasjonens konfigurasjon blir tilgjengelig i "Post fra kommunen" på minside.kommune.no.  

Hvis kommunen benytter minside.kommune.no er nå alt klart: innloggede innbyggere vil se sine meldinger i "Post fra kommunen" og andre innsyn-drevede tjenester. 

Hvis kommunen benytter en egen minside-løsning må også søket mot Fiks Innsyn gjøres via en integrasjon, som legges til på samme måte som datakilde-integrasjonene over. I noen tilfeller vil det finnes nøkkelklare leverandør-integrasjoner for dette, i andre må kommunen lage en egen integrasjon som leverandøren kan benytte. Kontakt leverandør for å avklare dette.

### Hvordan virker Fiks Innsyn?
![minside_sok](https://www.lucidchart.com/publicSegments/view/eac56c7c-a7ba-4c9c-b0ba-2c85f605f0c9/image.png "Innsyn")
Tjenesten består av tre hovedkomponenter:
 
 * _Innsyn-webapplikasjoner_, et sett med SPA (Single Page Applications) på minside.kommune.no som innbyggere benytter for å søke i innsynsdatabasen. Eksempler er "Post fra kommunen", "Byggesaker", osv.
 * _Innsyn-søk_, søkemotoren som utgjør back-end for webappliasjonene. Støtter fritekstsøk og score-rangerte resultater. 
 * _Innsyn-indexer_, en indekseringstjeneste som integrasjoner kan benytte for å laste opp metadata om informasjonen kommunen sitter på: hendelser, fakturaer, saker, journalposter, forsendelser, osv.  

Søk i innsyn gjøres via applikasjonene på minside.kommune.no, eller direkte via et REST grensesnitt. Uansett baserer autentisering seg på innlogging via ID-Porten. En autentisert innbygger autoriserers for å lese en melding på en av tre måter:

* Meldingen er eksponert for innbyggerens fødselsnummer
* Innbyggeren har rollene "post/arkiv" eller "kommunale tjenester" i Altinn for organisasjonsnummeret meldingen er eksponert for
* Innbyggeren er markert som eier av matrikkelenheten meldingen er eksponert for, endten direkte eller via organisasjon.

Søket er i hovedsak basert på fri-tekst, og vil også da kompenserer for stavefeil, bøyeform eller orddeling. Noe filtrering er mulig (for eksempel på dato, avsender-organisasjon osv). Alle søk er også filtrert på innloggingsnivå. Et søk gjort med innlogging på nivå tre vil ikke returnere grupper som er satt til nivå fire, uavhengig av om disse gruppene traff på søket. Hvilket innloggingsnivå som kreves for å se hver enkelt melding er bestemt av interasjonen som indekserte meldingen i Innsyn.

Søkeresultatet scores og sorteres basert på relevans: nye meldinger scores høyere enn gamle, uleste dokumenter høyere enn de du har lest, ubetalte faktura høyere enn de du har betalt, og så videre. Det er også mulig å få resultatet sortert på dato.  

Søkemotoren inneholder utelukkende metadata, ikke selve dokumentet. Om meldingen skal peke til et dokument, bilde eller annen fil gjøres dette i form av en lenke: denne kan for eksempel peke til en fil i [Fiks Dokumentlager]({{< ref "dokumentlager.md" >}}), en sak i et kommunalt filarkiv, eller en annen tjeneste. Så lenge disse støtter innlogging gjennom ID-Porten vil nedlastingen oppleves sømløst av innbygger.

### Uvikling av integrasjoner som leverer data via Innsyn-Indexer: 
Indeksering av dokumenter gjøres via [Innsyn-Index api](https://editor.swagger.io/?url=https://ks-no.github.io/api/innsyn-index-api-v1.json). Først noen grunnleggende prinsipper for forvalting av meldinger i innsyn:

* _Alle dokumenter eies av en Fiks Organisasjon._ I de fleste tilfeller vil dette være en kommune eller en fylkeskommune. Det er denne organisasjonen som autoriserer indeksering av data, og har rett til å oppdatere eller slette disse, enten direkte eller via tredjepart.
* _Integrasjoner må autoriseres for å indeksere data på vegne av en av organisasjon._ Dette gjøres gjennom å tildele "Innsyn Index" privilegiet til integrasjonen i Fiks Konfigurasjon. Nøkkelklare integrasjoner vil automatisk bli tildelt de nødvendige privilegiene når de blir lagt til i Innsyn konfigurasjonen.
* _Hver integrasjon styrer dokumentene de har lastet opp på vegne av organisasjonen._ Dvs. at integrasjon A ikke kan slette eller oppdatere dokumenter lastet opp av integrasjon B. Merk at tjenesteadministrator når som helst kan slette meldinger gjennom Fiks Konfigurasjon, uavhengig av hvilke integrasjon som har indeksert meldingene. 

#### Indeksering
Indekseringstjenesten lar integrasjoner opprette meldinger, eller fjerne / endre meldinger som alt er opprettet. Hver melding har en meldingId som settes av integrasjonen. Hvis man indekserer to meldinger på samme melding-id vil den første meldingen bli overskrevet. 

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

#### Eksponering av meldinger
_Eksponert for_ i en indekseringsforespørsel angir hvem som skal kunne se meldingen. Dette kan ha en av følgende verdier:

* _fødselsnummer_: Meldingen blir tilgjengelig for innbyggeren som er autentisert med det spesifiserte fødselsnummeret.
* _organisasjonsnummer_: Meldingen blir tilgjengelig for innbyggere som innehar rollene "post/arkiv" eller "kommunale tjenester" i Altinn på det spesifiserte organisasjonsnummeret.
* _matrikkelnummer_: Meldingen blir tilgjengelig for personer som er ført som eiere av matrikkelenheten med det spesifiserte nummeret, eller som innehar rollene "post/arkiv" eller "kommunale tjenester" for en organisasjon som er ført som eier av den aktuelle matrikkelenheten. Endringer i eierskap vil automatisk bli tatt hensyn til, uten at reindeksering av meldingen er nødvendig.

Det er viktig at man har et bevisst forhold til hvem meldinger eksponeres for, spesielt når man eksponerer for en matrikkelenhet, da endringer i eierskap vil medføre at nye personer får tilgang til meldingen. Man bør derfor aldri eksponere sensitive data via denne metoden.

#### Versjonering
Over tid vil json-modellen for en melding endrer seg. Innsyn løser dette ved at alle metadatamodellene er versjonert, for eksempel som Forsendelse V1, Forsendelse V2 osv. Alle tidligere versjoner er støttet, så om din integrasjon indekserer V1 av forsendelser i dag vil dette fortsette å virke selv om V2 blir gjort tilgjengelig.

Hvis man ønsker å oppgradere eksisterende meldinger til ny versjon, for eksempel for å benytte felt som er lagt til i oppdateringen, gjøres dette gjennom _replay_; alle meldinger re-indekseres på eksisterende meldingId med ny versjon av metadata.  

##### Sletting
Indekserte meldinger kan fjernes ved å benytte endepunkt for sletting. Her gjelder de samme reglene som over: en integrasjon må være autorisert for å handle på vegne av en ansvarlig organisasjon for at sletting kan gjennomføres, og en integrasjon kan bare slette meldinger den selv har indeksert.

Merk at sletting på samme måte som indeksering ikke gjennomføres i en atomisk transaksjon: deler av meldingene i batchen kan bli slettet selv om andre feiler. 

##### Håndtering av filer
Mange meldingstyper vil referere til filer i eksterne systemer, som for eksempel dokumenter i "Forsendelse" typen. Innsyn har i seg selv ikke noe forhold til binære filer, og betrakter dem utelukkende som en lenke. Hvis filene allerede er tilgjengelig i et ID-Porten kompatibelt filarkiv trenger man ikke å laste disse opp på nytt, hvis man ikke har en slik tjeneste fra før kan man benytte Fiks Dokumentlager til dette. 

### Uvikling av integrasjoner for å søke i innsyn
#### Søketjeneste 
Hvis kommunen benytter minside.kommune.no er det ikke behov for å utvikle noen egne integrasjoner for søk, men det kan ofte være aktuelt å søke i innsyn fra kommunens eksisterende løsning, endten egenutviklet eller kjøpt via leverandør. I disse tilfellene må søket skje gjennom en integrasjon mot [Innsyn-Søk api](https://editor.swagger.io/?url=https://ks-no.github.io/api/innsyn-sok-api-v1.json). 

Integrasjonen som skal utføre dette søket må benytte [integrasjon-person]({{< ref "integrasjoner.md" >}}) autentisering, dvs at de må fremvise den innloggede innbyggers ID-Porten token i kombinasjon med integrasjonId og Integrasjonpassord. I tillegg må integrasjonen ha "innsyn søk" privilegiet på den aktuelle Fiks-organisasjonen (tildelse via Innsyn konfigurasjon på forvaltning.fiks.ks.no). Søkeresultatet vil være begrenset til meldinger autorisert for den innloggede personen og eid av den aktuelle Fiks-organisasjonen.

Det er også viktig å merke seg at man når man utfører et søk har mulighet til å spesifisere hvilke versjoner av meldingstyper man støtter. Det anbefales å benyttes seg av dette for å unngå overraskelser: hvis man ikke gjør det vil man få det som til enhver tid er nyeste versjon, med oppgraderinger uten advarsel. Se api-spec for detaljer.
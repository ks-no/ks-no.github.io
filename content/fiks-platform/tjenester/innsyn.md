---
title: Innsyn
date: 2018-12-10
---

![minside_sok](/images/innsyn.png "Innsyn")

Norske kommuner har mengder av informasjon om sine innbyggere. Denne informasjonen er spredd rundt i arkivsystemer, fagsystemer, dokumentlagre og eksterne skyløsninger. Fiks Innsyn gjør det lett for innbyggeren å finne denne informasjonen.  

I tilleg til å akseptere indeksering av data fra eksterne kilder vil også de andre tjenestene på Fiks plattformen levere data til Innsyn, som for eksempel [fiks-digisos]({{< ref "digisos.md" >}}) (under utvikling) som leverer kvitteringer og oppdateringer for sosialsøknader, og KS SvarUt som leverer kopier av forsendelser til innbyggeren\.

## Oversikt
Tjenesten består av tre hovedkomponenter:
 
 * _Innsyn webapplikasjoner_, et sett med SPA (Single Page Application) grensesnitt som innbyggere benytter for å søke i innsynsdatabasen. Fiks vil utvikle egne applikasjoner for "post fra kommunen", "saker", "faktura", osv. 
 * _Innsyn-søk_, en søkemotor som støtter fritekstsøk og score-rangerte resultater. 
 * _Innsyn-indexer_, en indekseringstjeneste som integrasjoner kan benytte for å laste opp meldinger: hendelser, fakturaer, saker, journalposter, forsendelser, osv.  

Søkeresultatet scores på relevans: nye meldinger scores høyere enn gamle, uleste dokumenter høyere enn de du har lest, ubetalte faktura høyere enn de du har betalt, og så videre. Den tilbyr flere filtre: dato, organisasjon, enhet, og mulighet for å søke på ord som fremkommer i meldingen. Den kompanserer for stavefeil, bøyeform eller orddeling. Alle søk er også filtrert på innloggingsnivå. Et søk gjort med innlogging på nivå tre vil ikke returnere grupper som er satt til nivå fire, uavhengig av om disse gruppene traff på søket.

Søkemotoren inneholder utelukkende metadata. Om meldingen skal peke til et dokument, bilde eller annen fil gjøres dette i form av en lenke: denne kan for eksempel peke til en fil i [Fiks Dokumentlager]({{< ref "dokumentlager.md" >}}), men fiks-organisasjoner står fritt til å benytte andre tjenester. Så lenge disse støtter innlogging gjennom ID-Porten vil dette også oppleves som sømløst av innbygger. 

Når plattformen lanseres er Fiks SvarUt den første integrasjonen som leverer meldinger til Fiks Innsyn - hvis kommunen ønsker dette kan alle meldinger som har har blitt sendt gjennom svarut gjøres tilgjengelig for mottakerene. Dette styres gjennom [Fiks Konfigurasjon]({{< ref "digisos.md" >}}).    

## Integrasjonsutvikling
Først noen grunnleggende prinsipper for forvalting av meldinger i innsyn:

* _Alle dokumenter eies av en Fiks Organisasjon._ 
* _Hver integrasjon må autoriseres for å kunne indeksere dokumenter på vegen av organisasjonen._ Dette gjøres gjennom å tildele "Innsyn Index" privilegiet til integrasjonen i Fiks Konfigurasjon. 
* _Hver integrasjon styrer dokumentene de har lastet opp på vegne av organisasjonen._ Dvs. at integrasjon A ikke kan slette eller oppdatere dokumenter lastet opp av integrasjon B. Merk at tjenesteadministrator når som helst kan slette dokumnetene gjennom Fiks Konfigurasjon. 

### Indekseringstjeneste [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/innsyn-index-api-v1.json)
Indekseringstjenesten lar integrasjoner opprette meldinger, eller fjerne / endre meldinger som alt er opprettet. 

Når man lager en integrasjon mot indekseringstjenesten er det viktig å være bevisst på at Innsyn bør betraktes som en cache: man bør ikke forvente at meldingene man laster opp vil ligge der til evig tid: en forvalter med admin-privilegier på innsyn-tjenesten kan for eksempel når som helst slette meldinger. Hvis man ønsker en robust løsning er det derfor viktig at man støtter _replay_: muligheten til å reindexere alle meldinger til Innsyn. Dette er også nytting hvis man ønsker å oppgradere meldingene til en ny versjon.  

#### Indeksering
De vanlige [autentiseringsreglene]({{< ref "sikkerhet.md" >}}) for Fiks-plattformen gjelder for denne tjenesten, men i tilegg må integrasjonen har rett til å indeksere på vegne av  _fiks organisasjonen_ som er satt som eier den aktuelle meldingen.

Endepunktet støtter batch av opptil 5000 elementer, og integrasjonsutviklere anbefales å benytte denne funksjonaliteten, da det skaper vesentlig mindre trykk på systemet. Merk at indeksering ikke er en atomisk transaksjon: deler av elementene i en batch kan bli indeksert selv om andre feiler.

En indekseringsoperasjon kan ha følgende utfall:

* _200_. Meldingene ble indexert. Merk at det kan ta noe tid før disse blir synlige for et søk.
* _4XX_. Et problem på klientsiden førte til at meldingene ikke kan behandles. Ved 4XX feil vil ingen av meldingene i batchen bli skrevet til Innsyn.
  - Hvis deserialisering av json mislykkes får man en ren 400 BAD REQUEST. Dette indikerer som oftest at json modellen i forespørselen ikke stemmer med api-spec.
  - Hvis deserialisering var vellykket men en eller flere meldinger ikke validerte får man en meldinger som feilet, og en beskrivelse av hvorfor. Dette indikerer som oftest at et påkrevet feil mangeler, eller at det har en ugyldig verdi. Dette bør utbedres, eller meldingene med ugyldige verdier bør fjernes før man prøver igjen.
* _5XX_. Indeksering av batchen feilet. Dette betyr som oftest at noe gikk galt på server-siden. Noen av meldingene i batchen kan likevel være indeksert. Man bør derfor forsøke å indeksere alle meldingene på nytt.

Gjennomføring av batch-operasjoner skjer synkront fra ståstedet til en bruker av tjenesten: responsen blir ikke sendt før batchen er gjennomført. Dermed vil man kunne vite at en gruppe opprettet i batch 1 eksisterer når batch 2 gjennomføres, så lenge disse utføres sekvensielt. 

Noen viktige punkt for integrasjonsutviklere:
 
* Hvis man ikke har informasjon for å sette et felt (f.eks. om man ikke har "avsender" for en forsendelse) bør ikke feltet settes (i stede for å sette "null", "mangler" eller lignende).
* For _fiks organisasjon_ kan man i tillegg til å sette identifikator også sette visningsnavn. Dette vil bli benyttet i webapplikasjonens grensesnitt og filter. Merk at hvis man endrer dette vil det nye navnet bare benyttes på grupper / hendelser som er indeksert etter endringen ble gjort. For å gjøre en fullstendig operasjon må hendelsene reindekseres.
* _Eksponert for_ angir hvem som skal kunne se meldingen. Dette kan være endten et organisasjonsnummer eller et fødselsnummer. Merk at hver melding bare kan eksponeres for en person/org, hvis man ønsker at flere aktører skal kunne se samme informasjonen må gruppen indekseres flere ganger. 

#### Sletting
Indekserte meldinger kan fjernes ved å benytte endepunkt for sletting. Her gjelder de samme reglene som over: en integrasjon må være autorisert for å handle på vegne av en ansvarlig organisasjon for at sletting kan gjennomføres, og en integrasjon kan bare slette meldinger den selv har indeksert.

Merk at sletting på samme måte som indeksering ikke gjennomføres i en atomisk transaksjon: deler av meldingene i batchen kan bli slettet selv om andre feiler. 

#### Håndtering av filer
Mange meldingstyper vil referere til filer i eksterne systemer, som for eksempel dokumenter i "Forsendelse" typen. Innsyn har i seg selv ikke noe forhold til binære filer, og betrakter dem utelukkende som en lenke. Hvis filene allerede er tilgjengelig i et ID-Porten kompatibelt filarkiv trenger man ikke å laste disse opp på nytt, hvis man ikke har en slik tjeneste fra før kan man benytte Fiks Dokumentlager til dette. 

## Søketjeneste [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/innsyn-sok-api-v1.json)
Hvis kommunen har en eksisterende løsning for innloggede innbyggertjenester kan det være aktuelt å benytte innsynsøket som en tjeneste fremfor en webapplikasjon. Integrasjonen som skal utføre dette søket trenger da Innsyn Søk privilegiet i Fiks Konfigurasjon. Merk at kommunene da tar ansvar for å fremskaffe Open Id Connect innloggingstoken fra ID-porten, og for å sørge for at dette tokenet er gyldig. Innsynsøk-tjenesten vil fortsatt utføre nødvendig autorisering.

Det er også viktig å merke seg at søk gjennom en integrasjon har en begrensning som "vanlige" søk fra minside.kommune.no ikke har: man kan bare søke i dokumenter som eies av den aktuelle Fiks organisasjonen. 

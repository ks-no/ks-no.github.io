---
title: Tjeneste - Meldingsboks
---

![minside_sok](/images/sok.png "Minside Søk")

Søk er en modul i min-side som består av en SPA (single page webapp), meldingsboksen, som kommuniserer med en søkemotor, meldingssøk, og en indekseringstjeneste, meldingsindexer. En integrasjon benytter meldingsindexeren for å laste opp meldinger: hendelser, fakturaer, saker, journalposter, forsendelser, osv. Disse blir da tilgjengelige for søkemotoren, og innbyggere kan benytte webapplikasjonen for å utføre søk.  

Søkeresultatet scores på relevans: nye meldinger scores høyere enn gamle, uleste dokumenter høyere enn de du har lest, ubetalte faktura høyere enn de du har betalt, og så videre. Den tilbyr flere filtre: dato, organisasjon, enhet, og mulighet for å søke på ord som fremkommer i meldingen. Den kompanserer for stavefeil, bøyeform eller orddeling. Alle søk er også filtrert på innloggingsnivå. Et søk gjort med innlogging på nivå tre vil ikke returnere grupper som er satt til nivå fire, uavhengig av om disse gruppene traff på søket.

Søkemotoren inneholder utelukkende metadata. Om meldingen skal peke til et dokument, bilde eller annen fil gjøres dette i form av en lenke: integrasjonen kan da benytte Fiks-plattformens filarkiv eller en egen løsning for å tilgjengeligjøre filen.

Når plattformen lanseres er Fiks SvarUt den første integrasjonen som leverer meldinger til meldingsboksen - hvis kommunen ønsker dette kan alle meldinger som noen sinne har blitt sendt gjennom svarut gjøres tilgjengelig for mottakerene. Dette styres gjennom fiks-konfigurasjon. 

## Integrasjonsutvikling

### Indekseringstjeneste [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/hendelse-indexer-api.json)

Indekseringstjenesten lar integrasjoner opprette meldinger, eller fjerne / endre meldinger som alt er opprettet. 

#### Indeksering
De vanlige autentiseringsreglene for Fiks-plattformen gjelder for denne tjenesten, men i tilegg må integrasjonen har rett til å indeksere på vegne av  _fiks organisasjonen_ som er satt som eier den aktuelle meldingen.

Endepunktet støtter batch av opptil 5000 elementer, og integrasjonsutviklere anbefales å benytte denne funksjonaliteten, da det skaper vesentlig mindre trykk på systemet. Merk at indeksering ikke er en atomisk transaksjon: deler av elementene i en batch kan bli indeksert selv om andre feiler. Informasjon om dette finnes i responsen.

Gjennomføring av batch-operasjoner skjer synkront fra ståstedet til en bruker av tjenesten: responsen blir ikke sendt før batchen er gjennomført. Dermed vil man kunne vite at en gruppe opprettet i batch 1 eksisterer når batch 2 gjennomføres, så lenge disse utføres sekvensielt. 

Noen viktige punkt for integrasjonsutviklere:
 
* Hvis man ikke har informasjon for å sette et felt (f.eks. om man ikke har "avsender" for en forsendelse) bør ikke feltet settes (i stede for å sette "null", "mangler" eller lignende).
* For _fiks organisasjon_ og _enhet_ kan man i tillegg til å sette identifikator også sette visningsnavn. Dette vil bli benyttet i webapplikasjonens grensesnitt og filter. Merk at hvis man endrer dette vil det nye navnet bare benyttes på grupper / hendelser som er indeksert etter endringen ble gjort. For å gjøre en fullstendig operasjon må hendelsene reindekseres.
* _Eksponert for_ angir hvem som skal kunne se meldingen. Dette kan være endten et organisasjonsnummer eller et fødselsnummer. Merk at hver melding bare kan eksponeres for en person/org, hvis man ønsker at flere aktører skal kunne se samme informasjonen må gruppen indekseres flere ganger. 

#### Sletting
Indekserte meldinger kan fjernes ved å benytte endepunkt for sletting. Her gjelder de samme reglene som over: en integrasjon må være autorisert for å handle på vegne av en ansvarlig organisasjon for at sletting kan gjennomføres. 

Merk at sletting på samme måte som indeksering ikke gjennomføres i en atomisk transaksjon: deler av meldingene i batchen kan bli slettet selv om andre feiler. 

## Søketjeneste [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/hendelse-sok-api.json)
Hvis kommunen har en eksisterende løsning for innloggede innbyggertjenester kan det være aktuelt å benytte meldingssøket som en tjeneste fremfor en webapplikasjon. Merk at kommunene da tar ansvar for å fremskaffe Open Id Connect innloggingstoken fra ID-porten, og for å sørge for at dette tokenet er gyldig. Meldingssøk tjenesten vil fortsatt utføre nødvendig autorisering.
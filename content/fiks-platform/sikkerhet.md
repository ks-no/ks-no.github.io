---
title: Sikkerhet og personvern
date: 2018-01-02
---
Under kommer generelle retningslinjer for hvordan vi har sikret applikasjonene, skulle noe avvike fra dette vil det 
være spesifisert i hver tjeneste.

## Kryptering
All kommunikasjon med FIKS utenfra er kryptert med TLS. 

Fiks-plattformen lagrer data i [fiks-dokumentlager]({{< ref "dokumentlager.md" >}}), og alt krypteres før det lagres. All backup er også kryptert. Nøkler oppbevares på egne servere som er satt opp spesielt for dette formålet.  

## Autentisering


Flere tjenester på fiks-platformen har også mulighet for maskin-til-maskin kommunikasjon, for eksempel når et saksystem laster opp meldinger til meldingsboksen. Dette gjøres gjennom å opprette  _integrasjoner_, som autentiseres ved hjelp av et virksomhetsertifikat-basert access token utstedt av ID-Porten i kombinasjon med integrasjonsid og passord generert av fiks-konfigurasjon. Se [integrasjoner]{{< relref "integrasjoner.md" >}} for mer informasjon om oppsett av dette.

## Autentisering og autorisering
Hvordan en aktør autoriseres på fiks-plattformen avhenger av hvem aktøren er og hvordan han bruker systemet: 

### Personer
Dette kan for eksempel være en innbygger som finner barnehagesøknaden sin i meldingsboksen.

Personer autentiseres ved hjelp av Open-Id Connect løsningen til ID-Porten. Dette vil si at de (om de ikke allerede er innlogget) dirigeres til ID-Porten for innlogging ved hjelp av for eksempel MinId eller BankId. ID-Porten og Fiks utveksler så informasjon for å bekrefte brukerens identitet og hvilket innloggingsnivå som er benyttet. Utgåtte innlogginger vil automatisk bli fornyet.

Denne typen innlogging krever som regel ikke videre autorisering - en person har tilgang til informasjon og tjenester som er eksponert på det aktuelle fødselsnummeret.

### Personer på vegne av organisasjon
Når en person autentiserer seg på fiks-plattformen (som beskrevet over) vil plattformen hente denne personens roller i næringslivet fra Altinn, og gi personen mulighet til å opptre på vegne av organisasjoner hvor han eventuelt måtte ha en rolle. Han vil så få tilgang til informasjon og tjenester som er eksponert på det aktuelle orgnummeret. 

Om det etterhvert kommer flere kilder for slike fullmakter (som for eksempel gir mulighet for å opptre på vegne av andre organisasjoner) vil fiks-plattformen kunne støtte dette gjennom samme løsning.

### Forvaltere på fiks-plattformen
Personer som forvalter en tjeneste på fiks-plattformen på vegne av en fiks-organisasjon, for eksempel en kommuneansatt som konfigurerer meldingsboksen eller sender forsendelser gjennom SvarUt. Disse autentiseres gjennom ID-Porten OpenID-Connect på samme måte som andre personer, og autorisereres for hver enkelt tjeneste og funksjon basert på privilegier organisasjonen har tildelt personen gjennom fiks-konfigurasjon.

### Integrasjoner mot fiks-plattformen
En integrasjon på fiks-plattformen er et system som gis lov til å agere på vegne av en kommune. Eksempler kan være et fagsystem som kan oppdatere [fiks-meldingsboks]({{< ref "meldingsboks.md" >}}), eller når [fiks-digisos]({{< ref "digisos.md" >}}) legger et dokument i [fiks-dokumentlager]({{< ref "dokumentlager.md" >}}).

Integrasjoner autentiseres gjennom to mekanismer: for det første trenger man en kombinasjon av integrasjonId og passord som genereres via [fiks-konfigurasjon]({{< ref "konfigurasjon.md" >}}). For det andre benyttes et virksomhetssertifikat og ID-Porten for å bekrefter identiteten til virksomheten som drifter integrasjonen. Denne identiteten må sammsvare med orgnummer som er registrert som integrasjonseier i fiks-konfigurasjon. Se ["Integrasjoner"]({{< ref "integrasjoner.md" >}}) for en mer detaljert beskrivelse.  

Autorisering av integrasjoner gjøres på bakgrunn av privilegier tildelt i fiks-konfigurasjon. Hver fiks-organisasjon må eksplisitt si at en integrasjon skal ha tilgang til sine systemer, for eksempel ved å gi svarut integrasjonen tilgang til en kommunes meldingsboks-tjeneste.

En slik autorisasjon kan når som helst trekkes tilbake. 

## Personvern
Utgangspunktet er at det er innbyggeren som eier sine data, og tilgang begrenses i så stor grad som mulig. Dette vil si at:

* Innbyggeren kan slette sine data om han ikke ønsker fiks-tjenesten skal oppbevare dem.
* Innbyggeren kan gi beskjed om at han ikke lengre ønsker at hans data skal lagres på plattformen.
* Tilgang er begrenset i så stor grad som mulig. Dette vil for eksempel si at det utelukkende er innbyggeren som kan lese meldinger i [fiks-meldingsboks]({{< ref "meldingsboks.md" >}}) - disse er skjult også for integrasjonen som i utgangspunktet lastet de opp, og for kommunen som er ansvarlig for meldingene

Noen tjenester gjør data om en person tilgjengelig for tredjepart. I slike tilfeller vil dette bli dokumentert i tjenstebeskrivelsen, autorisert eksplisitt i fiks-konfigurasjon, og underlagt audit-logging, slik at det blir mulig å hente ut informasjon om hvem som har hatt tilgang til hvilke data når, og under hvilken lovhjemmel tilgangen ble oppnådd.
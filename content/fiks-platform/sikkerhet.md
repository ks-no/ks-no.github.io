---
title: Sikkerhet og personvern
date: 2018-01-02
---

## Kryptering
All kommunikasjon mellom Fiks plattformen og integrasjoner/personer er kryptert med TLS. 

Fiks plattformen lagrer data i [Fiks Dokumentlager]({{< ref "dokumentlager.md" >}}), og alt krypteres før det lagres. All backup er også kryptert. Nøkler oppbevares på egne servere som er satt opp spesielt for dette formålet. 

## Autentisering og autorisering
Hvordan en aktør autoriseres på Fiks plattformen avhenger av hvem aktøren er og hvordan han bruker systemet: 

### Personer
Dette kan for eksempel være en innbygger som finner barnehagesøknaden sin i Fiks Innsyn.

Personer autentiseres ved hjelp av Open-Id Connect løsningen til ID-Porten. Dette vil si at de (om de ikke allerede er innlogget) dirigeres til ID-Porten for innlogging ved hjelp av for eksempel MinId eller BankId. ID-Porten og Fiks utveksler så informasjon for å bekrefte brukerens identitet og hvilket innloggingsnivå som er benyttet. Utgåtte innlogginger vil automatisk bli fornyet.

Denne typen innlogging krever som regel ikke videre autorisering - en person har tilgang til informasjon og tjenester som er eksponert på det aktuelle fødselsnummeret.

### Personer på vegne av organisasjon
Når en person autentiserer seg på fiks-plattformen (som beskrevet over) vil plattformen hente denne personens roller i næringslivet fra Altinn, og gi personen mulighet til å opptre på vegne av organisasjoner hvor han eventuelt måtte ha en rolle. Han vil så få tilgang til informasjon og tjenester som er eksponert på det aktuelle orgnummeret. 

Om det etterhvert kommer flere kilder for slike fullmakter (som for eksempel gir mulighet for å opptre på vegne av andre organisasjoner) vil fiks-plattformen kunne støtte dette gjennom samme løsning.

### Forvaltere
Dette er personer som forvalter en tjeneste på fiks-plattformen på vegne av en fiks-organisasjon, for eksempel en kommuneansatt som konfigurerer Fiks Innsyn eller sender forsendelser gjennom SvarUt. Disse autentiseres gjennom ID-Porten OpenID-Connect på samme måte som andre personer, og autorisereres for hver enkelt tjeneste og funksjon basert på privilegier organisasjonen har tildelt personen gjennom fiks-konfigurasjon.

Når organisasjonen opprettes settes et personnummer som administrator. Dette er en "superbruker", administrator-privilegiet gir alle tilganger på en kommune. En administrator kan lage andre administratorer, både på organisasjonsnivå og for de enkelte tjenestene. Han kan også tildele mer spesifikke privilegier, for eksempel ved å gi en person rett til å sende SvarUt forsendelser på vegne av en avdeling i kommunen. KS anbefaler at denne funksjonaliteten benyttes slik at ansatte ikke har tilganger utover det som er nødvendig for å utføre arbeidsoppgavene.

Tildeling av privilegier er underlagt audit-logging, se under for detaljer.

### Integrasjoner
De fleste tjenestene på fiks-platformen har mulighet for maskin-til-maskin integrasjon, for eksempel når et saksystem laster opp meldinger til Fiks Innsyn. Dette gjøres gjennom å opprette  _integrasjoner_, som autentiseres ved hjelp av et virksomhetsertifikat-basert access token utstedt av ID-Porten i kombinasjon med integrasjonsid og passord generert av fiks-konfigurasjon. Se [integrasjoner]{{< relref "integrasjoner.md" >}} for mer informasjon om oppsett av dette.

Integrasjoner autentiseres gjennom to mekanismer: for det første trenger man en kombinasjon av integrasjonId og passord som genereres via [Fiks Konfigurasjon]({{< ref "konfigurasjon.md" >}}). For det andre benyttes et virksomhetssertifikat og ID-Porten for å bekrefter identiteten til virksomheten som drifter integrasjonen. Denne identiteten må sammsvare med orgnummer som er registrert som integrasjonseier i fiks-konfigurasjon. Se ["Integrasjoner"]({{< ref "integrasjoner.md" >}}) for en mer detaljert beskrivelse.  

Autorisering av integrasjoner gjøres på bakgrunn av privilegier tildelt i fiks-konfigurasjon. Hver fiks-organisasjon må eksplisitt si at en integrasjon skal ha tilgang til sine systemer, for eksempel ved å gi svarut integrasjonen tilgang til en kommunes Fiks Innsyn tjeneste.

En slik autorisasjon kan når som helst trekkes tilbake. 

## Personvern
Utgangspunktet er at det er innbyggeren som eier sine data, og tilgang begrenses i så stor grad som mulig. Dette vil si at:

* Innbyggeren kan slette sine data om han ikke ønsker fiks-tjenesten skal oppbevare dem.
* Innbyggeren kan gi beskjed om at han ikke lengre ønsker at hans data skal lagres på plattformen.
* Tilgang er begrenset i så stor grad som mulig. Dette vil for eksempel si at det utelukkende er innbyggeren som kan lese meldinger i [Fiks Innsyn]({{< ref "innsyn.md" >}}) - disse er skjult også for integrasjonen som i utgangspunktet lastet de opp, og for kommunen som er ansvarlig for meldingene

## Audit logging
Selv om grunnprinsippet er at det bare er innbyggeren selv som har tilgang til sine data vil noen tjenester gjør data om en person tilgjengelig for andre, for eksempel når en kommuneansatt gjør ett oppslag mot et nasjonalt register. I slike tilfeller vil dette bli dokumentert i tjenstebeskrivelsen, autorisert eksplisitt i fiks-konfigurasjon, og underlagt audit-logging, slik at det blir mulig å se hvem som har hatt tilgang til hvilke data når, og under hvilken lovhjemmel tilgangen ble oppnådd.

Denne loggen vil, der det er nødvendig, gjøres tilgjengelig for administrator i fiks-organisasjonen.

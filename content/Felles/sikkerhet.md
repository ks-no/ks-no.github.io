---
title: Sikkerhet og personvern i Fiks-plattformen
date: 2020-04-17
aliases: ["/fiks-platform/sikkerhet", "/fiks-plattform/sikkerhet"]
---

Denne siden gir en generell innføring i hvordan personvern og informasjonssikkerhet (sikkerhet) er ivaretatt i Fiks-plattformen. 
Under beskrives hvordan vi har sikret tjenestene på en ovordnet nivå.

## Generelt om sikkerhet
Ivaretakelse av digital sikkerhet i nasjonale felleskomponenter og andre samfunnskritiske systemer som leveres av virksomheter i offentlig sektor, må ha et særskilt fokus. Med økt fokus på innebygget personvern og informasjonssikkerhet blir Fiks-plattformen stadig bedre sikret, og er i seg selv å anse som et godt sikringstiltak for kommunal sektor.

KS-Digitale fellestjenester har for noen av tjenestene utarbeidet en utfylt mal for risikovurdering av hele verdikjeden, dvs. fra kommunens forretningskritiske prosesser til innbyggeren. Målet med denne risikovurderingen er å hjelpe kommunen med å få gjennomført en slik risikovurdering. 

På samme måte har KS-Digitale fellestjenester også påbegynt en vurdering av personvernkonsekvenser (DPIA) ved bruk av tjenesten, som kommunene kan velge å benytte.

Den enkelte digitale fellestjeneste avtalefestes ved et eget tjenestevedlegg til den grunnleggende avtalen om tilknytning og bruk av Fiks-plattformen.

## Styringsystem for personvern og informasjonssikkerhet
KS-Digitale fellestjenester har etablert og jobber etter et eget styringssystem for personvern og informasjonssikkerhet. Styringssystemet bygger på anerkjente standarder som ISO27001, ISO27701 og NSMs grunnprinsipper for IKT-sikkerhet. For spesifikke spørsmål om sikkerhet og personvern på plattformen, ta kontakt med [brukerstøtte](mailto:fiks@ks.no) eller [sikkerhetsavdelingen](mailto:fiks-sikkerhet@ks.no) vår.

## Overordnet om teknologiske sikringstiltak
Digdirs fellestjenester ID-porten og maskinporten benyttes til autentisering, og benyttes som identitetsbærer i hele Fiks-plattformen. ID- og maskinporten-tokens benyttes også som grunnlag for plattformens gjennom-gående autorisasjonslag, som benyttes på tvers av alle tjenester.  Gjennom faste prinsipper og komponenter oppnår plattformen er veletablert og godt testet funksjonalitet for autentisering og autorisasjon.

Utvikling av Fiks-plattformen følger prinsippene for innebygget personvern med grunnleggende opplæring i personvern og informasjonssikkerhet, avdekking av krav til personvern og informasjonssikkerhet ved systematisk arbeid med DPIA og ROS, sikker design vha. trusselmodellering og STRIDE, sikker koding med bruk av statisk kodeanalyse, automatisk oppdatering av sårbare avhengigheter, sikkerhetstesting på flere nivåer med enhetstesting, integrasjonstesting og akseptansetesting samt automatisert bygging og produksjonssetting som kun gjennomføres etter at tester og kvalitetskriterier er oppfylt.

## Opplæring
Alle i KS-Digitale fellestjenester får grunnleggende opplæring i personvern og informasjonssikkerhet. Alle utviklere vil jevnlig få opplæring og trening i sikker utvikling.

## Autentisering og autorisering
Fiks-plattformens tjenester benytter som hovedregel ID-porten og Maskinporten fra Digitaliseringsdirektoratet (digdir) for autentisering av brukere. Spesifikke mekanismer for autentisering og autorisering avhenger av kontekst: 

### Privatpersoner
Dette kan for eksempel være en innbygger som finner barnehagesøknaden sin i Fiks Innsyn.

Personer autentiseres ved hjelp av Open-Id Connect løsningen til ID-Porten. Dette vil si at de (om de ikke allerede er innlogget) dirigeres til ID-Porten for innlogging ved hjelp av for eksempel MinId eller BankId. ID-Porten og Fiks utveksler så informasjon for å bekrefte brukerens identitet og hvilket innloggingsnivå som er benyttet. Utgåtte innlogginger vil automatisk bli fornyet.

Denne typen innlogging krever som regel ikke videre autorisering - en person har tilgang til informasjon og tjenester som er eksponert på det aktuelle fødselsnummeret.

### Personer som opererer på vegne av en organisasjon
Når en person autentiserer seg på Fiks-plattformen (som beskrevet over) vil plattformen hente denne personens roller i næringslivet fra Altinn, og gi personen mulighet til å opptre på vegne av organisasjoner hvor han eventuelt måtte ha en rolle. Han vil så få tilgang til informasjon og tjenester som er eksponert på det aktuelle orgnummeret. 

Om det etterhvert kommer flere kilder for slike fullmakter (som for eksempel gir mulighet for å opptre på vegne av andre organisasjoner) vil Fiks-plattformen kunne støtte dette gjennom samme løsning.

### Tjenesteforvaltere
Dette er personer som forvalter en tjeneste på Fiks-plattformen på vegne av en Fiks-organisasjon, for eksempel en kommuneansatt som konfigurerer Fiks Innsyn eller sender forsendelser gjennom SvarUt. Disse autentiseres gjennom ID-Porten OpenID-Connect på samme måte som andre personer, og autorisereres for hver enkelt tjeneste og funksjon basert på privilegier organisasjonen har tildelt personen gjennom Fiks-konfigurasjon.

Når organisasjonen opprettes settes et personnummer som administrator. Dette er en "superbruker", administrator-privilegiet gir alle tilganger på en kommune. En administrator kan lage andre administratorer, både på organisasjonsnivå og for de enkelte tjenestene. Han kan også tildele mer spesifikke privilegier, for eksempel ved å gi en person rett til å sende SvarUt forsendelser på vegne av en avdeling i kommunen. KS anbefaler at denne funksjonaliteten benyttes slik at ansatte ikke har tilganger utover det som er nødvendig for å utføre arbeidsoppgavene, og at tildelte privilegier følges opp, slik at endringer (person som bytter rolle, person som slutter i sin stilling) reflekteres i tildelte privilegier.

Tildeling av privilegier er underlagt audit-logging, se under for detaljer.

### Integrasjoner
De fleste tjenestene på Fiks-plattformen har mulighet for maskin-til-maskin integrasjon, for eksempel når et saksystem laster opp meldinger til Fiks Innsyn. Dette gjøres gjennom å opprette  _integrasjoner_, som autentiseres ved hjelp av et virksomhetsertifikat-basert access token utstedt av ID-Porten i kombinasjon med integrasjonsid og passord generert av Fiks-konfigurasjon. Se [integrasjoner]{{< relref "integrasjoner.md" >}} for mer informasjon om oppsett av dette.

Integrasjoner autentiseres gjennom to mekanismer: for det første trenger man en kombinasjon av integrasjonId og passord som genereres via Fiks Konfigurasjon. For det andre benyttes et virksomhetssertifikat og ID-Porten for å bekrefter identiteten til virksomheten som drifter integrasjonen. Denne identiteten må sammsvare med orgnummer som er registrert som integrasjonseier i Fiks-konfigurasjon. Se ["Integrasjoner"]({{< ref "integrasjoner.md" >}}) for en mer detaljert beskrivelse.  

Autorisering av integrasjoner gjøres på bakgrunn av privilegier tildelt i Fiks-konfigurasjon. Hver Fiks-organisasjon må eksplisitt si at en integrasjon skal ha tilgang til sine systemer, for eksempel ved å gi svarut integrasjonen tilgang til en kommunes Fiks Innsyn tjeneste.

En slik autorisasjon kan når som helst trekkes tilbake.

## Sterk autentisering (to-faktor)
Sterk autentisering benyttes som standard.

## Arkitektur- og trusselmodellering
Alle komponenter i Fiks-plattformen blir analysert og risikovurdert underveis som en del av utviklingsprosessen. Resultatet er at alle komponenter i Fiks-plattformen er analysert for å analysere angrepsflaten, finne mulige problemer og gjøre tiltak for å demme opp for avdekkede svakheter. Metodisk gjøres det først en arkitekturmodellering og deretter en STRIDE-analyse.

## Tredjepartsbiblioteker (open source)
For å sikre oss som best vi kan at ikke vi drar med oss kjente feil inn i egne tjenester benytter vi en av dagens beste løsninger for dette, github sine sikkerhetstjenester "Github Security Advisories", "Security Alerts" og "Automated pull requests for security updates".

## Beskyttelse av data (kryptering)
All kommunikasjon mellom Fiks-plattformen og integrasjoner/personer er kryptert med TLS. All data som lagres på disk er enten individuelt kryptert (for eksempel gjennom sikker lagring i Fiks Dokumentlager), eller lagres på krypterte filsystemer.

## Sporbarhet (sikkerhetslogg/audit logging)
Selv om grunnprinsippet er at det bare er innbyggeren selv som har tilgang til sine data vil noen tjenester gjør data om en person tilgjengelig for andre, for eksempel når en kommuneansatt gjør ett oppslag mot et nasjonalt register. I slike tilfeller vil dette bli dokumentert i tjenstebeskrivelsen, autorisert eksplisitt i Fiks-konfigurasjon, og underlagt audit-logging, slik at det blir mulig å se hvem som har hatt tilgang til hvilke data når, og under hvilken lovhjemmel tilgangen ble oppnådd.

Denne loggen vil, der det er nødvendig, gjøres tilgjengelig for administrator i Fiks-organisasjonen.

## Drift av Fiks-plattformen
Alle tjenester i Fiks-plattformen går gjennom både ingressfiltrering, WAF (web application firewall) og overvåkes av operative sikkerhetssentre i flere lag. Datasentrene Fiks-plattformen kjører på er begge ISO27001-sertifisert og det blir gjennomført årlige revisjoner av informasjonssikkerhet og personvern. Revisjonene blir gjennomført av tredjeparts revisorer etter revisjonsstandardene ISAE-3402 og ISAE-3000. Driftsmiljøet overvåkes av driftsleverandørens eget sikkerhetsoperasjonssenter og NorCERT.

### Test- og utviklingsmiljø
All utvikling av Fiks-plattformen foregår i et eget test- og utviklingsnett (heretter testmiljøet). I testmiljøet benyttes kun testdata, dvs. at dette mijøet ikke inneholder kundedata. I testmiljøet skal det kun benyttes anonymiserte, avidentifiserte eller samtykkebaserte data. Alle endringer kjøres først ut i test- og utviklingsmiljøet, før det settes i produksjon. I testmiljøet kjøres blant annet akseptansetest før en vesentlig endring går i produksjon. Testmiljøet er også benyttet i forbindeles med tilgjengeliggjøring av og integrasjon mellom Fiks-plattformen og DHIS2 covid-19.

## Leverandøroppfølging
Alle leverandørene til KS følges opp med hensyn til ivaretakelse av informasjonssikkerhet og personvern og revideres i henhold til NSMs grunnprinsipper. 
---
title: Fiks IO (SvarInn 2)
date: 2018-10-02
---

**STATUS: under utvikling**

SvarInn er en kanal for sikker maskin-til-maskin integrasjon. Denne kommer nå i ny versjon: vi har flyttet den eksistende SvarInn tjenesten over på Fiks-plattformen, og frikoblet den fra SvarUt. Det er nå mulig å sende direkte til SvarInn. Dette åpner mange muligheter:

* _Rask leveranse_: ved hjelp av meldingskø-basert arkitektur kan SvarInn nå levere meldinger mye raskere, under ett sekund plus eventuelt overføring av data. Dette oppnås ved at meldinger nå sendes til det mottakende fagystemet i det øyeblikket de ankommer, i stede for at fagsystemet må hente meldingen.
* _Kvitteringer_: avsender vil motta kvitteringer fra mottaker, slik at man vet om meldingen man sendte faktisk ble behandlet. Mottaker kan også sende et utvidet svar på en mottatt melding.
* _Sikker kommunikasjon med ende-til-ende kryptering_: SvarInn 2-meldinger vil som default være ende-til-ende kryptert med mottakers offentlige nøkkel.
* _Sikker identifisering av avsender_: Standard for kryptografisk signatur på meldinger gjør at man kan være sikker på identiteten til avsender.
* _Støtte for ulike typer identifikatorer_: I den orginale versjonen av SvarInn bestod en adresse av en organisasjonsnummer-meldingtype-sikkerhetsnivå kombinasjon. Den første bestanddelen kan nå være ulike typer identifikatorer, initielt er organisasjonsnummer og nav-enhet-id støttet.

Alle ekisterende grensesnitt for å hente meldinger blir videreført, men merk at disse ikke gir fullt utbytte av sikkerhet- og ytelses-fordelene i SvarInn2. 

Grunnleggende prinsipper fra den eksisterende SvarUt baserte plattformen blir heller ikke forandret: en organisasjon oppretter en _konto_, og legger til en eller flere _adresser_, som hver består av en identifikator-meldingtype-sikkerhetsnivå kombinasjon. Disse adressene blir benyttet når andre organisasjoner gjør oppslag i konto-katalogen. Identifikatoren i adressen kan være av forskjellige typer, hittil støttes organisajonsnummer og nav-enhet-id.

### Forhold til SvarUt
SvarInn er nå en selvstendig kanal, men den vil fortsatt benyttes som meldingskanal i SvarUt, basert på samme prinsipper som tidligere: hvis identifikator (organisasjonsnummer), meldingstype og nivå gir treff i SvarInns adressekatalog vil den aktuelle SvarInn kontoen brukes for å levere meldingen. 

En viktig endring fra den tidligere flyten er at meldinger i SvarInn nå har en levetid: de ligger ikke på kontoen til evig tid, slik tilfellet er i dag. Når en meldings levetid er utgått, det vil si at den har ligget i kø uten å bli hentet i en viss periode, vil SvarUt sende meldingen via alternativ kanal: for eksempel Altinn eller post. 

Dette leder oss inn på et viktig spørsmål: skal man bruke SvarInn eller SvarUt for å integrere to systemer? Tabellen under forsøker å svare på dette:

*_Ønsker man å unngå at meldingen kan bli sendt i post?_ Benytt SvarInn, denne leverer utelukkende til spesifisert mottakerkonto og benytter ingen alternative kanaler.
*_Skal meldingen sikres gjennom ende-til-ende kryptering?_ Benytt SvarInn, SvarUt meldinger kan bare krypteres med Fiks plattformens nøkkel, ikke mottakers.
*_Trenger man rask levering?_ Benytt SvarInn for å få leveranse på sekunder, ved bruk av SvarUt kan det ta flere dager å levere en melding, siden SvarUt prøver ulike kanaler etter tur.
*_Vil man at fiks-plattformen skal garantere at meldingen blir levert?_ Benytt SvarUt, ved SvarInn forsendelser risikerer man at meldingen ikke blir håndtert eller avvist av mottaker. 

### Konfigurasjon og adresser
SvarInn settes nå opp gjennom Fiks Konfigurasjon, det er også her man konfigurerer kontoer, spesifiserer adresser, og styrer autorisasjoner. Både personer og integrasjoner må autoriseres før de kan sende meldinger fra en konto.

Man kan opprette flere kontoer, og hver konto kan ha en eller flere adresselinjer. En adresselinje består av en identifikator-melding-sikkerhetsnivå kombinasjon. Systemet vil verifisere at ingen kontoer har overlappende adresselinjer, også på tvers av Fiks organisasjoner.

For hver konto lastes det opp et virksomhetsertifikat. Dette sertifikatet benyttes for å kryptere meldinger sendt til konto, og kan også brukes (sammen med en privat nøkkel) for å signere meldinger sendt fra kontoen.   

### Adresse-oppslag
For å sende en SvarInn-melding må man vite konto-identifikatoren til kontoen man ønsker å sende til. Man kan få denne utlevert direkte fra mottaker, men i de fleste tilfeller vil det være nyttig å gjøre et oppslag mot SvarInn Katalog. Oppslaget består av identifikator-meldingtype-sikkerhetsnivå. Det første kan være et organisasjonsnummer eller nav-enhet-id (flere alternativer kan bli lagt til etter hvert), det andre meldingstypen man ønsker å sende, og det tredje er sikkerhetsnivået man ønsker at mottakeren skal behandle meldingstypen med. 

### Sending og mottak
Meldinger sendes gjennom et REST api på Fiks-plattformen. Integrasjoner mot dette api-et følger de samme reglene for autentisering og autorisering som andre integrasjoner på Fiks: integrasjonId, integrasjonPassord og et virksomhetsertifikat-basert Oauth2 token fra ID-Porten settes som headere på forespørselen, og den aktuelle integrasjonen må være autorisert for å sende meldinger fra den spesifiserte avsenderkontoen i Fiks Konfigurasjon.

På mottakssiden har man nå to alternativer. Man kan endten benytte det samme REST api'et som man har brukt for å hente SvarInn 1 meldinger, eller man kan integrere via [AMQP](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol) mot Fiks Plattformens [RabbitMQ](https://www.rabbitmq.com/RabbitMQ) baserte køsystem. Den siste løsningen er anbefalt, hovedsakelig på grunn av ytelsesforbedringen bruk av push teknologi vil gi.    

### Sikkerhet
I utgangspunktet legger ikke SvarInn 2 føringer på hvordan (eller om) en melding sendt over plattformen sikres, men alle klienter som utvikles av KS, og alle meldingstyper som Fiks spesifiserer, vil benytte signerte, ende-til-ende krypterte meldinger gjennom [ASIC-E](https://github.com/difi/asic) containere. Denne standarden benyttes også av DIFI i forbindelse med integrasjonspunktet.  

### Klienter
For å gjøre integrasjon lettere vil KS utvikle klienter som benyttes for både sending og mottak av meldinger fra Fiks SvarInn. Først ut er en [java-klient](https://github.com/ks-no/fiks-svarinn2-klient-java), men det er også planlagt en .net implentasjon av denne. Andre språk vil vurderes, og vi vil gjerne høre fra deg om det blir jobbet med selvstendig utvikling av klienter. 

![fiks_svarinn](/images/fiks_svarinn.png "Fiks SvarInn")

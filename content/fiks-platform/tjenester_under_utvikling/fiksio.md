---
title: Fiks IO (SvarInn 2)
date: 2018-10-02
---

**STATUS: under utvikling**

Fiks IO er en kanal for sikker maskin-til-maskin integrasjon som tilbyr:

* _Rask leveranse_: ved hjelp av kø-basert arkitektur ([AMQP)](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol) kan Fiks IO levere meldinger raskt, stort sett på under ett sekund plus eventuelt overføring av data. Dette oppnås ved at meldinger nå sendes til det mottakende fagystemet i det øyeblikket de ankommer (push), i stede for at fagsystemet må hente meldingen (pull).
* _Svar på melding_: Fiks IO lar en mottaker svare på en spesifikk melding, f.eks. for å svare på en spørring eller å bekrefte at en forespurt handling er utført.
* _Sikker kommunikasjon med ende-til-ende kryptering_: Fiks IO meldinger vil som default være ende-til-ende kryptert med mottakers offentlige nøkkel.
* _Sikker identifisering av avsender_: Bruk av standard for kryptografisk signatur [(ASiC-E)](https://github.com/difi/asic) for meldinger gjør at man kan være sikker på identiteten til avsender.
* _Levetid på meldinger_: En melding har en brukerdefinert levetid. Avsender vil få beskjed hvis en melding ikke har blitt lest av mottaker innen levetidens utløp.
* _Sending av store filer_: Fiks IO integrerer mot [Fiks Dokumentlager]({{< ref "dokumentlager.md" >}}) for å støtte sending av store filer. Det hittil ikke satt noen øvre grense, men systemet vil bli designet for å tåle filer på flere gigabyte. 

### Forhold til SvarUt og SvarInn
Fiks IO er en selvstendig kanal, og er ikke bygget for å være en erstatning for SvarUt/SvarInn, som begge vil bli videreført i sin nåværende form.

Dette overappet gjør kan gjøre at man noen ganger kan være i vil om SvarUt/SvarInn eller Fiks IO er rigktig verktøy for et problem, i listen under prøver vi å gi noen indikasjoner:

*_Er dette en maskin-til-maskin integrasjon?_ Benytt Fiks IO, denne leverer utelukkende til spesifisert mottakerkonto og benytter ingen alternative kanaler, som for eksempel printet post.
*_Skal meldingen sikres gjennom ende-til-ende kryptering?_ Benytt FiksIo, SvarUt/SvarInn meldinger kan bare krypteres med Fiks-plattformens nøkkel, ikke mottakers.
*_Trenger man rask levering?_ Benytt Fiks IO for å få leveranse på sekunder, ved bruk av SvarUt/SvarInn kan levering ta lang tid, siden SvarUt prøver flere kanaler etter tur og defaulter til print ved leveranseproblemer.
*_Vil man at fiks-plattformen skal garantere at meldingen blir levert?_ Benytt SvarUt, ved Fiks IO forsendelser risikerer man at meldingen ikke blir håndtert eller avvist av mottaker. 

Økonomiske aspekter kan også spille inn her, Fiks IO meldinger koster vesentlig mindre pr. stykk enn SvarUt forsendelser.

### Grunnleggende prinsipper
En Fiks organisasjon oppretter en Fiks IO _konto_. Andre kontoer kan nå sende til denne kontoen gjennom Fiks IOs REST api ved å spesifisere kontoens _KontoId_ som mottaker. Mottakeren får meldingen levert ved å etablere en AMQP kobling til io.fiks.ks.no.

Fiks IO tar i utgangspunktet ikke stilling til hva som sendes. Metadataformat, filformat, kryptering og lignende er opp til brukeren, men Fiks plattformen tilbyr tjenester og verktøy for å etablere format for integrasjoner:

* _Fiks-IO Kontokatalog: Gir mulighet for å registrere adresser bestående av organisasjonsnummer, meldingstype og sikkerhetsnivå på en Fiks IO konto, som andre så kan benytte for å finne relevant konto-id å sende til. 
* _Fiks-IO Meldingskatalog_: Tilbyr en katalog over registrerte meldingstyper i form av json-schema. 
* _Fiks-IO java klient_: Java klient som tilbyr funksjonalitet for å bygge, signere, kryptere, og sende meldinger som ASiC-E pakker, samt mottak og dekryptering på andre siden. 
* _Fiks-IO .net klient_: Samme funksjonalitet som java-klienten, implementert i .net core.

### Konfigurasjon og forvaltning
Fiks IO settes opp gjennom Fiks Konfigurasjon, det er også her man oppretter kontoer, spesifiserer adresser, og styrer autorisasjoner. Både personer og integrasjoner må autoriseres før de kan sende meldinger fra en konto.

Man kan opprette flere kontoer, og for hver konto kan man opprette flere adresser, se Kontokatalogen for informasjonom dette. For hver konto lastes det opp et sertifikat med en offentlig nøkkel. Dette sertifikatet benyttes for å kryptere meldinger sendt til den aktuelle kontoen.   

### Sikkerhet
Autentisering av klienter mot REST service for sending av meldinger og AMQP service for leveranse av meldinger skjer gjennom virksomhetssertifikat-basert maskinporten autentisering. 

I utgangspunktet legger ikke SvarInn 2 føringer på hvordan (eller om) en melding sendt over plattformen sikres, men alle klienter som utvikles av KS, og alle meldingstyper som Fiks spesifiserer, vil benytte signerte, ende-til-ende krypterte meldinger gjennom [ASIC-E](https://github.com/difi/asic) containere. Denne standarden benyttes også av DIFI i forbindelse med integrasjonspunktet. I klientene skjer signering med samme sertifikat som blir benyttet for autentisering mot maskinporten, kryptering skjer med sertifikatet som er publisert i Fiks IO Kontokatalog.

### Kontokatalogen
For å sende en melding i Fiks IO må man kjenne konto-id'en til mottakeren, men for å støtte mer dynamisk bruk tilbys Fiks IO Kontokatalog. Dette er et register over Fiks IO kontoer og tilknyttede adresser. En adresse består av:

* _Identifikator_: Autoriserende identifikator for adressen. Dette vil i første omgang være begrenset til organisasjonsnummer, men kan senere utvides. For organisasjonsnummer benyttes Altinn for autorisering: personen som legger til adressen må ha rollen "post/arkiv" på den aktuelle organisasjonen.
* _Meldingstype_: Spesifiserer hvilken type meldingen har, som igjen definerer hvilket skjema fra meldingskatalogen meldingen samsvarer med.
* _Sikkerhetsnivå_: Spesifiserer hvilket sikkerhetsnivå meldingen skal ha. Typisk benyttes nivå 3 for ikke sensitive og nivå 4 for sensitive meldinger.

Adresser opprettes og forvaltes gjennom Fiks Konfigrasjon. Katalogen gir også mulighet for å laste opp en offentlig nøkkel i form av et X509 sertifikat. Dette sertifikatet blir benyttet for å kryptere meldinger sendt til kontoen, slik at de kan dekrypteres med den private delen av nøkkelen ved mottak.

Fiks Organisasjoner kan gjøre oppslag i registrerte adresser gjennom [(katalog-api'et)](https://editor.swagger.io/?url=https://github.com/ks-no/ks-no.github.io/blob/source/static/api/svarinn2-katalog-api-v1.json)). 

### Meldingskatalogen
Som nevnt over har Fiks IO i utgangspunktet ingen formening om hva innholdet i en melding er, men det er i mange integrasjon-scenarioer nyttig å ha et felles repository med kontrakter for hvordan meldinger skal bygges opp. 

Fiks-IO Meldingskatalog tilbyr kontrakter i form av json-schema, men det er også muligheter for 

### Håndtering av store filer
Fiks-IO støtter sending av store filer ved at alle meldinger større enn 5 megabyte lagres i Fiks Dokumentlager, i en dedikert konto som opprettes sammen med Fiks-IO kontoen. En referanse til denne lagrede filen blir så sendt over AMQP. 

Klientene utviklet av KS vil i slike tilfeller automatisk strømme filen fra Dokumentlager.

### Klienter
For å gjøre integrasjon lettere vil KS utvikle klienter som benyttes for både sending og mottak av meldinger fra Fiks-IO. 

Klientene er tilgjengelig i [Java](https://github.com/ks-no/fiks-io-klient-java), og [.net core](https://github.com/ks-no/fiks-io-client-dotnet). Andre språk vil vurderes, og vi vil gjerne høre fra deg om du skriver klienter for andre språk. 

![fiks_svarinn](/images/fiks_svarinn.png "Fiks SvarInn")

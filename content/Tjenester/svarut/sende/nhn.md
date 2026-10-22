---
title: Sende til aktør i Norsk Helsenett
date: 2026-02-01
hidden: false
aliases: [/tjenester/svarut/send-nhn]
---

## Sende til Norsk Helsenett
Vi har i 2025 jobbet med å koble SvarUt til Norsk Helsenett. 
Behovet har vært å kunne sende elektroniske brev mellom saksbehandlere i kommunale virksomheter og aktører på Norsk Helsenett (NHN). 
Aktører på helsenettet vil gjerne være fastleger, men er ikke begrenset til det. Kravet er at mottaker skal finnes i NHN sitt adresseregister, enten som en tjeneste eller person. For mer informasjon om hvilke parter som kan adresseres, se [NHN dokumentasjon om communicationparty](https://utviklerportal.nhn.no/informasjonstjenester/virksomhetstjenester/adresseregisteret/communicationparty-api/docs/apimd).

Hensikten er at saksbehandler i offentlig virksomheter skal kunne opprette og sende digitalt brev til fastlege eller annen helseaktør, fra sitt saks/arkivsystem eller fagsystem. 
Brevet skal da havne direkte i fastlegens pasientjournnalsystem (EPJ). I forlengelsen av dette skal SvarUt også håndtere at fastleger/andre aktører i Norsk Helsenett skal kunne sende brev tilbake til saksbehandler. 

## Hvordan ta i bruk løsningen
For å kunne sende til en aktør i NHN, så må avsender eksistere i Norsk Helsenett sitt adresseregister. 
Når man har fått en herId fra NHN, og KS Digital har fått tilgang til å sende på vegne av denne herId'en, så må man legge inn denne herId'en på SvarUt-kontoen. Informasjon med beskrivelse av hvordan man gjør dette kommer senere. 
Før SvarUt-konto har fått en gyldig herId, så vil alle forsøk på å sende via NHN-endepunktet til Rest v3 bli avvist.

## Hvordan sende til Norsk Helsenett
Vi har lagt til rette for å kunne sende en forsendelse til Norsk Helsenett i Send Rest V3, se [Send Rest V3](/tjenester/svarut/api/rest/#send) for mer informasjon.

Det er to valg når man sender en forsendelse: 
* Sende til innbyggers fastlege. Da må man legge ved fødselsnummer til innbygger i metadata for forsendelsen. SvarUt vil hente ut herId til fastlegen via NHN sitt fastlegeregister. 
* Sende til en vilkårlig herId i NHN. Da må denne herId'en legges ved i metadata for forsendelsen. SvarUt vil validere denne herId mot NHN sitt adresseregister. 


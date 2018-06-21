---
title: SvarInn 2.0
date: 2018-05-02
---

SvarInn 2.0 er en ny versjon av den gamle SvarInn tjenesten, som nå er flyttet over på fiks-plattformen.

De gamle grensesnittene blir videreført i 2.0, men det utvidet funksjonalitet har også kommet til:

* _Sett opp tjenesten i Fiks Konfigurasjon_. SvarInn kan nå konfigureres i Fiks Konfigurasjon, og man kan autorisere tilgang til svarinn-mottak for spesifikke personer. 
* _Send direkte til SvarInn_. Tidligere var SvarInn en mottakskanal spesifikk for SvarUt. I den nye versjonen er SvarUt og SvarInn koblet fra hverandre, slik at man kan sende direkte til SvarInn. Dette bruksmønsteret anbefales spesielt for maskin-til-maskin integrasjon, for eksempel hvis systemet ditt skal levere direkte til en fagsystem i en kommune.
* _Valider meldinger du sender_. Det er nå mulig å anngi meldingstype i SvarInn, og forsendelsen din vil da bli validert før den sendes til mottaker.
* _Finn mottakere gjennom Fiks Register_. Register, en ny tjeneste på fiks-plattformen, gjør det mulig å finne en mottaker og se hvilke formater mottakeren aksepterer. For eksempel kan man finne et sosialkontor basert på nav-enhet-id, og bekrefte at dette kan håndtere digisos-v1 forsendelser.
* _Hent meldinger via AMQP pub-sub_. I dag hentes meldinger fra SvarInn ved å polle et REST-Api. Dette blir videreført i SvarInn 2.0, men det det blir også mulig (og anbefalt) å hente meldinger via AMQP publish-subscribe. Dette åpner for mer effektiv og raskere prosessering av meldinger.
* _Svar på meldinger_. Det blir mulig å sende meldinger med på RPC mønster, slik at avsender kan forvente et svar på en melding. Svaret mottas på vanlig måte gjennom SvarInn. Dette kan for eksempel brukes hvis man vil vite hvilket saksnummer en innsendt søknad har blitt utstyrt med i kommunens sak-og-arkiv system.

![fiks_svarinn](/images/fiks_svarinn.png "Fiks SvarInn")
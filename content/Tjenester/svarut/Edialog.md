---
title: Fiks eDialog
date: 2023-06-29
aliases: [/svarut/edialog]
---

Sikker innsending av brev via SvarUt til mottakersystem i SvarUt. For å bruke eDialog bør man allerede ha tatt i bruk SvarInn.

## Beskrivelse

Konfigurasjon av eDialog-mottakere skjer via https://forvaltning.fiks.ks.no under «Fiks melding»-tjenesten og «eDialog». 
Hver mottaker vil ha en SvarUt-konto tilknyttet seg som vil faktureres for alle meldinger som sendes inn.

### eDialog med predefinert mottaker
Man kan lenke direkte til eDialog ved å bruke https://min.kommune.no/s/{organisasjonsnummer}. 
Man kan også bruke mottakerens fire bokstavers id i stedet for organisasjonsnummeret. 
Denne id'en kan finnes i konfigurasjonen for hver enkelt mottaker på https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester/melding/edialog/mottakere.


### Svare på forsendelse ved bruk av eDialog
Dersom man benytter V6 eller nyere av SOAP-service, eller hvilken som helst versjon av REST, for sending av forsendelser til SvarUt, kan man sende med en lenke til eDialog for å besvare forsendelsen. 
Denne linken vil da ha forhåndsutfylt avsender, mottaker og tittel.
Bruk av denne funksjonaliteten krever ikke at man har konfigurert noen mottakere i eDialog, da svaret på forsendelsen vil bli sendt fra den opprinnelige avsenderen i SvarUt og også faktureres denne.

![alternative text](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/wiki/ks-no/svarut-dokumentasjon/edialog/edialog.puml?2)

1. En sender inn forsendelse med svarPaForsendelseLink satt til true, og svarSendesTil utfylt med organisasjonsnummeret og adressen man ønsker at et svar skal sendes til.
2. Avsender får en forsendelseid i retur.
3. SvarUt sender vanlig varsel til SDP/Altinn med link for å kunne svare på forsendelsen.
4. Mottaker klikker på "svar på forsendelse" link i Altinn/SDP.
5. Mottaker fyller ut eDialog skjema og sender det inn.
6. eDialog sender kvittering på innsendt skjema til innbygger på epost.
6. eDialog lager en ny forsendelse til avsender. Dette er utfylt med svarPaForsendelse lik forsendelseid til opprinnelig forsendelse.
7. Sak/Arkivsystem mottar forsendelse via SvarInn og ser at dette er svar på utgående forsendelse og putter svaret på samme sak.




---
title: Edialog
date: 2017-01-01
---

Sikker innsending av brev via SvarUt til mottakersystem i SvarUt. For å starte å bruke eDialog må du benytte SvarInn.
eDialog kan aktiveres i konfigurasjonen for en avsender i SvarUt. Alle brev som blir send til eDialog mottakeren du konfigurerer vil bruke denne avsender for eventuelle kostnader tilknyttet forsendelsen.

### eDialog åpen innsending
eDialog er tilgjengelig på https://svarut.ks.no/edialog/
Her kan en velge mottaker blandt alle som er registrert i SvarUt.

### eDialog med predefinert mottaker

Hvis en vil linke til eDialog med ferdigutfylt mottaker kan en brukelinken https://svarut.ks.no/edialog/mottaker/&lt;orgnr>;
Da vil det ikke være mulig å endre mottaker.



### Svare på forsendelse ved bruk av eDialog
Hvis en benytter v6 eller nyere av forsendelseservicen i SvarUt kan en sende med en lenke til eDialog for å besvare forsendelsen. Denne linken vil da ha utfylt avsender, mottaker og tittel.

![alternative text](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/wiki/ks-no/svarut-dokumentasjon/edialog/edialog.puml?2)

1. En sender inn forsendelse med svarPaForsendelseLink = true, og svarSendesTil utfylt med organisasjonsnummeret og adressen man ønsker at et svar skal sendes til.
2. Avsender får en forsendelseid i retur.
3. SvarUt sender vanlig varsel til SDP/Altinn med link for å kunne svare på forsendelsen.
4. Innbygger/mottaker klikker på "svar på forsendelse" link i Altinn/SDP.
5. Innbygger/mottaker fyller ut edialog skjema og trykker send.
6. Edialog sender kvittering på innsendt skjema til Innbygger
6. Edialog lager en ny forsendelse til avsender. Dette er utfylt med svarPaForsendelse lik forsendelseid til opprinnelig forsendelse.
7. Sak/Arkivsystem mottar forsendelse via SvarInn og ser at dette er svar på utgående forsendelse og putter svaret på samme sak.




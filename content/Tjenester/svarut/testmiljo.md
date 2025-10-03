---
title: SvarUt og SvarInn Testmiljø
date: 2025-10-03
hidden: false
---

For å lage integrasjoner mot SvarUt kan en teste mot vårt testmiljø. Testmiljøet har ingen garantier for oppetid, men vi prøver at det er tilgjengelig
hele tiden. Testmiljøet inneholder de siste endringene også endringer som ikke er produksjonsatt.

Testmiljøet er tilgjengelig på https://svarut.fiks.test.ks.no/

**Vi ønsker ikke sensitive data i testmiljøet.** Vi ønsker primært at det blir benyttet data fra Tenor.

## Testbrukere
Vi anbefaler at man bruker testbrukere fra Tenor: https://www.skatteetaten.no/skjema/testdata/. Her finner man både personer og organisasjoner

### Finne gyldig organisasjonsnummer med tilhørende daglig leder
* Logge inn i Tenor. For å finne daglig leder, er det enklest å søke etter personer som har rollen 'Daglig leder' i seksjonen "Enhetsregisteret og Foretaksregisteret". Da får man opp data som viser organisasjoner som er knyttet mot personer med rollen Daglig leder. 
* Alternativt kan man, når man forsøker å logge inn i vårt testmiljø (https://svarut.fiks.test.ks.no/), bruke TestID som påloggingsmetode, og her velge 'Hent tilfeldig daglig leder'. Dette vil gi fødselsnummer og organisasjonsnummer som kan brukes videre

## Print
I test kan en velge Strålfors som printleverandør, men det vil kun simuleres at disse sendes print. 
Vi anbefaler derfor å bruke Manuell print og fra det grensesnittet sette forsendelser til printet.

## Altinn
Altinn går i test mot deres tt02-testmiljø: https://tt02.altinn.no. Her kan dere lese meldinger sendt til testbrukere og testorganisasjoner.

## Digitale postkasser
Digipost og e-Boks har egne testmiljøer:  
Digipost: https://difitest.digipost.no/  
e-Boks: https://demo2-www.e-boks.no/privat  

Valg av digital postkasse gjøres i Kontakt- og reservasjonsregisteret på https://minprofil.test.kontaktregisteret.no/

For å sette opp en SvarUt-konto for Digital Post til innbygger må en bruke et organsisasjonsnummer som er satt opp riktig hos Digdir og Altinn. I testmiljøet kan man bruke KS sitt organisasjonsnummer, 971 032 146.
Alternativt kan man legge inn egne organisasjonsnummer. En må gjennomføre samme prosess som når man skal sette opp et vanlig organisasjonsnummer for å sende til digital postkasse: 
* Det må sendes en epost til servicedesk hos Digdir med beskjed om at en ønsker å få på plass en avtale for Digital post for dette organisasjonsnummeret.
* Det må også delegeres rettigheter til KS slik at KS Digital kan sende på vegne av organisasjonsnummeret
  * Logge inn i https://tt02.altinn.no med daglig leder for orgnummeret man skal delegere rettigheter til KS orgnummer med
  * Trykke på ikon for organiasjonsnummer og finne Innstillinger.
  * Finne ‘Tilgang til programmeringsgrensesnitt - API’ → Gi og fjerne tilganger
  * Deleger nytt API
  * Søk etter ‘Deleger rettighet til å sende DPI-meldinger på vegne av virksomheten’
  * Får då opp at det gjelder scope digitalpostinnbygger:send
  * Trykk på pluss også Neste
  * Søke så opp KS sitt orgnummer: 971032146
  * Neste og Lagre.

## SvarInn 
For å teste SvarInn må en registrere et organisasjonsnummer i mottakersystemet. 
* Fordi det kreves at den som legger inn et organisasjonsnummer på et mottakersystem, er daglig leder, så må man finne en person som har denne rollen, og deretter finne organisasjonen denne er daglig leder for. Se oppskrift over. 
* Logg så inn med en bruker som har administrator-rettigheter i SvarUt: https://svarut.fiks.test.ks.no. Om du ikke har dette, må du ta kontakt med vår brukerstøtte (se 'Tilgang til SvarUt test')
* I fanen Mottakersystem (https://svarut.fiks.test.ks.no/mottaker#/) så kan en nå opprette eller endre mottakersystem. Opprett eller velg et mottakersystem, og gi deretter tilgang til fødselsnummer som har rollen daglig leder (i fanen Tilganger på et gitt mottakersystem). 
* Logg inn i SvarUt igjen med fødselsnummer som er knyttet mot Testbruker som har rollen Daglig leder.
* Nå er du klar for å legge inn organisasjonsnummer på mottakersystemet. 

Følg samme oppskrift om man tidligere har registrert et ekte organisasjonsnummer på et SvarInn mottakersystem og nå har fått problemer med å sende til dette organisasjonsnummeret i våre test-miljø. 
Oppdater med nytt organisasjonsnummer på mottakersystem, og så er det klart for å sende forsendelser til dette organisasjonsnummeret i stedet for. 

## Tilgang til SvarUt test
For å få tilgang til testmiljøet kan man sende en mail til fiks@ks.no.

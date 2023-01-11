---
title: 3. Opprette konto
date: 2022-09-23
alias: [/fiks-plattform/tjenester/fiksprotokoll/brukerveiledning/opprette_konto, /tjenester/fiksprotokoll/opprette_konto]
---

## Steg 1: Velg system
Velg systemet du skal opprette konto på
![fiks protokoll](/images/protokoll-brukerveiledning/3_velg_system.png "Velg system")
## Steg 2: Velg kontoer
Velg fanen kontoer
![fiks protokoll](/images/protokoll-brukerveiledning/3_velg_kontoer.png "Velg kontoer")
## Steg 3: Opprett ny konto
Trykk på "Opprett ny konto"
![fiks protokoll](/images/protokoll-brukerveiledning/3_opprett_konto.png "Opprett konto")
## Steg 4: Navn og beskrivelse
Fyll ut navn og beskrivelse. Dette vil identifisere kontoen for andre
![fiks protokoll](/images/protokoll-brukerveiledning/3_opprett_del1.png "Navn og beskrivelse")
## Steg 5: Velg protokoll
Velg protokoll fra nedtrekksmenyen. Dette bestemmer hvilken meldingsprotokoll kontoen hører til, og den vil kun kommunisere med kontoer i samme protokoll.
![fiks protokoll](/images/protokoll-brukerveiledning/3_opprett_del2.png "Velg protokoll")
## Steg 6: Velg Protokollpart
Velg protokollpart fra nedtrekksmenyen. Dette bestemmer hvilken del av protokollen kontoen representerer. F.eks. vil fagsystemet i dette tilfellet være en klient som skal arkivere. Dette bestemmer hvilke meldinger kontoen kan sende og hvilke meldinger den kan motta. Det bestemmer også hvilke kontoer innenfor protokoll den kan kommunisere med. F.eks. vil en klient kun kunne kommunisere med andre arkiv, ikke andre klienter.

Etter at part er valgt, vises det hvilke meldinger som kan sendes og mottas, og hvilke parter kontoen kan kommunisere med.
![fiks protokoll](/images/protokoll-brukerveiledning/3_opprett_del3.png "Velg protokollpart")
## Steg 7: Last opp offentlig nøkkel
Meldinger som sendes over Fiks IO skal krypteres. Dette gjøres med et privat/offentlig-nøkkelpar. Her laster du opp den offentlige nøkkelen, den private legges inn i Fiks IO-klienten. 

NB! Du kan ikke opprette konto uten offentlig nøkkel. Dette er ikke det samme som virksomhetssertifikatet som ble brukt ved opprettelse av system. Du vil typisk generere et unikt par per konto (i test kan det hende samme par blir gjenbrukt på flere kontoer).

![fiks protokoll](/images/protokoll-brukerveiledning/3_opprett_del4.png "Last opp nøkkdel")
## Steg 8: Opprett konto
Etter at nøkkelen er lastet opp, trykker du på "Opprett konto" for å opprette kontoen.
![fiks protokoll](/images/protokoll-brukerveiledning/3_opprett_del5.png "Opprett konto")
## Steg 9: Konto opprettet
Da er kontoen opprettet. Konto-id er IDen som Fiks IO trenger for å sende og motta meldinger med kontoen. 

For å begynne å sende meldinger må systemet fått tilgang til en konto i et annet system. 
![fiks protokoll](/images/protokoll-brukerveiledning/3_opprettet_ferdig.png "Konto opprettet")

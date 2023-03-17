---
title: 2. Opprette system
date: 2022-09-23
alias: [/fiks-plattform/tjenester/fiksprotokoll/brukerveiledning/opprette_system, /tjenester/fiksprotokoll/opprette_system, /tjenester/fiksprotokoll/brukerveiledning/opprette_system]
---

For å bruke Fiks Protokoll må du opprette et system. Hvert system i kommunen som skal bruke Fiks Protokoll, må opprette et protokollsystem. F.eks fagsystem eller arkiv.
Logg først inn på [forvaltning.fiks.ks.no](forvaltning.fiks.ks.no) ([forvaltning.fiks.test.ks.no](forvaltning.fiks.test.ks.no) for testmiljø). Og gå inn på konfigurasjon.

## Steg 1: Velg Fiks Protokoll
Finn Fiks Protokoll i listen over tjenester. Tjenester som er tatt i bruk ligger øverst. Klikk på "Fiks Protokoll"-knappen
![fiks protokoll](/images/protokoll-brukerveiledning/2_velg_tjeneste.png "Velg tjeneste")

## Steg 2: Klikk opprett system
Her vil det være en liste over systemer. Denne listen vil være tom dersom det ikke er blitt opprettet system.
Klikk på "Opprett nytt system" for å opprette nytt system.
![fiks protokoll](/images/protokoll-brukerveiledning/2_opprett_system_knapp.png "Opprett system")

## Steg 3: Wizard - Systeminfo 
Det vil nå åpne seg en dialog med 4 steg. I første steg skal du fylle ut:
* Systemnavn - Navnet på systemet. Dette vil være visningsnavnet til systemet i Fiks. Dette navnet vil være synlig for andre organisasjoner som kommunisere med systemet
* Beskrivelse - En mer detaljert beskrivelse av systemet. Dette vil også være synlig for andre organisasjoner
* E-post(er) for varsling - En liste (minimum en) av eposter som blir brukt for å kontakte ansvarlige for systemet

Trykk "Neste" for å komme videre
![fiks protokoll](/images/protokoll-brukerveiledning/2_wizard_1_utfylt.png "Wizard info")

## Steg 4: Wizard - Sett opp integrasjon 
For å kunne sende og motta meldinger gjennom Fiks Protokoll kreves en integrasjon. Integrasjonen brukes via maskinporten, hvor et virksomhetssertifikat identifiserer eier av integrasjonen. Virksomhetssertifikatet hører til et organisasjonsnummer som må fylles ut her. I produksjon vil det variere om dette er kommunens virksomhetssertifikat eller om det er leverandørens. 

NB: Det vil ikke være mulig å bruke Fiks Protokoll i test uten et virksomhetssertifikat. Det er mulig å endre organisasjonsnummer for integrasjonen senere dersom du velger feil i dette steget. [Se hvordan opprette klient hos maskinporten her](/fiks-platform/difiidportenklient)

Dersom du ønsker å konfigurere systemet gjennom API kan du velge dette her. Da vil det være mulig å endre på systemet og opprette kontoer uten å bruke webgrensesnittet.

Trykk "Neste" for å komme videre
![fiks protokoll](/images/protokoll-brukerveiledning/2_wizard_2_utfylt.png "Wizard integrasjon")

## Steg 5: Wizard - Opprett system
Da er systemet klar til å opprettes. 
Trykk "Opprett Fiks Protokoll-system" for å opprette
![fiks protokoll](/images/protokoll-brukerveiledning/2_wizard_3.png "Wizard opprett")

## Steg 6: Wizard - System opprettet
Systemet er nå opprettet. 

På denne siden vises nødvendig nøkkelinformasjon.
* systemId - Denne IDen representerer systemet og brukes blant annet når en konto i et annet system skal gi tilgang til dette systemet og dersom systemet skal konfigureres gjennom API
* integrasjonId - Denne IDen brukes for maskin til maskin pålogging og kreves for tilgang til API. Denne skal inn i konfigurasjonen av Fiks IO-klienten. (Klientene er tilgjengelig i [Java](https://github.com/ks-no/fiks-io-klient-java), og [.net core](https://github.com/ks-no/fiks-io-client-dotnet))
* integrasjonPassord - Dette passordet brukes sammen med integrasjonId og skal også inn i konfigurasjonen til Fiks IO-klienten. Det er ikke mulig å hente dette passordet igjen, men det går an å generere nytt passord senere
* systemNavn - Navnet på systemet
* 
Trykk "Gå til system" for å gå til systemet
![fiks protokoll](/images/protokoll-brukerveiledning/2_wizard_4.png "Wizard ferdig")

## Steg 7: Systemoversikt
Du har nå opprettet et Protokollsystem. På landingssiden vises nøkkelinformasjon om systemet.

Merk: Systemet vil kun være tilgjenglig for andre systemer i egen organisasjon. Dette kan endres under "Konfigurasjon"
![fiks protokoll](/images/protokoll-brukerveiledning/2_opprettet.png "System opprettet")
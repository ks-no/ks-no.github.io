---
title: Distribuerte pakker og klienter - risikovurdering
date: 2023-09-19
alias: [/fiks-plattform/tjenester/distribuertepakker/]
---

## Kort beskrivelse

KS leverer pakker for Java og .NET gjennom henholdsvis Maven Central og nuget.org for flere av tjenestene våre.
Eksempelvis Fiks-IO klient, Maskinporten klient og pakker til protokollene Fiks-Arkiv, Fiks-Plan osv. 


## Risikovurderinger

Det er gjort vurderinger og tiltak for å sikre pakkene som leveres.
Risiko kan ligge i kompromitterte pakker i de sentraliserte repositories. 
Dette kan hende som resultat av:
- Tredjepart laster opp kompromitterte pakker til Maven Central eller nuget.org som KS
- At man har et kompromittert byggemiljø som leverer kompromitterte pakker
- Avhengige pakker, tredjepart pakker, som følger med KS sine pakker er kompromittert og følger med ut med KS sine pakker


## Tiltak


### Felles

For å mitigere risiko for kompromitterte pakker til Maven Central og nuget.org gjøres følgende: 

- Byggeserver er beskyttet
- Det brukes statisk verktøy som følger med på avhengigheter og manuell gjennomgang ved oppdateringer av pakkene
- Sentral distribusjonstjener gjør automatiserte tester på pakken for å sjekke at den følger formelle krav før den blir gjort tilgjengelig



### Maven


- Alle pakker som skal distribueres til sentral maven distribusjonstjener signeres med egen GPG nøkkel eid av KS
- Den private delen av GPG nøkkelen og passkey er lagret som credential på bygg server og er bare tilgjengelig for bygg-agenten når den skal publisere pakken
- Pakkene lastes opp til egen konto på sentral distribusjontjeneste som har tilgang til namespace/groupId no.ks. Ingen andre kontoer vil kunne distribuere pakker under dette namespace (og underliggende namespace)

### Nuget

For å mitigere risiko for kompromitterte nuget pakker til nuget.org gjøres følgende

- Nuget pakker signeres med et eget codesign sertifikat som er koblet til KS sitt organisasjonsnummer
- Opplasting til nuget.org gjøres vha codesign sertifikatet
- Nuget pakkene på nuget.org er publisert med KS som eier
- Kodesigneringssertifikat er trygt lagret på bygg server og blir kun tilgjengelig for bygg-agenten når den skal publisere pakken  


  
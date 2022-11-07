---
title: Fullmakt
date: 2018-10-03
aliases: [/fiks-platform/tjenester/fullmakt]
---
Tjenesten gjør det foreløpig mulig å hente fullmakter for organisasjoner, samt navn for autentisert bruker.

## Endepunkter [(api-spec)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/fullmakt-api-v1.json)

For alle endepunktene hentes autentisert bruker fra access token i "Authorization"-headeren på requesten. Dette tokenet 
må være utstedt av ID-porten.

### Meg
Forsøker å hente informasjon om autentisert bruker fra Altinn. Det eneste som hentes i dag er navn. Dersom personen ikke 
finnes returneres en respons med blankt navn.

### Alle
Henter alle organisasjoner som autentisert bruker har rollen "Post/arkiv" eller "Kommunale tjenester" for i Altinn. 
Listen vil også inneholde en fullmakt for autentisert bruker, med navn satt dersom personen ekisterer i Altinn.

### Autoriser for organisasjon
Sjekker om autentisert bruker har rollen "Post/arkiv" eller "Kommunale tjenester" i Altinn på organisasjonen med 
organisasjonsnummeret som sendes inn.

Organisasjonsnummer kan sendes inn som query parameter "orgno", eller i HTTP-header med navn "OnBehalfOf". Førstnevnte 
brukes dersom begge er satt.


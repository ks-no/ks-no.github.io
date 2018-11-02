---
title: Fiks-plattformen
description: Description
---

KS-Fiks er en felles tjenesteplattform for norske kommuner. Plattformen består av tre hoveddeler:

### minside.kommune.no
Dette er hjemmet for innbyggerrettede tjenester på Fiks Plattformen. I dag tilbys i hovedsak én tjeneste: "post fra din kommune", drevet av [Fiks Innsyn]({{< ref "innsyn.md" >}}). Over tid vil Innsyn også inbefatte andre datatyper (faktura, saker, osv), og nye tjenester vil bli lagt til. Se "tjenster under utvikling" for å se hva som er på vei. 

### forvaltning.fiks.ks.no
Her finner tjenster som retter seg mot kommuneansatte og andre som skal forvalte eller benytte tjenester på Fiks Plattformen. Her finnes [Fiks Konfigurasjon]({{< ref "innsyn.md" >}}), som benyttes for å sette opp og konfigurere Fiks tjenester. Over tid vil man også kunne finne andre tjenester rettet mot ansatte i satat og kommune på denne siden.

### api.fiks.ks.no
Her finner du webservicer i form av REST-api'er som leverandører, kommuner og andre offentlige virksomheter kan bruke for å integrere mot tjenestene som tillbys på Fiks Plattformen. Alle tjenestener på plattformen er tilgjengelige her, også de som drinver minside.kommune.no. Dette gjør at kommuner kan integrere maskin-til-maskin med disse hvis de ikke ønsker å bruke web-frontenden som KS har utviklet.

![fiks oversikt](images/fiks_diagram.png "Fiks oversikt")







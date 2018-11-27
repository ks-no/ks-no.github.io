---
title: Fiks-plattformen
description: Description
---

KS-Fiks er en felles tjenesteplattform for norske kommuner. Plattformen består av tre hoveddeler:

### minside.kommune.no
Dette er hjemmet for innbyggerrettede tjenester på Fiks Plattformen. I dag tilbys i hovedsak én tjeneste: "Post fra din kommune", drevet av søkemotoren [Fiks Innsyn]({{< ref "innsyn.md" >}}). Over tid vil Innsyn også innbefatte andre datatyper (faktura, saker, osv), og andre tjenester vil bli lagt til. Se "tjenester under utvikling" for å se hva som er på vei. 

### forvaltning.fiks.ks.no
Her finnes tjenester som retter seg mot kommuneansatte og andre som skal administrere eller bruke applikasjoner som Fiks tilbyr. Her finnes i dag [Fiks Konfigurasjon]({{< ref "konfigurasjon.md" >}}), men andre tjenester vil raskt komme til.

### api.fiks.ks.no
Dette er api-laget for Fiks plattformen. Her finner du webservicer i form av REST-api'er som leverandører, kommuner og andre offentlige virksomheter kan bruke for å integrere mot tjenestene som tillbys på Fiks. Alle tjenester på plattformen er tilgjengelige her, også de som driver minside.kommune.no. Dette gjør at kommuner kan integrere maskin-til-maskin med disse hvis de ikke ønsker å bruke web-frontenden som KS har utviklet.

Api spesifikasjoner finner du lenket fra den enkelte tjeneste, se "tjenester" eller "tjenester under utvikling".

![fiks oversikt](images/fiks_diagram.png "Fiks oversikt")




---
title: SvarUt
aliases: [/svarut/]
---

{{% notice style="note" title="Viktig informasjon" %}}
Vi planlegger å avvikle støtte for alle gjenværende SOAP-versjoner og REST v1 i starten av 2027, les mer [her](https://ksdigital.no/2026/01/13/avvikling-av-soap-og-rest-v-1-api-for-svarut/). 

Vi har også lagt til støtte for å automatisk opprette integrasjoner som kan brukes for kall til Rest v2/v3 - du kan lese mer om det [her](/svarut/api/avvikling-api).
{{% /notice %}}

## Kort beskrivelse
KS FIKS meldingformidler er en sentralisert løsning som formidler dokumenter mellom avsender og mottaker via ulike kanaler. 
Kommuner og andre kan benytte KS FIKS plattform. SvarUt benyttes for utgående post, mens SvarInn benyttes for innkommet post.

Edialog er grensesnittet som tilbys innbygger for å fylle ut et skjema som skal returneres til kommunen.

## Tilgjengelige grensesnitt
| Grensesnitt       | Støtte                 |
|-------------------|------------------------|
| Web portal        | Ja                     |
| Maskin til maskin | [Apier](api-versjoner) |

## Beskrivelse av tjenesten
SvarUt er en tjeneste som tilbyr et grensesnitt for aktørene i en digital dialog mellom kommune og innbygger.

### Teknisk oversikt skisse
![alternative text](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/wiki/ks-no/svarut-dokumentasjon/edialog/edialog.puml?2)

### Konfigurasjon av Svarut
Etter at det er signert avtale med KS Digital om bruk av SvarUt oversendes en veiledning i konfigurasjon av tjenesten: [Konfigurasjon av SvarUt](https://ksdigital.no/tjenestene/svarut-tjenesten/svarut-konfigurasjon/)

Informasjon på nettstedet https://ksdigital.no er beregnet på kommuner og andre virksomheter som har tegnet avtale om bruk av SvarUt.

### IPer

Hvis dere må åpne i brannvegg ligger svarut bak disse ipene:

| SvarUT-Test   | SvarUT-PROD   |
|---------------|---------------|
| 137.221.25.65 | 137.221.25.66 | 
| 137.221.28.65 | 137.221.28.66 | 

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}
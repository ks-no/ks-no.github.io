---
title: Dokumentlager
date: 2018-08-13 
---

Dokumentlager tjenesten lar kommunen og andre fiks-organisasjoner laste opp filer, og definerer hvilke aktører som skal autoriseres for tilgang til denne filen. 

Dokumentlageret vil bli benyttet av flere fiks-tjenester: SvarUt, SvarInn, Digisos og Innsyn, men det kan også benyttes i en fiks-organisasjons egne integrasjoner.

### Dokumentlager tjenesten [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/dokumentlager-upload-api-v1.json)

De vanlige [autentiseringsreglene]({{< ref "sikkerhet.md" >}}) for Fiks-plattformen gjelder for denne tjenesten, men i tilegg må integrasjonen har rett til å laste opp filer på en dokumentlager konto.

Dokumentlager fungerer i denne rekkefølgen:
1. En laster opp metadata om dokumentet.
2. En laster opp fildata
3. Mottaker laster ned fil
4. TTL kan utløpe og fil blir utilgjengelig

En kan også slette filer manuelt.


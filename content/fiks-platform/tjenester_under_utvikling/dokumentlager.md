---
title: Dokumentlager
date: 2018-08-13 
---

Dokumentlager-tjenesten lar kommunen og andre Fiks-organisasjoner laste opp dokumenter. Ved opplasting autoriseres en eller 
flere personer og/eller organisasjoner for tilgang til dokumentet. Det er også mulig å laste opp dokumenter med en begrenset
levetid, slik at det blir gjort gjort uttilgjengelig når denne tiden utløper.

En Fiks-organisasjon kan organisere sine dokumenter ved bruk av det som kalles kontoer. Om man vil bruke en eller flere 
kontoer er helt opp til hver organisasjon.

Dokumentlageret vil bli benyttet av flere Fiks-tjenester: SvarUt, SvarInn, Digisos og Innsyn, men det kan også benyttes av 
en Fiks-organisasjons egne integrasjoner.

### Integrasjonsutvikling [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/dokumentlager-upload-api-v1.json)

Alle operasjoner i dokumentlageret utføres på en konto, som er en ressurs som hører til en Fiks-organisasjon. Hvordan disse 
organiseres er opp til hver organisasjon. Man kan ha én konto for alt, eller dele det opp over mange, slik at man for 
eksempel kan gi forskjellige tilganger for hver konto.

De vanlige [autentiseringsreglene]({{< ref "sikkerhet.md" >}}) for Fiks-plattformen gjelder for denne tjenesten, men i 
tillegg må integrasjonen ha rett til å laste opp dokumenter på en dokumentlager konto. Disse tilgangene tildeles som vanlig 
gjennom konfigurasjonsgrensesnittet, men må gis på kontonivå. Dersom man har flere kontoer, men ønsker å gi en integrasjon 
tilgang til flere av disse må tilgang gis på alle disse kontoene.

Ved opplasting av metadata kan man spesifisere en valgfri TTL (time-to-live), som spesifiserer et tidspunkt hvor dokumentet 
vil bli gjort uttilgjengelig, og til slutt slettet.

Dokumentlager fungerer på følgende måte:

1. En laster opp metadata om dokumentet. Her spesifiseres blant annet hvem dokumentet skal eksponeres for, dokumentets TTL, osv.
2. En laster opp dokumentdata
3. Mottaker laster ned dokument

Det er tre forskjellige måter et dokument kan bli slettet på:
- Manuelt gjennom webgrensesnitt eller API
- Ved at TTL utløper
- Dersom kontoen dokumentet hører til blir slettet

Når et dokument slettes vil metadata fortsette å eksistere, men selve dokumentet vil ikke lenger være tilgjengelig.


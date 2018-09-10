---
title: Dokumentlager
date: 2018-09-10
---

Dokumentlager-tjenesten lar kommunen og andre Fiks-organisasjoner laste opp dokumenter. Ved opplasting autoriseres en eller 
flere personer og/eller organisasjoner for tilgang til dokumentet. Det er også mulig å laste opp dokumenter med en begrenset
levetid, slik at det blir gjort utilgjengelig når denne tiden utløper.

En Fiks-organisasjon kan organisere sine dokumenter ved bruk av det som kalles kontoer. Alle dokumenter som lastes opp 
vil tilhøre en konto. Om man vil bruke en eller flere kontoer er helt opp til hver organisasjon. Kontoer administreres 
gjennom konfigurasjonsgrensesnittet, hvor man også finner statistikk for diskbruk, metadata for dokumenter, med mer.

Dokumentlageret vil bli benyttet av flere Fiks-tjenester: SvarUt, SvarInn, Digisos og Innsyn, men det kan også benyttes av 
en Fiks-organisasjons egne integrasjoner.

Dokumentlageret fungerer på følgende måte:

1. En laster opp metadata om dokumentet. Her spesifiseres blant annet hvem dokumentet skal eksponeres for, dokumentets levetid, osv.
2. En laster opp dokumentdata
3. Dokumentet blir tilgjengelig for alle som er autorisert til å se det
4. Dokumentet kan bli utilgjengeliggjort og slettet av en av grunnene spesifisert under

Det er tre forskjellige måter et dokument kan bli slettet på:

- Manuelt gjennom webgrensesnitt eller API
- Ved at dokumentets levetid utløper
- Dersom kontoen dokumentet hører til blir slettet

Når et dokument slettes vil metadata fortsette å eksistere, men selve dokumentet vil ikke lenger være tilgjengelig.

### Integrasjonsutvikling [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/dokumentlager-upload-api-v1.json)

Alle operasjoner i dokumentlageret utføres på en konto, som er en ressurs som hører til en Fiks-organisasjon. Hvordan disse 
organiseres er opp til hver organisasjon. Man kan ha én konto for alt, eller dele det opp over mange, slik at man for 
eksempel kan gi forskjellige tilganger for hver konto.

De vanlige [autentiseringsreglene]({{< ref "sikkerhet.md" >}}) for Fiks-plattformen gjelder for denne tjenesten, men i 
tillegg må integrasjonen ha rett til å laste opp dokumenter på en dokumentlager konto. Disse tilgangene tildeles som vanlig 
gjennom konfigurasjonsgrensesnittet, men må gis på kontonivå. Dersom man har flere kontoer, men ønsker å gi en integrasjon 
tilgang til flere av disse må tilgang gis på hver enkelt konto.

Ved opplasting av metadata kan man spesifisere en valgfri TTL (time-to-live), som spesifiserer et tidspunkt hvor dokumentet 
vil bli gjort utilgjengelig, og til slutt slettet. En negativ verdi betyr at dokumentet aldri utløper. Formatet er UNIX
epoch millisekunder.






---
title: Digisos 
date: 2019-02-11
---

**STATUS: under utvikling**

Fiks Digisos er en tjeneste for å tilrettelegge for kommunal behandling av sosialsøknader via et brukergrensesnitt på nav.no.

Fiks Digisos tilbyr:

* Enkelt oppsett for den enkelte kommune gjennom [Fiks Konfigurasjon]({{< ref "konfigurasjon.md" >}}) 
* Innbygger får fortløpende oppdatering på saksgang, tilgjengelig både gjennom Fiks Innsyn og på nav.no.
* Innbygger får tilgang til alle dokumenter og mulighet til å sende inn nye søknader basert på data fra tidligere søknader.
* Ansatte/brukerstøtte i nav kan se utvalgte deler av saken via nav sine systemer.

## Sikkerhet
Systemet er lagt opp slik at Nav ikke trenger å lagre data, disse fjernes fra Navs systemer når søknaden sendes til Fiks. All tilstand lagres dermed på Fiks plattformen og hos kommunen. Innsending av søknad kan utelukkende gjøres med brukerens ID-Porten autentisering.

Kommunikasjonen mellom aktørene (Nav, Fiks, fagsystem) foregår med SSL kryptering, i tillegg er alle dokumenter kryptert med mottakers nøkkel. Nav krypterer med Fiks sin nøkkel, Fiks krypterer med fagsystemets, og fagsystemet vil igjen bruke fiks-nøkkelen.

Dokument og melding i fiks-innsyn er utelukkende tilgjengelig for innbygger, dette gjelder også bruker-delen av den generelle metadataen som er lagret i Fiks Digisos. Et begrenset utvalg av metadata er også tilgjengelig for Nav ansatte - uthenting av disse krever autentisering med Navs virksomhetssertifikat og integrasjonslogin, og alle slike spørringer logges i Fiks Audit. Ansvaret for den videre autorisering av den enkelte Nav-ansatte ligger hos Nav.

## Flyt

1. Innbygger fyller ut søknad om sosialstønad på nav.no, som sender denne til fiks-digisos gjennom et synkront http api.
2. Fiks-digisos mottar søknaden.
    1. Søknadsfilen legges i fiks-dokumentlager, og innbyggeren autoriseres for tilgang.
    2. Det gjøres oppslag i fiks-svarinn2-katalog for å se om det finnes en mottaker på nav-enhetsnummeret som er spesifisert, og om denne mottakeren er i stand til å behandle digisos-formatet.
    3. Det gjøres et kall mot fiks-svarinn, hvor filen blir validert og sendt til mottakeren.
    4. Hvis punktene over blir gjennomført ok opprettes en digisos-melding i Fiks Innsyn. Denne autoriseres for innbyggeren.
    5. Fiks returnerer 202 ACCEPTED på http-kallet fra Nav. Dette markerer ansvarsoverføring fra Nav til Fiks, som fra nå garanterer at saken leveres til kommune for behandling.
3. Kommunen mottar meldingen gjennom SvarInn2. Den vil være tilgjengelig i køen i en fastsatt periode. Om kommunen ikke bekrefter mottak før denne perioden går ut vil meldingen bli trukket og alternativ kanal benyttes (se punkt 6).
4. Søknanded opprettes i kommunalt fagsystem.
5. Det kommunale fagsystemet bekrefter mottak av søknaden og oppdaterer status i Fiks Digisos. 
    1. Evt. nye filer legges i Fiks Dokumentlager, autorisert for innbygger.
    2. Digisos saken i Fiks Innsyn oppdateres
    3. Saken er tilgengelig som nav.no og nav ansatte/brukerstøtte.
6. Om fagsystemet avviser eller unnlater å bekrefte mottak av saken vil SvarUt benyttes som alternativ kanal. I praksis betyr dette at meldingen blir sendt til kommunens Altinn-konto, evt. sendt til print og postlagt.     
    
![fiks_digisos](/images/fiks_digisos.png "Fiks Digisos")


## Sak oppdatering fra Fagsystem

Sak oppdaterings api [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/digisos-sak-api-v1.json)

* Filer må lastes opp på forhånd.
* Når en sakoppdatering skjer, må alle filer være tilgjenglieg.
* Filer som ikke lenger skal ligge på sak, kan fjernes etter at sakoppdatering uten filene er lastet opp.
* Fagsystemet må ha kontroll på listen med filer og sjekke at denne er korrekt.
* Når en Sakoppdatering skjer, må saken eksistere i digisos, enten fordi skjema fra nav er sendt via Digisos eller at fagsystem har opprettet en sak.

**Opplasting av filer**

Før en sakoppdatering, må alle refererte filer være lastet opp på forhånd.

Filer lastes opp til FIKS-Digisos ved bruk av en multipart streaming request, der man spesifiserer HTTP-headeren "Transfer-Encoding" til å sende data i chunks, ```Transfer-Encoding: chunked```. 

FIKS tilbyr en referanseimplementasjon av hvordan en slik request skal defineres, og som kan brukes for filopplasting: https://github.com/ks-no/fiks-digisos-klient.

URL-stien til filopplasting er ```/digisos/api/v1/{fiksOrgId}/{digisosId}/filer```, der ```{fiksOrgId}``` og ```{digososId}``` er FiksOrgId-en og FiksDigisosId-en som filene skal legges til. 

Endepunktet tar inn en liste, der man for hver fil som skal lastes opp legger til en metadata-blokk som inneholder informasjon om filen og en base64-encodet blokk som inneholder selve filen.
Metadata består av filnavn på filen (*filnavn*), type (*mimetype*) og størrelse på filen i bytes (*storrelse*), der metadata-blokken er av typen "application/json". Alle felter må oppgis.

Eksempel på metadata-blokk:
```
{
    "filnavn": "test",
    "mimetype": "application/pdf",
    "storrelse" : 1024
}   
```

***Returtype***
\
Ved en vellykket opplasting får man tilbake en liste av dokumentmetadata som inneholder filnavn, unik referanse (UUID) til Fiks-Dokumentlager, og størrelse på filen.

Eksempel:
```
200 OK
{
    [
        {
            "filnavn": "test",
            "dokumentlagerDokumentId": "ab35e9088-bcfa-4096-ba68-f07777ed167c",
            "storrelse" : 1024
        }
    ]
}
```

Ved feil ved opplasting får man 400 Bad Request når multipart-requesten ikke er definert med riktige data.

## Innsending av Søknad (for NAV)

**Under stor endring**

Soknad api [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/digisos-api-v1.json)

---
title: Digisos
date: 2019-08-26
---

**STATUS: under utvikling**

Fiks Digisos er en tjeneste for å tilrettelegge for kommunal behandling av sosialsøknader via et brukergrensesnitt på nav.no.

Fiks Digisos tilbyr:

* Enkelt oppsett for den enkelte kommune gjennom Fiks Konfigurasjon
* Innbygger får fortløpende oppdatering på saksgang, tilgjengelig både gjennom Fiks Innsyn og på nav.no.
* Innbygger får tilgang til alle dokumenter og mulighet til å sende inn nye søknader basert på data fra tidligere søknader.
* Ansatte/brukerstøtte i nav kan se utvalgte deler av saken via nav sine systemer.

## Sikkerhet
Systemet er lagt opp slik at NAV ikke trenger å lagre data, disse fjernes fra Navs systemer når søknaden sendes til Fiks. All tilstand lagres dermed på Fiks plattformen og hos kommunen. Innsending av søknad kan utelukkende gjøres med brukerens ID-Porten autentisering.

Kommunikasjonen mellom aktørene (Nav, Fiks, fagsystem) foregår med SSL kryptering, i tillegg er alle dokumenter kryptert med mottakers nøkkel. Nav krypterer med Fiks sin nøkkel, Fiks krypterer med fagsystemets, og fagsystemet vil igjen bruke fiks-nøkkelen.

Dokument og melding i Fiks Innsyn er utelukkende tilgjengelig for innbygger, dette gjelder også bruker-delen av den generelle metadataen som er lagret i Fiks Digisos. Et begrenset utvalg av metadata er også tilgjengelig for NAV ansatte. Uthenting av disse krever autentisering med NAVs virksomhetssertifikat og integrasjonslogin, og alle slike spørringer logges i Fiks Audit. Ansvaret for den videre autorisering av den enkelte NAV-ansatte ligger hos NAV.

## Flyt

1. Innbygger fyller ut søknad om sosialstønad på nav.no, som sender denne til Fiks Digisos gjennom et synkront http api.
2. Fiks Digisos mottar søknaden.
    1. Søknadsfilen legges i Fiks Dokumentlager, og innbyggeren autoriseres for tilgang.
    2. Fiks Digisos henter valgt leveransekanal for søknaden fra kommunens konfigrasjon, enten anbefalt kanal 2a) Fiks IO med SvarUt som alternativ eller 2b) Bare SvarUt.
        - a. Fiks IO - Det gjøres oppslag i Fiks IO Kontokatalog for å se om det finnes en mottaker som støtter mottak av digisos-meldinger til kommunen. Dersom det støttes, gjøres et kall mot Fiks IO, hvor filen blir validert og sendt til mottakeren. Dersom digisos-meldinger ikke støttes vil søknaden bli sendt til SvarUt.
        - b. SvarUt - Søknaden sendes til SvarUt enten fordi den er valgt som eneste leveransekanal, eller fordi kommunen ikke kan motta digisos-meldinger gjennom Fiks IO (se punkt 6).
    3. Hvis punktene over blir gjennomført ok opprettes en digisos-melding i Fiks Innsyn. Denne autoriseres for innbyggeren.
    4. Fiks returnerer 202 ACCEPTED på http-kallet fra NAV. Dette markerer ansvarsoverføring fra NAV til Fiks, som fra nå garanterer at saken leveres til kommune for behandling.
3. Kommunen mottar meldingen gjennom Fiks IO. Den vil være tilgjengelig i køen i en fastsatt periode. Om kommunen ikke bekrefter mottak før denne perioden går ut vil meldingen bli trukket og alternativ kanal benyttes (se punkt 6).
4. Søknanded opprettes i kommunalt fagsystem.
5. Det kommunale fagsystemet bekrefter mottak av søknaden og oppdaterer status i Fiks Digisos.
    1. Evt. nye filer legges i Fiks Dokumentlager, autorisert for innbygger.
    2. Digisos saken i Fiks Innsyn oppdateres
    3. Saken er tilgengelig for nav.no og nav ansatte/brukerstøtte.
6. Om fagsystemet avviser eller unnlater å bekrefte mottak av saken via Fiks IO vil SvarUt benyttes som alternativ kanal, der det inkluderes en fil som inneholder både NAV og Fiks Digisos sin id for saken. I praksis betyr dette at meldingen blir sendt til kommunens Altinn-konto, evt. sendt til print og postlagt.     

![fiks_digisos](/images/fiks_digisos.png "Fiks Digisos")


## Integrasjonsutvikling Fagsystem

For generell integrasjonsutvikling mot Fiks, se [Integrasjonsutvikling]({{< ref "integrasjoner.md" >}}). Fagsystemet må da bruke Integrasjon som autentiseringsmetode.

For at fagsystemet skal få tilgang til Digisos-api-et for en kommune, må kommunen først konfigurere og aktivere Digisos gjennom Fiks Konfigurasjon der man også gir fagsystemet sin integrasjon tilgang til Digisos.

### Fiks IO meldingsprotokoll

Ved bruk av Fiks IO som leveringskanal må fagsystemet støtte meldingsprotokollen ```no.nav.digisos.fagsystem.v1```, som er definert for bruk av Digisos-meldinger, som inneholder kontrakter i form av json-schema som gjelder både for mottak og svar på Fiks IO meldinger. Fagsystemet må derfor støtte meldingstypene for denne protokollen, for mottak og sending av meldinger for både søknader og ettersendelser:

#### Til fagsystem - mottak av søknad og ettersendelse
For ny søknad, ```no.nav.digisos.soknad.v1```, som definert i [json-skjema for søknad](https://github.com/ks-no/fiks-io-meldingstype-katalog/tree/test/schema/no.nav.digisos.soknad.v1).\
For ettersendelse, ```no.nav.digisos.ettersendelse.v1```, som definert i [json-skjema for ettersendelse](https://github.com/ks-no/fiks-io-meldingstype-katalog/tree/test/schema/no.nav.digisos.ettersendelse.v1).

#### Fra fagsystem - kvittering på mottatt søknad og ettersendelse
For ny søknad, ```no.nav.digisos.soknad.mottatt.v1```, med tom body.\
For ettersendelse, ```no.nav.digisos.ettersendelse.mottatt.v1```, med tom body.

### Sak oppdatering fra Fagsystem

Sak oppdaterings api [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/digisos-sak-api-v1.json)

Bruker filformatet for digisos-soker.json, som definert her: [soknadsosialhjelp-filformat
](https://navikt.github.io/soknadsosialhjelp-filformat/#/data%20fra%20fagsystem/getdigisos_soker_json).

**Referering til filer**

Filer må lastes opp på forhånd, da digisos-soker.json inneholder referanse-id til dokumentene som kan linkes til søkeren, som gjelder både for filer som lastes opp til Fiks Dokumentlager via Digios-api (som beskrevet under) eller som er [sendt via SvarUt](https://ks-no.github.io/svarut/integrasjon/forsendelsesservicev10/).

Det anbefales å laste opp alle filene via Digisos-api (som beskrevet under, "Opplasitng av filer"), da vil følgende gjelde:

- Når en sakoppdatering skjer, vil Fiks Digisos validere at refererte filer faktisk er tilgjenglige på saken (DigisosId).
- Når man sletter en fil via Fiks Digisos vil man bare kunne slette filer som ikke er referert til på saken (DigisosId).
- Man kan hente en liste av alle tilgjengelige filer for en gitt sak (DigisosId).

Ved å referere til et SvarUt dokument, består denne filreferansen av SvarUt sin forsendelsesId og nummeret for dokumentet i denne forsendelsen, der indekseringen begynner fra 1. Ved referanse til SvarUt filer har ikke Fiks Digisos-api noe relasjon eller tilgang til disse filene, slik at fagsystemet selv er ansvarlig for at alle referte filer til en hver tid er tilgjengelige for søkeren når filreferansene linkes til på nav.no.

Generelle vilkår for sakoppdatering:

- Når en sakoppdatering skjer, må derfor alle filer være tilgjenglige på saken.
- Filer som ikke lenger skal ligge på sak, kan fjernes etter at sakoppdatering uten filene er lastet opp.
- Fagsystemet må ha kontroll på listen med filer og sjekke at denne er korrekt.
- Når en sakoppdatering skjer, må saken eksistere i Fiks Digisos, enten fordi skjema fra NAV er sendt via Digisos eller at fagsystem har opprettet en sak.
- Hver sakoppdatering inneholder en komplett historikk av alle tidligere hendelser, og vil alltid overskrive tidligere sakoppdatering lagret i Fiks Digisos.

**Opplasting av filer**

Før en sakoppdatering, må alle refererte filer være lastet opp på forhånd.

Filer lastes opp til Fiks Digisos ved bruk av en multipart streaming request, der man spesifiserer HTTP-headeren "Transfer-Encoding" til å sende data i chunks, ```Transfer-Encoding: chunked```.

Alle filene må krypteres før opplasting, med public-key fra Fiks som kan hentes fra endepunktet ```/digisos/api/v1/dokumentlager-public-key```.
Fiks tilbyr en referanseimplementasjon av hvordan en slik request skal defineres, som krypterer alle filene og som kan brukes for filopplasting: https://github.com/ks-no/fiks-digisos-klient.

URL-stien til filopplasting er ```/digisos/api/v1/{fiksOrgId}/{digisosId}/filer```, der ```{fiksOrgId}``` og ```{digososId}``` er FiksOrgId-en og FiksDigisosId-en som filene skal legges til.

Endepunktet tar inn en liste, der man for hver fil som skal lastes opp legger til en metadata-blokk som inneholder informasjon om filen og en base64-encodet blokk som inneholder selve filen (InputStream). Multipart-requesten til Digisos API-et må da for hver fil inneholde to data-fields, der den første inneholder metadataen og den andre inneholder filen.
Metadata består av filnavn på filen (*filnavn*), type (*mimetype*) og størrelse på filen i bytes (*storrelse*), der metadata-blokken er av typen "application/json". Alle felter må oppgis.

Eksempel på metadata-blokk:
```
{
    "filnavn": "test.pdf",
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
            "filnavn": "test.pdf",
            "dokumentlagerDokumentId": "ab35e9088-bcfa-4096-ba68-f07777ed167c",
            "storrelse" : 1024
        }
    ]
}
```

Ved feil ved opplasting får man 400 Bad Request når multipart-requesten ikke er definert med riktige data.

## Integrasjonsutvikling (for NAV)

For generell integrasjonsutvikling mot Fiks, se [Integrasjonsutvikling]({{< ref "integrasjoner.md" >}})

### Innsending av søknad

Soknad api [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/digisos-api-v1.json)

For innsending av søknad/ettersendelse brukes person-integrasjon autentisering med OIDC, se [Integrasjonsutvikling]({{< ref "integrasjoner.md" >}}) for mer detaljer.

**Innsending av ny søknad**

Innsending av ny søknad til Fiks Digisos bruker multipart streaming request, på lik linje som opplasting av filer for fagsystemene, der man spesifiserer HTTP-headeren "Transfer-Encoding" til å sende data i chunks, ```Transfer-Encoding: chunked```.

URL-stien til ny søknad er ```/digisos/api/v1/soknader/{kommunenummer}/{navEkseternRefId}```, der ```{kommunenummer}``` er kommunenummer søknaden skal sendes til og ```{navEkseternRefId}``` er en unik id fra NAV for søknaden.

Endepunktet tar inn påkrevde felter for innsending av en ny søknad, som består av metadataene soknad.json (json-encodet String) og vedlegg.json (json-encodet String), samt filen soknad.pdf (metadata + base64-encodet blokk) pluss eventuelle vedlegg (metadata + base64-encodet blokk). Disse dataene må da være definert i denne rekkefølgen i multipart requesten.

For hver fil som skal lastes opp (soknad.pdf og hvert vedlegg) legger man til en metadata-blokk som inneholder informasjon om filen og en base64-encodet blokk som inneholder selve filen. Base64-blokkene må også være kryptert med public key til Fiks Dokumentlager, som blir eksponert via endepunktet ```/digisos/api/v1/dokumentlager-public-key```, på lik linje med kryptering av filer for for fagsystemene, som definert i Fiks Digisos klienten. 
\
Metadata består av filnavn på filen (*filnavn*), type (*mimetype*) og størrelse på filen i bytes (*storrelse*), der metadata-blokken er av typen "application/json". Alle felter må oppgis.

Eksempel på metadata-blokk, som må defineres for hver fil:
```
{
    "filnavn": "soknad.pdf",
    "mimetype": "application/pdf",
    "storrelse" : 1024
}   
```
Innholdet i en request vil da kunne bestå av:
```
soknadJson, vedleggJson, metadata + soknad.pdf, metadata + vedlegg1.pdf, metadata + vedlegg2.pdf
```

***Returtype***
\
Ved en vellykket innsending får man tilbake ```202 ACCEPTED``` og en unik Fiks DigisosId (UUID) som er ID-en til opprettet søknad i Fiks Digisos.

Ved feil ved opplasting får man 400 Bad Request når multipart-requesten ikke er definert med riktige data.

**Innsending av ny ettersendelse**

Innsending av ny ettersendelse til Fiks Digisos bruker også multipart streaming request.

URL-stien til ny ettersendelse er ```/digisos/api/v1/soknader/{kommunenummer}/{soknadId}/{navEkseternRefId}```, der ```{kommunenummer}``` er kommunenummer søknaden tilhører, ```{soknadId}``` er Fiks DigisosId-en for søknaden det skal ettersendes til og ```{navEkseternRefId}``` er en unik id fra NAV for denne ettersendelsen.

Endepunktet tar inn påkrevde felter for innsending av en ny ettersendelse, som består av metadataen vedlegg.json (String), samt en liste med vedlegg (metadata + base64-encodet blokk). Base64-blokkene for filene må krypteres på lik linje som for ny søknad.

For hvert vedlegg som skal lastes opp legger man til en metadata-blokk som inneholder informasjon om filen (samme som innsending av ny søknad) og en base64-encodet blokk som inneholder selve filen.

***Returtype***
\
Det er ingen returtype på dette endepunktet.

Ved feil ved opplasting får man 400 Bad Request når multipart-requesten ikke er definert med riktige data.

### Henting av filer
Soknad api [(api-spec)](https://editor.swagger.io/?url=https://ks-no.github.io/api/digisos-api-v1.json)

Ved henting av søknad vil det for hver fil returneres en UUID til Fiks Dokumentlager eller en forsendelsesid og filnummer for SvarUt, der filen kan lastes ned. Filene soknad.json, vedlegg.json og digisos-soker.json vil være tilgjengelige for NAV gjennom endepunktet ```/digisos/api/v1/nav/soknader/{digisosId}/dokumenter/{dokumentlagerId}``` fra Digisos API-et, der dokumentet blir returnert som en inputstream fra HttpServletResponse. Alle andre filreferanser vil bli eksponert for søkeren, som søkeren selv må laste ned fra Fiks Dokumentlager, ```https://minside.kommune.no/dokumentlager/nedlasting/niva4/{id}```, eller fra SvarUt, ```https://svarut.ks.no/forsendelse/{forsendelseId}/{filnummer}```. 

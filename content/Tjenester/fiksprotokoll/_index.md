---
title: Fiks protokoll 
date: 2022-07-05
aliases: [/fiks-platform/tjenester/fiksprotokoll, /fiks-plattform/tjenester/fiksprotokoll, /fiks-plattform/tjenester/fiksprotokoll/, /tjenester/fiksprotokoll/fiksio/fiksprotokoll]
---

## Kort beskrivelse

Fiks Protokoll er en tjenestegruppe som gjør det mulig å sende asynkrone, ende-til-ende krypterte meldinger fra maskin til maskin. 
[Fiks IO](https://ks-no.github.io/tjenester/fiksprotokoll/fiksio) er tjenesten som sørger for den asynkrone maskin-til-maskin meldingsutvekslingen. 

Fiks Protokoll støtter meldinger definert under et sett med protokoller. Protokollene er versjonert og nye protokoller er under utvikling.

Fiks Protokoll validerer at det kun er gyldige meldingstyper som sendes for de ulike protokollene.
Den kan også validere at det kun kan sendes meldinger mellom avsender- og mottakersystem som er forhåndsgodkjent av systemadministratorene.



## Status og plan for protokoller

| Protokoll                                                     | Status                                                                      | Estimert ferdig    |
|---------------------------------------------------------------|-----------------------------------------------------------------------------|--------------------|
| Fiks arkiv                                                    | Under implementering hos leverandører. Protokoll ferdigstilt.               | Ferdig             |
| Fiks politisk behandling                                      | Protokoll har vært under utvikling og er satt på pause.                     | Pause              |
| Fiks plan                                                     | Under implementering hos leverandører. Pilotversjon av protokollen lansert. | 4 kvartal 2024 (*) |
| Fiks matrikkelføring                                          | I pilot-testing og i produksjon. Protokoll ferdigstilt.                     | Ferdig             |
| Barnevern - fagsysteminnrapportering til Barnevernsregisteret | Brukes i produksjon                                                         | Ferdig             |
| Fiks Link - erstatning for GI Link                            | Test-versjon releaset. Protokoll klar for testing.                          | 4 kvartal 2024     |
| Fiks Saksfaser                                                | Test-versjon releaset. Protokoll klar for testing.                          | Ikke avklart (**)  |

(*) Fiks Plan er lansert med ulik pilot status fordelt på tjenestene pga eksterne avhengigheter. Les mer i [wiki](https://github.com/ks-no/fiks-plan-specification/wiki) for Fiks Plan.

(**) Fiks Saksfaser er lansert med en test-versjon, men det er ikke klart når den er estimert ferdig

Protokoller i pilot kan oppleve å få endringer som må utbedres fortløpende. Dette vil være små endringer som kommer etter erfaringer en har gjort i produksjonskjøring. Disse er stabile nok til å ta i bruk i vanlig drift.

Det er også variasjon i adopsjonsgrad av protokollene, spesielt for Fiks arkiv. Det vil si at noen fagsystemer kommer kanskje bare til å arkivere og dermed bruke en liten del av hele protokollen. 
Det pågår arbeid med kartlegging av adopsjonsgrad og implementeringsprogresjon for protokollene. Estimering kan påvirkes av resultatet av dette da deler av en protokoll kan vise seg å ikke være implementert av noen enda eller tilstrekkelig testet.

## Tilgjengelige grensesnitt
| Grensesnitt       | Støtte      |
|-------------------|-------------|
| Web portal        | Nei         |
| Maskin til maskin | [API](#api) |

### Hvordan komme i gang med Fiks protokoll

Det er noen steg som må gjøres før det er mulig å bruke Fiks Protokoll. Tjenesten må tas i bruk, det må opprettes minst et system, og systemet må ha minst en konto og den kontoen må få tilgang til et system som har en konto den kan sende meldinger til.

Noe av dette må gjøres gjennom grensesnittet i Fiks Konfigurasjon ([forvaltning.fiks.ks.no](https://forvaltning.fiks.ks.no) i produksjon og [forvaltning.fiks.test.ks.no](https://forvaltning.fiks.test.ks.no) i testmiljøet), mens noe kan gjøres via API. I denne brukerveiledningen viser vi steg for steg hvordan dette gjøres gjennom webgrensesnittet.

Vi har også laget en huskeliste for hva man må ha klart og hvilke personer med gitt rettighet i Fiks forvaltning som må være med på å sette dette opp.

* [Huskeliste før man starter på oppsett]({{< ref "veiledning_1_huskeliste_for_opprette_protokoll.md" >}})
* [Ta i bruk Fiks Protokoll]({{< ref "veiledning_2_ta_ibruk_protokoll.md" >}})
* [Opprette system]({{< ref "veiledning_3_opprette_system.md" >}})
* [Opprette konto]({{< ref "veiledning_4_opprette_konto.md" >}})
* [Gi tilgang til system]({{< ref "veiledning_5_gi_tilgang_til_system.md" >}})

I tillegg er det to veiledninger for hvordan du kan generere nytt passord til systemet, og hvordan du laster opp ny offentlig nøkkel til en konto.
* [Generer nytt passord]({{< ref "veiledning_6_nytt_passord.md" >}})
* [Ny offentlig nøkkel]({{< ref "veiledning_7_laste_opp_ny_offentlig_nokkel.md" >}})

#### API
Man kan opprette, vedlikeholde og få informasjon om kontoer via API etter et system er opprettet. 
Når man har opprettet et system får man en integrasjon som gir tilgang til API'ene. 
Les mer om hvordan man setter opp en integrasjon via API her under [Felles -> Integrasjoner](https://developers.fiks.ks.no/felles/integrasjoner/).
Det er spesielt 2 API man kan bruke til dette, ett for Fiks Protokoll og ett for Fiks IO Katalog.

Via [Fiks Protokoll API (OpenAPI Specification)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json) kan man blant annet:
- Opprette konto på system
- Vedlikeholde tilganger om å sende meldinger mellom systemer
- Hente informasjon om protokoll og parter for konto
- Oppdatere konto med nøkler, parter osv.

Fiks IO Katalog API er en oppslagstjeneste som brukes for å hente offentlig nøkkel og hente informasjon om en konto.

Via [Fiks IO Katalog API (OpenAPI Specification)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/fiksio-katalog-api-v1.json) kan man blant annet: 
- Hente offentlig nøkkel for konto
- Søke etter konto via lookup 
- Hente konto informasjon, som f.eks. status med antall konsumenter på køen


### Protokoller under Fiks protokoll
* [Fiks Arkiv]({{< ref "protokoll-arkiv.md" >}})
* [Fiks Plan]({{< ref "protokoll-plan.md" >}})
* [Fiks Matrikkelføring]({{< ref "protokoll-matrikkelfoering.md" >}})
* [Barnevern - fagsysteminnrapportering til Barnevernsregisteret (SSB)]({{< ref "protokoll-ssbbarnevern.md" >}})
* [Fiks arkivlett byggesak]({{< ref "protokoll-arkivlett.md" >}})
* [Fiks Link](({{< ref "protokoll-link.md" >}})
* [Fiks Saksfaser]({{< ref "protokoll-saksfaser.md" >}})

### Tjenester under Fiks protokoll
* [Fiks IO]({{< ref "fiksio.md" >}})


### Termer
* Protokollsystem - Representerer et system som skal sende og motta meldinger over Fiks Protokoll. Dette vil være et arkiv, et fagsystem som skal arkivere, en matrikkelklient etc. Merk: Et system kan bruke flere protokoller, f.eks. både Fiks Arkiv og Fiks Plan.
* Protokollkonto - Et protokollsystem kan ha flere protokollkontoer. En protokollkonto er en Fiks IO-konto som er en part i en protokoll. F.eks: 
  * En konto i et arkiv, som støtter arkivering og søk
  * En konto i et fagsystem som skal søke i et arkiv
  * En konto i eByggesak som skal matrikkelføre
* Protokoll - Definisjon av en spesifikk protokoll, med meldingstyper og parter. F.eks. no.ks.fiks.arkiv.v1 og no.ks.fiks.plan.v1 
* Meldingstype - Meldinger som sendes må ha en meldingstype. Gyldige meldingstyper defineres av protokollen, og vil typisk måtte følge meldingsskjema definert i enten xsd eller json skjema. 
* Protokollpart - Meldinger i Fiks Protokoll sendes mellom parter av protokollen. F.eks. fagsystem og arkiv, eller eByggesak og matrikkelklient. Noen protokollen vil definere mer spesifike parter, som no.ks.fiks.arkiv.v1.arkiv.arkivering og no.ks.fiks.arkiv.v1.fagsystem.arkivering som henholdsvis kan ta imot og sende arkiveringsmeldinger, men ikke tillater søk.
* Integrasjon - På Fiks Plattformen brukes integrasjoner for maskinpålogging sammen med maskinporten. Hvert system får opprettet en integrasjon som brukes for alle kontoer under systemet. Integrasjonen vil kunne sende og motta meldinger, og dersom valgt, vil også kunne konfigurere systemet og opprette nye kontoer. [Les mer her](https://ks-no.github.io/felles/integrasjoner/)
* Fiks IO - Dette er kanalen som brukes for å sende meldinger i Fiks Protokoll.  [Les mer her](https://ks-no.github.io/tjenester/fiksprotokoll/fiksio)
* Fiks IO-konto - Meldinger sendes og mottas over Fiks IO med en Fiks IO-konto. Fiks IO-kontoen har samme ID som protokollkontoen. Protokollkontoen er wrapper rundt Fiks IO-kontoen for å muliggjøre tilgangsstyring i Fiks Protokoll, og validering av meldinger. En Fiks IO konto er også en kø som holder på meldingene den mottar.


### Hvordan tar man i bruk Fiks Protokoll?
Først må Fiks Protokoll-tjenesten tas i bruk for kommunen og avtale må underskrives. Dette må gjøres av administrator i Fiks Organisasjonen (typisk kommunen).

Deretter må det opprettes et system i Fiks Protokoll. Dette må gjøres i grensesnittet i Fiks Forvaltning av en administrator på Fiks Protokoll (dvs. en administrator i Fiks Organisasjonen, eller personer som er blitt gitt administratortilgang på Fiks Protokoll).

![fiks protokoll](/Tjenester/images/forvaltning-protokoll-system-create.png "Opprett system")

Merk at det sammen med systemet opprettes en tilhørende integrasjon som skal brukes til å sende og motta meldinger over [Fiks IO](https://ks-no.github.io/tjenester/fiksprotokoll/fiksio)

Et system kan settes opp til å konfigureres av integrasjon. Da vil den tilhørende integrasjonen få tilgang til å administrere systemet og vil kunne gjøre det samme som en administrator kan gjøre på Fiks Forvaltning (med visse unntak som sletting av system og resetting av passord)

APIet for konfigurering med integrasjon er definert her: [Fiks Protokoll API](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json)

### Fiks Protokoll Konto
Konto opprettes i forvaltning eller via API.
Når konto opprettes må en ha tilgjengelig offentlig nøkkel i PEM format. Denne benyttes for kryptering av meldinger som skal mottas.
Forvalting:
![fiks protokoll](/Tjenester/images/forvaltning-protokoll-system-konto-create.png "Opprett system")

API:
`POST /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}/kontoer`

[OpenAPI Specification (Fiks Protokoll API)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json)

### Tilganger

#### Gi tilgang til system
Tilganger tildeles Protokoll system fra konto. Konto kan gi annet system tilgang til å sende meldinger til konto en oppretter tilgang fra. 

Når system opprettes vil systemet kun være synlig for kontoer under egen organisasjon. Dersom systemet skal være synlig for kontoer utenfor egen organisasjon, må _Tilgjengelig for andre organisasjoner_ slås på. (Per nå kun mulig via API)

Forvaltning:
Velg konto under system. Velg _Søk etter systemer_. Når ønsket system er funnet, velg _Gi tilgang_.

API:
`POST /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}/kontoer/{kontoId}/tilganger/{eksternSystemId}`
- fiksOrgId: Fiks organisasjon Id
- systemId: System ID som er eier av konto _kontoId_
- kontoId: Konto som system _eksternSystemId_ skal få tilgang til
- eksternSystemId: System Id som skal gis tilgang til konto med id _kontoId_

Tilsvarende for å fjerne tilgang
`DELETE /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}/kontoer/{kontoId}/tilganger/{eksternSystemId}`

[OpenAPI Specification (Fiks Protokoll API)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json)


#### Be om tilgang til system
En kan legge inn forespørsel om tilgang til konto, for system. Ved hjelp av API. Dette er ikke ferdig implementert i forvaltning.

`POST {fiksOrgId}/systemer/{systemId}/forespurteTilganger/{eksternKonto}`
- fiksOrgId: Fiks organisasjon Id
- systemId: System ID som forespør tilgang
- eksternKonto: Konto en ønsker tilgang til

Tilsvarende for å fjerne forespørsel

`DELETE {fiksOrgId}/systemer/{systemId}/forespurteTilganger/{eksternKonto}`

[OpenAPI Specification (Fiks Protokoll API)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json)


Merk: Søk etter systemer er ikke implementert ennå, så det kan være vanskelig å finne systemer å be om tilgang til

#### Kontoer et system kan sende meldinger til
API'et støtter å hente hvilke kontoer et system kan sende meldinger til.
Kun kontoer som er parter fra samme protokoll (samme navn og versjon) og som er støttet part (er i listen av stottedeParter hos motaker) som kan sende meldinger til hverandre. Dersom et system ikke ha en konto som er støttet part, så må en slik konto opprettes før meldinger kan sendes. 

API: `GET /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}`

I responsen vil `tilgangTilKontoer` ha en liste over kontoer (`EksternProtokollKontoResponseEksternProtokollKontoResponse`) systemet kan sende meldinger til.

[OpenAPI Specification (FIks Protokoll API)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json)


### Sende og motta meldinger fra protokoll konto 
Fiks protokoll bruker som tidligere nevnt Fiks IO til meldingsutveksling.
Les mer om detaljene rundt meldingsutveksling på dokumentasjonssidene til [Fiks IO](https://ks-no.github.io/tjenester/fiksprotokoll/fiksio)

### Overvåking
Det anbefales at man overvåker at man har en fungerende mottakende komponent som henter meldinger fra køen. 
Siden meldinger har en time-to-live kan man risikere at disse til slutt går ut på tid og man ikke får hentet dem.
Det er selvfølgelig også i ens egen interesse å svare på meldinger så fort som mulig. 

Hvordan man overvåker at man kan sende og motta meldinger er opp til en selv men vi anbefaler at man i det minste overvåker koblingsstatus til Fiks-IO for henting av meldinger. 
Klienten for .NET har både en **IsOpen()** metode som viser om klienten selv ser at den har en aktiv kobling, og mulighet for å spørre Fiks IO API om status for en gitt konto via **Status()** eller **Lookup()** metodene.
Status vil da gi informasjon som f.eks. **antall konsumenter** for kontoen.

#### Get status for konto:

API: `GET /fiks-io/katalog/api/v1/kontoer/{kontoId}/status`

[OpenAPI Specification (Fiks IO katalog API)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/fiksio-katalog-api-v1.json)


#### Status i fiks forvaltning
Inne på forvaltningssidene til Fiks Protokoll kan man se noen statuser på sine systemer og protokoll kontoer. En protokoll konto er som tidligere nevnt en wrapper rundt Fiks-IO, som igjen har en kø for meldinger til den kontoen.
Enkel status for denne køen vises på forvaltningssidene.

På system-siden vil man få en advarsel hvis man har protokollkonto(er) som ikke har kobling. Dette betyr at man har 1 eller flere protokollkonter som ikke lytter og henter meldinger fra køen.

Hvis man går inn på listen over kontoer vil man også se status for hver kont: koblingsstatus som viser om det mangler noe som henter meldinger fra køen og antall meldinger som ligger på køen.
Dette vil man også se hvis man går inn på kontoen.

### Arkitektur

Her er en forenklet oversikt over Fiks Protokoll arkitekturen

![fiks protokoll arkitektur innsikt](/Tjenester/images/fiks-protokoll-arkitektur-innsikt.png "Fiks Protokoll arkitektur oversikt")



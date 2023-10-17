---
title: Fiks protokoll 
date: 2022-07-05
aliases: [/fiks-platform/tjenester/fiksprotokoll, /fiks-plattform/tjenester/fiksprotokoll, /fiks-plattform/tjenester/fiksprotokoll/, /tjenester/fiksprotokoll/fiksio/fiksprotokoll]
---

## Kort beskrivelse

Fiks protokoll er en tjenestegruppe som inneholder flere tjenester, hvor blant annet [Fiks IO](https://ks-no.github.io/tjenester/fiksprotokoll/fiksio) er tjenesten som sørger for den asynkrone maskin-til-maskin meldingsutvekslingen.
I tillegg til meldingsutveksling via Fiks IO sørger Fiks Protokoll for validering av meldingstyper innenfor protokollen (f.eks. Fiks Arkiv eller Fiks Plan), godkjenning av avsender-system og mottaker-system osv.  

## Status protokoller

| Protokoll                                                     | Status                                                             | Estimert ferdig |
|---------------------------------------------------------------|--------------------------------------------------------------------|-----------------|
| Fiks arkiv                                                    | Under implementering hos leverandører. I pilot                     | 4 kvartal 2023  |
| Fiks politisk behandling                                      | Protokoll under utvikling.                                         | 4 kvartal 2024  |
| Fiks plan                                                     | Under implementering hos leverandører. Pilot når de første er klar | 4 kvartal 2023  |
| Fiks matrikkelføring                                          | I produksjon                                                       | Ferdig          |
| Barnevern - fagsysteminnrapportering til Barnevernsregisteret | Pilot i produksjon                                                 | Ferdig          |

Protokoller i pilot kan oppleve å få endringer som må utbedres fortløpende. Dette vil være små endringer som kommer etter erfaringer en har gjort i produksjonskjøring. Disse er stabile nok til å ta i bruk i vanlig drift.

Det er også variasjon i adopsjonsgrad av protokollene, spesielt for Fiks arkiv. Det vil si at noen fagsystemer kommer kanskje bare til å arkivere og dermed bruke en liten del av hele protokollen. 
Det pågår arbeid med kartlegging av adopsjonsgrad og implementeringsprogresjon for protokollene. Estimering kan påvirkes av resultatet av dette da deler av en protokoll kan vise seg å ikke være implementert av noen enda eller tilstrekkelig testet.

## Tilgjengelige grensesnitt
| Grensesnitt       | Støtte                                                                                                           |
|-------------------|------------------------------------------------------------------------------------------------------------------|
| Web portal        | Nei                                                                                                              |
| Maskin til maskin | [API](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json) |

### Hvordan komme i gang med Fiks protokoll

Det er noen steg som må gjøres før det er mulig å bruke Fiks Protokoll. Tjenesten må tas i bruk, det må opprettes minst et system, og systemet må ha minst en konto og den kontoen må få tilgang til et system som har en konto den kan sende meldinger til.

Noe av dette må gjøres gjennom grensesnittet i Fiks Konfigurasjon ([forvaltning.fiks.ks.no](https://forvaltning.fiks.ks.no) i produksjon og [forvaltning.fiks.test.ks.no](https://forvaltning.fiks.test.ks.no) i testmiljøet), mens noe kan gjøres via API. I denne brukerveiledningen viser vi steg for steg hvordan dette gjøres gjennom webgrensesnittet.

Vi har også laget en huskeliste for hva man må ha klart og hvilke personer med gitt rettighet i Fiks forvaltning som må være med på å sette dette opp.

* [Huskeliste før man starter på oppsett]({{< ref "huskeliste_for_opprette_protokoll.md" >}})
* [Ta i bruk Fiks Protokoll]({{< ref "ta_ibruk_protokoll.md" >}})
* [Opprette system]({{< ref "opprette_system.md" >}})
* [Opprette konto]({{< ref "opprette_konto.md" >}})
* [Gi tilgang til system]({{< ref "gi_tilgang_til_system.md" >}})

I tillegg er det to veiledninger for hvordan du kan generere nytt passord til systemet, og hvordan du laster opp ny offentlig nøkkel til en konto.
* [Generer nytt passord]({{< ref "nytt_passord.md" >}})
* [Ny offentlig nøkkel]({{< ref "laste_opp_ny_offentlig_nokkel.md" >}})

### Tjenester under Fiks protokoll 
{{% children style="h5" depth="1" /%}}

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
Payload:
```json
{
  "navn": "Arkivsystem",
  "beskrivelse": "Arkivsystem beskrivelse",
  "stottetProtokollNavn": "	no.ks.fiks.arkiv",
  "stottetProtokollVersjon": "v1",
  "part": "arkiv.levenrandor",
  "offentligNokkel": "......"
}
```

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

#### Be om tilgang til system
En kan legge inn forespørsel om tilgang til konto, for system. Ved hjelp av API. Dette er ikke ferdig implementert i forvaltning.

`POST {fiksOrgId}/systemer/{systemId}/forespurteTilganger/{eksternKonto}`
- fiksOrgId: Fiks organisasjon Id
- systemId: System ID som forespør tilgang
- eksternKonto: Konto en ønsker tilgang til

Tilsvarende for å fjerne forespørsel

`DELETE {fiksOrgId}/systemer/{systemId}/forespurteTilganger/{eksternKonto}`



Merk: Søk etter systemer er ikke implementert ennå, så det kan være vanskelig å finne systemer å be om tilgang til

#### Kontoer et system kan sende meldinger til
Hvilke kontoer et system kan sende meldinger til finnes på system-responsen fra `GET /fiks-protokoll/api/v1/konfigurasjon/{fiksOrgId}/systemer/{systemId}`. Der vil `tilgangTilKontoer` ha en liste over kontoer (`EksternProtokollKontoResponseEksternProtokollKontoResponse`) systemet kan sende meldinger til.
Kun kontoer som er parter fra samme protokoll (samme navn og versjon) og som er støttet part (er i listen av stottedeParter hos motaker) som kan sende meldinger til hverandre. Dersom et system ikke ha en konto som er støttet part, så må en slik konto opprettes før meldinger kan sendes. 

Definisjon av `EksternProtokollKontoResponseEksternProtokollKontoResponse`:
```json
{
  "id": "ID på kontoen. Det er denne IDen Fiks IO skal sende til",
  "navn": "Navn på konto",
  "beskrivelse": "Beskrivelse av konto",
  "part": {
    // Definerer parten som kontoen implementerer
    "navn": "Navn på part (f.eks. arkiv.full)",
    "beskrivelse": "Beskrivelse av parten",
    "protokollnavn": "Navn på protokoll (f.eks. no.ks.fiks.arkiv)",
    "protokollversjon": "Protokollversjon (f.eks. v1)",
    "avsenderMeldingstyper": [
      // Liste av meldingstyper kontoen støtter å sende
    ],
    "mottakerMeldingstyper": [
      // Liste av meldingstyper kontoen støtter å motta
    ],
    "stottedeParter": [
      // Liste av parter som kan sende meldinger til kontoen.
    ]
  },
  "system": {
    // Beskrivelse av systemet som eier kontoen
  }
}
```


### Sende og motta meldinger fra protokoll konto 
Fiks protokoll bruker som tidligere nevnt Fiks IO til meldingsuveksling.
Les mer om detaljene rundt meldingsutveksling på dokumentasjonssidene til [Fiks IO](https://ks-no.github.io/tjenester/fiksprotokoll/fiksio)

### Overvåking
Det anbefales at man overvåker at man har en fungerende mottakende komponent som henter meldinger fra køen. 
Siden meldinger har en time-to-live kan man risikere at disse til slutt går ut på tid og man ikke får hentet dem.
Det er selvfølgelig også i ens egen interesse å svar på meldinger så fort som mulig. 

Hvordan man overvåker at man kan sende og motta meldinger er opp til en selv men vi anbefaler at man i det minste overvåker koblingsstatus til Fiks-IO for henting av meldinger. Klienten for .NET har f.eks. en IsOpen() metode som viser om det er en aktiv kobling.


#### Status i fiks forvaltning
Inne på forvaltningssidene til Fiks protokoll kan man se noen statuser på sine systemer og protokoll kontoer. En protokoll konto er som tidligere nevnt en wrapper rundt Fiks-IO, som igjen har en kø for meldinger til den kontoen.
Enkel status for denne køen vises på forvaltningssidene.

På system-siden vil man få en advarsel hvis man har protokollkonto(er) som ikke har kobling. Dette betyr at man har 1 eller flere protokollkonter som ikke lytter og henter meldinger fra køen.

Hvis man går inn på listen over kontoer vil man også se status for hver konto, koblingsstatus som viser om det mangler noe som henter meldinger fra køen og antall meldinger som ligger på køen.
Dette vil man også se hvis man går inn på kontoen.







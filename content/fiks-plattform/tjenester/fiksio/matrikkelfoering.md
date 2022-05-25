---
title: Fiks IO Matrikkelføring
date: 2021-08-18
---

Fiks Matrikkelføring er en asynkron protokoll over Fiks IO for å overføre grunnlag til matrikkelføring fra eByggesak til Matrikkelklienter. 
Den er tilsvarende løsningen som er etablert på Fiks SvarUt/SvarInn http://geointegrasjon.no/nytt-grensesnitt-ebyggesak-og-matrikkel/.
Denne løsningen benytter altså [Fiks IO](https://ks-no.github.io/fiks-platform/tjenester/fiksio/) for maskin til maskin integrasjon. 

## Løsningskonsept

![fiks_matrikkelfoering](/images/matrikkelfoering_skisse.png "Fiks IO Matrikkelføring")

## Hvordan ta i bruk Fiks Matrikkelføring
For at eByggesak eller annet fagsystem skal få tilgang til å sende grunnlag for matrikkelføring til matrikkelklienter, så må kommunen aktivere tjenesten Fiks IO i [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).

Aktuell matrikkelklient må aktiveres for å kunne svare med meldinger på meldingsprotokoll ```no.ks.fiks.matrikkelfoering.v2```

## Meldinger med Fiks IO for Fiks Matrikkelføring

Meldingsprotokoll som matrikkelklient må støtte er ```no.ks.fiks.matrikkelfoering.v2```

Hver melding i Fiks IO består av en zip fil ASIC-E som inneholder protokollmeldingen (f.eks. byggesak.xml eller status.xml) i xml format og eventuelt tilhørende vedlegg.
For protokollmeldingen `no.ks.fiks.matrikkelfoering.v2.grunnlag` skal det følge med en `index.json` fil som beskriver hva hver enkelt fil er i Fiks IO meldingen. Se avsnittet om "Overføring av filer" med tilhørende tabell lenger nede for forklaring på sammenhengen mellom filer og `index.json`.

Hver melding kan ikke overskride 5GB totalt, med protokollmelding og vedlegg.

Fiks-IO har støtte for headere på meldinger. For å markere en melding som unik skal man sette headeren `klientMeldingId` med en unik id. Denne id'en skal brukes igjen for alle meldinger som forsøkes på nytt. 
Dette er for at mottaker skal kunne se at dette er en melding som har vært forsøkt tidligere og kan håndtere meldingen korrekt. Se kode eksempel lenger nede for hvordan man setter `klientMeldingId`. 

### Meldinger

**Fra eByggesak/fagsystem:**

|    Type     |     Navn    |   Skjema    |   Filer    |
| ----------- | ----------- |----------- |----------- |
| Grunnlag til matrikkelføring    | `no.ks.fiks.matrikkelfoering.v2.grunnlag`       | [no.ks.fiks.matrikkelfoering.v2.grunnlag.xsd](https://github.com/ks-no/fiks-matrikkelfoering-specification/blob/main/Schema/V2/no.ks.fiks.matrikkelfoering.v2.grunnlag.xsd) | `byggesak.xml`, `index.json` + evt vedlegg |
| Forespørsel om status    | `no.ks.fiks.matrikkelfoering.v2.status`       | [no.ks.fiks.matrikkelfoering.v2.status.xsd](https://github.com/ks-no/fiks-matrikkelfoering-specification/blob/main/Schema/V2/no.ks.fiks.matrikkelfoering.v2.status.xsd) | `status.xml` |

**Fra matrikkelklienter:**

|    Type     |     Navn    |  Skjema    |  Filer    |
| ----------- | ----------- |----------- |----------- |
| Mottak vellykket | `no.ks.fiks.matrikkelfoering.v2.mottatt` | Ingen payload | Ingen fil |
| Mottak feilet - Ugyldig forespørsel | `no.ks.fiks.matrikkelfoering.v2.feilmelding.ugyldigforespoersel` | [no.ks.fiks.matrikkelfoering.v2.feilmelding.ugyldigforespoersel.xsd](https://github.com/ks-no/fiks-matrikkelfoering-specification/blob/main/Schema/V2/no.ks.fiks.matrikkelfoering.v2.feilmelding.ugyldigforespoersel.xsd) | `feilmelding.xml` |
| Mottak feilet - Serverfeil | `no.ks.fiks.matrikkelfoering.v2.feilmelding.serverfeil` | [no.ks.fiks.matrikkelfoering.v2.feilmelding.serverfeil.xsd](https://github.com/ks-no/fiks-matrikkelfoering-specification/blob/main/Schema/V2/no.ks.fiks.matrikkelfoering.v2.feilmelding.serverfeil.xsd) | `feilmelding.xml` |
| Kvittering på føring i matrikkelen | `no.ks.fiks.matrikkelfoering.v2.kvittering` | [no.ks.fiks.matrikkelfoering.v2.kvittering.xsd](https://github.com/ks-no/fiks-matrikkelfoering-specification/blob/main/Schema/V2/no.ks.fiks.matrikkelfoering.v2.kvittering.xsd) | `kvittering.xml` |
| Svar på forespørsel om status | `no.ks.fiks.matrikkelfoering.v2.statussvar` | [no.ks.fiks.matrikkelfoering.v2.statussvar.xsd](/https://github.com/ks-no/fiks-matrikkelfoering-specification/blob/main/Schema/V2/no.ks.fiks.matrikkelfoering.v2.statussvar.xsd) | `statussvar.xml` |

## Datamodell for meldinger
![fiks_matrikkelfoering_datamodell_grunnlag](/images/datamodell_grunnlag.png "Matrikkelføring datamodell grunnlag")

[`no.ks.fiks.matrikkelfoering.v2.grunnlag.xsd`](https://github.com/ks-no/fiks-matrikkelfoering-specification/blob/main/Schema/V2/no.ks.fiks.matrikkelfoering.v2.grunnlag.xsd)

![fiks_matrikkelfoering_datamodell_kvittering](/images/datamodell_kvittering.png "Matrikkelføring datamodell kvittering")

[`no.ks.fiks.matrikkelfoering.v2.kvittering.xsd`](https://github.com/ks-no/fiks-matrikkelfoering-specification/blob/main/Schema/V2/no.ks.fiks.matrikkelfoering.v2.kvittering.xsd)

## Flyt

![fiks_matrikkelfoering_prosess](/images/matrikkelfoering_flyt.png "Matrikkelføring prosess")

- eByggesak mottar en søknad med strukturerte data og vedlegg fra eByggesøknad system via Fellestjenester Bygg ved hjelp av Fiks/SvarInn. Samme datastrukturer og vedleggsstruktur kan bygges opp manuelt i eByggesak ved mottak av søknad i andre kanaler enn Fellestjenester Bygg.
- Saksbehandler behandler saken og kontrollerer at søknaden har tilstrekkelig informasjon til at det kan fattes et vedtak. Saksbehandler kompletterer og korrigerer søknadsdataene ved behov.
- Før vedtaket fattes, kontrollerer eByggesak at saken har tilstrekkelig data og tegninger til matrikkelføringen.
- Når vedtak er fattet i eByggesak, kontrollerer eByggesak om tiltaket skal matrikkelføres.
- Hvis tiltaket (tiltakene) skal matrikkelføres, bygger eByggesak opp en datastruktur for matrikkelføringen som består av data fra saksbehandlingen, matrikkelinformasjon og tegninger som ligger til grunn for vedtaket.
- eByggesak sender deretter denne datastrukturen og tegningene til Matrikkelklienten ved hjelp av Fiks IO.
- Matrikkelklienten mottar datastruktur og tegninger ved hjelp av Fiks IO.
- Matrikkelfører fører tiltaket i Matrikkel / FKB. Her skisseres det også muligheter for at Matrikkelklienten basert på et regelsett kan matrikkelføre enkelte tiltak automatisk.
- Når tiltaket er matrikkelført / ført i FKB, sender Matrikkelklienten en kvitteringsmelding tilbake til eByggesak via Fiks IO.
- eByggesak mottar kvitteringsmeldingen via Fiks IO og oppretter milepæl for matrikkelføring i saken

### Flyt for status meldinger
Fagsystem kan sende status forespørsel for en innsendt matrikkelføring med meldingstypen `no.ks.fiks.matrikkelfoering.v2.status`.
Matrikkelsystem svarer da med status med meldingstypen `no.ks.fiks.matrikkelfoering.v2.statussvar`.
For at dette skal fungere krever protokollen at det blir sendt unik klientMeldingId header (se eksempel lenger nede) på alle `no.ks.fiks.matrikkelfoering.v2.grunnlag` meldinger.

Eksempel på status:
```xml
<StatusMatrikkel xmlns=http://rep.geointegrasjon.no/Matrikkel/foeringstatus/v2>
    <klientMeldingId>02c5187a-5bd7-43a0-a99c-aa5e8bcc0cd3</klientMeldingId> 
    <svarMedKvittering>true</svarMedKvittering>
</StatusMatrikkel>
```

Her sender klient id på meldingen den forespør om status på, samt at det er et flagg svarMedKvittering (default=false) som kan brukes til å be matrikkelsystemet sende kvitteringsdokumentet på nytt, så sant meldingen allerede er kvittert.

Eksempel på svar hvor meldingen er ukjent for matrikkelsystemet:

```xml
<StatusMatrikkelSvar xmlns=http://rep.geointegrasjon.no/Matrikkel/foeringstatussvar/v2>
    <klientMeldingId>02c5187a-5bd7-43a0-a99c-aa5e8bcc0cd3</klientMeldingId>
    <statusBehandling>IkkeMottatt</statusBehandling>
</StatusMatrikkelSvar>
```

klientMeldingId er her ikke kjent og da svarer vi med status **IkkeMottatt**. Da kan man anta at meldingen ikke er sendt eller den er tapt, da må man sende grunnlag-melding for å starte prosessen. Mulige verdier for statusBehandling er **Mottatt**, **IkkeMottatt**, **Feil** og **Kvittert**. Feil vil bety at meldingen som ble sendt fra sakssystem ikke var gyldig, kvittert betyr at meldingen er ferdig behandlet ved at den er ført i matrikkel (eller ikke). **Mottatt** er mellomstadie som forteller at meldingen er under behandling, slik at man slipper å sende på nytt.

Eksempel på statussvar der meldingen er mottatt, men ennå ikke kvittert (en status den kan ligge i veldig lang tid uten at det nødvendigvis betyr at noe er feil):

```xml
<StatusMatrikkelSvar xmlns=http://rep.geointegrasjon.no/Matrikkel/foeringstatussvar/v2>
    <klientMeldingId>02c5187a-5bd7-43a0-a99c-aa5e8bcc0cd3</klientMeldingId>
    <statusBehandling>Mottatt</statusBehandling>
    <meldingId>02c5187a-5bd7-43a0-a99c-aa5e8bcc0cd4</meldingId>   
</StatusMatrikkelSvar>
```

Her får man også tilbake den faktiske meldingId-en som meldingen hadde fra fiksio.

Siste eksempel, der meldingen er kvittert:

```xml
<StatusMatrikkelSvar xmlns=http://rep.geointegrasjon.no/Matrikkel/foeringstatussvar/v2>
    <klientMeldingId>02c5187a-5bd7-43a0-a99c-aa5e8bcc0cd3</klientMeldingId>
    <statusBehandling>Mottatt</statusBehandling>
    <meldingId>02c5187a-5bd7-43a0-a99c-aa5e8bcc0cd4</meldingId>
    <statusKvittering>IkkeForespurt</statusKvittering>
</StatusMatrikkelSvar>
```


Her følger det med en **statusKvittering**. Den vil gjenspeile **svarMedKvittering**-elementet i forespørselen, og kan være **IkkeForespurt**, **Vedlagt** eller **Utloept**. De to første korresponderer til false/true på **svarMedKvittering**.
**Utloept** brukes der kvittering er sendt, og **svarMedKvittering** er true, men samtidig at dokumentet ikke lenger er lagret på matrikkelsystem-siden pga. f.eks. at det blir slettet etter en stund.


## Overføring av filer

Meldingen `no.ks.fiks.matrikkelfoering.v2.grunnlag` vil  inneholde en **byggesak.xml** fil som er matrikkelføringen, eventuelle vedlegg og en **index.json** fil som beskriver innholdet i hele meldingen.
Filen **index.json** har følgende struktur:

```json
[
  {
    "dokumenttype": "Byggesak", // Dokumenttype fra Arkivlett - Se tabell nedenfor
    "tittel": "Underlag for matrikkelføring", 
    "dokumentnummer": 1, // Dette tilsvarer index for denne filen i payloads for Fiks IO meldingen 
    "filnavn": "byggesak.xml" // Filnavn i Fiks IO meldingen
  },
  {
    "dokumenttype": "KART", // Dokumenttype fra Arkivlett - Se tabell nedenfor
    "tittel": "Situasjonsplan",
    "dokumentnummer": 2, // Dette tilsvarer index for denne filen i payloads for Fiks IO meldingen
    "filnavn": "DokSitplan.pdf" // Filnavn i Fiks IO meldingen
  },
]
```

Vedleggstyper fra Fellestjenester bygg(FtB) som brukes i overføringen ref https://dibk.atlassian.net/wiki/spaces/FB/pages/270139400/Vedlegg

Dokumenttyper ihht Arkivlett anbefales https://www.ks.no/fagomrader/digitalisering/felleslosninger/verktoykasse-plan--og-byggesak/enklere-tilgang-til-kommunale-byggesaksarkiv/


| Tittel        | Vedleggstype(FtB) | Dokumenttype fra Arkivlett  |
| ------------- |-------------------| ----------------------------|
| Situasjonsplan      | Situasjonsplan | KART |
| Tegning eksisterende plan | TegningEksisterendePlan | TEGNING |
| Tegning ny plan | TegningNyPlan | TEGNING |
|  Tegning eksisterende snitt | TegningEksisterendeSnitt | TEGNING |
|  Tegning nytt snitt | TegningNyttSnitt | TEGNING |
|  Tegning eksisterende fasade | TegningEksisterendeFasade | TEGNING |
|  Tegning eksisterende snitt | TegningEksisterendeSnitt | TEGNING |
|  Tegning ny fasade | TegningNyFasade | TEGNING |
|  ByggesaksBIM | ByggesaksBIM | TEGNING |
|  Tegning eksisterende snitt | TegningEksisterendeSnitt | TEGNING |
|  Tegning eksisterende snitt | TegningEksisterendeSnitt | TEGNING |
|  Matrikkelføring XML | Byggesak | Byggesak |

I tillegg til Arkivlett dokumenttyper benyttes dokumenttype Byggesak for overføring av datamodell beskrevet i dette dokumentet.

## Nivå på grunnlaget til matrikkelføring
Det er definert 4 trappetrinn/nivå i løsningskonseptet som illustrerer hvor godt et tiltak er tilrettelagt for effektiv
matrikkelføring.

![fiks_matrikkelfoering_trappetrinn](/images/matrikkelfoering_trappetrinn.png "Matrikkelføring trappetrinn")

Nivå 0:
- Overføringen inneholder kun saksnummer/url på vedtaket.
- Dette er tilsvarende løsning som «papirmappe på pulten» bortsett fra at all informasjon og
alle tegninger foreligger elektronisk.
- Matrikkelfører må navigere til saken og sette seg inn i saksbehandlingen og tegningene for å
kunne matrikkelføre.

Nivå 1:
- Overføringen inneholder i tillegg tegningene som ligger til grunn for vedtaket, men lite data
for øvrig.
- Matrikkelfører slipper å lete etter riktig grunnlag, men må sette seg inn i saken.

Nivå 2:
- Overføringen inneholder i tillegg komplett saksinformasjon og matrikkelopplysninger.
- Matrikkelfører har tilgjengelig all nødvendig informasjon for å kunne matrikkelføre og slipper
å gå inn i eByggesaken for å finne informasjon.
- Matrikkelklienten kan pre-utfylle matrikkelinformasjonen slik at Matrikkelfører slipper å fylle
inn dataene på nytt.
- Matrikkelklienten kan, basert på et regelsett, føre enkelte tiltak automatisk.

Nivå 3:
- Overføringen inneholder i tillegg en ByggesaksBIM.
- Matrikkelfører bedre arealinformasjon.
- Muliggjør automatisk uttrekk av tiltakets omriss for effektivisering av føringen i FKB.

Nivå 4:
- Overføringen inneholder i tillegg digital situasjonsplan.
- Gir Matrikkelfører informasjon om delelinjer / grensejusteringer ved Delesaker.

## Oppslag på kontoer som støtter meldingsprotokoll for matrikkelføring
For å finne hvilke konto en skal sende meldinger til så kan en slå opp dette i adresse katalogen til FIKS IO

```csharp
var kontoliste = client.Lookup(new LookupRequest("ORG_NO.987654321", "no.ks.fiks.matrikkelfoering.v2", 3));
```

```csharp
var kontoliste = client.Lookup(new LookupRequest("KOMM.3817", "no.ks.fiks.matrikkelfoering.v2", 3));
```
## Videresending av grunnlag som skal føres i en annen matrikkelklient

Hvis matrikkelfører finner ut at en melding skal registreres ved bruk av en annen matrikkelklient så kan denne meldingen videresendes. Det skal da brukes egne headere for å angi hvilken opprinnelig konto og hvilken opprinnelig meldingsid som skal besvares med mottatt melding, evt feilmelding og kvitteringsmelding. 

| Header        | Beskrivelse  |
| ------------- |-------------------|
| videresendt-fra-konto      | Opprinnelig konto som melding kom fra |
| opprinnelig-melding-id      | Opprinnelig meldingsid som svar-til skal sendes tilbake til |

## Eksempel 1 - viser eksempel på en nivå 1 melding

Kodeeksempel på sending av melding med grunnlag for matrikkelføring. 
Fiks-IO klienten støtter å sette egne headere og som tidligere nevnt skal `klientMeldingId` settes som parameter slik at den komme med i headeren.

```csharp
var messageRequest = new MeldingRequest(
            mottakerKontoId: receiverId,
            avsenderKontoId: senderId,
            klientMeldingId: klientMeldingId,
            meldingType: "no.ks.fiks.matrikkelfoering.v2.grunnlag"); 

List<IPayload> payloads = new List<IPayload>();
payloads.Add(new StringPayload(jsonPayload, "index.json"));
payloads.Add(new StringPayload(payload, "byggesak.xml"));
payloads.Add(new FilePayload("DokSitplan.pdf"));
payloads.Add(new FilePayload("DokTegning.pdf"));

var msgSent = client.Send(messageRequest, payloads).Result;
```


index.json innhold
```json
[
  {
    "dokumenttype": "Byggesak",
    "tittel": "Underlag for matrikkelføring",
    "dokumentnummer": 1,
    "filnavn": "byggesak.xml"
  },
  {
    "dokumenttype": "KART",
    "tittel": "Situasjonsplan",
    "dokumentnummer": 2,
    "filnavn": "DokSitplan.pdf"
  },
  {
    "dokumenttype": "TEGNING",
    "tittel": "Tegning ny fasade",
    "dokumentnummer": 3,
    "filnavn": "DokTegning.pdf"
  }
]
```

byggesak.xml innhold
```xml
<?xml version="1.0" encoding="utf-8"?>
<Byggesak xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://rep.geointegrasjon.no/Matrikkel/foering/v2">
  <tittel>Rammesøknad for enebolig i Byggestedgate 1</tittel>
  <saksnummer>
    <saksaar>2018</saksaar>
    <sakssekvensnummer>123456</sakssekvensnummer>
  </saksnummer>
  <kategori>
    <kode>RS</kode>
    <beskrivelse>Søknad om rammetillatelse</beskrivelse>
  </kategori>
  <tiltakstype>
    <tiltaktype>
      <kode>nyttbyggboligformal</kode>
      <beskrivelse>Nytt bygg - boligformål</beskrivelse>
    </tiltaktype>
  </tiltakstype>
  <vedtak>
    <beskrivelse>Vedtak om rammetillatelse</beskrivelse>
    <vedtaksdato>2020-04-02T16:09:14.7947093+02:00</vedtaksdato>
    <status>
      <kode>1</kode>
      <beskrivelse>Godkjent</beskrivelse>
    </status>
  </vedtak>
  <adresse>Byggestedgate 1</adresse>
  <saksbehandler>Michael</saksbehandler>
</Byggesak>
```

## Eksempel på XML på nivå 2

```xml
<?xml version="1.0" encoding="utf-8"?>
<Byggesak xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://rep.geointegrasjon.no/Matrikkel/foering/v2">
  <systemId xsi:nil="true" />
  <tittel>Rammesøknad for oppføring av 5 tomannsboliger</tittel>
  <saksnummer>
    <saksaar>2018</saksaar>
    <sakssekvensnummer>123456</sakssekvensnummer>
  </saksnummer>
  <kategori>
    <kode>RS</kode>
    <beskrivelse>Søknad om rammetillatelse</beskrivelse>
  </kategori>
  <tiltakstype>
    <tiltaktype>
      <kode>nyttbyggboligformal</kode>
      <beskrivelse>Nytt bygg - boligformål</beskrivelse>
    </tiltaktype>
  </tiltakstype>
  <vedtak>
    <beskrivelse>Vedtak om rammetillatelse</beskrivelse>
    <vedtaksdato>2020-04-02T16:16:45.1760034+02:00</vedtaksdato>
    <status>
      <kode>1</kode>
      <beskrivelse>Godkjent</beskrivelse>
    </status>
    <dispensasjoner xsi:nil="true" />
  </vedtak>
  <ansvarligSoeker>
    <foedselsnummer xsi:nil="true" />
    <organisasjonsnummer>123456789</organisasjonsnummer>
    <navn>Arkitekt Flink</navn>
    <adresse xsi:nil="true" />
    <telefonnummer xsi:nil="true" />
    <mobilnummer xsi:nil="true" />
    <epost xsi:nil="true" />
  </ansvarligSoeker>
  <tiltakshaver>
    <foedselsnummer>12345678901</foedselsnummer>
    <organisasjonsnummer xsi:nil="true" />
    <navn>Hans Utbygger</navn>
    <adresse xsi:nil="true" />
    <telefonnummer xsi:nil="true" />
    <mobilnummer xsi:nil="true" />
    <epost xsi:nil="true" />
  </tiltakshaver>
  <matrikkelopplysninger>
    <eiendomsidentifikasjon>
      <matrikkelnummer>
        <kommunenummer>9999</kommunenummer>
        <gaardsnummer>260</gaardsnummer>
        <bruksnummer>109</bruksnummer>
        <festenummer xsi:nil="true" />
        <seksjonsnummer xsi:nil="true" />
      </matrikkelnummer>
    </eiendomsidentifikasjon>
    <adresse>
      <adresse>
        <adressekode>1001</adressekode>
        <adressenavn>Byggestedgate</adressenavn>
        <adressenummer>3</adressenummer>
        <adressebokstav>A</adressebokstav>
        <seksjonsnummer xsi:nil="true" />
      </adresse>
      <adresse>
        <adressekode>1001</adressekode>
        <adressenavn>Byggestedgate</adressenavn>
        <adressenummer>3</adressenummer>
        <adressebokstav>B</adressebokstav>
        <seksjonsnummer xsi:nil="true" />
      </adresse>
      <adresse>
        <adressekode>1001</adressekode>
        <adressenavn>Byggestedgate</adressenavn>
        <adressenummer>5</adressenummer>
        <adressebokstav>A</adressebokstav>
        <seksjonsnummer xsi:nil="true" />
      </adresse>
      <adresse>
        <adressekode>1001</adressekode>
        <adressenavn>Byggestedgate</adressenavn>
        <adressenummer>5</adressenummer>
        <adressebokstav>B</adressebokstav>
        <seksjonsnummer xsi:nil="true" />
      </adresse>
      <adresse>
        <adressekode>1001</adressekode>
        <adressenavn>Byggestedgate</adressenavn>
        <adressenummer>7</adressenummer>
        <adressebokstav>A</adressebokstav>
        <seksjonsnummer xsi:nil="true" />
      </adresse>
      <adresse>
        <adressekode>1001</adressekode>
        <adressenavn>Byggestedgate</adressenavn>
        <adressenummer>7</adressenummer>
        <adressebokstav>B</adressebokstav>
        <seksjonsnummer xsi:nil="true" />
      </adresse>
      <adresse>
        <adressekode>1001</adressekode>
        <adressenavn>Byggestedgate</adressenavn>
        <adressenummer>9</adressenummer>
        <adressebokstav>A</adressebokstav>
        <seksjonsnummer xsi:nil="true" />
      </adresse>
      <adresse>
        <adressekode>1001</adressekode>
        <adressenavn>Byggestedgate</adressenavn>
        <adressenummer>9</adressenummer>
        <adressebokstav>B</adressebokstav>
        <seksjonsnummer xsi:nil="true" />
      </adresse>
      <adresse>
        <adressekode>1001</adressekode>
        <adressenavn>Byggestedgate</adressenavn>
        <adressenummer>11</adressenummer>
        <adressebokstav>A</adressebokstav>
        <seksjonsnummer xsi:nil="true" />
      </adresse>
      <adresse>
        <adressekode>1001</adressekode>
        <adressenavn>Byggestedgate</adressenavn>
        <adressenummer>11</adressenummer>
        <adressebokstav>B</adressebokstav>
        <seksjonsnummer xsi:nil="true" />
      </adresse>
    </adresse>
    <bygning>
      <bygning>
        <bygningsnummer xsi:nil="true" />
        <naeringsgruppe>
          <kode>X</kode>
          <beskrivelse>Bolig</beskrivelse>
        </naeringsgruppe>
        <bygningstype>
          <kode>121</kode>
          <beskrivelse>Tomannsbolig, vertikaldelt</beskrivelse>
        </bygningstype>
        <bebygdAreal>100</bebygdAreal>
        <bruksenheter>
          <bruksenhet>
            <bruksenhetsnummer>
              <etasjeplan>
                <kode>H</kode>
                <beskrivelse>H</beskrivelse>
              </etasjeplan>
              <etasjenummer>01</etasjenummer>
              <loepenummer>01</loepenummer>
            </bruksenhetsnummer>
            <bruksenhetstype>
              <kode>B</kode>
              <beskrivelse>Bolig</beskrivelse>
            </bruksenhetstype>
            <bruksareal>100</bruksareal>
            <kjoekkentilgang>
              <kode>0</kode>
              <beskrivelse>Ikke oppgitt</beskrivelse>
            </kjoekkentilgang>
            <antallRom>3</antallRom>
            <antallBad>1</antallBad>
            <antallWC>1</antallWC>
            <adresse>
              <adressekode>1001</adressekode>
              <adressenavn>Byggestedgate</adressenavn>
              <adressenummer>3</adressenummer>
              <adressebokstav>A</adressebokstav>
              <seksjonsnummer xsi:nil="true" />
            </adresse>
            <matrikkelnummer xsi:nil="true" />
            <endring>Ny</endring>
          </bruksenhet>
          <bruksenhet>
            <bruksenhetsnummer>
              <etasjeplan>
                <kode>H</kode>
                <beskrivelse>H</beskrivelse>
              </etasjeplan>
              <etasjenummer>01</etasjenummer>
              <loepenummer>01</loepenummer>
            </bruksenhetsnummer>
            <bruksenhetstype>
              <kode>B</kode>
              <beskrivelse>Bolig</beskrivelse>
            </bruksenhetstype>
            <bruksareal>100</bruksareal>
            <kjoekkentilgang>
              <kode>0</kode>
              <beskrivelse>Ikke oppgitt</beskrivelse>
            </kjoekkentilgang>
            <antallRom>3</antallRom>
            <antallBad>1</antallBad>
            <antallWC>1</antallWC>
            <adresse>
              <adressekode>1001</adressekode>
              <adressenavn>Byggestedgate</adressenavn>
              <adressenummer>3</adressenummer>
              <adressebokstav>B</adressebokstav>
              <seksjonsnummer xsi:nil="true" />
            </adresse>
            <matrikkelnummer xsi:nil="true" />
            <endring>Ny</endring>
          </bruksenhet>
        </bruksenheter>
        <etasjer>
          <etasje>
            <etasjenummer>01</etasjenummer>
            <etasjeplan>
              <kode>H</kode>
              <beskrivelse>H</beskrivelse>
            </etasjeplan>
            <antallBoenheter>1</antallBoenheter>
            <bruksarealTilAnnet>0</bruksarealTilAnnet>
            <bruksarealTilBolig>200</bruksarealTilBolig>
            <bruksarealTotalt>200</bruksarealTotalt>
            <endring>Ny</endring>
          </etasje>
        </etasjer>
        <avlop>
          <kode>OffentligKloakk</kode>
          <beskrivelse>Offentlig avløpsanlegg</beskrivelse>
        </avlop>
        <energiforsyning xsi:nil="true" />
        <vannforsyning>
          <kode>TilknyttetOffVannverk</kode>
          <beskrivelse>Offentlig vannverk</beskrivelse>
        </vannforsyning>
        <harHeis>false</harHeis>
        <endring>Ny</endring>
      </bygning>
      <bygning>
        <bygningsnummer xsi:nil="true" />
        <naeringsgruppe>
          <kode>X</kode>
          <beskrivelse>Bolig</beskrivelse>
        </naeringsgruppe>
        <bygningstype>
          <kode>121</kode>
          <beskrivelse>Tomannsbolig, vertikaldelt</beskrivelse>
        </bygningstype>
        <bebygdAreal>100</bebygdAreal>
        <bruksenheter>
          <bruksenhet>
            <bruksenhetsnummer>
              <etasjeplan>
                <kode>H</kode>
                <beskrivelse>H</beskrivelse>
              </etasjeplan>
              <etasjenummer>01</etasjenummer>
              <loepenummer>01</loepenummer>
            </bruksenhetsnummer>
            <bruksenhetstype>
              <kode>B</kode>
              <beskrivelse>Bolig</beskrivelse>
            </bruksenhetstype>
            <bruksareal>100</bruksareal>
            <kjoekkentilgang>
              <kode>0</kode>
              <beskrivelse>Ikke oppgitt</beskrivelse>
            </kjoekkentilgang>
            <antallRom>3</antallRom>
            <antallBad>1</antallBad>
            <antallWC>1</antallWC>
            <adresse>
              <adressekode>1001</adressekode>
              <adressenavn>Byggestedgate</adressenavn>
              <adressenummer>5</adressenummer>
              <adressebokstav>A</adressebokstav>
              <seksjonsnummer xsi:nil="true" />
            </adresse>
            <matrikkelnummer xsi:nil="true" />
            <endring>Ny</endring>
          </bruksenhet>
          <bruksenhet>
            <bruksenhetsnummer>
              <etasjeplan>
                <kode>H</kode>
                <beskrivelse>H</beskrivelse>
              </etasjeplan>
              <etasjenummer>01</etasjenummer>
              <loepenummer>01</loepenummer>
            </bruksenhetsnummer>
            <bruksenhetstype>
              <kode>B</kode>
              <beskrivelse>Bolig</beskrivelse>
            </bruksenhetstype>
            <bruksareal>100</bruksareal>
            <kjoekkentilgang>
              <kode>0</kode>
              <beskrivelse>Ikke oppgitt</beskrivelse>
            </kjoekkentilgang>
            <antallRom>3</antallRom>
            <antallBad>1</antallBad>
            <antallWC>1</antallWC>
            <adresse>
              <adressekode>1001</adressekode>
              <adressenavn>Byggestedgate</adressenavn>
              <adressenummer>5</adressenummer>
              <adressebokstav>B</adressebokstav>
              <seksjonsnummer xsi:nil="true" />
            </adresse>
            <matrikkelnummer xsi:nil="true" />
            <endring>Ny</endring>
          </bruksenhet>
        </bruksenheter>
        <etasjer>
          <etasje>
            <etasjenummer>01</etasjenummer>
            <etasjeplan>
              <kode>H</kode>
              <beskrivelse>H</beskrivelse>
            </etasjeplan>
            <antallBoenheter>1</antallBoenheter>
            <bruksarealTilAnnet>0</bruksarealTilAnnet>
            <bruksarealTilBolig>200</bruksarealTilBolig>
            <bruksarealTotalt>200</bruksarealTotalt>
            <endring>Ny</endring>
          </etasje>
        </etasjer>
        <avlop>
          <kode>OffentligKloakk</kode>
          <beskrivelse>Offentlig avløpsanlegg</beskrivelse>
        </avlop>
        <energiforsyning xsi:nil="true" />
        <vannforsyning>
          <kode>TilknyttetOffVannverk</kode>
          <beskrivelse>Offentlig vannverk</beskrivelse>
        </vannforsyning>
        <harHeis>false</harHeis>
        <endring>Ny</endring>
      </bygning>
      <bygning>
        <bygningsnummer xsi:nil="true" />
        <naeringsgruppe>
          <kode>X</kode>
          <beskrivelse>Bolig</beskrivelse>
        </naeringsgruppe>
        <bygningstype>
          <kode>121</kode>
          <beskrivelse>Tomannsbolig, vertikaldelt</beskrivelse>
        </bygningstype>
        <bebygdAreal>100</bebygdAreal>
        <bruksenheter>
          <bruksenhet>
            <bruksenhetsnummer>
              <etasjeplan>
                <kode>H</kode>
                <beskrivelse>H</beskrivelse>
              </etasjeplan>
              <etasjenummer>01</etasjenummer>
              <loepenummer>01</loepenummer>
            </bruksenhetsnummer>
            <bruksenhetstype>
              <kode>B</kode>
              <beskrivelse>Bolig</beskrivelse>
            </bruksenhetstype>
            <bruksareal>100</bruksareal>
            <kjoekkentilgang>
              <kode>0</kode>
              <beskrivelse>Ikke oppgitt</beskrivelse>
            </kjoekkentilgang>
            <antallRom>3</antallRom>
            <antallBad>1</antallBad>
            <antallWC>1</antallWC>
            <adresse>
              <adressekode>1001</adressekode>
              <adressenavn>Byggestedgate</adressenavn>
              <adressenummer>7</adressenummer>
              <adressebokstav>A</adressebokstav>
              <seksjonsnummer xsi:nil="true" />
            </adresse>
            <matrikkelnummer xsi:nil="true" />
            <endring>Ny</endring>
          </bruksenhet>
          <bruksenhet>
            <bruksenhetsnummer>
              <etasjeplan>
                <kode>H</kode>
                <beskrivelse>H</beskrivelse>
              </etasjeplan>
              <etasjenummer>01</etasjenummer>
              <loepenummer>01</loepenummer>
            </bruksenhetsnummer>
            <bruksenhetstype>
              <kode>B</kode>
              <beskrivelse>Bolig</beskrivelse>
            </bruksenhetstype>
            <bruksareal>100</bruksareal>
            <kjoekkentilgang>
              <kode>0</kode>
              <beskrivelse>Ikke oppgitt</beskrivelse>
            </kjoekkentilgang>
            <antallRom>3</antallRom>
            <antallBad>1</antallBad>
            <antallWC>1</antallWC>
            <adresse>
              <adressekode>1001</adressekode>
              <adressenavn>Byggestedgate</adressenavn>
              <adressenummer>7</adressenummer>
              <adressebokstav>B</adressebokstav>
              <seksjonsnummer xsi:nil="true" />
            </adresse>
            <matrikkelnummer xsi:nil="true" />
            <endring>Ny</endring>
          </bruksenhet>
        </bruksenheter>
        <etasjer>
          <etasje>
            <etasjenummer>01</etasjenummer>
            <etasjeplan>
              <kode>H</kode>
              <beskrivelse>H</beskrivelse>
            </etasjeplan>
            <antallBoenheter>1</antallBoenheter>
            <bruksarealTilAnnet>0</bruksarealTilAnnet>
            <bruksarealTilBolig>200</bruksarealTilBolig>
            <bruksarealTotalt>200</bruksarealTotalt>
            <endring>Ny</endring>
          </etasje>
        </etasjer>
        <avlop>
          <kode>OffentligKloakk</kode>
          <beskrivelse>Offentlig avløpsanlegg</beskrivelse>
        </avlop>
        <energiforsyning xsi:nil="true" />
        <vannforsyning>
          <kode>TilknyttetOffVannverk</kode>
          <beskrivelse>Offentlig vannverk</beskrivelse>
        </vannforsyning>
        <harHeis>false</harHeis>
        <endring>Ny</endring>
      </bygning>
      <bygning>
        <bygningsnummer xsi:nil="true" />
        <naeringsgruppe>
          <kode>X</kode>
          <beskrivelse>Bolig</beskrivelse>
        </naeringsgruppe>
        <bygningstype>
          <kode>121</kode>
          <beskrivelse>Tomannsbolig, vertikaldelt</beskrivelse>
        </bygningstype>
        <bebygdAreal>100</bebygdAreal>
        <bruksenheter>
          <bruksenhet>
            <bruksenhetsnummer>
              <etasjeplan>
                <kode>H</kode>
                <beskrivelse>H</beskrivelse>
              </etasjeplan>
              <etasjenummer>01</etasjenummer>
              <loepenummer>01</loepenummer>
            </bruksenhetsnummer>
            <bruksenhetstype>
              <kode>B</kode>
              <beskrivelse>Bolig</beskrivelse>
            </bruksenhetstype>
            <bruksareal>100</bruksareal>
            <kjoekkentilgang>
              <kode>0</kode>
              <beskrivelse>Ikke oppgitt</beskrivelse>
            </kjoekkentilgang>
            <antallRom>3</antallRom>
            <antallBad>1</antallBad>
            <antallWC>1</antallWC>
            <adresse>
              <adressekode>1001</adressekode>
              <adressenavn>Byggestedgate</adressenavn>
              <adressenummer>9</adressenummer>
              <adressebokstav>A</adressebokstav>
              <seksjonsnummer xsi:nil="true" />
            </adresse>
            <matrikkelnummer xsi:nil="true" />
            <endring>Ny</endring>
          </bruksenhet>
          <bruksenhet>
            <bruksenhetsnummer>
              <etasjeplan>
                <kode>H</kode>
                <beskrivelse>H</beskrivelse>
              </etasjeplan>
              <etasjenummer>01</etasjenummer>
              <loepenummer>01</loepenummer>
            </bruksenhetsnummer>
            <bruksenhetstype>
              <kode>B</kode>
              <beskrivelse>Bolig</beskrivelse>
            </bruksenhetstype>
            <bruksareal>100</bruksareal>
            <kjoekkentilgang>
              <kode>0</kode>
              <beskrivelse>Ikke oppgitt</beskrivelse>
            </kjoekkentilgang>
            <antallRom>3</antallRom>
            <antallBad>1</antallBad>
            <antallWC>1</antallWC>
            <adresse>
              <adressekode>1001</adressekode>
              <adressenavn>Byggestedgate</adressenavn>
              <adressenummer>9</adressenummer>
              <adressebokstav>B</adressebokstav>
              <seksjonsnummer xsi:nil="true" />
            </adresse>
            <matrikkelnummer xsi:nil="true" />
            <endring>Ny</endring>
          </bruksenhet>
        </bruksenheter>
        <etasjer>
          <etasje>
            <etasjenummer>01</etasjenummer>
            <etasjeplan>
              <kode>H</kode>
              <beskrivelse>H</beskrivelse>
            </etasjeplan>
            <antallBoenheter>1</antallBoenheter>
            <bruksarealTilAnnet>0</bruksarealTilAnnet>
            <bruksarealTilBolig>200</bruksarealTilBolig>
            <bruksarealTotalt>200</bruksarealTotalt>
            <endring>Ny</endring>
          </etasje>
        </etasjer>
        <avlop>
          <kode>OffentligKloakk</kode>
          <beskrivelse>Offentlig avløpsanlegg</beskrivelse>
        </avlop>
        <energiforsyning xsi:nil="true" />
        <vannforsyning>
          <kode>TilknyttetOffVannverk</kode>
          <beskrivelse>Offentlig vannverk</beskrivelse>
        </vannforsyning>
        <harHeis>false</harHeis>
        <endring>Ny</endring>
      </bygning>
      <bygning>
        <bygningsnummer xsi:nil="true" />
        <naeringsgruppe>
          <kode>X</kode>
          <beskrivelse>Bolig</beskrivelse>
        </naeringsgruppe>
        <bygningstype>
          <kode>121</kode>
          <beskrivelse>Tomannsbolig, vertikaldelt</beskrivelse>
        </bygningstype>
        <bebygdAreal>100</bebygdAreal>
        <bruksenheter>
          <bruksenhet>
            <bruksenhetsnummer>
              <etasjeplan>
                <kode>H</kode>
                <beskrivelse>H</beskrivelse>
              </etasjeplan>
              <etasjenummer>01</etasjenummer>
              <loepenummer>01</loepenummer>
            </bruksenhetsnummer>
            <bruksenhetstype>
              <kode>B</kode>
              <beskrivelse>Bolig</beskrivelse>
            </bruksenhetstype>
            <bruksareal>100</bruksareal>
            <kjoekkentilgang>
              <kode>0</kode>
              <beskrivelse>Ikke oppgitt</beskrivelse>
            </kjoekkentilgang>
            <antallRom>3</antallRom>
            <antallBad>1</antallBad>
            <antallWC>1</antallWC>
            <adresse>
              <adressekode>1001</adressekode>
              <adressenavn>Byggestedgate</adressenavn>
              <adressenummer>11</adressenummer>
              <adressebokstav>A</adressebokstav>
              <seksjonsnummer xsi:nil="true" />
            </adresse>
            <matrikkelnummer xsi:nil="true" />
            <endring>Ny</endring>
          </bruksenhet>
          <bruksenhet>
            <bruksenhetsnummer>
              <etasjeplan>
                <kode>H</kode>
                <beskrivelse>H</beskrivelse>
              </etasjeplan>
              <etasjenummer>01</etasjenummer>
              <loepenummer>01</loepenummer>
            </bruksenhetsnummer>
            <bruksenhetstype>
              <kode>B</kode>
              <beskrivelse>Bolig</beskrivelse>
            </bruksenhetstype>
            <bruksareal>100</bruksareal>
            <kjoekkentilgang>
              <kode>0</kode>
              <beskrivelse>Ikke oppgitt</beskrivelse>
            </kjoekkentilgang>
            <antallRom>3</antallRom>
            <antallBad>1</antallBad>
            <antallWC>1</antallWC>
            <adresse>
              <adressekode>1001</adressekode>
              <adressenavn>Byggestedgate</adressenavn>
              <adressenummer>11</adressenummer>
              <adressebokstav>B</adressebokstav>
              <seksjonsnummer xsi:nil="true" />
            </adresse>
            <matrikkelnummer xsi:nil="true" />
            <endring>Ny</endring>
          </bruksenhet>
        </bruksenheter>
        <etasjer>
          <etasje>
            <etasjenummer>01</etasjenummer>
            <etasjeplan>
              <kode>H</kode>
              <beskrivelse>H</beskrivelse>
            </etasjeplan>
            <antallBoenheter>1</antallBoenheter>
            <bruksarealTilAnnet>0</bruksarealTilAnnet>
            <bruksarealTilBolig>200</bruksarealTilBolig>
            <bruksarealTotalt>200</bruksarealTotalt>
            <endring>Ny</endring>
          </etasje>
        </etasjer>
        <avlop>
          <kode>OffentligKloakk</kode>
          <beskrivelse>Offentlig avløpsanlegg</beskrivelse>
        </avlop>
        <energiforsyning xsi:nil="true" />
        <vannforsyning>
          <kode>TilknyttetOffVannverk</kode>
          <beskrivelse>Offentlig vannverk</beskrivelse>
        </vannforsyning>
        <harHeis>false</harHeis>
        <endring>Ny</endring>
      </bygning>
    </bygning>
  </matrikkelopplysninger>
  <adresse>Byggestedgate 3 - 11</adresse>
  <referanseAndreSaker xsi:nil="true" />
  <referanseKlagesaker xsi:nil="true" />
  <registrertDato>0001-01-01T00:00:00</registrertDato>
  <saksbehandler>Michael</saksbehandler>
  <posisjon xsi:nil="true" />
</Byggesak>
```
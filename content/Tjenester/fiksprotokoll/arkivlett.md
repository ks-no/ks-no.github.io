---
title: Fiks arkivlett byggesak
date: 2020-05-12
alias: ["/fiks-plattform/tjenester/fiksprotokoll/arkivlett"]
---

> Tjenesten er under utvikling/testing/pilotering

# Kort beskrivelse 

Fiks Arkivlett Byggesak er en tjeneste for å spørre etter relevante dokumenter i en byggesak.
Løsningen benytter [FIKS Protokoll](https://ks-no.github.io/fiks-platform/tjenester/fiksprotokoll) for definisjon av meldingstyper, og [FIKS IO](https://ks-no.github.io/fiks-plattform/tjenester/fiksprotokoll/fiksio/) for maskin til maskin integrasjon 

Løsningen vil typisk kunne brukes av et søknadssystem for byggesaker til å finne tidligere tegninger eller vedtak på en eiendom som er relevant for videre tiltak på eiendommen.

# Tilgjengelige grensesnitt
| Grensesnitt | Støtte |
|------|------|
| Web portal | Nei |
| Maskin til maskin | Ja |

# Beskrivelse av løsningen 
## Teknisk oversikt skisse

![fiks_arkivlett](/images/arkivlett_skisse.png "Fiks IO Arkivlett")

## Hvordan ta i bruk Fiks Arkivlett Byggesak
For at søknadssystem for byggesaker skal få tilgang til å sende forespørsel om byggesaker på en eiendom til arkivet, så må kommunen aktivere tjenesten Fiks IO i [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester).

Aktuellt system for mottak av arkivlett meldinger må aktiveres for å kunne svare på meldingsprotokoll ```no.dibk.arkivlett.byggesak.v1```

## Sikkerhet sjekkliste

Løsningen for å utlevere informasjon må være vurdert av behandlingsansvarlig(kommunen) for å ivareta den registrertes rettigheter. Databehandler(Leverandør) må dokumentere at personopplysninger behandles etter innstruks fra behandlingsansvarlig.   

- Skal det tilgjengeliggjøres fra en eksisterende løsning med kun offentlig informasjon?
- Hva er risiko for at gradert informasjon eller informasjon untatt offentlighet kommer ut?
Avklares nærmere i pilot 


## Flyt
![fiks_arkivlett_flyt](/images/arkivlett_flyt.png "Fiks Arkivlett")

- Søknadssystem sjekker om valgt kommune har system som støtter meldingsprotokollen for arkivlett i kontokatalogen
- Hvis kommune har system som støtter arkivlett kan forespørsel sendes
- Søknadssystem sender forespørsel om informasjon om byggesaker som gjelder aktuell eiendom
- Arkivlett system mottar melding og validerer om meldingen er ok
- Hvis feil i utfylling eller eiendom ikke finnes så returneres feil
- Hvis melding er ok så sendes mottatt melding
- Arkivlett system gjør søk i relevante arkivdeler med de sikkerhetsavklaringer som kommunen har gjort om utlevering av informasjon fra disse
- Resultatmelding lages og sendes tilbake til søknadssystem
- Søknadssystem vise resultatet til søker


## Fiks IO meldingsprotokoll for arkivlett byggesak
Meldingsprotokoll som arkivlett mottaksklient må støtte ```no.dibk.arkivlett.byggesak.v1```

### Oppslag på kontoer som støtter meldingsprotokoll for arkivlett byggesak
For å finne hvilke konto en skal sende meldinger til så kan en slå opp dette i adresse katalogen til FIKS IO

```csharp
var kontoliste = client.Lookup(new LookupRequest("ORG_NO.987654321", "no.dibk.arkivlett.byggesak.v1", 3));
```

```csharp
var kontoliste = client.Lookup(new LookupRequest("KOMM.3817", "no.dibk.arkivlett.byggesak.v1", 3));
```

#### Fra søknadssystem/fagsystem: 
- Forespørsel om å hente byggesaker for en eiendom: ```no.dibk.arkivlett.byggesak.hentbyggesaker.v1```  [Datamodell hentbyggesaker.v1.schema.json](/files/hentbyggesaker.v1.schema.json)

Eksempel message.json:
```json
{
  "matrikkelnummer": {
    "kommunenummer": "3817",
    "gaardsnummer": "49",
    "bruksnummer": "130",
    "festenummer": "0",
    "seksjonsnummer": "0"
  }
}
```
Eksempel kode:
```csharp
var messageRequest = new MeldingRequest(
            mottakerKontoId: receiverId,
            avsenderKontoId: senderId,
            meldingType: "no.dibk.arkivlett.byggesak.hentbyggesaker.v1"); 

List<IPayload> payloads = new List<IPayload>();
payloads.Add(new StringPayload(jsonMessage, "message.json"));


var msgSent = client.Send(messageRequest, payloads).Result;
```

#### Fra arkivlett klienter: 
- Mottak vellykket: ```no.dibk.arkivlett.mottatt.v1```
- Mottak feilet: ```no.dibk.arkivlett.feil.v1```
- Resultat til forespørsel om eiendommens byggesaker:
```no.dibk.arkivlett.byggesak.resultat.v1``` [Datamodell resultatbyggesaker.v1.schema.json](/files/resultatbyggesaker.v1.schema.json)

Eksempel resultat.json: 
```json
[
  {
    "byggesak": {
      "tittel": "Svingen 25, 49/130 - Nytt bygg - Boligformål",
      "beskrivelse": "",
      "mappeId" : "1969/4567",
      "saksstatus": {
      					"kodeverdi": "AVSLUTTET",
      					"kodebeskrivelse": "Avsluttet"
    				},
      "saksdato": "1969-12-20",
      "saksansvarlig": "Hilde",
      "administrativEnhet": "Teknisk eining/Byggesak",
      "adresse": "Svingen 25",
      "avsluttetDato": "1971-06-10",
      "saksnummer": {
        				"saksaar": "1969",
        				"sakssekvensnummer": "4567"
      				},
      "tiltakstype":{
      					"kodeverdi": "nyttbyggboligformal",
      					"kodebeskrivelse": "Nytt bygg - Boligformål"
    				},
      "tiltakshaver": "Scott Owren",
      "ansvarligSoeker": "Arkitekt Flink",
      "matrikkelnummer" : 	{
        						"kommunenummer": "3817",
        						"gaardsnummer": "49",
                                "bruksnummer": "130",
                                "festenummer": "0",
                                "seksjonsnummer": "0"
      						},
      "dokumentlisteBeskrivelse": "Gjeldende dokumenter som ikke er untatt offentlighet",
      "dokumenter": [
        {
          "tittel": "Søknad om tillatelse til tiltak i ett trinn",
          "dokumenttype":{
      						"kodeverdi": "SØKNAD",
      						"kodebeskrivelse": "Søknad"
    					},
          "referanseDokumentfil": "søknad.pdf",
          "filstoerrelse": 12345,
          "mimeType" : "application/pdf",
          "dokumentetsdato" : "1969-12-20"
        },
        {
          "tittel": "Fasadetegning sør",
          "dokumenttype":{
      						"kodeverdi": "TEGNING",
      						"kodebeskrivelse": "Tegning"
    					},
          "referanseDokumentfil": "tegning.pdf",
          "filstoerrelse": 12345,
          "mimeType" : "application/pdf",
          "versjon" : "2",
          "dokumentetsdato" : "1969-12-22",
          "vedtaksstatus" : {
      						"kodeverdi": "1",
      						"kodebeskrivelse": "Godkjent"
    						},
          "vedtaksdato" : "1971-06-10",
          "SystemId" : "ea495f29-54e5-4c10-b14d-606d7fe92a7f",
          "ErstatterTidligereSystemId" : "bf6a8349-4788-41e2-80c1-2a64a9717dd9"
        }
	   ]
    }
  },
  {
    "byggesak": {
      "tittel": "Straumsnesvegen 100B, 15/1/2 - Oppføring av hytte",
      "dokumenter": [
        {
          	"tittel": "testfil1",
    		"referanseDokumentfil": "tegninghytte.pdf"
        },
        {
          "tittel": "testfil2"
        }
      ]
    }
  }
]
```
Eksempel kode:
```csharp
var messageRequest = new MeldingRequest(
            mottakerKontoId: receiverId,
            avsenderKontoId: senderId,
            meldingType: "no.dibk.arkivlett.byggesak.resultat.v1"); 

List<IPayload> payloads = new List<IPayload>();
payloads.Add(new StringPayload(jsonMessage, "resultat.json"));
payloads.Add(new FilePayload("søknad.pdf"));
payloads.Add(new FilePayload("tegning.pdf"));
payloads.Add(new FilePayload("tegninghytte.pdf"));

var msgSent = client.Send(messageRequest, payloads).Result;
```

## Overføring av filer

Dokumenttyper ihht Arkivlett anbefales https://www.ks.no/fagomrader/digitalisering/felleslosninger/verktoykasse-plan--og-byggesak/enklere-tilgang-til-kommunale-byggesaksarkiv/


| Tittel        | Dokumenttype fra Arkivlett  |
| ------------- |----------------------------|
| Situasjonsplan      | KART |
| Tegning eksisterende plan  | TEGNING |
| Tegning ny plan  | TEGNING |
|  Tegning eksisterende snitt  | TEGNING |
|  Tegning nytt snitt  | TEGNING |
|  Tegning eksisterende fasade  | TEGNING |
|  Tegning eksisterende snitt  | TEGNING |
|  Tegning ny fasade  | TEGNING |
|  ByggesaksBIM  | TEGNING |
|  Tegning eksisterende snitt  | TEGNING |
|  Tegning eksisterende snitt  | TEGNING |
....



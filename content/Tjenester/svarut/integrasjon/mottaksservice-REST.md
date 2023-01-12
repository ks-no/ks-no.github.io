---
title: MottakService v1
date: 2017-01-01
alias: [/svarut/integrasjon/mottaksservice-rest]
---

Her beskrives funksjonalitet for Mottaksservice V1\. For å sikre bakoverkompatibilitet for klientene så vil denne versjonen ikke endres.

Bruk av SvarInn til GeoIntegrasjon eksempel kode ligger her: https://github.com/ks-no/svarut-sak-mottak

### Tilgang

Tjenesten bruker HTTP Basic autentication med brukernavn og generert service-passord. Mottakersystem opprettes av KS-SvarUt administrator og service-passordet genereres av person med tilgang via [mottakersystem](https://svarut.ks.no/mottaker/)-siden. Dersom autentiseringen feiler returneres HTTP-status 401 Unauthorized, og ukjent URL gir HTTP-status 404\. Detaljerte feilmeldinger følger også ved feil.

### Tjenester

Forsendelser er tilgjengelig for direkte import til sakssystem i uendelig tid. Dersom forsendelsene markeres som permanent import feil går forsendelsene videre i det normale løpet med varsling i Altinn og til slutt printing.
Etter 2 timer vil det bli sendt varsel mail om manglende import 3 ganger om dagen.

Tjenestene er tilgjengelige via https://svarut.ks.no/tjenester/svarinn/

#### hentNyeForsendelser (GET)

**https://svarut.ks.no/tjenester/svarinn/mottaker/hentNyeForsendelser**

Henter nye forsendelser for autentisert mottaker (basert på angitt mottaker). En vellykket forespørsel returnerer en liste av forsendelser (JSON). Dersom ingen forsendelser er tilgjengelig sendes en tom liste. Her følger et eksempel på en forsendelse.

{{< highlight json >}}
[{
  "avsender": {
    "adresselinje1": "Første adresselinje",
    "adresselinje2": "Andre adresselinje",
    "adresselinje3": "Tredje adresselinje",
    "navn": "Tester testmann",
    "poststed": "Teststad",
    "postnr": "3333"
  },
  "mottaker": {
    "adresse1": "Første adresselinje",
    "adresse2": "Andre adresselinje",
    "adresse3": null,
    "postnr": "5258",
    "poststed": "Blomsterdalen",
    "navn": "Orgnavn",
    "land": "Norge",
    "orgnr": "999888777", //Eller fnr utfylt
    "fnr": "22334455566"
  },
  "id": "AAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA",
  "tittel": "En tittel",
  "date": 1412668736853, //millis since epoch
  "metadataFraAvleverendeSystem": {
    "sakssekvensnummer": 0,
    "saksaar": 0,
    "journalaar": 0,
    "journalsekvensnummer": 0,
    "journalpostnummer": 0,
    "journalposttype": "U",
    "journalstatus": null,
    "journaldato": null, //millis since epoch
    "dokumentetsDato": null, //millis since epoch
    "tittel": null,
    "saksBehandler": null,
    "ekstraMetadata": [
      {
        "key": null,
        "value": null
      }
    ]
  },
  "metadataForImport": {
    "sakssekvensnummer": 0,
    "saksaar": 0,
    "journalposttype": null,
    "journalstatus": "I",
    "dokumentetsDato": "2014-10-21T09:30:13.310+02:00", //ISO 8601
    "tittel": null
  },
  "status": "Akseptert",
  "niva": "3",
  "filmetadata": [
    {
      "filnavn": "dokument-d1c6d795.pdf",
      "mimetype": "application/pdf",
      "sha256hash": "caaa6a09e4b5ad571c596dd31fb93689d402834a1b92ff660abeb59c534c088e",
      "dokumentType": null,
      "size": 234563 # 0 hvis ukjent ellers størrelse i bytes.
    }
  ],
  "svarSendesTil": {
    "adresse1": "Første adresselinje",
    "adresse2": "Andre adresselinje",
    "adresse3": null,
    "postnr": "5258",
    "poststed": "Blomsterdalen",
    "navn": "Orgnavn",
    "land": "Norge",
    "orgnr": "999888777", //Eller fnr utfylt
    "fnr": "22334455566"
  },
  "svarPaForsendelse": "BBBBBB-BBBB-CCCC-BBBB-BBBBBBBBBB",
  "forsendelseType": "forsendelseType sett av avsender(heter dokumentType i v5 av servicen)",
  "eksternRef": "en ref fra avsender",
  "downloadUrl": "https://svarut.ks.no/tjenester/svarinn/forsendelse/AAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
}]
{{< /highlight >}}

Hvis du får en zip fil i downloadUrlen, inneholder filmetadata mimetype på filene inne i zip fila.


#### hentForsendelsefil (GET)

URL for å hente forsendelser er oppgitt i **downloadUrl**-feltet i JSON-resultatet fra hentNyeForsendelser.

Henter filen for en gitt forsendelse. Kun én fil returneres. Hvis forsendelsen består flere filer er de enten pakket i en samlet PDF eller en .zip fil. Husk at filene kan være store, vi anbefaler å bruke en stream for mottak. MIME-type og filnavn står i headeren. Filen er kryptert med den offentlige nøkkelen til mottakersystemet og må dekrypteres etter nedlasting.

<table class="table table-condensed">

<thead>

<tr>

<th>Felt</th>

<th colspan="2">Beskrivelse</th>

<th>Validering</th>

</tr>

</thead>

<tbody>

<tr>

<td class="bold" rowspan="9">Forsendelsesid</td>

<td colspan="2">Identifikator som unikt identifiserer en forsendelse.</td>

<td>Må være utfylt</td>

</tr>

</tbody>

</table>

#### settForsendelseMottatt (POST)

**https://svarut.ks.no/tjenester/svarinn/kvitterMottak/forsendelse/{forsendelseid}**

Etter mottatt forsendelse kvitteres den ut fra importtjenesten. Forsendelsesstatus endres til lest slik at varsel ikke sendes til Altinn. Forsendelsen blir heller ikke sendt til print siden den er mottatt.

<table class="table table-condensed">

<thead>

<tr>

<th>Felt</th>

<th colspan="2">Beskrivelse</th>

<th>Validering</th>

</tr>

</thead>

<tbody>

<tr>

<td class="bold" rowspan="9">Forsendelsesid</td>

<td colspan="2">Identifikator som unikt identifiserer en forsendelse.</td>

<td>Må være utfylt</td>

</tr>

</tbody>

</table>

#### settForsendelseMottakFeilet (POST)

**https://svarut.ks.no/tjenester/svarinn/mottakFeilet/forsendelse/{forsendelseid}**

Hvis mottak av forsendelse feilet, kan dette meldes tilbake til SvarUt. Dette vil da framkomme i loggen til avsender.


<table>

<thead>

<tr>

<th>Felt</th>

<th colspan="2">Beskrivelse</th>

<th>Validering</th>

</tr>

</thead>

<tbody>

<tr>
  <td class="bold">Forsendelsesid</td>
  <td colspan="2">Identifikator som unikt identifiserer en forsendelse.</td>
  <td>Må være utfylt</td>
</tr>
<tr>
  <td class="bold">feilmelding</td>
  <td colspan="2">Tekst som sier hva som er feil.</td>
  <td>Må være utfylt</td>
</tr>
<tr>
  <td class="bold">permanent</td>
  <td colspan="2">Kan være permanent eller middlertidig. 
Hvis feilen er ikke mulig å fikse kan den markeres som permanent. Feilen som er markert permanent blir sent via annen kanal.Hvis forsendelsen er kun Digital og markert som permanentfeil vil den velge annen kanal og ikke blir varslet hvis forsendelsen ikke blir hentet. Normal varselmail for ikke hentede forsendelser via SvarInn blir ikke sendt.</td>
  <td>Må være utfylt</td>
</tr>
</tbody>

</table>

Json body:
{{< highlight json >}}
{
 "feilmelding":"En god feilmelding som mennesker kan lese",
 "permanent":true
}
{{< / highlight >}}

Permanent true vil si at mottaker aldri vil kunne klare å hente denne forsendelsen, den vil da gå videre og prøvd å levert via andre kanaler.

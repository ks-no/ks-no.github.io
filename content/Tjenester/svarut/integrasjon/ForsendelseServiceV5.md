---
title: ForsendelseServiceV5
date: 2017-01-01
---

Her beskrives funksjonalitet for ForsendelseServiceV5

### [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV5?wsdl)

### Tilgang

For å benytte webservicen må en bruke HTTP Basic autentication med brukernavn(avsendernavn) og service-passord. Avsender opprettes av KS-SvarUt administrator/organisasjons administrator og service-passordet genereres av avsender ansvarlig via [konfigurasjon](https://svarut.ks.no/konfigurasjon/)-siden.

### Tjenester

Forsendelsesservicet tilbyr følgende funksjonalitet:

#### sendForsendelse

Hovedtjeneste som sender inn forsendelse til ekspedering av KS-SvarUt. Følgende metadata inkluderes:

<table class="table table-condensed">

<thead>

<tr>

<th>Felt</th>

<th colspan="3">Beskrivelse</th>

<th>Validering</th>

</tr>

</thead>

<tbody>

<tr>

<td class="bold" rowspan="10">Mottaker</td>

<td colspan="2">PrivatPerson eller Organisasjon, full adresse må være utfylt, for sending til Altinn må orgnr/fødselsnr være utfylt. Støtte for utenlandske adresser.</td>

</tr>

<tr>

<td class="bold">Navn</td>

<td>Navn på mottaker.</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td class="bold">Adresse1</td>

<td>Adresselinje1</td>

</tr>

<tr>

<td class="bold">Adresse2</td>

<td>Adresselinje2</td>

</tr>

<tr>

<td class="bold">Adresse3</td>

<td>Adresselinje3</td>

</tr>

<tr>

<td class="bold">Postnr</td>

<td>Postnummer</td>

<td>Må være utfylt, 4 tall for norske adresser</td>

</tr>

<tr>

<td class="bold">Poststed</td>

<td>Poststed</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td class="bold">Land</td>

<td>Land</td>

</tr>

<tr>

<td class="bold">Fødselsnr</td>

<td>Hvis Privat, må være utfylt for å kunne levere til altinn.</td>

</tr>

<tr>

<td class="bold">Orgnr</td>

<td>Hvis organisasjon, må være utfylt for å kunne levere til altinn.</td>

</tr>

<tr>

<td class="bold">Avgivende system</td>

<td colspan="2">Identifikator som identifiserer systemet som gjør web-service kallet, vil blant annet kunne benyttes for statistikk og feilsøking. Bruk følgende for sak/arkivsystemene: Doculive, Ephorte, ESA, 360 og Websak. For andre fagsystemer avtales dette med KS KommIT på [svarut@ks.no](mailto:svarut@ks.no). Obligatorisk felt.</td>

</tr>
<tr>

<td class="bold">DokumentType - heter forsendelseType i versjon 6</td>

<td colspan="2">Fritekst felt for å kunne identifisere forsendelse type. Dette feltet blir ikke brukt til noe i dag, men vil bli søkbart og tilgengelig i SvarInn.

</td>

</tr>

<tr>

<td class="bold">eksternref</td>

<td colspan="2">Ekstern id for forsendelsen, ingen sjekk på innhold i SvarUt. Det vil komme mulighet for å hente ut forsendelser i søk og via api på eksternref.
</td>

</tr>


<tr>

<td class="bold">Tittel</td>

<td colspan="2">Tittel på forsendelsen. Tittel blir vist i tittelfeltet på melding til Altinn, og i listen over innkommende meldinger.</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td class="bold">Konteringskode</td>

<td colspan="2">Kode som beskriver faktureringskonto for forsendelsen. Kan benyttes for å gruppere meldingsstatistikk gjennom forvaltningsløsningen, og sendes videre til print-leverandør.</td>

<td>^[a-zA-Z0-9\-\.øæåØÆÅ]{0,20}$</td>

</tr>

<tr>

<td class="bold">Printkonfigurasjon</td>

<td colspan="2">Konfigurasjon for hvordan dokumentet skal printes, dobbeltsidig, fargeprint, A-Post, B-Post</td>

</tr>

<tr>

<td class="bold">KunDigitalLevering</td>

<td colspan="2">Vi leverer kun digitalt, ingen print og postlegging. Hvis dokumentet ikke kan leveres digital blir det ikke levert. Hvis KunDigitalLevering er valgt må fødselsnr eller orgnr være utfylt.</td>

</tr>

<tr>

<td class="bold">kryptert</td>

<td colspan="2">Settes til true dersom fil(ene) som sendes er kryptert. Dersom kryptering ikke er brukt må denne være satt til false. Se kodeeksempler for eksempel på kryptering. Det må være kryptert med CMS med svarut sin publickey. [Den offentlige nøkkelen PROD](https://svarut.ks.no/forsendelse/publickey/hent), [Den offentlige nøkkelen for TEST](https://test.svarut.ks.no/forsendelse/publickey/hent)</td>

</tr>

<tr>

<td class="bold">krevNiva4Innlogging</td>

<td colspan="2">Forsendelsen krever nivå 4-innlogging for å kunne lastes ned. Disse forsendelsene må være kryptert.</td>

</tr>

<tr>

<td class="bold">svarPaForsendelse</td>

<td colspan="2">Forsendelseid til forsendelse dette er et svar på.</td>

</tr>

<tr>

<td class="bold" rowspan="5">Liste med pdf filer</td>

<td colspan="2">Rekkefølgen er rekkefølgen de kommer i brevet. Total filstørrelse inntil 250MB er støttet.</td>

</tr>

<tr>

<td class="bold">Filnavn</td>

<td>Filnavn er for intern bruk, må være unikt i en forsendelse.</td>

</tr>

<tr>

<td class="bold">Mimetype</td>

<td>Mimetype må være application/pdf hvis den skal til print. Dersom "Kun digital" levering er valgt kan vi ta imot annet.</td>

<td>Kun application/pdf hvis den skal til print</td>

</tr>

<tr>

<td class="bold">Data</td>

<td>Fildata</td>

</tr>

<tr>

<td class="bold">GiroarkSider</td>

<td>Liste med sidetall som skal printes på gult giroark. Digital versjon vil få grått giroark. Første side er 1.</td>

</tr>

<tr>

<td class="bold" rowspan="4">Liste med Lenker</td>

<td colspan="2">Rekkefølgen er samme som de vil komme i brevet. Kan være tom.</td>

</tr>

<tr>

<td class="bold">Url lenke</td>

<td>Selve lenken til dokument/nettside</td>

<td>Må være utfylt og være i gyldig lenke format, altså (http/https/ftp)://(nettside).(com/no/ etc)</td>

</tr>

<tr>

<td class="bold">Url tekst</td>

<td>Mimetype på være application/pdf. Kun det som blir støttet nå.</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td class="bold">Ledetekst</td>

<td>Teksten som kommer før lenken i brevet</td>

</tr>

<tr>

<td class="bold" rowspan="13">Metadata fra avleverende system</td>

<td colspan="2">Noark5 metadata fra avleverende system, foreløbig oversikt</td>

</tr>

<tr>

<td class="bold">Saksekvensnummer</td>

</tr>

<tr>

<td class="bold">Saksaar</td>

</tr>

<tr>

<td class="bold">Journalaar</td>

</tr>

<tr>

<td class="bold">Journalseksvensnummer</td>

</tr>

<tr>

<td class="bold">Journalpostnummer</td>

</tr>

<tr>

<td class="bold">Journalposttype</td>

</tr>

<tr>

<td class="bold">Journalstatus</td>

</tr>

<tr>

<td class="bold">Journaldato</td>

</tr>

<tr>

<td class="bold">DokumentetsDato</td>

</tr>

<tr>

<td class="bold">Tittel</td>

</tr>

<tr>

<td class="bold">Saksbehandler</td>

</tr>

<tr>

<td class="bold">EkstraMetadata</td>

<td>Liste med key,value for forskjellige behov. Keys må være unique.</td>

</tr>

<tr>

<td class="bold" rowspan="6">Metadata i mottakende system</td>

<td colspan="2">Noark5 metadata som stemmer med mottakende system. Kan brukes til å legge dokumentet på rett sak. Samme som over.</td>

</tr>

<tr>

<td class="bold">Saksekvensnummer</td>

</tr>

<tr>

<td class="bold">Saksaar</td>

</tr>

<tr>

<td class="bold">Journalposttype</td>

</tr>

<tr>

<td class="bold">Journalstatus</td>

</tr>

<tr>

<td class="bold">DokumentetsDato</td>

</tr>

<tr>

<td class="bold">Tittel</td>

</tr>

<tr>

<td class="bold" rowspan="10">SvarSendesTil</td>

<td colspan="2">PrivatPerson eller Organisasjon, full adresse må være utfylt. Dette er mottaker som en skal sende til om en vil svare på forsendelsen. Valgfritt å fylle ut. Dette blir brukt som avsender adresse i digital kommunikasjon og på print i posten. Vil overstyre avsender adresse i konfigurasjonen.</td>

</tr>

<tr>

<td class="bold">Navn</td>

<td>Navn på mottaker.</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td class="bold">Adresse1</td>

<td>Adresselinje1</td>

</tr>

<tr>

<td class="bold">Adresse2</td>

<td>Adresselinje2</td>

</tr>

<tr>

<td class="bold">Adresse3</td>

<td>Adresselinje3</td>

</tr>

<tr>

<td class="bold">Postnr</td>

<td>Postnummer</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td class="bold">Poststed</td>

<td>Poststed</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td class="bold">Land</td>

<td>Land</td>

</tr>

<tr>

<td class="bold">Fødselsnr</td>

<td>Må være utfylt om en skal svare til privatperson.</td>

</tr>

<tr>

<td class="bold">Orgnr</td>

<td>Må være utfylt om en skal svare til en organisasjon.</td>

</tr>

</tbody>

</table>

#### retrieveForsendelseStatus

Henter status for en forsendelse. En forsendelse kan ha en av tilstandene beskrevet under:

##### Tilstander (normalløp):

<dl class="dl-horizontal">

<dt>Mottatt</dt>

<dd>Et kall mottatt på forsendelses-service. En id blir tildelt forsendelsen.</dd>

<dt>Akseptert</dt>

<dd>Meldingen er validert og forsendelsesfil dannet.</dd>

<dt>Klar for mottak</dt>

<dd>Venter på at forsendelse skal bli lastet ned av mottaker.</dd>

<dt>Varslet</dt>

<dd>Et varsel om forsendelsen er sendt til varslingstjenesten.</dd>

<dt>Lest</dt>

<dd>En forsendelse er lest når hele forsendelsesfilen er lastet ned av mottaker.</dd>

<dt>Sendt print</dt>

<dd>Forsendelsen er blitt overført til printleverandør.</dd>

<dt>Sendt digitalt</dt>

<dd>Forsendelsen er motatt og sendt slik den skal. Ikke blitt lest enda. Forsendelser med denne status vil kun leveres digitalt, og vil aldri gå til print.</dd>

<dt>Sendt SDP</dt>

<dd>Forsendelsen er motatt og sendt til Sikker digital postkasse.</dd>

<dt>Levert SDP</dt>

<dd>Forsendelsen er motatt og sendt til Sikker digital postkasse. Vi har motatt Leveringskvittering fra SDP. Forsendelsen skal da være tilgjengelig for mottaker.</dd>

<dt>Printet</dt>

<dd>Printkvittering mottatt fra printleverandør eller manuell print bekreftet(via webgrensesnitt).</dd>

</dl>

##### Tilstander (unntak):

<dl class="dl-horizontal">

<dt>Avvist</dt>

<dd>Forsendelsen er ikke validert pga. manglende/korrupt metadata, eller fordi forsendelsesfil ikke kunne dannes.</dd>

<dt>Manuelt håndtert</dt>

<dd>Forsendelsen er manuelt avsluttet, f.eks. pga en feilsituasjon.</dd>

</dl>

#### retrieveForsendelseStatuser

Henter status for flere forsendelseer. Returnerer liste med status, når status oppstod og forsendelseid.

<dl class="dl-horizontal">

<dt>forsendelseid</dt>

<dd>Id på forsendelsen.</dd>

<dt>sisteStatusEndring</dt>

<dd>Når statusen endret seg sist</dd>

<dt>ForsendelseStatus</dt>

<dd>Siste forsendelse status</dd>

</dl>

#### retrieveForsendelseHistorikk

Henter historikk for en forsendelse. Returnerer en liste med beskrivelse av hva som har skjedd og når det inntraff. Listen tilsvarer ekspederingsloggen i forsendelsesoversikten.

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

#### setForsendelseLestAvEksterntSystem

Setter status for en forsendelse til lest basert på forsendelsesId. Benyttes for å sette status til lest når dokumentet har blitt lest utenfor vårt system.

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

<td class="bold">Forsendelsesid</td>

<td colspan="2">Identifikator som unikt identifiserer en forsendelse.</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td class="bold">Fødselsnummer</td>

<td colspan="2">Fødselsnummer til brukeren som har lest forsendelsen.</td>

<td>Ikke tomt og 11 siffer langt</td>

</tr>

<tr>

<td class="bold">navnPaEksterntSystem</td>

<td colspan="2">Navn til det eksterne systemet som håndterte lesingen av forsendelsen.</td>

</tr>

<tr>

<td class="bold">datoLest</td>

<td colspan="2">Dato og tidpunkt som forsendelsen ble lest på. Hvis blank settes den til nåtid.</td>

</tr>

</tbody>

</table>

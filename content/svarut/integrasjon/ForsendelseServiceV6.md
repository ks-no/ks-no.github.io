---
title: ForsendelseServiceV6
date: 2017-01-01
---

### Tilgang

For å benytte web-tjenesten må en bruke HTTP Basic autentication med brukernavn(avsendernavn) og service-passord. Avsender opprettes av KS-SvarUt administrator/organisasjons administrator. Service-passordet genereres av avsender-ansvarlig via [konfigurasjon](https://svarut.ks.no/konfigurasjon/)-siden.

### Tjenester

Forsendelsesservicet tilbyr følgende funksjonalitet:

| Operasjon                          | Inndata                                                                             | Utdata                 | Kort beskrivelse                                                                                         |
|------------------------------------|-------------------------------------------------------------------------------------|------------------------|----------------------------------------------------------------------------------------------------------|
| sendForsendelse                    | Forsendelse                                                                         | forsendelsesid         | Hovedtjeneste som sender inn forsendelse til ekspedering av KS-SvarUt.                                   |
| retrieveForsendelseStatus          | forsendelsesid                                                                      | ForsendelseStatus      | Henter status for en forsendelse.                                                                        |
| retrieveForsendelseStatuser        | List\<forsendelsesid\>                                                              | List\<StatusResult\>   | Henter status for flere forsendelseer. Returnerer liste med status, når status oppstod og forsendelseid. |
| retrieveForsendelseHistorikk       | forsendelsesid                                                                      | ForsendelseHistorikk   | Henter historikk for en forsendelse, tilsvarer ekspederingsloggen i forsendelsesoversikten.              |
| retrieveForsendelseIdByEksternRef  | eksternref                                                                          | List\<forsendelsesid\> | Henter liste med forsendelseider som har denne eksternRef.                                               |
| setForsendelseLestAvEksterntSystem | forsendelsesid,<br/> lestAvFodselsnummer,<br/> navnPaEksterntSystem, <br />datoLest | (Ingen retur)          | Benyttes for å sette status til lest når dokumentet har blitt lest utenfor vårt system.                  |

Definisjonsfil (WSDL) for tjenesten finnes her https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV6?wsdl

#### sendForsendelse
SendForsendelse for ekspedering i SvarUt. Hvis du får HTTP 200 ok er forsendelsen er mottat og akseptert av SvarUt. Dette betyr at vi da vil garantere levering til mottaker (kunDigital har ikke garantert levering). Hvis det skulle oppstå problemer vil avsender bli kontaktet. Dette betyr at jobben til avleverende system nå er ferdig.

Feilmeldinger på tjeneste skal kunne presenteres for bruker. Det kan komme tekniske feilmeldinger, men da er disse greit å vise hvis de skal kontakte SvarUt for hjelp.

Følgende metadata inkluderes:

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

<td rowspan="10">Mottaker</td>

<td colspan="2">PrivatPerson eller Organisasjon, full adresse må være utfylt, for sending til Altinn må orgnr/fødselsnr være utfylt. Støtte for utenlandske adresser.</td>

</tr>

<tr>

<td>Navn</td>

<td>Navn på mottaker.</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td>Adresse1</td>

<td>Adresselinje1</td>

</tr>

<tr>

<td>Adresse2</td>

<td>Adresselinje2</td>

</tr>

<tr>

<td>Adresse3</td>

<td>Adresselinje3</td>

</tr>

<tr>

<td>Postnr</td>

<td>Postnummer</td>

<td>Må være utfylt, 4 tall for norske adresser</td>

</tr>

<tr>

<td>Poststed</td>

<td>Poststed</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td>Land</td>

<td>Land</td>

</tr>

<tr>

<td>Fødselsnr</td>

<td>Hvis Privat, må være utfylt for å kunne levere til altinn.</td>

</tr>

<tr>

<td>Orgnr</td>

<td>Hvis organisasjon, må være utfylt for å kunne levere til altinn.</td>

</tr>

<tr>

<td>Avgivende system</td>

<td colspan="2">Identifikator som identifiserer systemet som gjør web-service kallet, vil blant annet kunne benyttes for statistikk og feilsøking. Bruk følgende for sak/arkivsystemene: Doculive, Ephorte, ESA, 360 og Websak. For andre fagsystemer avtales dette med KS KommIT på [svarut@ks.no](mailto:svarut@ks.no). Obligatorisk felt.</td>

</tr>
<tr>

<td>dokumentType - blir endret til forsendelseType i nyere versjoner</td>

<td colspan="2">Fritekst felt for å kunne identifisere forsendelse type. Dette feltet blir ikke brukt til noe i dag, men vil bli søkbart og tilgengelig i SvarInn.

</td>

</tr>

<tr>

<td>eksternref</td>

<td colspan="2">Ekstern id for forsendelsen, ingen sjekk på innhold i SvarUt. Det vil komme mulighet for å hente ut forsendelser i søk og via api på eksternref.
</td>

</tr>


<tr>

<td>Tittel</td>

<td colspan="2">Tittel på forsendelsen. Tittel blir vist i tittelfeltet på melding til Altinn, og i listen over innkommende meldinger.</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td>Konteringskode</td>

<td colspan="2">Kode som beskriver faktureringskonto for forsendelsen. Kan benyttes for å gruppere meldingsstatistikk gjennom forvaltningsløsningen, og sendes videre til print-leverandør.</td>

<td>^[a-zA-Z0-9\-\.øæåØÆÅ]{0,20}$</td>

</tr>

<tr>

<td>Printkonfigurasjon</td>

<td colspan="2">Konfigurasjon for hvordan dokumentet skal printes, dobbeltsidig, fargeprint, A-Post, B-Post</td>

</tr>

<tr>

<td>KunDigitalLevering</td>

<td colspan="2">Vi leverer kun digitalt, ingen print og postlegging. Hvis dokumentet ikke kan leveres digital blir det ikke levert. Hvis KunDigitalLevering er valgt må fødselsnr eller orgnr være utfylt.</td>

</tr>

<tr>

<td>kryptert</td>

<td colspan="2">Settes til true dersom fil(ene) som sendes er kryptert. Dersom kryptering ikke er brukt må denne være satt til false. Se kodeeksempler for eksempel på kryptering. Det må være kryptert med CMS med svarut sin publickey. [Den offentlige nøkkelen PROD](https://svarut.ks.no/forsendelse/publickey/hent), [Den offentlige nøkkelen for TEST](https://test.svarut.ks.no/forsendelse/publickey/hent)</td>

</tr>

<tr>

<td>krevNiva4Innlogging</td>

<td colspan="2">Forsendelsen krever nivå 4-innlogging for å kunne lastes ned. Disse forsendelsene må være kryptert.</td>

</tr>

<tr>

<td>svarPaForsendelse</td>

<td colspan="2">Forsendelseid til forsendelse dette er et svar på.</td>

</tr>

<tr>

<td>svarPaForsendelseLink</td>

<td colspan="2">Dersom dette feltet settes til true vil forsendelsen avvises om svarSendesTil ikke inneholder en gyldig adresse med organisasjonsnummer. 
Hvis forsendelsen aksepteres og sendes digitalt, vil det genereres en lenke hvor mottaker kan sende et svar tilbake til adressen spesifisert i svarSendesTil.</td>

</tr>

<tr>

<td rowspan="5">Liste med filer</td>

<td colspan="2">Rekkefølgen er rekkefølgen de kommer i brevet. Total filstørrelse inntil 350MB er støttet når det skal printes. Ellers er det ikke begrensning.</td>

</tr>

<tr>

<td>Filnavn</td>

<td>Filnavn er for intern bruk, må være unikt i en forsendelse.</td>
<td>Max 226 tegn. Må ikke inneholde mappe, kun filnavn. (ingen / eller \) Disse tegnene er også ugyldige " < > ? * | : De har andre funksjoner i windows og kan ikke brukes i filnavn på windows.</td>

</tr>

<tr>

<td>Mimetype</td>

<td>Mimetype på være application/pdf hvis den skal til print. Kun digital levering er valgt kan vi ta imot annet.</td>

<td>Kun application/pdf hvis den skal til print</td>

</tr>

<tr>

<td>Data</td>

<td>Fildata</td>

</tr>

<tr>

<td>GiroarkSider</td>

<td>Liste med sidetall som skal printes på gult giroark. Digital versjon vil få grått giroark. Første side er 1.</td>

</tr>

<tr>

<td rowspan="4">Liste med Lenker</td>

<td colspan="2">Rekkefølgen er samme som de vil komme i brevet. Kan være tom.</td>

</tr>

<tr>

<td>Url lenke</td>

<td>Selve lenken til dokument/nettside</td>

<td>Må være utfylt og være i gyldig lenke format, altså (http/https/ftp)://(nettside).(com/no/ etc)</td>

</tr>

<tr>

<td>Url tekst</td>

<td></td>

<td>Må være utfylt</td>

</tr>

<tr>

<td>Ledetekst</td>

<td>Teksten som kommer før lenken i brevet</td>

</tr>

<tr>

<td rowspan="13">Metadata fra avleverende system</td>

<td colspan="2">Noark5 metadata fra avleverende system, foreløbig oversikt</td>

</tr>

<tr>

<td>Saksekvensnummer</td>

</tr>

<tr>

<td>Saksaar</td>

</tr>

<tr>

<td>Journalaar</td>

</tr>

<tr>

<td>Journalseksvensnummer</td>

</tr>

<tr>

<td>Journalpostnummer</td>

</tr>

<tr>

<td>Journalposttype</td>

</tr>

<tr>

<td>Journalstatus</td>

</tr>

<tr>

<td>Journaldato</td>

</tr>

<tr>

<td>DokumentetsDato</td>

</tr>

<tr>

<td>Tittel</td>

</tr>

<tr>

<td>Saksbehandler</td>

</tr>

<tr>

<td>EkstraMetadata</td>

<td>Liste med key,value for forskjellige behov. Keys må være unique.</td>

</tr>

<tr>

<td rowspan="6">Metadata i mottakende system</td>

<td colspan="2">Noark5 metadata som stemmer med mottakende system. Kan brukes til å legge dokumentet på rett sak. Samme som over.</td>

</tr>

<tr>

<td>Saksekvensnummer</td>

</tr>

<tr>

<td>Saksaar</td>

</tr>

<tr>

<td>Journalposttype</td>

</tr>

<tr>

<td>Journalstatus</td>

</tr>

<tr>

<td>DokumentetsDato</td>

</tr>

<tr>

<td>Tittel</td>

</tr>

<tr>

<td rowspan="10">SvarSendesTil</td>

<td colspan="2">PrivatPerson eller Organisasjon, full adresse må være utfylt. Dette er mottaker som en skal sende til om en vil svare på forsendelsen. Valgfritt å fylle ut. Dette blir brukt som avsender adresse i digital kommunikasjon og på print i posten. Vil overstyre avsender adresse i konfigurasjonen.</td>

</tr>

<tr>

<td>Navn</td>

<td>Navn på mottaker.</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td>Adresse1</td>

<td>Adresselinje1</td>

</tr>

<tr>

<td>Adresse2</td>

<td>Adresselinje2</td>

</tr>

<tr>

<td>Adresse3</td>

<td>Adresselinje3</td>

</tr>

<tr>

<td>Postnr</td>

<td>Postnummer</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td>Poststed</td>

<td>Poststed</td>

<td>Må være utfylt</td>

</tr>

<tr>

<td>Land</td>

<td>Land</td>

</tr>

<tr>

<td>Fødselsnr</td>

<td>Må være utfylt om en skal svare til privatperson.</td>

</tr>

<tr>

<td>Orgnr</td>

<td>Må være utfylt om en skal svare til en organisasjon.</td>

</tr>

</tbody>

</table>

#### retrieveForsendelseStatus

Henter status for en forsendelse. Denne bør bruker når det er behov for å vise status. Tenkt brukt f.eks om saksbehandler lurer på hva som er status på forsendelsen. Status kan endre seg på kort varsel, vi anbefaler derfor å ikke mellomlagre disse verdiene i eget system, men heller hente de når de skal vises.

En forsendelse kan ha en av tilstandene beskrevet under:

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

Henter status for flere forsendelseer. Samme som retrieveForsendelseStatus bare for flere forsendelser i samme kall.
Returnerer liste med status, når status oppstod og forsendelseid.

<dl class="dl-horizontal">

<dt>forsendelseid</dt>

<dd>Id på forsendelsen.</dd>

<dt>sisteStatusEndring</dt>

<dd>Når statusen endret seg sist</dd>

<dt>ForsendelseStatus</dt>

<dd>Siste forsendelse status</dd>

</dl>

#### retrieveForsendelseHistorikk

Henter historikk for en forsendelse. Returnerer en liste med beskrivelse av hva som har skjedd og når det inntraff. Listen tilsvarer ekspederingsloggen i forsendelsesoversikten. Tenkt brukt hvis saksbehandler eller kundestøtte trenger å vite detaljene ved en forsendelse.

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

#### retrieveForsendelseIdByEksternRef

Henter liste med forsendelseider som har denne eksternRef. Forsendelsene må være sendt av avsender som er innlogget.

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

<td class="bold">EksternRef</td>

<td colspan="2">EksternRef, id som identifiserer forsendelsen hos avsender.</td>

<td>Må være utfylt</td>

</tr>

</tbody>

</table>
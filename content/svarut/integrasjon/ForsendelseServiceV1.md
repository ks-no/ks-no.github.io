---
title: ForsendelseServiceV1
---
# ForsendelseServiceV1

Her beskrives funksjonalitet for ForsendelseServiceV1\. For å sikre bakoverkompatibilitet for klientene så vil denne versjonen ikke endres.

### [WSDL](https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV1?wsdl)

### Tilgang

For å benytte Web servicen må en bruke HTTP Basic autentication med brukernavn(avsendernavn) og service-passord. Avsender opprettes av KS-SvarUt administrator/organisasjons administrator og service-passordet genereres av avsender ansvarlig via [konfigurasjon](https://svarut.ks.no/konfigurasjon/)-siden.

### Tjenester

Forsendelsesservicet tilbyr følgende funksjonalitet:

#### sendForsendelse

Hovedtjeneste som sender inn forsendelse til ekspedering av KS-SvarUt. Følgende metadata inkluderes:

<table class="table table-condensed" style="vertical-align: text-top"">

<thead>

<tr>

<th><i>Felt</i></th>

<th colspan="2"><i>Beskrivelse</i></th>

<th><i>Validering</i></th>

</tr>

</thead>

<tbody>

<tr>

<td class="bold" rowspan="9">Mottaker</td>

<td colspan="3">PrivatPerson eller Organisasjon, for sending til Altinn må orgnr/fødselsnr være utfylt.</td>

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

<td class="bold">Fodselsnr</td>

<td>Hvis Privat, må være utfylt for å kunne levere til altinn.</td>

</tr>

<tr>

<td class="bold">Orgnr</td>

<td>Hvis organisasjon, må være utfylt for å kunne levere til altinn.</td>

</tr>

<tr>

<td class="bold">Avgivende system</td>

<td colspan="2">Identifikator som identifiserer systemet som gjør web-service kallet, vil blant annet kunne benyttes for statistikk og feilsøking. Bruk følgende for sak/arkivsystemene: Ephorte, ESA, 360 og Websak. For andre fagsystemer avtales dette med KS KommIT på [svarut@ks.no](mailto:svarut@ks.no). Obligatorisk felt.</td>

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

<td class="bold">Liste med pdf filer</td>

<td colspan="2">Rekkefølgen er rekkefølgen de kommer i brevet. Filnavn er for intern bruk, må være unikt i en forsendelse. Mimetype på være application/pdf. Kun det som blir støttet nå. Total filstørrelse inntil 250MB er støttet.</td>

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

<dt>Varslet</dt>

<dd>Et varsel om forsendelsen er sendt til varslingstjenesten.</dd>

<dt>Lest</dt>

<dd>En forsendelse er lest når hele forsendelsesfilen er lastet ned av mottaker.</dd>

<dt>Sendt print</dt>

<dd>Forsendelsen er blitt overført til printleverandør.</dd>

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
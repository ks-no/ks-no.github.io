---
title: Signeringstjeneste
date: 2017-01-01
hidden: false
aliases: [/tjenester/svarut/api-versjoner/Signeringstjeneste]
---
## Aktivering
Avtale om bruk av signeringstjenesten må gjøres med Digdir og forutsetter at dere allerede har avtale om SDP. Når avtalene er inngått må dere aktivere tjenesten inne på [konfigurasjon](https://svarut.ks.no/konfigurasjon/#/) under SDP-fanen.

<a name="api"></a>
### API
Bruker operasjonen _**sendForsendelse**_, i ForsendelseServiceV7 eller senere.

Følgende eksisterende felter må fylles ut:

* **/sendForsendelse/forsendelse/krevNiva4Innlogging** - Angir hvilket nivå som skal brukes på signeringen
* **/sendForsendelse/forsendelse/svarSendesTil[@Type=organisasjon]/orgnr** - Organisasjonsnummer til enhenten som skal ha det signerte dokumentet i retur
* **/sendForsendelse/forsendelse/mottaker[@Type=privatPerson]/fodselsnr** - Fødselsnummer på mottaker av signeringsoppdraget

Følgende nye felter må også fylles ut:

* **/sendForsendelse/forsendelse/signeringUtloper** - Angi hvor lenge signeringsoppdraget er gyldig, minimum 1 dag.
* **/sendForsendelse/forsendelse/signaturtype** - Velge mellom autentisert eller avansert signering.
* **/sendForsendelse/forsendelse/dokumenter/skalSigneres** - Markere ett dokument som inngår i signeringsoppdraget

## Via send forsendelse
Brukergrensesnittet er oppdatert slik at man kan markere et dokument og angi utløpsdato.

<a name="Sekvensdiagrammer"></a>
### Sekvensdiagrammer
#### Fra fagsystem via Svarut til innbygger
![alternative text](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/ks-no/svarut-dokumentasjon/master/signering/puml/fagsystem.puml?2)

Innføringen av signeringsoppdrag gir ingen endringer i oppførsel utover validering. Varslig vil gå ut til Altinn eller SDP dersom innbygger ikke har reservert seg. Dersom innbygger ikke har åpnet Altinn innen lesefristen vil brev gå ut i posten.

Innbygger kan signere elektronisk frem til gyldigheten på signeringsoppdraget utløper, selv om brevet er sendt i posten.
  
### Fra innbygger via Digipost og Svarut til fagsystem
![alternative text](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/ks-no/svarut-dokumentasjon/master/signering/puml/innbygger.puml?2)

Innbygger logger på Altinn/SDP og trykker på signeringslenken som er oppgitt i meldingen. Dette er en lenke til Svarut. Svarut vil validere og sjekke at det er et gyldig signeringsoppdrag. 

Innbygger får opp dokumentet og kan velge mellom å signere eller avvise. Dersom innbygger signerer opprettes det en ny forsendelse til det organisasjonsnummeret som er oppgitt i forsendelsen. 

Dersom innbygger avviser oppdraget vil oppdraget ikke være mulig å signere på nytt. Dersom innbygger avbryter (lukker nettleser e.l.) er det likevel mulig å signere gitt at gyldigheten på signeringsoppdraget ikke er utløpt.

Oppdragsgiver vil bare få forsendelse i retur dersom mottaker signerer forsendelsen og kan sjekke status på om oppdraget er avvist.

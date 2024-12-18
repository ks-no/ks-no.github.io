---
title: Maskinporten
date: 2020-06-09
aliases: ["/fiks-platform/difiidportenklient", "/fiks-plattform/difiidportenklient"]
---
## Ta i bruk maskinporten
For å ta i bruk maskinporten må man gjøre følgende:
- Avtale med Digdir om bruk av maskinporten
- Virksomhetssertifikater for test- og produksjonsmiljøet
- Sendt e-post til fiks-utvikling@ks.no hvor dere informerer om at det er inngått en avtale med Digdir om bruk av maskinporten og hvilket organisasjonsnummer det gjelder
- Opprett maskinporten-klient hos Digdir

Les videre for beskrivelser om hvordan man kan få dette på plass. 

### Godkjenne bruksvilkår for bruk av maskinporten

En må først ha godkjent bruksvilkår hos Digdir. Det har de fleste kommuner: https://samarbeid.digdir.no/digital-postkasse/bruksvilkar-offentlige-kunder/70

### Virksomhetssertifikat
Man må ha virksomhetsertifikat fra Commfides eller Buypass. Test sertifikat for test og vanlig for produksjon.
Husk å registrere virksomhetssertifikat med samme organisasjonsnummer som man vil bruke hos maskinporten og eventuelt tjenster hos KS som f.eks. [Fiks-Protokoll](https://developers.fiks.ks.no/fiks-plattform/tjenester/fiksprotokoll/) og [Fiks-IO](https://developers.fiks.ks.no/fiks-plattform/tjenester/fiksprotokoll/fiksio/).

### Opprette maskinporten-klient
- Husk å sende e-post til fiks-utvikling@ks.no med organisasjonsnummeret, slik at vi blant annet får gitt tilgang til "ks:fiks"-scopet.
Det er mulig å fullføre opprettelsen av maskinport-klient uten at dette er på plass, men det må etterregistreres for å få klienten til å virke på Fiks-plattformen.
- Gå til https://sjolvbetjening.samarbeid.digdir.no/
- Logg inn
- Velg "Gå til integrasjoner", for ver2 for test. Produksjon for prod.
 ![Idporten](../../Tjenester/images/difi-selvbetjening1.png "")
- velg "Ny integrasjon"
 ![Idporten](../../Tjenester/images/difi-selvbetjening2.png "")
- Sett Integrasjon for: for egen virksomhet -> integrasjonstype = maskinporten,  -> velg scopes,  Der skal du se ks:fiks i lista.
- client_name: til et navn som passer
- Digdir-tjeneste: Maskinporten (for personinnlogging må du kontakte idporten@difi.no)
- legg til scopes: ks:fiks ( Vises ikke dette har vi ikke fått korrekt org.nr fra dere, send det til fiks-utvikling@ks.no)
- grant_types: urn:ietf:params:oauth:grant-type:jwt-bearer må være valgt
- token_endpoint_auth_method: private_key_jwt 
![Idporten](../../Tjenester/images/difi-selvbetjening3.png "")
- lagre -> Da får du client_id.
![Idporten](../../Tjenester/images/difi-selvbetjening4.png "")

- Hvis du skal ha personinnlogging med ks:fiks scope må du sende en henvendelse til servicedesk@digdir.no


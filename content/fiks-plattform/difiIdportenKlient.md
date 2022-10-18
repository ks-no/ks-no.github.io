---
title: Hvordan lage klient hos maskinporten
date: 2020-06-09
aliases: [/fiks-platform/difiidportenklient]
---
For å ta i bruk maskinporten må dere ha:
- Avtale med Digdir om bruk av maskinporten
- Virksomhetssertifikater for test- og produksjonsmiljøet
- Sendt e-post til fiks-utvikling@ks.no hvor dere informerer om at det er inngått en avtale med Digdir om bruk av maskinporten og hvilket organisasjonsnummeret det gjelder

# Godkjenne bruksvilkår for bruk av maskinporten
- En må først ha godkjent bruksvilkår hos Digdir. Det har de fleste kommuner: https://samarbeid.digdir.no/digital-postkasse/bruksvilkar-offentlige-kunder/70

# Virksomhetssertifikat
- Dere må ha virksomhetsertifikat fra Commfides eller Buypass. Test sertifikat for test og vanlig for produksjon.

# Opprette maskinporten-klient
- Husk å sende e-post til fiks-utvikling@ks.no med organisasjonsnummeret. Det er mulig å fullføre opprettelsen av maskinport-klient uten at dette er på plass, men det må etterregistreres for å få klienten til å virke på Fiks-plattformen.
- Gå til https://selvbetjening-samarbeid-prod.difi.no/
- logg inn
- velg "Gå til integrasjoner", for ver2 for test. Produksjon for prod.
 ![Idporten](../images/difi-selvbetjening1.png "")
- velg "Ny integrasjon"
 ![Idporten](../images/difi-selvbetjening2.png "")
- Sett Integrasjon for: for egen virksomhet -> integrasjonstype = maskinporten,  -> velg scopes,  Der skal du se ks:fiks i lista.
- client_name: til et navn som passer
- Digdir-tjeneste: Maskinporten (for personinnlogging må du kontakte idporten@difi.no)
- legg til scopes: ks:fiks ( Vises ikke dette har vi ikke fått korrekt org.nr fra dere, send det til fiks-utvikling@ks.no)
- grant_types: urn:ietf:params:oauth:grant-type:jwt-bearer må være valgt
- token_endpoint_auth_method: private_key_jwt 
![Idporten](../images/difi-selvbetjening3.png "")
- lagre -> Da får du client_id.
![Idporten](../images/difi-selvbetjening4.png "")

- Hvis du skal ha personinnlogging med ks:fiks scope må du sende en henvendelse til servicedesk@digdir.no


---
title: Hvordan lage klient hos idporten
date: 2020-06-09
aliases: [/fiks-platform/difiidportenklient]
---
- En må først ha godkjent bruksvilkår hos difi. Det har de fleste kommuner: https://samarbeid.difi.no/felleslosninger/maskinporten/ta-i-bruk-maskinporten/1-planlegge-og-akseptere-bruksvilkar
- Dere må ha virksomhetsertifikat fra Commfides eller Buypass. Test sertifikat for test og vanlig for produksjon.
- Gå til https://selvbetjening-samarbeid.difi.no/#/
- logg inn
- velg "Gå til integrasjoner", for ver2 for test. Produksjon for prod.
 ![Idporten](../images/difi-selvbetjening1.png "")
- velg "Ny integrasjon"
 ![Idporten](../images/difi-selvbetjening2.png "")
- Sett Integrasjon for: for egen virksomhet -> integrasjonstype = maskinporten,  -> velg scopes,  Der skal du se ks:fiks i lista.
- client_name: til et navn som passer
- Difi-tjeneste: Maskinporten (for personinnlogging må du kontakte idporten@difi.no)
- legg til scopes: ks:fiks ( Vises ikke dette har vi ikke fått korrekt org.nr fra dere, send det til fiks-utvikling@ks.no)
- grant_types: urn:ietf:params:oauth:grant-type:jwt-bearer må være valgt
- token_endpoint_auth_method: private_key_jwt 
![Idporten](../images/difi-selvbetjening3.png "")
- lagre -> Da får du client_id.
![Idporten](../images/difi-selvbetjening4.png "")

- Hvis du skal ha personinnlogging med ks:fiks scope må du sende en henvendelse til servicedesk@digdir.no


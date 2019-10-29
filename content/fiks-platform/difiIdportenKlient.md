
---
title: Hvordan lage klient hos ID-porten
date: 2019-09-19
---

- Du må ha Maskinporten/OpenID Connect konto hos ID-porten i ver2 miljøet. (Dere må ha virksomhetsertifikat for test fra Commfides eller Buypass)
- gå til https://selvbetjening-samarbeid.difi.no/#/
- logg inn
- velg "Gå til integrasjoner", for ver2 for test. Produksjon for prod.
 ![Idporten](../images/idporten1.png "")
- velg "Ny integrasjon"
 ![Idporten](../images/idporten2.png "")
- Sett Integrasjon for: for egen virksomhet -> integrasjonstype = maskinporten,  -> velg scopes,  Der skal du se ks:fiks i lista.
- client_name: til et navn som passer
- Difi-tjeneste: Maskinporten (for personinnlogging må du kontakte idporten@difi.no)
- legg til scopes: ks:fiks ( Vises ikke dette har vi ikke fått korrekt org.nr fra dere, send det til fiks-utvikling@ks.no)
- grant_types: urn:ietf:params:oauth:grant-type:jwt-bearer må være valgt
- token_endpoint_auth_method: private_key_jwt 
![Idporten](../images/idporten3.png "")
- lagre -> Da får du client_id.
![Idporten](../images/idporten4.png "")

- Hvis du skal ha personinnlogging med ks:fiks scope må du sende en henvendelse til idporten@difi.no
- For produksjon må dere følge rutina her: https://samarbeid.difi.no/felleslosninger/maskinporten/ta-i-bruk-maskinporten/1-planlegge-og-akseptere-bruksvilkar

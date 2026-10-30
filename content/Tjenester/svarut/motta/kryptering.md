---
title: Kryptering
description: "Nøkkelpar for mottakersystem og dekryptering av forsendelser fra SvarInn."
weight: 30
---

Alle filer som lastes ned med SvarInn er kryptert med den offentlige nøkkelen til mottakersystemet. Det gjelder alle forsendelser, også de på nivå 3. Mottakersystemet dekrypterer med sin private nøkkel.

## Lage nøkkelpar

Lag et RSA-nøkkelpar og et selvsignert sertifikat med OpenSSL:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout privatekey.pem -out public.pem -days 99999
```

På Windows kan du bruke for eksempel [Win32/Win64 OpenSSL](https://slproweb.com/products/Win32OpenSSL.html). Legg til `-config` med stien til `openssl.cfg`:

```bat
openssl req -x509 -newkey rsa:2048 -nodes -keyout privatekey.pem -out public.pem -days 99999 -config C:\<installasjonsmappe>\bin\openssl.cfg
```

- `public.pem` lastes opp på mottakersystemet i SvarUt, under fanen «Service». Det krever innlogging på nivå 4.
- `privatekey.pem` blir i systemet som laster ned forsendelsene. Del den ikke med andre.

## Dekryptere

Filen fra `GET /svarinn/v2/forsendelser/{forsendelseId}` er kryptert med CMS (Cryptographic Message Syntax). Dekrypter den med den private nøkkelen, for eksempel med OpenSSL:

```bash
openssl cms -decrypt -inform DER -in forsendelse.zip.enc -inkey privatekey.pem -out forsendelse.zip
```

For Java og andre JVM-språk kan du bruke [kryptering](https://github.com/ks-no/kryptering), som SvarUt selv bruker til å kryptere filene.

Se også [Sikkerhet](/tjenester/svarut/sikkerhet/).

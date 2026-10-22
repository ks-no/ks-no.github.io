---
title: Kom i gang
description: "Maskinporten, Fiks-integrasjon og tilgang til SvarUt-kontoen, steg for steg."
weight: 10
---

Denne siden er for deg som skal lage en ny integrasjon mot SvarUt REST v2/v3. Skal du hente post til en virksomhet, se [Motta post med SvarInn](/tjenester/svarut/motta/). Den bruker en annen type tilgang.

## Slik henger tilgangen sammen

![Fagsystemet henter token fra Maskinporten og kaller SvarUt med token, integrasjons-id og passord. Kommunen setter opp integrasjonen i Fiks forvaltning.](/images/svarut/SvarUt-autentisering-maskinporten.png)

Et kall til SvarUt må ha tre ting:

| Hva | Hvor det kommer fra |
|---|---|
| Access token fra Maskinporten, med scopet `ks:fiks` | Leverandørens Maskinporten-klient |
| Integrasjons-id og passord | Fiks-integrasjonen kommunen oppretter i Fiks forvaltning |
| Tilgang til SvarUt-kontoen | Kommunen gir integrasjonen tilgang i Fiks forvaltning |

Dette er felles for hele Fiks-plattformen og er forklart nøye på [Integrasjoner](/felles/integrasjoner/). Les den først.

## Steg for steg

1. **Avtale.** Kommunen eller virksomheten har avtale med KS Digital om SvarUt.
2. **Maskinporten.** Leverandøren har en Maskinporten-klient med scopet `ks:fiks`, én for test og én for produksjon. Se [Maskinporten](/felles/integrasjoner/#maskinporten).
3. **Fiks-integrasjon.** Kommunen oppretter en integrasjon i Fiks forvaltning med leverandørens organisasjonsnummer som autorisert organisasjon.
4. **Tilgang til kontoen.** Kommunen gir integrasjonen tilgang til å sende på SvarUt-kontoen (avsenderen) som skal brukes. Den samme tilgangen gjelder for alle SvarUt-API-ene: sende, status, hendelser, lest, slett, metadata og ekstern referanse.
5. **Konto-id.** Finn id-en til SvarUt-kontoen i Fiks forvaltning. Den er en UUID og står i URL-en til alle kall: `/api/v3/kontoer/{kontoId}/...`.
6. **Test.** Send en forsendelse i [testmiljøet](/tjenester/svarut/testmiljo/), og sjekk at den får status `AKSEPTERT` og deretter går videre.

Bruker dere SOAP eller REST v1 i dag, kan dere hoppe over steg 3–5. [Migreringsendepunktet](/tjenester/svarut/migrering/) oppretter integrasjonen og gir den tilgang for dere.

## Første kall

```bash
curl https://test.svarut.ks.no/api/v3/kontoer/<konto-id>/forsendelser/status/sok \
  -X POST \
  -H "Authorization: Bearer <access token fra Maskinporten>" \
  -H "IntegrasjonId: <integrasjons-id>" \
  -H "IntegrasjonPassord: <passord>" \
  -H "Content-Type: application/json" \
  -d '{"id": []}'
```

Kallet søker etter status for en tom liste med forsendelser. Svarer SvarUt med `200` og `{"statuser": []}`, er tilgangen i orden. Får du `401`, er det tokenet eller integrasjonen som er feil. Får du `403`, mangler integrasjonen tilgang til kontoen. Se [Når det ikke virker](/felles/integrasjoner/#nar-det-ikke-virker).

Så kan du [sende en forsendelse](/tjenester/svarut/sende/).

## Klientbibliotek

For Java og andre JVM-språk finnes [fiks-svarut-klient](https://github.com/ks-no/fiks-svarut-klient), som KS Digital selv bruker. Den er bygget på OpenAPI-spesifikasjonene og ligger på [Maven Central](https://central.sonatype.com/artifact/no.ks.fiks/fiks-svarut-klient).

Lager du din egen klient, kan du generere den fra [spesifikasjonene](/tjenester/svarut/api-versjoner/). Unntaket er sende-API-et, som bruker multipart-request. Generatorer får ofte dette feil, så skriv den delen selv. Se [Dokumenter og vedlegg](/tjenester/svarut/sende/dokumenter/).

---
title: Fiks eiendomsavtaler
date: 2026-10-01
aliases: [/fiks-platform/tjenester/eiendomsavtaler/, /fiks-plattform/tjenester/eiendomsavtaler/]
---
## Kort beskrivelse
**Felles grunnlag for fakturering av kommunale gebyrer.**

Fiks eiendomsavtaler gir kommunen ett register over eiendomsavtaler som for eksempel fagsystemene for vann og avløp, feiing, renovasjon og eiendomsskatt kan fakturere etter. I dag har hvert fagsystem gjerne sin egen kopi av matrikkeldata. Med Fiks eiendomsavtaler hentes matrikkeldataene ett sted, og alle kommunens fagsystemer får det samme grunnlaget.

Oslo kommune er pilotkommune.

## Hvordan det fungerer

- Hver matrikkelenhet i kommunen får automatisk en eiendomsavtale (hovedavtale). Hovedavtalen holdes fortløpende oppdatert mot matrikkelen med eiendom, eierforhold og adresser.
- Kommunen kan i tillegg opprette særavtaler manuelt. Disse oppdateres ikke fra matrikkelen.
- Saksbehandlere i kommunen beriker avtalene med opplysninger som ikke finnes i matrikkelen, som eierkontakt, fakturamottaker, merknader og avtalestatus.
- Fagsystemene henter avtalene fra Fiks eiendomsavtaler, og trenger ingen egen integrasjon mot Kartverket.
- Endringer på avtalene og historikk lagres også.

## Tilgjengelige grensesnitt

| Type              | Detaljer                                                                                                                                          |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Web portal        | For saksbehandlere i kommunen gjennom Fiks forvaltning                                                                                            |
| Maskin til maskin | [Eiendomsavtaler offentlig API (v1)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/eiendomsavtaler-offentlig-api-v1.json) |
| Autentisering     | Maskinporten og [integrasjon]({{% ref "integrasjoner.md" %}}#integrasjon)                                                                         |

API-et lar fagsystemer:

- hente alle avtaler i en kommune, og deretter bare det som er endret siden sist.
- hente én avtale,
- søke etter avtaler på matrikkelnummer, eierkontakt eller fakturamottaker.

### Hente endringer

Hver endring på en avtale gir avtalen et nytt `sekvensnummer`. Et fagsystem holder seg oppdatert slik:

1. Kall `GET /eiendomsavtaler/offentlig/api/v1/{fiksOrgId}/eiendomsavtaler?kommunenummer={kommunenummer}` uten `fraSekvensnummer` for å starte fra begynnelsen.
2. Lagre høyeste `sekvensnummer` i svaret.
3. Kall på nytt med `fraSekvensnummer` satt til lagret verdi + 1. Gjenta til svaret er tomt.
4. Dette kan gjøres på nytt senere med høyeste `sekvensnummer` lagret fra forrige kjøring, for å hente nye endringer.

`antall` styrer sidestørrelsen (standard 100, maks 1000).

## Kom i gang

1. Sett opp en integrasjon med Maskinporten som beskrevet i [felles dokumentasjon om integrasjoner]({{% ref "integrasjoner.md" %}}). Kall må ha et Maskinporten-token med scope `ks:fiks` og headerne `IntegrasjonId` og `IntegrasjonPassord`.
2. En administrator i kommunen gir integrasjonen tilgang til Fiks eiendomsavtaler for kommunen i [Fiks Forvaltning](https://forvaltning.fiks.ks.no/). Lesetilgang er nok for API-et.
3. Integrer mot [API-et](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/eiendomsavtaler-offentlig-api-v1.json). `{fiksOrgId}` i URL-en er organisasjonen kallet gjøres på vegne av.

| Miljø      | URL                                                            |
|------------|----------------------------------------------------------------|
| Produksjon | `https://api.fiks.ks.no/eiendomsavtaler/offentlig/api/v1`      |
| Test       | `https://api.fiks.test.ks.no/eiendomsavtaler/offentlig/api/v1` |

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

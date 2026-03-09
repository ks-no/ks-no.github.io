---
title: Fiks nav hjelpemiddel API
date: 2026-03-09
alias: [/fiks-plattform/tjenester/fiks-nav-hjelpemiddel-api/]
---

## Kort beskrivelse
Fiks Nav hjelpemiddel gir tilgang til api hos nav via Fiks plattformen. Tjenesten benyttes mot kommunens løsning for lager, logistikk og samhandling på hjelpemiddelområdet.

## Tilgjengelige grensesnitt
| Grensesnitt | Støtte |
|------|------|
| Web portal | Nei |
| Maskin til maskin | [Api-spec](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/nav-hjelpemiddel-v3.yaml) |

## Produktbeskrivelse
Om Fiks Nav hjelpemiddel
Integrasjon (API) for å dele data fra NAV til kommunen sitt fagsystem. Dele status på utleveringer tilbake til NAV)

For å ta i bruk dette apiet må mottakerløsning innfri de juridiske kravene nedfelt i avtale med Nav.

Med dette APIet vil kommunen få tilgang til følgende i kommunens lager og logistikkløsning på hjelpemiddelområdet:

Søknader
* Leveringer fra Nav
* Se oversikt over alle digitale søknader som er sendt fra kommunen
* Be om innsyn i en annen bestillers søknad ved tjenstlig behov
* Se hastesak og begrunnelse
* Leveringer fra Nav
* Kommunen vil få en oversikt over kommende leveringer fra NAV
* Kommunen vil automatisk få opprettet mottaksordre, slik at informasjon om bruker og hva de skal ha utlevert av hjelpemidler er knytt sammen
* Brukernummer og fødselsnummer er knyttet sammen, slik at man slipper å manuelt å søke opp brukere

## Integrasjon [(api-spec)](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/innreise-api-v1.json)
Autentisering skjer ved hjelp av en Integrasjon-mekanismen beskrevet [her](https://ks-no.github.io/fiks-plattform/integrasjoner/#integrasjon)

## Testdata
I test er det lite data.
Logistikk endepunktet krever et kjent kommunenr blant: 5616, 1505, 1506, 1579, 3207, 4601, 0301
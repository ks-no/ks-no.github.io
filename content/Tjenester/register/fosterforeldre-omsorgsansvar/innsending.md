---
title: Innsending av omsorgsansvar
date: 2026-10-02
---

## Velg operasjon

Velg operasjonen som svarer til endringen, og kall det tilhørende endepunktet i Fiks-API-et med en JSON-forespørsel. Se [API-spesifikasjonen](https://github.com/ks-no/fiks-register-fosterforeldre-produsent-spec/blob/main/register-fosterforeldre-produsent.json) for request- og responsskjemaene.

| Operasjon i Fiks-API-et | Brukes når | Betydningen av `gyldighetsdato` |
|------------------------|------------|----------------------------------|
| `POST /api/v1/omsorgsansvar/endre` | Ny relasjon mellom barn og fosterforelder registreres | Dato omsorgsansvaret gjelder fra |
| `POST /api/v1/omsorgsansvar/korrigere` | Fra-datoen for en eksisterende relasjon må rettes | Korrigert gyldig-fra-dato |
| `POST /api/v1/omsorgsansvar/opphoere` | Relasjonen avsluttes, eller til-datoen på den nyeste relasjonen rettes | Dato omsorgsansvaret opphører |
| `POST /api/v1/omsorgsansvar/annullere` | En registrering aldri skulle vært gyldig | Påkrevd i forespørselen, men uten praktisk betydning |
| `POST /api/v1/omsorgsansvar/overfoere` | Ansvarlig barnevernstjeneste endres | Dato overføringen gjelder fra |

`korrigere` kan ikke rette barn, fosterforelder, ansvarlig barnevernstjeneste eller til-dato. Ved feil person eller ansvarlig tjeneste: annuller registreringen og send eventuelt ny `endre`. `opphoere` kan også rette til-datoen på en relasjon som allerede er historisk. Ved `overfoere` skal dagens ansvarlige tjeneste være innsender, og den nye tjenesten oppgis som ansvarlig; send én melding per gjeldende relasjon.

For `endre`, `korrigere`, `opphoere` og `overfoere` skal datoen ikke ligge i fremtiden. Opphør og overføring skal tidligst meldes den dagen endringen gjelder fra. Se [brukseksempler]({{% ref "brukseksempler.md" %}}) for situasjoner med flere meldinger.

## Forespørselen til Fiks-API-et

Hver operasjon har et eget endepunkt og et eget request-skjema i OpenAPI. I gjeldende kontraktsutkast peker alle fem skjemaene til samme grunnmodell, men operasjonen og betydningen av datoen bestemmes av endepunktet. I JSON-bodyen oppgir klienten egen meldingsidentifikator (UUID), saksreferanse, kildesystem, gyldighetsdato, innsendende barnevernstjeneste, fosterbarn, fosterforelder og ansvarlig barnevernstjeneste. Se [OpenAPI på GitHub](https://github.com/ks-no/fiks-register-fosterforeldre-produsent-spec/blob/main/register-fosterforeldre-produsent.json) for nøyaktige feltnavn og datatyper.

- `avsendersMeldingsidentifikator` skal være en unik UUID for hver **ny** innsending og brukes som idempotensnøkkel.
- `avsendersSaksreferanse` er påkrevd. Oppgi din egen saksreferanse; samme verdi returneres i tilbakemeldingen.
- `kildesystem` er navnet på fagsystemet. `gyldighetsdato` oppgis som dato i formatet `YYYY-MM-DD`.
- `foedselsEllerDNummer` for barnet og fosterforelderen har 11 siffer. Organisasjonsnummeret til barnevernstjenesten har 9 siffer.

## Kvittering, retry og feil

`202 Accepted` med `status: MOTTATT` bekrefter bare at Fiks har tatt imot meldingen. `saksnummer` er normalt først kjent når Folkeregisteret har behandlet meldingen. Sjekk alltid [tilbakemeldingene]({{% ref "tilbakemeldinger.md" %}}), også etter vellykket innsending: meldingen kan bli avvist senere.

Ved timeout uten kvittering kan samme melding sendes på nytt med **samme** `avsendersMeldingsidentifikator`. Ikke lag en ny identifikator for et mulig allerede sendt forsøk; det kan opprette en duplikatsak. Gjenbruk av identifikatoren gir ikke `409 Conflict`. Nye meldinger, også om samme sak, skal ha hver sin identifikator.

Ugyldig forespørsel kan gi `400`, manglende eller ugyldig autentisering `401` og manglende tilgang `403`. Se [OpenAPI-kontrakten](https://github.com/ks-no/fiks-register-fosterforeldre-produsent-spec/blob/main/register-fosterforeldre-produsent.json) for responsmodeller, og [felles integrasjonsveiledning]({{% ref "integrasjoner.md" %}}) for generell autentisering og feilformat.

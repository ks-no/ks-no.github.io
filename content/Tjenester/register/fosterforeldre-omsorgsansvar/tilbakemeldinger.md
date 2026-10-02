---
title: Tilbakemeldinger og polling
date: 2026-10-02
---

## Følg behandlingen av en melding

Fiks-API-et gjør behandlingsresultatet fra Folkeregisteret tilgjengelig asynkront.

1. Ved oppstart: hent `sekvensnummer` med `GET /api/v1/tilbakemeldinger/start`. Valgfri parameter `dato` kan velge startpunkt.
2. Kall `GET /api/v1/tilbakemeldinger?fraSekvensnummer=<sekvensnummer>`. Parameteren `antall` er valgfri (standard `100`, maksimalt `1000`).
3. Lagre `nesteSekvensnummer` fra responsen og bruk det som `fraSekvensnummer` ved neste kall. Ikke beregn neste verdi selv og ikke kall `/start` på nytt for hver runde.
4. Gjenta med jevne mellomrom og behandle resultatet for hver melding.

Sekvensnumrene for dine tilbakemeldinger er stigende, men kan ha hull.

`GET /api/v1/tilbakemeldinger/meldinger/{avsendersMeldingsidentifikator}` returnerer siste kjente tilbakemelding for én innsending. Oppslaget gir `404` inntil tilbakemeldingen er tilgjengelig fra Folkeregisteret, selv etter `202 Accepted`. Bruk oppslaget når en bruker etterspør svar på en bestemt melding; for normal flyt brukes pollingen over.

## Tolk resultatet

`status` i innsendingens kvittering er Fiks' `MOTTATT`; `status` i tilbakemeldingen tilsvarer Folkeregisterets beslutning. Kontrakten angir `GODKJENT`, `AVSLAATT`, `AVVIST`, `AVBRUTT` og `REGISTRERT`; i dag er kun `AVVIST` og `REGISTRERT` i bruk.

`resultatkode` beskriver beslutningen maskinlesbart. Kjente koder (skrivemåten er som oppgitt):

| Operasjon | Registrert/bekreftet | Ikke registrert |
|-----------|-----------------------|-----------------|
| Endre | `skalEndre` | `skalIkkeEndre` |
| Korrigere | `skalKorrigere` | `skalIkkeKorrigere` |
| Opphøre | `skalOpphøre` | `skalIkkeOpphøre` |
| Annullere | `skalAnnullere` | `SkalIkkeAnnullere` |
| Overføre | `skalOverføres` | `skalIkkeOverføres` |

`resultatbeskrivelse` gir en lesbar forklaring. `begrunnelser` kan forklare avvisning eller merknad; hver begrunnelse har `begrunnelseskode`, `begrunnelsesnavn` og eventuelt `begrunnelsesmerknad`. Kjente koder:

| Begrunnelseskode | Betydning |
|------------------|-----------|
| `identifikatorForBarnFinnesIkke` | Barnets fødsels- eller d-nummer er ikke tildelt en person |
| `identifikatorForBarnErIkkeGjeldende` | Opphørt fødsels- eller d-nummer for barn |
| `ugyldigBarn` | Barnets personstatus er ikke forenlig med fosterforelder |
| `identifikatorForForelderFinnesIkke` | Fosterforelderens fødsels- eller d-nummer er ikke tildelt en person |
| `identifikatorForForelderErIkkeGjeldende` | Opphørt fødsels- eller d-nummer for fosterforelder |
| `ugyldigForelder` | Fosterforelderens personstatus er ikke forenlig med fosterbarn |
| `vedtaksdatoErFramtidEllerFeil` | Vedtaksdatoen er i fremtiden eller feil |
| `gjeldendeOmsorgsansvarFinnesAllerede` | `endre` ble sendt for en allerede aktiv relasjon |
| `barnetHarFosterforeldre` | Barnet har allerede to gjeldende fosterforeldre |
| `finnerIkkeOmsorgsansvarSomKanSlettes` | Ingen aktiv relasjon å annullere |
| `finnerIkkeOmsorgsansvarSomKanEndres` | Ingen aktiv relasjon å korrigere |
| `gyldighetstidspunktForTidlig` | Gyldighetstidspunktet gjør registreringen historisk |
| `gyldighetstidspunktForSent` | Fosterforelderansvar kan ikke legges inn i fremtiden |

Eksempel på polling med én registrert og én avvist melding (to ulike innsendinger):

```json
{
  "fraSekvensnummer": 182734,
  "nesteSekvensnummer": 182741,
  "tilbakemeldinger": [
    {
      "sekvensnummer": 182734,
      "saksnummer": "2026-000123",
      "folkeregisterReferanse": "47956f5b-fa1e-447d-a62d-b6714bc1f120",
      "avsendersMeldingsidentifikator": "98f00932-8dda-4470-9ad9-9e8107a3d9e7",
      "avsendersSaksreferanse": "SAK-1111",
      "status": "REGISTRERT",
      "resultatkode": "skalEndre",
      "opprettetTidspunkt": "2026-09-09T09:12:45Z",
      "beslutningstidspunkt": "2026-09-09T09:13:05Z"
    },
    {
      "sekvensnummer": 182740,
      "saksnummer": "2026-000124",
      "folkeregisterReferanse": "8b4198dc-4e62-4ec7-9e51-a3f69bfaa71e",
      "avsendersMeldingsidentifikator": "d848447d-bc60-40c3-bc35-2bffdf061c64",
      "avsendersSaksreferanse": "SAK-2026-AVVIST-0001",
      "status": "AVVIST",
      "resultatkode": "skalIkkeEndre",
      "begrunnelser": [
        {
          "begrunnelseskode": "barnetHarFosterforeldre",
          "begrunnelsesnavn": "Barnet har allerede to fosterforeldre"
        }
      ],
      "opprettetTidspunkt": "2026-09-09T09:14:45Z",
      "beslutningstidspunkt": "2026-09-09T09:15:05Z"
    }
  ]
}
```

Ingen av kodelistene er uttømmende; håndter ukjente koder.

---
title: Fiks Protokoll
date: 2026-05-20
aliases:
  - /fiks-platform/tjenester/fiksprotokoll/
  - /fiks-plattform/tjenester/fiksprotokoll/
  - /tjenester/fiksprotokoll/fiksio/fiksprotokoll/
---

## Kort beskrivelse

**Tjenestegruppe for å sende asynkrone, ende-til-ende-krypterte meldinger fra maskin til maskin.**

Fiks Protokoll gjør det mulig for fagsystemer å utveksle strukturerte meldinger over et sett med versjonerte protokoller. [Fiks IO]({{% ref "fiksio.md" %}}) er transportkanalen som sørger for den asynkrone maskin-til-maskin-meldingsutvekslingen.

Fiks Protokoll støtter meldinger definert under et sett med protokoller. Protokollene er versjonert, og nye protokoller er under utvikling. Fiks Protokoll validerer at det kun er gyldige meldingstyper som sendes for de ulike protokollene. Den kan også validere at det kun kan sendes meldinger mellom avsender- og mottakersystem som er forhåndsgodkjent av systemadministratorene.

### Når passer ikke denne tjenesten?

Fiks Protokoll er designet kun for meldingsutveksling som dekker «daglig overføring». Den er **ikke** designet eller dimensjonert for migrering av store mengder data mellom systemer. Vi anbefaler å bruke andre måter å overføre store mengder data på. Man kan gjerne bruke en protokoll som format, men ikke Fiks Protokoll med Fiks IO som transportkanal.

## Hvem er dokumentasjonen for?

Fiks Protokoll settes opp og brukes av tre roller:

* **Kundeorganisasjonen (IT-ansvarlig og administrator i Fiks-organisasjonen)** – tar tjenesten i bruk, signerer avtalen og setter opp system, kontoer og tilganger i Fiks Forvaltning. Å ta tjenesten i bruk og signere avtalen krever administratortilgang i Fiks-organisasjonen. Start med [Veiledninger]({{% ref "veiledninger" %}}).
* **Fagsystem (utvikler)** – bygger klienten som sender forespørsler og mottar svar og kvitteringer.
* **Arkivsystem (utvikler)** – bygger klienten som mottar forespørsler og sender kvitteringer tilbake.

Begge utviklerrollene må følge [Beste praksis for meldingshåndtering]({{% ref "meldingshandtering.md" %}}) og [Koble til klienten]({{% ref "veiledninger/8-koble-til-klienten.md" %}}), og bør fullføre oppsettet via [Konfigurere systemet via API]({{% ref "konfigurasjon-api.md" %}}).

## Innhold

* **[Konseptuell modell]({{% ref "konseptuell_modell" %}})** En oversikt over den konseptuelle modellen bak Fiks Protokoll
* **[Veiledninger]({{% ref "veiledninger" %}})** – steg-for-steg-guider for å komme i gang og vedlikeholde Fiks Protokoll i Fiks Forvaltning
* **[Beste praksis for meldingshåndtering]({{% ref "meldingshandtering.md" %}})** – hvordan en klient korrekt håndterer asynkron meldingsutveksling
* **[Protokoller]({{% ref "protokoller" %}})** – oversikt og status for de ulike protokollene (Arkiv, Plan, Matrikkelføring, Barnevern, Link, Saksfaser)
* **[Tilgangsstyring]({{% ref "tilgangsstyring.md" %}})** – hvordan gi og be om tilgang mellom systemer (forvaltning og API)
* **[Konfigurere systemet via API]({{% ref "konfigurasjon-api.md" %}})** – anbefalt fremgangsmåte for leverandører som automatiserer oppsettet
* **[Overvåking]({{% ref "overvaaking.md" %}})** – anbefalinger og APIer for å overvåke koblingsstatus og køer
* **[Fiks IO]({{% ref "fiksio.md" %}})** – transportkanalen som brukes for å sende meldinger i Fiks Protokoll
* **[Feilsøking]({{% ref "feilsoking.md" %}})** – sjekkliste for vanlige feilsituasjoner
* **[Ofte stilte spørsmål]({{% ref "ofte-stilte-sporsmal.md" %}})** – svar på tilbakevendende spørsmål

## Tilgjengelige grensesnitt

| Grensesnitt       | Støtte      |
|-------------------|-------------|
| Web portal        | Nei         |
| Maskin til maskin | [API](#api) |

### API

Man kan opprette, vedlikeholde og hente informasjon om kontoer via API etter at et system er opprettet. Når man oppretter et system får man en integrasjon som gir tilgang til APIene. Les mer om hvordan man setter opp en integrasjon under [Felles → Integrasjoner]({{% ref "/Felles/integrasjoner.md" %}}). Det er spesielt to APIer som brukes til dette: ett for Fiks Protokoll og ett for Fiks IO Katalog. Vi anbefaler at leverandører fullfører oppsettet via API — se [Konfigurere systemet via API]({{% ref "konfigurasjon-api.md" %}}).

Via [Fiks Protokoll API (OpenAPI Specification)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json) kan man bl.a.:

- Opprette konto på system
- Vedlikeholde tilganger til å sende meldinger mellom systemer
- Hente informasjon om protokoll og parter for konto
- Oppdatere konto med nøkler, parter osv.

Fiks IO Katalog API er en oppslagstjeneste som brukes for å hente offentlig nøkkel og informasjon om hvilken som helst konto. Via [Fiks IO Katalog API (OpenAPI Specification)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/fiksio-katalog-api-v1.json) kan man bl.a.:

- Hente offentlig nøkkel for konto
- Hente kontoinformasjon, f.eks. status med antall konsumenter på køen

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

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

Fiks Protokoll gjør det mulig for kommunale fagsystemer å utveksle strukturerte meldinger over et sett med versjonerte protokoller. [Fiks IO]({{< ref "fiksio.md" >}}) er transportkanalen som sørger for den asynkrone maskin-til-maskin-meldingsutvekslingen.

Fiks Protokoll støtter meldinger definert under et sett med protokoller. Protokollene er versjonert, og nye protokoller er under utvikling. Fiks Protokoll validerer at det kun er gyldige meldingstyper som sendes for de ulike protokollene. Den kan også validere at det kun kan sendes meldinger mellom avsender- og mottakersystem som er forhåndsgodkjent av systemadministratorene.

### Når passer ikke denne tjenesten?

Fiks Protokoll er designet kun for meldingsutveksling som dekker «daglig overføring». Den er **ikke** designet eller dimensjonert for migrering av store mengder data mellom systemer. Vi anbefaler å bruke andre måter å overføre store mengder data på. Man kan gjerne bruke en protokoll som format, men ikke Fiks Protokoll med Fiks IO som transportkanal.

## Innhold

* **[Veiledninger]({{< ref "veiledninger" >}})** – steg-for-steg-guider for å komme i gang og vedlikeholde Fiks Protokoll i Fiks Forvaltning
* **[Protokoller]({{< ref "protokoller" >}})** – oversikt og status for de ulike protokollene (Arkiv, Plan, Matrikkelføring, Barnevern, Link, Saksfaser)
* **[Fiks IO]({{< ref "fiksio.md" >}})** – transportkanalen som brukes for å sende meldinger i Fiks Protokoll
* **[Tilgangsstyring]({{< ref "tilgangsstyring.md" >}})** – hvordan gi og be om tilgang mellom systemer (forvaltning og API)
* **[Overvåking]({{< ref "overvaaking.md" >}})** – anbefalinger og APIer for å overvåke koblingsstatus og køer

## Tilgjengelige grensesnitt

| Grensesnitt       | Støtte      |
|-------------------|-------------|
| Web portal        | Nei         |
| Maskin til maskin | [API](#api) |

### API

Man kan opprette, vedlikeholde og hente informasjon om kontoer via API etter at et system er opprettet. Når man oppretter et system får man en integrasjon som gir tilgang til APIene. Les mer om hvordan man setter opp en integrasjon under [Felles → Integrasjoner]({{< ref "/Felles/integrasjoner.md" >}}). Det er spesielt to APIer som brukes til dette: ett for Fiks Protokoll og ett for Fiks IO Katalog.

Via [Fiks Protokoll API (OpenAPI Specification)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json) kan man bl.a.:

- Opprette konto på system
- Vedlikeholde tilganger til å sende meldinger mellom systemer
- Hente informasjon om protokoll og parter for konto
- Oppdatere konto med nøkler, parter osv.

Fiks IO Katalog API er en oppslagstjeneste som brukes for å hente offentlig nøkkel og informasjon om en konto. Via [Fiks IO Katalog API (OpenAPI Specification)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/fiksio-katalog-api-v1.json) kan man bl.a.:

- Hente offentlig nøkkel for konto
- Hente kontoinformasjon, f.eks. status med antall konsumenter på køen

## Termer

* **Protokollsystem** – et system som skal sende og motta meldinger over Fiks Protokoll (f.eks. et arkiv, et fagsystem som skal arkivere, en matrikkelklient). Et system kan bruke flere protokoller, f.eks. både Fiks Arkiv og Fiks Plan.
* **Protokollkonto** – et protokollsystem kan ha flere protokollkontoer. En protokollkonto er en Fiks IO-konto som er en part i en protokoll. F.eks. en konto i et arkiv som støtter arkivering og søk, en konto i et fagsystem som skal søke i et arkiv, eller en konto i eByggesak som skal matrikkelføre.
* **Protokoll** – definisjon av en spesifikk protokoll, med meldingstyper og parter. F.eks. `no.ks.fiks.arkiv.v1` og `no.ks.fiks.plan.v1`.
* **Meldingstype** – meldinger som sendes må ha en meldingstype. Gyldige meldingstyper defineres av protokollen, og vil typisk måtte følge meldingsskjema definert i enten XSD eller JSON-skjema.
* **Protokollpart** – meldinger i Fiks Protokoll sendes mellom parter av protokollen, f.eks. fagsystem og arkiv, eller eByggesak og matrikkelklient. Noen protokoller definerer mer spesifikke parter, som `no.ks.fiks.arkiv.v1.arkiv.arkivering` og `no.ks.fiks.arkiv.v1.fagsystem.arkivering` — som kan ta imot og sende arkiveringsmeldinger, men ikke tillater søk.
* **Integrasjon** – på Fiks-plattformen brukes integrasjoner for maskinpålogging sammen med Maskinporten. Hvert system får opprettet en integrasjon som brukes for alle kontoer under systemet. Integrasjonen kan sende og motta meldinger, og dersom valgt også konfigurere systemet og opprette nye kontoer. Se [Felles → Integrasjoner]({{< ref "/Felles/integrasjoner.md" >}}).
* **Fiks IO** – kanalen som brukes for å sende meldinger i Fiks Protokoll. Se [Fiks IO]({{< ref "fiksio.md" >}}).
* **Fiks IO-konto** – meldinger sendes og mottas over Fiks IO med en Fiks IO-konto. Fiks IO-kontoen har samme ID som protokollkontoen. Protokollkontoen er en wrapper rundt Fiks IO-kontoen for å muliggjøre tilgangsstyring i Fiks Protokoll og validering av meldinger. En Fiks IO-konto er også en kø som holder på meldingene den mottar.

## Arkitektur

Her er en forenklet oversikt over Fiks Protokoll-arkitekturen:

![Fiks Protokoll arkitektur](/Tjenester/images/fiks-protokoll-arkitektur-innsikt.png "Fiks Protokoll arkitektur oversikt")

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

---
title: Konfigurere systemet via API
date: 2026-05-21
weight: 35
---

**Etter at protokollsystemet er opprettet, anbefaler vi at leverandøren konfigurerer resten via Fiks Protokoll Konfigurasjons-API — det er raskere, automatiserbart og enkelt å gjenta.**

## Arbeidsdeling: GUI én gang, API resten

Å opprette selve protokollsystemet kan **kun** gjøres av en kommunal ansatt eller administrator i Fiks-organisasjonen, i Fiks Forvaltning. Når systemet opprettes, er **API-konfigurasjon aktivert som standard**.

Alt det videre oppsettet kan — og bør — leverandøren gjøre via Konfigurasjons-API-et i stedet for webgrensesnittet. Da slipper leverandøren manuell klikking i GUI for hver konto, og oppsettet blir enkelt å gjenta — for eksempel for nye kommuner eller i testmiljøet.

| Person i Fiks Forvaltning | Leverandøren via API |
|---|---|
| Opprette og slette protokollsystem | Opprette, hente og slette kontoer |
| Endre orgnummer og integrasjonsprivilegier | Laste opp offentlig nøkkel og sette parter |
| | Gi, be om og fjerne tilgang mot andre systemer |
| | Søke etter systemer og kontoer |
| | Oppdatere system- og kontoinfo |

## Slik tar leverandøren API-et i bruk

1. **Få tilgangsdetaljene.** Når systemet opprettes, genereres `integrasjonId` og `integrasjonspassord` (se [Opprett system]({{% ref "veiledninger/3-opprette-system.md" %}}), steg 6). Disse deles sikkert med leverandøren.
2. **Autentisér via Maskinporten.** Leverandøren autentiserer med sin Maskinporten-klient og virksomhetssertifikat — på organisasjonsnummeret som systemets integrasjon er satt opp med. Autentiseringsmodellen (Maskinporten-token sammen med `IntegrasjonId`- og `IntegrasjonPassord`-headere) er beskrevet i [Felles → Integrasjoner]({{% ref "/Felles/integrasjoner.md" %}}).
3. **Sjekk at API-konfigurering er aktivert** på systemet. Det er normalt på som standard, men kan kontrolleres på systemets **Konfigurasjon**-fane (se [Opprett system]({{% ref "veiledninger/3-opprette-system.md" %}}), steg 8). Er det av, vil API-kall feile med `NotAuthorizedException` / `har ikke privilegiet FIKS.KONFIGURER` — se [Feilsøking]({{% ref "feilsoking.md" %}}).
4. **Konfigurér resten via API.** Opprett kontoer, last opp offentlig nøkkel, sett parter, og styr tilganger mot motpart-systemet.

## API-referanse

Konfigurasjons-API-et er dokumentert i OpenAPI-spesifikasjonen:

[Fiks Protokoll Konfigurasjon-API (OpenAPI Specification)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/fiks-protokoll-konfigurasjon-api-v1.json)

Spesifikasjonen inneholder to sett endepunkter: **`Protokoll-konfigurasjon`**, som er det leverandøren bruker, og **`Protokoll-konfigurasjon-kun-person`**, som webgrensesnittet på `forvaltning.fiks.ks.no` selv bruker (blant annet for å opprette systemer).

For tilgangsstyring spesielt — å gi, be om og fjerne tilganger mellom systemer — se [Tilgangsstyring]({{% ref "tilgangsstyring.md" %}}).

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

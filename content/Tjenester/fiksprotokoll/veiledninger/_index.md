---
title: Veiledninger
date: 2026-05-20
weight: 10
ordersectionsby: weight
---

**Steg-for-steg-guider for å ta i bruk og vedlikeholde Fiks Protokoll i Fiks Forvaltning.**

Følg veiledningene i rekkefølge når du tar tjenesten i bruk for første gang. Hver veiledning forutsetter at den forrige er fullført.

## Slik henger oppsettet sammen

For å sende og motta meldinger over Fiks Protokoll må du gjennom fem oppsettssteg, og til slutt koble et fagsystem (en klient) til kontoen din:

1. **[Før du starter]({{< ref "1-huskeliste.md" >}})** — sjekkliste over hva og hvem du må ha klart
2. **[Ta i bruk tjenesten]({{< ref "2-ta-i-bruk.md" >}})** — signér avtale og aktivér Fiks Protokoll for organisasjonen
3. **[Opprett system]({{< ref "3-opprette-system.md" >}})** — opprett et protokollsystem for fagsystemet eller arkivet
4. **[Opprett konto]({{< ref "4-opprette-konto.md" >}})** — opprett en protokollkonto med protokoll, part og offentlig nøkkel
5. **[Gi og få tilgang]({{< ref "5-gi-tilgang.md" >}})** — la et annet system sende meldinger til kontoen din
6. **[Koble til klienten]({{< ref "8-koble-til-klienten.md" >}})** — konfigurer Fiks IO-klienten og begynn å utveksle meldinger

{{% notice style="note" title="Det skal to til" %}}
Fiks Protokoll er en topartskommunikasjon. For å faktisk utveksle meldinger må det finnes et **motpart-system** med en konto i samme protokoll — for eksempel et arkiv hvis du setter opp et fagsystem. Du kan gjøre steg 1–4 alene, men steg 5 krever at motparten finnes.
{{% /notice %}}

## Vedlikehold

Disse veiledningene brukes ved behov etter at oppsettet er ferdig:

- **[Generer nytt passord]({{< ref "6-nytt-passord.md" >}})** — hvis du har mistet integrasjonspassordet
- **[Last opp ny offentlig nøkkel]({{< ref "7-laste-opp-nokkel.md" >}})** — bytt ut nøkkelen som brukes til kryptering

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

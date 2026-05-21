---
title: Generer nytt passord
date: 2026-05-20
weight: 6
aliases:
  - /tjenester/fiksprotokoll/veiledning_6_nytt_passord/
  - /fiks-plattform/tjenester/fiksprotokoll/brukerveiledning/nytt_passord/
  - /tjenester/fiksprotokoll/nytt_passord/
---

**Slik genererer du et nytt integrasjonspassord hvis du har mistet det gamle.**

Integrasjonspassordet kan ikke hentes fram igjen etter at systemet er opprettet. Har du mistet det, må du generere et nytt.

{{% notice style="warning" title="Eksisterende pålogging slutter å virke" %}}
Når du genererer et nytt passord, blir det gamle ugyldig. Fiks IO-klienter som bruker det gamle passordet vil slutte å fungere til de er oppdatert med det nye.
{{% /notice %}}

## Steg 1: Velg system

Velg systemet du vil generere nytt passord for.

![Velg system](/images/protokoll-brukerveiledning/passord_velg_system.png "Velg system")

## Steg 2: Velg fanen Konfigurasjon

Velg fanen **Konfigurasjon**.

![Velg Konfigurasjon](/images/protokoll-brukerveiledning/passord_velg_konfigurasjon.png "Velg Konfigurasjon")

## Steg 3: Generer nytt passord

Trykk på **Generer nytt passord**. Det kan hende du må scrolle ned på siden for å finne knappen.

![Generer passord](/images/protokoll-brukerveiledning/passord_velg_generer_knapp.png "Generer passord")

## Steg 4: Bekreft

En dialog spør om du er sikker, fordi det gamle passordet blir ugyldig. Trykk på **Lag nytt passord**.

![Bekreft nytt passord](/images/protokoll-brukerveiledning/passord_lag_nytt_passord.png "Bekreft nytt passord")

## Steg 5: Nytt passord generert

Det nye passordet er tilgjengelig under **Integrasjonspålogging**. Det skal brukes sammen med `integrasjonId` og legges inn i konfigurasjonen til Fiks IO-klienten — se [Koble til klienten]({{< ref "8-koble-til-klienten.md" >}}).

![Nytt passord generert](/images/protokoll-brukerveiledning/passord_nytt_passord_generert.png "Passord generert")

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

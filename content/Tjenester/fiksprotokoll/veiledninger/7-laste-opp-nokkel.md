---
title: Last opp ny offentlig nøkkel
date: 2026-05-20
weight: 7
aliases:
  - /tjenester/fiksprotokoll/veiledning_7_laste_opp_ny_offentlig_nokkel/
  - /fiks-plattform/tjenester/fiksprotokoll/brukerveiledning/laste_opp_ny_offentlig_nokkel/
  - /tjenester/fiksprotokoll/laste_opp_ny_offentlig_nokkel/
---

**Slik bytter du ut den offentlige nøkkelen som brukes til å kryptere meldinger til en konto.**

Fiks IO sender krypterte meldinger. Det krever at kontoen har et offentlig/privat nøkkelpar. Den offentlige nøkkelen gjøres tilgjengelig for de som skal sende meldinger til kontoen, slik at de kan kryptere meldingene. Den private nøkkelen brukes til å dekryptere innkommende meldinger.

Denne veiledningen viser hvordan du bytter offentlig nøkkel gjennom Fiks Forvaltning.

## Steg 1: Velg system

Velg systemet som har kontoen du vil laste opp ny offentlig nøkkel til.

![Velg system](/images/protokoll-brukerveiledning/pem_velg_system.png "Velg system")

## Steg 2: Velg fanen Kontoer

Velg fanen **Kontoer** for å komme til oversikten over kontoer.

![Velg Kontoer](/images/protokoll-brukerveiledning/pem_velg_kontoer.png "Velg kontoer")

## Steg 3: Velg konto

Velg kontoen du vil laste opp ny offentlig nøkkel til.

![Velg konto](/images/protokoll-brukerveiledning/pem_velg_konto.png "Velg konto")

## Steg 4: Velg fanen Konfigurasjon

Velg fanen **Konfigurasjon**.

![Velg Konfigurasjon](/images/protokoll-brukerveiledning/pem_velg_konfigurasjon.png "Velg Konfigurasjon")

## Steg 5: Endre offentlig nøkkel

Gå til seksjonen for offentlig nøkkel og trykk på **Endre**.

![Endre offentlig nøkkel](/images/protokoll-brukerveiledning/pem_velg_endre.png "Endre offentlig nøkkel")

## Steg 6: Last opp offentlig nøkkel

Trykk på **Velg en fil** under **Last opp offentlig nøkkel**, og finn `.pem`-filen — eller dra filen inn i opplastingsvinduet.

![Last opp offentlig nøkkel](/images/protokoll-brukerveiledning/pem_velg_velg_en_fil.png "Last opp offentlig nøkkel")

## Steg 7: Offentlig nøkkel lastet opp

Den nye offentlige nøkkelen er nå lastet opp.

{{% notice style="warning" title="Husk å oppdatere klienten" %}}
Legg den tilsvarende private nøkkelen inn i Fiks IO-klienten, slik at klienten kan dekryptere innkommende meldinger. Glemmer du dette, vil klienten ikke kunne lese meldinger som er kryptert med den nye nøkkelen.
{{% /notice %}}

![Offentlig nøkkel lastet opp](/images/protokoll-brukerveiledning/pem_ny_nokkel_lastet_opp.png "Offentlig nøkkel endret")

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

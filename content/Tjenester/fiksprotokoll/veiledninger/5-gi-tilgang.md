---
title: Gi og få tilgang
date: 2026-05-20
weight: 5
aliases:
  - /tjenester/fiksprotokoll/veiledning_5_gi_tilgang_til_system/
  - /fiks-plattform/tjenester/fiksprotokoll/brukerveiledning/gi_tilgang_til_systemet/
  - /tjenester/fiksprotokoll/gi_tilgang_til_systemet/
---

**Slik lar du et annet system sende meldinger til kontoen din.**

Tilganger gis per protokollkonto: en konto kan gi et annet system tilgang til å sende meldinger til seg.

{{% notice style="note" title="Det skal to til" %}}
Dette steget forutsetter at det finnes et **motpart-system** med en konto i samme protokoll. I eksempelet under skal *Mitt fagsystem* sende meldinger til *Mitt arkiv* — begge systemene må altså være opprettet på forhånd. Eier du bare det ene systemet, må eieren av det andre opprette sitt før dere kan gi tilgang. En mer detaljert oversikt over forvaltning og API finner du under [Tilgangsstyring]({{< ref "/Tjenester/fiksprotokoll/tilgangsstyring.md" >}}).
{{% /notice %}}

## Steg 1: Velg systemet som skal gi tilgang

Velg systemet som eier kontoen det skal gis tilgang til. I dette eksempelet skal *Mitt fagsystem* få sende meldinger til *Mitt arkiv*, så vi går inn på **Mitt arkiv**.

![Velg system](/images/protokoll-brukerveiledning/4_velg_system.png "Velg system")

## Steg 2: Velg fanen Kontoer

Tilganger gis på kontoer. Velg fanen **Kontoer**.

![Velg Kontoer](/images/protokoll-brukerveiledning/4_velg_kontoer.png "Velg kontoer")

## Steg 3: Velg konto

Velg kontoen i arkivet som fagsystemet skal få tilgang til.

![Velg konto](/images/protokoll-brukerveiledning/4_velg_konto.png "Velg konto")

## Steg 4: Søk etter systemer

Trykk på fanen **Søk etter systemer** for å finne systemet som skal få tilgang.

![Søk etter systemer](/images/protokoll-brukerveiledning/4_velg_sok_etter_system.png "Søk etter systemer")

## Steg 5: Finn systemet og gi tilgang

Søk med fritekst og filtrér på eierorganisasjon. Du kan også velge å kun vise systemer som har minst én konto som kan motta meldinger fra kontoen det skal gis tilgang til.

Finn systemet og trykk **Gi tilgang**. Systemet har nå tilgang til å sende meldinger til denne kontoen. Det eksterne systemet velger selv hvilken konto det sender fra, så lenge kontoen er en støttet part.

![Søk og gi tilgang](/images/protokoll-brukerveiledning/4_sok_gi_tilgang.png "Søk etter system")

## Steg 6: Tilgang gitt

Tilgangen er nå gitt. Du kan fjerne den igjen om du ønsker.

![Tilgang gitt](/images/protokoll-brukerveiledning/4_sok_tilgang_gitt.png "Tilgang gitt")

## Se og administrere tilganger

- **Alle tilganger på kontoen:** gå til fanen **Tilganger**. Her kan du også fjerne tilganger.

  ![Tilganger](/images/protokoll-brukerveiledning/4_tilganger.png "Tilganger")

- **Tilgangen sett fra systemet som fikk tilgang:** gå til systemet som fikk tilgang og velg fanen **Tilganger** — der ser du kontoen som ga tilgang.

  ![Tilganger til system](/images/protokoll-brukerveiledning/4_system_tilganger.png "Tilganger til system")

- **Detaljer om kontoen:** klikk inn på kontoen for detaljert informasjon. Det viktigste er **Konto-id**, som brukes for å sende meldinger i Fiks IO og som identifiserer meldinger sendt fra kontoen. Du ser også informasjon om eieren og protokollparten.

  ![Detaljer om konto](/images/protokoll-brukerveiledning/4_system_tilgang_oppsumering.png "Detaljer om konto")

## Neste steg

Oppsettet i Fiks Forvaltning er nå ferdig. Siste steg er å [koble til klienten]({{< ref "8-koble-til-klienten.md" >}}) og begynne å utveksle meldinger.

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

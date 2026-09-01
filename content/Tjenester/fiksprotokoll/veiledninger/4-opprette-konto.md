---
title: Opprett konto
date: 2026-05-20
weight: 4
aliases:
  - /tjenester/fiksprotokoll/veiledning_4_opprette_konto/
  - /fiks-plattform/tjenester/fiksprotokoll/brukerveiledning/opprette_konto/
  - /tjenester/fiksprotokoll/opprette_konto/
---

**Slik oppretter du en protokollkonto med protokoll, part og offentlig nøkkel.**

En protokollkonto er en part i en protokoll. Et protokollsystem kan ha flere kontoer. Du må ha [opprettet et system]({{% ref "3-opprette-system.md" %}}) før du kan opprette en konto.

## Steg 1: Velg system

Velg systemet du skal opprette kontoen på.

![Velg system](/images/protokoll-brukerveiledning/3_velg_system.png "Velg system")

## Steg 2: Velg fanen Kontoer

Velg fanen **Kontoer**.

![Velg Kontoer](/images/protokoll-brukerveiledning/3_velg_kontoer.png "Velg kontoer")

## Steg 3: Opprett ny konto

Trykk på **Opprett ny konto**.

![Opprett ny konto](/images/protokoll-brukerveiledning/3_opprett_konto.png "Opprett konto")

## Steg 4: Navn og beskrivelse

Fyll ut navn og beskrivelse. Dette identifiserer kontoen for andre.

![Navn og beskrivelse](/images/protokoll-brukerveiledning/3_opprett_del1.png "Navn og beskrivelse")

## Steg 5: Velg protokoll

Velg protokoll fra nedtrekksmenyen. Dette bestemmer hvilken meldingsprotokoll kontoen hører til. Kontoen kan kun kommunisere med andre kontoer i samme protokoll.

![Velg protokoll](/images/protokoll-brukerveiledning/3_opprett_del2.png "Velg protokoll")

## Steg 6: Velg protokollpart

Velg protokollpart fra nedtrekksmenyen. Parten bestemmer hvilken rolle kontoen har i protokollen — for eksempel et fagsystem som skal arkivere. Den avgjør hvilke meldinger kontoen kan sende og motta, og hvilke andre parter den kan kommunisere med. Et fagsystem kan for eksempel kommunisere med arkiv, men ikke med andre fagsystemer.

Når du har valgt part, vises hvilke meldinger kontoen kan sende og motta, og hvilke parter den kan kommunisere med.

![Velg protokollpart](/images/protokoll-brukerveiledning/3_opprett_del3.png "Velg protokollpart")

## Steg 7: Last opp offentlig nøkkel

Meldinger som sendes over Fiks IO krypteres med et offentlig/privat nøkkelpar. Den offentlige nøkkelen må være et X.509-sertifikat i `.pem`-format. Her laster du opp den offentlige nøkkelen — den private legger du senere inn i Fiks IO-klienten.

{{% notice style="warning" title="Ikke samme som virksomhetssertifikatet" %}}
Du kan ikke opprette en konto uten offentlig nøkkel. Dette nøkkelparet er **ikke** det samme som virksomhetssertifikatet som ble brukt da systemet ble opprettet. Du oppretter normalt et eget nøkkelpar per konto. I test kan samme nøkkelpar gjenbrukes på flere kontoer.
{{% /notice %}}

![Last opp offentlig nøkkel](/images/protokoll-brukerveiledning/3_opprett_del4.png "Last opp nøkkel")

## Steg 8: Opprett konto

Når nøkkelen er lastet opp, trykker du på **Opprett konto**.

![Opprett konto](/images/protokoll-brukerveiledning/3_opprett_del5.png "Opprett konto")

## Steg 9: Konto opprettet

Kontoen er opprettet. **Konto-id** er identifikatoren Fiks IO bruker for å sende og motta meldinger med kontoen.

For å begynne å sende meldinger må systemet ditt få tilgang til en konto i et annet system — se [Gi og få tilgang]({{% ref "5-gi-tilgang.md" %}}).

![Konto opprettet](/images/protokoll-brukerveiledning/3_opprettet_ferdig.png "Konto opprettet")

{{% notice style="note" title="«Konto uten kobling»-advarsel" %}}
Etter at kontoen er opprettet ser du en advarsel om at det finnes kontoer uten kobling. Dette betyr at den nye kontoen ennå ikke har et fagsystem (en klient) som lytter på meldinger — helt naturlig rett etter opprettelse. Advarselen forsvinner når klienten er [koblet til]({{% ref "8-koble-til-klienten.md" %}}). Den dukker opp igjen hvis klienten mister koblingen. Se [Feilsøking]({{% ref "/Tjenester/fiksprotokoll/feilsoking.md" %}}).
{{% /notice %}}

![Konto opprettet – advarsel](/images/protokoll-brukerveiledning/3_opprettet_ferdig_advarsel.png "Konto opprettet - advarsel")

## Neste steg

[Gi og få tilgang]({{% ref "5-gi-tilgang.md" %}}).

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

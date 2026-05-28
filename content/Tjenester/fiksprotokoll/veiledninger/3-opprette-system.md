---
title: Opprett system
date: 2026-05-20
weight: 3
aliases:
  - /tjenester/fiksprotokoll/veiledning_3_opprette_system/
  - /fiks-plattform/tjenester/fiksprotokoll/brukerveiledning/opprette_system/
  - /tjenester/fiksprotokoll/opprette_system/
  - /tjenester/fiksprotokoll/brukerveiledning/opprette_system/
---

**Slik oppretter du et protokollsystem for fagsystemet eller arkivet ditt.**

For å bruke Fiks Protokoll må du opprette et protokollsystem. Hvert system i kundeorganisasjonen som skal bruke Fiks Protokoll — for eksempel et fagsystem eller et arkiv — trenger sitt eget protokollsystem.

Logg inn på [forvaltning.fiks.ks.no](https://forvaltning.fiks.ks.no) ([forvaltning.fiks.test.ks.no](https://forvaltning.fiks.test.ks.no) for testmiljøet) og gå til **Konfigurasjon**.

## Steg 1: Velg Fiks Protokoll

Finn **Fiks Protokoll** i listen over tjenester. Tjenester som er tatt i bruk ligger øverst. Klikk på **Fiks Protokoll**.

![Velg Fiks Protokoll](/images/protokoll-brukerveiledning/2_velg_tjeneste.png "Velg tjeneste")

## Steg 2: Opprett nytt system

Du ser en liste over systemer — den er tom hvis ingen systemer er opprettet ennå. Klikk på **Opprett nytt system**.

![Opprett nytt system](/images/protokoll-brukerveiledning/2_opprett_system_knapp.png "Opprett system")

## Steg 3: Systeminfo

En veiviser med fire steg åpnes. I første steg fyller du ut:

- **Systemnavn** — visningsnavnet til systemet i Fiks. Navnet er synlig for andre organisasjoner som kommuniserer med systemet. Et godt valg er leverandørens navn pluss navnet på applikasjonen.
- **Beskrivelse** — en mer detaljert beskrivelse av systemet, også synlig for andre organisasjoner.
- **E-post(er) for varsling** — minst én e-postadresse som brukes for å kontakte de ansvarlige for systemet.

Trykk **Neste**.

![Veiviser – systeminfo](/images/protokoll-brukerveiledning/2_wizard_1_utfylt.png "Veiviser info")

## Steg 4: Sett opp integrasjon

For å sende og motta meldinger gjennom Fiks Protokoll kreves en integrasjon. Integrasjonen autentiseres via Maskinporten, der et virksomhetssertifikat identifiserer eieren. Virksomhetssertifikatet hører til et organisasjonsnummer som må fylles ut her. I produksjon varierer det om dette er kundeorganisasjonens eller leverandørens virksomhetssertifikat — se [Før du starter]({{% ref "1-huskeliste.md" %}}).

{{% notice style="warning" title="Riktig organisasjonsnummer" %}}
Du kan ikke bruke Fiks Protokoll i test uten et virksomhetssertifikat. Organisasjonsnummeret du oppgir her **må** være det samme som i virksomhetssertifikatet og i Maskinporten-klienten. Det er mulig å endre organisasjonsnummeret senere hvis du velger feil. Se [veiledning for Maskinporten]({{% ref "/Felles/difiIdportenKlient.md" %}}).
{{% /notice %}}

API-konfigurasjon er aktivert som standard, slik at leverandøren kan opprette kontoer og fullføre oppsettet via API i stedet for webgrensesnittet. Vi anbefaler denne fremgangsmåten — se [Konfigurere systemet via API]({{% ref "/Tjenester/fiksprotokoll/konfigurasjon-api.md" %}}).

Trykk **Neste**.

![Veiviser – integrasjon](/images/protokoll-brukerveiledning/2_wizard_2_utfylt.png "Veiviser integrasjon")

## Steg 5: Opprett system

Systemet er nå klart til å opprettes. Trykk **Opprett Fiks Protokoll-system**.

![Veiviser – opprett](/images/protokoll-brukerveiledning/2_wizard_3.png "Veiviser opprett")

## Steg 6: System opprettet

Systemet er opprettet. På denne siden vises nøkkelinformasjon du må ta vare på:

- **systemId** — identifiserer systemet. Brukes blant annet når en konto i et annet system skal gi tilgang til dette systemet, og hvis systemet skal konfigureres via API.
- **integrasjonId** — brukes til maskin-til-maskin-pålogging og kreves for tilgang til API. Skal inn i konfigurasjonen av Fiks IO-klienten.
- **integrasjonspassord** — brukes sammen med `integrasjonId` og skal også inn i Fiks IO-klienten. Passordet kan **ikke** hentes igjen senere, men du kan [generere et nytt]({{% ref "6-nytt-passord.md" %}}).
- **systemNavn** — navnet på systemet.

Trykk **Gå til system**.

![Veiviser – system opprettet](/images/protokoll-brukerveiledning/2_wizard_4.png "Veiviser ferdig")

## Steg 7: Systemoversikt

Du har nå opprettet et protokollsystem. På landingssiden vises nøkkelinformasjon om systemet.

{{% notice style="note" title="Synlighet" %}}
Systemet er foreløpig kun tilgjengelig for andre systemer i din egen organisasjon. Dette kan endres under **Konfigurasjon**.
{{% /notice %}}

![System opprettet](/images/protokoll-brukerveiledning/2_opprettet.png "System opprettet")

## Steg 8: Konfigurer systemet (valgfritt)

Når systemet er opprettet, kan du konfigurere det ved å trykke på **Konfigurasjon** i fanelinjen. Her kan du endre leverandørkontaktpunkt, organisasjonsnummer på virksomhetssertifikatet, passord for integrasjonen, og aktivere eller deaktivere konfigurasjon via API. Du kan også slette systemet her.

API-konfigurasjon er normalt på som standard, og kan slås av eller på her. Forsøk på konfigurasjon via API uten at dette er aktivert, gir en `NotAuthorizedException` med meldingen `har ikke privilegiet FIKS.KONFIGURER på ressurs` — se [Feilsøking]({{% ref "/Tjenester/fiksprotokoll/feilsoking.md" %}}). Hvordan leverandøren bruker API-et er beskrevet under [Konfigurere systemet via API]({{% ref "/Tjenester/fiksprotokoll/konfigurasjon-api.md" %}}).

![Konfigurasjon](/images/protokoll-brukerveiledning/8_konfigurasjon.png "Konfigurasjon")

## Neste steg

[Opprett konto]({{% ref "4-opprette-konto.md" %}}).

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

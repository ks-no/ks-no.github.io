---
title: Koble til klienten
date: 2026-05-20
weight: 8
---

**Slik konfigurerer du Fiks IO-klienten med verdiene fra oppsettet og begynner å utveksle meldinger.**

Når systemet, kontoen og tilgangene er på plass i Fiks Forvaltning, er siste steg å koble fagsystemet ditt til kontoen. Det gjøres med en Fiks IO-klient. KS tilbyr offisielle klienter for .NET og Java som håndterer autentisering, signering, kryptering og kø-kobling for deg.

## Verdier du trenger

Klienten konfigureres med verdier fra de tidligere stegene:

| Verdi | Hva det er | Hvor du finner det |
|-------|------------|--------------------|
| `integrasjonId` | Identifiserer integrasjonen ved maskin-til-maskin-pålogging | [Opprett system]({{< ref "3-opprette-system.md" >}}), steg 6 |
| `integrasjonspassord` | Passord som hører til integrasjonen | [Opprett system]({{< ref "3-opprette-system.md" >}}), steg 6 — eller [generer nytt]({{< ref "6-nytt-passord.md" >}}) |
| `kontoId` | Konto-id-en meldinger sendes og mottas med | [Opprett konto]({{< ref "4-opprette-konto.md" >}}), steg 9 |
| Privat nøkkel | Den private delen av nøkkelparet; dekrypterer innkommende meldinger | Generert av deg; den offentlige delen ble lastet opp i [Opprett konto]({{< ref "4-opprette-konto.md" >}}), steg 7 |
| Virksomhetssertifikat | Brukes til Maskinporten-autentisering | Fra [Før du starter]({{< ref "1-huskeliste.md" >}}) |
| ASiC-E-signeringsnøkkel | Signerer meldingspakkene | Virksomhetssertifikatet eller et eget nøkkelpar |

{{% notice style="warning" title="Nøkkelformat" %}}
Den private nøkkelen må være i **PKCS#8**-format. Java-klienten har et verktøy for å konvertere fra PKCS#1. Se [Feilsøking]({{< ref "/Tjenester/fiksprotokoll/feilsoking.md" >}}) hvis kryptering eller dekryptering feiler.
{{% /notice %}}

## Velg klient

| Behov | .NET | Java |
|-------|------|------|
| Motta **og** sende meldinger | [`KS.Fiks.IO.Client`](https://github.com/ks-no/fiks-io-client-dotnet) (NuGet) | [`fiks-io-klient-java`](https://github.com/ks-no/fiks-io-klient-java) (Maven `no.ks.fiks`) |
| **Kun** sende meldinger (ingen kø-kobling) | [`KS.Fiks.IO.Send.Client`](https://github.com/ks-no/fiks-io-send-client-dotnet) | [`fiks-io-send-klient`](https://github.com/ks-no/fiks-io-send-klient) |

Send-klienten er enklere og trenger ingen AMQP-kobling, men kan ikke motta meldinger. Skal systemet ditt svare på eller lytte etter meldinger, bruk den fulle klienten. Se [Klientbiblioteker]({{< ref "/Felles/klientbiblioteker.md" >}}) for en samlet oversikt.

## Konfigurer klienten

Klientene bygger konfigurasjonen med et builder-mønster. Eksempelet under viser .NET — Java følger samme prinsipp med `FiksIOKonfigurasjon.builder()`. Se README-en i klient-repoet for den fullstendige og oppdaterte oppskriften.

```csharp
var config = FiksIOConfigurationBuilder
    .Init()
    .WithMaskinportenConfiguration(maskinportenSertifikat, issuer)
    .WithFiksIntegrasjonConfiguration(integrasjonId, integrasjonspassord)
    .WithFiksKontoConfiguration(kontoId, privatNokkel)
    .WithAsiceSigningConfiguration(asiceSertifikatSti, asicePrivatNokkelSti)
    .BuildProdConfiguration();

var klient = await FiksIOClient.CreateAsync(config);
```

Bruk testkonfigurasjon (`BuildTestConfiguration` / tilsvarende) mot testmiljøet. Se [miljøer]({{< ref "/Felles/integrasjoner.md" >}}#miljoer).

## Send og motta meldinger

- **Sende:** bygg en meldingsforespørsel med avsenderkonto, mottakerkonto og meldingstype, og send den med eventuell payload (fil, strøm eller tekst).
- **Motta:** abonnér på kontoens kø med en callback. Når en melding kommer inn, håndterer du den og bekrefter den med **Ack** (`AckAsync`). Se [Fiks IO]({{< ref "/Tjenester/fiksprotokoll/fiksio.md" >}}) for detaljer om meldingsutveksling, headere, kvitteringer og Ack/Nack.

Fullstendige kodeeksempler ligger i README-en til hvert klient-repo.

## Verifiser at koblingen virker

Når klienten kjører og lytter på kontoens kø, forsvinner «konto uten kobling»-advarselen i Fiks Forvaltning. Du kan også sjekke koblingsstatus og antall meldinger på køen — se [Overvåking]({{< ref "/Tjenester/fiksprotokoll/overvaaking.md" >}}). Får du ikke kontakt, se [Feilsøking]({{< ref "/Tjenester/fiksprotokoll/feilsoking.md" >}}).

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

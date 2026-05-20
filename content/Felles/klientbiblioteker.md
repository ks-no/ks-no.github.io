---
title: Klientbiblioteker
date: 2026-05-04
aliases: ["/fiks-plattform/klientbiblioteker", "/klientbiblioteker"]
---

KS publiserer offisielle klientbiblioteker for noen få tjenester og felleskomponenter på Fiks-plattformen. Denne siden er en samlet oversikt over disse bibliotekene.

Ikke alle tjenester har, eller skal ha, et eget klientbibliotek. For tjenester uten offisiell klient bruker man API-spec'en direkte sammen med den generelle integrasjonsmodellen beskrevet i [Integrasjoner]({{< ref "integrasjoner.md" >}}).

Pakkene distribueres via Maven Central (Java) og nuget.org (.NET). Se [risikovurdering for distribuerte pakker]({{< ref "klientpakker.md" >}}) for hvordan KS sikrer integriteten i disse.

## Felles / autentisering

| Bibliotek | Java | .NET |
|-----------|------|------|
| Maskinporten access token-klient | [fiks-maskinporten](https://github.com/ks-no/fiks-maskinporten) | [fiks-maskinporten-client-dotnet](https://github.com/ks-no/fiks-maskinporten-client-dotnet) |

## Fiks IO og Fiks Protokoll

| Bibliotek | Java | .NET |
|-----------|------|------|
| Fiks IO-klient (motta + send) | [fiks-io-klient-java](https://github.com/ks-no/fiks-io-klient-java) | [fiks-io-client-dotnet](https://github.com/ks-no/fiks-io-client-dotnet) |
| Fiks IO send-klient (kun send) | [fiks-io-send-klient](https://github.com/ks-no/fiks-io-send-klient) | [fiks-io-send-client-dotnet](https://github.com/ks-no/fiks-io-send-client-dotnet) |

## Tjenestespesifikke klienter

| Tjeneste | Java | .NET |
|----------|------|------|
| Fiks Dokumentlager | [fiks-dokumentlager-klient](https://github.com/ks-no/fiks-dokumentlager-klient) | – |
| Fiks Digisos | [fiks-digisos-klient](https://github.com/ks-no/fiks-digisos-klient) | – |

Lenk kun til denne siden fra en tjenesteside dersom tjenesten faktisk har et relevant offisielt klientbibliotek.

## Andre språk

For andre språk må man kalle REST API-ene direkte. Se [generell integrasjonsdokumentasjon]({{< ref "integrasjoner.md" >}}) for autentiseringsmodellen, og hver tjenestes API-spec for endepunktene.

Trondheim kommune har for eksempel laget en Go-klient spesifikt for Bekymringsmelding: [fiks-bekymringsmelding-konsument](https://github.com/tktip/fiks-bekymringsmelding-konsument). Vi tar gjerne imot tips om community-klienter for andre språk – send en e-post til `fiks@ksdigital.no`.



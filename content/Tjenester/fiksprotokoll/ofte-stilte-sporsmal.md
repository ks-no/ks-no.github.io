---
title: Ofte stilte spørsmål
date: 2026-05-20
weight: 70
---

**Svar på spørsmål som ofte dukker opp ved oppsett og bruk av Fiks Protokoll.**

## Hva er forskjellen på et protokollsystem og en protokollkonto?

Et **protokollsystem** representerer et system som skal sende og motta meldinger — for eksempel et fagsystem eller et arkiv. Et system kan ha flere **protokollkontoer**, og hver konto er en part i én protokoll. Du oppretter først systemet, deretter én eller flere kontoer på systemet. Se [Termer]({{< ref "_index.md" >}}#termer).

## Hva er forskjellen på Fiks IO og Fiks Protokoll?

**Fiks IO** er transportkanalen — den sørger for sikker, asynkron maskin-til-maskin-meldingsutveksling. **Fiks Protokoll** legger et lag oppå med versjonerte protokoller som definerer gyldige meldingstyper og parter, og med tilgangsstyring og validering. Når du oppretter en protokollkonto, opprettes det samtidig en Fiks IO-konto «under». Se [Fiks IO]({{< ref "fiksio.md" >}}).

## Hvem gjør hva — kommunen eller leverandøren?

En person fra kundeorganisasjonen (kommunen) tar tjenesten i bruk, signerer avtalen og oppretter minst protokollsystemet. Leverandøren stiller med sertifikater, nøkler og tekniske avklaringer. Hvis systemet settes opp for konfigurasjon via API, kan leverandøren gjøre resten av oppsettet (kontoer og tilganger) via API. Se [Før du starter]({{< ref "veiledninger/1-huskeliste.md" >}}).

## Kan jeg gjenbruke samme nøkkelpar på flere kontoer?

Du oppretter normalt et eget offentlig/privat nøkkelpar per konto. I testmiljøet kan samme nøkkelpar gjenbrukes på flere kontoer. Nøkkelparet er ikke det samme som virksomhetssertifikatet som brukes til Maskinporten-autentisering.

## Jeg har mistet integrasjonspassordet — hva gjør jeg?

Integrasjonspassordet kan ikke hentes fram igjen etter at systemet er opprettet. Du må generere et nytt. Det gamle passordet blir da ugyldig, så Fiks IO-klienter må oppdateres. Se [Generer nytt passord]({{< ref "veiledninger/6-nytt-passord.md" >}}).

## Hva er forskjellen på test og produksjon?

Test og produksjon er adskilte miljøer med egne virksomhetssertifikater, URL-er og oppsett. Test bruker `forvaltning.fiks.test.ks.no`, produksjon bruker `forvaltning.fiks.ks.no`. Klienten må bygge riktig konfigurasjon for miljøet. Se [miljøer]({{< ref "/Felles/integrasjoner.md" >}}#miljoer).

## Hvilken klient skal jeg velge?

KS tilbyr offisielle klienter for **.NET** og **Java**. Skal systemet både sende og motta meldinger, bruk den fulle Fiks IO-klienten. Skal det bare sende, holder den enklere send-klienten (den trenger ingen kø-kobling). For andre språk kaller du REST-API-ene direkte. Se [Koble til klienten]({{< ref "veiledninger/8-koble-til-klienten.md" >}}) og [Klientbiblioteker]({{< ref "/Felles/klientbiblioteker.md" >}}).

## Kan jeg konfigurere systemet via API i stedet for webgrensesnittet?

Ja. Når systemet settes opp for konfigurasjon via API, kan du opprette og vedlikeholde kontoer og tilganger gjennom Fiks Protokoll-API-et i stedet for Fiks Forvaltning. Dette aktiveres når systemet opprettes, eller senere under fanen **Konfigurasjon**. Se [Tilgangsstyring]({{< ref "tilgangsstyring.md" >}}) og [Opprett system]({{< ref "veiledninger/3-opprette-system.md" >}}).

## Hvorfor mottar ikke systemet mitt meldinger?

Vanligste årsak er at klienten ikke kjører eller ikke lytter på riktig kø, eller at avsender ikke har fått tilgang til kontoen din. Se [Feilsøking]({{< ref "feilsoking.md" >}}).

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

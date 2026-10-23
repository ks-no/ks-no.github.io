---
title: SvarUt
description: "Digital utsending av post fra kommuner og andre offentlige virksomheter, og mottak av post direkte i sak- og arkivsystemet."
aliases: [/svarut/]
---

{{< svarut-avvikling >}}

SvarUt er KS Digital sin tjeneste for digital utsending av post fra kommuner og andre offentlige virksomheter. Fagsystemet sender én forsendelse til SvarUt, og SvarUt finner den beste kanalen for mottakeren: digital postkasse, Altinn, SvarInn, Norsk Helsenett eller papirpost.

SvarInn er motsatt vei. Med SvarInn henter sak- og arkivsystemet post som er sendt til virksomheten, direkte fra SvarUt.

![Fagsystemer sender til SvarUt, som leverer til digital postkasse, Altinn, SvarInn, Norsk Helsenett eller printleverandør](/images/svarut/svarut-kanaler.png)

## Hva vil du gjøre?

{{< cards >}}
{{% card title="Komme i gang" href="/tjenester/svarut/kom-i-gang/" %}}
Avtale, Maskinporten, Fiks-integrasjon og tilganger. Start her om du skal lage en ny integrasjon.
{{% /card %}}
{{% card title="Sende post" href="/tjenester/svarut/sende/" %}}
Send forsendelser fra et fagsystem med SvarUt REST v3, og følg status til de er levert.
{{% /card %}}
{{% card title="Motta post" href="/tjenester/svarut/motta/" %}}
Hent post til virksomheten direkte inn i sak- og arkivsystemet med SvarInn.
{{% /card %}}
{{% card title="Migrere fra SOAP eller REST v1" href="/tjenester/svarut/migrering/" %}}
Opprett en ny integrasjon for REST v2/v3 med den tilgangen dere har i dag.
{{% /card %}}
{{< /cards >}}

## Grensesnitt

| Grensesnitt | Brukes til | Autentisering | Dokumentasjon |
|---|---|---|---|
| SvarUt REST v2/v3 | Sende forsendelser og hente status | Maskinporten og Fiks-integrasjon | [Sende post](/tjenester/svarut/sende/) |
| SvarInn v2 | Hente post til et mottakersystem | Mottakersystem-id og servicepassord | [Motta post](/tjenester/svarut/motta/) |
| Webportal | Sende og følge opp forsendelser manuelt, sette opp mottakersystem | ID-porten | [svarut.ks.no](https://svarut.ks.no/) |
| SOAP V4–V11 og REST v1 | Avvikles | Brukernavn og passord | [Utgåtte API-er](/tjenester/svarut/utgatt/) |

Se [versjonsoversikten](/tjenester/svarut/api-versjoner/) for alle versjoner og spesifikasjoner.

## Miljøer

| Miljø | Webportal og API | Base-URL for API |
|---|---|---|
| Test | <https://test.svarut.ks.no/> | `https://test.svarut.ks.no/api` |
| Produksjon | <https://svarut.ks.no/> | `https://svarut.ks.no/api` |

SvarUt har egen vertsadresse. API-et ligger ikke under `api.fiks.ks.no` som de fleste andre Fiks-tjenester. Se [Testmiljø](/tjenester/svarut/testmiljo/) for testbrukere og hvordan dere får tilgang.

### IP-adresser

Må dere åpne i brannmuren, ligger SvarUt bak disse adressene:

| Test | Produksjon |
|---|---|
| 137.221.25.65 | 137.221.25.66 |
| 137.221.28.65 | 137.221.28.66 |

## Avtale og konfigurasjon

Kommunen eller virksomheten må ha avtale med KS Digital om bruk av SvarUt. Etter at avtalen er signert, får dere en veiledning i [konfigurasjon av SvarUt](https://ksdigital.no/tjenestene/svarut-tjenesten/svarut-konfigurasjon/). Informasjonen på ksdigital.no er for kommuner og virksomheter som har avtale.

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

---
title: Beste praksis for meldingshåndtering
date: 2026-05-21
weight: 15
---

**Slik håndterer en klient asynkron meldingsutveksling i Fiks Protokoll riktig — hold tilkoblingen åpen, og bekreft hver melding med `ack()`.**

Fiks Protokoll er asynkron og kø-basert. Den vanligste feilen hos nye integrasjoner er at klienten ikke konsumerer meldinger riktig: meldinger blir liggende, leveres på nytt, havner i dead-letter-køen og går ut på tid. Denne siden samler reglene som gjelder **alle protokoller** og **all meldingsutveksling** over Fiks Protokoll.

### Hvem er dette for?

Dette er for **utviklere av klienter** — både fagsystem og arkivsystem. Begge rollene både sender og mottar meldinger: et arkiv mottar forespørsler og sender kvitteringer, et fagsystem sender forespørsler og mottar `mottatt`-meldinger, kvitteringer og svar. Reglene under gjelder derfor begge.

### Tankemodell: kø-basert og asynkront

Hver konto i Fiks IO har en **kø**. Når noen sender en melding til kontoen din, legges den på køen din og pushes til klienten din i det øyeblikket den ankommer. Dette er ikke en request/response-tjeneste du spør med jevne mellomrom — klienten din må være koblet til og lytte.

Lytter ingen på køen, hoper meldingene seg opp. De har en levetid (TTL), og uhåndterte meldinger går til slutt tapt.

### Regel 1: Hold en langtlevende tilkobling

Klienten må holde en **åpen, langtlevende tilkobling** og lytte kontinuerlig på køen.

- Start et abonnement på kontoens kø når klienten starter, og hold det åpent.
- Selve kø-tilkoblingen håndteres av Fiks IO-klienten fra KS og det underliggende RabbitMQ-biblioteket, som automatisk gjenoppretter koblingen (auto-recovery) ved kortvarige nettverksbrudd. Du trenger ikke skrive egen reconnect-logikk.
- Det du må sørge for, er at klient-prosessen faktisk kjører **kontinuerlig** og er abonnert. Den vanligste feilen er ikke et nettverksblipp, men at klienten rett og slett ikke kjører — fordi den er stoppet, har krasjet, eller bare startes av og til. Da hoper meldingene seg opp på køen. Se [Koble til klienten]({{% ref "veiledninger/8-koble-til-klienten.md" %}}).
- Oppdag tapt kobling: .NET-klienten har `IsOpenAsync()`, mens Java-klienten varsler gjennom `onClose`-callbacken i `newSubscription`. Se [Overvåking]({{% ref "overvaaking.md" %}}).
- Skal systemet **kun** sende meldinger, kan du bruke send-klienten, som ikke trenger kø-tilkobling. Skal systemet motta noe som helst — også kvitteringer — må du bruke den fulle klienten og lytte.

### Regel 2: Bekreft alltid med `ack()`

Hver melding du mottar **må** bekreftes med `ack()` etter at du har håndtert den ferdig (typisk persistert den).

- `ack()` forteller køen at meldingen er konsumert, slik at den fjernes fra køen.
- `ack()` er **ikke** det samme som en `mottatt`-melding. En `mottatt`-melding er en protokollmelding du sender tilbake til avsender. `ack()` er kun en beskjed til køen om å fjerne meldingen. Du gjør begge deler: send eventuell `mottatt`/`kvittering` som protokollen krever, **og** `ack()` meldingen.
- Du skal `ack()`-e så snart meldingen er trygt håndtert — verken før (da kan den gå tapt ved en feil) eller aldri.

### Regel 3: Håndter feil — `ack()` og send feilmelding

Også når håndteringen **feiler**, skal du:

1. **Sende protokollens feilmelding** tilbake til avsender — for eksempel en `...feilmelding.serverfeil` ved en intern feil, eller `...feilmelding.ugyldigforespoersel` hvis forespørselen var ugyldig. Da vet avsenderen at noe gikk galt, og hva.
2. **`ack()`-e den innkommende meldingen** etterpå, slik at den ikke blir liggende på køen.

Aldri la en melding ligge uhåndtert i håp om at den «ordner seg», og ikke bruk `nack` som standard måte å håndtere feil på. Riktig feilhåndtering er en kontrollert feilmelding tilbake — ikke en taus avvisning.

### Hva skjer hvis du ikke `ack()`-er?

Uteblir `ack()`, blir meldingen liggende på køen og levert på nytt. Etter **tre** mislykkede leveringsforsøk havner den i dead-letter-køen (DLQ), og Fiks IO sender `no.ks.fiks.kvittering.serverfeil.v1` tilbake til avsenderen.

Resultatet er at avsenderen tror noe er galt, meldinger går tapt, og feilen er vanskelig å spore. Dette er den vanligste nybegynnerfeilen — særlig tidlig i en integrasjon. Sørg for at `ack()` er på plass før du tar i bruk en konto i produksjon.

### Nack og NackWithRequeue

Klientene støtter også `nack` (avvis) og `NackWithRequeue` (avvis og legg tilbake på køen), men disse bør du sjelden bruke:

- **`nack`** avviser meldingen helt, og Fiks IO sender **ingen** feilmelding tilbake til avsender — avsenderen får dermed ingen beskjed om at noe gikk galt. **Ikke bruk `nack`.** Riktig håndtering av en feil er å sende protokollens feilmelding tilbake og deretter `ack()`-e meldingen.
- **`NackWithRequeue`** legger meldingen tilbake på køen, men dette teller som et leveringsforsøk. Gjentatt `NackWithRequeue` bruker raskt opp de tre forsøkene og sender meldingen mot DLQ.

I praksis er riktig mønster nesten alltid: håndtér meldingen, send eventuell feilmelding ved feil, og `ack()`.

### Følg protokollens spesifikasjon

Hver protokoll definerer sine egne meldingstyper for `mottatt`-meldinger, kvitteringer og feilmeldinger — for eksempel `no.ks.fiks.arkiv.v1.arkivering.arkivmelding.opprett.kvittering` og `no.ks.fiks.arkiv.v1.feilmelding.serverfeil`. Hvilke meldinger du skal sende tilbake, og når, er definert i protokollens spesifikasjon.

Bruk meldingstypene og rekkefølgen protokollen din beskriver. Se [Protokoller]({{% ref "protokoller" %}}) for oversikt og lenker til hver protokolls spesifikasjon.

### Idempotens og retry

Fordi utvekslingen er asynkron, kan du ikke ta for gitt at du får svar på en melding du har sendt. Mottakeren kan ha feilet, eller selve kvitteringen kan ha kommet bort. Avsenderen må da vurdere å sende meldingen på nytt.

Tre ID-er er i spill, og det er viktig å holde dem fra hverandre:

| ID | Hvem setter den | Brukes til |
|----|-----------------|------------|
| `melding-id` | **Fiks IO** — du får den tilbake når du sender | Fiks IO sin identifikator for én konkret sending. Ny og unik for **hver** sending, også hver resend. |
| `klientMeldingId` | **Avsender** | Kjenne igjen at en melding er en **resend av samme melding**. Sett selv, og gjenbruk **samme** verdi ved retry. |
| `klientKorrelasjonsId` | **Avsender** (på første melding i en dialog) | **Sporing** — kopieres uendret gjennom alle svarmeldinger, så du kan følge hele dialogen på tvers av svar og resend. |

Kjøreregler for retry:

- Sett `klientMeldingId` på alle meldinger, og bruk **samme** verdi når du sender den samme meldingen på nytt, så mottakeren kan oppdage duplikatet.
- Sett `klientKorrelasjonsId` på den første meldingen i en dialog, og kopiér den uendret inn i alle svar. Bruker du `.Svar()`-funksjonaliteten i Fiks IO-klienten fra KS, gjøres dette automatisk — sender du svar med `.Send()`, må du kopiere den selv.
- Ha et **maks antall** retry-forsøk, og vent litt mellom forsøkene — ikke retry umiddelbart.

Mottakeren bør være idempotent: får den en melding med en `klientMeldingId` den allerede har håndtert, kan den sende `mottatt`/`kvittering` på nytt uten å utføre handlingen to ganger. Se [headere og properties]({{% ref "fiksio.md" %}}#headere-og-properties-i-meldingsutvekslingen).

### Overvåk tilkoblingen

Overvåk at klienten faktisk er koblet til og henter meldinger. Mister klienten koblingen, vises en advarsel i Fiks Forvaltning, og meldinger blir liggende. Se [Overvåking]({{% ref "overvaaking.md" %}}) og [Feilsøking]({{% ref "feilsoking.md" %}}).

### Test grundig før produksjon

Både fagsystem og arkivsystem skal ha testet meldingsutvekslingen **grundig i KS sitt testmiljø** før de tas i bruk i produksjon. Bekreft at klienten holder tilkoblingen, konsumerer meldinger, `ack()`-er, og sender riktige `mottatt`-, `kvittering`- og feilmeldinger i tråd med protokollen — også for feiltilfeller.

Verktøy for testing — bl.a. **Fiks Protokoll-validator**, som validerer flere av protokollene — er samlet under [Protokoller → Teste protokollimplementasjonen]({{% ref "protokoller" %}}#teste-protokollimplementasjonen).

Se [Felles → Testmiljø]({{% ref "/Felles/testmiljo.md" %}}) for tilgang og URL-er til testmiljøet.

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

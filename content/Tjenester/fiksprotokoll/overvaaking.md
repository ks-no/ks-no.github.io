---
title: Overvåking
date: 2026-05-20
weight: 40
---

**Anbefalinger og APIer for å overvåke koblingsstatus og meldingskøer i Fiks Protokoll.**

Det anbefales at man overvåker at man har en fungerende mottakende komponent som henter meldinger fra køen. Siden meldinger har en time-to-live kan man risikere at de går ut på tid og ikke blir hentet. Det er også i ens egen interesse å svare på meldinger så fort som mulig.

Hvordan man overvåker at man kan sende og motta meldinger er opp til en selv, men vi anbefaler at man i det minste overvåker koblingsstatus til Fiks IO for henting av meldinger.

## Overvåk koblingen i klienten

Hvordan du oppdager at klienten har mistet koblingen, avhenger av hvilken klient du bruker:

- **.NET-klienten** har en `IsOpenAsync()`-metode som viser om klienten selv ser at den har en aktiv kobling. Den kan kalles jevnlig som en helsesjekk.
- **Java-klienten** har ingen tilsvarende `isOpen()`-metode. I stedet registrerer du en `onClose`-callback når du abonnerer — bruk overloaden `newSubscription(onMelding, onClose)`. `onClose` kalles med en `ShutdownSignalException` når abonnementet eller koblingen avsluttes, og det er her du fanger opp at koblingen er nede.

Kortvarige nettverksbrudd gjenopprettes automatisk av RabbitMQ-biblioteket som klientene bygger på (auto-recovery) — du trenger ikke skrive egen reconnect-logikk. Det viktige er at selve klient-prosessen kjører kontinuerlig.

I tillegg kan begge klientene spørre Fiks IO Katalog-API-et om status for en konto (se under), som bl.a. gir **antall konsumenter** på kontoen.

## Status for konto via API

```
GET /fiks-io/katalog/api/v1/kontoer/{kontoId}/status
```

[OpenAPI Specification (Fiks IO katalog API)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/fiksio-katalog-api-v1.json)

## Status i Fiks Forvaltning

Inne på forvaltningssidene til Fiks Protokoll kan man se noen statuser på sine systemer og protokollkontoer. En protokollkonto er en wrapper rundt en Fiks IO-konto, som igjen har en kø for meldinger til den kontoen. Enkel status for denne køen vises på forvaltningssidene.

På system-siden vil man få en advarsel hvis man har protokollkontoer som ikke har kobling — det vil si én eller flere protokollkontoer som ikke lytter og henter meldinger fra køen.

Går man inn på listen over kontoer vil man også se status for hver enkelt konto: koblingsstatus (om det mangler noe som henter meldinger fra køen) og antall meldinger som ligger på køen. Dette vises også inne på selve kontoen.

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

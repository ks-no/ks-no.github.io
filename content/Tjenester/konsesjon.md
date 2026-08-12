---
title: Fiks konsesjon
date: 2026-06-10
aliases: [/fiks-platform/tjenester/konsesjon/, /fiks-plattform/tjenester/konsesjon/]
---
## Kort beskrivelse
**Digital innsending og behandling av egenerklæring om konsesjonsfrihet og søknad om konsesjon.**

Fiks konsesjon er en tjeneste under KS Min kommune som erstatter dagens papirbaserte prosess for konsesjonsavklaring ved eiendomserverv. Tjenesten er det sentrale knutepunktet mellom erverver/megler, Landbruksdirektoratet (Ldir) og kommunenes fagsystemer, og fyller skjemaene automatisk med data fra nasjonale registre.

Tjenesten er under utvikling i samarbeid mellom Landbruksdirektoratet, Kartverket, KS og Eiendom Norge, finansiert gjennom prosjektet «Digitalisering av konsesjonsavklaringer» (2025–2027). Gradvis utrulling er planlagt fra oktober 2026.

Fiks konsesjon tilbyr:

- Digitale skjemaer for egenerklæring om konsesjonsfrihet og søknad om konsesjon, som erstatter dagens papirbaserte løsning.
- Automatisert behandling av egenerklæringer der regelverket gir rom for det.
- API som fagsystem- og meglersystemleverandører kan integrere mot for å tilby bedre sluttbrukerløsninger til privatpersoner og kommuner.

> **Status:** Tjenesten er under utvikling. API-kontrakten er ikke låst og kan bli endret frem til produksjonssetting.


## Tilgjengelige grensesnitt
Fiks konsesjon vil eksponere APIer som fagsystem- og meglersystemleverandører kan integrere mot for å tilby bedre sluttbrukerløsninger til privatpersoner og kommuner.

| Type              | Detaljer                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Web portal        | Min kommune (innbygger) og Fiks Forvaltning (kommune)                                                              |
| Maskin til maskin | [Konsesjon megler-API (v1)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/konsesjon-megler-api-v1.json) |
| Autentisering     | ID-porten (innbygger og saksbehandler), Maskinporten (meglersystem)                                                |

**Vær obs på at det vil det komme endringer som brekker API-kontrakten. Kontrakten låses ikke før vi er i produksjon.**


## Aktører og roller

Fiks konsesjon binder sammen flere aktører i konsesjonsprosessen:

| Aktør                     | Rolle                                                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Innbygger / erverver      | Fyller ut egenerklæring eller søker konsesjon i Min kommune, autentisert via ID-porten.                                  |
| Megler / eiendomsadvokat  | Opptrer på vegne av erverver via meglersystem integrert mot megler-API (Maskinporten).                                   |
| Kommunen                  | Behandlingsansvarlig. Saksbehandler egenerklæring og søknad, fatter vedtak og sender til tinglysning via eget fagsystem. |
| Landbruksdirektoratet     | Eier skjemaene og konsesjonslogikken, preutfyller og validerer skjemadata.                                               |
| Kartverket                | Leverer matrikkel- og grunnboksdata, og forvalter de digitaliserte bopliktsområdene (NIBAS).                            |
| KS Digital                | Drifter Fiks-plattformen, eksponerer megler-API og innsending til kommune, og opptrer som databehandler.                 |

## Overordnet flyt

1. **Oppstart.** Prosessen starter enten ved at innbygger logger inn i Min kommune via ID-porten, eller ved at megler starter avklaringen på vegne av erverver via API. Inngangsdata er erververs fødselsnummer og eiendomsidentifikasjon (gårds- og bruksnummer, eventuelt seksjons-/festenummer).
2. **Datainnhenting og preutfylling.** Skjemaet fylles automatisk med opplysninger fra nasjonale registre — matrikkel- og bopliktdata fra Kartverket, folkeregisteropplysninger, og organisasjonsdata fra Brønnøysundregistrene.
3. **Konsesjonslogikk.** Ldirs regellogikk vurderer opplysningene mot gjeldende regelverk og avgjør om ervervet er konsesjonsfritt, om egenerklæring kreves, eller om det må søkes konsesjon. Logikken er koordinert med tinglysningslogikken hos Kartverket slik at de gir samme svar.
4. **Innsending.**
   - *Egenerklæring:* PDF genereres og oversendes kommunens fagsystem via Fiks Arkiv.
   - *Konsesjonssøknad:* PDF signeres digitalt via Digdirs signeringsløsning før den oversendes kommunen via Fiks Arkiv.
5. **Saksbehandling.** Kommunen behandler saken i eget fagsystem der regelverket krever manuell vurdering, og registrerer avklart konsesjon.
6. **Status og innsyn.** Saksstatus (åpen / under arbeid / avsluttet) gjøres tilgjengelig for innbygger i Min kommune og for megler via megler-API.

## Kom i gang

**For kommuner**

1. Aktiver Fiks konsesjon via [Fiks Forvaltning](https://forvaltning.fiks.ks.no/).
2. Konfigurer mottak i fagsystemet gjennom Fiks Arkiv.
3. Opprett saksbehandlere og tildel tilgang i Fiks Forvaltning.

**For meglersystemleverandører**

1. Inngå avtale med KS Digital om bruk av megler-API.
2. Sett opp en Maskinporten-klient for autentisering (se [felles dokumentasjon om integrasjoner](https://developers.fiks.ks.no/felles/integrasjoner/index.html)).
3. Integrer mot [megler-API-et](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/konsesjon-megler-api-v1.json). Merk at kontrakten kan endres fram til produksjonssetting.

## API

Fiks konsesjon eksponerer et REST-API som meglersystemer kan integrere mot for å avklare konsesjon ved eiendomssalg. API-et dekker blant annet:

- oppslag på om egenerklæring er påkrevd og om det foreligger boplikt for en eiendom,
- opprettelse av en konsesjonsavklaring,
- pre- og hovedsjekk av egenerklæring,
- generering av PDF og innsending til erververe,
- godkjenning med oversendelse til Fiks Arkiv og oppgave i Min kommune,
- oppslag på status for en avklaring.

Full API-spesifikasjon: [Konsesjon megler-API (v1)](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/konsesjon-megler-api-v1.json).

> API-et er et førsteutkast. Det vil komme endringer som bryter kontrakten, og kontrakten låses ikke før tjenesten er i produksjon.

## Relaterte tjenester

- [Fiks Arkiv](https://developers.fiks.ks.no/tjenester/fiksprotokoll/protokoller/arkiv/index.html) – oversendelse av saker til kommunenes fagsystem
- [Min kommune](https://developers.fiks.ks.no/tjenester/minkommune/index.html) – Min Kommune, innbyggerløsning som konsesjon baserer seg på for utfylling og statusinnsyn
- [Maskinporten](https://developers.fiks.ks.no/felles/difiidportenklient/index.html) – autentisering for API-integrasjon

## Kontakt
Tekniske spørsmål og henvendelser kan rettes til fiks-utvikling@ksdigital.no, øvrige henvendelser kan rettes til fiks@ksdigital.no

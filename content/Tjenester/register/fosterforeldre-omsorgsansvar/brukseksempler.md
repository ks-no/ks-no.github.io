---
title: Brukseksempler
date: 2026-10-02
---

## Eksempel på operasjonen `endre`

Eksempelet nedenfor er JSON-bodyen for et kall til **`POST /api/v1/omsorgsansvar/endre`** ved en ny fosterhjemsplassering. De andre operasjonene har egne endepunkter og request-skjemaer i [Fiks-API-spesifikasjonen på GitHub](https://github.com/ks-no/fiks-register-fosterforeldre-produsent-spec/blob/main/register-fosterforeldre-produsent.json). Eksempelverdiene er kun illustrasjoner.

```json
{
  "avsendersMeldingsidentifikator": "98f00932-8dda-4470-9ad9-9e8107a3d9e7",
  "avsendersSaksreferanse": "SAK-1111",
  "kildesystem": "Eksempel Fagsystem",
  "gyldighetsdato": "2026-09-01",
  "innsender": {
    "barnevernstjeneste": "981507320"
  },
  "fosterbarn": {
    "foedselsEllerDNummer": "06821099739"
  },
  "fosterforelder": {
    "foedselsEllerDNummer": "17908599950"
  },
  "barnevernstjeneste": {
    "ansvarligBarnevernstjeneste": "981507320"
  }
}
```

Scenarioene under viser hvilken **operasjon i Fiks-API-et** du skal kalle og hvilke opplysninger som er viktige i hvert tilfelle. Ikke bruk `endre`-eksempelet ukritisk for andre operasjoner: sjekk request-skjemaet for endepunktet du kaller. Bruk en ny unik meldingsidentifikator for hvert nytt kall, også når flere kall gjelder samme sak. Ved retry av *samme* innsending brukes derimot samme identifikator. Se [innsending]({{% ref "innsending.md" %}}) og [tilbakemeldinger]({{% ref "tilbakemeldinger.md" %}}) for reglene.

## 1. Ny fosterhjemsplassering

Barnet flytter inn hos en fosterforelder. Kall `POST /api/v1/omsorgsansvar/endre` med `gyldighetsdato` lik datoen omsorgsansvaret gjelder fra. Barn og fosterforelder skal ikke allerede ha en gjeldende relasjon.

## 2. Begge fosterforeldre skal registreres

Én fosterforelder er registrert fra før, og en annen skal registreres for samme barn. Kall `POST /api/v1/omsorgsansvar/endre` for den andre fosterforelderen med fosterforelderens fødsels- eller d-nummer og en **ny** meldingsidentifikator. Innsender og ansvarlig tjeneste kan være den samme for begge relasjonene.

## 3. Feil person ble registrert

Hvis feil fosterforelder ble meldt inn, eller et fødselsnummer eller d-nummer var feil, kall `POST /api/v1/omsorgsansvar/annullere` for den feilaktige relasjonen. Vent på tilbakemelding om annulleringen før du kaller `POST /api/v1/omsorgsansvar/endre` med riktig fødsels- eller d-nummer og ny meldingsidentifikator. Operasjonen `korrigere` kan ikke endre barnets eller fosterforelderens fødsels- eller d-nummer.

## 4. Feil fra-dato ble sendt inn

Relasjonen er riktig, men gyldig-fra-datoen skal for eksempel endres fra `2026-09-01` til `2026-08-15`. Kall `POST /api/v1/omsorgsansvar/korrigere` med den riktige `gyldighetsdato`. Skal til-datoen rettes, bruk operasjonen `opphoere` i stedet.

## 5. Fosterhjemsforholdet avsluttes

Når barnet flytter hjem, flytter til institusjon eller fosterhjemsavtalen opphører, kall `POST /api/v1/omsorgsansvar/opphoere` med avslutningsdatoen som `gyldighetsdato`. Kallet skal tidligst gjøres på opphørsdatoen.

## 6. Barnet flytter til nytt fosterhjem

Kall `POST /api/v1/omsorgsansvar/opphoere` for den gamle relasjonen med datoen omsorgsansvaret opphører, og `POST /api/v1/omsorgsansvar/endre` for relasjonen til den nye fosterforelderen med datoen det nye ansvaret begynner. For eksempel kan den første relasjonen avsluttes `2026-09-30` og den neste begynne `2026-10-01`. Gjør hvert kall tidligst på datoen endringen gjelder fra, med hver sin meldingsidentifikator.

## 7. Annen barnevernstjeneste overtar ansvaret

Når barnet fortsatt bor hos samme fosterforelder, men en annen tjeneste overtar ansvaret, kall `POST /api/v1/omsorgsansvar/overfoere`. `innsender.barnevernstjeneste` er tjenesten som er ansvarlig i dag; `barnevernstjeneste.ansvarligBarnevernstjeneste` er tjenesten som overtar. Sett `gyldighetsdato` til overføringsdatoen, gjør kallet tidligst den dagen, og kall operasjonen én gang per gjeldende relasjon.

## 8. Registreringen skulle aldri vært opprettet

Hvis en plassering ikke ble gjennomført, vedtaket ble omgjort før plasseringen trådte i kraft, eller registreringen ble sendt på feil grunnlag, kall `POST /api/v1/omsorgsansvar/annullere`. `gyldighetsdato` må fremdeles være med i forespørselen, men datoen har ingen praktisk betydning ved annullering.

## 9. Rett opphørsdato på en historisk relasjon

En relasjon som begynte `2026-08-01` ble avsluttet med til-dato `2026-09-01`, men riktig til-dato var `2026-09-15`. Kall `POST /api/v1/omsorgsansvar/opphoere` med `gyldighetsdato: "2026-09-15"` for å rette til-datoen på den nyeste relasjonen, selv om den allerede er historisk. Operasjonen `korrigere` retter bare fra-datoen.

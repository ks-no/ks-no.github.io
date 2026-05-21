---
title: Fiks Digisos
date: 2020-10-27
aliases: [/fiks-platform/tjenester/digisos/, /fiks-plattform/tjenester/digisos/]
---

## Kort beskrivelse

**Tilrettelegger for kommunal behandling av sosialsøknader sendt fra nav.no.**

Fiks Digisos er en tjeneste for å tilrettelegge for kommunal behandling av sosialsøknader via et brukergrensesnitt på [nav.no](https://www.nav.no). Tjenesten sikrer at saksbehandling skjer i kommunens fagsystem, mens innbygger og NAV-veileder får nødvendig innsyn.

Tjenesten tilbyr:

* Enkelt oppsett for den enkelte kommune gjennom Fiks Konfigurasjon.
* Innbygger får fortløpende oppdatering på saksgang, tilgjengelig på [nav.no](https://www.nav.no).
* Sikker maskin-til-maskin-overføring av søknader og fagsystemets saksoppdateringer.
* Ansatte/brukerstøtte i NAV kan se utvalgte deler av saken via NAV sine systemer.

### Grensesnitt:

| Type | Detaljer |
|------|----------|
| Web portal | [fagsystem-integrasjon og nav.no](https://www.nav.no) |
| Fiks IO | Protokoll `no.nav.digisos.fagsystem.v1` |
| Maskin til maskin | [Sak API-spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/digisos-sak-api-v1.json) |
| Maskin til maskin (NAV) | [Soknad API-spec](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/digisos-api-v1.json) |

## Kom i gang

Tjenestespesifikke forutsetninger:

1. Tjenesten må aktiveres via [Fiks Konfigurasjon](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester) gjennom en veiviser.
2. Kommunen må konfigurere mottakskanal i fagsystemet (Fiks IO eller SvarUt).
3. Integrasjonen må gis tilgang til Digisos-tjenesten inne i Fiks Konfigurasjon.
4. Oppsett av Maskinporten-klient for autentisering (se [felles dokumentasjon]({{< ref "integrasjoner.md" >}})).

## Beskrivelse av tjenesten

Fiks Digisos fungerer som et bindeledd mellom NAV og kommunene. Den bruker flere komponenter fra Fiks-plattformen:
- **Fiks Digisos API**: Håndterer innsending fra NAV og saksoppdateringer fra kommuner.
- **Fiks Dokumentlager**: Lagrer krypterte dokumenter som innbyggeren kan se på nav.no.
- **Fiks IO**: Sikker kanal for maskin-til-maskin integrasjon, hvor søknadene blir meldingskryptert med mottakers offentlige nøkkel.
- **SvarUt/SvarInn**: Alternativ leveringskanal med leveranse med print dersom kommunens fagsystem ikke klarer å motta digitale forsendelser via SvarInn.

### Overordnet flyt

1. **Innsending:** Innbygger fyller ut søknad på nav.no, som sendes til Fiks Digisos gjennom et synkront HTTP-API.
2. **Mottak:** Fiks Digisos mottar søknaden.
    1. Søknadsfilen legges i Fiks Dokumentlager, og innbyggeren autoriseres for tilgang.
    2. Fiks Digisos henter valgt leveransekanal for søknaden fra kommunens konfigurasjon:
        - **Fiks IO:** Kommunens konto-id brukes som mottaker. Meldinger valideres før sending. Hvis mottak ikke bekreftes innen en fastsatt periode, brukes alternativ kanal SvarUt.
        - **SvarUt/SvarInn:** Søknaden sendes til kommunens SvarInn mottakersystem.
    3. Fiks returnerer `202 ACCEPTED` til NAV. Dette markerer ansvarsoverføring fra NAV til Fiks, som fra nå garanterer at saken leveres til kommune for behandling.
3. **Behandling:** Søknaden opprettes i kommunalt fagsystem. Fagsystemet bekrefter mottak og oppdaterer status i Fiks Digisos API.
    - Evt. nye filer legges til saken, autorisert for innbygger.
4. **Innsyn:** Saken og nye hendelser er tilgjengelige for innbygger på nav.no.
5. **Fallback:** Om fagsystemet avviser eller unnlater å bekreftes mottak via Fiks IO, benyttes SvarUt som alternativ kanal. Det inkluderes en fil som inneholder både NAV og Fiks Digisos sin id for saken.

![fiks_digisos](https://ks-no.github.io/images/fiks_digisos.png "Fiks Digisos")

### Sikkerhet
Systemet er lagt opp slik at NAV ikke trenger å lagre data; disse fjernes fra NAVs systemer når søknaden sendes til Fiks. All tilstand lagres på Fiks-plattformen og hos kommunen. Innsending kan utelukkende gjøres med brukerens ID-Porten autentisering.

Kommunikasjonen mellom NAV, Fiks og fagsystem foregår med SSL-kryptering. I tillegg er alle dokumenter kryptert med mottakers nøkkel (ende-til-ende). NAV krypterer med Fiks sin nøkkel, Fiks krypterer med fagsystemets, og fagsystemet bruker Fiks-nøkkelen ved oppdatering.

Innbygger har tilgang til alle egne opplastede dokumenter. NAV-ansatte har tilgang til et begrenset utvalg metadata via autentisering med NAVs virksomhetssertifikat og integrasjonsinnlogging. Alle slike spørringer logges i Fiks Audit.

### Tjenestespesifikke regler
- **Historikk:** Hver sakoppdatering inneholder en komplett historikk av alle tidligere hendelser, og vil alltid overskrive tidligere sakoppdatering lagret i Fiks Digisos.
- **Filreferanser:** Filer må lastes opp på forhånd. `digisos-soker.json` inneholder referanse-id til dokumentene.
- **SvarUt-referanser:** Ved referanse til SvarUt-dokument består referansen av SvarUt sin forsendelsesId og dokumentnummer (indeks fra 1). Fagsystemet er ansvarlig for at disse filene er tilgjengelige når de linkes til.

---

## Meldingsprotokoll

For fagsystemer som mottar søknader via Fiks IO. Benytter protokollen `no.nav.digisos.fagsystem.v1`.

Fullstendig skjemadefinisjon: [github.com/ks-no/fiks-io-meldingstype-katalog](https://github.com/ks-no/fiks-io-meldingstype-katalog/tree/prod/schema)

| Meldingstype | Retning | Body | Beskrivelse |
|--------------|---------|------|-------------|
| `no.nav.digisos.soknad.v1` | Til fagsystem | [JSON](https://github.com/ks-no/fiks-io-meldingstype-katalog/tree/prod/schema/no.nav.digisos.soknad.v1) | Ny søknad med metadata |
| `no.nav.digisos.ettersendelse.v1` | Til fagsystem | [JSON](https://github.com/ks-no/fiks-io-meldingstype-katalog/tree/prod/schema/no.nav.digisos.ettersendelse.v1) | Vedlegg sendt etter at søknad er levert |
| `no.nav.digisos.soknad.mottatt.v1` | Fra fagsystem | Tom | Bekreftelse på mottatt søknad |
| `no.nav.digisos.ettersendelse.mottatt.v1` | Fra fagsystem | Tom | Bekreftelse på mottatt ettersendelse |

---

## API-referanse

Endepunkter og skjemaer vedlikeholdes i Swagger:
- [Fiks Digisos Sak API](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/digisos-sak-api-v1.json) (For fagsystem)
- [Fiks Digisos Soknad API](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/digisos-api-v1.json) (For NAV)
- [Fiks Digisos Mellomlagring API](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/digisos-mellomlagring-api-v1.json)

### Særlige krav for Fagsystem

#### Mottak av søknader og ettersendelser via SvarUt
Ved mottak via SvarUt legges det ved en fil kalt `forsendelseMetadata.json`. 

Eksempel på  `forsendelseMetadata.json` for søknad:
```json
{
    "eksternRef": "110004PCC",
    "digisosId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

Eksempel ved ettersendelse:
```json
{
    "eksternRef": "110003EFF",
    "digisosId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "soknadLeveranseId": { 
        "sendtKanal": "SVARUT",
        "id": "4c7ca4bf-d2c2-4eaa-9a53-4544c9261c18"
    }
}
```
* `sendtKanal` kan være `SVARUT` (id er forsendelses-id) eller `FIKS_IO` (id er meldingsId for Fiks IO-forsendelsen).

#### Opplasting av filer (tilknyttet sakoppdateringer)
URL: `/digisos/api/v1/{fiksOrgId}/{digisosId}/filer`
- **Metode:** Multipart streaming request med `Transfer-Encoding: chunked`.
- **Kryptering:** Filer må krypteres før opplasting med public-key fra `/digisos/api/v1/dokumentlager-public-key`.
- **Metadata:** For hver fil sendes to data-fields: én JSON-blokk (`application/json`) med metadata, og én med selve filen (InputStream).
  ```json
  {
      "filnavn": "test.pdf",
      "mimetype": "application/pdf",
      "storrelse" : 1024
  }
  ```
- **Returtype:** 200 OK med liste av dokumentmetadata (inkl. `dokumentlagerDokumentId`). 400 Bad Request ved feil.

### Særlige krav for NAV

#### Innsending av ny søknad
URL: `/digisos/api/v1/soknader/{kommunenummer}/{navEkseternRefId}`
- **Rekkefølge i multipart:** Må være nøyaktig `soknadJson`, `vedleggJson`, metadata + `soknad.pdf`, metadata + `vedlegg1.pdf`, osv.
- **Kryptering:** Alle PDF-filer må krypteres med public key til Fiks Dokumentlager.
- **Retur:** `202 ACCEPTED` med en unik Fiks DigisosId (UUID).

#### Innsending av ettersendelse
URL: `/digisos/api/v1/soknader/{kommunenummer}/{soknadId}/{navEkseternRefId}`
- **Format:** Multipart streaming.
- **Data:** Inneholder metadataen `vedlegg.json`, pluss alle vedlegg på samme format som over (metadata JSON etterfulgt av fil).

#### Innsending med mellomlagring
For å laste opp filer enkeltvis (i stedet for en stor request), bruk Mellomlagring API-et knyttet til `{navEksternRefId}`. 
Når alt er lastet opp, send søknaden via `/digisos/api/v2/soknader/{kommunenummer}/{navEksternRefId}` (eller tilsvarende for ettersendelse). Vedlegg hentes da automatisk fra mellomlageret og slettes.

#### Henting av filer (for NAV)
Fiks returnerer dokument-IDer i søknaden. Rutinene for nedlasting er:
- `/digisos/api/v1/nav/soknader/{digisosId}/dokumenter/{dokumentlagerId}` for filer NAV-ansatte har innsyn i (`soknad.json`, `vedlegg.json`, `digisos-soker.json`).
- Alle andre filer er *kun for innbygger*, tilgjengelig via MinSide `minside.kommune.no/dokumentlager/...` eller SvarUt URL.

---

## Versjonering

| Versjon | Status | Utfasingsdato | Hva er nytt |
|---------|--------|---------------|-------------|
| [v1](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/digisos-sak-api-v1.json) | ✅ Gjeldende | – | Første versjon |
| [v2](https://editor-next.swagger.io/?url=https://developers.fiks.ks.no/api/digisos-api-v1.json) | ✅ Gjeldende | – | Støtte for mellomlagring av vedlegg (NAV API) |

---

## Klientbibliotek

KS tilbyr referanseimplementasjoner og klienter:
- [fiks-digisos-klient (Java)](https://github.com/ks-no/fiks-digisos-klient) - Eksempel på filopplasting og integrasjon.
- [fiks-maskinporten-client](https://github.com/ks-no/fiks-maskinporten) - For generering av access tokens.

---

## Relaterte tjenester

- [Fiks IO]({{< ref "fiksio.md" >}}) – sikker meldingsutveksling
- [Fiks Dokumentlager]({{< ref "dokumentlager.md" >}}) – lagring av vedlegg
- [SvarUt / SvarInn]({{< ref "svarut/_index.md" >}}) – alternativ leveringskanal

---

## Få hjelp

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

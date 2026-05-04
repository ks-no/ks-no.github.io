---
title: Maler for tjenestedokumentasjon
weight: 999
---

# Maler for tjenestedokumentasjon

Denne mappen inneholder maler som skal brukes som utgangspunkt når en ny Fiks-tjeneste skal dokumenteres på `developers.fiks.ks.no`.

Målet med malene er at all ekstern dokumentasjon for våre tjenester skal ha:

- Konsistent struktur og rekkefølge på avsnitt
- Tydelig "Kom i gang"-flyt for integratorer
- Eksplisitt informasjon om autentisering, miljøer og endepunkter
- Lenker til relaterte felleskomponenter (Maskinporten, Dokumentlager, Fiks IO osv.)

## Velg riktig mal

| Type tjeneste | Beskrivelse | Mal | Eksempler |
|---------------|-------------|-----|-----------|
| **REST API-tjeneste** | Synkron HTTP API for fagsystem-integrasjon | [`api-tjeneste.md`](api-tjeneste.md) | Dokumentlager, Samtykke, Kjøretøyregister, Eiendomsavtaler |
| **Meldingsbasert tjeneste** | Asynkron meldingsutveksling via Fiks IO / Fiks Protokoll | [`meldings-tjeneste.md`](meldings-tjeneste.md) | Bekymringsmelding, Digisos, Fiks Arkiv |
| **Innbyggerportal-tjeneste** | Web-portal rettet mot innbyggere, ofte med tilhørende API for kommune/fagsystem | [`portal-tjeneste.md`](portal-tjeneste.md) | min.kommune.no, Samtykke (innbygger), Bekymringsmelding (skjema) |
| **Felleskomponent** | Komponent som brukes på tvers av flere Fiks-tjenester | [`felleskomponent.md`](felleskomponent.md) | Fiks SMS, Fiks del dokument, Maskinporten-klient |
| **Tjenestegruppe (paraply)** | Indeks som peker til flere undertjenester | [`tjenestegruppe.md`](tjenestegruppe.md) | Fiks melding, Fiks protokoll, Fiks register, SvarUt |

## Beste praksis

1. **Ikke dupliser API-spec'en.** Endepunkter, request-/response-skjemaer, feltbeskrivelser og statuskoder skal vedlikeholdes ett sted – i OpenAPI/Swagger-spec'en. Dokumentasjonssida skal lenke til den, ikke gjenta den. Bruk dokumentasjonen til ting som *ikke* står i spec'en: kontekst, flyt, begreper, autentisering, miljøer, tjenestespesifikke regler og eksempler.
2. **Start med "Kort beskrivelse"** – maks 4 setninger som forklarer *hva* tjenesten gjør og *hvem* den er for. En integrator skal kunne avgjøre relevans på under et minutt.
3. **List grensesnitt tidlig** – bruk standardtabellen `Web portal / Maskin til maskin` og lenk til Swagger-spec.
4. **Skill brukerveiledning og integrasjonsutvikling** – ikke bland forvaltningsskjermbilder med integrasjonsdetaljer.
5. **Vær eksplisitt om miljøer** – list både `test` og `prod` base-URL i en tabell.
6. **Eksempler skal være kjørbare og minimale** – det generelle "hello world"-eksempelet for autentisering er sentralisert i [`integrasjoner.md`]({{< ref "integrasjoner.md" >}}#eksempel-autentisert-kall). Lenk til det i stedet for å gjenta det. Tjenestesiden skal kun ha eksempler som viser noe *tjenestespesifikt* (f.eks. multipart-opplasting, signering, kryptering).
7. **Lenk til klientbiblioteker** – Java + .NET der KS tilbyr disse, ellers oppgi at integratoren må kalle API direkte.
8. **Bruk Hugo-shortcodes for interne lenker**: `{{</* ref "fil.md" */>}}` slik at lenker overlever flytting av sider.
9. **Datoer og aliaser i front matter** – sett `date` til siste større oppdatering og inkluder gamle URL-er som `aliases:` slik at eksisterende lenker fortsatt fungerer.
10. **Ikke dupliser fellesinformasjon** – lenk til [`integrasjoner.md`]({{< ref "integrasjoner.md" >}}) og [`sikkerhet.md`]({{< ref "sikkerhet.md" >}}) i stedet for å gjenta autentiseringsdetaljer.
11. **Versjonering** – ved breaking changes skal v1 og v2 dokumenteres separat (se mønster i `bekymringsmelding/`).

## Fjern det du ikke trenger

Malene er bevisst rikholdige. Slett seksjoner som ikke gjelder din tjeneste – det er bedre med kort, korrekt dokumentasjon enn lange seksjoner med plassholdertekst.




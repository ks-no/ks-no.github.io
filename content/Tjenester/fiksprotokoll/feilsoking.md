---
title: Feilsøking
date: 2026-05-20
weight: 60
---

**Sjekkliste for vanlige feilsituasjoner i Fiks Protokoll — symptom, årsak og løsning.**

Finn symptomet som passer, og følg løsningen. Får du ikke løst problemet, ta kontakt via kanalene nederst på siden.

### Kontoen viser «mangler kobling»-advarsel

**Symptom:** I Fiks Forvaltning vises en advarsel om at én eller flere kontoer mangler kobling.

**Årsak:** Ingen klient lytter på kontoens kø — kontoen har ikke et fagsystem «bak» seg som henter meldinger.

**Løsning:**

- Sjekk at Fiks IO-klienten kjører og har et aktivt abonnement på kontoens kø.
- Kontrollér at klienten er konfigurert med riktig `kontoId`, `integrasjonId` og `integrasjonspassord`.
- Rett etter at en konto er opprettet er advarselen forventet — den forsvinner når klienten kobler seg til. Se [Koble til klienten]({{% ref "veiledninger/8-koble-til-klienten.md" %}}).

### `NotAuthorizedException` ved API-kall

**Symptom:** API-kall feiler med `NotAuthorizedException` og meldingen `har ikke privilegiet FIKS.KONFIGURER på ressurs`.

**Årsak:** Systemet er ikke satt opp for konfigurasjon via API.

**Løsning:** Aktivér API-konfigurasjon på systemet under fanen **Konfigurasjon** i Fiks Forvaltning. Se [Opprett system]({{% ref "veiledninger/3-opprette-system.md" %}}), steg 8.

### Du får meldingstype `tidsavbrudd` tilbake

**Symptom:** Du mottar en melding av typen `no.ks.fiks.kvittering.tidsavbrudd`.

**Årsak:** Levetiden (TTL) på meldingen du sendte har utløpt før mottaker hentet den. Mottakeren henter sannsynligvis ikke meldinger fra køen sin.

**Løsning:**

- Sjekk med mottaker at klienten deres kjører og lytter på køen.
- Vurdér en lengre TTL hvis mottaker kan være nede i perioder.
- Vær oppmerksom på at TTL trigges når meldingen kommer fremst i køen — ligger det en melding med lang TTL foran, kan tidsavbrudd-meldingen komme senere enn forventet. Se [Fiks IO]({{% ref "fiksio.md" %}}#levetid-på-melding-og-ttl).

### Du får meldingstype `serverfeil` tilbake

**Symptom:** Du mottar en melding av typen `no.ks.fiks.kvittering.serverfeil.v1`.

**Årsak:** Levering til mottaker feilet. Denne sendes etter tre mislykkede leveringsforsøk — for eksempel at mottaker hentet meldingen uten å bekrefte den (Ack), eller avviste den med `NackWithRequeue` tre ganger.

**Løsning:** Kontakt mottaker for å undersøke hvorfor håndteringen feiler. Merk at protokollene også har egne `serverfeil`-meldingstyper som mottakers system kan sende kontrollert tilbake med en beskrivelse av hva som gikk galt. Se [Feilmeldinger fra Fiks IO]({{% ref "fiksio.md" %}}#feilmeldinger-fra-fiks-io).

### Innlogging eller signering feiler

**Symptom:** Du kommer ikke videre ved innlogging i Fiks Forvaltning, eller kan ikke signere avtalen.

**Årsak:** Brukeren mangler nødvendig tilgang eller signeringsrett.

**Løsning:**

- Innlogging skjer via ID-porten. I produksjon må brukeren ha administrasjonstilgang til organisasjonen i Fiks.
- Signering må gjøres av noen som har rett til å signere avtale på vegne av kundeorganisasjonen.
- I test trenger du en testbruker med tilgang til testorganisasjonen — kontakt [fiks@ksdigital.no](mailto:fiks@ksdigital.no) for hjelp.

### Kryptering eller dekryptering feiler

**Symptom:** Klienten klarer ikke kryptere eller dekryptere meldinger.

**Årsak:** Feil nøkkel eller feil nøkkelformat.

**Løsning:**

- Den private nøkkelen i klienten må være i **PKCS#8**-format. Java-klienten har et verktøy for å konvertere fra PKCS#1.
- Den private nøkkelen i klienten må høre sammen med den offentlige nøkkelen som er lastet opp på kontoen. Byttet du offentlig nøkkel, må klienten oppdateres med den nye private nøkkelen — se [Last opp ny offentlig nøkkel]({{% ref "veiledninger/7-laste-opp-nokkel.md" %}}).
- Den offentlige nøkkelen må være et X.509-sertifikat i `.pem`-format.

### Finner ikke systemet du vil gi tilgang til

**Symptom:** Søk etter systemer gir ikke treff på systemet du leter etter.

**Årsak:** Systemet er kun synlig for egen organisasjon, eller søkefunksjonen er begrenset.

**Løsning:**

- Skal systemet være synlig for andre organisasjoner, må *Tilgjengelig for andre organisasjoner* slås på (per nå kun mulig via API). Se [Tilgangsstyring]({{% ref "tilgangsstyring.md" %}}).
- Søk etter systemer er ikke ferdig implementert, så det kan være vanskelig å finne systemer å be om tilgang til. Avklar `systemId` direkte med eieren av motpart-systemet.

### Forveksling av test og produksjon

**Symptom:** Pålogging eller meldingsutveksling virker i ett miljø, men ikke i det andre.

**Årsak:** Test og produksjon har egne virksomhetssertifikater, URL-er og oppsett.

**Løsning:**

- Bruk testsertifikat og `forvaltning.fiks.test.ks.no` mot test, og produksjonssertifikat og `forvaltning.fiks.ks.no` mot produksjon.
- Sørg for at klienten bygger riktig konfigurasjon (test vs. produksjon). Se [miljøer]({{% ref "/Felles/integrasjoner.md" %}}#miljoer).

### Se også

- [Beste praksis for meldingshåndtering]({{% ref "meldingshandtering.md" %}}) — riktig bruk av `ack()`, feilmeldinger og langtlevende tilkobling
- [Overvåking]({{% ref "overvaaking.md" %}}) — sjekk koblingsstatus og køer
- [Fiks IO]({{% ref "fiksio.md" %}}) — meldingsmekanikk, kvitteringer og Ack/Nack
- [Ofte stilte spørsmål]({{% ref "ofte-stilte-sporsmal.md" %}})

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

---
title: Før du starter
date: 2026-05-20
weight: 1
aliases:
  - /tjenester/fiksprotokoll/veiledning_1_huskeliste_for_opprette_protokoll/
  - /fiks-plattform/tjenester/fiksprotokoll/brukerveiledning/huskeliste/
---

**Sjekkliste over hva og hvem du må ha klart før du setter opp Fiks Protokoll.**

Oppsettet av Fiks Protokoll involverer flere personer, roller, sertifikater og nøkler. Får du alt på plass i forkant, kan du følge veiledningene 2–6 uten å stoppe opp underveis.

### Personer og roller

Oppsettet krever som regel både en person fra kundeorganisasjonen (kommunen) og en eller flere fra leverandøren.

### Person fra kundeorganisasjonen

Dette er personen som tar tjenesten i bruk og som minst oppretter protokollsystemet. Personen må ha:

- En registrert brukerkonto på Fiks-plattformen (innlogging via ID-porten).
- Rett til å signere avtale om bruk av Fiks Protokoll på vegne av organisasjonen — eventuelt at avtalen allerede er signert.
- Tilgang til Fiks Protokoll som tjeneste i Fiks Forvaltning.

Hvis leverandøren setter opp resten via API, holder det at kundepersonen oppretter selve protokollsystemet.

### Person(er) fra leverandør

Det bør være én kontaktperson per leverandør som kan skaffe sertifikater, nøkler og avklaringer underveis. Se punktene nedenfor for hva leverandøren må stille med.

### Teknisk sjekkliste

Ha følgende klart før du begynner:

- [ ] **Virksomhetssertifikat** fra Buypass eller Commfides — ett for test og ett for produksjon.
- [ ] **Maskinporten-klient** satt opp på forhånd. Se [veiledning for Maskinporten]({{% ref "/Felles/difiIdportenKlient.md" %}}).
- [ ] **Avklart organisasjonsnummer.** Samme organisasjonsnummer **må** brukes i virksomhetssertifikatet, i Maskinporten-klienten og i protokollsystemet. Vi anbefaler at leverandøren bruker sitt **eget** virksomhetssertifikat og organisasjonsnummer — ikke kommunens. Avklar dette før du starter.
- [ ] **Valgt protokoll og part.** Avklar hvilken protokoll (f.eks. `no.ks.fiks.arkiv.v1`) og hvilken part i protokollen systemet ditt skal være. Se [Protokoller]({{% ref "/Tjenester/fiksprotokoll/protokoller" %}}).
- [ ] **Offentlig/privat nøkkelpar** generert. **Kun den offentlige nøkkelen** lastes opp (når du oppretter kontoen) — den må være et X.509-sertifikat i `.pem`-format. Den **private nøkkelen skal beholdes av leverandøren og aldri lastes opp noe sted**; den legges kun inn i klientkonfigurasjonen og brukes til å dekryptere innkommende meldinger. Dette nøkkelparet er **ikke** det samme som virksomhetssertifikatet.
- [ ] **Sikker delingsmetode avklart.** Når protokollsystemet er opprettet får du `integrasjonId` og `integrasjonspassord` som må deles med leverandøren på en sikker måte. Avklar hvordan på forhånd — vær oppmerksom på at mange e-postsystemer blokkerer nøkkelfiler.

### Det skal to til

Fiks Protokoll er en topartskommunikasjon. For å faktisk utveksle meldinger må det finnes et **motpart-system** med en konto i samme protokoll — for eksempel et arkiv hvis du setter opp et fagsystem. Du kan gjøre steg 2–4 alene, men [Gi og få tilgang]({{% ref "5-gi-tilgang.md" %}}) forutsetter at motparten finnes.

### Neste steg

Når sjekklisten er i orden: [Ta i bruk tjenesten]({{% ref "2-ta-i-bruk.md" %}}).

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

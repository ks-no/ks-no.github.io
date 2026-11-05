---
title: Motta post (SvarInn)
description: "Hent post til virksomheten direkte inn i sak- og arkivsystemet."
date: 2026-11-01
weight: 30
aliases: [/tjenester/svarut/svarinn-mottakservice/, /tjenester/svarut/svarinn/]
---

Med SvarInn henter ett sak- og arkivsystem post som er sendt til virksomheten, direkte fra SvarUt. Så lenge mottakersystemet henter og kvitterer for posten, går den ikke til noen andre kanaler.

SvarInn er laget for å automatisere import av post. Systemet som henter, kalles et *mottakersystem*.

## Slik fungerer det

![SvarInn: mottakersystemet henter liste over nye forsendelser, laster ned kryptert zip, dekrypterer og kvitterer](/images/svarut/Svarinn-reisen.png)

1. Noen sender en forsendelse til et organisasjonsnummer. SvarUt finner et mottakersystem som passer, og forsendelsen får status `KLAR_FOR_MOTTAK`.
2. Mottakersystemet henter listen over nye forsendelser. Listen har bare metadata, ikke filer.
3. Mottakersystemet laster ned filene for hver forsendelse som en zip-fil. Filen er kryptert med den offentlige nøkkelen til mottakersystemet.
4. Mottakersystemet dekrypterer med sin private nøkkel og importerer.
5. Mottakersystemet kvitterer. Forsendelsen får status `LEST`, og SvarUt sender den ikke til Altinn eller print.

Vi anbefaler at dere kjører 2–5 som en automatisk jobb som ikke kjøres for ofte - hvert 15. minutt bør være mer enn nok.

Dersom en forsendelse ikke er kvittert ut etter to timer, kommer den med i en e-post om manglende import som sendes til epostene som er lagt til mottakersystemet. E-posten sendes tre ganger om dagen til dem som har tilgang til mottakersystemet.

## Sette opp et mottakersystem
NB! Vi er i ferd med å endre hvordan man setter opp et mottakersystem. I Testmiljøet kan man nå sette opp og administrere mottakersystemer selv fra start til slutt via forvaltning.fiks.test.ks.no, inntil videre må man følge oppskriften under for prod. 

Oppsettet gjøres i SvarUt-portalen under [Mottakersystem](https://svarut.ks.no/mottaker/). Steg 1 gjøres av KS Digital. Resten gjør dere selv. 

1. **Opprette mottakersystem.** KS Digital oppretter mottakersystemet og gir minst én person tilgang med fødselsnummer. Kontakt [fiks@ksdigital.no](mailto:fiks@ksdigital.no).
2. **Legge til organisasjoner.** Personen med tilgang legger inn organisasjonsnumrene mottakersystemet skal hente post for. SvarUt sjekker i Altinn at personen har tilgang til organisasjonen. Velg også forsendelsestype og sikkerhetsnivå, se [Adressering](/tjenester/svarut/motta/adressering/).
3. **Lage servicepassord.** Under fanen «Service» på mottakersystemet. Mottakersystemet bruker id-en og servicepassordet i alle kall.
4. **Laste opp offentlig nøkkel.** Også under «Service». Krever innlogging på nivå 4. Se [Kryptering](/tjenester/svarut/motta/kryptering/).
5. **Teste.** Send en forsendelse til et av organisasjonsnumrene, og hent den med [API-et](/tjenester/svarut/motta/api/).

SvarInn bruker ikke Maskinporten eller Fiks-integrasjon. Det er servicepassordet som gir tilgang.

## Mer om SvarInn

{{% children %}}

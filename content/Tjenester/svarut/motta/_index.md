---
title: Motta post (SvarInn)
description: "Hent post til virksomheten direkte inn i sak- og arkivsystemet."
date: 2017-01-01
weight: 30
aliases: [/tjenester/svarut/svarinn-mottakservice/, /tjenester/svarut/svarinn/]
---

Med SvarInn henter sak- og arkivsystemet post som er sendt til virksomheten, direkte fra SvarUt. Posten går da ikke til Altinn eller i posten, så lenge mottakersystemet henter og kvitterer for den.

SvarInn er laget for å automatisere import av post. Systemet som henter, kalles et *mottakersystem*.

## Slik fungerer det

![SvarInn: mottakersystemet henter liste over nye forsendelser, laster ned kryptert zip, dekrypterer og kvitterer](/images/svarut/Svarinn-reisen.png)

1. Noen sender en forsendelse til et organisasjonsnummer. SvarUt finner et mottakersystem som passer, og forsendelsen får status `KLAR_FOR_MOTTAK`.
2. Mottakersystemet henter listen over nye forsendelser. Listen har bare metadata, ikke filer.
3. Mottakersystemet laster ned filene for hver forsendelse som en zip-fil. Filen er kryptert med den offentlige nøkkelen til mottakersystemet.
4. Mottakersystemet dekrypterer med sin private nøkkel og importerer.
5. Mottakersystemet kvitterer. Forsendelsen får status `LEST`, og SvarUt sender den ikke til Altinn eller print.

Kjør steg 2–5 som en jobb hvert 15. minutt.

Er en forsendelse ikke kvittert etter to timer, kommer den med i en e-post om manglende import. E-posten sendes tre ganger om dagen til dem som har tilgang til mottakersystemet.

## Sette opp et mottakersystem

Oppsettet gjøres i SvarUt-portalen under [Mottakersystem](https://svarut.ks.no/mottaker/). Steg 1 gjøres av KS Digital. Resten gjør dere selv.

1. **Opprette mottakersystem.** KS Digital oppretter mottakersystemet og gir minst én person tilgang med fødselsnummer. Kontakt [fiks@ksdigital.no](mailto:fiks@ksdigital.no).
2. **Legge til organisasjoner.** Personen med tilgang legger inn organisasjonsnumrene mottakersystemet skal hente post for. SvarUt sjekker i Altinn at personen har tilgang til organisasjonen. Velg også forsendelsestype og sikkerhetsnivå, se [Adressering](/tjenester/svarut/motta/adressering/).
3. **Lage servicepassord.** Under fanen «Service» på mottakersystemet. Mottakersystemet bruker id-en og servicepassordet i alle kall.
4. **Laste opp offentlig nøkkel.** Også under «Service». Krever innlogging på nivå 4. Se [Kryptering](/tjenester/svarut/motta/kryptering/).
5. **Teste.** Send en forsendelse til et av organisasjonsnumrene, og hent den med [API-et](/tjenester/svarut/motta/api/).

SvarInn bruker ikke Maskinporten eller Fiks-integrasjon. Det er servicepassordet som gir tilgang.

## Mer om SvarInn

{{% children %}}

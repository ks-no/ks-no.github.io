---
title: Utviklingsfilosofi
desc: Beskrivelse av hvordan vi jobber med videreutvikling av KS FIKS
---

Arbeidet med KS FIKS blir utført av et lite team hos KS i Bergen. I skrivende stund består dette teamet av 6 backend- og to frontend-utviklere. Viktige samarbeidspartnere er:

* KS sentralt
* IT avdelinger i kommunene
* interkommunale IT organisasjoner
* andre offentlige organ som f.eks DIFI, NAV, Skattetaten
* leverandører av ulike fagsystem

Vi følger et utviklingsløp der det å måle effekter og lære av tidligere iterasjoner står i fokus.

![modell som viser utviklingsprosessen](/images/utvikling_cycle.png)

Alle nye tjenester blir bygget som mikrotjenester som gjør hver enkelt tjeneste lett å bygge, måle effekter fra og redesigne dersom det skulle bli behov for det.

Det er mål for KS å bruke åpne standarder og komponenter basert på åpen kildekode så langt det er mulig. På backend har vi standardisert på Java plattformen som gir oss mulighet til å dra veksler på et stort økosystem av ferdige komponenter.

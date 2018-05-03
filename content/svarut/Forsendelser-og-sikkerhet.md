---
title: Sikkerhet
date: 2017-01-01
---

### Generelt om forsendelser 

* Forsendelser kan, men må ikke, krypteres før de sendes inn til SvarUt
* Forsendelsesfiler lagres kryptert på SvarUt sine servere
* Forsendelsesfiler dekrypteres i det mottaker laster ned filen, med mindre det er e
* Forsendelser som lastes ned direkte til mottagende (svarinn) dekrypteres før de blir importert til sakssystemet, men overføres kryptert.
* Forsendelsesfiler som blir lastet ned av mottaker dekrypteres ellers i det de overføres til mottaker. 

### Forsendelser på nivå 4 ##

Det er nå mulig å sende forsendelser som inneholder sensitive persondata via SvarUt (ikke gradert informasjon). Dette kan være brev som sendes fra sikker sone. 

* En nivå 4-forsendelse må krypteres hos avgivende system før den sendes til SvarUt. Forsendelsen behandles på samme måte som alle andre forsendelser og forsendelsesfilen vil lagres kryptert på disk. 
* Ingen andre enn mottaker har tilgang til forsendelsesfilen (heller ikke superadministratorer eller lokale administratorer hos avsender). 

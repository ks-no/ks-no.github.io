---
title: Min kommune - faktura
date: 2022-06-28
hidden: false
aliases: ["/fiks-plattform/tjenester/minside/faktura/", "/fiks-plattform/tjenester/minkommune/faktura"]
---

## Kort beskrivelse
Min Kommune Oppgave er en løsning laget for Norges innbyggere for å kunne håndtere ulike typer offentlige oppgaver. Løsningen består av et web-grensesnitt i Min Kommune brukt av innbyggere 
til å vise og håndtere oppgavene, ett api for eksterne fag-system til bruk for å opprette og endre oppgaver, samt en konfigurasjons-side i vår forvaltnings-løsning under min kommune.

## Tilgjengelige grensesnitt
| Grensesnitt | Støtte |
|------|------|
| Web portal | Ja |
| Maskin til maskin | Ja |

## Beskrivelse av api
### Oppgave
En oppgave fungerer som en referanse, og kan omfatte flere forskjellige typer av offentlige oppgaver. Det kan være et skjema som skal fylles ut, et samtykke som skal tas stilling til, en kontrakt som må vises og bekreftes osv.
En oppgave som lagres hos oss inneholder en url med referansen til den eksterne ressursen.
Flere innbyggere kan dele samme oppgave. Oppgaven er da lik for alle, med unntak av individuell status om utførelse.

#### OppgaveStatus
OppgaveStatus forteller i første iterasjon om en person har fullført oppgaven eller ikke. Flere statuser kan kommer ved behov. En overordnet status for oppgaven kan også komme ved behov:
- NY: Forteller at oppgaven for gitt mottaker er ansett som NY, eller "IKKE FULLFØRT".
- FULLFORT: Forteller at mottaker har fullført sin del av oppgaven.

#### UtførtKriterie
UtførtKriterie forteller om hvilket kriterie som gjelder for at oppgaven som helhet skal anses som utført, og har i dag følgende verdier:
- ANY: Forteller at om en vilkårlig deltaker av oppgaven utfører oppgaven er oppgaven ansett som utført, uavhengig av andre deltakere.
- ALL: Forteller at oppgaven er ansett som fullført kun hvis alle deltakerene har fullført oppgaven.

### Ekstern-api
#### [api-spec](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/min-kommune-oppgave-ekstern-api-v1.json)
#### POST /oppgaver
En oppgave opprettes via API. I denne requesten sendes innhold i oppgaven, som tittel, beskrivelse, handling, url, eventuell frist, utført-kriterie, samt komplett liste over mottakere og informasjon om varsling.
Det kan også sendes med metadata i metadata-feltet.

#### PUT /oppgaver/{oppgaveId}/status
I første iterasjon er dette endepunktet brukt for å oppdatere status fra "NY" til "FULLFORT" for en mottaker av oppgaven.

#### GET /oppgaver/{oppgaveId} (IKKE IMPLEMENTERT FERDIG)
En oppgave kan hentes via dette endepunktet. Dette returnerer all informasjon om oppgaven, inkludert liste over mottakere og deres individuelle status.

## Diverse
- linker
    - Base-path ekstern-api dev: ``https://api.fiks.dev.ks.no/min-kommune/api/v1/api/``
    - Base-path ekstern-api test: ``https://api.fiks.test.ks.no/min-kommune/api/v1/api/``
    - Base-path ekstern-api prod: ``https://api.fiks.ks.no/min-kommune/api/v1/api/``

---
title: Kanalvalg
description: "Hvordan SvarUt velger kanal, og hva som skjer når en kanal feiler."
weight: 30
---

Avsender velger ikke hvilken kanal SvarUt skal levere til. Avsender sier hvem mottakeren er, og SvarUt finner den beste kanalen. Feiler en kanal, prøver SvarUt den neste. Siste utvei er papirpost.

Denne siden forklarer rekkefølgen, slik at du kan forstå statusene og hendelsene du får tilbake.

## Privatperson

Sender du til `/forsendelser/person`, slår SvarUt opp mottakeren i Kontakt- og reservasjonsregisteret (KRR).

1. **Digital postkasse.** Har personen valgt Digipost eller e-Boks, sendes forsendelsen dit. Status `SENDT_SDP`, deretter `LEVERT_SDP`. Dette forutsetter at informasjonen vi finner i KRR er oppdatert siste 18 måneder.
2. **Altinn.** Har personen ikke valgt digital postkasse, eller feiler leveringen dit, men personen kan nås digitalt (igjen basert på informasjon fra KRR), sendes forsendelsen til Altinn. Status `SENDT_ALTINN`, deretter `LEVERT_ALTINN`.
3. **Papirpost.** Har personen reservert seg mot digital post, finnes ikke i KRR eller ikke har lest forsendelsen i Altinn innen lesefristen, går den til print. Status `SENDT_PRINT`, deretter `PRINTET`.

Svarer ikke KRR, prøver SvarUt igjen senere.

## Virksomhet

Sender du til `/forsendelser/organisasjon`, er det to digitale kanaler:

1. **SvarInn.** Har virksomheten et mottakersystem som passer forsendelsen, legges den i klar for henting i SvarInn. Status vil da være `KLAR_FOR_MOTTAK`. Når mottakersystemet kvitterer denne ut, blir den `LEST`. Se [Motta post](/tjenester/svarut/motta/).
2. **Altinn.** Ellers, eller hvis mottakersystemet melder permanent feil, sendes den til Altinn. Feiler sendingen til Altinn, prøver SvarUt tre ganger til.
3. **Papirpost.** Leses forsendelsen ikke innen lesefristen, eller avviser Altinn den, går den til print. Avsender kan slå av automatisk ettersending til papirpost for virksomheter i SvarUt-konfigurasjonen. Det er på som standard.

Bruk `GET /v2/mottakersystem` for å se om et organisasjonsnummer har et mottakersystem.

## Norsk Helsenett (Ikke i prod enda)

Forsendelser til `/forsendelser/nhn` vil gå til Norsk Helsenett. Status vil først vere `SENDT_NHN_MOTTAKER`, deretter `LEVERT_NHN_MOTTAKER` når EPJ-systemet til mottakeren har bekreftet å ha mottatt forsendelsen. 
Om sendingen feiler, vil SvarUt prøve tre ganger til. Dersom det fortsatt feiler, eller om det ikke kommer kvittering innen 3 dager, eller mottakeren avviser forsendelsen, går den til print. Se [Norsk Helsenett](/tjenester/svarut/sende/nhn/).

## Rett til print

Forsendelser til `/forsendelser/print` går rett til printleverandøren. Er kontoen ikke satt opp med printleverandøren til KS Digital, må forsendelsen printes manuelt fra SvarUt-portalen.

## Når forsendelsen ikke skal printes

Med `kunDigitalLevering: true` blir forsendelsen aldri printet. Kan den ikke leveres digitalt, ender den med status `IKKE_LEVERT`. Avsender får ingen annen beskjed, så følg med på status. 
Dette er en innstilling som bør kun brukes dersom det ikke er viktig at mottaker mottar brevet, for eksempel informasjonsbrev som skal sendes ut. 

## Se hva som skjedde

Hendelsesloggen viser hvert steg, for eksempel at mottakeren har reservert seg eller at lesefristen gikk ut. Hent den med `GET /v2/forsendelser/{forsendelseId}/hendelser`. Se [Status](/tjenester/svarut/sende/status/).

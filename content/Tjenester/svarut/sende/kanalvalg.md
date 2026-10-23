---
title: Kanalvalg
description: "Hvordan SvarUt velger kanal, og hva som skjer når en kanal feiler."
weight: 30
---

Avsender velger ikke kanal. Avsender sier hvem mottakeren er, og SvarUt finner den beste kanalen. Feiler en kanal, prøver SvarUt den neste. Siste utvei er papirpost.

Denne siden forklarer rekkefølgen, slik at du kan forstå statusene og hendelsene du får tilbake.

## Privatperson

Sender du til `/forsendelser/person`, slår SvarUt opp mottakeren i Kontakt- og reservasjonsregisteret (KRR).

1. **Digital postkasse.** Har personen valgt Digipost eller e-Boks, sendes forsendelsen dit. Status `SENDT_SDP`, deretter `LEVERT_SDP`.
2. **Altinn.** Har personen ikke valgt digital postkasse, eller feiler leveringen dit, men personen kan nås digitalt, sendes forsendelsen til Altinn. Status `SENDT_ALTINN`, deretter `LEVERT_ALTINN`.
3. **Papirpost.** Har personen reservert seg mot digital post, finnes ikke i KRR eller ikke har lest forsendelsen i Altinn innen lesefristen, går den til print. Status `SENDT_PRINT`, deretter `PRINTET`.

Svarer ikke KRR, prøver SvarUt igjen senere.

## Virksomhet

Sender du til `/forsendelser/organisasjon`, er det to digitale kanaler:

1. **SvarInn.** Har virksomheten et mottakersystem som passer forsendelsen, legges den klar for henting. Status `KLAR_FOR_MOTTAK`. Når mottakersystemet kvitterer, blir den `LEST`. Se [Motta post](/tjenester/svarut/motta/).
2. **Altinn.** Ellers, eller hvis mottakersystemet melder permanent feil, sendes den til Altinn. Feiler sendingen, prøver SvarUt tre ganger til.
3. **Papirpost.** Leses forsendelsen ikke innen lesefristen, eller avviser Altinn den, går den til print. Avsender kan slå av automatisk ettersending til papirpost for virksomheter i SvarUt-konfigurasjonen. Det er på som standard.

Bruk `GET /v2/mottakersystem` for å se om et organisasjonsnummer har et mottakersystem.

## Norsk Helsenett

Forsendelser til `/forsendelser/nhn` går til Norsk Helsenett. Status `SENDT_NHN_MOTTAKER`, deretter `LEVERT_NHN_MOTTAKER` når mottakeren har bekreftet. Feiler sendingen, prøver SvarUt tre ganger til. Feiler det fortsatt, kommer det ingen kvittering, eller avviser mottakeren forsendelsen, går den til print. Se [Norsk Helsenett](/tjenester/svarut/sende/nhn/).

## Rett til print

Forsendelser til `/forsendelser/print` går rett til printleverandøren. Er kontoen ikke satt opp med printleverandøren til KS Digital, må forsendelsen printes manuelt fra SvarUt-portalen.

## Når forsendelsen ikke skal printes

Med `kunDigitalLevering: true` blir forsendelsen aldri printet. Kan den ikke leveres digitalt, ender den med status `IKKE_LEVERT`. Avsender får ingen annen beskjed, så følg med på status.

## Se hva som skjedde

Hendelsesloggen viser hvert steg, for eksempel at mottakeren har reservert seg eller at lesefristen gikk ut. Hent den med `GET /v2/forsendelser/{forsendelseId}/hendelser`. Se [Status](/tjenester/svarut/sende/status/).

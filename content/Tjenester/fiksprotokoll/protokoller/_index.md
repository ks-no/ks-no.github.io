---
title: Protokoller
date: 2026-05-20
weight: 20
ordersectionsby: weight
---

**Oversikt over protokollene som finnes under Fiks Protokoll, og status for hver av dem.**

Fiks Protokoll støtter et sett med versjonerte protokoller som definerer gyldige meldingstyper og parter. Hver protokoll har sin egen side med beskrivelse og lenker til skjemadefinisjoner. Nye protokoller er under utvikling.

## Status og plan for protokoller

| Protokoll                                                             | Status                                                                      | Estimert ferdig    |
|-----------------------------------------------------------------------|-----------------------------------------------------------------------------|--------------------|
| [Fiks Arkiv]({{< ref "arkiv.md" >}})                                  | Under implementering hos leverandører. Protokoll ferdigstilt.               | Ferdig             |
| Fiks politisk behandling                                              | Protokoll har vært under utvikling og er satt på pause.                     | Pause              |
| [Fiks Plan]({{< ref "plan.md" >}})                                    | Under implementering hos leverandører. Pilotversjon av protokollen lansert. | 4. kvartal 2024 (*) |
| [Fiks Matrikkelføring]({{< ref "matrikkelfoering.md" >}})             | I pilot-testing og i produksjon. Protokoll ferdigstilt.                     | Ferdig             |
| [Barnevern – fagsysteminnrapportering]({{< ref "ssbbarnevern.md" >}}) | Brukes i produksjon                                                         | Ferdig             |
| [Fiks Link]({{< ref "link.md" >}}) – erstatning for GI Link           | Test-versjon releaset. Protokoll klar for testing.                          | 4. kvartal 2024    |
| [Fiks Saksfaser]({{< ref "saksfaser.md" >}})                          | Test-versjon releaset. Protokoll klar for testing.                          | Ikke avklart (**)  |

(*) Fiks Plan er lansert med ulik pilotstatus fordelt på tjenestene pga. eksterne avhengigheter. Les mer i [wiki](https://github.com/ks-no/fiks-plan-specification/wiki) for Fiks Plan.

(**) Fiks Saksfaser er lansert med en test-versjon, men det er ikke avklart når den er estimert ferdig.

Protokoller i pilot kan oppleve å få endringer som må utbedres fortløpende. Dette vil være små endringer som kommer etter erfaringer en har gjort i produksjonskjøring. De er stabile nok til å ta i bruk i vanlig drift.

Det er også variasjon i adopsjonsgrad av protokollene, spesielt for Fiks Arkiv — noen fagsystemer kommer kanskje bare til å arkivere og dermed bruke en liten del av hele protokollen. Det pågår arbeid med kartlegging av adopsjonsgrad og implementeringsprogresjon for protokollene. Estimering kan påvirkes av resultatet av dette.

{{< get-help email="fiks@ksdigital.no" support_page="/felles/support/" >}}

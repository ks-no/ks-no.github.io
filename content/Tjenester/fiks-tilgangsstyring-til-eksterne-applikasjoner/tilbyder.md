---
title: Kom i gang som applikasjonstilbyder
weight: 10
---

# Kom i gang som applikasjonstilbyder

Denne veiledningen er for deg som utvikler en applikasjon og ønsker å bruke Fiks tilgangsstyring til eksterne applikasjoner som autorisasjonstjeneste.

Tjenesten brukes til å avgjøre om en bruker har tilgang til data for én eller flere kommuner, mens applikasjonen selv driftes og forvaltes i ditt eget miljø.

> **Merk:** Tilgang vurderes i dag per kommunenummer.  
> Støtte for andre organisasjonsidentifikatorer (organisasjonsnummer eller tenant-id/FiksOrgId) er planlagt.

## Forutsetninger

- Dere har en organisasjon registrert i Fiks-plattformen og har en avtale på at dere kan være tilbyder
- En applikasjon som kjører i deres eget miljø
- Administrator-tilgang til Fiks-plattformen
- Maskinporten-klient opprettet i Samarbeidsportalen

## Oversikt
![Oversikt](https://www.plantuml.com/plantuml/png/JP1FIyH034Vlyod2dbHemJ_7fIox9q4Hr6ClOPiTqvbcXamg5F6xEvOYNiFxFHuv54ErUOekqiN04YZx3uE1bSx6ILm9B1aL9y1w-6HRuCi17F4SlAPPXbEAIVVxqwnAObq7Jx-6jx0SuqpksxchcsjecWvsjosyakTYIWgOS-I0PKpIooKf64UFuaknHLdypgsRknPUSbOo0whWCwuzIOsaOJ7okYes-hw5nob7caYCj9S_vqWXRCn32-zKh9T_Sze4DTKTI8Rwa1y0)

```plantuml
@startuml
left to right direction
skinparam activity {
  BackgroundColor<<Current>> LightSkyBlue
}

(*) --> "1. Registrer applikasjon\nfor tilgangsstyring"
--> "2. Opprett en\nMaskinporten-integrasjon"
--> "3. Implementer\ntilgangssjekk"
--> "4. Test\nintegrasjonen"
--> (*)
@enduml
```

## 1. Registrer applikasjonen

### Via Fiks forvaltning

1. Logg inn på Fiks forvaltning med ID-porten
2. Naviger til **Fiks tilgangsstyring til eksterne applikasjoner**
3. Velg **Registrer ny applikasjon**
4. Fyll ut:
   - Applikasjonsnavn
   - Beskrivelse
   - URL til applikasjonen
   - Logo
5. Klikk **Opprett**

Du får tilbake en **App-ID (UUID)** som brukes i API-kall.

### Via API

Se [Leverandør API dokumentasjon](https://developers.fiks.ks.no/api/?spec=https://developers.fiks.ks.no/api/leverandor-tjenester-api-v1.json)

## 2. Knytt Maskinporten-integrasjon

Applikasjonen må kunne autentisere seg maskin-til-maskin ved tilgangssjekk.

Dette gjøres ved å opprette en Maskinporten-integrasjon i Samarbeidsportalen (Digdir)

Detaljer om oppsett av Maskinporten er beskrevet i
[Digdirs dokumentasjon](https://docs.digdir.no/maskinporten_guide_apikonsument.html).

## 3. Implementer tilgangssjekk

### API-endepunkt

**Produksjon:** `https://api.fiks.ks.no`
**Test:** `https://api.fiks.test.ks.no`

### Flyt ved brukerinnlogging
![Flyt ved brukerinnlogging](https://www.plantuml.com/plantuml/png/VL3DRjGm4BxxAKO-KsMNKdvoG6s5K5UmOgKYBfJ3i1aY4sTiUIQLKBJlnPqNmqwoe5pgWotFzpFVpBKe9XrwRs9-tT55P0LxxmVLxsdeA5KtBAXg0GLkfygQ-iunO8mJVXFZ6joZT8vZI4eyCVQ7DU6zwmJK-HQv5T5VoN5R_WzCdIWbfcBkNOVoCp2boUH3w1spCNCSk7XR6jVmCRHj_XQ8WnA4HqfJ9825YOCIgnDAcejtcE37dz-Da1SU-fwI8MwWQ8t9kcoSyzPmbpM0noE9W8QEsEmFS77kUakOA2t08biIrd3uTFyPgcM-2gEh7hVvYTMOhrrpEaEK7dYqyy9t3R7Q6kps-UMBgvUlNh_PREt9p9R_-uxsdpQJluws2tq_C1Nbvh98di6gUBKfnMydOz3hDFnYO22V9VYyg1g-E8465Grv8TZbBlmKtQuOjkpHNEThwFrV)
```plantuml
@startuml
participant "Sluttbruker/Ansatt" as Bruker
participant "Din app" as App
participant "Maskinporten" as MP
participant "Fiks tilgangsstyring til\neksterne applikasjoner" as Kominn

Bruker -> App: Logger inn
note over App
  Bruker autentisert
  Har fødselsnummer
end note

App -> MP: Hent access token
MP --> App: Bearer token

App -> Kominn: POST /tilgang/api/v1/app/{appId}/tilganger\n{"brukerIdent": "12345678901"}
Kominn --> App: {"tilganger": [{"kommune": "0301"}, {"kommune": "5001"}]}

alt Har tilgang
    App -> Bruker: Vis data
else Ingen tilgang
    App -> Bruker: "Ingen tilgang"
end
@enduml
```




---
title: Min kommune
date: 2022-06-28
aliases: [
    "/fiks-platform/tjenester/minside",
    "/fiks-plattform/tjenester/minside",
    "/fiks-plattform/tjenester/minkommune"
]
---
## Kort beskrivelse
min.kommune.no er en portal for de innbyggerrettede tjenestene på Fiks-plattformen. 

Innbyggere som navigerer til nettsiden blir autentisert via ID-porten og presentert for en oversikt som inkluderer et søkefelt og en rekke tjenester. 

Under kan man lese mer om hvordan tjenesten fungerer: 

[Min kommune - faktura](faktura)
[Min kommune - innsyn](innsyn)
[Min kommune - kommunale tjenester](kommunaletjenester)
[Min kommune - matrikkel](matrikkel)


Søkefeltet gir mulighet til å gjøre et fritekstsøk på informasjonen som min.kommune.no tilbyr innbyggeren: eiendommer, post, byggesaker osv. Denne informasjonen er også tilgjengelig via den enkelte tjeneste.

![matrikkel](/images/minside-forside.png "Matrikkel")

## Min profil
Oversikt over informasjonen min.kommune.no har om innbyggeren. Hentes fra kontakt-og-reservasjonsregisteret med utgangspunkt i brukerens ID-Porten-autentisering.

## Post fra kommunen
Lar innbyggeren søke i post som er sendt til innbyggeren via KS SvarUt. Søket er også tilgjenglig på forsiden. For at disse skal bli tilgjenglig må tjenesten aktiveres via Fiks-konfigurasjon.

## Mine eiendommer
Viser eiendommer innbyggeren eier, basert på data fra matrikkelen. Disse eiendommene er også søkbare fra forsiden.

"Mine eiendommer" er basert på data som automatisk synkroniseres fra Kartverket for alle kommuner. Det er altså ikke nødvendig å aktivere denne tjenesten.

Som standard kan innbyggeren følge en lenke til [seeiendom.kartverket.no](https://seeiendom.kartverket.no) for å se detaljer om eiendommen, men her har kommunen mulighet til angi lenker til eget eiendomssystem, se [Fiks Konfigurasjon: Matrikkel](https://forvaltning.fiks.ks.no/fiks-konfigurasjon/tjenester/matrikkel). Minside vil da vise disse lenkene for innbyggere som har eiendommer i din kommune.

### Mine byggesaker
Viser byggesaker innbyggeren/organisasjonen har tilgang til. Disse kan være eksponert for nåværende eier av eiendom, fødselsnummer eller organisasjonsnummer.

Mine byggesaker er avhengig av at byggesaksarkivet speiler metadata til Fiks Innsyn.

### Skjema
Viser skjema du har påbegynt eller sendt inn til kommunen.

### Faktura
Viser fakturaer som er sendt til deg eller du har tilgang til.

### Nasjonale tjenester
Oversikt over viktige nasjonale tjenester. Ta kontakt med fiks@ks.no hvis du har forslag til ytterligere tjenester som bør finnes her.

### Skatt og avgift
Lenker til viktige tjenester innen skatt og avgift. Ta kontakt med fiks@ks.no hvis du har forslag til ytterligere tjenester som bør finnes her.


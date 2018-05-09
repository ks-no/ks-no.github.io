---
title: Sikkerhet og personvern
date: 2018-01-02
---
Under kommer generelle retningslinjer for hvordan vi har sikret applikasjonene, skulle noe avvike fra dette vil det 
være spesifisert i hver tjeneste.

## Kryptering
All kommunikasjon med FIKS utenfra er kryptert med TLS. 

Fiks-plattformen lagrer data i [fiks-dokumentlager]({{< ref "dokumentlager.md" >}}), og alt krypteres før det lagres. All backup er også kryptert. Nøkler oppbevares på egne servere som er satt opp spesielt for dette formålet.  

## Autentisering
Personer autentiseres ved hjelp av Open-Id Connect løsningen til ID-Porten. Dette vil si at de (om de ikke allerede er innlogget) dirigeres til ID-Porten for innlogging ved hjelp av for eksempel MinId eller BankId. ID-Porten og Fiks utveksler så informasjon for å bekrefte brukerens identitet og hvilket innloggingsnivå som er benyttet. Utgåtte innlogginger vil automatisk bli fornyet.

Flere tjenester på fiks-platformen har også mulighet for maskin-til-maskin kommunikasjon, for eksempel når et saksystem laster opp meldinger til meldingsboksen. Dette gjøres gjennom å opprette  _integrasjoner_, som autentiseres ved hjelp av et virksomhetsertifikat-basert access token utstedt av ID-Porten i kombinasjon med integrasjonsid og passord generert av fiks-konfigurasjon. Se [integrasjoner]{{< relref "integrasjoner.md" >}} for mer informasjon om oppsett av dette.

## Autorisering
Hvordan en aktør autoriseres på fiks-plattformen avhenger av hvem aktøren er og hvordan han bruker systemet: 

1. _Personer som bruker tjenester på vegne av seg selv, for eksempel en innbygger som søker barnehagesøknaden sin i meldingsboksen._ Disse krever som regel ikke videre autorisering.
2. _Personer som bruker tjenester på vegne av en bedrift hvor de har en rolle, for eksempel en innbygger som henter ned en forsendelse til bedriften fra svarut._ Disse autoriseres for tilgang til bedriftens data og tjenester basert på roller de innehar i Altinn.
3. _Personer som forvalter en tjeneste på fiks-plattformen på vegne av en fiks-organisasjon, for eksempel en kommuneansatt som konfigurerer meldingsboksen._ Disse autorisereres for hver enkelt tjeneste og funksjon gjennom fiks-konfigurasjon.
4. Systemer som er installert i en organisasjon som integrerer seg mot en tjeneste på fiks-platformen. Fiks-konfigurasjon tilbyr grensesnitt hvor hver enkelt kommune kan autorisere integrasjoner for tilgang til sine tjenester (og fjerne slik tilgang hvis det ikke lengre skulle være ønskelig). 

## Personvern
Utgangspunktet er at det er innbyggeren som eier sine data, og tilgang begrenses i så stor grad som mulig. Dette vil si at:

* Innbyggeren kan slette sine data om han ikke ønsker fiks-tjenesten skal oppbevare dem.
* Innbyggeren kan gi beskjed om at han ikke lengre ønsker at hans data skal lagres på plattformen.
* Tilgang er begrenset i så stor grad som mulig. Dette vil for eksempel si at det utelukkende er innbyggeren som kan lese meldinger i [fiks-meldingsboks]({{< ref "meldingboks.md" >}}) - disse er skjult også for integrasjonen som i utgangspunktet lastet de opp, og for kommunen som er ansvarlig for meldingene

Noen tjenester gjør data om en person tilgjengelig for tredjepart. I slike tilfeller vil dette bli dokumentert i tjenstebeskrivelsen, autorisert eksplisitt i fiks-konfigurasjon, og underlagt audit-logging, slik at det blir mulig å hente ut informasjon om hvem som har hatt tilgang til hvilke data når, og under hvilken lovhjemmel tilgangen ble oppnådd.
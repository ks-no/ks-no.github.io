
---
title: Minside
date: 2019-03-08
---

KS-Minside er en webapplikasjonen du finner på https://minside.kommune.no. Siden inneholder grensesnitt mot de innbyggerrettede tjenestene på Fiks-plattformen, i første omgang gjelder dette hovedsakelig tjenestene som er drevet av søkemotoren Fiks Innsyn, og først i rekke av disse er "Post fra kommunen". Flere tjenester kommer til, som faktura, byggesak, søknader og lignende.
Ks ønsker at det meste av informasjon som er relevant for innbygger skal finnes tilgjengelig på denne siden, enten som direkte informasjon eller søkbar informasjon som linker til andre sider.
Operasjoner som er knyttet til disse dataene skal vises sammen med dataene. Dette kan f.eks være utsett betaling på en faktura. Skifte søppelspann ved renovasjon på en eiendom. Bestille ekstra pipeinspeksjon fra feier til bolig. Korrigere feil på areal på boligen.

KS-Minside vil ikke inneholde alle disse tjenestene men vil linke/henvise til eksisterende løsninger som finnes i kommunene. Hvis disse tjenestene også benytter IdPorten vil en ha single sign on, da vil en ikke få noen ekstra innlogging.

Alle api som brukes av minside.kommune.no er også tilgjengelig for kommunene til å bruke i andre løsninger. Dette betyr at kommunen kan bruke dataene i andre løsninger. F.eks har Trondheim kommune benyttet fiks-innsyn apiet til å hente post fra kommunen. 
https://minside.trondheim.kommune.no. 

For å tilgjengelig gjøre data i Innsyn/Minside må disse lastes opp til FIKS-Innsyn. Dette kan gjøres direkte fra fagsystem som støtter dette eller en kan lage program som synkroniserer data mellom et fagsystem og minside. Apiene som trengs er dokumentert på disse sidene og alle kan velge å lage integrasjoner mot disse. For å kunne benytte de må en få tilgang av en kommune.(Gjelder innsyn)

Dokumentene i innsyn kommer fra to hovedkilder: 

1. Globale integrasjoner: Skyløsninger som tilbyr integrasjon med Fiks plattformen, som for eksempel KS-SvarUt, som står for leveranse av forsendelser til Fiks Innsyn som så blir tilgjengelig under "Post fra kommunen". Slike integrasjoner kan kommunen aktivere gjennom Fiks Konfigurasjon. Andre leverandører som har skyløsninger kan få sine system tilgjengelig gjort på samme måte som KS-SvarUt. Kommunen kan da bare aktivere støtten for det systemet.

2. Lokale integrasjoner: Dette er integrasjoner kommunen oppretter i Fiks Konfigurasjon og så implementerer, installerer selv eller aktiverer i et lokalt installert fagsystem(hvis de støtter en FIKS tjeneste). Ta gjerne kontakt med brukerstøtte på fiks@ks.no om du har tenkt å utarbeide en ny integrasjon, vi vil forsøke å gjøre dette på måter som tillater senere deling av resultatet med andre kommuner. 

Kildene over kan bare tilgjengeliggjøre meldingstyper som allerede er implmentert i Fiks Innsyn (forsendelse, og snart faktura, saksmappe, journalpost, søknad m.m.). Ta kontakt med fiks@ks.no om du ønsker å gjøre ytterligere typer meldinger tilgjenglig for dine innbyggere.

![minside](/images/minside.png "Minside")


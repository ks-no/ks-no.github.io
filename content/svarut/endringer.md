---
title: SvarUt endringer
date: 2018-05-03
lastmod: 2018-05-18
---
Her er en liste over de viktigste endringene i SvarUt, startet i 2015.

## Liste over endringer i SvarUt.
* 18.05.2018
  * Lagt ut ForsendelseServiceV10, se [ForsendelsesServiceV10]({{< ref "/svarut/integrasjon/ForsendelsesServiceV10.md" >}}).
* 03.05.2018
  * Fiks mottakerkonfigurasjon, viste feil data om en ikke hadde tilgang til alle mottaker med samme orgnr.
  * Validerer om orgnr er utfylt ved signeringsoppdrag
  * Viser ikke avviste forsendelser i innkommende.
  * Egen loginside for edialog
* 09.04.2018
  * Mulighet for å sende sensetivdata som nivå4 via edialog
  * Viser hash av filene vi har mottat i søket
  * Sende tilgang gjør at en kan endre og lage maler i import pdf, manuell forsendelse.
* 22.03.2018
  * ForsendelseServiceV10 lagt ut for testing
* 14.03.2018
  * Støtte for å linke organisasjon i SvarUt til org i Fiks plattform
* 23.02.2018
  * Avviser fakturaforsendelser som skal printes med fakturaark på baksiden.
* 19.02.2018
  * Fix flette forsendelse som feilet når alle filene overskred 350mb. Grensen gjelder per forsendelse
  * Signeringssvar har nå forsendelseType satt.
  * Kan ikke signere etter at oppdrag er avvist.
* 13.02.2018
  * Fix ytelseproblem med mange filer i Send forsendelse.
* 01.02.2018
  * Giroark blir vist i søket.
* 03.01.2018
  * Kan ikke velge a-post og b-post lenger, faset ut av posten.
* 07.12.2017
  * La til størrelse på fil i SvarInn.
* 15.10.2017
  * Mulighet for å slå av ettersending i posten for organisasjoner som er varslet i altinn.
* 03.10.2017
  * Duplikatsjekk sjekker også alle adressefelt
* 20.09.2017
  * Lagt til dato på forsiden av edialog brev
* 01.09.2017
  * KunDigitaltLevert lagt inn i rapporter.
* 23.08.2017
  * Mottakersystem kan ikke ha samme navn
  * Lenker følger med i SvarInn
  * Sjekker orgnr mot difi før aktivering av SDP
  * Signering lagt ut i produksjon
* 17.08.2017
  * Optimaliseringer for store rapporter i søk.
* 03.08.2017
  * Svarinn kan konfigureres med foresendelseType
  * Fix rekkefølge på filer i zip fil. Denne var korrekt, men ved en tilfeldighet.
* 28.07.2017
  * Epost på avsender i edialog
  * land ble ikke med i edialog
* 03.07.2017
  * Viser svarPåForsendelseLink i søket
* 06.06.2017
  * Send forsendelse, med KunDigital var også begrenset på 350mb, fjernet.
* 26.05.2017
  * Aktiverer varsel mail for edialog forsendelser som ikke er sendt.
* 19.05.2017
  * Signeringsløsningen går i produksjontest
  * sms faktura grunnlag i sms rapport
  * Send forsendelse med ny layout
  * Tilgjengelig gjør pdf import for alle i send forsendelse
* 02.05.2017
  * Fix for sms rapport excel/csv dump, viser mer enn 20 linjer.
  * Fix for sms søk viser flere treff
  * Fix tlfliste excel dump, status ble feil ved to feiltyper.
* 27.04.2017
  * Edialog åpnet for flere formater, skal nå støtte alle arkiv formater.
* 21.04.2017
  * Excel opplasting på send forsendelse er begrenset til 5mb og import får kun kjøre i 1 min.
* 20.04.2017
  * Edialog framside har mistet postnr og poststed, fikset.
  * Fikset manuell print varsel mail, deaktiverte avsendere fix.
  * Fix for send forsendelse hvor filsjekk ikke ble korrekt alltid. Fikk avsendere uten fil, sjølv om fil var lastet opp.
* 06.04.2017
  * Fikset slik at deaktiverte avsendere ikke lager manuellprint varsel mail.
  * Fjernet krav om postnr på utenlandsadresse.
* 31.03.2017
  * Sjekker orgnr mot difi ved aktivering av SDP. Avsenderid blir ikke sjekket, det er fortsatt mulig å legge inn ugyldig avsenderid som ikke er mottat fra difi.
  * Legge til flere orgnr på mottakersystem fikset. 
* 28.03.2017
  * Viser når tlf og epost er sist oppdatert i KRR register oppslag.
* 20.03.2017
  * Fix zip opplasting i send forsendelse. Siden zip ikke har encoding på filnavn i standarden. Handteringen er bedre nå slik at flere encodinger blir korrekt.
* 16.03.2017
  * Endret print pdf, skal nå ha med seg layers i print.
* 06.03.2017
  * Laget varselmail for manuellprint, blir nå varslet om det er eldre enn 7 dager siden printet sist.
* 03.03.2017
  * La til mulighet for å søke på tlfnr i sms rapport.
  * La til sjekk for duplikate tlfnr i sms utsending, får ikke sende før duplikater er fjernet.
* 28.02.2017
  * Fix småfeil funnet i sms
  * Leste forsendelser forsvinner nå fra manuellprint når de blir lest etter at forsendelsen er klar for print.
  * Fikset feil i statestikk framside noen statuser ble ikke vist.
* 15.02.2017
  * Print kostnad forsvann fra excel/csv export etter nye loggfiler fra grafisk digtial, lagt inn igjen.
* 14.02.2017
  * Fjerner fnr fra edialog framside pdf
  * Åpner sms utsending i produksjon
  * Krever fakturakonfigurasjon utfylt når altinn blir valgt som kanal
* 31.01.2017
  * Fikset feil i send forsendelse hvor returadresse ble feil.
* 24.01.2017
  * Fikset feil hvor framsidetekst ble lagret som adresselinje 2 i konfigurasjonen
* 19.01.2017
  * Ny log melding fra grafisk digital, får nå tidspunkt for postlegging
* 11.01.2017
  * Fix for adresse henting i manuell forsendelse som kunne feil
  * Mulighet for å ha flere varslings eposter i Mottakersystem
  * Fiks for fakturafil til SDP, ble originalfil ikke den med grågiro.
* 19.12.2016
  * Fikset feil mimetype for excel fil i opplasting av mottakerliste
  * fikset postnr som mangler i excel fil
  * fikset orgnr som har mellomrom i excel fil
* 05.12.2016
  * Fjernet andrevarsel etter 24 timer i altinn. Dette resulterte ikke i flere leste forsendelser
* 11.11.2016
  * Kan legge til flere orgnr i samme operasjon i mottakersystem
* 21.10.2016
  * starter svarinn varsel mailer
* 20.10.2016
  * Noarkmetadata i excel/csv exporten under forsendelser
* 12.10.2016
  * fix import at mottakere i manuellforsendelse hvor postnr hadde leading zeros i excel fila.
* 15.09.2016
  * Mulighet for å hente status på eksternRef i forsendelse service
  * Kunne markere svarinn forsendelse mottat i forsendelser søket i SvarUt
  * Kutter sms tekst til SDP hvis den oversskred grensen på 160 tegn
  * Endret from adresse i altinn varser til noreply@altinn.no
* 13.09.2016
  * Fikset zip fil opplasting manuell forsendelse
* 30.08.2016
  * Mulighet for å legge på orgnr på avsender som brukes som returadresse. Mottakere som svarer digitalt vil svare til dette orgnret.
  * Fletteforsendelse i send forsendelse. Mulighet for å laste opp ei fil for hver mottaker. F.eks ved utsending av faktura.
* 27.06.2016
  * Kan sende svar på forsendelse url med forsendelser fra send forsendelse
* 20.06.2016
  * Endret max størrelse til 350mb for filer til print, og ubegrenset for kundDigitalForsendelse filer.
* 09.06.2016
  * Søk etter forsendelser for SvarInn lagt ut.
  * Edialog er klar for test.
* 14.04.2016
  * Forsendelser med en side blir alltid simplex print, uansett hva avsender sender. 
* 11.04.2016
  * Sender varslinger med original filer for nedlasting, en link per fil og mulighet for å laste ned alle i zip fil.
  * SDP med sendMedDokumenter skrudd på, vil nå sende alle filene med, første fil som hoveddokument og resten som vedlegg.
* 22.03.2016
  * Fiks for lesefrist, etter endring til 40 timer tok den ikke høgde for arbeidsdager, no er det 40 timer på dager som er arbeidsdag.
  * Ikke levert status for kunDigitale forsendelser hvor link til nedlasting ikke har vert mulig å levere.
* 16.03.2016
  * svarSendesTil brukes nå som avsender på postlagt brev også. Gjelder v5.
  * Bedre feilmeldinger på v5 servicen.
* 14.03.2016
  * Endret antall timer vi venter på at forsendelse skal bli lest i altinn fra 48 timer til 40.
  * Alle som har tilgang til forsendelser i svarut kan nå sette disse til Manuelt handtert. Dette betyr at SvarUt slutter å sende forsendelsene videre. De er fortsatt tilgjengelig.
* 25.02.2016
  * Fikset feil ved send forsendelse hvor noen fikk opp feilmelding om at pdfene overskred 250mb uten at de gjorde det.
* 08.02.2016
  * Ny epost mal for varslinger fra altinn.
* 01.02.2016
  * Fikset maler som bruker html i extra_text.
* 15.01.2016
  * Mulighet til å endre epost, sms og meldinger i altinn og sdp. Hver avsender kan nå skrive den teksten de vil. Det er viktig å teste disse endringene før de taes i bruk i produksjon. Spesielt digipost er veldig restriktive på hva de godtar i dokumentet.
* 12.01.2016
  * Når varsling feiler i SDP blir forsendelsen send til print, dette for at vi skal overholde forskriften om levering.
* 21.12.2015
  * Svar på forsendelse metadata lagt på ForsendelseServiceV5. Mulighet til å lage tråder basert på forsendelser.
* 17.12.2015
  * Fikset feil mot SDP, sdp takler kun 100tegn i tittel, vi kapper tittel hvis den er lenger.
* 15.12.2015
  * Send til SDP med dokumenter fungerer, det er begrensning på 10 mb og vi sender kun pdf filer. Andre filer godtar ikke sdp, og de avviser filer over 10mb. Det som ikke blir sendt til SDP blir send med link til filen i svarut.
  * 
* 07.12.2015
  * Statistikk på framsiden, blir nå oppdatert hver time.
* 25.11.2015
  * Fikset feil, der framgangsbaren i send forsendelse kunne stoppe.
* 20.11.2015
  * Sjekker at bilder i pdfer er lesbare.
* 19.11.2015
  * Registrerer hvem som bruker manuell print.
* 21.10.2015
  * Viser noark metadata i søkesiden om dette er sendt med forsendelsen.
  * Endret søk etter mottaker, no må hele navnet treffe. søk på "truls normann" treffer på "Ola Truls Normann".
* 12.10.2015
  * Fikset en feil der Send Forsendelse puttet filene i feil rekkefølge. No blir det rekkefølgen som står på siden.
  * Laget mulighet for å hente status på flere forsendelser i et kall.
  * La til nivå og hvilken postboks i sdp forsendelsen ble sendt til på rapporter.
  * Fjernet advarsel tekst på SDP. SDP skal no være godt testet i produksjon.
  * Alle forsendelser blir sjekket mot kontaktregisteret, reserverte blir nå sendt direkte til print og ikke til altinn.
* 10.08.2015
  * Tegnsett på melding i e-boks-grensesnitt skal være fikset
* 29.07.2015
  * Altinn sender nytt varsel etter 24 timer om meldingen ikke er åpnet.
* 24.07.2015
  * Mulighet til å sende nivå4 forsendelser med send forsendelse.
* 14.07.2015
  * Fikset import av xls fil for send forsendelse. Poststed ble land.
* 02.07.2015
  * Admin kan nå velge mellom å sende forsendelse til Altinn eller SDP
* 22.06.2015
  * Bedre håndtering av tilgangskontroll
* 18.06.2015
  * Fikset orgnr kom ikke med på organisasjons mottakere når de skulle sendes, via svarut websiden med send forsendelse.
* 17.06.2015
  * Fikset feil hvor personer med lesetilgang ikke fikk opp Forsendelser i menyen. 
* 12.06.2015
  * Fikset problem med gamle avsendere som ikke kunne få fjernet person
* 11.06.2015
  * La til rettighet lese slik at en kan få tilgang til å lese forsendelseloggen.
  * Fikset feil i giroark generering, kom på feil side ved dobbelsidig print. Print fikk digital ark.
* 05.06.2015
  * Fikset feil i mottaker ved opplasting av sertifikat.
  * Fikset nedlasting av nivå4 dokument, hvis du allerede var innlogget med nivå3 i svarut.
  * Fikset retry hvis oppslag i kontaktregisteret feilet.
* 29.05.2015
  * Fikset avsender advarsler om en har feil på avsender.
  * Fikset ytelse for SDP, skal nå gå mye raskere å sende til SDP.
  * Fikset feil ved lagring av print konfigurasjon uten gyldig fakturakonfigurasjon.
* 26.05.2015
  * Fikset manuell forsendelse til organisasjoner: Organisasjoner ble sendt direkte til print i manuell forsendelse.
* 19.05.2015
  * Fikset hent info for organisasjoner. Sluttet å fungere etter endringene i send forsendelse.
* 18.05.2015
  * Fikset excelmal for send forsendelse. Skal no ikke fjerne 0 i starten på fødselsnr.
  * Default verdier for send forsendelse er tosidig og b-post, som blir billigste alternativ.
  * Fikset feil ved at konfigurasjon ikke ble lagret før tittel var utfylt i send forsendelse.
* 13.05.2015
  * Send forsendelse kan no laste opp og ned mottakere i excel format. Det er testet med ca 100.000 mottakere, men fleire skal gå helt fint. 
* 12.05.2015
  * Fikset feil dato på printlogger fra Grafisk Digital, 19:00 ble 07:00
* 07.04.2015
  * Feilfiks i konfigurasjonsgrensesnitt, tilganger til organisasjon fungerte ikke.
  * Oppdatering av statistikk på forsiden (lest-statistikk skal være oppdatert og mer korrekt)
  * Endret validering for konteringskoder: det er nå tillatt med punktum (.) og øæå i konteringskoder
* 01.04.2015
  * Første utkast til integrasjon mot SDP, er klar til produksjonstest fra SvarUt sin side.
  * Oppgraderte kodeeksempel til v4 av servicen
  * Generelle ytelse forbedringer, økte ytelsen mot Grafisk Digtal, den var litt treig når det ble sendt 80.000 forsendelser fra Bergen.
* 03.03.2015
  * Endret antall likelydende forsendelser før de blir avvist til 25 fra 5.
* 06.02.2015
  * Scrollbar på konfigurasjonssiden hvis en har mangen avsendere/organisasjoner.
  * Økte timeout på søk til 30 sekund.
* 03.02.2015
  * Lagt til ekstra metadatafelt for avleverende sakssystem på forsendelsesservice versjon 3 og 4
  * HTTP Strict transport security lagt til
* 30.01.2015
  * Innførte validering av forsendelser som blir gjentatt. Hvis **avsender**, **tittel** og **mottaker** er like på 5 forsendelser innenfor 2 døgn, blir gjentagende forsendelser avvist. Det tar 2 døgn etter siste forsøk før vi slipper igjennom den samme kombinasjonen. Dette betyr at 5 forsendelser som er like blir kjørt igjennom, nummer 6++ blir avvist.
  * En tidlig utgave av ForsendelsesServiceV4 er lagt ut for å begynne testing av nivå4 dokument.
* 16.01.2015 
  * Innførte sterk kryptering av filene som er lagret på server.
  * Originalfiler blir ikke lagret på server hvis det er unødvendig. For å begrense antall filer som må krypteres.
  * Hvis filnavn har mapper, blir forsendelsen avvist (/ eller \ i filnavn)
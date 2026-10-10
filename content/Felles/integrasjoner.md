---
title: Integrasjoner
date: 2026-10-10
aliases: ["/fiks-platform/integrasjoner", "/fiks-plattform/integrasjoner", "/integrasjoner", "/felles/difiidportenklient", "/fiks-platform/difiidportenklient", "/fiks-plattform/difiidportenklient"]
---

En Fiks-integrasjon er måten et fagsystem får lov til å gjøre noe på Fiks-plattformen på vegne av en kommune eller en annen organisasjon. Et arkivsystem som sender post gjennom Fiks SvarUt, eller et fagsystem som legger meldinger i Fiks Innsyn, bruker en Fiks-integrasjon.

Ordet integrasjon brukes om mye. Digdir kaller også Maskinporten-klienter for integrasjoner i selvbetjeningen sin. På denne siden er en integrasjon alltid Fiks-integrasjonen, og Maskinporten-klienten heter Maskinporten-klient.

Denne siden forklarer hva som må være på plass, hvem som gjør hva og hvordan et kall ser ut. Den er skrevet for leverandøren som skal lage integrasjonen og for den i kommunen som skal sette den opp.

## Tre ting må være på plass

Et kall fra et fagsystem til en Fiks-tjeneste må svare på tre spørsmål. Hvert svar kommer fra sitt eget sted.

| Spørsmål | Svaret heter | Hvem lager det | Hvor |
|---|---|---|---|
| Hvem er du? | Et access token fra Maskinporten | Den som eier Maskinporten-klienten, som regel leverandøren | Digdirs selvbetjening |
| Hvilken organisasjon jobber du for? | En Fiks-integrasjon, med integrasjons-id og passord | Kommunen | Fiks forvaltning |
| Hva får du gjøre? | Tilganger på integrasjonen | Kommunen | Fiks forvaltning, under den enkelte tjenesten |

Mangler ett av de tre, blir svaret 401 eller 403. Se [Når det ikke virker](#nar-det-ikke-virker).

## Slik henger det sammen

Et eksempel. Storevik kommune bruker et sak- og arkivsystem fra en leverandør og vil sende post fra systemet gjennom SvarUt.

1. **Leverandøren har en Maskinporten-klient** på sitt eget organisasjonsnummer, med scopet `ks:fiks`. Den samme klienten bruker leverandøren for alle kundene sine.
2. **Storevik kommune oppretter en Fiks-integrasjon** i Fiks forvaltning og setter leverandørens organisasjonsnummer som autorisert organisasjon. Kommunen får en integrasjons-id og et passord.
3. **Storevik kommune gir integrasjonen tilgang** til det den skal gjøre, for eksempel «Sende forsendelser» på SvarUt-kontoen til byarkivet.
4. **Kommunen gir integrasjons-id og passord til leverandøren**, som legger dem inn i fagsystemet.
5. **Fagsystemet henter token fra Maskinporten** med leverandørens egen nøkkel og kaller SvarUt med tokenet, integrasjons-id og passord.

Fiks sjekker at organisasjonsnummeret i tokenet er det samme som den autoriserte organisasjonen på integrasjonen, at passordet stemmer og at integrasjonen har tilgangen. Da går forsendelsen.

To organisasjonsnummer er i spill, og de er som regel ulike: kommunens, som eier SvarUt-kontoen og integrasjonen, og leverandørens, som står i Maskinporten-tokenet og som autorisert organisasjon på integrasjonen. Det er vanlig og riktig at autorisert organisasjon er et annet nummer enn kommunens. Leverer leverandøren til flere kommuner, har hver kommune sin egen integrasjon, og alle har leverandørens nummer som autorisert organisasjon.

Ikke bytt autorisert organisasjon til kommunens eget nummer når du rydder i integrasjonene. Står det et nummer du ikke kjenner igjen, er det som regel leverandøren som drifter fagsystemet. Bytter du det, slutter integrasjonen å virke.

## Hvem gjør hva

**Kommunen**

- Har avtale med KS Digital om tjenesten, for eksempel SvarUt.
- Oppretter Fiks-integrasjonen i Fiks forvaltning, under tjenesten den gjelder, med leverandørens organisasjonsnummer som autorisert organisasjon.
- Gir integrasjonen tilgang til det den trenger, og ikke mer.
- Gir integrasjons-id og passord til leverandøren på en trygg måte.
- Trekker tilbake tilgangen ved å bytte passord eller slette integrasjonen i Fiks forvaltning. Det stopper alle kall med en gang.

**Leverandøren**

- Har en Maskinporten-klient med scopet `ks:fiks`, se [Maskinporten](#maskinporten).
- Legger integrasjons-id og passord inn i fagsystemet, helst på en konfigurasjonsside kommunen selv kan fylle ut.
- Bruker tokenet, integrasjons-id og passord i alle kall.

Det finnes ikke noe API for å opprette Fiks-integrasjoner eller gi tilganger. Det gjøres av kommunen i Fiks forvaltning.

## Maskinporten

Fiks-plattformen bruker Maskinporten for å vite hvilken organisasjon som kaller. Fiks krever dette av tokenet:

- Det er et JWT access token fra Maskinporten, med scopet `ks:fiks`.
- Organisasjonsnummeret i tokenet, claimet `consumer`, er det samme som den autoriserte organisasjonen på Fiks-integrasjonen. Hva som avgjør hvilket nummer Maskinporten legger i tokenet, står hos Digdir.
- Klienten kan være autentisert med virksomhetssertifikat eller med en egen asymmetrisk nøkkel. Fiks bryr seg ikke om hvilken.

**Før du kan velge `ks:fiks` i Digdirs selvbetjening, må KS Digital ha gitt organisasjonen din tilgang til scopet.** Send organisasjonsnummeret til [fiks@ksdigital.no](mailto:fiks@ksdigital.no), og si om det gjelder test, produksjon eller begge. For kommuner og fylkeskommuner må det være hovedorganisasjonsnummeret, det samme som har avtale med Digdir om Maskinporten.

**Vår anbefaling er at leverandøren eier Maskinporten-klienten** og bruker sitt eget virksomhetssertifikat eller sin egen nøkkel. Da kan én klient brukes for alle kundene, og kommunen slipper å dele noe. Et virksomhetssertifikat er en nøkkel som lar den som har det, opptre som organisasjonen. Kommunen skal aldri gi virksomhetssertifikatet sitt til en leverandør.

**Vil kommunen eie Maskinporten-klienten selv**, kan den opprette klienten på sitt eget organisasjonsnummer og registrere leverandørens offentlige nøkkel på den. Leverandøren lager nøkkelparet, beholder den private nøkkelen og gir kommunen bare den offentlige. Tokenet får da kommunens organisasjonsnummer, og autorisert organisasjon på Fiks-integrasjonen skal være kommunens. Kommunen kan i tillegg trekke tilbake leverandørens tilgang ved å slette nøkkelen på klienten.

Hvordan du får avtale med Digdir, får tilgang til selvbetjeningen, oppretter klienten og registrerer nøkler, står hos Digdir, og det er dit du skal:

- [Ta i bruk Maskinporten som konsument](https://samarbeid.digdir.no/maskinporten/konsument/119), for kommuner og andre som skal bruke API-et selv.
- [Maskinporten for leverandører](https://samarbeid.digdir.no/maskinporten/leverandor/121), for leverandører som henter token på vegne av kunder.
- [Teknisk veiledning for API-konsumenter](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument), med hvordan tokenet hentes og hvordan egen nøkkel registreres.

Står du fast hos Digdir, er det Digdir som kan hjelpe: [servicedesk@digdir.no](mailto:servicedesk@digdir.no).

### Klientbiblioteker

KS Digital har biblioteker som henter token fra Maskinporten, med virksomhetssertifikat eller egen nøkkel:

| Språk | Bibliotek |
|---|---|
| Java | [fiks-maskinporten](https://github.com/ks-no/fiks-maskinporten) |
| .NET | [fiks-maskinporten-client-dotnet](https://github.com/ks-no/fiks-maskinporten-client-dotnet) |

Du trenger ikke bruke dem. Et hvilket som helst bibliotek som kan hente et Maskinporten-token, virker.

## Slik ser et kall ut

Alle kall fra en Fiks-integrasjon har tre HTTP-headere:

| Header | Innhold |
|---|---|
| `Authorization` | `Bearer` og access tokenet fra Maskinporten, med scope `ks:fiks` |
| `IntegrasjonId` | Integrasjons-id-en fra Fiks forvaltning |
| `IntegrasjonPassord` | Passordet fra Fiks forvaltning |

```bash
curl https://api.fiks.test.ks.no/<tjeneste>/api/v1/<endepunkt> \
  -H "Authorization: Bearer <access token fra Maskinporten>" \
  -H "IntegrasjonId: <integrasjons-id>" \
  -H "IntegrasjonPassord: <passord>"
```

For kall med JSON-innhold legger du til `Content-Type: application/json`. Endepunktene, parameterne og innholdet er beskrevet i spesifikasjonen til hver tjeneste.

## Kall på vegne av en innlogget person

Er en person logget inn i fagsystemet med ID-porten, kan fagsystemet gjøre kall på vegne av personen. Da sender du personens access token i `Authorization` i stedet for et token fra Maskinporten. `IntegrasjonId` og `IntegrasjonPassord` er de samme. Organisasjonsnummeret i tokenet, claimet `consumer`, må være den autoriserte organisasjonen på integrasjonen.

Tjenesten som blir kalt, vet da både hvem personen er og hvilken integrasjon kallet kommer fra, og det er personens egne tilganger i Fiks som gjelder.

## Test og produksjon

| Miljø | API | Fiks forvaltning | Maskinporten |
|---|---|---|---|
| Test | `https://api.fiks.test.ks.no/` | `https://forvaltning.fiks.test.ks.no/` | `https://test.maskinporten.no/` |
| Produksjon | `https://api.fiks.ks.no/` | `https://forvaltning.fiks.ks.no/` | `https://maskinporten.no/` |

Testmiljøet og produksjon er helt adskilt, hos oss og hos Digdir. En integrasjon, et token eller en tilgang i test gjelder ikke i produksjon, og Maskinporten-klienten i test er en annen klient enn den i produksjon. Bruker du virksomhetssertifikat, trenger du ett for test og ett for produksjon. Bruker du egen nøkkel, trenger du én per miljø. Hvilke sertifikater Digdir godtar i hvert miljø, står hos Digdir.

Testmiljøet skal bare inneholde testdata. Produksjonsdata skal ikke inn i testmiljøet: ikke personopplysninger, ikke dokumenter og ikke annet som kommer fra reelle saker. Bruk syntetiske testpersoner. Organisasjoner er som regel deres egne fra Enhetsregisteret, og det er dem testvirksomhetssertifikatet er utstedt til. Se [testmiljø]({{% ref "Felles/testmiljo.md" %}}).

**Komme i gang i test**

1. Send organisasjonsnummeret til [fiks@ksdigital.no](mailto:fiks@ksdigital.no), så gir vi tilgang til `ks:fiks` i Maskinportens testmiljø. Be samtidig om tilgang til Slack-kanalen vår for support. Der tar vi helst spørsmålene.
2. Opprett Maskinporten-klienten i Digdirs testmiljø.
3. Be oss om en testorganisasjon i testmiljøet til Fiks forvaltning, eller bruk den dere har. Opprett integrasjonen der, med organisasjonsnummeret fra Maskinporten-klienten som autorisert organisasjon. Skjemaet kan vise en feilmelding når organisasjonsnummeret ikke finnes i testregisteret, men integrasjonen virker likevel.
4. Gi integrasjonen tilgang til tjenesten dere tester mot.

Se også [testmiljø]({{% ref "Felles/testmiljo.md" %}}) for testdata.

**Komme i gang i produksjon**

1. Kommunen må ha avtale med KS Digital om tjenesten.
2. Send organisasjonsnummeret som skal stå i Maskinporten-tokenet til [fiks@ksdigital.no](mailto:fiks@ksdigital.no), så gir vi tilgang til `ks:fiks` i produksjon.
3. Opprett Maskinporten-klienten i produksjon hos Digdir.
4. Kommunen oppretter integrasjonen i Fiks forvaltning og gir tilganger.

## Når det ikke virker {#nar-det-ikke-virker}

| Du ser | Det betyr som regel |
|---|---|
| `ks:fiks` vises ikke i listen over scopes i Digdirs selvbetjening | KS Digital har ikke fått organisasjonsnummeret ditt, eller har fått et annet nummer enn det som står i tokenet. Send det til [fiks@ksdigital.no](mailto:fiks@ksdigital.no). |
| Maskinporten gir ikke token | Noe mangler hos Digdir: nøkkel, klient eller scope. Se Digdirs veiledning, eller spør Digdir. |
| 401 «Klarte ikke å validere access_token» | Tokenet er problemet: utløpt, feil utsteder eller mangler scopet `ks:fiks`. Hent et nytt token rett før kallet. |
| 401 «Autentisering feilet for integrasjon med id …» | Tokenet er godtatt, men integrasjonen ikke. Enten er organisasjonsnummeret i tokenet ikke den autoriserte organisasjonen, passordet er feil, eller integrasjonen finnes ikke. Fiks sier ikke hvilken. Sjekk `consumer` i tokenet mot integrasjonen i Fiks forvaltning. |
| 403 fra Fiks | Integrasjonen er autentisert, men har ikke tilgang til det den prøver på. Kommunen må gi tilgangen i Fiks forvaltning, på riktig tjeneste eller konto. |
| Det virker i test, men ikke i produksjon | Alt må settes opp på nytt i produksjon: scope-tilgang til `ks:fiks`, Maskinporten-klient i produksjon med eget virksomhetssertifikat eller egen nøkkel for produksjon, integrasjon og tilganger. Et testsertifikat eller en testnøkkel virker ikke i produksjon. |

## Grensesnitt og spesifikasjoner

API-ene er REST med JSON. Hver tjeneste har en [OpenAPI-spesifikasjon](https://github.com/OAI/OpenAPI-Specification) som både dokumenterer grensesnittet og kan brukes til å generere klienter. Spesifikasjonene ligger under hver tjeneste på dette nettstedet, og en samlet oversikt over KS Digitals egne klientbiblioteker finnes på [Klientbiblioteker]({{% ref "Felles/klientbiblioteker.md" %}}).

## Feilmeldinger

De fleste API-ene svarer med feil på dette formatet:

```json
{
  "timestamp": 1637218198035,
  "status": 400,
  "error": "Bad Request",
  "errorId": "3389ad1b-afa4-42e1-b6f8-76f63e560ad5",
  "path": "/tjeneste/api/v1/ressurs/123456",
  "message": "Beskrivelse av feilen",
  "errorCode": "FEILKODE",
  "errorJson": {"antall": 13}
}
```

`errorId` er det vi trenger når du ber om hjelp. `errorCode` og `errorJson` er satt bare når tjenesten har en maskinlesbar feilkode.

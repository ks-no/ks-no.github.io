---
title: Folkeregister
date: 2022-02-18
aliases: [/fiks-plattform/tjenester/folkeregister/]
---

## Fiks folkeregister
Fiks folkeregister er en tjeneste for å gjøre oppslag, uttrekk og hente ut hendelseslister fra Skatteetate sitt [Folkeregister](https://skatteetaten.github.io/folkeregisteret-api-dokumentasjon/) (FREG). Fiks folkeregister speiler [konsument tjenestene](https://skatteetaten.github.io/folkeregisteret-api-dokumentasjon/konsumenttjenester/) til Skatteetaten på Fiks plattformen. 
Mer informasjon om Fiks folkeregister finner man [her](https://www.ks.no/fagomrader/digitalisering/felleslosninger/modernisert-folkeregister/).

Fiks folkeregister tilbyr tilgang til folkeregisteret via
* Søkeportal
* Maskin-til-maskin-integrasjon

For å ta i bruk Fiks folkeregister må man inngå bruksavtaler både med skatteetaten og KS. [Klikk her for mer informasjon.](https://portal.fiks.ks.no/fiks/fiks-folkeregister/)

Når avtalene er inngått kan en administrator i kommunen/fylkeskommunen sette opp løsningen. Dette må gjøres før fagsystemene og saksbehandlere kan ta i bruk tjenesten.
![Bilde som beskriver sammenheng mellom de kommunale aktørene](https://lucid.app/publicSegments/view/e66fc04c-e8a8-4984-b224-7d0a5ae5486a/image.png)

## Hva må være på plass før man kan integrere
### Kommune/Fylkeskommune
Dere må:
* Ha inngått avtaler med Skatteetaten og KS, samt delegert tilgang til KS, [klikk her for mer informasjon](https://portal.fiks.ks.no/fiks/fiks-folkeregister/).
* Ha virksomhetssertifikat for de miljøene dere skal være koblet opp i
* Ha avtale med Digdir om bruk av maskinporten
* Kontakt (fiks-utvikling@ks.no) oss og be om å få tilgang til scopet ks:fiks. Husk å oppgi organisasjonsnummeret det gjelder. (Samme nummer som virksomhetssertifikatet er utstedt til.)
* Opprett maskinportenklient som konfigureres opp med ks:fiks-scopet

### Leverandører
Dere må:
* Ha virksomhetssertifikat for de miljøene dere skal være koblet opp i
* Ha avtale med Digdir om bruk av maskinporten
* Kontakt (fiks-utvikling@ks.no) oss og be om å få tilgang til scopet ks:fiks, samt tilgang til Fiks-plattformen (testmiljø). Husk å oppgi organisasjonsnummeret det gjelder. (Samme nummer som virksomhetssertifikatet er utstedt til.)
* Opprett maskinportenklient som konfigureres opp med ks:fiks-scopet

### Felles
Når dere har fått tilgang til Fiks-plattformen må dere:
* Sette opp Fiks-folkeregister-tjenesten 
* Lage en eller flere roller
* Opprette en eller flere integrasjon gi integrasjonen tilgang til rollen(e).

## Jeg er utvikler og ønsker å integrere
Du er klar til å [integrere](https://ks-no.github.io/fiks-plattform/integrasjoner/) mot Fiks folkeregister når du har følgende tilgjengelig:
* virksomhetssertifikat
* maskinportenklientid
* rolleid
* integrasjon (brukernavn og passord)

## Roller og dataminimering

Skatteetaten har laget en egen side for [dataminimering](https://skatteetaten.github.io/folkeregisteret-api-dokumentasjon/dataminimering/). Rollene får tildelt "parts"/egenskaper (informasjonselementer) fra ut fra dataminimeringsoversikten. En rolle kan bare hente informasjonselementer som er definert i rollen og forsøk på å hente informasjonselementer ut over det som er definert resulterer i en feilmelding.

I dokumentasjonen til API-et til FREG står det `Dersom part ikke oppgis vil retur innholde samme informasjon som finnes i "person-basis"`. En forespørsel med en rolle som ikke har tilgang til hele "person-basis" blir avvist dersom man ikke oppgir "parts"/egenskaper.

## Miljøer OpenAPI/Swagger og oppbygging av endepunkter**

| Miljø              | URL                          |
| ------------------ | ---------------------------- |
| Test (Integrasjon) | http&#8203;s://api.fiks.test.ks.no  |
| Produksjon         | http&#8203;s://api.fiks.ks.no       |

Vi tilbyr et API som speiler FREG og et API som er tilpasset 0-16-uttrekk.

## FREG-API
Våre API er en speiling av FREG og vi tilbyr derfor ikke egne OpenAPI/Swagger-dokumentasjon. [Klikk her for FREG sin Swagger-dokumentasjon.](https://app.swaggerhub.com/organizations/Skatteetaten_FREG)

Les mer om hvordan tjenestene virker hos Skatteetaten:
* [Hendelsesliste](https://skatteetaten.github.io/folkeregisteret-api-dokumentasjon/hendelsesliste/)
* [Oppslag](https://skatteetaten.github.io/folkeregisteret-api-dokumentasjon/oppslag/)
* [Uttrekk](https://skatteetaten.github.io/folkeregisteret-api-dokumentasjon/uttrekk/)


Vi har en annen oppbygging av URL-stien enn Skatteetaten. Vi har erstattet rettighetspakke (offentlig med hjemmel og offentlig uten hjemmel) med en rolleid.

URL-sti for Fiks sitt proxy-api er på formen:
```<MILJØ_URL>/folkeregister/api/v1/{ROLLE_ID}/{FREG_RESSURS}```

- ```ROLLE_ID``` - Id for rollen som brukes
- ```FREG_RESSURS``` - URL-sti for oppslag/uttrekk/hendelser fra skatteetatens api, på formen med eksempel ```v1/personer/{personidentifikator}```

Merk at dette er URL-stien som skal brukes uavhengig av om fagsystemet bruker api for offentlig med hjemmel eller offentlig uten hjemmel, da det er rollen som definerer hvilken som blir brukt.

### Eksempel på bruk av API-et
Eksempelet er utført med httpie: `http --pretty format GET https://api.fiks.test.ks.no/folkeregister/api/v1/<ROLLE_ID>/v1/personer/06076301709?part=bostedsadresse Accept: application/json IntegrasjonId:<INTEGRASJONSID> Authorization:Bearer <JWT_TOKEN_FRA_MASKINPORTEN> IntegrasjonPassord:<INTEGRASJONSPASSORD>`
```json
{
	"bostedsadresse": [{
		"aarsak": "Årsakskode fra DSF: ",
		"adresseIdentifikatorFraMatrikkelen": "510430318",
		"adressegradering": "ugradert",
		"ajourholdstidspunkt": "2020-03-24T00:00:00+01:00",
		"erGjeldende": true,
		"grunnkrets": 5102,
		"gyldighetstidspunkt": "2020-03-24T00:00:00+01:00",
		"kilde": "KILDE_DSF",
		"kirkekrets": 2,
		"skolekrets": 160,
		"stemmekrets": 1701,
		"vegadresse": {
			"adressekode": "00001",
			"adressenavn": "Ospeskogveien",
			"bruksenhetsnummer": "H0101",
			"bruksenhetstype": "fritidsbolig",
			"coAdressenavn": "",
			"kommunenummer": "0301",
			"poststed": {
				"postnummer": "0758",
				"poststedsnavn": "OSLO"
			}
		}
	}],
	"identifikasjonsnummer": [{
		"ajourholdstidspunkt": "2020-03-25T20:14:54.736+01:00",
		"erGjeldende": true,
		"foedselsEllerDNummer": "06076301709",
		"identifikatortype": "foedselsnummer",
		"kilde": "KILDE_DSF",
		"status": "iBruk"
	}]
}
```

### Oppvekst-API
OpenAPI/Swagger-dokumentasjon for oppvekst-API finner man [her](https://editor.swagger.io/?url=https://developers.fiks.ks.no/api/folkeregister-oppvekst-api-v1.json).

Dette API har spesifikke krav for rollen som brukes. Bruksområde skal være «Søk etter person» og følgende informasjonselementer for «Personbasis» og «Relasjon utvidet» må være valgt:

Personbasis:
* Fødselsnummer eller d-nummer
* Personstatus
* Fødsel
* Statsborgerskap
* Kjønn
* Navn
* Bostedsadresse
* Oppholdsadresse
* Delt bosted
* Postadresse
* Adressebeskyttelse

Identitetsgrunnlag utvidet:
* Utenlandsk personidentifikasjon

Relasjon utvidet:
* Familierelasjon
* Foreldreansvar

Historiske data


## Kontakt
Tekniske spørsmål og henvendelser kan rettes til fiks-utvikling@ks.no, øvrige henvendelser kan rettes til fiks@ks.no

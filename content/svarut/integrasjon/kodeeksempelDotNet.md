---
title: Kodeeksempel .Net
date: 2017-01-01
---
# Kodeeksempel - .NET

Last ned komplett [kodeeksempel](../files/121363/dot-net-eksempel.zip)

### Generelt

*   Bruk WCF til import av WSDL
*   Sett authenticationScheme til Basic i config: <httpsTransport ... authenticationScheme="Basic" ... />
*   Bytt ut textMessageEncoding i config med mtomMessageEncoding: 
```html<mtomMessageEncoding maxReadPoolSize="211" maxWritePoolSize="2132" messageVersion="Soap12" writeEncoding="utf-8"/>```

### Konfigurasjon (app.config)

```html
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
    <system.serviceModel>
        <bindings>
            <customBinding>
                <binding name="ForsendelsesServiceV4SoapBinding">
                    <mtomMessageEncoding maxReadPoolSize="211" maxWritePoolSize="2132" messageVersion="Soap12" writeEncoding="utf-8"/>
                    <httpsTransport manualAddressing="false" maxBufferPoolSize="524288"
                                    maxReceivedMessageSize="65536" allowCookies="false" authenticationScheme="Basic"
                                    bypassProxyOnLocal="false" decompressionEnabled="true" hostNameComparisonMode="StrongWildcard"
                                    keepAliveEnabled="true" maxBufferSize="65536" proxyAuthenticationScheme="Anonymous"
                                    realm="" transferMode="Buffered" unsafeConnectionNtlmAuthentication="false"
                                    useDefaultWebProxy="true" requireClientCertificate="false" />
                </binding>
            </customBinding>
        </bindings>
        <client>
            <endpoint address="https://test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV4"
                      binding="customBinding" bindingConfiguration="ForsendelsesServiceV4SoapBinding"
                      contract="ForsendelsesService.ForsendelsesServiceV4" name="ForsendelsesServiceV4" />
        </client>
    </system.serviceModel>
</configuration>
```

### Kall av tjenesten fra en testmetode.

```html
        /// <summary>/// Dette eksemplet forutsetter at følgende er gjort:
        /// 1) Har opprettet bruker og service-passord for å kunne sende inn forsendelse til SvarUt
        ///</summary> 
        [TestMethod]
        public void TestAtSendForsendelseReturnererId()
        {
            var forsendelsesService = new ForsendelsesService.ForsendelsesServiceV4Client();

            forsendelsesService.ClientCredentials.UserName.UserName = UserName;
            forsendelsesService.ClientCredentials.UserName.Password = Password;

            string tittel = "Dette er en ukryptert eksempelforsendelse fra .Net  - " + Guid.NewGuid().ToString();
            string id = forsendelsesService.sendForsendelse(ForsendelseUtil.CreateUkryptertForsendelse(tittel));
            Assert.IsNotNull("Id skal ikke være null. Forsendelse feilet.", id);
        }

        /// <summary>/// Dette eksemplet forutsetter at følgende er gjort:
        /// 1) Har opprettet bruker og service-passord for å kunne sende inn forsendelse til SvarUt
        /// 3) Har lastet ned public key fra SvarUt og erstattet filen svarut_public.pem i resources mappen
        /// 4) Orgnr er registrert på mottaker i SvarUt
        ///</summary> 
[TestMethod]
        public void TestAtKryptertSendForsendelseReturnererId()
        {
            // NB: Dette er kun gjort for testing.
            ServicePointManager.ServerCertificateValidationCallback = (obj, certificate, chain, errors) => true;

            // NB: Slå av Expect100Continue. Denne er pr default satt til true og kan føre til problemer.
            ServicePointManager.Expect100Continue = false;

            var forsendelsesService = new ForsendelsesService.ForsendelsesServiceV4Client();

            forsendelsesService.ClientCredentials.UserName.UserName = UserName;
            forsendelsesService.ClientCredentials.UserName.Password = Password;

            string tittel = "Dette er en kryptert eksempelforsendelse fra .Net - " + Guid.NewGuid().ToString();
            string id = forsendelsesService.sendForsendelse(ForsendelseUtil.CreateKryptertForsendelse(tittel));
            Assert.IsNotNull("Id skal ikke være null. Forsendelse feilet.", id);
        }

namespace ForsendelseClientSample.Utils
{
    class ForsendelseUtil
    {
        public static forsendelse CreateKryptertForsendelse(string tittel)
        {
            forsendelse forsendelse = new forsendelse {kryptert = true, tittel = tittel, krevNiva4Innlogging = false, avgivendeSystem = "Avgivende system .Net"};
            forsendelse.dokumenter = new[] {CreateKryptertDokument()};
            forsendelse.mottaker = CreatePrivatPerson();
            forsendelse.printkonfigurasjon = CreatePrintkonfigurasjon();
            return forsendelse;
        }

        public static forsendelse CreateUkryptertForsendelse(string tittel)
        {
            var testForsendelse = new forsendelse { kryptert = false, tittel = tittel, krevNiva4Innlogging = false, avgivendeSystem = "Avgivende system .Net"};
            testForsendelse.mottaker = CreatePrivatPerson();
            var dok = new dokument();
            dok.filnavn = "small.pdf";
            dok.mimetype = "application/pdf";
            dok.data = ForsendelseClientSample.Properties.Resources.small_pdf;
            testForsendelse.dokumenter = new dokument[1] { dok };
            testForsendelse.printkonfigurasjon = CreatePrintkonfigurasjon();

            return testForsendelse;
        }

        public static forsendelse CreateUkryptertForsendelseForOrgnr(string tittel, string orgnr, byte[] dataBytes)
        {
            var testForsendelse = new forsendelse { kryptert = false, tittel = tittel, krevNiva4Innlogging = false, avgivendeSystem = "Avgivende system .Net" };
            testForsendelse.mottaker = CreateOrganisasjon(orgnr);
            var dok = new dokument();
            dok.filnavn = "small.pdf";
            dok.mimetype = "application/pdf";
            dok.data = dataBytes;
            testForsendelse.dokumenter = new dokument[1] { dok };
            testForsendelse.printkonfigurasjon = CreatePrintkonfigurasjon();

            return testForsendelse;
        }

        private static mottaker CreateOrganisasjon(string orgnr)
        {
            return new organisasjon
            {
                orgnr = orgnr,
                adresse1 = "Hakkebakkeskogen 111",
                navn = "Bamsefar",
                postnr = "5236",
                poststed = "RÅDAL"
            };
        }

        private static printkonfigurasjon CreatePrintkonfigurasjon()
        {
            return new printkonfigurasjon
            {
                brevtype = brevtype.APOST,
                brevtypeSpecified = true,
                fargePrint = false,
                tosidig = false
            };
        }

        private static mottaker CreatePrivatPerson()
        {
            return new privatPerson
            {
                fodselsnr = "12345678910",
                adresse1 = "Hakkebakkeskogen 111",
                navn = "Bamsefar",
                postnr = "5236",
                poststed = "RÅDAL"
            };
        }

        public static dokument CreateKryptertDokument()
        {
            dokument dok = new dokument();
            dok.mimetype = "application/pdf";
            dok.filnavn = "test.pdf";
            X509Certificate sertifikat = HentX509Certificate();
            KrypterDokumentMedSertifikat(dok, sertifikat);

            return dok;
        }

        private static void KrypterDokumentMedSertifikat(dokument dok, X509Certificate sertifikat)
        {
            byte[] ukryptertBytes = ForsendelseClientSample.Properties.Resources.small_pdf;
            byte[] kryptertData = CMSDataKryptering.KrypterData(ukryptertBytes, sertifikat);
            dok.data = kryptertData;
        }

        private static X509Certificate HentX509Certificate()
        {
            // svarut_public.pem må lastes ned og erstattes
            X509CertificateParser certParser = new X509CertificateParser();
            X509Certificate certificate = certParser.ReadCertificate(ForsendelseClientSample.Properties.Resources.svarut_public);

            return certificate;
        }
    }
}

```
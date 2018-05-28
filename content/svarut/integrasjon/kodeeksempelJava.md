---
title: Kodeeksempel Java
date: 2017-01-01
---


# Kodeeksempel - Java

Last ned komplett [kodeeksempel](https://svarut.ks.no/releases/java-eksempel.zip)

Dersom forsendelser skal krypteres, trenger du Unlimited Strength Jurisdiction files for Java (en Java Cryptography Extension). I tillegg trengs [Den offentlige nøkkelen](https://svarut.ks.no/forsendelse/publickey/hent) [Den offentlige nøkkelen for TEST](https://test.svarut.ks.no/forsendelse/publickey/hent) til SvarUt. Dersom forsendelser ikke skal krypteres trengs ikke Bouncy Castle-avhengighetene.

### Maven dependencies

```html
<dependency>
	<groupId>org.apache.cxf</groupId>
	<artifactId>cxf-rt-frontend-jaxws</artifactId>
	<version>${cxf.version}</version>
</dependency>
<dependency>
	<groupId>org.apache.cxf</groupId>
	<artifactId>cxf-rt-transports-http</artifactId>
	<version>${cxf.version}</version>
</dependency>
<dependency>
	<groupId>org.apache.commons</groupId>
	<artifactId>commons-io</artifactId>
	<version>1.3.2</version>
</dependency>
<dependency>
	<groupId>org.bouncycastle</groupId>
	<artifactId>bcpkix-jdk15on</artifactId>
	<version>1.50</version>
</dependency>
<dependency>
	<groupId>org.bouncycastle</groupId>
	<artifactId>bcprov-jdk15on</artifactId>
	<version>1.50</version>
</dependency>
```

### Maven plugin

```html
<build>
	<plugins>
		<plugin>
			<groupId>org.apache.cxf</groupId>
			<artifactId>cxf-codegen-plugin</artifactId>
			<version>${cxf.version}</version>
			<executions>
				<execution>
					<id>generate-sources</id>
					<phase>generate-sources</phase>
					<configuration>
						<sourceRoot>${project.build.directory}/generated/cxf</sourceRoot>
						<wsdlOptions>
							<wsdlOption>
								<wsdl>https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV4?wsdl</wsdl>
							</wsdlOption>
						</wsdlOptions>
					</configuration>
					<goals>
						<goal>wsdl2java</goal>
					</goals>
				</execution>
			</executions>
		</plugin>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>3.1</version>
			<configuration>
				<source>1.8</source>
				<target>1.8</target>
				<encoding>UTF-8</encoding>
			</configuration>
		</plugin>
	</plugins>
</build>
```

### Kall av tjenesten

```html
public class ForsendelseService {

	private final static String USERNAME = "brukernavn";
	private final static String PASSORD = "passord";
	private final static String SERVICE_URL = "https://svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV4";
	private final static String PROPERTY_MTOM = "mtom-enabled";

	public static ForsendelsesServiceV4 create() {
		Map <string,object>props = new HashMap<string, object="">();
		props.put("mtom-enabled", Boolean.TRUE);

		JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
		factory.setServiceClass(ForsendelsesServiceV4.class);
		factory.setAddress(SERVICE_URL);
		factory.setUsername(USERNAME);
		factory.setPassword(PASSORD);
		factory.setProperties(getProperties());
		factory.getFeatures().add(new WSAddressingFeature());
		ForsendelsesServiceV4 serviceV4 = (ForsendelsesServiceV4) factory.create();
		Client proxy = ClientProxy.getClient(serviceV4);
		HTTPConduit conduit = (HTTPConduit) proxy.getConduit();

		HTTPClientPolicy httpClientPolicy = new HTTPClientPolicy();
		httpClientPolicy.setConnectionTimeout(120000);
		httpClientPolicy.setReceiveTimeout(120000);
		conduit.setClient(httpClientPolicy);

		return serviceV4;
	}

	private static Map <string, object="">getProperties() {
		Map <string,object>props = new HashMap<string, object="">();
		props.put(PROPERTY_MTOM, Boolean.TRUE);
		return props;
	}
}
```

### Eksempel

```html
public void sendEksempelUkryptertForsendelseV4() {
        ForsendelsesServiceV4 service = ForsendelseService.create();
        Forsendelse forsendelse = ForsendelseBuilder.createUkryptert();

        try {
            String forsendelsesid = service.sendForsendelse(forsendelse);
            System.out.println(forsendelsesid);
            assertNotNull("SendForsendelse skal returnere forsendelsesid", forsendelsesid);

            ForsendelseStatus status = service.retrieveForsendelseStatus(forsendelsesid);
            System.out.println(status);
            assertNotNull("RetrieveForsendelseStatus skal returnere status", status);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void sendEksempelKryptertForsendelseV4() {
        ForsendelsesServiceV4 service = ForsendelseService.create();

        try {
            Forsendelse forsendelse = ForsendelseBuilder.createKryptert();
            String forsendelsesid = service.sendForsendelse(forsendelse);
            System.out.println(forsendelsesid);
            assertNotNull("SendForsendelse skal returnere forsendelsesid", forsendelsesid);

            ForsendelseStatus status = service.retrieveForsendelseStatus(forsendelsesid);
            System.out.println(status);
            assertNotNull("RetrieveForsendelseStatus skal returnere status", status);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

public class ForsendelseBuilder {

	public static Forsendelse createUkryptert(){
		Forsendelse forsendelse = new Forsendelse();
		forsendelse.setTittel("Tittel");
		forsendelse.setAvgivendeSystem("Avgivende system");
		forsendelse.getDokumenter().add(createDokument());
		forsendelse.setMottaker(createPrivatPerson());
		forsendelse.setPrintkonfigurasjon(createPrintkonfigurasjon());
		forsendelse.setKrevNiva4Innlogging(false);
		forsendelse.setKryptert(false);
		return forsendelse;
	}

	public static Forsendelse createKryptert() throws IOException, CertificateException {
		Forsendelse forsendelse = new Forsendelse();
		forsendelse.setTittel("Tittel");
		forsendelse.setAvgivendeSystem("Avgivende system");
		forsendelse.getDokumenter().add(createKryptertDokument());
		forsendelse.setMottaker(createPrivatPerson());
		forsendelse.setPrintkonfigurasjon(createPrintkonfigurasjon());
		forsendelse.setKrevNiva4Innlogging(false);
		forsendelse.setKryptert(true);
		return forsendelse;
	}

	private static Printkonfigurasjon createPrintkonfigurasjon() {
		Printkonfigurasjon printkonfigurasjon = new Printkonfigurasjon();
		printkonfigurasjon.setBrevtype(Brevtype.APOST);
		return printkonfigurasjon;
	}

	private static PrivatPerson createPrivatPerson() {
		PrivatPerson privatPerson = new PrivatPerson();
		privatPerson.setAdresse1("Adresse1");
		privatPerson.setNavn("Navn");
		privatPerson.setPostnr("1234");
		privatPerson.setPoststed("Poststed");
		privatPerson.setFodselsnr("12345678901");
		return privatPerson;
	}

	private static Dokument createDokument() {
		Dokument dokument = new Dokument();
		dokument.setData(loadPdfFromClasspath("test.pdf"));
		dokument.setMimetype("application/pdf");
		dokument.setFilnavn("test.pdf");
		return dokument;
	}

	private static Dokument createKryptertDokument() throws IOException, CertificateException {
		Dokument dokument = new Dokument();
		dokument.setMimetype("application/pdf");
		dokument.setFilnavn("test.pdf");

		X509Certificate sertifikat = hentX509Certificate();
		krypterDokumentMedSertifikat(dokument, sertifikat);
		return dokument;
	}

	private static X509Certificate hentX509Certificate() throws IOException, CertificateException {
		byte[] sertifikatBytes = IOUtils.toByteArray(getInputStreamForFileFromClasspath("svarut_public.pem"));
		return (X509Certificate) CertificateFactory.getInstance("X509").generateCertificate(new ByteArrayInputStream(sertifikatBytes));
	}

	private static void krypterDokumentMedSertifikat(Dokument dokument, X509Certificate sertifikat) throws IOException {
		CMSDataKryptering kryptering = new CMSDataKryptering();
		byte[] kryptertData = kryptering.krypterData(IOUtils.toByteArray(getInputStreamForFileFromClasspath("test.pdf")), sertifikat);
		dokument.setData(new DataHandler(new ByteArrayDataSource(kryptertData, dokument.getMimetype())));
	}

	private static DataHandler loadPdfFromClasspath(String resource){
		URL url = Thread.currentThread().getContextClassLoader().getResource(resource);
		return new DataHandler(url);
	}

	public static InputStream getInputStreamForFileFromClasspath(String resource){
		return Thread.currentThread().getContextClassLoader().getResourceAsStream(resource);
	}

}
```
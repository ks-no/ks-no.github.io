---
title: Kodeeksempel MottaksserviceV1
date: 2017-01-01
aliases: [/svarut/integrasjon/kodeeksempelMottakerRest]
---

### Maven dependencies

```html
    <dependency>
        <groupId>org.apache.httpcomponents</groupId>
        <artifactId>httpclient</artifactId>
        <version>4.3.5</version>
    </dependency>
    <dependency>
        <groupId>org.apache.httpcomponents</groupId>
        <artifactId>httpmime</artifactId>
        <version>4.3.5</version>
        <scope>compile</scope>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.10</version>
        <scope>test</scope>
    </dependency>
```

### Maven plugin

```html
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>2.5.1</version>
        <configuration>
            <source>1.7</source>
            <target>1.7</target>
            <encoding>UTF-8</encoding>
        </configuration>
    </plugin>
```

### Kall av tjenesten

```html
public class TestMottakerService {
    public static String host = "https://svarut.ks.no";
    public static String mottakerid = "AAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA";
    public static String passord = "AAAAAAAAAAA^AAAAAAAA(BBBBBBBBBBBB.BBBBBBBBB";
    public static String forsendelsesId = "BBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBBB";

    @Test
    public void testMottakerServiceHentNyeForsendelser(){
        String urlHentNyeForsendelser = "/tjenester/svarinn/mottaker/hentNyeForsendelser";

        HttpGet request1 = new HttpGet(host+urlHentNyeForsendelser);
        System.out.println("Tester pendingForsendelser");
        int statusCode = MottakerService.executeHttpsRequest(request1, mottakerid, passord);

        Assert.assertEquals("Forventet statuskode 200 fikk "+statusCode, 200, statusCode);
    }

    @Test
    public void testMottakerServiceHentForsendelseFil(){
        String urlForsendelseFiler = "/tjenester/svarinn/forsendelse/"+forsendelsesId;

        HttpGet request2 = new HttpGet(host+urlForsendelseFiler);
        System.out.println("Tester getForsendelseFil");
        int statusCode = MottakerService.executeHttpsRequest(request2, mottakerid, passord);

        Assert.assertEquals("Forventet statuskode 200 fikk "+statusCode, 200, statusCode);
    }

    @Test
    public void testMottakerServiceKvitterMottak(){
        String urlKvitterMottak = "/tjenester/svarinn/kvitterMottak/forsendelse/"+forsendelsesId;

        HttpPost request3 = new HttpPost(host+urlKvitterMottak);
        System.out.println("Tester kvitterMottak");
        int statusCode = MottakerService.executeHttpsRequest(request3, mottakerid, passord);

        Assert.assertEquals("Forventet statuskode 200 fikk "+statusCode, 200, statusCode);
    }
}` 

```

### Underliggende klient

```html
public static void executeHttpsRequest(HttpRequestBase request, String mottakerid, String passord){
    DefaultHttpClient client = getDefaultClient();

    CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
    credentialsProvider.setCredentials(
    AuthScope.ANY,
    new UsernamePasswordCredentials(mottakerid, passord));
    client.setCredentialsProvider(credentialsProvider);

    try{
        HttpResponse response = client.execute(request);

        byte[] responseBody =  EntityUtils.toByteArray(response.getEntity());

        if(response.getStatusLine().getStatusCode() != HttpStatus.SC_OK){
            System.err.println("HTTP kallet feilet med kode: " + response.getStatusLine());
        } else {
            System.out.println("HTTP kallet suksess med kode: " + response.getStatusLine());
            System.out.println("Respons har data av type "+response.getEntity().getContentType());
        }

        System.out.println("Respons meldingen er:");
        System.out.println(new String(responseBody));
        System.out.println();

    } catch (ClientProtocolException e) {
        System.err.println("Fatal protocol violation: " + e.getMessage());
        e.printStackTrace();
    } catch (IOException e) {
        System.err.println("Fatal transport error: " + e.getMessage());
        e.printStackTrace();
    } finally {
        request.releaseConnection();
    }
}` 
```
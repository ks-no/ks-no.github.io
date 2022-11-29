export default {
  github: 'https://github.com/ks-no/ks-no.github.io',
  docsRepositoryBase: 'https://github.com/ks-no/ks-no.github.io/blob/master',
  titleSuffix: ' – KS Digitale Fellestjenester Teknisk Dokumentasjon',
  logo: (
    <>
      <img
        src="https://static.fiks.ks.no/img/ks-logo-quad.svg"
        alt="KS"
        style={{
          width: '40px',
          height: 'auto',
          borderRadius: '999px',
          marginRight: '0.5em',
        }}
      />
      <span className="text-gray-600 font-normal hidden md:inline">
        Teknisk dokumentasjon for Fiks-platformen
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta
        name="description"
        content="Teknisk dokumentasjon for Fiks platformen"
      />
      <meta
        name="og:description"
        content="Teknisk dokumentasjon for Fiks platformen"
      />
      <link href="https://static.fiks.ks.no" rel="preconnect" crossOrigin="" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://static.fiks.ks.no/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://static.fiks.ks.no/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://static.fiks.ks.no/favicons/favicon-16x16.png"
      />
      <link
        rel="shortcut icon"
        href="https://static.fiks.ks.no/favicons/favicon.ico"
      />
    </>
  ),
  search: {
    placeholder: 'foo',
  },
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: 'Endre denne siden på Github',
  footerText: <>{new Date().getFullYear()} &copy; KS Digitale Fellestjenester.</>,
  unstable_faviconGlyph: '👋',
}

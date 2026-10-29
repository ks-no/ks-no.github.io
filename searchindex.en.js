var relearn_searchindex = [
  {
    "breadcrumb": "KS Fiks documentation",
    "content": "The menu on the left lists the services available on the Fiks platform. Only some services have English documentation. The rest of the documentation is in Norwegian.",
    "description": "The menu on the left lists the services available on the Fiks platform. Only some services have English documentation. The rest of the documentation is in Norwegian.",
    "tags": [],
    "title": "Services",
    "uri": "/en/tjenester/index.html"
  },
  {
    "breadcrumb": "KS Fiks documentation \u003e Common",
    "content": "For any questions about the Fiks services, you can contact us through the following channels:\nContact channels Email: fiks@ksdigital.no Slack: #fiks-support - See below for how to get access GitHub If you find a bug or have a suggestion for improvement:\nGitHub Issues: Many of KS’s services and clients are open source. See github.com/ks-no for relevant projects Getting access to Slack channels If you are integrating against the Fiks platform and want faster dialogue with the developers, we recommend our Slack channels:\nSend an email to fiks@ksdigital.no Provide the email addresses of the people who need access We will invite you to the relevant Slack channels",
    "description": "For any questions about the Fiks services, you can contact us through the following channels:\nContact channels Email: fiks@ksdigital.no Slack: #fiks-support - See below for how to get access GitHub If you find a bug or have a suggestion for improvement:\nGitHub Issues: Many of KS’s services and clients are open source. See github.com/ks-no for relevant projects Getting access to Slack channels If you are integrating against the Fiks platform and want faster dialogue with the developers, we recommend our Slack channels:",
    "tags": [],
    "title": "Get help and support",
    "uri": "/en/felles/support/index.html"
  },
  {
    "breadcrumb": "KS Fiks documentation \u003e Services",
    "content": "Short description Reporting of visitor levy (besøksbidrag) for accommodation providers and intermediaries.\nKS Besøksbidrag is a national service that helps Norwegian municipalities administer the visitor levy introduced through the Besøksbidragsloven. This page is for accommodation providers, booking platforms and other intermediaries, and for vendors building systems for them. It explains how to find out which municipalities and periods have a visitor levy, and how to report turnover.\nThe service offers:\nAn open municipality register (Register API) of municipalities with visitor levy, and the periods in which it applies Reporting of accommodation turnover through an Altinn form (coming) Reporting through an API for automated submission from your own systems (coming) Status: Currently only the Register API is available. The API may change until 1 December. The reporting schema will be published through Altinn later, and this page will be updated when it is ready.\nWho is this for? Accommodation providers: hotels, campsites, cabin operators and private hosts who must report turnover subject to visitor levy and want to use the APIs. Intermediaries: booking platforms and others who report on behalf of accommodation providers who want to use the APIs. System vendors: vendors of booking, PMS and accounting systems that will support automated reporting via the APIs. Available interfaces Interface Status Details Register API ✅ Available. May change until 1 December Swagger / OpenAPI Reporting via Altinn (form) 🚧 Coming Schema will be published through Altinn Reporting via API 🚧 Coming Not published Getting started Use the Register API to find out which municipalities have visitor levy, and which periods apply. You can call it directly. Reporting: the form and any reporting API are not yet published. See API reference for status. The Register API is open. It requires no authentication, integration or activation.\nDescription of the service Concepts and terms Term Description Visitor levy (besøksbidrag) A levy municipalities may collect for overnight stays, based on the Besøksbidragsloven Period Time span (start and end date, both inclusive) in which the municipality collects the levy. May cross new year Regulation effective date The date the municipality’s visitor levy regulation (forskrift) takes effect. May differ from the periods in which the levy is actually collected Turnover Accommodation turnover you report, and from which the municipality calculates the levy Intermediary Booking platforms and others who report on behalf of accommodation providers Overall flow Look up in the Register API which municipalities have visitor levy, and in which periods. Report turnover for stays in covered municipalities and periods, manually through Altinn or automatically through the API (coming). KS Besøksbidrag validates the data and calculates the invoice basis for the municipality. The municipality invoices and follows up in its own finance system. Service-specific rules The register contains municipalities with at least one configured period. Recurring periods are shown for the current calendar year and the following nine years. The response is cached and may be up to 10 minutes old. Do not poll more often than necessary. regulationEffectiveDate may be null if the value has not been set by the municipality. Reporting rules (what to report, deadlines and format) will be published on Min kommune when ready. API reference Register API API spec for KS Besøksbidrag Register\nBase URL per environment:\nTest: https://api.test.fiks.ks.no/besoksbidrag-register/api/v1 Production: https://api.fiks.ks.no/besoksbidrag-register/api/v1 Example:\ncurl https://api.fiks.ks.no/besoksbidrag-register/api/v1/municipalities { \"municipalities\": [ { \"organizationNumber\": \"958935420\", \"municipalityNumber\": \"0301\", \"municipalityName\": \"Oslo kommune\", \"regulationEffectiveDate\": \"2026-07-01\", \"periods\": [ { \"startDate\": \"2027-04-15\", \"endDate\": \"2027-09-15\" } ] } ] } Reporting API and schema Not published yet. The schema will come through Altinn, and the API specification for automated reporting will be linked here when ready.\nService-specific errors Errors are returned in the standard error format (Norwegian). The Register API may return:\nStatus Description 500 Internal error 503 Service temporarily unavailable. Try again later Versioning Version Status Deprecation date What’s new v1 ✅ Current – First version of the Register API 📞 Get help Email: fiks@ksdigital.no Support channels: See overview of all channels",
    "description": "Short description Reporting of visitor levy (besøksbidrag) for accommodation providers and intermediaries.\nKS Besøksbidrag is a national service that helps Norwegian municipalities administer the visitor levy introduced through the Besøksbidragsloven. This page is for accommodation providers, booking platforms and other intermediaries, and for vendors building systems for them. It explains how to find out which municipalities and periods have a visitor levy, and how to report turnover.",
    "tags": [],
    "title": "KS Besøksbidrag",
    "uri": "/en/tjenester/besoksbidrag/index.html"
  },
  {
    "breadcrumb": "",
    "content": "This site documents the Fiks platform. Most of the documentation is in Norwegian. Only some services have an English version.\nThe documentation is for those who administer the platform on behalf of a municipality or other organization, or who develop integrations against the APIs Fiks offers.\nAvailable in English KS Besøksbidrag (visitor levy) – the Register API, and reporting for accommodation providers (coming) Errors If you find errors or something that is not described well enough, please send an email to fiks@ksdigital.no.\nSubscribe to documentation changes To subscribe to changes in the documentation, use our RSS feed.\nSlack We recommend that all integration developers use our Slack channel for questions and comments about the Fiks platform. Send an email to fiks@ksdigital.no for an invitation.",
    "description": "This site documents the Fiks platform. Most of the documentation is in Norwegian. Only some services have an English version.\nThe documentation is for those who administer the platform on behalf of a municipality or other organization, or who develop integrations against the APIs Fiks offers.\nAvailable in English KS Besøksbidrag (visitor levy) – the Register API, and reporting for accommodation providers (coming) Errors If you find errors or something that is not described well enough, please send an email to fiks@ksdigital.no.",
    "tags": [],
    "title": "KS Fiks documentation",
    "uri": "/en/index.html"
  },
  {
    "breadcrumb": "KS Fiks documentation",
    "content": "The menu on the left contains content that is common to our services, covering configuration and setup. Only some of it is available in English.",
    "description": "Content common to all services",
    "tags": [],
    "title": "Common",
    "uri": "/en/felles/index.html"
  },
  {
    "breadcrumb": "KS Fiks documentation",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Categories",
    "uri": "/en/categories/index.html"
  },
  {
    "breadcrumb": "KS Fiks documentation",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tags",
    "uri": "/en/tags/index.html"
  }
]

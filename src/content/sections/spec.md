---
enable: true
title: "MySignals"

subtitle: "Editor's Draft: 25 December 2025"

versions:
  thisVersion: "[https://mysignals.org/spec/](https://mysignals.org/spec/)"
  latestVersion: "[https://mysignals.org/spec/](https://mysignals.org/spec/)"
  history: "[https://github.com/MeeFoundation/my-signals-website](https://github.com/MeeFoundation/my-signals-website)"

editors:
  - "Paul Trevithick (Mee Foundation)"

feedback: "[https://github.com/MeeFoundation/my-signals-website](https://github.com/MeeFoundation/my-signals-website) (pull requests, new issue, open issues)"

copyright: "Copyright © 2025 The Mee Foundation."

abstract: "This document defines a handshake process wherein a person and a service provider (or other person) exchange signals to negotiate the terms of their interactions. The handshake is conducted between the person's agent and the service provider’s website/app."

status:
  content: ""
  boxes:
    - type: "advisement"
      title: "Work in Progress"
      content: "This is a draft document and may be updated, replaced, or obsoleted by other documents at any time. It is inappropriate to cite this document as other than a work in progress."

sections:
  - number: "1"
    heading: "Introduction"
    level: 2
    content: "*This section is non-normative.*<p/>The internet has evolved to exhibit a power asymmetry between organizations and individuals--an asymmetry that comes at the expense of the autonomy, agency, and privacy of the individual. The power imbalance between internet technology users and service providers (businesses and governments) has been recognized for some time. It was described over a decade ago by the World Economic Forum [**WEF2014**]:"
    boxes:
      - type: "example"
        title: "World Economic Forum, 2014"
        content: "An asymmetry of power exists today between institutions and individuals—created by an imbalance in the amount of information about individuals held by, or that is accessible to, industry and governments, and the lack of knowledge and ability of the same individuals to control the use of that information."
    subsections:
      - number: "1"
        heading: "Background"
        level: 3
        content: "For the past two decades, hundreds of independent developers, and organized groups have explored different paths to restore the power imbalance we've described. A main thrust of this work is the development personal agents and other kinds of “empowerment” tools that work “on the individual's side” [**ProjectVRM**] and represent their interests.<p/> 
        An example of this is a browser that implements the Global Privacy Control [[**GPC**]](#ref-gpc). The GPC is signal from the browser communicates the person's Do Not Sell or Share request to the service provider. This signal is legally binding under the California Consumer Privacy Act, and similar state privacy laws that allow users to opt out of data sales or the use of their data for cross-context targeted advertising. The GPC signal was implemented by adding a \"Sec-GPC: 1\" field to user agent HTTP header in HTTP Request messages sent to the web server. For example:"
        code:
          language: "http"
          content: "GET /something/here HTTP/2\nHost: example.com\nSec-GPC: 1"
      - number: "2"
        heading: "Limitations of Current Approaches"
        level: 3
        content: "Implementing a handshake using custom `Sec-*` header fields has disadvantages:"
        lists:
          - type: "ul"
            items:
              - "Each field adds entropy to the HTTP header which increases the fingerprinting surface area exposed to the network, thus increasing tracking and privacy risk."
              - "It broadcasts this information to all websites on every request and thus doesn't allow the person's agent (e.g. user agent (browser)) to make decisions about how to respond to website's requests for more detailed data."
              - "The header field approach only works for websites, not apps."
              - "The GPC field transmits one scalar value (in this case a single boolean) whereas other signals contain multiple parameters and more structure and complexity."

      - number: "3"
        heading: "Purpose and Characteristics"
        level: 3
        content: "Instead of passively accepting whatever term a service provider offers, MySignals is like shaking hands with them on mutually agreed terms *before* the person interacts with the provider's site/app. During this process the parties exchange signals to negotiate the terms of an experience that works for both. The handshake is conducted between the person's agent and the service provider’s website/app. The purpose of MySignals is to provide a standardized framework for this introductory handshake process between a person's agent and a service provider's site/app. It has these characteristics:"
        lists:
          - type: "ul"
            items:
              - "Rather than the agent broadcasting the header to the webserver/app on every request, the webserver/app asks the agent for information. A discovery pattern similar to [[**ClientHints**]](#ref-clienthints) vs. a broadcast pattern similar to the `User-Agent` HTTP request header field along with each request."
              - "This discovery pattern reduces the fingerprinting surface area improving privacy characteristics and reducing network traffic."
              - "It supports structured, multi-parameter signals"
              - "It includes an optional URL parameter link to a configuration file for more granular information relevant to the signal."
              - "It is cross-platform, supporting both websites and mobile apps."

      - number: "4"
        heading: "Use Cases"
        level: 3
        content: "The MySignals framework is designed to support a range of current and anticipated handshaking/signaling needs. Use cases include:"
        lists:
          - type: "ul"
            items:
              - "**Privacy**: Provide legally binding notice to the service provider that it must respect your right that they “Do Not Sell” your personal information. MySignals provides an alternate implementation of the Global Privacy Control."
              - "**MyTerms**: Negotiate and digitally sign mutually acceptable contracts related to privacy and data sharing using IEEE 7012. [[**IEEE7012**]](#ref-ieee7012)."

              - "**AgeProtect**: Signal the need for an age-appropriate experience from the service provider, and tell them which age verification and consent management endpoints you use. [[**AgeProtect**]](#ref-ageprotect)."

              - "**Id**: Tell the service provider who you are. Give them a (self-sovereign) digital identifier."

              - "**IdP**: Tell the service provider which IdP (identity provider(s)) you use. This solves the [[**NASCAR**]](#ref-nascar) problem."

              - "**SIOPv2**: Tell the service provider that your agent supports OpenID SIOPv2 allowing their site/app to display a “Continue with wallet” button for password-less login. [[**SIOPv2**]](#ref-siopv2)."

              - "**PDN**: Give the service provider your Personal Data Network endpoint to allow you to manage the personal information the provider holds about you."

  - number: "2"
    heading: "Definitions"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will define key terms and concepts used throughout the specification."

  - number: "3"
    heading: "Handshake Framework"
    level: 2
    content: "This section describes the handshake process."
    subsections:
      - number: "1"
        heading: "Initiate MySignals framework (HTTP)"
        level: 3
        content: "The user agent MUST insert a Sec-MySignals header set to 1, for example:"
        code:
          language: "http"
          content: "GET /something/here HTTP/2\nHost: example.com\nSec-MySignals: 1"
      - number: "2"
        heading: "Acknowlege MySignals framework (HTTP)"
        level: 3
        content: "The server MUST respond with an Accept header:"
        code:
          language: "http"
          content: "HTTP/1.1 200 OK\nAccept-MySignals: type=<signalType1>; type=<signalType2>"
      - number: "3"
        heading: "Send specific signal(s) (HTTP)"
        level: 3
        content: "The user agent MUST send one or more MySignals-specific headers specifying type and configuration. For example:"
        code:
          language: "http"
          content: "GET /something/here HTTP/2\nHost: example.com\nSec-MySignals: type=OpenIDConnect; cfg="https://google.com/pcf.toml"

  - number: "4"
    heading: "MySignals Support Resource"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will define the support resource specification."

  - heading: "Legal Effects"
    level: 2
    content: "We only need to touch on this topic because legal effects flow down to specific MySignals conforming solutions."

  - heading: "Privacy Considerations"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will address privacy implications and considerations."

  - heading: "Security Considerations"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will address security implications and considerations."

  - heading: "Automation"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will address automation considerations."

  - heading: "Conformance"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will define conformance requirements."

  - number: "A"
    heading: "Implementation Considerations"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This appendix will provide implementation guidance and best practices."

  - number: "B"
    heading: "Acknowledgements"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This appendix will acknowledge contributors to this specification."

  - number: "C"
    heading: "References"
    level: 2
    subsections:
      - number: "1"
        heading: "Normative references"
        level: 3
        content: "*None yet*"

      - number: "2"
        heading: "Informative references"
        level: 3
        lists:
          - type: "dl"
            items:
              - term: "[AgeProtect]"
                id: "ref-ageprotect"
                definition: "AgeProtect paper. URL: https://ageprotect.org"
              - term: "[ClientHints]"
                id: "ref-clienthints"
                definition: "URL: https://wicg.github.io/ua-client-hints/"
              - term: "[GPC]"
                id: "ref-gpc"
                definition: "Global Privacy Control. URL: https://globalprivacycontrol.org"
              - term: "[NASCAR]"
                id: "ref-nascar"
                definition: "The \"NASCAR problem\" in authorization server selection refers to the visual clutter and user confusion when a website presents too many third-party login/identity provider (IdP) buttons (like Google, Facebook, Apple), resembling the crowded sponsorship decals on a NASCAR car. URL: https://apicrazy.com/2014/07/22/nascar-problem-in-authorisation-server-selection/"
              - term: "[IEEE7012]"
                id: "ref-ieee7012"
                definition: "IEEE P7012. URL: https://standards.ieee.org/ieee/7012/7192/"
              - term: "[SIOPv2]"
                id: "ref-siopv2"
                definition: "URL: https://openid.net/specs/openid-connect-self-issued-v2-1_0.html"
              - term: "[WEF2014]"
                id: "ref-wef2014"
                definition: "Rethinking Personal Data: Trust and Context in User-Centred Data Ecosystems, World Economic Forum. URL: https://www3.weforum.org/docs/WEF_RethinkingPersonalData_TrustandContext_Report_2014.pdf"
---

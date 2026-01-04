---
enable: true
title: "MySignals"

subtitle: "Editor's Draft: 4 January 2025"

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
        A simple example of “empowerment” tooling is a browser that implements the Global Privacy Control [[**GPC**]](#ref-gpc). The GPC is signal from the browser communicates the person's Do Not Sell or Share request to the service provider. This signal is legally binding under the California Consumer Privacy Act, and similar state privacy laws that allow users to opt out of data sales or the use of their data for cross-context targeted advertising. The GPC signal was implemented by adding a \"Sec-GPC: 1\" field to user agent HTTP header in HTTP Request messages sent to the web server. For example:"
        code:
          language: "http"
          content: "GET /something/here HTTP/2\nHost: example.com\nSec-GPC: 1"
      - number: "2"
        heading: "Limitations of Current Approaches"
        level: 3
        content: "Implementing a handshake using custom `Sec-*` header field for each type of signal has disadvantages:"
        lists:
          - type: "ul"
            items:
              - "Each signaltype adds its own type of field to the HTTP header. Doing so adds entropy to the header which increases the fingerprinting surface area exposed to the network, thereby increasing tracking and associated privacy risks."
              - "It broadcasts this information to all websites on every request and thus doesn't allow the person's agent (e.g. user agent (browser)) to make decisions about how to respond to website's requests for more detailed data."
              - "The header field approach only works for websites, not apps."
              - "The GPC field transmits one scalar value (in this case a single boolean) whereas other signals contain multiple parameters and more structure and complexity."

      - number: "3"
        heading: "Purpose and Characteristics"
        level: 3
        content: "MySignals is a handshake process between  a person's agent and a service provider website/app. It is an extensible communications framework that allows developers to define specific kinds of signals (signaltypes) that can be exchanged. It defines a common namespace for these signaltypes and a syntax for passing parameters. During this handshake each side conveys the signaltypes it supports. It has these characteristics:"
        lists:
          - type: "ul"
            items:
              - "It follows a three step process flow."
              - "In the first step the agent includes a Sec=MS=1 field in the GET request. This announces that agent supports the MySignals framework."
              - "In the second step, if the site/app supports MySignals it acknowledges this by including an Accept-MS field that includes the set of the signaltypes it supports (if any)"
              - "In the third step, the agent includes in the GET request a Sec=MS=... field that includes a subset of the set from step two that are acceptable to the agent."
              - "If not empty, this subset defines the mutually agreed set of signaltypes that both parties agree to."
              - "Steps two and three follow a discovery pattern similar to that used in  [[**ClientHints**]](#ref-clienthints)"
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
              - "**Privacy**: Provide legally binding notice to the service provider that it must respect your right that they “Do Not Sell” your personal information. MySignals provides an alternate implementation of the Global Privacy Control [[**GPC**]](#ref-gpc)."

              - "**MyTerms**: Negotiate and digitally sign mutually acceptable contracts related to privacy and data sharing using IEEE P7012. [[**IEEEP7012**]](#ref-ieeeP7012)."

              - "**AgeProtect**: Signal the need for an age-appropriate experience from the service provider, and tell them which age verification and consent management endpoints you use. [[**AgeProtect**]](#ref-ageprotect)."

              - "**Identity**: Tell the service provider who you are. Give them a (self-sovereign) digital identifier."

              - "**IdP**: Tell the service provider which IdP (identity provider(s)) you use. This solves the [[**NASCAR**]](#ref-nascar) problem."

              - "**SIOPv2**: Tell the service provider that your agent supports OpenID SIOPv2 allowing their site/app to display a “Continue with wallet” button for password-less login. [[**SIOPv2**]](#ref-siopv2)."

  - number: "2"
    heading: "Definitions"
    level: 2
    content: "To do: add definitions of signaltype, config URI, Signal Parameters Resource...."
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will define key terms and concepts used throughout the specification."

  - number: "3"
    heading: "Handshake Process"
    level: 2
    content: "This section describes the three step process when implemented over HTTP."
    subsections:
      - number: "1"
        heading: "Step 1: Initiate MySignals"
        level: 3
        content: "The user agent MUST insert a Sec-MS header set to 1, for example:"
        code:
          language: "http"
          content: "GET /something/here HTTP/2\nHost: example.com\nSec-MS: 1"
      - number: "2"
        heading: "Step 2: Acknowlege MySignals"
        level: 3
        content: "The server MUST respond with an Accept-MS header:"
        code:
          language: "http"
          content: "HTTP/1.1 200 OK\nAccept-MS: type=signaltype1; type=signaltype2; type=signaltypeN"
      - number: "3"
        heading: "Step 3: Send signal(s)"
        level: 3
        content: "The user agent MUST send one or more MySignals headers specifying signaltype and a Signal Parameters Resource (SPR) URL. For example if the signaltype is OpenIDConnect and the SPR is \"https://google.com/mysignals.toml\":"
        code:
          language: "http"
          content: "GET /something/here HTTP/2\nHost: example.com\nSec-MS type=OpenIDConnect; SPR=\"https://google.com/mysignals.toml\""

  - number: "4"
    heading: "Signaltypes"
    level: 2
    content: "In step 3 when the agent is sending a specific signaltype, an optional config URI may be included. The value of signaltype MUST be one of:"
    lists:
      - type: "ul"
        items:
          - "GPCv2 - request to opt-out of sharing/selling their data. Same semantics as the Global Privacy Control [[**GPC**]](#ref-gpc)."
          - "MyTerms - proffer privacy and data sharing terms using IEEE P7012. [[**IEEEP7012**]](#ref-ieeeP7012)."
          - "AgeProtectv1 - request an age-appropriate experiece and that their agent implements AgeProtect"
          - "IdKERI - request to the provided KERI identifier."
          - "IdP - request to use a this identity provider."
          - "SIOPv2 - request to log in using OpenID [[**SIOPv2**]](#ref-siopv2)."

  - number: "5"
    heading: "Signal Parameters Resource URL"
    level: 2
    content: "In step 3 when the agent is sending a specific signaltype, an optional Signal Parameters Resource (SPR) URL may be included. The SPR URL resolves to a Signal Parameters Resource (SPR)."

  - number: "6"
    heading: "Signal Parameters Resource (SPR)"
    level: 2
    content: "An SPR is a [[**TOML1.1**]](#ref-toml1.1) format resource that contains additional parameters to pass with a signal. It MUST include the '''title''' and '''version''' fields (see below). After these MUST follow one or more sections. The section label MUST be signaltype string (e.g. [SIOPv2]). Each section MUST contain one or more fields and values."
    lists: 
      - type: "ul"
        items:
          - "title - a string of value \"Signal Parameter Resource\"."
          - "version - a string indicating the version of the SPR format. MUST be \"1.0\"."

  - number: "8"
    heading: "Example SPF Resource"
    level: 2
    content: "title = \"Signal Parameter Resource\"<br> version = 1.0<br>[SIOPv2] image - \"https://mee.foundation/continue-with-mee-smartwallet.png\"<br>SIOPAuthorize = \"https://mee.foundation/authorize\""

  - number: "9"
    heading: "Security Considerations"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will address security implications and considerations."

  - number: "10"
    heading: "Automation"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will address automation considerations."

  - number: "11"
    heading: "Conformance"
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
        lists:
          - type: "dl"
            term: "[TOML1.1]"
            id: "ref-toml1.1"
            definition: "TOML1.1 spec. URL: https://toml.io/en/v1.1.0


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
              - term: "[IEEEP7012]"
                id: "ref-ieeeP7012"
                definition: "IEEE P7012. URL: https://standards.ieee.org/ieee/7012/7192/"
              - term: "[SIOPv2]"
                id: "ref-siopv2"
                definition: "URL: https://openid.net/specs/openid-connect-self-issued-v2-1_0.html"
              - term: "[WEF2014]"
                id: "ref-wef2014"
                definition: "Rethinking Personal Data: Trust and Context in User-Centred Data Ecosystems, World Economic Forum. URL: https://www3.weforum.org/docs/WEF_RethinkingPersonalData_TrustandContext_Report_2014.pdf"
---

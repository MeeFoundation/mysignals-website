---
enable: true
title: "MySignals"

subtitle: "Editor's Draft: 30 January 2026"

versions:
  thisVersion: "[https://mysignals.org/spec/](https://mysignals.org/spec/)"
  latestVersion: "[https://mysignals.org/spec/](https://mysignals.org/spec/)"
  history: "[https://github.com/MeeFoundation/my-signals-website](https://github.com/MeeFoundation/my-signals-website)"

editors:
  - "Paul Trevithick (Mee Foundation)"
  - "Alexey Pepeskul (Swift Invention)"

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
        Possibly the simplest example of “empowerment” tooling is a browser that implements the Global Privacy Control [[**GPC**]](#ref-gpc). The GPC is signal from the browser communicates the person's Do Not Sell or Share request to the service provider. This signal is legally binding under the California Consumer Privacy Act, and similar state privacy laws that allow users to opt out of data sales or the use of their data for cross-context targeted advertising. The GPC signal was implemented by adding a `Sec-GPC: 1` field to user agent HTTP header in HTTP Request messages sent to the web server. For example:"
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
        content: "MySignals is a handshake process between a person's agent and a service provider website/app. It is an extensible communications framework that allows developers to define specific kinds of signals (signaltypes) that can be exchanged. It defines a common namespace for these signaltypes and a syntax for passing parameters. During this handshake each side conveys the signaltypes it supports. It has these characteristics:"
        lists:
          - type: "ul"
            items:
              - "It follows a three step process flow."
              - "In the first step the agent includes a `Sec-MS: 1` field in the GET request. This announces that agent supports the MySignals framework itself."
              - "In the second step, if the site/app supports the MySignals framework it acknowledges this by including an Accept-MS field that includes the set of specific signaltypes it supports (if any)"
              - "In the third step, the agent includes in the GET request a `Sec-MS type=<signaltype>...` field that includes a subset of the set from step two that are acceptable to the agent."
              - "If not empty, this subset defines the mutually agreed set of signaltypes that both parties agree to."
              - "Steps two and three follow a discovery pattern similar to that used in [[**ClientHints**]](#ref-clienthints)"
              - "This discovery pattern reduces the fingerprinting surface area thereby improving privacy characteristics and reducing network traffic."
              - "It supports structured, multi-parameter signals"
              - "It includes an optional URL to a \"signal parameters resource\" that contains parameters relevant to a specicifc signaltype."
              - "It supports HTTP/websites. Support for mobile apps anticipated in a future version of this specification."

      - number: "4"
        heading: "Use Cases"
        level: 3
        content: "The MySignals framework is designed to support a range of current and anticipated handshaking/signaling needs. Use cases include:"
        lists:
          - type: "ul"
            items:
              - "**Privacy**: Provide legally binding notice to the service provider that it must respect your right that they “Do Not Sell” your personal information. MySignals provides an alternative mechanism to convey the Global Privacy Control [[**GPC**]](#ref-gpc) signal semantic."

              - "**MyTerms**: Negotiate and digitally sign mutually acceptable contracts related to privacy and data sharing using IEEE P7012. [[**IEEEP7012**]](#ref-ieeeP7012)."

              - "**AgeProtect**: Signal the need for an age-appropriate experience from the service provider, and tell them which age verification and consent management endpoints you use. [[**AgeProtect**]](#ref-ageprotect)."

              - "**Identity**: Tell the service provider who you are. Give them a (self-sovereign) digital identifier."

              - "**KERI-AID**: Proffer your KERI Autonomic identifier."

              - "**IdP**: Tell the service provider which IdP (identity provider(s)) you use. This solves the [[**NASCAR**]](#ref-nascar) problem."

              - "**SIOPv2**: Tell the service provider that your agent supports OpenID SIOPv2 allowing their site/app to display a “Continue with wallet” button for password-less login. [[**SIOPv2**]](#ref-siopv2)."

  - number: "2"
    heading: "Definitions"
    level: 2
    content: "A **signaltype** is string that uniquely specifies a type of signal that can be sent by a person to a service provider. Implementers of this spec MUST use signaltypes defined in section 4 below. The semantics of each signaltype are defined by an implementer--they are outside of the MySignals spec. When a signal of a given signaltype is sent other parameters MAY be sent along with it. The definition and semantics of these parameters are also out of scope of the MySignals spec. <p/> A set of one or more parameters MAY be passed along with a signal by including a reference to a ***Signal Parameters Resource (SPR)*** that contains these parameters."

  - number: "3"
    heading: "Handshake Process"
    level: 2
    content: "This section describes the three step process when implemented over HTTP."
    subsections:
      - number: "1"
        heading: "Step 1: Initiate MySignals Framework"
        level: 3
        content: "The user agent MUST insert a `Sec-MS` header field with a value of 1, for example:"
        code:
          language: "http"
          content: "GET /something/here HTTP/2\nHost: example.com\nSec-MS: 1"
      - number: "2"
        heading: "Step 2: Acknowlege MySignals"
        level: 3
        content: "The server MUST respond with an `Accept-MS` header field if it supports the MySignals framework. If it supports the MySignals frameork the `Accept-MS` field MUST specifying one or more supported signaltypes:"
        code:
          language: "http"
          content: "HTTP/1.1 200 OK\nAccept-MS: type=signaltype1; type=signaltype2; ... type=signaltypeN"
      - number: "3"
        heading: "Step 3: Send signal(s)"
        level: 3
        content: "The user agent MUST send one or more MySignals headers specifying the signaltype string value along with an optional Signal Parameters Resource (SPR) URL value. The example below shows a signaltype of \"OpenIDConnect\" and an SPR URL \"https://google.com/mysignals.json\":"
        code:
          language: "http"
          content: "GET /something/here HTTP/2\nHost: example.com\nSec-MS type=OpenIDConnect; SPR=\"https://google.com/mysignals.json\""

  - number: "4"
    heading: "Signaltypes"
    level: 2
    content: "In step 3 when the agent is sending a specific signaltype, an optional reference (URL) to a Signal Parameteres Resource MAY be included. The value of signaltype MUST be one of:"
    lists:
      - type: "ul"
        items:
          - "\"GPCv2\" - request to opt-out of sharing/selling their data. Same semantics as the Global Privacy Control [[**GPC**]](#ref-gpc)."
          - "\"MyTerms\" - proffer privacy and data sharing terms using IEEE P7012. [[**IEEEP7012**]](#ref-ieeeP7012)."
          - "\"AgeProtectv1\" - request an age-appropriate experiece and that their agent implements AgeProtect"
          - "\"IdKERI\" - proffer the person's KERI AID."
          - "\"IdP\" - request to use a this identity provider."
          - "\"SIOPv2\" - request to log in using OpenID [[**SIOPv2**]](#ref-siopv2)."
  - number: "5"
    heading: "Signal Definitions"
    level: 2
    content: "Servers must advertise an immutable definitionUri for each signal within the probe response, pointing either to an informational human-readable spec or a Schema document. Ultimately, all final signal values—which the schemas describe logically—are JSON-encoded into X-MS-${name} headers for transmission over the wire."

  - number: "6"
    heading: "Signal Parameters Resource reference"
    level: 2
    content: "In step 3 when the agent is sending a specific signaltype, an optional URL reference to a Signal Parameters Resource (SPR) MAY be included."

  - number: "7"
    heading: "Signal Parameters Resource (SPR)"
    level: 2
    content: "An SPR is a [[**JSON**]](#ref-json) format resource that contains additional parameters to pass with a signal. It MUST contain the title and version fields. The rest of the fields are determined by the specifics of the signaltype. Each signaltype has its own section of the SPR (e.g. \"[SIOPv2]\") followed by one or more signaltype-specific fields."
    lists: 
      - type: "ul"
        items:
          - "\"title\" - a string of value \"Signal Parameters Resource\"."
          - "\"version\" - a string indicating the version of the SPR resource's format. MUST be \"v1\"."
  - number: "8"
    heading: "JS SDK"
    level: 2
    content: "The MySignals JS SDK is a zero-dependency, universal JavaScript/TypeScript library designed to implement the explicit handshake flow of the MySignals privacy protocol on any web page."
    subsections:
      - number: "1"
        heading: "API Reference"
        level: 3
        content: "The API provides core methods to manage the handshake lifecycle: the `constructor` initializes the `MySignalsClient` with customizable configurations for endpoints, storage strategies, and testing environments. The `init()` method probes the server for `CRITICAL` and `ACCEPTED` signal requirements, transitioning the state from `IDLE` to `PROBED`, while `submit()` delivers the user's privacy signals to the backend, advancing the state through `SUBMITTING` to `SUBMITTED` upon success. Additionally, developers can use `getStatus()` to retrieve a comprehensive snapshot of the current handshake state, pending requirements, and errors, or call `reset()` to completely clear the session state and storage, returning the SDK to `IDLE`."
        
      - number: "2"
        heading: "Universal Compatibility & Zero Dependencies"
        level: 3
        content: "- **Formats**: Published in ESM, CommonJS, and UMD formats.\n- **Environments**: Works seamlessly within modern build tools (Vite, Webpack, Rollup) and natively in the browser via simple `<script>` tags.\n- **Size**: Tiny footprint utilizing native browser APIs like `fetch`."
        
      - number: "3"
        heading: "Robust State Machine Orchestration"
        level: 3
        content: "The entire handshake process is strictly modeled as a finite state machine, guaranteeing reliable and predictable transitions:\n`IDLE` → `PROBING` → `PROBED` → `SUBMITTING` → `SUBMITTED`\nIf a submission leaves some `CRITICAL` signals pending, the client enters `PARTIALLY_SUBMITTED` instead and loops back through `SUBMITTING` on subsequent `submit()` calls until every critical signal has been delivered, at which point it reaches terminal `SUBMITTED`. Accepted-only top-ups from `PARTIALLY_SUBMITTED` remain in that state.\nErrors elegantly transition the client into an `ERROR` state, capturing the previous state to support clean retry logic and recovery."  
      
      - number: "4"
        heading: "Smart Storage & Hydration"
        level: 3
        content: "Minimize network calls and avoid redundant user prompting. The SDK can automatically persist and revive its handshake state:\n\n- `memory`: Persists for the lifetime of the page.\n- `sessionStorage`: Persists across reloads within the same browser tab.\n- `localStorage`: Long-lived persistence including a smart 24-hour TTL for long-lived consent flows."
      
      - number: "5"
        heading: "Headless Demo Mode"
        level: 3
        content: "Integration testing and frontend prototyping are seamless with the built-in `DemoTransport`. Developers can toggle `demo: true` or pass a customized configuration to simulate network latency, expected server signal requirements, and mock responses—all without a real backend."
      
      - number: "6"
        heading: "Configurable Logging"
        level: 3
        content: "Observability is built-in. Debugging complex cross-origin handshakes is made easy using the structured logger with varying verbosity levels (`debug`, `info`, `warn`, `error`, `silent`)."
      
      - number: "7"
        heading: "Dynamic Signal Registry"
        level: 3
        content: "The SDK maintains a predefined registry of standard privacy and identity signals (e.g., `GPC`, `AgeProtect`, `SiopV2`). However, it gracefully processes any custom signal the server negotiates, classifying them into `CRITICAL` (required) or `ACCEPTED` (optional) priorities based on the protocol requirements."
      
      - number: "8"
        heading: "Cross-Origin Support"
        level: 3
        content: "By decoupling the client origin from the backend service, developers can perform the MySignals handshake securely across different domains. The SDK allows attaching credentials/cookies to cross-origin `fetch` requests seamlessly."

        number: "9"
        heading: "Per-Signal Definitions"
        level: 3
        content: "Servers should advertise a `definitionUri` for each signal — the source of truth for what that signal means and what shape its value takes. A `definitionUri` may point to either:\n\n* a JSON Schema document (validated on a server and client-side when a validator is wired), or\n* a human-readable spec page (HTML, Markdown, etc. ).\n\n**Spec rules:**\n\n* Within the `signals` map, `definitionUri` is required for each entry.\n* `definitionUri` is treated as immutable — servers publish new versions at new URLs (e.g., `/schemas/myterms/v2.json`). Clients may cache indefinitely.\n* Client-side validation is advisory by default; the server remains the authoritative validator. Set `strictValidation: true` to reject locally with `MySignalsErrorCode.SCHEMA_VIOLATION`.\n* If no validator is configured, the SDK skips fetching `definitionUri` entirely (no schema validation, no wasted bandwidth). URIs are still exposed on `SignalRequirement.definitionUri` for documentation UI.\n\n**Probe response body (optional):**"  
  
  - number: "9"
    heading: "Example Signal Parameters Resource"
    level: 2
    content: "The following example shows a SPR containing parameters for the \"SIOPv2\" signaltype. Two URL-valued parameters are \"image\" and \"SIOPAuthorized\"."
    code:
      language: "json"
      content: |
        {
          "title": "Signal Parameters Resource",
          "version": "1.0",
          "SIOPv2": {
            "image": "https://mee.foundation/continue-with-mee-smartwallet.png",
            "SIOPAuthorized": "https://mee.foundation/authorize"
          }
        }

  
  - number: "10"
    heading: "Privacy Considerations"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will address privacy implications and considerations."

  - number: "11"
    heading: "Security Considerations"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will address security implications and considerations."

  - number: "12"
    heading: "Automation"
    level: 2
    boxes:
      - type: "issue"
        title: "To be written"
        content: "This section will address automation considerations."

  - number: "13"
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
            items: 
              - term: "[JSON]" 
                id: "ref-json"
                definition: "JSON spec. URL: https://www.rfc-editor.org/rfc/rfc8259"

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

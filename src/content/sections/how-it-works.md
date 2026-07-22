---
id: how-it-works
enable: true
title: "How it works"
description: You configure your agent and tell it which signaltypes to send on your behalf.
steps:
  - title: "1 · One opening request"
    description: On its very first request the agent does two things at once - it sends a signal (a time-sensitive one can ride this first request) and asks which signaltypes the site supports. The site answers in one response - it acknowledges the signal and tells the agent which signaltypes it honors.
  - title: "2 · Send the supported signaltypes"
    description: Knowing what's honored, the agent sends those signals. The site acknowledges each - and if one can't be honored, it says so ("Houston, we have a problem").
diagram: |
  sequenceDiagram
      actor U as You
      participant A as Agent (e.g. Browser)
      participant S as Website

      U->>A: Configure signaltypes

      rect rgb(30, 41, 59)
          Note over A,S: 1 · Send a signal AND discovery
          S-->>A: Acknowledges the signal + "here are the signaltypes I honor"
      end

      rect rgb(15, 23, 42)
          Note over A,S: 2 · Send the rest of the supported signaltypes
          A->>S: signal1, signal2, signal3 …
          alt all good
              S-->>A: Acknowledges each signal
          else something's off
              S-->>A: ⚠ Houston, we have a problem
          end
      end
---

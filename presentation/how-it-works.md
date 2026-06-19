# How it works

You configure your agent and tell it which signaltypes to send on your behalf.

**Step 1 — One opening request.** On its very first request the agent does two things at once:
it sends a signal (a time-sensitive one such as GPC can ride this first request) _and_ asks
which signaltypes the site supports. The site answers in one response — it acknowledges the
signal and tells the agent which signaltypes it honors.

**Step 2 — Send the supported signaltypes.** Knowing what's honored, the agent sends those
signals. The site acknowledges each — and if one can't be honored, it says so
("Houston, we have a problem").

```mermaid
sequenceDiagram
    actor U as You
    participant A as Agent (e.g. Browser)
    participant S as Site / app

    U->>A: Configure signaltypes

    rect rgb(232, 244, 244)
        Note over A,S: 1 · Send a signal AND discovery
        S-->>A: Acknowledges the signal + "here are the signaltypes I honor"
    end

    rect rgb(243, 243, 243)
        Note over A,S: 2 · Send the rest of the supported signaltypes
        A->>S: signal1, signal2, signal3 …
        alt all good
            S-->>A: Acknowledges each signal
        else something's off
            S-->>A: ⚠ Houston, we have a problem
        end
    end
```

import React from "react";

// W3C / ReSpec-style colored callout box. Styled by src/styles/w3c-base.css
// via the `.note` / `.example` / `.issue` / `.advisement` classes.
//
// Usage inside any .mdx doc (auto-imported, no import needed):
//   <Callout type="advisement" title="Work in Progress">
//   Body written as **Markdown**.
//   </Callout>
interface CalloutProps {
  type?: "note" | "example" | "issue" | "advisement";
  title?: string;
  children?: React.ReactNode;
}

function Callout({ type = "note", title, children }: CalloutProps) {
  return (
    <div className={type}>
      {title && <span className="marker">{title}</span>}
      <div>{children}</div>
    </div>
  );
}

export default Callout;

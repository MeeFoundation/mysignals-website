import { useEffect, useId, useRef } from "react";

const MermaidDiagram = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "-");

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: "dark" });
      const { svg } = await mermaid.render(`mermaid-${id}`, chart);
      if (!cancelled && ref.current) {
        ref.current.innerHTML = svg;
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return <div ref={ref} />;
};

export default MermaidDiagram;

import React, { useRef, useEffect } from "react";
import cytoscape from "cytoscape";
import { GraphViewProps } from "./types";
import { createGraphElementsCollection } from "../../utils";

export const GraphView: React.FC<GraphViewProps> = ({ numberOfNodes }) => {
  const graphDivRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (numberOfNodes <= 0) return;

    cyRef.current = cytoscape({
      container: graphDivRef.current,
      elements: createGraphElementsCollection(numberOfNodes),
    });

    cyRef.current.layout({ name: "circle", animate: true }).run();
  }, [numberOfNodes, graphDivRef]);

  return (
    <div className="flex flex-col items-center justify-center | flex-1 | px-4 text-center">
      {numberOfNodes <= 0 ? (
        <span className="text-white/60 text-sm">
          Click on the "Generate" button to create a random graph!
        </span>
      ) : (
        <div
          id="graph"
          className="w-full"
          ref={graphDivRef}
          style={{ height: "calc(100% - 3.75rem)" }}
        />
      )}
    </div>
  );
};

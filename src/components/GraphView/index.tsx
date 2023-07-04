import React, { useRef, useEffect } from "react";
import cytoscape from "cytoscape";
import { GraphViewProps } from "./types";

export const GraphView: React.FC<GraphViewProps> = ({ numberOfNodes }) => {
  const cytoscapeReference = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!cytoscapeReference.current) {
      cytoscapeReference.current = cytoscape();
    }

    const cy = cytoscapeReference.current;

    cy.elements().remove();

    for (let i = 0; i < numberOfNodes; i++) {
      cy.add({ group: "nodes", data: { id: `n${i}` } });
    }

    cy.nodes().forEach((node) => {
      const sourceNodeId = node.id();

      cy.nodes().forEach((targetNode) => {
        const targetNodeId = targetNode.id();

        if (sourceNodeId !== targetNodeId) {
          const random = Math.random();

          if (random <= 0.5) {
            cy.add({
              group: "edges",
              data: { source: sourceNodeId, target: targetNodeId },
            });
          }
        }
      });
    });

    cy.layout({ name: "circle" }).run();
  }, [numberOfNodes]);

  return (
    <div className="flex items-center px-4 text-center | flex-1">
      <span className="text-white/60 text-sm">
        Click on the "Generate" button to create a random graph!
      </span>
    </div>
  );
};

import { ElementDefinition } from "cytoscape";

export const createGraphElementsCollection = (
  numberOfNodes: number
): ElementDefinition[] => {
  const randomFactor = 0.25 as const;

  const nodeElements: ElementDefinition[] = Array.from(
    { length: numberOfNodes },
    (_, i) => ({
      group: "nodes",
      data: { id: `${i + 1}` },
    })
  );

  const edgeElements: ElementDefinition[] = nodeElements.flatMap((sourceNode) =>
    nodeElements
      .filter((targetNode) => sourceNode.data.id !== targetNode.data.id)
      .filter(() => Math.random() <= randomFactor)
      .map((targetNode) => ({
        group: "edges",
        data: { source: sourceNode.data.id, target: targetNode.data.id },
      }))
  );

  return nodeElements.concat(edgeElements);
};

import { ElementDefinition } from "cytoscape";

export const createGraphElementsCollection = (
  numberOfNodes: number,
  complexity: number
): ElementDefinition[] => {
  const randomFactor = complexity;

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

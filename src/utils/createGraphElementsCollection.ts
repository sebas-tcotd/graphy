import { ElementDefinition } from "cytoscape";

export const createGraphElementsCollection = (
  numberOfNodes: number
): ElementDefinition[] => {
  const nodeElements: ElementDefinition[] = [];
  const edgeElements: ElementDefinition[] = [];

  for (let i = 0; i < numberOfNodes; i++) {
    nodeElements.push({ group: "nodes", data: { id: `n${i}` } });
  }

  nodeElements.forEach((node) => {
    const sourceNodeId = node.data.id;

    nodeElements.forEach((targetNode) => {
      const targetNodeId = targetNode.data.id;

      if (sourceNodeId !== targetNodeId) {
        const random = Math.random();

        if (random <= 0.25) {
          edgeElements.push({
            group: "edges",
            data: { source: sourceNodeId, target: targetNodeId },
          });
        }
      }
    });
  });

  return nodeElements.concat(edgeElements);
};

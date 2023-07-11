import { ElementDefinition } from "cytoscape";

/**
 * Creates a node collection used for the graph creation.
 * @param numberOfNodes The number of nodes the graph will have
 * @returns An array containing the information of every node created
 */
const createNodes = (numberOfNodes: number): ElementDefinition[] => {
  return Array.from({ length: numberOfNodes }, (_, i) => ({
    group: "nodes",
    data: { id: `${i}` },
  }));
};

/**
 * Creates the edges collection for the creation of the graph.
 * @param adjacencyList The adjacency list used to connect the nodes
 * @returns An array containing the information of all the edges for the graph
 */
const createEdges = (adjacencyList: number[][]) => {
  const edgesCollection: ElementDefinition[] = [];

  adjacencyList.forEach((node, nodeId) => {
    node.forEach((target) =>
      edgesCollection.push({
        group: "edges",
        data: { source: nodeId, target, id: `e${nodeId}to${target}` },
      })
    );
  });

  return edgesCollection;
};

/**
 * The legacy algorythm for the creation of the graph
 * @param numberOfNodes The number of nodes the graph will have
 * @param complexity The complexity factor for the graph. It is translated in how complex the edge's connections the graph will have
 * @returns An array containing all the nodes and edges information for the creation of the graph
 */
export const createGraphElementsCollection = (
  numberOfNodes: number,
  complexity: number
): ElementDefinition[] => {
  const adjacencyList: number[][] = [...new Array(numberOfNodes)].map(() => [
    ...new Set(
      Array.from({ length: complexity * 10 }, () =>
        Math.floor(Math.random() * numberOfNodes)
      )
    ),
  ]);

  const nodeElements: ElementDefinition[] = createNodes(numberOfNodes);
  const edgesElements: ElementDefinition[] = createEdges(adjacencyList);

  return [...nodeElements, ...edgesElements];
};

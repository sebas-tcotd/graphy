import { ElementDefinition } from "cytoscape";

/**
 * Function to create a node collection used for the graph creation.
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
 * Function to create the edges collection for the creation of the graph.
 * @param adjacencyList The adjacency list used to connect the nodes
 * @returns An array containing the information of all the edges for the graph
 */
const createEdges = (adjacencyList: number[][]): ElementDefinition[] => {
  return adjacencyList.flatMap((node, nodeId) =>
    node.map((target) => ({
      group: "edges",
      data: { source: nodeId, target, id: `e${nodeId}to${target}` },
    }))
  );
};

/**
 * Function to generate the adjacency list for the graph.
 * @param numberOfNodes The number of nodes the graph will have
 * @param complexity The complexity factor for the graph. It is translated in how complex the edge's connections the graph will have
 * @returns An adjacency list representing the graph connections.
 */
const generateAdjacencyList = (
  numberOfNodes: number,
  complexity: number
): number[][] => {
  return [...new Array(numberOfNodes)].map(() => [
    ...new Set(
      Array.from({ length: complexity * 10 }, () =>
        Math.floor(Math.random() * numberOfNodes)
      )
    ),
  ]);
};

/**
 * Function to create all the nodes and edges information for the creation of the graph.
 * @param numberOfNodes The number of nodes the graph will have
 * @param complexity The complexity factor for the graph. It is translated in how complex the edge's connections the graph will have
 * @returns An array containing all the nodes and edges information for the creation of the graph
 */
const createGraphElementsCollection = (
  numberOfNodes: number,
  complexity: number
): ElementDefinition[] => {
  const adjacencyList: number[][] = generateAdjacencyList(
    numberOfNodes,
    complexity
  );
  const nodeElements: ElementDefinition[] = createNodes(numberOfNodes);
  const edgesElements: ElementDefinition[] = createEdges(adjacencyList);

  return [...nodeElements, ...edgesElements];
};

/**
 * Function to create the elements of a graph.
 * @param numberOfNodes The number of nodes the graph will have
 * @param complexity The complexity degree for the graph
 * @returns An array containing all the nodes and edges information for the creation of the graph
 */
export const createGraph = (
  numberOfNodes: number,
  complexity: number
): ElementDefinition[] => {
  return createGraphElementsCollection(numberOfNodes, complexity);
};

import { assert, DIRECTED_SEP, UNDIRECTED_SEP } from '../../common';
import { Edge, Graph } from '../../models';
import { DijkstraResult } from './types';

type NodeDistanceMap = Map<string, number>;
type PreviousNodeMap = Map<string, string | null>;
type WeightedNeighbor = { nodeId: string; edgeWeight: number };
type AdjacencyList = Map<string, WeightedNeighbor[]>;

const INFINITE_DISTANCE = Number.POSITIVE_INFINITY;

export const findShortestPath = (
  graph: Graph,
  startNodeId: string,
  destinationNodeId: string,
): DijkstraResult => {
  // 1. Validate input parameters
  validateGraphAndNodes(graph, startNodeId, destinationNodeId);
  ensureAllEdgeWeightsAreNonNegative(graph);

  // 2. Initialize algorithm data structures
  const adjacencyList = buildAdjacencyListFromGraph(graph);
  const nodeDistances = initializeDistancesFromSource(graph, startNodeId);
  const previousNodeInPath = initializePreviousNodes(graph);
  const visitedNodes = new Set<string>();

  // Handle trivial case: source equals destination
  if (startNodeId === destinationNodeId)
    return { distance: 0, nodesVisited: 1, path: [startNodeId] };

  // 3. Execute Dijkstra's algorithm
  let totalNodesVisited = 0;
  while (visitedNodes.size < graph.nodes.size) {
    const currentNodeId = findUnvisitedNodeWithMinimumDistance(nodeDistances, visitedNodes);

    if (!currentNodeId) break;
    if (nodeDistances.get(currentNodeId)! === INFINITE_DISTANCE) break;

    visitedNodes.add(currentNodeId);
    totalNodesVisited++;

    // Early termination: reached destination
    if (currentNodeId === destinationNodeId) break;

    updateDistancesToNeighbors(currentNodeId, adjacencyList, nodeDistances, previousNodeInPath);
  }

  // 4. Build result
  const shortestDistance = nodeDistances.get(destinationNodeId) ?? INFINITE_DISTANCE;
  const shortestPath = reconstructShortestPath(previousNodeInPath, startNodeId, destinationNodeId);

  return { distance: shortestDistance, path: shortestPath, nodesVisited: totalNodesVisited };
};

function validateGraphAndNodes(graph: Graph, startNodeId: string, destinationNodeId: string) {
  assert(graph.nodes.size > 0, 'Cannot execute algorithm: graph contains no nodes.');
  assert(graph.nodes.has(startNodeId), `Start node '${startNodeId}' does not exist in the graph.`);
  assert(
    graph.nodes.has(destinationNodeId),
    `Destination node '${destinationNodeId}' does not exist in the graph.`,
  );
}

function ensureAllEdgeWeightsAreNonNegative(graph: Graph): void {
  for (const [edgeKey, edge] of graph.edges) {
    const weight = extractEdgeWeight(edge);
    assert(
      weight >= 0,
      `Dijkstra's algorithm requires non-negative weights. Found negative weight in edge: ${edgeKey}`,
    );
  }
}

function buildAdjacencyListFromGraph(graph: Graph): AdjacencyList {
  const adjacencyList: AdjacencyList = new Map(
    Array.from(graph.nodes.keys()).map((nodeId) => [nodeId, []]),
  );

  for (const [edgeKey, edge] of graph.edges) {
    const [sourceNodeId, targetNodeId] = parseEdgeKey(edgeKey, graph.directed);
    const weight = extractEdgeWeight(edge);

    adjacencyList.get(sourceNodeId)!.push({ nodeId: targetNodeId, edgeWeight: weight });

    if (!graph.directed)
      adjacencyList.get(targetNodeId)!.push({ nodeId: sourceNodeId, edgeWeight: weight });
  }

  return adjacencyList;
}

function initializeDistancesFromSource(graph: Graph, startNodeId: string): NodeDistanceMap {
  return new Map(
    Array.from(graph.nodes.keys()).map((nodeId) => [
      nodeId,
      nodeId === startNodeId ? 0 : INFINITE_DISTANCE,
    ]),
  );
}

function initializePreviousNodes(graph: Graph): PreviousNodeMap {
  return new Map(Array.from(graph.nodes.keys()).map((nodeId) => [nodeId, null]));
}

function findUnvisitedNodeWithMinimumDistance(
  nodeDistances: NodeDistanceMap,
  visitedNodes: Set<string>,
): string | null {
  let nodeWithMinDistance: string | null = null;
  let minimumDistance = INFINITE_DISTANCE;

  for (const [nodeId, distance] of nodeDistances) {
    if (!visitedNodes.has(nodeId) && distance < minimumDistance) {
      minimumDistance = distance;
      nodeWithMinDistance = nodeId;
    }
  }

  return nodeWithMinDistance;
}

function updateDistancesToNeighbors(
  currentNodeId: string,
  adjacencyList: AdjacencyList,
  nodeDistances: NodeDistanceMap,
  previousNodesInPath: PreviousNodeMap,
): void {
  const distanceToCurrentNode = nodeDistances.get(currentNodeId)!;
  const neighbors = adjacencyList.get(currentNodeId) ?? [];

  for (const { nodeId: neighborId, edgeWeight } of neighbors) {
    const alternativeDistance = distanceToCurrentNode + edgeWeight;
    const currentDistanceToNeighbors = nodeDistances.get(neighborId) ?? INFINITE_DISTANCE;

    if (alternativeDistance < currentDistanceToNeighbors) {
      nodeDistances.set(neighborId, alternativeDistance);
      previousNodesInPath.set(neighborId, currentNodeId);
    }
  }
}

function reconstructShortestPath(
  previousNodesInPath: PreviousNodeMap,
  startNodeId: string,
  destinationNodeId: string,
): string[] {
  const pathNodes: string[] = [];
  let currentNode: string | null | undefined = destinationNodeId;

  // Retrocede desde el destino; si no hay ruta, devuelve []
  while (currentNode) {
    pathNodes.push(currentNode);

    if (currentNode === startNodeId) break;

    currentNode = previousNodesInPath.get(currentNode);
  }

  const isValidPath = pathNodes[pathNodes.length - 1] === startNodeId;
  return isValidPath ? pathNodes.reverse() : [];
}

function extractEdgeWeight(edge: Edge): number {
  return edge.weight;
}

function parseEdgeKey(edgeKey: string, isDirectedGraph: boolean): [string, string] {
  const separator = isDirectedGraph ? DIRECTED_SEP : UNDIRECTED_SEP;
  return edgeKey.split(separator) as [string, string];
}

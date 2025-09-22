import { DijkstraResult, Edge, Graph, Node } from "@graphy/graph-core";

export type SerializedGraphData = {
  isDirectedGraph: boolean;
  serializedNodes: [string, Node][];
  serializedEdges: [string, Edge][];
  startNodeId: string;
  destinationNodeId: string;
};

type ShortestPathWorkerGateway = (
  serializedGraphData: SerializedGraphData
) => Promise<DijkstraResult>;

export const createShortestPathUseCase = (
  shortestPathWorkerGateway: ShortestPathWorkerGateway
) => {
  return (
    graph: Graph,
    startNodeId: string,
    destinationNodeId: string
  ): Promise<DijkstraResult> => {
    // 1. Transform graph object into serializable format for worker
    const serializedGraphData: SerializedGraphData = {
      isDirectedGraph: graph.directed,
      startNodeId,
      destinationNodeId,
      serializedNodes: Array.from(graph.nodes.entries()),
      serializedEdges: Array.from(graph.edges.entries()),
    };

    // 2. Execute algorithm via infrastructure dependency (worker)
    return shortestPathWorkerGateway(serializedGraphData);
  };
};

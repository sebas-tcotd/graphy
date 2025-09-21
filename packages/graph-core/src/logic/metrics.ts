import { assert } from '../common';
import { Graph } from '../models';

export const getVertexCount = (graph: Graph): number => graph.nodes.size;
export const getEdgesCount = (graph: Graph): number => graph.edges.size;

export const getNodesCount = getVertexCount;

export const getGraphDensity = (graph: Graph): number => {
  const numberOfEdges = getEdgesCount(graph);
  const maximumNumberOfEdgesPossible = getMaximumNumberEdgePossible(graph);

  return numberOfEdges / maximumNumberOfEdgesPossible;
};

function getMaximumNumberEdgePossible(graph: Graph): number {
  const numberOfVertex = getVertexCount(graph);

  assert(
    numberOfVertex > 1,
    `Cannot get maximum number of edges possible if number of vertex is less than 1.`,
  );

  const numberOfEdgesInDirectedGraph = numberOfVertex * (numberOfVertex - 1);

  return graph.directed ? numberOfEdgesInDirectedGraph : numberOfEdgesInDirectedGraph / 2;
}

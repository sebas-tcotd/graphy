import { assert } from '../common';
import { EdgeMap, Graph } from '../models';

export const removeEdge = (graph: Graph, edgeId: string): Graph => {
  validateInputs(graph, edgeId);

  const newEdges: EdgeMap = new Map(graph.edges);
  newEdges.delete(edgeId);

  return { ...graph, edges: newEdges };
};

function validateInputs(graph: Graph, edgeId: string): void {
  assert(graph.edges.size > 0, 'Cannot remove edge: graph contains no edges.');
  assert(edgeId.trim() !== '', 'Edge must be a value.');
  assert(graph.edges.has(edgeId), `Edge ${edgeId} does not exist in the graph.`);
}

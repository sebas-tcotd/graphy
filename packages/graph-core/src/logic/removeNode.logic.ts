import { assert } from '../common';
import { Edge, EdgeMap, Graph } from '../models';

const isIncident = (edge: Edge, nodeId: string): boolean =>
  edge.source === nodeId || edge.target === nodeId;

export const removeNode = (graph: Graph, nodeId: string): Graph => {
  assert(nodeId.trim() !== '', `nodeId must be an non-empty string.`);
  assert(graph.nodes.has(nodeId), `${nodeId} does not exist in the graph.`);

  const newNodes = new Map(graph.nodes);
  newNodes.delete(nodeId);

  const newEdges: EdgeMap = new Map();
  for (const [id, edge] of graph.edges) {
    if (!isIncident(edge, nodeId)) newEdges.set(id, edge);
  }

  return { ...graph, edges: newEdges, nodes: newNodes };
};

import { Graph, Node } from '../models';

export const addNode = (graph: Graph, node: Node): Graph => {
  const newNodes = new Map(graph.nodes);
  newNodes.set(node.id, node);

  return {
    ...graph,
    nodes: newNodes,
  };
};

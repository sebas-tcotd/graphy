import { assert, DIRECTED_SEP, UNDIRECTED_SEP } from '../common';
import { Edge, Graph } from '../models';

type EdgeOptions = Omit<Edge, 'id' | 'directed'>;

const edgeKey = (directed: boolean, source: string, target: string): string => {
  return directed
    ? `${source}${DIRECTED_SEP}${target}`
    : [source, target].sort().join(UNDIRECTED_SEP);
};

export const addEdge = (graph: Graph, edge: EdgeOptions): Graph => {
  const { source, target, weight, attributes } = edge;

  assert(source && target, 'Source and Target node IDs must be provided.');
  assert(graph.nodes.has(source), `Node ${source} does not exist in the graph.`);
  assert(graph.nodes.has(target), `Node ${target} does not exist in the graph.`);
  assert(source !== target, `Loops in the graph are not permitted (source === target).`);

  const id = edgeKey(graph.directed, source, target);
  assert(!graph.edges.has(id), `Edge ${id} already exists.`);

  if (graph.directed) {
    const oppositeId = edgeKey(true, target, source);
    assert(!graph.edges.has(oppositeId), `The opposite ID ${oppositeId} already exists.`);
  }

  const newEdges = new Map(graph.edges);
  newEdges.set(id, {
    id,
    directed: graph.directed,
    source,
    target,
    weight,
    attributes,
  });

  return { ...graph, edges: newEdges };
};

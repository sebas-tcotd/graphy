import { Core } from "cytoscape";
import { highlightElement } from "./highlightElement";

type getBridgesParams = {
  nodeIndex: number;
  visited: boolean[];
  disc: number[];
  low: number[];
  parents: number[];
  time: number;
  graph: Core;
};

const getBridges = ({
  nodeIndex,
  visited,
  disc,
  low,
  parents,
  time,
  graph,
}: getBridgesParams) => {
  visited[nodeIndex] = true;
  disc[nodeIndex] = low[nodeIndex] = ++time;

  const adjacentNodes = graph
    .$(`#${nodeIndex}`)
    .neighborhood("nodes")
    .map((element) => parseInt(element.id()));

  adjacentNodes.forEach((visitedIndex) => {
    if (!visited[visitedIndex]) {
      parents[visitedIndex] = nodeIndex;
      getBridges({
        nodeIndex: visitedIndex,
        visited,
        disc,
        low,
        parents,
        time,
        graph,
      });
      low[nodeIndex] = Math.min(low[nodeIndex], low[visitedIndex]);

      if (low[visitedIndex] > disc[nodeIndex]) {
        highlightElement(graph, `#e${nodeIndex}to${visitedIndex}`, "highlight");
        highlightElement(graph, `#e${visitedIndex}to${nodeIndex}`, "highlight");
      }
    } else if (visitedIndex !== parents[nodeIndex]) {
      low[nodeIndex] = Math.min(low[nodeIndex], disc[visitedIndex]);
    }
  });
};

export const findBridges = (graph: Core) => {
  const nodes = graph.nodes();
  const visited = new Array(nodes.length).fill(false);
  const disc = new Array(nodes.length);
  const low = new Array(nodes.length);
  const parents = new Array(nodes.length).fill(null);

  nodes.forEach((_, index) => {
    if (!visited[index]) {
      const time = 0;
      getBridges({
        disc,
        graph,
        low,
        parents,
        time,
        nodeIndex: index,
        visited,
      });
    }
  });
};

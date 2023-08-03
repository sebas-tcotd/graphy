import cytoscape, { Core } from "cytoscape";
import { highlightElement } from "../../highlightElement";
import { AlgorithmStrategy } from "..";



/**
 * Parameters for the getBridges function.
 */
type getBridgesParams = {
  nodeIndex: number;
  visited: boolean[];
  disc: number[];
  low: number[];
  parents: number[];
  time: number;
  graph: Core;
};

export class LegacyBridgesFinder implements AlgorithmStrategy {
  private cy: cytoscape.Core;

  constructor(cy: cytoscape.Core) {
    this.cy = cy;
  }

  /**
   * Recursive function to find bridges in a graph.
   * @param {getBridgesParams} params - The parameters for the getBridges function.
   */
  private getBridges({
    nodeIndex,
    visited,
    disc,
    low,
    parents,
    time,
    graph,
  }: getBridgesParams) {
    visited[nodeIndex] = true;
    disc[nodeIndex] = low[nodeIndex] = ++time;

    const adjacentNodes = graph
      .$(`#${nodeIndex}` ?? "#0")
      .neighborhood("nodes")
      .map((element) => parseInt(element.id()));

    adjacentNodes.forEach((visitedIndex) => {
      if (!visited[visitedIndex]) {
        parents[visitedIndex] = nodeIndex;
        this.getBridges({
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
          highlightElement(
            graph,
            `#e${nodeIndex}to${visitedIndex}`,
            "highlight"
          );
          highlightElement(
            graph,
            `#e${visitedIndex}to${nodeIndex}`,
            "highlight"
          );
        }
      } else if (visitedIndex !== parents[nodeIndex]) {
        low[nodeIndex] = Math.min(low[nodeIndex], disc[visitedIndex]);
      }
    });
  }

  /**
   * Finds bridges in a graph using the Tarjan's bridge-finding algorithm.
   * @param {cytoscape.Core} graph - The graph to find bridges in.
   * @deprecated This function contains legacy code, is no longer maintained
   * and can cause performance issues. Use with caution.
   */
  private findBridges(graph: Core) {
    const nodes = graph.nodes();
    const visited = new Array(nodes.length).fill(false);
    const disc = new Array(nodes.length);
    const low = new Array(nodes.length);
    const parents = new Array(nodes.length).fill(null);

    nodes.forEach((_, index) => {
      if (!visited[index]) {
        const time = 0;
        this.getBridges({
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
  }

  execute(): void {
    this.findBridges(this.cy);
  }
}

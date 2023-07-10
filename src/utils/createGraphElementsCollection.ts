import { ElementDefinition } from "cytoscape";

function createNodes(number_nodes: number): ElementDefinition[] {
  let nodes: ElementDefinition[] = []
  for (var i = 0; i < number_nodes; i++) {
    nodes.push({
      group: "nodes",
      data: {
        id: `${i}`,
        disc: [],
        low: []
      },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500
      }
    })
  }

  return nodes;
}

function populateIds(number_nodes: number, ids: number[]) {
  for (var i = 0; i < number_nodes; i++) {
    ids[i] = i;
  }
}

function populateEdges(adyacency_matrix: number[][], adj_list: [][], ids: [], edges: ElementDefinition[], number_nodes: number) {
  let random = ids[Math.floor(Math.random() * ids.length)]
  let current_id = random;

  for (var i = 0; i < number_nodes; i++) {
    random = ids[Math.floor(Math.random() * ids.length)]
    if (adyacency_matrix[current_id][random] == 0) {
      edges.push({
        group: "edges",
        data: {
          id: `e${current_id}to${random}`,
          source: `${current_id}`,
          target: `${random}`
        },
      })

      adyacency_matrix[current_id][random] = 1;
      adyacency_matrix[random][current_id] = 1;
      adj_list[current_id].push(random);
      adj_list[random].push(current_id);
    }
    current_id = random;
    ids.splice(ids.indexOf(random), 1);
  }
}

export const createGraphElementsCollection = (
  numberOfNodes: number,
  complexity: number
): ElementDefinition[] => {
  console.log(numberOfNodes, complexity)
  let N: number = 100000;
  let ids: [] = [];
  var adj_list: [][] = [...new Array(N)].map(_ => []);
  var adyacency_matrix: number[][] = [...new Array(parseInt(numberOfNodes.toString()))].map(_ => [...new Array(parseInt(numberOfNodes.toString()))].map(_ => 0));

  let nodeElements: ElementDefinition[] = createNodes(numberOfNodes);
  let edgeElements: ElementDefinition[] = []

  for (var i = 0; i < complexity * 10; i++) {
    populateIds(numberOfNodes, ids);
    populateEdges(adyacency_matrix, adj_list, ids, edgeElements, numberOfNodes);
  }

  return nodeElements.concat(edgeElements);
};

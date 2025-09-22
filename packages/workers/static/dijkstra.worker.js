// Este es el código que vive en el hilo secundario (el Worker).
// Asumimos que podemos importar la lógica pura del Dominio:
import { findShortestPath } from "@graphy/graph-core";

self.onmessage = (event) => {
  const {
    isDirectedGraph,
    serializedNodes,
    serializedEdges,
    startNodeId,
    destinationNodeId,
  } = event.data;

  // 1. Des-serialización (Reconstruir el Grafo Inmutable)
  const graph = {
    id: "runtime-graph", // ID de tiempo de ejecución
    directed: isDirectedGraph,
    nodes: new Map(serializedNodes), // Array de [key, value] -> Map
    edges: new Map(serializedEdges), // Array de [key, value] -> Map
  };

  // 2. Ejecutar la lógica de Dominio pura
  const result = findShortestPath(graph, startNodeId, destinationNodeId);

  // 3. Responder
  self.postMessage(result);
};

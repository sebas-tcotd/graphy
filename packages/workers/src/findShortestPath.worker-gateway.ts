import { DijkstraResult } from "@graphy/graph-core";
import { SerializedGraphData } from "@graphy/use-cases";

const WORKER_SCRIPT_URL = "/static/dijkstra.worker.js";

export const createShortestPathWorkerGateway = (
  // El input es el objeto serializado del Caso de Uso
  serializedGraphData: SerializedGraphData
): Promise<DijkstraResult> => {
  return new Promise((resolve, reject) => {
    // 1. Crear el Worker
    const worker = new Worker(WORKER_SCRIPT_URL, { type: "module" });

    // 2. Definir cómo escuchar la respuesta (tu worker.onmessage)
    worker.onmessage = (event) => {
      // 3. Cuando llega el resultado, resolvemos la Promesa y liberamos el Worker.
      resolve(event.data as DijkstraResult);
      worker.terminate();
    };

    // 4. Definir cómo escuchar errores
    worker.onerror = (error) => {
      reject(new Error(`Worker error: ${error.message}`));
      worker.terminate();
    };

    // 5. Enviar los datos serializados al Worker
    worker.postMessage(serializedGraphData);
  });
};

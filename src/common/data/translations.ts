import { TranslationItem } from "../../enums/TranslationItem";

export const translations: Record<TranslationItem, string[]> = {
  INITIAL_MESSAGE: [
    'Haz click en el botón "Generar" para crear un grafo aleatorio!',
    'Click on the "Generate" button to create a random graph!',
  ],
  GENERATE: ["Generar", "Generate"],
  OPTIONS_TITLE: ["Opciones básicas", "Basic Options"],
  NUMBER_NODES: ["Número de nodos", "Number of nodes"],
  NODES_PLACEHOLDER: ["Inserte un número de nodos", "Insert a number of nodes"],
  COMPLEXITY: ["Complejidad", "Complexity"],
  CREATE_GRAPH: ["Crear grafo", "Create graph"],
  UPDATE_GRAPH: ["Actualizar grafo", "Update graph"],
  LAYOUTS: ["Distribuciones", "Layouts"],
  CENTRIC: ["Céntrico", "Centric"],
  RANDOM: ["Aleatorio", "Random"],
  CIRCLE: ["Círculo", "Circle"],
  ALGORITHMS: ["Algoritmos", "Algorithms"],
};

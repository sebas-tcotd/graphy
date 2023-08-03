import { Core } from "cytoscape";

export const highlightElement = (
  graph: Core,
  elementId: string,
  className: string
) => {
  graph.$(elementId).addClass(className);
};

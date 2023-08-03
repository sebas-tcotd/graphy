import cytoscape from "cytoscape";
import { AlgorithmStrategy } from "..";

export class NLengthCycleFinder implements AlgorithmStrategy {
  private cy: cytoscape.Core;

  constructor(cy: cytoscape.Core) {
    this.cy = cy;
  }

  execute(): void {
    console.log(this.cy.edges().jsons());
  }
}

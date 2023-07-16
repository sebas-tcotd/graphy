import cytoscape from "cytoscape";
import { AlgorithmStrategy } from ".";
import { GraphAlgorithmTypes } from "../../enums";
import { BridgesFinder, NLengthCycleFinder } from "./concreteAlgorithms";
import { LegacyBridgesFinder } from "./concreteAlgorithms/legacyBridgesFinder";

type ConcreteAlgorithmFunction = (cyRef: cytoscape.Core) => AlgorithmStrategy;

export const graphAlgorithms: Record<
  GraphAlgorithmTypes,
  ConcreteAlgorithmFunction
> = {
  [GraphAlgorithmTypes.BRIDGES]: (cy: cytoscape.Core) => new BridgesFinder(cy),
  [GraphAlgorithmTypes.CYCLES_N_LENGTH]: (cy: cytoscape.Core) =>
    new NLengthCycleFinder(cy),
  [GraphAlgorithmTypes.LEGACY_BRIDGES]: (cy) => new LegacyBridgesFinder(cy),
};

import { GraphAlgorithmTypes } from "../../enums";
import { AlgorithmAlternativesData } from "../interfaces";

export const algorithmAlternativesData: AlgorithmAlternativesData[] = [
  {
    name: "Find bridges",
    description: "",
    type: GraphAlgorithmTypes.BRIDGES,
  },
  {
    name: "Find cycles of n length",
    description: "",
    type: GraphAlgorithmTypes.CYCLES_N_LENGTH,
  },
  {
    name: "[Legacy] Find bridges",
    description: "",
    type: GraphAlgorithmTypes.LEGACY_BRIDGES,
  },
];

import { Languages } from "../../enums";
import { LayoutTypes } from "../../enums/LayoutTypes";
import { LayoutData } from "../interfaces";
import { translations } from "./translations";

export const layoutOptionsData: (language: Languages) => LayoutData[] = (
  language: Languages
) => [
  {
    layoutName: translations.RANDOM[language],
    icon: "assets/icon-random-layout.svg",
    type: LayoutTypes.RANDOM,
  },
  {
    layoutName: translations.CENTRIC[language],
    icon: "assets/icon-concentric-layout.svg",
    type: LayoutTypes.CONCENTRIC,
  },
  {
    layoutName: "Grid",
    icon: "assets/icon-grid-layout.svg",
    type: LayoutTypes.GRID,
  },
  {
    layoutName: translations.CIRCLE[language],
    icon: "assets/icon-circle-layout.svg",
    type: LayoutTypes.CIRCULAR,
  },
  {
    layoutName: "BDS",
    icon: "assets/icon-bds-layout.svg",
    type: LayoutTypes.BDS,
  },
  {
    layoutName: "COSE",
    icon: "assets/icon-circle-layout.svg",
    type: LayoutTypes.COSE,
  },
];

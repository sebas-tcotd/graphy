import { LayoutTypes } from "../../enums/LayoutTypes";
import { LayoutData } from "../interfaces";

export const layoutOptionsData: LayoutData[] = [
  {
    layoutName: "Random",
    icon: "assets/icon-random-layout.svg",
    type: LayoutTypes.RANDOM,
  },
  {
    layoutName: "Centric",
    icon: "assets/icon-concentric-layout.svg",
    type: LayoutTypes.CONCENTRIC,
  },
  {
    layoutName: "Grid",
    icon: "assets/icon-grid-layout.svg",
    type: LayoutTypes.GRID,
  },
  {
    layoutName: "Circle",
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

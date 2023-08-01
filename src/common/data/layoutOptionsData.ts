import { Languages } from "../../enums";
import { LayoutTypes } from "../../enums/LayoutTypes";
import { LayoutData } from "../interfaces";
import { translations } from "./translations";
import { ReactComponent as RandomLayoutIcon } from "../../assets/icon-random-layout.svg";
import { ReactComponent as ConcentricLayoutIcon } from "../../assets/icon-concentric-layout.svg";
import { ReactComponent as GridLayoutIcon } from "../../assets/icon-grid-layout.svg";
import { ReactComponent as CircleLayoutIcon } from "../../assets/icon-circle-layout.svg";
import { ReactComponent as BDSLayoutIcon } from "../../assets/icon-bds-layout.svg";

export const layoutOptionsData: (language: Languages) => LayoutData[] = (
  language: Languages
) => [
  {
    layoutName: translations.RANDOM[language],
    Icon: RandomLayoutIcon,
    type: LayoutTypes.RANDOM,
  },
  {
    layoutName: translations.CENTRIC[language],
    Icon: ConcentricLayoutIcon,
    type: LayoutTypes.CONCENTRIC,
  },
  {
    layoutName: "Grid",
    Icon: GridLayoutIcon,
    type: LayoutTypes.GRID,
  },
  {
    layoutName: translations.CIRCLE[language],
    Icon: CircleLayoutIcon,
    type: LayoutTypes.CIRCULAR,
  },
  {
    layoutName: "BDS",
    Icon: BDSLayoutIcon,
    type: LayoutTypes.BDS,
  },
  {
    layoutName: "COSE",
    Icon: CircleLayoutIcon,
    type: LayoutTypes.COSE,
  },
];

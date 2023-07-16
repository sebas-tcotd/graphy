import NumbersIcon from "../../assets/numbers.svg";
import LayoutsIcon from "../../assets/layouts.svg";
import FormulaIcon from "../../assets/formula.svg";
import { Languages, ModalTypes } from "../../enums";
import { BottomBarButtonsData } from "../interfaces";
import { translations } from "./translations";

export const BottomBarButtons: (
  language: Languages
) => BottomBarButtonsData[] = (language: Languages) => [
  {
    icon: NumbersIcon,
    name: translations.NUMBER_NODES[language],
    modalData: {
      type: ModalTypes.BASIC_OPTIONS,
      title: translations.OPTIONS_TITLE[language],
      bodyProps: {
        placeholder: translations.NODES_PLACEHOLDER[language],
      },
    },
  },
  {
    icon: LayoutsIcon,
    name: translations.LAYOUTS[language],
    modalData: {
      type: ModalTypes.LAYOUTS,
      title: translations.LAYOUTS[language],
      bodyProps: {},
    },
  },
  {
    icon: FormulaIcon,
    name: translations.ALGORITHMS[language],
    modalData: {
      type: ModalTypes.ALGORITHM,
      title: translations.ALGORITHMS[language],
      bodyProps: {},
    },
  },
];

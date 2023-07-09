import NumbersIcon from "../../assets/numbers.svg";
import LayoutsIcon from "../../assets/layouts.svg";
import FormulaIcon from "../../assets/formula.svg";
import { ModalTypes } from "../../enums";
import { BottomBarButtonsData } from "../interfaces";

export const BottomBarButtons: BottomBarButtonsData[] = [
  {
    icon: NumbersIcon,
    name: "Number of nodes",
    modalData: {
      type: ModalTypes.BASIC_OPTIONS,
      title: "Basic options",
      bodyProps: {
        placeholder: "Insert a number of nodes",
      },
    },
  },
  {
    icon: LayoutsIcon,
    name: "Set layout",
    modalData: {
      type: ModalTypes.LAYOUTS,
      title: "Layouts",
      bodyProps: {},
    },
  },
  {
    icon: FormulaIcon,
    name: "Use algorythm",
    modalData: {
      type: ModalTypes.ALGORITHM,
      title: "Algorithms",
      bodyProps: {},
    },
  },
];

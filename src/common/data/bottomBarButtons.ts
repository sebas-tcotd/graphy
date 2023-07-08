import NumbersIcon from "../../assets/numbers.svg";
import LayoutsIcon from "../../assets/layouts.svg";
import FormulaIcon from "../../assets/formula.svg";
import { ModalTypes } from "../../enums";
import {
  BasicOptionsModalBody,
  LayoutOptionsModalBody,
  AlgorithmModalBody,
} from "../components";
import { BottomBarButtonsData } from "../interfaces";

export const BottomBarButtons: BottomBarButtonsData[] = [
  {
    icon: NumbersIcon,
    name: "Number of nodes",
    modalData: {
      type: ModalTypes.NUMBER_OF_NODES,
      title: "Number of nodes",
      body: BasicOptionsModalBody,
    },
  },
  {
    icon: LayoutsIcon,
    name: "Set layout",
    modalData: {
      type: ModalTypes.LAYOUTS,
      title: "Layouts",
      body: LayoutOptionsModalBody,
    },
  },
  {
    icon: FormulaIcon,
    name: "Use algorythm",
    modalData: {
      type: ModalTypes.ALGORITHM,
      title: "Algorithms",
      body: AlgorithmModalBody,
    },
  },
];

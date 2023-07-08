import { Dispatch } from "react";
import { ModalData } from "../../common/interfaces";

export interface BottomBarProps {
  onGenerate: Dispatch<React.SetStateAction<number>>;
  onButtonClick: (modalType: ModalData) => void;
}

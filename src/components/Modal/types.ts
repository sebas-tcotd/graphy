import { Dispatch } from "react";
import { ModalData } from "../../common/interfaces";

export interface ModalProps {
  modalData?: ModalData;
  modalActive: boolean;
  onModalActive: Dispatch<React.SetStateAction<boolean>>;
}

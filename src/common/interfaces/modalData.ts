import { ModalTypes } from "../../enums";
import { ModalTypeProps } from "../../utils/setModalType";

export interface ModalData {
  type: ModalTypes;
  title: string;
  bodyProps: ModalTypeProps;
}

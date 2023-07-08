import { ModalTypes } from "../../enums";

export interface ModalData {
  title: string;
  type: ModalTypes;
  body: () => React.JSX.Element;
}

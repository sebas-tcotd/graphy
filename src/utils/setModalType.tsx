import {
  AlgorithmModalBody,
  AlgorithmModalBodyProps,
  BasicOptionsModalBody,
  BasicOptionsModalBodyProps,
  LayoutOptionsModalBody,
} from "../common/components";
import { ModalTypes } from "../enums";

export type ModalTypeProps =
  | BasicOptionsModalBodyProps
  | AlgorithmModalBodyProps;

export type ModalComponent = (props: ModalTypeProps) => React.JSX.Element;

export const modalTypeActions: Record<ModalTypes, ModalComponent> = {
  [ModalTypes.BASIC_OPTIONS]: (props) => (
    <BasicOptionsModalBody {...(props as BasicOptionsModalBodyProps)} />
  ),
  [ModalTypes.LAYOUTS]: () => <LayoutOptionsModalBody />,
  [ModalTypes.ALGORITHM]: (props) => (
    <AlgorithmModalBody {...(props as AlgorithmModalBodyProps)} />
  ),
};

export const setModalBody = ({
  type,
  bodyProps,
}: {
  type: ModalTypes | undefined;
  bodyProps: ModalTypeProps;
}) => {
  return modalTypeActions[type as ModalTypes](bodyProps);
};

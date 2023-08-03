import {
  AlgorithmModalBody,
  BasicOptionsModalBody,
  BasicOptionsModalBodyProps,
  LayoutOptionsModalBody,
} from "../common/components";
import { ModalTypes } from "../enums";

export type ModalTypeProps = BasicOptionsModalBodyProps;

export type ModalComponent = (props: ModalTypeProps) => React.JSX.Element;

export const modalTypeActions: Record<ModalTypes, ModalComponent> = {
  [ModalTypes.BASIC_OPTIONS]: (props) => (
    <BasicOptionsModalBody {...(props as BasicOptionsModalBodyProps)} />
  ),
  [ModalTypes.LAYOUTS]: () => <LayoutOptionsModalBody />,
  [ModalTypes.ALGORITHM]: () => <AlgorithmModalBody />,
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

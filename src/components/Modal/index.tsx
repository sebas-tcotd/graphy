import { useEffect, useRef } from "react";
import { ModalProps } from "./types";
import CloseIcon from "../../assets/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setActiveModal } from "../../store/slices/modal";

export const Modal = ({
  modalData,
  children,
}: React.PropsWithChildren<ModalProps>) => {
  const dispatch = useDispatch();
  const { isActive } = useSelector((state: RootState) => state.modal);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    if (!isActive) return modalRef.current?.close();

    modalRef.current?.close();
    modalRef.current?.showModal();
  }, [isActive]);

  const handleCloseModal = (): void => {
    modalRef.current && dispatch(setActiveModal({ isActive: false }));
  };

  return (
    <dialog
      ref={modalRef}
      className="min-w-[75%] p-6 | backdrop:backdrop-blur-sm backdrop-blur-md bg-violet-950/50 | text-white | border border-white/40 | rounded-lg"
    >
      <header className="flex flex-row justify-between text-xl">
        <strong>{modalData?.title} </strong>
        <button type="button" title="Cerrar modal" onClick={handleCloseModal}>
          <img src={CloseIcon} alt="Ícono de cerrar" />
        </button>
      </header>
      <hr className="my-4" />
      {children}
    </dialog>
  );
};

import { useEffect, useRef } from "react";
import { ModalProps } from "./types";
import CloseIcon from "../../assets/close.svg";

export const Modal: React.FC<ModalProps> = ({
  modalData,
  modalActive,
  onModalActive,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    if (!modalActive) return modalRef.current?.close();

    modalRef.current?.close();
    modalRef.current?.showModal();
  }, [modalActive]);

  const handleCloseModal = (): void => {
    modalRef.current && onModalActive(false);
  };

  return (
    <dialog
      ref={modalRef}
      className="min-w-[75%] p-6 | backdrop:backdrop-blur-sm backdrop-blur-md bg-white/20 | text-white | border border-white/40 | rounded-lg"
    >
      <header className="flex flex-row justify-between">
        <strong>{modalData?.title} </strong>
        <button type="button" title="Cerrar modal" onClick={handleCloseModal}>
          <img src={CloseIcon} alt="Ícono de cerrar" />
        </button>
      </header>
      <hr className="my-4" />

      {modalData?.body()}
    </dialog>
  );
};

import css from "./NoteModal.module.css";
import { createPortal } from "react-dom";
import type React from "react";
import { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode;
}

const modalRoot = document.querySelector("#modal-root")!;
if (!modalRoot) {
  throw new Error(
    "Modal root element not found. Please add <div id='modal-root'></div> to index.html."
  );
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

// components/Modal/Modal.tsx

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {

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
	  window.addEventListener("keydown", handleKeyDown);

	  return () => {
	    window.removeEventListener("keydown", handleKeyDown);
	  };
	}, [onClose]);

  return createPortal(
  <div
    className={css.backdrop}
    onClick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
  >
    <div className={css.modal}>
      {children}
    </div>
  </div>,
  document.body
  )
}
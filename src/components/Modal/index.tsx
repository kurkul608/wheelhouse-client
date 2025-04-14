"use client";
import { FC, PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  elementId?: string;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
  elementId,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (typeof window === "undefined" || !isOpen) return null;

  const modalRoot = document.getElementById(elementId || "modal-root");

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-2xl shadow-xl p-6 relative modal-content">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

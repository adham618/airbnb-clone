"use client";

import * as React from "react";
import { IoMdClose } from "react-icons/io";

import Button from "@/components/Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) {
  const [showModal, setShowModal] = React.useState(isOpen);

  const handleClose = React.useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = React.useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = React.useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  React.useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");

    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-neutral-700/30">
      <div className="h-full w-full overflow-y-auto overflow-x-hidden py-6">
        <div className="relative mx-auto w-[95vw] max-w-md md:h-auto lg:w-3/6 xl:w-2/5">
          {/* CONTENT */}
          <div
            className={`h-full transition duration-300 ${
              showModal
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <div className="relative flex h-full w-full flex-col rounded-lg bg-white shadow-lg transition md:h-auto">
              {/* HEADER */}
              <div className="relative flex h-full items-center justify-center rounded-t border-b bg-white p-3 sm:p-6">
                <button
                  className="absolute bottom-0 left-4 top-0 my-auto p-1 transition hover:opacity-70 sm:left-9"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <h2 className="text-lg font-semibold">{title}</h2>
              </div>
              {/* BODY */}
              <div className="relative flex-auto p-3 sm:p-6">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-3 sm:p-6">
                <div className="flex w-full items-center gap-4">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

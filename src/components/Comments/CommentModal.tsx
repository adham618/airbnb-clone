"use client";

import React from "react";

export enum ModalSize {
  small = "small",
  medium = "medium",
  large = "large",
}

type ModalProps = {
  closeModal: () => void;
  saveFunction?: () => void;
  saveBtnText?: string;
  modalTitle: string;
  footer?: boolean;
  children: React.ReactNode;
  size?: ModalSize;
};

export default function CommentModal({
  closeModal,
  modalTitle,
  footer = true,
  size = ModalSize.small,
  saveFunction,
  children,
  saveBtnText = "Ok",
}: ModalProps) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-25" />
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div
          className={`relative mx-auto my-6 w-full ${
            size == ModalSize.large
              ? "max-w-6xl"
              : size == ModalSize.medium
              ? "max-w-3xl"
              : size == ModalSize.small
              ? "max-w-sm"
              : "max-w-sm"
          } `}
        >
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid p-5">
              <h3 className="text-3xl font-semibold">{modalTitle}</h3>
              <button className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-50 outline-none focus:outline-none">
                <span
                  className="block h-6 w-6 bg-transparent text-2xl text-black opacity-75 outline-none focus:outline-none"
                  onClick={() => closeModal()}
                >
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">{children}</div>
            {footer && (
              <div className="flex items-center justify-end rounded-b border-t border-solid border-primary/60 p-6">
                <button
                  className="rounded border-2 border-black px-6 py-2 text-sm font-bold uppercase outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={() => closeModal()}
                >
                  Close
                </button>
                <button
                  className="rounded border border-primary bg-primary px-4 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-primary-hover"
                  type="button"
                  onClick={() => {
                    saveFunction != undefined && saveFunction();
                    closeModal();
                  }}
                >
                  {saveBtnText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

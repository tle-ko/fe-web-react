import React, { useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';
import Button from './button';

const Modal = ({ isOpen, onClose, title, content, buttonText, onButtonClick }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(33,37,41,0.5)]">
      <div className="box relative max-h-[90vh] w-3/4 min-w-72 overflow-y-auto">
        <div className="mx-8 my-6 min-w-72">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-left font-cafe24 text-2xl font-bold">{title}</h2>
            <button onClick={onClose} className="close">
              <FaXmark size="1.25rem" color="#9CA3AF" />
            </button>
          </div>
          <div className="flex h-fit w-full flex-col gap-6">
            <div className="text-left font-semibold">{content}</div>
            {buttonText && (
              <div className="flex justify-center">
                <Button
                  buttonSize="formBtn"
                  colorStyle="blueWhite"
                  content={buttonText}
                  onClick={onButtonClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

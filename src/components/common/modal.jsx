import React, { useEffect } from 'react';
import { FaXmark } from "react-icons/fa6";
import Button from './button';

const Modal = ({ isOpen, onClose, title, content, buttonText, onButtonClick }) =>  {
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
    <div className="fixed inset-0 bg-[rgba(33,37,41,0.5)] z-50 flex justify-center items-center">
      <div className="box w-3/4 relative max-h-[90vh] overflow-y-auto">
        <div className="mx-[4.875rem] my-6">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-cafe24 font-bold text-left">{title}</h2>
            <button onClick={onClose} className="close">
              <FaXmark size="1.25rem" color="#9CA3AF" />
            </button>
          </div>
          <div className="flex flex-col w-full h-fit gap-6">
            <div className="font-semibold text-left">
              {content}
            </div>
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
}

export default Modal;
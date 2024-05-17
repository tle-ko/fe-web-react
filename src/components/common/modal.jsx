import React from 'react';
import close from '../../assets/images/close.svg';

const Modal = ({ isOpen, onClose, title, content, buttonText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(33,37,41,0.5)] z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg relative w-4/5 mx-auto max-w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="w-11/12 mx-auto">
          <div className="flex justify-between items-center mt-10">
            <h2 className="text-lg font-cafe24 font-bold text-left text-[28px]">{title}</h2>
            <button onClick={onClose} className="close">
              <img src={close} alt="close" className="w-6 h-5" />
            </button>
          </div>
          <div className="mt-10 w-full">
            <div className="font-pretendard font-semibold mb-6 text-left text-[20px]">
              {content}
            </div>
            <div className="flex justify-center mt-16 mb-10">
            <button onClick={onClose} className="bg-color-blue-main hover:bg-color-blue-pt text-white font-pretendard font-semibold py-1 px-4 rounded-lg h-10">
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

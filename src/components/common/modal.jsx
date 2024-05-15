import React from 'react';
import close from '../../assets/images/close.svg';

const Modal = ({ isOpen, onClose, title, content, buttonText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(33,37,41,0.5)] z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg relative w-4/5 mx-auto" style={{ width: '80%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="mx-auto" style={{ width: '85%' }}> 
          <div className="flex justify-between items-center mt-10">
            <h2 className="text-lg font-bold font-cafe24" style={{ textAlign: 'left', fontSize: '20px' }}>{title}</h2>
            <button onClick={onClose} className="ml-4">
              <img src={close} alt="close" className="w-4 h-4" />
            </button>
          </div>
          <div className="w-full mt-10">
            <div className="font-pretendard font-semibold mb-6" style={{ textAlign: 'left' }}>
              {content}
            </div>
            <div className="flex justify-center mt-16 mb-10">
              <button onClick={onClose} className="bg-color-blue-main hover:bg-color-blue-pt text-white font-pretendard font-semibold py-1 px-4 rounded-lg">
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
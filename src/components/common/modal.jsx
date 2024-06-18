import React, { useEffect } from 'react';
import close from '../../assets/images/close.svg';
import Button from './button';

//width,height 기본값 '80%'와 'auto'로 설정했는데 바꿔 사용할 수 있음.
const Modal = ({ isOpen, onClose, title, content, buttonText, onButtonClick, width = '80%', height = 'auto' }) => {
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
      <div
        className="bg-white p-5 rounded-lg shadow-lg relative overflow-y-auto"
        style={{ width: width, height: height, maxHeight: '100vh' }}
      >
        <div className="w-11/12 mx-auto">
          <div className="flex justify-between items-center mt-10">
            <h2 className="text-lg font-cafe24 font-bold text-left text-[28px]">{title}</h2>
            <button onClick={onClose} className="close">
              <img src={close} alt="close" className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-10 w-full">
            <div className="font-pretendard font-semibold mb-6 text-left text-[20px]">
              {content}
            </div>
            <div className="flex justify-center mt-16 mb-10">
              <Button 
                buttonSize="detailBtn"
                colorStyle="blueWhite"
                content={buttonText}
                onClick={onButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

// 모달 사용 예시 
//<Modal 
//  isOpen={isModalOpen} 
//  onClose={handleClose} 
//  title="제목입니다" 
//  content="내용" 
//  buttonText="버튼 안 텍스트" 
//  onButtonClick={handleButtonClick}
//  width="50%" 
//  height="60%" 
///>


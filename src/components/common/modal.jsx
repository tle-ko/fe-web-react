import React from 'react';
import close from '../../assets/images/close.svg';
import Button from './button';

const Modal = ({ isOpen, onClose, title, content, buttonText, onButtonClick }) => {
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

// 모달 사용 예시 (content prop 전달)
// const content = (
//   <div>
//     <Input title="로그인" placeholder="정보를 입력하세요." />
//   </div>
// );

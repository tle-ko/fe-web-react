import React from 'react';

const Button = ({ buttonSize, colorStyle, content, onClick }) => {
  const styles = {
    whiteBlack: "bg-gray-50 border border-gray-200 text-gray-600 text-sm hover:bg-gray-100",
    redWhite: "bg-gray-50 border border-gray-200 text-rose-500 text-sm hover:bg-gray-100",
    blueWhite: "bg-color-blue-main text-white text-sm hover:bg-color-blue-hover",
    skyBlue: "bg-color-blue-w25 text-color-blue-main hover:bg-color-blue-w50",
    grayWhite: "bg-gray-200 text-gray-50 hover:bg-gray-300",
    detailBtn: "px-4 py-2 text-sm",
    formBtn: "px-4 py-3 text-lg"
  };

  // 버튼 크기와 색상 스타일 결합
  const buttonClass = `${styles[buttonSize]} ${styles[colorStyle]} rounded-lg flex justify-center items-center font-semibold`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {content}
    </button>
  );
}

export default Button;

/**
 * usage
 * <Button 
      buttonSize="formBtn"
      colorStyle="skyBlue"
      content="로그인"
      onClick={() => console.log('Button clicked')}
    />
 */
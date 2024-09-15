import React from 'react';

const Button = ({ buttonSize, colorStyle, content, onClick, width, disabled }) => {
  const styles = {
    whiteBlack: "bg-gray-50 border border-gray-200 text-gray-600 text-sm hover:bg-gray-100 ",
    redWhite: "bg-gray-50 border border-gray-200 text-color-red-main text-sm hover:bg-color-red-main hover:text-white",
    whiteBlue: "bg-gray-50 border border-gray-200 text-color-blue-main text-sm hover:bg-color-blue-main hover:text-white",
    blueWhite: "bg-color-blue-main border border-color-blue-main text-white text-sm hover:bg-color-blue-hover",
    skyBlue: "bg-color-blue-w25 text-color-blue-main border border-color-blue-w25 text-sm hover:bg-color-blue-w50 hover:border-color-blue-w50",
    grayWhite: "bg-gray-200 text-gray-50 border border-color-gray-200 text-sm hover:bg-gray-300",
    detailBtn: "px-4 py-2 text-sm",
    formBtn: "px-4 py-3 text-lg"
  };

  // "거절 완료"와 "수락 완료" 상태에서 스타일을 고정
  let fixedStyle = "";
  if (disabled && content === "거절 완료") {
    fixedStyle = "bg-color-red-main text-white";
  } else if (disabled && content === "수락 완료") {
    fixedStyle = "bg-color-blue-main text-white";
  }

  // 버튼 크기와 색상 스타일 결합
  const buttonClass = `${styles[buttonSize]} ${fixedStyle || styles[colorStyle]} rounded-lg flex justify-center items-center font-semibold w-${width} whitespace-nowrap`;

  return (
    <button className={buttonClass} onClick={disabled ? undefined : onClick} disabled={disabled}>
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

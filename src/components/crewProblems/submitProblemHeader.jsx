import React from 'react';

export default function SubmitProblemHeader({ submitData }) {
  const AnswerTag = ({ status }) => {
    const baseClasses = "border-gray-500 font-semibold inline-flex items-center py-1 px-3 rounded-lg text-sm";
    const correctClasses = "bg-color-green-default text-white";
    const incorrectClasses = "bg-color-red-main text-white";  

    return (
      <span className={`${baseClasses} ${status ? correctClasses : incorrectClasses}`}>
        {status ? "맞았습니다" : "틀렸습니다"}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes} 제출`;
  };

  return (
    <div className="w-full h-16 bg-white top-32 left-0 fixed px-28 py-4 flex flex-row gap-4 items-center border border-gray-200">
      <div className="flex justify-center items-center">
        <AnswerTag status={submitData.is_correct} />
        <div className="font-semibold text-lg flex justify-center items-center ml-5 mr-3">
          {submitData.created_by.username}
        </div>
        <div className="font-semibold text-gray-600"> | </div>
      </div>
      <div className="text-base text-gray-600 font-medium">
        {formatDate(submitData.created_at)}
      </div>
    </div>
  );
}
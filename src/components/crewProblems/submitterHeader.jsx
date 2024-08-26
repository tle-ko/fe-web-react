// components/Header/submitterHeader.js
import React from 'react';

const Tag = ({ status }) => {
  const baseClasses = "border-gray-500 font-semibold inline-flex items-center py-1 px-3 rounded-lg text-sm";
  const correctClasses = "bg-teal-500 text-white";
  const incorrectClasses = "bg-color-red-main text-white";

  return (
    <span className={`${baseClasses} ${status === "맞았습니다" ? correctClasses : incorrectClasses}`}>
      {status}
    </span>
  );
};

const SubmitterHeader = ({ submitter }) => {
  return (
    <div className="w-screen h-16 bg-white top-32 left-0 fixed px-28 py-4 flex flex-row gap-4 items-center border border-gray-200">
      <div className="flex justify-center items-center">
      <Tag status={submitter.status} />
        <div className="font-semibold text-lg flex justify-center items-center ml-5 mr-3">
          {submitter.name}
        </div>
        <div className='font-semibold text-gray-600'> | </div>
      </div>
      <div className="text-base text-gray-600 font-medium">
        {submitter.time} {/* 시간 형식 변환 필요 시 처리 */}
      </div>

    </div>
  );
};

export default SubmitterHeader;
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProblemDetailNav({ problemData, onEditClick, onDeleteClick }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes} 등록`;
  };

  return (
    <div className="w-full px-[7.5rem] py-3 left-0 bg-white border-b border-gray-200 justify-center inline-flex">
        <div className="flex w-full justify-between items-center">
          <div className="justify-start items-center gap-1 inline-flex">
            <Link
              className="bg-gray-50 px-4 py-3 rounded justify-center items-center flex text-gray-600 text-center text-sm font-semibold hover:text-color-blue-main hover:bg-color-blue-w25"
              to={problemData.link}
            >
              문제 링크
            </Link>
            <button
              className="bg-gray-50 px-4 py-3 rounded justify-center items-center flex text-gray-600 text-center text-sm font-semibold hover:text-color-blue-main hover:bg-color-blue-w25"
              onClick={onEditClick}
            >
              수정
            </button>
            <button
              className="bg-gray-50 px-4 py-3 rounded justify-center items-center flex text-gray-600 text-center text-sm font-semibold hover:text-color-red-main hover:bg-[#FAD9DD]"
              onClick={onDeleteClick}
            >
              삭제
            </button>
          </div>
          <p className='text-right text-gray-900'>{formatDate(problemData.created_at)}</p>
        </div>
    </div>
  );
}
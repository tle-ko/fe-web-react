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
    <div className="left-0 inline-flex w-full justify-center border-b border-gray-200 bg-white px-[7.5rem] py-3">
      <div className="min-w-100 flex w-full items-center justify-between">
        <div className="inline-flex min-w-52 items-center justify-start gap-1">
          <Link
            className="flex items-center justify-center rounded bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-color-blue-w25 hover:text-color-blue-main"
            to={problemData.link}
          >
            문제 링크
          </Link>
          <button
            className="flex items-center justify-center rounded bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-color-blue-w25 hover:text-color-blue-main"
            onClick={onEditClick}
          >
            수정
          </button>
          <button
            className="flex items-center justify-center rounded bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-[#FAD9DD] hover:text-color-red-main"
            onClick={onDeleteClick}
          >
            삭제
          </button>
        </div>
        <p className="text-right text-gray-900">{formatDate(problemData.created_at)}</p>
      </div>
    </div>
  );
}

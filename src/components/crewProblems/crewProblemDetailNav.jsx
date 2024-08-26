import React from 'react';
import { Link } from 'react-router-dom';

export default function ProblemDetailNav({ problemData }) {
  
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
        </div>
      </div>
    </div>
  );
}
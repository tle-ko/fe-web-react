import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProblemDetailNav({ problemData }) {
  const { id } = useParams();
  return (
    <div className="w-full px-[7.5rem] py-3 left-0 bg-white border-b border-gray-200 justify-center inline-flex z-10">
      <div className="flex w-full justify-between items-center">
        <div className="justify-start items-center gap-1 inline-flex">
          <Link
            className="bg-gray-50 px-4 py-3 rounded justify-center items-center flex text-gray-600 text-center text-sm font-semibold hover:text-color-blue-main hover:bg-color-blue-w25"
            to={problemData.link}
          >
            문제 링크
          </Link>
          { problemData.has_submitted ? (
            <Link 
              className="bg-gray-50 px-4 py-3 rounded justify-center items-center flex text-gray-600 text-center text-sm font-semibold hover:text-color-blue-main hover:bg-color-blue-w25"
              to={`/crew/${id}/problems/${problemData.problem_id}/submit/${problemData.submission_id}`}
            >
              제출 확인
            </Link>
          ) : (
            <Link 
              className="bg-gray-50 px-4 py-3 rounded justify-center items-center flex text-gray-600 text-center text-sm font-semibold hover:text-color-blue-main hover:bg-color-blue-w25"
              to={`/crew/${id}/problems/${problemData.problem_id}/submit`}
            >
              풀이 제출 
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
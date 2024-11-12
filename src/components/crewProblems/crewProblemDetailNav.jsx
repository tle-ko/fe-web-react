import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProblemDetailNav({ problemData }) {
  const { id } = useParams();
  return (
    <div className="left-0 z-10 inline-flex w-full justify-center border-b border-gray-200 bg-white px-[7.5rem] py-3">
      <div className="flex w-full items-center justify-between">
        <div className="inline-flex items-center justify-start gap-1">
          <Link
            className="flex items-center justify-center rounded bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-color-blue-w25 hover:text-color-blue-main"
            to={problemData.link}
          >
            문제 링크
          </Link>
          {problemData.has_submitted ? (
            <Link
              className="flex items-center justify-center rounded bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-color-blue-w25 hover:text-color-blue-main"
              to={`/crew/${id}/problems/${problemData.problem_id}/submit/${problemData.submission_id}`}
            >
              제출 확인
            </Link>
          ) : (
            <Link
              className="flex items-center justify-center rounded bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-color-blue-w25 hover:text-color-blue-main"
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

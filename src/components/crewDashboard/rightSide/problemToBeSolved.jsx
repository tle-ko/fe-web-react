import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import DataLoadingSpinner from "../../common/dataLoadingSpinner";

const ProblemToBeSolved = ({ submissions, isLoading }) => {
  const { id } = useParams();

  const problems = submissions || []; 

  return (
    <div className="box flex flex-col gap-6">
      <div className="text-gray-900 text-lg font-bold font-cafe24">
        <p>내가 풀이할 문제</p>
      </div>

      {isLoading ? (
        <div className="w-full p-12">
          <div className="flex flex-col justify-center items-center">
            <DataLoadingSpinner />
          </div>
        </div>
      ) : problems.length > 0 ? (
        <div className="w-full grid grid-cols-8 lg:grid-cols-8 mid-lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 gap-5">
          {problems
            .sort((a, b) => a.order - b.order)
            .map((problem, index) => (
              <Link
                to={`/crew/${id}/problems/${problem.problem_id}`}
                key={index}
                className="col-span-1"
              >
                <div
                  className={`w-full h-full px-3 py-6 rounded-xl flex-col justify-between items-center inline-flex gap-4 cursor-pointer ${
                    problem.has_submitted
                      ? "bg-color-blue-w25 text-color-blue-main"
                      : "bg-gray-50 text-gray-600 hover:bg-color-blue-w25"
                  }`}
                >
                  <div className="text-center text-base font-extrabold cursor-pointer whitespace-wrap">
                    {problem.title}
                  </div>
                  {problem.has_submitted ? (
                    <FaCheck size="1.5rem" />
                  ) : (
                    <IoSearch className="text-gray-500" size="1.5rem" />
                  )}
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-9 text-gray-600">
          <div className="justify-start items-center gap-2 inline-flex animate-bounce">
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
          </div>
          <p>선장님이 문제를 등록하지 않았어요 😓</p>
        </div>
      )}
    </div>
  );
};

export default ProblemToBeSolved;

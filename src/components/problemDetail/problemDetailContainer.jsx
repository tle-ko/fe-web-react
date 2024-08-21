import React, { useState } from 'react';
import ProblemAnalysis from '../../components/problemMain/problemAnalysisContainer';
import ProblemAnalysisLoading from '../../components/problemMain/problemAnalysisLoading';
import { FaChevronRight } from "react-icons/fa";

export default function ProblemDetailContainer({ problemData }) {
  const [activeContainer, setActiveContainer] = useState("detail");

  const handleActiveContainer = () => {
    setActiveContainer("analysis");
  }

  return (
    <>
      {activeContainer === "detail" ? (
        <div className="flex mt-24 gap-6">
          <div className="box w-full flex-col inline-flex">
            <div className="mb-6 justify-start items-center gap-6 inline-flex">
              <div className="mb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
                <p className="text-gray-900 text-lg font-bold">시간 제한</p>
                <div className="inline-flex pb-3">
                <p className="text-gray-900 leading-relaxed select-text">{problemData.time_limit.value}</p>
                <p className="text-gray-900 leading-relaxed"> 초</p>
                </div>

              </div>
              <div className="mb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
                <p className="text-gray-900 text-lg font-bold">메모리 제한</p> 
                <div className="inline-flex pb-3">
                <p className="text-gray-900 leading-relaxed select-text">{problemData.memory_limit.value}</p>
                <p className="text-gray-900 leading-relaxed"> MB</p>
                </div>
              </div>
            </div>
            <div className="mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
              <p className="text-gray-900 text-lg font-bold">문제</p> 
              <p className="text-gray-900 leading-7 select-text whitespace-normal">{problemData.description}</p>
            </div>
            <div className="mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
              <p className="text-gray-900 text-lg font-bold">입력</p> 
              <p className="text-gray-900 leading-7 select-text whitespace-normal">{problemData.input_description}</p>
            </div>
            <div className="mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
              <p className="text-gray-900 text-lg font-bold">출력</p> 
              <p className="text-gray-900 leading-7 select-text whitespace-normal">{problemData.output_description}</p>
            </div>
          </div>
          <button className="flex flex-col gap-4 cursor-pointer group" onClick={handleActiveContainer}>
            <div className="mt-10 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full group-hover:bg-color-blue-main cursor-pointer">
              <FaChevronRight size="1.5rem" color="white" />    
            </div>
            <p className="text-center text-gray-600 text-lg font-semibold group-hover:text-color-blue-main">TLE<br/>분석<br/>리포트</p>
          </button>
        </div>
      ) : (
        problemData.analysis && problemData.analysis.length > 0 ? (
          <ProblemAnalysis setActiveContainer={setActiveContainer} analysisData={problemData.analysis} />
        ) : (
          <ProblemAnalysisLoading setActiveContainer={setActiveContainer} />
        )
      )}
    </>
  );
}
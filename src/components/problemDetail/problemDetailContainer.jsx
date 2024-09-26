import React, { useState, useEffect, useRef } from 'react';
import AnalysisContainer from '../../components/problemDetail/problemAnalysisContainer';
import AnalysisLoading from '../../components/problemDetail/problemAnalysisLoading';
import { FaChevronRight } from "react-icons/fa";

export default function ProblemDetailContainer({ problemData }) {
  const [activeContainer, setActiveContainer] = useState("detail");
  const descriptionRef = useRef(null);
  const inputDescriptionRef = useRef(null);
  const outputDescriptionRef = useRef(null);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise([descriptionRef.current, inputDescriptionRef.current, outputDescriptionRef.current]);
    }
  }, [problemData]);

  const handleActiveContainer = () => {
    setActiveContainer("analysis");
  }

  // 기본값 설정
  const timeLimit = problemData?.time_limit?.value || 'N/A';
  const memoryLimit = problemData?.memory_limit?.value || 'N/A';
  const description = problemData?.description || '설명 없음';
  const inputDescription = problemData?.input_description || '입력 설명 없음';
  const outputDescription = problemData?.output_description || '출력 설명 없음';

  return (
    <>
      {activeContainer === "detail" ? (
        <div className="flex mt-24 gap-6 min-w-100">
          <div className="box w-full flex-col inline-flex min-w-96">
            <div className="w-full mb-6 justify-start items-center gap-6 inline-flex">
              <div className="mb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
                <p className="text-gray-900 text-lg font-bold">시간 제한</p>
                <div className="inline-flex pb-3">
                  <p className="text-gray-900 leading-relaxed select-text">{timeLimit}</p>
                  <p className="text-gray-900 leading-relaxed"> 초</p>
                </div>
              </div>
              <div className="mb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
                <p className="text-gray-900 text-lg font-bold">메모리 제한</p> 
                <div className="inline-flex pb-3">
                  <p className="text-gray-900 leading-relaxed select-text">{memoryLimit}</p>
                  <p className="text-gray-900 leading-relaxed"> MB</p>
                </div>
              </div>
            </div>
            <div className="w-full mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
              <p className="text-gray-900 text-lg font-bold">문제</p> 
              <p className="longSentence" ref={descriptionRef} dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
            <div className="w-full mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
              <p className="text-gray-900 text-lg font-bold">입력</p> 
              <p className="longSentence" ref={inputDescriptionRef} dangerouslySetInnerHTML={{ __html: inputDescription }}></p>
            </div>
            <div className="w-full mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
              <p className="text-gray-900 text-lg font-bold">출력</p> 
              <p className="longSentence" ref={outputDescriptionRef} dangerouslySetInnerHTML={{ __html: outputDescription }}></p>
            </div>
          </div>
          <button className="flex flex-col h-fit items-center gap-4 cursor-pointer group hover-scale" onClick={handleActiveContainer}>
            <div className="mt-10 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full group-hover:bg-color-blue-main cursor-pointer">
              <FaChevronRight size="1.5rem" color="white" />    
            </div>
            <p className="text-center text-gray-600 text-lg font-semibold group-hover:text-color-blue-main">문제<br/>분석</p>
          </button>
        </div>
      ) : (
        problemData.analysis ? (
          <AnalysisContainer setActiveContainer={setActiveContainer} analysisData={problemData.analysis} />
        ) : (
          <AnalysisLoading setActiveContainer={setActiveContainer} />
        )
      )}
    </>
  );
}
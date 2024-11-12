import React, { useEffect, useRef, useCallback } from 'react';
import AnalysisContainer from '../../components/problemDetail/problemAnalysisContainer';
import { FaChevronRight } from 'react-icons/fa';

export default function ProblemDetailContainer({ problemData, activeContainer, setActiveContainer }) {
  const descriptionRef = useRef(null);
  const inputDescriptionRef = useRef(null);
  const outputDescriptionRef = useRef(null);
  const analysisRef = useRef(null);

  const typeset = useCallback((element) => {
    if (window.MathJax && element) {
      window.MathJax.typesetPromise([element]);
    }
  }, []);

  useEffect(() => {
    if (problemData) {
      [descriptionRef, inputDescriptionRef, outputDescriptionRef].forEach((ref) => {
        if (ref.current) {
          typeset(ref.current);
        }
      });
    }
  }, [problemData, typeset]);

  useEffect(() => {
    if (activeContainer === 'analysis' && analysisRef.current) {
      typeset(analysisRef.current);
    }
  }, [activeContainer, typeset]);

  const handleActiveContainer = useCallback(() => {
    setActiveContainer('analysis');
  }, [setActiveContainer]);

  // 기본값 설정
  const timeLimit = problemData?.time_limit?.value || 'N/A';
  const memoryLimit = problemData?.memory_limit?.value || 'N/A';
  const description = problemData?.description || '설명 없음';
  const inputDescription = problemData?.input_description || '입력 설명 없음';
  const outputDescription = problemData?.output_description || '출력 설명 없음';

  return (
    <>
      {activeContainer === 'detail' ? (
        <div className="min-w-100 mt-24 flex gap-6">
          <div className="box inline-flex w-full min-w-96 flex-col">
            <div className="mb-6 inline-flex w-full items-center justify-start gap-6">
              <div className="mb-3 inline-flex flex-col items-start justify-start gap-3 border-b border-gray-200">
                <p className="text-lg font-bold text-gray-900">시간 제한</p>
                <div className="inline-flex pb-3">
                  <p className="select-text leading-relaxed text-gray-900">{timeLimit}</p>
                  <p className="leading-relaxed text-gray-900"> 초</p>
                </div>
              </div>
              <div className="mb-3 inline-flex flex-col items-start justify-start gap-3 border-b border-gray-200">
                <p className="text-lg font-bold text-gray-900">메모리 제한</p>
                <div className="inline-flex pb-3">
                  <p className="select-text leading-relaxed text-gray-900">{memoryLimit}</p>
                  <p className="leading-relaxed text-gray-900"> MB</p>
                </div>
              </div>
            </div>
            <div className="mb-6 inline-flex w-full flex-col items-start justify-start gap-3 border-b border-gray-200 pb-3">
              <p className="text-lg font-bold text-gray-900">문제</p>
              <p
                className="longSentence"
                ref={descriptionRef}
                dangerouslySetInnerHTML={{ __html: description }}
              ></p>
            </div>
            <div className="mb-6 inline-flex w-full flex-col items-start justify-start gap-3 border-b border-gray-200 pb-3">
              <p className="text-lg font-bold text-gray-900">입력</p>
              <p
                className="longSentence"
                ref={inputDescriptionRef}
                dangerouslySetInnerHTML={{ __html: inputDescription }}
              ></p>
            </div>
            <div className="mb-6 inline-flex w-full flex-col items-start justify-start gap-3 border-b border-gray-200 pb-3">
              <p className="text-lg font-bold text-gray-900">출력</p>
              <p
                className="longSentence"
                ref={outputDescriptionRef}
                dangerouslySetInnerHTML={{ __html: outputDescription }}
              ></p>
            </div>
          </div>
          <button
            className="hover-scale group flex h-fit cursor-pointer flex-col items-center gap-4"
            onClick={handleActiveContainer}
          >
            <div className="mt-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-200 group-hover:bg-color-blue-main">
              <FaChevronRight size="1.5rem" color="white" />
            </div>
            <p className="text-center text-lg font-semibold text-gray-600 group-hover:text-color-blue-main">
              문제
              <br />
              분석
            </p>
          </button>
        </div>
      ) : (
        <AnalysisContainer
          setActiveContainer={setActiveContainer}
          analysisData={problemData.analysis}
        />
      )}
    </>
  );
}
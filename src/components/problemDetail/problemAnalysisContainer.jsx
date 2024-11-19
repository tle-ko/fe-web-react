import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaTag } from 'react-icons/fa';
import { RiBarChart2Fill } from 'react-icons/ri';
import { MdAccessTimeFilled } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import Button from '../common/button.jsx';
import DataLoadingSpinner from '../common/dataLoadingSpinner';
import AnalysisLoading from './problemAnalysisLoading.jsx';
import '../../styles/animation.css';

export default function ProblemAnalysisContainer({ analysisData, setActiveContainer }) {
  const [visibleHintCards, setVisibleHintCards] = useState([]);
  const timeComplexityRef = useRef(null);
  const hintRefs = useRef([]);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise([timeComplexityRef.current]);
    }
  }, [analysisData]);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise(hintRefs.current);
    }
  }, [visibleHintCards]);

  // 데이터 로딩 중 처리
  if (!analysisData) {
    return (
      <div className="w-full p-20">
        <div className="m-10 flex flex-col items-center justify-center">
          <DataLoadingSpinner />
        </div>
      </div>
    );
  }

  // 난이도 및 태그 관련 데이터
  const AnalysisTags = analysisData.tags;

  // 난이도 관련
  const difficultyValue = analysisData.difficulty.value;
  const difficultyText = analysisData.difficulty.name_en;

  const getDifficultyColor = (difficultyValue) => {
    switch (difficultyValue) {
      case 1:
        return '#00D7B0';
      case 2:
        return '#FFB902';
      case 3:
        return '#F56CB6';
      default:
        return '#9CA3AF';
    }
  };

  const difficultyColor = getDifficultyColor(difficultyValue);

  const getDifficultyDescription = (difficultyNumber) => {
    switch (difficultyNumber) {
      case 1:
        return '기초적인 계산적 사고와 프로그래밍 문법만 있어도 해결 가능한 수준';
      case 2:
        return '알고리즘, 해시, 동적 프로그래밍 등 고급 접근법이 필요한 문제들';
      case 3:
        return '동적 프로그래밍, 이진 탐색, 세그먼트 트리 등 특수 알고리즘이 필요한 매우 어려운 수준';
      default:
        return '분석이 진행되고 있어요!';
    }
  };

  const difficultyDescription = getDifficultyDescription(difficultyValue);

  // 시간복잡도 관련
  const timeComplexity = analysisData.time_complexity;

  // 힌트 관련
  const hints = analysisData.hints.filter((hint) => hint.trim() !== '');
  const visibleHintContent = (index, hintItems) => {
    return (
      <div className="animate-fade-in bg-white text-gray-900">
        <div className="inline-flex items-center gap-2">
          <p className="text-xl">💡</p>
          <div className="longSentence" ref={(el) => (hintRefs.current[index] = el)}>
            <ReactMarkdown
              className="h-fit"
              components={{
                p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
                ol: ({ node, ...props }) => <ol className="select-text" {...props} />,
                li: ({ node, ...props }) => <li className="select-text" {...props} />,
              }}
            >
              {hintItems}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  };

  const viewHintButton = (index) => {
    return (
      <div className="inline-flex justify-center">
        <Button
          buttonSize={'detailBtn'}
          colorStyle={'whiteBlack'}
          content={'힌트 보기'}
          onClick={() => toggleHintVisibility(index)}
        />
      </div>
    );
  };

  const toggleHintVisibility = (index) => {
    setVisibleHintCards((prev) => [...prev, index]);
  };

  return (
    <>
      <div className="mt-24 flex w-full items-start gap-10">
        <button
          className="hover-scale group flex cursor-pointer flex-col items-center gap-4"
          onClick={() => setActiveContainer('detail')}
        >
          <div className="mt-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-200 group-hover:bg-color-blue-main">
            <FaChevronLeft size="1.5rem" color="white" />
          </div>
          <p className="text-center text-lg font-semibold text-gray-600 group-hover:text-color-blue-main">
            문제
            <br />
            보기
          </p>
        </button>

        {difficultyValue === 0 ? (
          <AnalysisLoading />
        ) : (
          <div className="MainGrid1to3 w-full min-w-96">
            {/* 문제 분석 컨테이너 */}
            <div className="col-span-2 mb-6 flex flex-col items-start gap-6">
              <div className="flex w-full flex-col items-start justify-start gap-6 rounded-3xl bg-color-blue-main p-10 ">
                <div className="inline-flex items-center gap-3">
                  <p className="text-xl font-extrabold text-white">알고리즘 태그</p>
                  <FaTag size="1.25rem" color="white" />
                </div>
                <div className="inline-flex flex-wrap items-start justify-start gap-4">
                  {AnalysisTags.map((tag, index) => (
                    <div
                      key={index}
                      className="inline-flex min-w-16 items-center justify-center rounded-full bg-gray-200/25 px-4 py-3"
                    >
                      <p className="text-white">#{tag.name_ko}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="flex w-full flex-col items-start justify-start gap-3 rounded-3xl p-10"
                style={{ backgroundColor: difficultyColor }}
              >
                {/* 난이도 데이터 */}
                <div className="inline-flex items-center gap-3">
                  <p className="text-xl font-extrabold text-white">난이도</p>
                  <RiBarChart2Fill size="1.5rem" color="white" />
                </div>
                {/* 레벨 데이터 */}
                <div className="flex flex-col items-start gap-3">
                  <p className="text-xl font-bold text-white">
                    레벨 {difficultyValue} ({difficultyText})
                  </p>
                  {/* 난이도 설명 */}
                  <p className="whitespace-normal font-medium text-white">
                    {difficultyDescription}
                  </p>
                </div>
              </div>
              {/* 시간 복잡도 데이터 */}
              <div className="flex w-full flex-col items-start justify-start gap-3 rounded-3xl bg-color-blue-main p-10 ">
                <div className="inline-flex items-center gap-3">
                  <p className="text-xl font-extrabold text-white">예측 시간 복잡도</p>
                  <MdAccessTimeFilled size="1.5rem" color="white" />
                </div>
                <p className="text-lg text-white" ref={timeComplexityRef}>
                  $$O({timeComplexity})$$
                </p>
              </div>
            </div>

            {/* 문제 힌트 컨테이너 */}
            <div className="col-span-2 flex flex-col items-start gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold text-gray-900">
                  힌트가 더 필요하다면, AI가 제공해 주는 힌트😎
                </p>
                <p className="text-md text-gray-600">
                  효과적인 문제 풀이를 위해 순차적으로 제공돼요
                </p>
              </div>

              {hints.map((hintItems, index) => (
                <div className="box w-full" key={index}>
                  {visibleHintCards.includes(index)
                    ? visibleHintContent(index, hintItems)
                    : viewHintButton(index)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

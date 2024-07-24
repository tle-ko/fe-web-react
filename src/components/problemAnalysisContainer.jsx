import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaTag } from 'react-icons/fa';
import { RiBarChart2Fill } from 'react-icons/ri';
import { MdAccessTimeFilled } from 'react-icons/md';
import MathJax from './mathjax.jsx';
import ProblemAnalysisLoading from './problemAnalysisLoading.jsx';

export default function ProblemAnalysisContainer({ problemId, setActiveContainer }) {
  const { id } = useParams(); // 현재 URL에서 문제 ID 가져오기
  const [analysisData, setAnalysisData] = useState(null); // 문제 데이터를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/data/problemData.json`);
      const jsonData = await response.json();
      const problemDetail = jsonData.find(problem => problem.id === parseInt(id)); // ID에 해당하는 문제 데이터 찾기
      setAnalysisData(problemDetail?.analysis || []);
    };
    fetchData();
  }, [id]); // 의존성 배열에 id를 추가하여 id가 변경될 때마다 데이터를 다시 가져옴

  // 데이터 로딩 중 처리
  if (analysisData === null) {
    return <div>Loading...</div>;
  }

  // 데이터가 없는 경우 처리
  if (analysisData.length === 0) {
    return <ProblemAnalysisLoading />;
  }
  // 알고리즘 태그 관련
  const AnalysisTags = analysisData.flatMap(analysis => analysis.tags);

  // 난이도 관련
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 1:
        return '#00D7B0';
      case 2:
        return '#FFB902';
      case 3:
        return '#F56CB6';
      default:
        return '#6B7280'; // 기본 색상
    }
  };

  const getDifficultyDescription = (difficulty) => {
    switch (difficulty) {
      case 1:
        return '기초적인 계산적 사고와 프로그래밍 문법만 있어도 해결 가능한 수준';
      case 2:
        return '알고리즘, 해시, 동적 프로그래밍 등 고급 접근법이 필요한 문제들';
      case 3:
        return '동적 프로그래밍, 이진 탐색, 세그먼트 트리 등 특수 알고리즘이 필요한 매우 어려운 수준';
      default:
        return '';
    }
  };

  const difficulty = analysisData.length > 0 ? analysisData[0].difficulty : '';
  const difficultyColor = getDifficultyColor(difficulty);
  const difficultyDescription = getDifficultyDescription(difficulty);


  // 시간복잡도 관련
  const timeComplexity = analysisData.length > 0 ? analysisData[0].time_complexity : 'N/A';

  // 힌트 관련
  const hint = analysisData.length > 0 ? analysisData[0].hint : [];

  return (
    <div className="flex mt-24 gap-10 w-full items-start">
      <button className="flex flex-col items-center gap-4 cursor-pointer group"
        onClick={() => setActiveContainer('detail')}>
        <div className="mt-10 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full group-hover:bg-color-blue-hover cursor-pointer">
          <FaChevronLeft size="1.5rem" color="white" />
        </div>
        <p className="text-center text-gray-600 text-lg font-semibold group-hover:text-color-blue-hover">문제<br />보기</p>
      </button>

      {/* 문제 분석 컨테이너 */}
      <div className="flex flex-col items-start gap-6 w-1/3">
        <div className="w-full p-10 flex flex-col justify-start items-start gap-6 rounded-3xl bg-color-blue-main ">
          <div className="inline-flex items-center gap-3">
            <p className="text-white text-xl font-extrabold">알고리즘 태그</p>
            <FaTag size="1.25rem" color="white" />
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            {AnalysisTags.map((tag, index) => (
              <div key={index} className="min-w-16 inline-flex items-center justify-center px-4 py-3 bg-gray-200/25 rounded-full">
                <p className="text-white">#{tag.name_ko}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full p-10 flex flex-col justify-start items-start gap-3 rounded-3xl"
          style={{ backgroundColor: difficultyColor }}>
          {/* 난이도 데이터 */}
          <div className="inline-flex items-center gap-3">
            <p className="text-white text-xl font-extrabold">난이도</p>
            <RiBarChart2Fill size="1.5rem" color="white" />
          </div>
          {/* 레벨 데이터 */}
          <div className="flex flex-col items-start gap-3">
            <p className="text-white text-xl font-bold">레벨 {difficulty}</p>
            <p className="text-white font-medium">{difficultyDescription}</p> 
            {/* 난이도 설명 */}
          </div>
        </div>
        {/* 시간 복잡도 데이터 */}
        <div className="w-full p-10 flex flex-col justify-start items-start gap-6 rounded-3xl bg-color-blue-main ">
          <div className="inline-flex items-center gap-3">
            <p className="text-white text-xl font-extrabold">예측 시간 복잡도</p>
            <MdAccessTimeFilled size="1.5rem" color="white" />
          </div>
          <div className="text-white text-xl">
            <MathJax math={`$O(${timeComplexity})$`} />
          </div>
        </div>
      </div>
      
      {/* 문제 힌트 컨테이너 */}
      <div className="flex flex-col items-start gap-6 w-2/3">
        <p className="text-gray-900 text-xl font-bold">힌트가 더 필요하다면, AI가 제공해 주는 힌트😎</p>
          {hint.map((hintItem, index) => (
              <div className="box w-full flex flex-row gap-2" key={index}>
                <p className="text-xl">💡</p>
                <p className="text-gray-600 text-base font-semibold">{hintItem}</p>
              </div>
          ))}
      </div>
    </div>
  );
}
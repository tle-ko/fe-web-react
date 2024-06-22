import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ProblemHeader from "../../components/Header/problemHeader";
import ProblemDetailNav from "../../components/nav/problemDetailNav";

export default function ProblemDetail(){
  const { id } = useParams(); // 현재 URL에서 문제 ID 가져오기
  const [problemData, setProblemData] = useState(null); // 문제 데이터를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/data/problemData.json`);
      const jsonData = await response.json();
      const problemDetail = jsonData.find(problem => problem.id === parseInt(id)); // ID에 해당하는 문제 데이터 찾기
      setProblemData(problemDetail); // 찾은 데이터를 상태로 설정
    };
    fetchData();
  }, [id]); // 의존성 배열에 id를 추가하여 id가 변경될 때마다 데이터를 다시 가져옴

  // 데이터 로딩 중 처리
  if (!problemData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">  
      <ProblemHeader problemId={id} />
      <ProblemDetailNav problemId={id} />
      <div className="box w-10/12 p-10 mt-24 flex-col inline-flex">
        <div className="mb-6 justify-start items-center gap-6 inline-flex">
          <div className="w-[220px] pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
            <p className="text-gray-900 text-lg font-bold">시간 제한</p> 
            <p className="text-gray-900 leading-relaxed">{problemData.time_limit}초</p>
          </div>
          <div className="w-[220px] pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
            <p className="text-gray-900 text-lg font-bold">메모리 제한</p> 
            <p className="text-gray-900 leading-relaxed">{problemData.memory_limit}MB</p>
          </div>
        </div>
          <div className="w-full mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
            <p className="text-gray-900 text-lg font-bold">문제</p> 
            <p className="text-gray-900">{problemData.description}</p>
          </div>
          <div className="w-full mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
            <p className="text-gray-900 text-lg font-bold">입력</p> 
            <p className="text-gray-900">{problemData.input_description}</p>
          </div>
          <div className="w-full mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
            <p className="text-gray-900 text-lg font-bold">출력</p> 
            <p className="text-gray-900">{problemData.output_description}</p>
          </div>
      </div>
    </div>
  );
}

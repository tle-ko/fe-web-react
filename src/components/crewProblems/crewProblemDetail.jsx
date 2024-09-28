import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ProblemHeader from "../../components/Header/problemHeader";
import CrewProblemDetailNav from "./crewProblemDetailNav";
import ProblemDetailContainer from '../../components/problemDetail/problemDetailContainer';
import { client } from '../../utils';
import DataLoadingSpinner from '../common/dataLoadingSpinner';

export default function CrewProblemDetail() {
  const { problemId } = useParams(); // problem_id를 가져옴
  const [problemData, setProblemData] = useState(null);

  // 문제 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        const response = await client.get(`/api/v1/crew/activity/problem/${problemId}`);
        if (response.status === 200) {
          setProblemData(response.data);
        } else {
          console.error("크루 문제 데이터를 불러오지 못했어요.", response.statusText);
        }
      } catch (error) {
        console.error("크루 문제 데이터를 불러오는데 문제가 발생했어요.", error);
      }
    };

    fetchProblemDetail();
  }, [problemId]);

  if (!problemData) {
    return <div className="w-full p-20">
    <div className="flex flex-col justify-center items-center m-10">
      <DataLoadingSpinner />
    </div>
  </div>;
  }

  return (
    <>
      <div className="fixed top-16 left-0 w-full z-10">
        <ProblemHeader 
          title={problemData.title} 
        />
        <CrewProblemDetailNav
          problemData={problemData} 
        />
      </div>
      <ProblemDetailContainer 
        problemData={problemData} 
      />
    </>
  );
}

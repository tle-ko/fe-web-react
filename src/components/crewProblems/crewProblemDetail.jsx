import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ProblemHeader from "../../components/Header/problemHeader";
import CrewProblemDetailNav from "./crewProblemDetailNav";
import ProblemDetailContainer from '../../components/problemDetail/problemDetailContainer';

export default function CrewProblemDetail() {
  const { problemId } = useParams();
  const [problemData, setProblemData] = useState(null);


  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/data/problemData.json`);
        const allProblems = await response.json();
        const problem = allProblems.find(p => p.id === parseInt(problemId));

        if (problem) {
          setProblemData(problem);
        } else {
          console.error('Problem not found');
        }
      } catch (error) {
        console.error('Error fetching problem data:', error);
      }
    };

    fetchProblemDetail();
  }, [problemId]);

  if (!problemData) {
    return <div>데이터를 불러오는 중이에요!</div>;
  }

  return (
    <>
    <div className="fixed top-16 left-0 w-full">
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

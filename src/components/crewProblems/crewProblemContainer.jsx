import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SideNav from '../../components/nav/sideNav';
import Button from "../../components/common/button";
import Level1 from "../../assets/images/lv1.svg";
import Level2 from "../../assets/images/lv2.svg";
import Level3 from "../../assets/images/lv3.svg";
import Leveln from "../../assets/images/lvN.svg";

const CrewDashProblem = ({ userId }) => {
  const { id } = useParams();
  const [activityId, setActivityId] = useState(null);
  const [activities, setActivities] = useState([]);
  const [problemsData, setProblemsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchActivities = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL || 'http://localhost:3000/data/crewData.json');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const group = data.find(crew => crew.id === Number(id));

        if (!group) {
          setActivities([]);
          return;
        }

        const allActivities = group.activities.map(activity => ({
          id: activity.id,
          order: activity.order,
          label: `${activity.order}회차`,
        }));

        setActivities(allActivities);
        if (allActivities.length > 0 && !activityId) {
          setActivityId(allActivities[0].id);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        setActivities([]);
      }
    };

    fetchActivities();
  }, [id]);

  useEffect(() => {
    if (!activityId) return;

    const fetchProblems = async () => {
      try {
        const [problemResponse, crewResponse] = await Promise.all([
          fetch('http://localhost:3000/data/problemData.json'),
          fetch(process.env.REACT_APP_API_URL || 'http://localhost:3000/data/crewData.json')
        ]);

        if (!problemResponse.ok || !crewResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const rawProblemData = await problemResponse.json();
        const allData = await crewResponse.json();

        const currentCrew = allData.find(crew => crew.id === Number(id));

        if (!currentCrew) {
          setProblemsData([]);
          return;
        }

        const problems = currentCrew.activities.flatMap(activity => {
          return activity.problems.map(problem => {
            const matchingProblem = rawProblemData.find(p => p.id === problem.problem_id);
            return matchingProblem ? {
              ...problem,
              details: matchingProblem,
              activity_id: activity.id
            } : null;
          }).filter(Boolean);
        });

        const filteredProblems = problems.filter(problem => problem.activity_id === activityId);
        setProblemsData(filteredProblems);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('문제 데이터를 가져오는 중 오류가 발생했습니다.');
        setProblemsData([]);
      }
    };

    fetchProblems();
  }, [activityId, id]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${month}월 ${day}일`;
  };

  const getLastSubmissionDate = (submissions) => {
    const userSubmission = submissions.find(submission => submission.created_by === userId);
    return userSubmission ? formatDate(userSubmission.created_at) : null;
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full MainGrid1to3">
      <div className="col-span-1">
      {activities.length > 0 && (
        <SideNav
          elements={activities}
          setSelectedElement={setActivityId}
          selectedElement={activityId}
        />
      )}
      </div>
      {problemsData.length > 0 ? (
        <div className="flex col-span-3 mb-16">
          {problemsData.map((problem) => {
            const lastSubmittedDate = problem.submissions ? getLastSubmissionDate(problem.submissions) : null;
            return (
              <div key={problem.id} className="box flex-col justify-between items-start inline-flex gap-6 overflow-x-auto">
                <div className="flex justify-between items-center w-full flex-wrap whitespace-nowrap">
                  <p className='text-gray-600 text-base'>문제 {problem.id}</p>
                  <p className='text-gray-600 text-sm'>
                    {lastSubmittedDate ? <span className='text-red-600'>마지막 제출 {lastSubmittedDate}</span> : '제출 전'}
                  </p>
                </div>
                <div className="w-full containerTitle justify-start items-center gap-3 inline-flex overflow-hidden">
                  <img
                    className='w-6 h-8'
                    src={
                      problem.details && problem.details.analysis && problem.details.analysis.length > 0 ? (
                        problem.details.analysis[0].difficulty === 1 ? Level1 :
                          problem.details.analysis[0].difficulty === 2 ? Level2 :
                            problem.details.analysis[0].difficulty === 3 ? Level3 :
                              Leveln
                      ) : Leveln
                    }
                    alt="Level Icon"
                  />
                  <p className='w-full text-gray-900 text-2xl font-bold truncate'>{problem.details.title}</p>
                </div>
                <div className='justify-end flex gap-3 ml-auto'>
                  <Link to={`/crew/${id}/problems/${problem.id}`}>
                    <Button
                      buttonSize="detailBtn"
                      colorStyle="whiteBlack"
                      content="문제 상세"
                    />
                  </Link>
                  <Link to={`/crew/${id}/problems/${problem.id}/submit`}>
                    <Button
                      buttonSize="detailBtn"
                      colorStyle="skyBlue"
                      content="문제 제출"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center col-span-3 gap-3 py-6 text-gray-600 flex-1 mt-24">
          <div className="justify-start items-center gap-2 inline-flex animate-bounce">
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
          </div>
          <p>선장님이 해당 회차에 문제를 등록하지 않았어요 😓</p>
        </div>
      )}
    </div>
  );
};

export default CrewDashProblem;

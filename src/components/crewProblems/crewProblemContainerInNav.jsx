import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from "../../utils"; 
import SideNav from '../nav/sideNav';
import Button from "../common/button";
import Level1 from "../../assets/images/lv1.svg";
import Level2 from "../../assets/images/lv2.svg";
import Level3 from "../../assets/images/lv3.svg";
import Leveln from "../../assets/images/lvN.svg";
import DataLoadingSpinner from "../common/dataLoadingSpinner"; 

const CrewDashProblem = ({ userId }) => {
  const { id } = useParams();
  const [activityId, setActivityId] = useState(null);
  const [activities, setActivities] = useState([]);
  const [problemsData, setProblemsData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [isLoadingProblems, setIsLoadingProblems] = useState(true);

  useEffect(() => {
    if (!id) return;
  
    const fetchActivities = async () => {
      setIsLoadingActivities(true);
      try {
        const response = await client.get(`/api/v1/crew/${id}`);
  
        if (response.status === 200) {
          const group = response.data; 
  
          if (!group || !group.activities) {
            console.error("크루의 활동 데이터를 찾을 수 없습니다.");
            setActivities([]);
            return;
          }
  
          const allActivities = group.activities.map(activity => ({
            id: activity.activity_id,
            name: activity.name,
            label: `${activity.name}`,
          }));
  
          setActivities(allActivities);
          if (allActivities.length > 0 && !activityId) {
            setActivityId(allActivities[0].id); // 첫 번째 활동 ID 설정
          }
        } else {
          console.error("크루 데이터를 불러오지 못했어요.", response.statusText);
        }
      } catch (error) {
        console.error("크루 데이터를 불러오는데 문제가 발생했어요.", error);
        setError('데이터를 가져오는 중 오류가 발생했어요.');
        setActivities([]);
      } finally {
        setIsLoadingActivities(false);
      }
    };
  
    fetchActivities();
  }, [id]); 

  useEffect(() => {
    const fetchProblems = async () => {
      if (!activityId) return;

      setIsLoadingProblems(true);
      try {
        const response = await client.get(`/api/v1/crew/activity/${activityId}`);

        const activityData = response.data;
        const problems = activityData.problems.map(problem => ({
          ...problem,
          activity_id: activityId,
        }));

        setProblemsData(problems);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('문제 데이터를 가져오는 중 오류가 발생했습니다.');
        setProblemsData([]);
      } finally {
        setIsLoadingProblems(false);
      }
    };

    fetchProblems();
  }, [activityId]); // activityId 변경 시 문제 재로드

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${year}년 ${month}월 ${day}일`;
  };

  const getLastSubmissionDate = (submissions) => {
    const userSubmission = submissions.find(submission => submission.submitted_by.user_id === userId);
    return userSubmission ? formatDate(userSubmission.submitted_at) : null;
  };

  const handleActivityChange = (newActivityId) => {
    setActivityId(newActivityId); // 새로운 활동 ID로 업데이트
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full MainGrid1to3">
      <div className="col-span-1">
        {isLoadingActivities ? (
          <div className="w-full p-20">
            <div className="flex flex-col justify-center items-center m-10">
              <DataLoadingSpinner />
            </div>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center text-gray-600">등록된 회차가 없어요 😓</div>
        ) : (
          <SideNav
            elements={activities}
            setSelectedElement={handleActivityChange} // 선택된 요소 변경
            selectedElement={activityId}
          />
        )}
      </div>

      {isLoadingProblems ? (
        <div className="w-full p-20">
          <div className="flex flex-col justify-center items-center m-10">
            <DataLoadingSpinner />
          </div>
        </div>
      ) : problemsData.length > 0 ? (
        <div className="cardGrid3 col-span-3 mb-16">
          {problemsData.map((problem) => {
            const lastSubmittedDate = problem.submissions ? getLastSubmissionDate(problem.submissions) : null;
            return (
              <div key={problem.problem_id} className="box min-w-20rem flex-col justify-between items-start inline-flex gap-6 overflow-x-auto">
                <div className="flex justify-between items-center w-full flex-wrap whitespace-nowrap">
                  <p className='text-gray-600 text-base'>문제 {problem.problem_id}</p>
                  <p className='text-gray-600 text-sm'>
                    {lastSubmittedDate ? 
                      <div className="flex flex-wrap gap-1 items-center text-red-600">
                        <span>마지막 제출 </span>
                        <span>{lastSubmittedDate}</span>
                      </div>
                      : '제출 전'}
                  </p>
                </div>
                <div className="w-full containerTitle justify-start items-center gap-3 inline-flex">
                  <img
                    className='w-6 h-8'
                    src={
                      problem.analysis && problem.analysis.difficulty ? (
                        problem.analysis.difficulty.value === 1 ? Level1 :
                          problem.analysis.difficulty.value === 2 ? Level2 :
                            problem.analysis.difficulty.value === 3 ? Level3 :
                              Leveln
                      ) : Leveln
                    }
                    alt="Level Icon"
                  />
                  <p className='w-full text-gray-900 text-2xl font-bold truncate'>{problem.title}</p>
                </div>
                <div className='flex justify-end gap-3 ml-auto flex-wrap'>
                  <Link to={`/crew/${id}/problems/${problem.problem_id}`}>
                    <Button
                      buttonSize="detailBtn"
                      colorStyle="whiteBlack"
                      content="문제 상세"
                    />
                  </Link>
                  <Link to={`/crew/${id}/problems/${problem.problem_id}/submit`}>
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

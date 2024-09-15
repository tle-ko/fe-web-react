import { useState, useEffect } from 'react';
import ProblemToBeSolved from "./problemToBeSolved";
import ProblemSolvingStatus from "./problemSolvingStatus";
import ProblemLevelGraph from "./problemLevelGraph";
import CodeReview from "./codeReviewGraph";
import { FaChevronLeft, FaChevronRight, FaBookOpen } from "react-icons/fa6";
import { client } from '../../../utils';

export default function RightDashboard({ crew, statistics, crews, userId, problems, userData }) {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (crew && crew.activities && crew.activities.length > 0) {
      setCurrentActivityIndex(crew.activities.length - 1); // 가장 마지막 요소를 기본값으로 설정
    }
  }, [crew]);

  // submissions 데이터를 가져오는 함수
  const fetchSubmissionsData = async (activityId) => {
    setIsLoading(true); // 로딩 상태 시작
    try {
      const response = await client.get(`/api/v1/crew/activity/${activityId}/submissions`, {
        withCredentials: true
      });
      if (response.status === 200) {
        setSubmissions(response.data);
      } else {
        console.error("크루 회차별 풀이 제출 데이터를 불러오지 못했어요.", response.statusText);
      }
    } catch (error) {
      console.error("크루 회차별 풀이 제출 데이터를 불러오는데 문제가 발생했어요.", error);
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  const handlePrev = () => {
    setCurrentActivityIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    if (crew && crew.activities && crew.activities.length > 0) {
      setCurrentActivityIndex(prevIndex => Math.min(crew.activities.length - 1, prevIndex + 1));
    }
  };

  useEffect(() => {
    if (crew && crew.activities && crew.activities.length > 0) {
      const currentActivity = crew.activities[currentActivityIndex];
      const activityId = currentActivity.name.replace(/[^0-9]/g, ''); // 회차 ID 추출
      fetchSubmissionsData(activityId); // 해당 회차의 submissions 데이터를 가져옴
    }
  }, [currentActivityIndex, crew]);

  const formatDate = (dateString) => {
    return dateString ? dateString.split('T')[0] : "날짜 없음";
  };

  if (!crew || !crew.activities || crew.activities.length === 0) {
    return (
      <div className="w-full box mb-6">
        <div className="flex flex-col items-center gap-3 py-20 text-gray-600">
          <FaBookOpen color="#5383E8" size="3rem" />
          <p className="text-center">아직 활동이 등록되지 않았어요 😓<br/>회차 및 문제를 추가하고 TLE와 함께 해결해 나가요!</p>
        </div>
      </div>
    );
  }

  const currentActivity = crew.activities[currentActivityIndex];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex justify-center">
        <div className="box px-6 py-3 max-w-fit flex flex-row justify-center items-center gap-4 text-lg font-bold text-gray-900">
          <button className="w-fit" onClick={handlePrev}><FaChevronLeft /></button>
          <div className="w-full flex flex-row gap-6">
            <div className="w-16 flex justify-center font-cafe24">{currentActivity.name}</div>
            <div className="max-w-max flex text-gray-900 text-base-16 gap-1">
              <p>{formatDate(currentActivity.date_start_at)}</p>
              <p>~</p>
              <p>{formatDate(currentActivity.date_end_at)}</p>
            </div>
          </div>
          <button onClick={handleNext}><FaChevronRight /></button>
        </div>
      </div>

      <div className="grid gap-6">
        <ProblemToBeSolved submissions={submissions} isLoading={isLoading} />
      </div>
      <div className="w-full grid-cols-3 DashboardGrid">
        <div className="col-span-2">
          <ProblemSolvingStatus submissions={submissions} isLoading={isLoading} />
        </div>
        <div className="col-span-1">
          <ProblemLevelGraph statistics={statistics} />
        </div>
      </div>
    </div>
  );
}

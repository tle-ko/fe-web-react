import { useState, useEffect } from 'react';
import ProblemToBeSolved from "./problemToBeSolved";
import ProblemSolvingStatus from "./problemSolvingStatus";
import ProblemLevelGraph from "./problemLevelGraph";
import CodeReview from "./codeReviewGraph";
import { FaChevronLeft, FaChevronRight, FaBookOpen } from "react-icons/fa6";

export default function RightDashboard({ crew, statistics, crews, userId, problems, userData }) {
  // API 연결 부분
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  useEffect(() => {
    if (crew && crew.activities && crew.activities.length > 0) {
      setCurrentActivityIndex(crew.activities.length - 1); // 가장 마지막 요소를 기본값으로 설정
    }
  }, [crew]);

  const handlePrev = () => {
    setCurrentActivityIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    if (crew && crew.activities && crew.activities.length > 0) {
      setCurrentActivityIndex(prevIndex => Math.min(crew.activities.length - 1, prevIndex + 1));
    }
  };

  const formatDate = (dateString) => {
    return dateString ? dateString.split('T')[0] : "날짜 없음";
  };

  // 목업 데이터 사용 부분
  const activities = crews ? crews.activities : [];
  const [currentOrder, setCurrentOrder] = useState(activities.length ? activities[activities.length - 1].order : 0);

  const currentMockActivity = activities.find(activity => activity.order === currentOrder);

  // crew와 crew.activities가 정의되어 있는지 확인
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
      {/* 실제 API 데이터를 사용하는 부분 */}
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

      {/* 목업 데이터를 사용하는 부분 */}
      <div className="grid gap-6">
        <ProblemToBeSolved activity={currentMockActivity} userId={userId} />
      </div>
      <div className="w-full grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <ProblemSolvingStatus activity={currentMockActivity} crew={crews} userData={userData} />
          <CodeReview activity={currentMockActivity} crew={crews} userData={userData} problems={problems} />
        </div>
        <div className="col-span-1">
          <ProblemLevelGraph statistics={statistics} />
        </div>
      </div>
    </div>
  );
}

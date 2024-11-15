import { useState, useEffect } from 'react';
import ProblemToBeSolved from './problemToBeSolved';
import ProblemSubmitStatus from './problemSubmitStatus';
import ProblemLevelGraph from './problemLevelGraph';
import CodeReview from './codeReviewGraph';
import { FaChevronLeft, FaChevronRight, FaBookOpen } from 'react-icons/fa6';
import { client } from '../../../utils';

export default function RightDashboard({ crew, statistics }) {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (crew && crew.activities && crew.activities.length > 0) {
      setCurrentActivityIndex(crew.activities.length - 1); // 가장 마지막 요소를 기본값으로 설정
    }
  }, [crew]);

  // submissions 데이터를 가져오는 함수
  const fetchSubmissionsData = async (activityId) => {
    setIsLoading(true);
    try {
      const response = await client.get(`/crew/activity/${activityId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setSubmissions(response.data.problems);
      } else {
        console.error('크루 회차별 풀이 제출 데이터를 불러오지 못했어요.', response.statusText);
      }
    } catch (error) {
      console.error('크루 회차별 풀이 제출 데이터를 불러오는데 문제가 발생했어요.', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => {
    setCurrentActivityIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    if (crew && crew.activities && crew.activities.length > 0) {
      setCurrentActivityIndex((prevIndex) => Math.min(crew.activities.length - 1, prevIndex + 1));
    }
  };

  useEffect(() => {
    if (crew && crew.activities && crew.activities.length > 0) {
      const currentActivity = crew.activities[currentActivityIndex];
      fetchSubmissionsData(currentActivity.activity_id);
    }
  }, [currentActivityIndex, crew]);

  const formatDate = (dateString) => {
    return dateString ? dateString.split('T')[0] : ' ';
  };

  if (!crew || !crew.activities || crew.activities.length === 0) {
    return (
      <div className="box mb-6 w-full">
        <div className="flex flex-col items-center gap-3 py-20 text-gray-600">
          <FaBookOpen color="#5383E8" size="3rem" />
          <p className="text-center">
            아직 활동이 등록되지 않았어요 😓
            <br />
            회차 및 문제를 추가하고 TLE와 함께 해결해 나가요!
          </p>
        </div>
      </div>
    );
  }

  const currentActivity = crew.activities[currentActivityIndex];

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full justify-center">
        <div className="box flex max-w-fit flex-row items-center justify-center gap-4 px-6 py-3 text-lg font-bold text-gray-900">
          <button className="w-fit" onClick={handlePrev}>
            <FaChevronLeft />
          </button>
          <div className="flex w-full flex-row gap-6">
            <div className="flex w-16 justify-center font-cafe24">{currentActivity.name}</div>
            <div className="text-base-16 flex max-w-max gap-1 text-gray-900">
              <p>{formatDate(currentActivity.start_at)}</p>
              <p>~</p>
              <p>{formatDate(currentActivity.end_at)}</p>
            </div>
          </div>
          <button onClick={handleNext}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        <ProblemToBeSolved submissions={submissions} isLoading={isLoading} />
      </div>
      <div className="ResponsiveGrid w-full">
        <div className="grid gap-6">
          <ProblemSubmitStatus
            members={crew.members}
            submissions={submissions}
            isLoading={isLoading}
          />
          <CodeReview members={crew.members} problems={submissions} isLoading={isLoading} />
        </div>
        <div className="grid gap-6">
          <ProblemLevelGraph statistics={statistics} />
        </div>
      </div>
    </div>
  );
}

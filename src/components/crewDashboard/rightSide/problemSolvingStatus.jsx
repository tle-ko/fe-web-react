import { useEffect, useState } from 'react';
import { BiSolidSquareRounded } from "react-icons/bi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import DataLoadingSpinner from "../../common/dataLoadingSpinner"; // Import the spinner

const ProblemSolvingStatus = ({ submissions, isLoading }) => {
  const [rankings, setRankings] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [allSubmissionsEmpty, setAllSubmissionsEmpty] = useState(true); // 모든 사용자의 제출 상태가 빈지 확인하는 상태

  useEffect(() => {
    if (!submissions || submissions.length === 0) return;

    // 제출 순위 계산
    const submissionCounts = submissions.reduce((acc, submissionData) => {
      const count = submissionData.submissions.filter(sub => sub.is_submitted).length;
      acc[submissionData.submitted_by.user_id] = count;
      return acc;
    }, {});

    const sortedRankings = Object.entries(submissionCounts).sort((a, b) => b[1] - a[1]);

    // 모든 사용자의 제출 상태가 빈지 확인
    const isAllEmpty = submissions.every(submissionData => submissionData.submissions.every(sub => !sub.is_submitted));
    setAllSubmissionsEmpty(isAllEmpty);

    setRankings(sortedRankings.map(([userId, count], index) => {
      const user = submissions.find(sub => sub.submitted_by.user_id === parseInt(userId));
      return {
        rank: `${index + 1}위`,
        name: user ? user.submitted_by.username : 'Unknown',
        userId: parseInt(userId),
        submissions: user.submissions.map(sub => ({
          is_submitted: sub.is_submitted,
          is_corrected: sub.is_corrected
        }))
      };
    }));
  }, [submissions]);

  return (
    <div className="box w-full flex flex-col gap-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="text-gray-900 text-lg font-bold font-cafe24 whitespace-nowrap">
          문제 풀이 현황
        </div>
        <div className="flex-grow flex flex-wrap justify-end items-center">
          <div className="flex gap-6 text-gray-700 text-base font-medium">
            <div className="flex items-center gap-1">
              <p>정답</p>
              <BiSolidSquareRounded className="text-color-green" />
            </div>
            <div className="flex items-center gap-1">
              <p>오답</p>
              <BiSolidSquareRounded className="text-color-red-main" />
            </div>
            <div className="flex items-center gap-1">
              <p>미제출</p>
              <BiSolidSquareRounded className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 로딩 상태 처리: 문제 풀이 현황 아래에 로딩 스피너 표시 */}
      {isLoading ? (
        <div className="w-full p-10">
          <div className="flex flex-col justify-center items-center">
            <DataLoadingSpinner />
          </div>
        </div>
      ) : (
        <>
          {/* 데이터가 없을 때 예외 처리 */}
          {submissions.length === 0 || allSubmissionsEmpty ? (
            <div className="flex flex-col items-center gap-3 py-9 text-gray-600">
              <div className="justify-start items-center gap-2 inline-flex animate-bounce">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
              </div>
              <p>선장님이 문제를 등록하지 않았어요 😓</p>
            </div>
          ) : (
            <>
              {rankings.length > 0 && (
                <div className={`transition-all ease-in duration-200 ${showAll ? 'max-h-full' : 'max-h-52'} overflow-hidden`}>
                  <div className="min-w-full grid gap-2 text-center">
                    <div className="grid grid-cols-[1fr_4fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-2 text-gray-400 text-sm font-light">
                      <div></div>
                      <div></div>
                      {rankings[0].submissions.map((_, index) => (
                        <div key={index}>{`${index + 1}`}</div>
                      ))}
                    </div>
                    {rankings.map((user, index) => (
                      <div key={index} className="grid grid-cols-[1fr_4fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 text-center text-gray-900">
                        <div>{user.rank}</div>
                        <div>{user.name}</div>
                        {user.submissions.map((submission, idx) => (
                          <div
                            key={idx}
                            className={`h-9 ${submission.is_submitted ? (submission.is_corrected === false ? 'redBox' : 'greenBox') : 'grayBox'}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rankings.length > 4 && (
                <div className="flex justify-center">
                  <button className="text-gray-500 hover:underline focus:outline-none" onClick={() => setShowAll(!showAll)}>
                    {showAll ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProblemSolvingStatus;

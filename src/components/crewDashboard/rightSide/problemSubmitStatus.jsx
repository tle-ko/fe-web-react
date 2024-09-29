import { useEffect, useState } from 'react';
import { BiSolidSquareRounded } from "react-icons/bi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import DataLoadingSpinner from "../../common/dataLoadingSpinner";

const ProblemSubmitStatus = ({ members, submissions, isLoading }) => {
  const [rankings, setRankings] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!members || !submissions || submissions.length === 0) return;

    const userRankData = {};

    // 각 멤버에 대한 초기 제출 데이터 설정
    members.forEach(member => {
      userRankData[member.user_id] = {
        username: member.username,
        totalSubmissions: 0,  // 총 제출 개수
        correctSubmissions: 0,  // 정답 제출 개수
        submissions: Array(submissions.length).fill({
          is_submitted: false,
          is_correct: false
        })
      };
    });

    // 각 문제에 대한 제출 데이터 업데이트
    submissions.forEach((problem, problemIndex) => {
      if (problem.submissions && problem.submissions.length > 0) {
        problem.submissions.forEach((submission) => {
          const userId = submission.submitted_by.user_id;
          const isCorrect = submission.is_correct;

          // 제출된 문제에 대한 정보를 갱신
          if (userRankData[userId]) {
            userRankData[userId].submissions[problemIndex] = {
              is_submitted: true,
              is_correct: isCorrect
            };

            // 총 제출 횟수 및 정답 횟수 업데이트
            userRankData[userId].totalSubmissions += 1;
            if (isCorrect) {
              userRankData[userId].correctSubmissions += 1;
            }
          }
        });
      }
    });

    // 제출 개수와 정답 개수를 기준으로 순위 정렬
    const sortedRankings = Object.entries(userRankData)
      .map(([userId, userData]) => ({
        userId: parseInt(userId),
        username: userData.username,
        totalSubmissions: userData.totalSubmissions,
        correctSubmissions: userData.correctSubmissions,
        submissions: userData.submissions
      }))
      .sort((a, b) => {
        if (b.totalSubmissions === a.totalSubmissions) {
          return b.correctSubmissions - a.correctSubmissions;  // 제출 수가 같으면 정답 개수로 정렬
        }
        return b.totalSubmissions - a.totalSubmissions;  // 제출 수로 우선 정렬
      })
      .map((userData, index) => ({
        ...userData,
        rank: `${index + 1}위`
      }));

    setRankings(sortedRankings);
  }, [members, submissions]);

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
              <BiSolidSquareRounded className="text-color-green-default" />
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

      {isLoading ? (
        <div className="w-full p-10">
          <div className="flex flex-col justify-center items-center">
            <DataLoadingSpinner />
          </div>
        </div>
      ) : (
        <>
          {submissions.length === 0 ? (
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
                <div className={`transition-all ease-in duration-200 ${showAll ? 'max-h-full' : 'max-h-56'} overflow-hidden`}>
                  <div className="min-w-full grid gap-2 text-center">
                    <div className="grid grid-cols-[1fr_4fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-2 text-gray-400 text-sm font-light">
                      <div></div>
                      <div></div>
                      {submissions.map((_, index) => (
                        <div className={'w-full max-w-9 sm:w-8 md:w-8 lg:w-9'} key={`submission-header-${index}`}>{`${index + 1}`}</div> 
                      ))}
                    </div>
                    {rankings.map((user, index) => (
                      <div key={`ranking-${index}`} className="w-full h-10 grid grid-cols-[1fr_4fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 text-center text-gray-900">
                        <div className='flex items-center justify-center'>{user.rank}</div>
                        <div className='flex items-center justify-center'>{user.username}</div>
                        {user.submissions.map((submission, idx) => (
                          <div key={`submission-${user.userId}-${idx}`} className='flex justify-center items-center'> {/* key 추가 */}
                            <div
                              className={`w-full h-10 max-w-9 max-h-9 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-9 lg:h-9 ${submission.is_submitted ? (submission.is_correct ? 'greenBox' : 'redBox') : 'grayBox'}`}
                            />
                          </div>
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

export default ProblemSubmitStatus;

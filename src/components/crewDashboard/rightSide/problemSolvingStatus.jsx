import { useEffect, useState } from 'react';
import { BiSolidSquareRounded } from "react-icons/bi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

const ProblemSolvingStatus = ({ activity, crew, userData }) => {
  const [rankings, setRankings] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!activity || !crew || !userData) return;

    // 문제 제출 수를 기반으로 한 순위 계산
    const submissionCounts = {};
    crew.members.forEach(member => {
      submissionCounts[member.user_id] = 0;
    });

    activity.problems.forEach(problem => {
      problem.submissions.forEach(submission => {
        submissionCounts[submission.created_by] = (submissionCounts[submission.created_by] || 0) + 1;
      });
    });

    const sortedRankings = Object.entries(submissionCounts).sort((a, b) => b[1] - a[1]);

    setRankings(sortedRankings.map(([userId, count], index) => {
      const user = userData.find(user => user.id === parseInt(userId));
      return {
        rank: `${index + 1}위`,
        name: user ? user.username : 'Unknown',
        userId: parseInt(userId),
        submissions: activity.problems.map(problem => {
          const userSubmission = problem.submissions.find(sub => sub.created_by === parseInt(userId));
          if (userSubmission) {
            return {
              result: userSubmission.result,
              display: userSubmission.result === 'AC' ? 'O' : 'X'
            };
          }
          return { result: '미제출', display: '-' };
        })
      };
    }));
  }, [activity, crew, userData]);

  if (!activity) return null;

  return (
    <div className="box w-full flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="text-gray-900 text-lg font-bold font-cafe24 whitespace-nowrap">
          문제 풀이 현황
        </div>
        <div className="flex-grow flex justify-between items-center">
          <p className="text-gray-900 text-base font-normal">{activity.start_date} ~ {activity.end_date}</p>
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
      {activity.problems.length > 0 ? (
        <div className={`transition-all ease-in duration-200 ${showAll ? 'max-h-full' : 'max-h-52'} overflow-hidden`}>
          <div className="min-w-full grid gap-2 text-center">
            <div className="grid grid-cols-[1fr_4fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-2 text-gray-400 text-sm font-light">
              <div></div>
              <div></div>
              {activity.problems.map((problem, index) => (
                <div key={problem.id}>{problem.id}</div>
              ))}
            </div>
            {rankings.map((user, index) => (
              <div key={index} className="grid grid-cols-[1fr_4fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 text-center text-gray-900">
                <div>{user.rank}</div>
                <div>{user.name}</div>
                {user.submissions.map((submission, idx) => (
                  <div
                    key={idx}
                    className={`h-9 ${submission.display === 'O' ? greenBox : submission.display === 'X' ? redBox : grayBox}`}
                    title={submission.result}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-6 text-gray-600">
          <div className="justify-start items-center gap-2 inline-flex animate-bounce">
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
          </div>
          <p>선장님이 문제를 등록하지 않았어요 😓</p>
        </div>
      )}
      {rankings.length > 4 && (
        <div className="flex justify-center">
          <button
            className="text-gray-500 hover:underline focus:outline-none"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProblemSolvingStatus;

let greenBox = "greenBox";
let redBox = "redBox";
let grayBox = "grayBox";

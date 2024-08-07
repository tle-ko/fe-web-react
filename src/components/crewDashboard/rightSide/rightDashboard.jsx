import { useState } from 'react';
import ProblemToBeSolved from "./problemToBeSolved";
import ProblemSolvingStatus from "./problemSolvingStatus";
import ProblemLevelInRound from "./problemLevelInRound";
import CodeReview from "./codeReviewGraph";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function RightDashboard({ crew, userId, problems, userData }) {
  const activities = crew ? crew.activities : [];
  const [currentOrder, setCurrentOrder] = useState(activities.length ? activities[activities.length - 1].order : 0);

  const handlePrev = () => {
    setCurrentOrder(prevOrder => Math.max(1, prevOrder - 1));
  };

  const handleNext = () => {
    setCurrentOrder(prevOrder => Math.min(activities.length, prevOrder + 1));
  };

  const currentActivity = activities.find(activity => activity.order === currentOrder);

  if (!crew) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="box px-6 py-3 w-fit flex flex-row justify-start items-center gap-4 text-lg font-bold text-gray-900">
        <button onClick={handlePrev}><FaChevronLeft /></button>
        <div className="font-cafe24">{currentOrder}회차</div>
        <button onClick={handleNext}><FaChevronRight /></button>
      </div>
      <div className="grid gap-6">
        <ProblemToBeSolved activity={currentActivity} userId={userId} />
      </div>
      <div className="w-full grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <ProblemSolvingStatus activity={currentActivity} crew={crew} userData={userData} />
          <CodeReview activity={currentActivity} crew={crew} userData={userData} problems={problems} />
        </div>
        <div className="col-span-1">
          <ProblemLevelInRound activity={currentActivity} problems={problems} />
        </div>
      </div>
    </div>
  );
}

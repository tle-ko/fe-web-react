import React from 'react';

const formatDate = (submissionTime) => {
  const date = new Date(submissionTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${year}년 ${month.toString().padStart(2, '0')}월 ${day.toString().padStart(2, '0')}일 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return formattedDate;
};

const ProblemNav = ({ submitter, submissionTime, result }) => {
  const formattedSubmissionTime = formatDate(submissionTime);

  return (
    <div className="fixed left-0 flex h-16 w-screen flex-row border border-gray-200 bg-white font-pretendard">
      <div className="flex items-center space-x-5">
        <span className="ml-28 text-[18px] font-semibold">{submitter}</span>
        <span className="font-medium text-gray-600">|</span>
        <span className="text-[16px] font-medium">{formattedSubmissionTime} 제출</span>
      </div>
    </div>
  );
};

export default ProblemNav;

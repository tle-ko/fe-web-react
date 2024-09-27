import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from "../../utils";  

export default function SubmitProblemHeader() {
  const { submitId } = useParams(); 
  const [submitData, setSubmitData] = useState(null);

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const response = await client.get(`/api/v1/crew/activity/problem/submission/${submitId}`, {
          withCredentials: true
        });
        if (response.status === 200) {
          setSubmitData(response.data); 
        } else {
          console.error("풀이 데이터를 불러오지 못했어요.", response.statusText);
        }
      } catch (error) {
        console.error("풀이 데이터를 불러오는 중 문제가 발생했어요.", error);
      }
    };

    fetchSubmissionData();
  }, [submitId]);

  const AnswerTag = ({ status }) => {
    const baseClasses = "border-gray-500 font-semibold inline-flex items-center py-1 px-3 rounded-lg text-sm";
    const correctClasses = "bg-color-green-default text-white";
    const incorrectClasses = "bg-color-red-main text-white";  

    return (
      <p className={`${baseClasses} ${status ? correctClasses : incorrectClasses}`}>
        {status ? "맞았습니다" : "틀렸습니다"}
      </p>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes} 제출`;
  };

  return (
    <div className="w-full h-16 bg-white top-32 left-0 fixed px-28 py-4 flex flex-row gap-4 items-center border border-gray-200">
      { submitData ? (
        <>
          <div className="w-fit flex justify-center items-center">
            <AnswerTag status={submitData.is_correct} />
            <p className="w-fit font-semibold text-lg flex justify-center items-center ml-5 mr-3">
              {submitData.submitted_by.username}
            </p>
            <div className="font-semibold text-gray-600"> | </div>
          </div>
          <p className="text-base text-gray-600 font-medium">
            {formatDate(submitData.submitted_at)}
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

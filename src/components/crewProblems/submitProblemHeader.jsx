import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { client } from '../../utils';

export default function SubmitProblemHeader() {
  const { id, submitId } = useParams();
  const [submitData, setSubmitData] = useState(null);
  const userId = Number(localStorage.getItem('id'));

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const response = await client.get(`/api/v1/crew/activity/problem/submission/${submitId}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setSubmitData(response.data);
        } else {
          console.error('풀이 데이터를 불러오지 못했어요.', response.statusText);
        }
      } catch (error) {
        console.error('풀이 데이터를 불러오는 중 문제가 발생했어요.', error);
      }
    };

    fetchSubmissionData();
  }, [submitId]);

  const AnswerTag = ({ status }) => {
    const baseClasses =
      'border-gray-500 font-semibold inline-flex items-center py-1 px-3 rounded-lg text-sm';
    const correctClasses = 'bg-color-green-default text-white';
    const incorrectClasses = 'bg-color-red-main text-white';

    return (
      <p className={`${baseClasses} ${status ? correctClasses : incorrectClasses}`}>
        {status ? '맞았습니다' : '틀렸습니다'}
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
    <div className="fixed left-0 top-32 flex h-16 w-full flex-row items-center gap-4 border border-gray-200 bg-white px-28 py-4">
      {submitData ? (
        <div className="flex w-full justify-between">
          <div className="flex w-fit items-center justify-center gap-4">
            <AnswerTag status={submitData.is_correct} />
            <p className="flex w-fit items-center justify-center text-lg font-semibold">
              {submitData.submitted_by.username}
            </p>
            <div className="font-semibold text-gray-600"> | </div>
            <p className="text-base font-medium text-gray-600">
              {formatDate(submitData.submitted_at)}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              className="flex items-center justify-center rounded bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-color-blue-w25 hover:text-color-blue-main"
              to={`/crew/${id}`}
            >
              크루 홈 돌아가기
            </Link>
            {submitData.submitted_by.user_id === userId && (
              <button
                className="flex items-center justify-center rounded bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-[#FAD9DD] hover:text-color-red-main"
                // onClick={}
              >
                삭제
              </button>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

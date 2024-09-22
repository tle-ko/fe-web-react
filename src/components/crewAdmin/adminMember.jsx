import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from "../common/button";
import { client } from "../../utils";
import DataLoadingSpinner from '../common/dataLoadingSpinner';

export default function AdminMember() {
  const { id } = useParams(); 
  const [applyDataList, setApplyDataList] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    setLoading(true);
    const fetchApplicationData = async () => {
      try {
        const response = await client.get(`/api/v1/crew/${id}/applications`, {
          withCredentials: true
        });
        if (response.status === 200 && Array.isArray(response.data)) {
          setApplyDataList(response.data);
        } else {
          setError('데이터를 불러오지 못했어요.');
        }
      } catch (error) {
        console.error('에러 발생: ', error);
        setError('데이터를 불러오지 못했어요.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [id]);

  const handleAccept = async (applicationId, index) => {
    try {
      const response = await client.post(`/api/v1/crew/application/${applicationId}/accept`, {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        setApplyDataList(prevList =>
          prevList.map((apply, i) =>
            i === index ? { ...apply, is_pending: false, is_accepted: true } : apply
          )
        );
      } else {
        console.error('수락 요청 실패:', response.statusText);
      }
    } catch (error) {
      console.error('수락 요청 중 오류 발생:', error);
    }
  };

  const handleReject = async (applicationId, index) => {
    try {
      const response = await client.post(`/api/v1/crew/application/${applicationId}/reject`, {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        setApplyDataList(prevList =>
          prevList.map((apply, i) =>
            i === index ? { ...apply, is_pending: false, is_accepted: false } : apply
          )
        );
      } else {
        console.error('거절 요청 실패:', response.statusText);
      }
    } catch (error) {
      console.error('거절 요청 중 오류 발생:', error);
    }
  };

  const formatApplyDate = (dateString) => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
  };

  if (loading) {
    return <div className="w-full p-20">
        <div className="flex flex-col justify-center items-center m-10">
          <DataLoadingSpinner />
        </div>
      </div>;
  }

  if (error) {
    return <div className='m-4'>오류 발생: {error}</div>;
  }

  if (applyDataList.length === 0) {
    return <div className='m-4'>가입 신청이 없어요</div>;
  }

  return (
    <div className="w-full col-span-3 flex flex-col gap-6">
      <section className="box flex flex-col gap-6">
        <h2 className="font-bold text-lg font-cafe24">크루 가입 신청 현황</h2>
        <div className="flex flex-col gap-6">
          {applyDataList.map((applyData, index) => {
            const formattedDate = formatApplyDate(applyData.created_at);
            const applicationId = applyData.application_id;

            return (
              <div key={index} className="box flex flex-col gap-6">
                <div className="w-full flex gap-6">
                  <img src={`http://api.tle-kr.com${applyData.applicant.profile_image}`} alt="" className="w-12 h-12 rounded-full" />
                  <div className="w-72 flex flex-col gap-4 text-gray-900">
                    <p className="text-base font-bold">{applyData.applicant.username}</p>
                    <div className="flex gap-4 font-medium flex-wrap">
                      <p>신청 시각</p>
                      <div className="flex gap-1">
                        <p>{formattedDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 font-medium flex-wrap">
                      <p>백준 티어</p>
                      <p>{applyData.applicant.boj.level.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 font-medium">
                  <p>신청 메시지</p>
                  <div className="bg-gray-50 w-full h-28 rounded-md p-5">
                    <p className='whitespace-normal'>{applyData.message}</p>
                  </div>
                </div>

                <div className="w-full flex justify-end items-end gap-4">
                  {applyData.is_pending ? (
                    <>
                      <Button buttonSize="detailBtn" colorStyle="redWhite" content="거절하기" onClick={() => handleReject(applicationId, index)} />
                      <Button buttonSize="detailBtn" colorStyle="whiteBlue" content="수락하기" onClick={() => handleAccept(applicationId, index)} />
                    </>
                  ) : applyData.is_accepted ? (
                    <Button buttonSize="detailBtn" colorStyle="whiteBlue" content="수락 완료" disabled />
                  ) : (
                    <Button buttonSize="detailBtn" colorStyle="redWhite" content="거절 완료" disabled />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from "../common/button";
import useFetchData from "../../hooks/useEffectData";

export default function AdminMember() {
  const { id } = useParams();
  const crewData = useFetchData("http://localhost:3000/data/crewData.json");
  const userData = useFetchData("http://localhost:3000/data/userData.json");

  const [applyDataList, setApplyDataList] = useState([]);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    if (crewData.length > 0 && userData.length > 0) {
      const currentCrew = crewData.find(crew => crew.id === parseInt(id));
      if (currentCrew && currentCrew.apply && currentCrew.apply.length > 0) {
        setApplyDataList(currentCrew.apply);

        const userMapData = currentCrew.apply.reduce((map, applyData) => {
          const user = userData.find(user => user.id === applyData.user_id);
          if (user) {
            map[applyData.user_id] = user;
          }
          return map;
        }, {});

        setUserMap(userMapData);
      }
    }
  }, [crewData, userData, id]);

  const handleAccept = (applyId) => {
    setApplyDataList(prevList => prevList.map(apply =>
      apply.id === applyId ? { ...apply, is_required: true } : apply
    ));
  };

  const handleReject = (applyId) => {
    setApplyDataList(prevList => prevList.map(apply =>
      apply.id === applyId ? { ...apply, is_required: false } : apply
    ));
  };

  const formatApplyDate = (dateString) => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    return `20${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
  };

  if (applyDataList.length === 0) {
    return <div className='m-4'>데이터를 불러오는 중이에요!</div>;
  }

  return (
    <div className="w-4/5 flex flex-col gap-6">
      <section className="box flex flex-col gap-6">
        <h2 className="font-bold text-lg font-cafe24">크루 가입 신청 현황</h2>
        <div className="flex flex-col gap-6">
          {applyDataList.map((applyData) => {
            const formattedDate = formatApplyDate(applyData.apply_at);
            const currentUser = userMap[applyData.user_id];

            return (
              <div key={applyData.id} className="box flex flex-col gap-6">
                <div className="w-full flex gap-6">
                  <img src={currentUser?.image_url} alt="" className="w-12 h-12 rounded-full" />
                  <div className="w-72 flex flex-col gap-4 text-gray-900">
                    <p className="text-base font-bold">{currentUser?.username}</p>
                    <div className="flex justify-between font-medium">
                      <p>신청 시각</p>
                      <div className="flex gap-1">
                        <p>{formattedDate}</p>
                      </div>
                    </div>
                    <div className="flex justify-between font-medium">
                      <p>백준 티어</p>
                      <p>{applyData.boj_level}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 font-medium">
                  <p>신청 메시지</p>
                  <div className="bg-gray-50 w-full h-28 rounded-md p-5 inline-flex overflow-y-auto">
                    <p>{applyData.message}</p>
                  </div>
                </div>

                <div className="w-full flex justify-end items-end gap-4">
                  {applyData.is_required === null ? (
                    <>
                      <Button buttonSize="detailBtn" colorStyle="redWhite" content="거절하기" onClick={() => handleReject(applyData.id)} />
                      <Button buttonSize="detailBtn" colorStyle="whiteBlue" content="수락하기" onClick={() => handleAccept(applyData.id)} />
                    </>
                  ) : applyData.is_required ? (
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

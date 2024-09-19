import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiShip2Fill } from "react-icons/ri";
import { client } from "../../utils";
import Button from "../common/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import DataLoadingSpinner from "../common/dataLoadingSpinner";

export default function MyCrew() {
  const [crews, setCrews] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 데이터를 불러오기 시작할 때 로딩 상태로 설정
      try {
        const response = await client.get('api/v1/crews/my', {
          withCredentials: true
        });
        if (response.status === 200) {
          setCrews(response.data);
        } else {
          console.error('크루 데이터를 불러오지 못했어요.', response.statusText);
        }
      } catch (error) {
        console.error('크루 데이터를 불러오는데 오류가 발생했어요.', error);
      } finally {
        setIsLoading(false); // 데이터를 불러온 후 로딩 상태 해제
      }
    };
  
    fetchData();
  }, []);

  const handleSlide = (direction) => {
    setVisibleStartIndex((prevIndex) => {
      if (direction === 'left') {
        return Math.max(0, prevIndex - 4);
      } else {
        return Math.min(prevIndex + 4, crews.length - 4);
      }
    });
  };

  const formatDate = (dateString) => {
    return dateString ? dateString.split('T')[0] : '';  // 날짜가 null일 경우 빈 문자열 반환
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-5">
        <div className="containerTitle">내가 참여한 크루</div>
        <div className="w-full relative">
          {isLoading ? (
            <div className="w-full p-20">
              <div className="flex flex-col justify-center items-center m-10">
                <DataLoadingSpinner />
              </div>
            </div>
          ) : crews.length === 0 ? (
            <div className="w-full box">
              <div className="flex flex-col items-center gap-3 py-6 text-gray-600">
                <RiShip2Fill color="#5383E8" size="3rem" />
                <p>새로운 크루에 가입해 함께 모험을 떠나보세요!</p> {/* 크루 데이터가 없을 때 표시 */}
              </div>
            </div>
          ) : (
            <div className="cardGrid4 w-full">
              {crews.slice(visibleStartIndex, visibleStartIndex + 4).map((crew, index) => {
                const latestActivity = crew.latest_activity;

                return (
                  <div key={crew.crew_id} className="box h-full hidden-scrollbar">
                    <div className="h-full flex-col justify-between items-start gap-6 inline-flex">
                      <div className="w-full flex-col justify-start items-start gap-3 flex">
                        <div className="w-full flex-col justify-start items-start gap-6 flex">
                          <div className="justify-start items-center gap-2 inline-flex">
                            <p className="text-gray-900 text-xl font-bold">{crew.icon}</p>
                            <p className="w-36 text-gray-900 text-xl font-bold truncate">{crew.name}</p>
                          </div>
                        </div>
                        <div className="w-full justify-end items-end gap-2 inline-flex flex-wrap text-right">
                          <div className="text-color-blue-main font-semibold">
                            {latestActivity?.name}
                          </div>
                          {latestActivity?.start_at && latestActivity?.end_at && (
                            <div className="flex text-gray-700 font-medium gap-1">
                              <p>{formatDate(latestActivity.start_at)}</p>
                              <p>~</p>
                              <p>{formatDate(latestActivity.end_at)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full flex justify-end items-end gap-3">
                        <Link to={`/crew/${crew.crew_id}`}>
                          <Button
                            buttonSize="detailBtn"
                            colorStyle="skyBlue"
                            content="크루 홈"
                            className="w-[5rem] h-8"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
              {Array.from({ length: 4 - crews.slice(visibleStartIndex, visibleStartIndex + 4).length }).map((_, i) => (
                <div key={`empty-${i}`} className="hidden"></div>
              ))}
            </div>
          )}
          {crews.length > 4 && (
            <div className="w-full flex justify-between absolute top-1/3 transform -translate-y-1/2 text-gray-400 z-2">
              <button
                className={`absolute left-0 pl-2 ${visibleStartIndex === 0 ? 'hidden' : ''}`}
                onClick={() => handleSlide('left')}
              >
                <FaChevronLeft size="2rem" />
              </button>
              <button
                className={`absolute right-0 pr-2 ${visibleStartIndex + 4 >= crews.length ? 'hidden' : ''}`}
                onClick={() => handleSlide('right')}
              >
                <FaChevronRight size="2rem" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

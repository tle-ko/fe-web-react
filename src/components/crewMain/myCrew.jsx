import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiShip2Fill } from 'react-icons/ri';
import { client } from '../../utils';
import Button from '../common/button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import DataLoadingSpinner from '../common/dataLoadingSpinner';
import '../../styles/animation.css';

export default function MyCrew() {
  const [crews, setCrews] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 데이터를 불러오기 시작할 때 로딩 상태로 설정
      try {
        const response = await client.get('api/v1/crews/my', {
          withCredentials: true,
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
        const nextIndex = prevIndex + 4;
        return Math.min(nextIndex, crews.length - (crews.length % 4));
      }
    });
  };

  const formatDate = (dateString) => {
    return dateString ? dateString.split('T')[0] : ''; // 날짜가 null일 경우 빈 문자열 반환
  };

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-5">
        <div className="text-xl font-semibold text-gray-900">내가 참여한 크루</div>
        <div className="relative w-full">
          {isLoading ? (
            <div className="w-full p-20">
              <div className="m-10 flex flex-col items-center justify-center">
                <DataLoadingSpinner />
              </div>
            </div>
          ) : crews.length === 0 ? (
            <div className="box w-full">
              <div className="flex flex-col items-center gap-3 py-6 text-gray-600">
                <RiShip2Fill color="#5383E8" size="3rem" />
                <p>새로운 크루에 가입해 함께 모험을 떠나보세요!</p>{' '}
                {/* 크루 데이터가 없을 때 표시 */}
              </div>
            </div>
          ) : (
            <div className="cardGrid4 w-full">
              {crews.slice(visibleStartIndex, visibleStartIndex + 4).map((crew) => {
                const latestActivity = crew.latest_activity;

                return (
                  <div key={crew.crew_id} className="box hidden-scrollbar h-full">
                    <div className="inline-flex h-full flex-col items-start justify-between gap-6">
                      <div className="flex w-full flex-col items-start justify-start gap-3">
                        <div className="flex w-full flex-col items-start justify-start gap-6">
                          <div className="inline-flex items-center justify-start gap-2">
                            <p className="text-xl font-bold text-gray-900">{crew.icon}</p>
                            <p className="w-36 truncate text-xl font-bold text-gray-900">
                              {crew.name}
                            </p>
                          </div>
                        </div>
                        <div className="inline-flex w-full flex-wrap items-end justify-end gap-2 text-right">
                          <div className="font-semibold text-color-blue-main">
                            {latestActivity?.name}
                          </div>
                          {latestActivity?.start_at && latestActivity?.end_at && (
                            <div className="flex gap-1 font-medium text-gray-700">
                              <p>{formatDate(latestActivity.start_at)}</p>
                              <p>~</p>
                              <p>{formatDate(latestActivity.end_at)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex w-full items-end justify-end gap-3">
                        <Link to={`/crew/${crew.crew_id}`}>
                          <Button
                            buttonSize="detailBtn"
                            colorStyle="skyBlue"
                            content="크루 홈"
                            className="h-8 w-[5rem]"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {crews.length > 4 && (
            <div className="z-2 absolute top-1/3 flex w-full -translate-y-1/2 transform justify-between text-gray-400">
              <button
                className={`absolute left-0 pl-2 ${visibleStartIndex === 0 ? 'hidden' : ''}`}
                onClick={() => handleSlide('left')}
              >
                <FaChevronLeft size="2rem" className="hover-scale  hover:text-color-blue-main" />
              </button>
              <button
                className={`absolute right-0 pr-2 ${visibleStartIndex + 4 >= crews.length ? 'hidden' : ''}`}
                onClick={() => handleSlide('right')}
              >
                <FaChevronRight size="2rem" className="hover-scale hover:text-color-blue-main" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

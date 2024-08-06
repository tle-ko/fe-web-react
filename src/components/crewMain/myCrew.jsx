import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiShip2Fill } from "react-icons/ri";
import useFetchData from "../../hooks/useEffectData";
import Button from "../common/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function MyCrew({ userId }) {
  const allData = useFetchData("http://localhost:3000/data/crewData.json");
  const [filteredData, setFilteredData] = useState([]);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  useEffect(() => {
    if (allData?.length) {
      const myCrews = allData.filter(crew =>
        crew.members.some(member => member.user_id === userId)
      );
      setFilteredData(myCrews);
    }
  }, [allData, userId]);

  const handleSlide = (direction) => {
    setVisibleStartIndex((prevIndex) => {
      if (direction === 'left') {
        return Math.max(0, prevIndex - 4);
      } else {
        return Math.min(prevIndex + 4, Math.floor((filteredData.length - 1) / 4) * 4);
      }
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <div className="containerTitle">내가 참여한 크루</div>
        <div className="relative">
          {filteredData.length === 0 ? (
            <div className="w-full box">
              <div className="flex flex-col items-center gap-3 py-6 text-gray-600">
                <RiShip2Fill color="#5383E8" size="3rem" />
                <p>새로운 크루에 가입해 함께 모험을 떠나보세요!</p>
              </div>
            </div>
          ) : (
            <div className="cardGrid4">
              {filteredData.slice(visibleStartIndex, visibleStartIndex + 4).map((crew, index) => {
                const activities = [...crew.activities];
                const latestActivity = activities.sort((a, b) => b.order - a.order)[0];

                if (!latestActivity) {
                  return null;
                }

                return (
                  <div key={crew.id} className="box h-full whitespace-nowrap hidden-scrollbar overflow-x-auto">
                    <div className="flex-col justify-start items-start gap-6 inline-flex">
                      <div className="flex-col justify-start items-start gap-3 flex">
                        <div className="w-full flex-col justify-start items-start gap-6 flex">
                          <div className="justify-start items-center gap-2 inline-flex">
                            <p className="text-gray-900 text-xl font-bold">{crew.icon}</p>
                            <p className="text-gray-900 text-xl font-bold">{crew.name}</p>
                          </div>
                        </div>
                        <div className="w-full justify-end items-end gap-2 inline-flex flex-wrap text-right">
                          <div className="text-color-blue-main font-semibold">{latestActivity.order}회차</div>
                          <div className="flex text-gray-700 font-medium gap-1">
                            <p>{latestActivity.start_date}</p>
                            <p>~</p>
                            <p>{latestActivity.end_date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex justify-end items-end gap-3">
                        <Link to={`/crew/${crew.id}`}>
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
              {Array.from({ length: 4 - filteredData.slice(visibleStartIndex, visibleStartIndex + 4).length }).map((_, i) => (
                <div key={`empty-${i}`} className="hidden"></div>
              ))}
            </div>
          )}
          {filteredData.length > 0 && (
            <div className="w-full flex justify-between absolute top-1/3 transform -translate-y-1/2 text-gray-400 z-2">
              <button
                className={`absolute left-0 pl-2 ${visibleStartIndex === 0 ? 'hidden' : ''}`}
                onClick={() => handleSlide('left')}
              >
                <FaChevronLeft size="2rem" />
              </button>
              <button
                className={`absolute right-0 pr-2 ${visibleStartIndex + 4 >= filteredData.length ? 'hidden' : ''}`}
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

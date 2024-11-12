import React, { useState, useEffect } from 'react';
import { differenceInDays, addDays } from 'date-fns';
import { client } from '../../utils';
import DataLoadingSpinner from '../common/dataLoadingSpinner';

export default function MyCrewHistoryContainer() {
  const [crewData, setCrewData] = useState([]);
  const [crewStatistics, setCrewStatistics] = useState({});
  const [timelineStart, setTimelineStart] = useState(new Date());
  const [timelineEnd, setTimelineEnd] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 데이터를 불러오기 시작할 때 로딩 상태로 설정
      try {
        const response = await client.get('api/v1/crews/my', {
          withCredentials: true,
        });
        if (response.status === 200) {
          setCrewData(response.data);
          // 타임라인의 시작과 끝을 설정
          const start = new Date(
            Math.min(
              ...response.data.map((crew) =>
                crew.latest_activity.date_start_at
                  ? new Date(crew.latest_activity.date_start_at)
                  : new Date()
              )
            )
          );
          const end = new Date(
            Math.max(
              ...response.data.map((crew) =>
                crew.latest_activity.date_end_at
                  ? new Date(crew.latest_activity.date_end_at)
                  : new Date()
              )
            )
          );
          setTimelineStart(start);
          setTimelineEnd(addDays(end, 30)); // 끝 날짜에 30일을 더해 여유를 둡니다

          // 각 크루의 통계를 가져옵니다.
          const statisticsPromises = response.data.map((crew) =>
            client
              .get(`api/v1/crew/${crew.id}/statistics`, {
                withCredentials: true,
              })
              .then((statResponse) => ({
                crewId: crew.id,
                problemCount: statResponse.data.problem_count,
              }))
          );

          const statistics = await Promise.all(statisticsPromises);
          const statisticsMap = statistics.reduce((acc, stat) => {
            acc[stat.crewId] = stat.problemCount;
            return acc;
          }, {});
          setCrewStatistics(statisticsMap);
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

  const calculatePosition = (date) => {
    if (!date) return 0;
    const total = differenceInDays(timelineEnd, timelineStart);
    const position = differenceInDays(new Date(date), timelineStart);
    return (position / total) * 100;
  };

  const timelineMarkers = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];

  return (
    <div className="box col-span-full w-full">
      <p className="mb-4 font-cafe24 text-2xl text-gray-900">나의 참여 크루</p>

      <div className="relative overflow-scroll">
        {isLoading ? (
          <div className="w-full p-20">
            <div className="m-10 flex flex-col items-center justify-center">
              <DataLoadingSpinner />
            </div>
          </div>
        ) : (
          <>
            <span className="text-xs text-gray-500">day</span>
            {/* Timeline */}
            {timelineMarkers.map((day) => {
              const markerDate = addDays(timelineStart, day);
              const position = calculatePosition(markerDate);
              return (
                <div key={day} className="absolute" style={{ left: `${position}%` }}>
                  <span className="mt-1 block text-xs text-gray-500">{day}</span>
                </div>
              );
            })}

            {crewData.map((crew) => {
              const startPosition = calculatePosition(crew.latest_activity.date_start_at);
              const endPosition = calculatePosition(crew.latest_activity.date_end_at || new Date());
              const width =
                crew.latest_activity.date_start_at && crew.latest_activity.date_end_at
                  ? `${endPosition - startPosition}%`
                  : '0%';

              return (
                <div key={crew.id} className="mt-8 flex items-center">
                  <div
                    className="rounded-xl bg-gray-100 p-4"
                    style={{ width, marginLeft: `${startPosition}%` }}
                  >
                    <div className="mb-1 flex items-center justify-start gap-2 text-base font-medium text-gray-900">
                      <span>{crew.icon}</span>
                      <span className="whitespace-nowrap">{crew.name}</span>
                      <span>·</span>
                      <span className="whitespace-nowrap">{crew.latest_activity.name}</span>
                      <span>·</span>
                      <span className="whitespace-nowrap">
                        {crewStatistics[crew.id] || 0}문제 풀이
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

import Notice from "./notice";
import LeftDashboard from "./leftSide/leftDashboard";
import RightDashboard from "./rightSide/rightDashboard";
import useFetchData from "../../hooks/useEffectData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../../utils";
import DataLoadingSpinner from "../common/dataLoadingSpinner";

export default function CrewDashContainer({ userId }) {
  const crewData = useFetchData("http://localhost:3000/data/crewData.json");
  const userData = useFetchData("http://localhost:3000/data/userData.json");
  const problemData = useFetchData("http://localhost:3000/data/problemData.json");

  const [crew, setCrew] = useState(null);
  const [statistics, setStatistics] = useState(null); // 추가: statistics 데이터 상태
  const { id } = useParams();
  const crews = crewData.find(crew => crew.id === parseInt(id));
  
  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const response = await client.get(`/api/v1/crew/${id}/dashboard`, {
          withCredentials: true
        });
        if (response.status === 200) {
          setCrew(response.data);
        } else {
          console.error("Failed to fetch crew data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching crew data:", error);
      }
    };

    const fetchStatisticsData = async () => {
      try {
        const response = await client.get(`/api/v1/crew/${id}/statistics`, {
          withCredentials: true
        });
        if (response.status === 200) {
          setStatistics(response.data); // 추가: statistics 데이터 설정
        } else {
          console.error("Failed to fetch statistics:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchCrewData();
    fetchStatisticsData(); // 추가: 통계 데이터 호출
  }, [id]);

  return (
    <div className="flex flex-col gap-6 mt-20">
      {crew ? <Notice content={crew.notice} /> : 
        // 로딩 스피너 적용
        <div className="w-full p-20">
          <div className="flex flex-col justify-center items-center m-10">
            <DataLoadingSpinner />
          </div>
        </div>}
      <div className="w-full grid grid-cols-7 gap-6">
        {crew && statistics && ( // 추가: statistics 데이터도 있어야 렌더링
          <>
            <div className="col-span-2">
              <LeftDashboard crew={crew} statistics={statistics} /> {/* 수정: statistics 전달 */}
            </div>
            <div className="col-span-5">
              <RightDashboard crew={crew} statistics={statistics} crews={crews} problems={problemData} userId={userId} userData={userData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

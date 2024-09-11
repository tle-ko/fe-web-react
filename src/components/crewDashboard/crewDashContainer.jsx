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
          console.error("크루 대시보드 데이터를 불러오지 못했어요.", response.statusText);
        }
      } catch (error) {
        console.error("크루 대시보드 데이터를 불러오는데 문제가 발생했어요.", error);
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
          console.error("크루 분석 데이터를 불러올 수 없어요.", response.statusText);
        }
      } catch (error) {
        console.error("크루 분석 데이터를 불러오는데 문제가 발생했어요.", error);
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
        {crew && statistics && ( 
          <>
            <div className="col-span-2 min-w-28">
              <LeftDashboard crew={crew} statistics={statistics} /> 
            </div>
            <div className="col-span-5 min-w-96">
              <RightDashboard crew={crew} statistics={statistics} crews={crews} problems={problemData} userId={userId} userData={userData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

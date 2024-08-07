import Notice from "./notice";
import LeftDashboard from "./leftSide/leftDashboard";
import RightDashboard from "./rightSide/rightDashboard";
import useFetchData from "../../hooks/useEffectData";
import { useParams } from "react-router-dom";

export default function CrewDashContainer({ userId }) {
  const crewData = useFetchData("http://localhost:3000/data/crewData.json");
  const userData = useFetchData("http://localhost:3000/data/userData.json");
  const problemData = useFetchData("http://localhost:3000/data/problemData.json");
  const { id } = useParams();

  const crew = crewData.find(crew => crew.id === parseInt(id));

  return (
    <div className="flex flex-col gap-6 mt-20">
      {crew ? <Notice content={crew.notice} /> : <div>...크루 정보를 불러오는 중이에요.</div>}
      <div className="w-full grid grid-cols-7 gap-6">
        {crew && (
          <>
            <div className="col-span-2">
              <LeftDashboard crew={crew} userData={userData} problems={problemData} />
            </div>
            <div className="col-span-5">
              <RightDashboard crew={crew} problems={problemData} userId={userId} userData={userData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

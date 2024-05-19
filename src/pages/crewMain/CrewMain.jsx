import React from 'react';
import { Link, Outlet } from "react-router-dom";
import useChildRoute from "../../hooks/useChildRoute";
import useFetchData from "../../hooks/useEffectData";

export default function CrewMain(){
  // 부모div의 버튼을 클릭했을 때 자식 div만 표시되고 부모div는 사라지게
  const isChildRoute = useChildRoute("/crew/");
  // mock데이터 crewData.json url을 fetch함수로 호출해 그 응답 state로 저장
  const data = useFetchData("http://localhost:3000/data/crewData.json");

  return(
    <div>
      {isChildRoute ? (
          <Outlet />
        ) : (
          <div className="cardGrid4">
            {data.map((crew) => (
              <div key={crew.id} className="box">
                <Link to={`/crew/${crew.id}`}><button>버튼</button></Link>
              </div>
            ))}   
          </div>
        )}
    </div>
  );
}

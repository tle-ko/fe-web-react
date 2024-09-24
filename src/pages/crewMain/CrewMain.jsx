import React from 'react';
import Footer from '../../components/common/footer';
import MyCrew from '../../components/crewMain/myCrew';
import CrewListContainer from '../../components/crewMain/crewListContainer';
import CreateCrew from '../../components/crewMain/createCrew';
import { Outlet } from "react-router-dom";
import useChildRoute from "../../hooks/useChildRoute";

export default function CrewMain() {
  const isChildRoute = useChildRoute("/crew/")

  return (
    <div>
      {isChildRoute ? (
        <Outlet />
      ) : (
        <div className="flex justify-center items-center min-w-30rem">
          <div className="w-full flex flex-col justify-center items-center gap-12">
            <div className="w-full h-11 justify-between items-center gap-20 inline-flex min-w-30rem">
              <div className="text-gray-700 text-2xxl font-bold font-cafe24">크루 둘러보기</div>
              <CreateCrew />
            </div>
            <MyCrew />
            <CrewListContainer />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

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
        <div className="min-h-screen flex flex-col justify-center items-center">
          <div className="flex-col justify-center items-center gap-12 inline-flex w-full">
            <div className="w-full h-11 justify-between items-center gap-20 inline-flex">
              <div className="text-gray-700 text-[1.75rem] font-bold font-cafe24">크루 둘러보기</div>
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

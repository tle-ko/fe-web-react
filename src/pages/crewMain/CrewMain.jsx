import React from 'react';
import Footer from '../../components/common/footer';
import MyCrew from '../../components/crewMain/myCrew';
import CrewListContainer from '../../components/crewMain/crewListContainer';
import CreateCrew from '../../components/crewMain/createCrew';
import { Outlet } from 'react-router-dom';
import useChildRoute from '../../hooks/useChildRoute';

export default function CrewMain() {
  const isChildRoute = useChildRoute('/crew/');

  return (
    <div>
      {isChildRoute ? (
        <Outlet />
      ) : (
        <div className="flex min-w-30rem items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-12">
            <div className="inline-flex h-11 w-full min-w-30rem items-center justify-between gap-20">
              <div className="font-cafe24 text-2xxl font-bold text-gray-700">크루 둘러보기</div>
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

import React, { useState } from 'react';
import SideNav from '../../components/nav/sideNav';
import AdminCrew from './adminCrew';
import AdminMember from "./adminMember";
import AdminActivity from './adminActivity';
import { useSearchParams } from 'react-router-dom'; // 쿼리 파라미터 사용

export default function CrewAdmin() {
    const elements = [
      { order: 1, label: '크루 정보 관리' },
      { order: 2, label: '크루 멤버 관리' },
      { order: 3, label: '회차 관리' }
    ];

    const [searchParams] = useSearchParams();
    const initialSelectedElement = Number(searchParams.get('selected')) || elements[0].order;
    const [selectedElement, setSelectedElement] = useState(initialSelectedElement);

    const renderContent = () => {
      switch (selectedElement) {
        case 1:
          return <AdminCrew />;
        case 2:
          return <AdminMember />;
        case 3: 
          return <AdminActivity />;
        default:
          return <AdminCrew />;
      }
    };

    return (
      <div className="w-full MainGrid1to3">
        <div className="col-span-1">
          <SideNav 
            elements={elements}
            setSelectedElement={setSelectedElement} 
            selectedElement={selectedElement} 
          />
        </div>
        {renderContent()}
      </div>
    );
}

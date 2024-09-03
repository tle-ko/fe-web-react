import React, { useState } from 'react';
import SideNav from '../../components/nav/sideNav';
import AdminCrew from './adminCrew';
import AdminMember from "./adminMember";
import AdminActivity from './adminActivity';

export default function CrewAdmin() {
    // 요소를 객체 형태로 구성
    const elements = [
      { order: 1, label: '크루 정보 관리' },
      { order: 2, label: '크루 멤버 관리' },
      { order: 3, label: '회차 관리' }
    ];

    // 초기 선택값을 첫 번째 요소로 설정
    const [selectedElement, setSelectedElement] = useState(elements[0].order);

    // 사이드 네비게이션에서 선택된 항목에 따라 렌더링할 컨텐츠를 결정
    const renderContent = () => {
      switch (selectedElement) {
        case 1:
          return <AdminCrew />;
        case 2:
          return <AdminMember />;
        case 3: 
          return <AdminActivity />;
        default:
          return <AdminCrew />; // 기본값으로 크루 관리 페이지 컴포넌트 렌더링
      }
    };

    return (
      <div className="w-full flex flex-row">
        <SideNav 
          elements={elements} // 객체 배열 전달
          setSelectedElement={setSelectedElement} 
          selectedElement={selectedElement} 
        />
        {renderContent()} {/* 선택된 요소에 따라 렌더링 */}
      </div>
    );
}

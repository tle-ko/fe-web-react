import React, { useState } from 'react';
import SideNav from '../../components/nav/sideNav';
import MyCrew from '../../components/myPage/myCrewContainer';
import MyInfo from '../../components/myPage/myInformationContainer';
import Footer from '../../components/common/footer';

export default function MySetting(){
    const elements = [
      { order: 1, label: '내 정보 관리' },
      { order: 2, label: '신청 크루 관리' }
    ];

    // 초기 선택값을 첫 번째 요소로 설정
    const [selectedElement, setSelectedElement] = useState(elements[0].order);

    // 사이드 네비게이션에서 선택된 항목에 따라 렌더링할 컨텐츠를 결정
    const renderContent = () => {
      switch (selectedElement) {
        case 1:
          return <MyInfo />;
        case 2:
          return <MyCrew />;
        default:
          return <MyInfo />; // 기본값으로 크루 관리 페이지 컴포넌트 렌더링
      }
    };

  return(
    <>
      <div className="w-full MainGrid1to3">
        <div className='col-span-1'>
          <SideNav 
            elements={elements} // 객체 배열 전달
            setSelectedElement={setSelectedElement} 
            selectedElement={selectedElement} 
          />
        </div>
        {renderContent()}
      </div>
      <Footer/>
    </>
  )
}
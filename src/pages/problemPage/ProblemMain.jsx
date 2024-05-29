import React, { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import useChildRoute from "../../hooks/useChildRoute";
import useFetchData from "../../hooks/useEffectData";
import Footer from '../../components/common/footer';
import Button from "../../components/common/button";
import Dropdown from "../../components/common/dropDown";
import { PaginationNav1Presentation } from '../../components/common/pagiNation';

import Level1 from "../../assets/images/lv1.svg";
import Level2 from "../../assets/images/lv2.svg"
import Level3 from "../../assets/images/lv3.svg"
import Leveln from "../../assets/images/lvN.svg"

export default function ProblemMain(){
  // 부모div의 버튼을 클릭했을 때 자식 div만 표시되고 부모div는 사라지게
  const isChildRoute = useChildRoute("/problem/");
  // mock데이터 problemData.json url을 fetch함수로 호출해 그 응답 state로 저장
  const data = useFetchData("http://localhost:3000/data/problemData.json");

  const [pageIndex, setPageIndex] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const [pageCount, setPageCount] = useState(0); // 페이지 수를 상태로 관리

  const itemsPerPage = 16; // 한 페이지당 아이템 수

  useEffect(() => {
    if (data) {
      const start = pageIndex * itemsPerPage;
      const end = start + itemsPerPage;
      setCurrentData(data.slice(start, end));
      const calculatedPageCount = Math.ceil(data.length / itemsPerPage); // 전체 페이지 수 계산
      setPageCount(calculatedPageCount); // 페이지 수 상태 업데이트
    }
  }, [data, pageIndex, itemsPerPage]);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };


  return(
    <div>
      {isChildRoute ? (
          <Outlet />
        ) : (
          <div>
          <div>
            <div className="max-w-full mb-12 flex items-end justify-between">
            <p className="text-gray-700 text-[28px] font-bold font-cafe24">나의 문제 리스트</p>
              <Button 
                buttonSize="formBtn"
                colorStyle="blueWhite"
                content="문제 등록하기"
                onClick={() => console.log('Button clicked')}/>
            </div>
            <div className="mb-12 flex-col justify-start items-start gap-6 inline-flex">
            <p className="text-gray-900 text-xl font-semibold">문제 검색</p>
            <div className="justify-start items-center gap-3 inline-flex">
                {/* <BsSearch className='w-4 h-4 text-gray-600' /> */}
                <input 
                  className="w-[686px] px-6 py-4 bg-gray-200 rounded-lg"
                  placeholder="본인이 등록한 문제의 제목으로 검색해 주세요."
                />
              </div>
            </div>
          </div>
        
          <div className="max-w-full mb-6 flex items-center justify-between">
          <p className="text-gray-900 text-xl font-semibold">{data ? `${data.length} 문제` : 'Loading...'}</p> {/* problem 데이터에서 받아온 문제 개수를 세는 부분 */}
          <Dropdown dropList={["최신순", "낮은순", "높은순"]} />
          </div>
            <div className="cardGrid4">
              {currentData.map((problem) => (
                <div key={problem.id} className="box overflow-hidden flex-col justify-start items-start inline-flex gap-6">
                  <div className="titleContainer justify-start items-center gap-6 inline-flex">
                    <img
                      className='w-6 h-8'
                      src={problem.level === 1 ? Level1 : problem.level === 2 ? Level2 : problem.level === 3 ? Level3 : Leveln} 
                      alt="Level Icon"
                    />
                    <p className='text-gray-900 text-2xl font-bold truncate'>{problem.title}</p>
                  </div>
                  <div className='w-full flex justify-end'>
                    <Link to={`${problem.id}`}>
                      <Button 
                      buttonSize="detailBtn"
                      colorStyle="whiteBlack"
                      content="문제 상세"
                      onClick={() => console.log('Button clicked')}
                      />    
                    </Link>
                  </div>
                </div>
              ))}   
            </div>
            
            <PaginationNav1Presentation
              gotoPage={handlePageChange}
              canPreviousPage={pageIndex > 0}
              canNextPage={pageIndex < pageCount - 1}
              pageCount={pageCount}
              pageIndex={pageIndex}
            />

          </div>
        )}
        <Footer />
    </div>
    
  );
}
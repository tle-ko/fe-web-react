import React, { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import useChildRoute from "../../hooks/useChildRoute";
import useFetchData from "../../hooks/useEffectData";
import Footer from '../../components/common/footer';
import Button from "../../components/common/button";
import Dropdown from "../../components/common/dropDown";
import Modal from "../../components/common/modal";
import Input from "../../components/common/input";
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

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProblemCount, setFilteredProblemCount] = useState(0); // 검색 결과 개수 저장
  const consonant = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getConosonant = (str) => {
    return str.split('').map((char) => {
      const code = char.charCodeAt(0) - 44032;
      if (code < 0 || code > 11171) return char;
      return consonant[Math.floor(code / 588)];
    }).join('');
  };

  useEffect(() => {
  if (data) {
    const searchTermConsonant = getConosonant(searchTerm.toLowerCase());
    let exactMatches = data.filter(problem => problem.title.toLowerCase().includes(searchTerm.toLowerCase()));
    let consonantMatches = data.filter(problem => {
      const titleConsonant = getConosonant(problem.title.toLowerCase());
      return titleConsonant.includes(searchTermConsonant) && !exactMatches.includes(problem);
    }).sort((a, b) => {
      const titleConsonantA = getConosonant(a.title.toLowerCase());
      const titleConsonantB = getConosonant(b.title.toLowerCase());
      // 일치율 계산: 일치하는 초성의 개수 / 전체 초성의 개수
      let matchRateA = (titleConsonantA.match(new RegExp(searchTermConsonant, "g")) || []).length / titleConsonantA.length;
      let matchRateB = (titleConsonantB.match(new RegExp(searchTermConsonant, "g")) || []).length / titleConsonantB.length;
      return matchRateB - matchRateA; // 내림차순 정렬
    });
    const filteredData = [...exactMatches, ...consonantMatches];
    setFilteredProblemCount(filteredData.length); // 검색 결과 개수 업데이트
    
    const start = pageIndex * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentData(filteredData.slice(start, end)); // 현재 페이지에 보여줄 데이터만 추출
    const calculatedPageCount = Math.ceil(filteredData.length / itemsPerPage); // 전체 페이지 수 계산
    setPageCount(calculatedPageCount); // 페이지 수 상태 업데이트
  }
}, [data, pageIndex, itemsPerPage, searchTerm]);

  return(
    <div>
      {isChildRoute ? (
          <Outlet />
        ) : (
          <div>
          <div>
            <div className="max-w-full mb-12 flex items-end justify-between">
            <h2 className="text-gray-700 text-[28px] font-bold font-cafe24">나의 문제 리스트</h2>
            <Button 
                buttonSize="formBtn"
                colorStyle="blueWhite"
                content="문제 등록하기"
                onClick= {handleOpenModal}
            />
            </div>
            <div className="mb-12 flex-col justify-start items-start gap-6 inline-flex">
            <p className="text-gray-900 text-xl font-semibold">문제 검색</p>
            <div className="justify-start items-center gap-3 inline-flex">
                {/* <BsSearch className='w-4 h-4 text-gray-600' /> */}
                <input 
                  className="w-[686px] px-6 py-4 bg-gray-200 rounded-lg"
                  placeholder="본인이 등록한 문제의 제목으로 검색해 주세요."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        
          <div className="max-w-full mb-6 flex items-center justify-between">
          <p className="text-gray-900 text-xl font-semibold">{data ? `${filteredProblemCount} 문제` : 'Loading...'}</p> {/* problem 데이터에서 받아온 문제 개수를 세는 부분 */}
          <Dropdown dropList={["최신순", "낮은순", "높은순"]} />
          </div>
            <div className="cardGrid4">
              {currentData.map((problem) => (
                <div key={problem.id} className="box overflow-hidden flex-col justify-start items-start inline-flex gap-6">
                  <div className="titleContainer justify-start items-center gap-6 inline-flex">
                    <img
                      className='w-6 h-8'
                      src={problem.analysis.difficulty === 1 ? Level1 : problem.analysis.difficulty === 2 ? Level2 : problem.analysis.difficulty === 3 ? Level3 : Leveln} 
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
      
      <Footer/>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="문제 등록"
        content={(
          <div>
            <Input title="문제 제목" placeholder="제목을 작성해 주세요." />
            <div className="inline-flex gap-6">
              <Input title="시간 제한" placeholder=""/>
              <Input title="메모리 제한" placeholder="" />
              <Input title="문제 URL" placeholder="문제 링크를 작성해 주세요." />
            </div>
            <Input title="문제" placeholder="분석을 원하는 문제를 작성해 주세요." />
            <Input title="입력" placeholder="문제의 입력 조건을 작성해 주세요." />
            <Input title="출력" placeholder="문제의 출력 조건을 작성해 주세요." />
          </div>
        )}
        buttonText="문제 등록하기"
        onButtonClick={() => console.log('문제 등록하기 버튼 클릭됨')}
        width="50%"
        height="auto"
      />
    </div>
    
  );
}
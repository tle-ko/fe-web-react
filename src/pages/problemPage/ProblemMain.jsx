import React from 'react';
import { Link, Outlet } from "react-router-dom";
import useChildRoute from "../../hooks/useChildRoute";
import useFetchData from "../../hooks/useEffectData";
import Footer from '../../components/common/footer';
import Button from "../../components/common/button";
import Level1 from "../../assets/images/lv1.svg"

export default function ProblemMain(){
  // 부모div의 버튼을 클릭했을 때 자식 div만 표시되고 부모div는 사라지게
  const isChildRoute = useChildRoute("/problem/");
  // mock데이터 problemData.json url을 fetch함수로 호출해 그 응답 state로 저장
  const data = useFetchData("http://localhost:3000/data/problemData.json");

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
          <Button // 드롭다운
            buttonSize="detailBtn"
            colorStyle="whiteBlack"
            content="최신순"
            onClick={() => console.log('Button clicked')}
          />    
          </div>
          <div className="cardGrid4">
            {data.map((problem) => (
              <div key={problem.id} className="box overflow-hidden flex-col justify-start items-start inline-flex gap-6">
                <div className="titleContainer justify-start items-center gap-6 inline-flex">
                  <img className='w-6 h-8' src={Level1} alt="Level Icon"></img>
                  <p className='text-gray-900 text-2xl font-bold truncate'>{problem.title}</p>
                </div>
                <Link to={`${problem.id}`}>
                  <Button 
                  buttonSize="detailBtn"
                  colorStyle="whiteBlack"
                  content="문제 상세"
                  onClick={() => console.log('Button clicked')}
                  />    
                </Link>
              </div>
            ))}   
          </div>
          </div>
        )}
        <Footer />
    </div>
  );
}
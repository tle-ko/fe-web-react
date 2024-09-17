import React, { useState, useEffect } from 'react';
import Footer from '../../components/common/footer';
import MyPortfolioAnalysis from '../../components/myPage/myPortfolioAnalysis';
import MyCrewHistoryContainer from '../../components/myPage/myCrewHistoryContainer';
import Button from '../../components/common/button'; 
import { getUserProfile, getUserName } from '../../auth';
import { GrCircleInformation } from "react-icons/gr";
import { FaPhone, FaEnvelope, FaGraduationCap } from "react-icons/fa6";


const PortfolioData = {
  phone: "010-1234-5678",
  email: "sanmyung@gmail.com",
  school: "상명대학교 서울캠퍼스",
  userIntroduction: "안녕하세요! 프론트엔드 개발자를 꿈꾸는 대학생입니다.",
  level: 3,
  language: "python",
  dsaTag: "Dynamic Programming",
  strengthAlgorithm: "Greedy"
}

export default function MyPortfolio(){
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  
  useEffect(() => {
      const profileImage = getUserProfile();
      const profileName = getUserName();
  
      if (profileImage && profileName) {
        setProfileImage(profileImage);
        setUsername(profileName);
      }
    }, []);  

  return(
    <div className='flex flex-col gap-6'>

      <div className='w-full flex justify-between items-center'>
        <p className='text-gray-900 font-cafe24 text-2xxl'>나의 포트폴리오</p>
        <div className='h-fit'>
          <Button 
            buttonSize='detailBtn'
            colorStyle='whiteBlack'
            content='수정'
          />
        </div>
      </div>

      <div className='w-full grid grid-cols-5 gap-6'>
        <div className='box col-span-1 flex items-center gap-6'>
          <img 
          src={profileImage} 
          alt="profile" 
          className="w-32 h-32 rounded-full object-cover"
          />
          <div className='w-full flex flex-col items-start text-left gap-3'>
              <p className='text-gray-900 text-2xl font-bold'>{username}</p>
              <div className='flex flex-col justify-start items-start'>
                <div className='inline-flex gap-2 items-center'>
                  <FaPhone size='14' color='#111827' />
                  <p className='text-gray-900 text-sm'>{PortfolioData.phone}</p>
                </div>
                <div className='inline-flex gap-2 items-center'>
                  <FaEnvelope size='14' color='#111827' />
                  <p className='text-gray-900 text-sm'>{PortfolioData.email}</p>
                </div>
                <div className='inline-flex gap-2 items-center'>
                  <FaGraduationCap size='14' color='#111827' />
                  <p className='text-gray-900 text-sm'>{PortfolioData.school}</p>
                </div>
              </div>
          </div>
        </div>

        <div className='col-span-4 flex flex-col gap-6'>
          <div className='inline-flex gap-4 items-center'>
            <p className='text-gray-700 text-xl font-bold'>한 줄 소개</p>
            <div className='w-full box rounded-3xl p-5 justify-start items-start inline-flex'>
              <p className='text-left text-gray-900 text-base font-semibold'>
                {PortfolioData.userIntroduction}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <p className='text-gray-700 text-xl font-bold'>알고리즘 학습 능력 분석</p>
            <div className="tooltip">
              <GrCircleInformation size='24' color='#6B7280' />
              <p className="tooltiptext"> TLE 내 알고리즘 문제 풀이 기록이 분석되어 제공돼요</p>
            </div>
          </div>

          <MyPortfolioAnalysis
            level={PortfolioData.level}
            language={PortfolioData.language} 
            dsaTag={PortfolioData.dsaTag}
            strengthAlgorithm={PortfolioData.strengthAlgorithm}
          />
        </div>
      <MyCrewHistoryContainer/>
      </div>

      <Footer />
    </div>
  )
}
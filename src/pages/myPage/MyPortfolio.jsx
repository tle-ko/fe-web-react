import React, { useState, useEffect } from 'react';
import Footer from '../../components/common/footer';
import MyPortfolioAnalysis from '../../components/myPage/myPortfolioAnalysis';
import MyCrewHistoryContainer from '../../components/myPage/myCrewHistoryContainer';
import { GrCircleInformation } from "react-icons/gr";
import { client } from '../../utils';
import  { getUserProfile } from '../../auth';

const PortfolioData = {
  userIntroduction: "안녕하세요! 지상 최고의 개발자를 꿈꾸는 대학생입니다.",
  level: 3,
  language: "python",
  dsaTag: "Dynamic Programming",
  strengthAlgorithm: "Greedy"
}

export default function MyPortfolio() {
  const [profile_image, setProfileImage] = useState(getUserProfile());
  const [userInfo, setMyPortfolioUserInfo] = useState({
    email: '',
    username: '',
    boj_username: '',
    boj_level: '',
    profile_image: '',
  });

    useEffect(() => {
      client.get('api/v1/user/manage')
        .then(response => {
          const data = response.data;
          setMyPortfolioUserInfo({
            email: data.email,
            username: data.username,
            boj_username: data.boj?.username,
            boj_level: data.boj?.level?.name,
          });
          setProfileImage(getUserProfile());
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }, []);

  return(
    <div className='flex flex-col gap-6'>

      <div className='w-full flex justify-between items-center'>
        <p className='text-gray-900 font-cafe24 text-2xxl'>나의 포트폴리오</p>
      </div>

      <div className='w-full grid grid-cols-6 gap-6'>
        <div className='box col-span-2 flex justify-center items-center gap-6'>
          <img 
          src={profile_image} 
          alt="profile" 
          className="w-32 h-32 rounded-full object-cover"
          />
          <div className='w-full flex flex-col items-start text-left gap-3'>
              <p className='text-gray-900 text-2xl font-extrabold'>{userInfo.username}</p>
              <p className='text-gray-900 text-xl font-bold'>{userInfo.boj_username}</p>
              <p className='text-gray-900 text-xl font-bold'>{userInfo.boj_level}</p>
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
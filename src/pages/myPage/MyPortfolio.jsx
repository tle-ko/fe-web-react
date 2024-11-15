import React, { useState, useEffect } from 'react';
import Footer from '../../components/common/footer';
import MyPortfolioAnalysis from '../../components/myPage/myPortfolioAnalysis';
import MyCrewHistoryContainer from '../../components/myPage/myCrewHistoryContainer';
import { GrCircleInformation } from 'react-icons/gr';
import { client } from '../../utils';
import { getUserProfile } from '../../auth';

const PortfolioData = {
  userIntroduction: '안녕하세요! 지상 최고의 개발자를 꿈꾸는 대학생입니다.',
  level: 3,
  language: 'python',
  dsaTag: 'Dynamic Programming',
  strengthAlgorithm: 'Greedy',
};

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
    client
      .get('/user/manage')
      .then((response) => {
        const data = response.data;
        setMyPortfolioUserInfo({
          email: data.email,
          username: data.username,
          boj_username: data.boj?.username,
          boj_level: data.boj?.level?.name,
        });
        setProfileImage(getUserProfile());
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full items-center justify-between">
        <p className="font-cafe24 text-2xxl text-gray-900">나의 포트폴리오</p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/75">
          <p className="text-2xl font-extrabold text-gray-900">현재 서비스 개발 중이에요 🛠</p>
        </div>

        <div className="relative z-0 grid w-full grid-cols-6 gap-6">
          <div className="box col-span-2 flex items-center justify-center gap-6">
            <img
              src={profile_image}
              alt="profile"
              className="h-32 w-32 rounded-full object-cover"
            />
            <div className="flex w-full flex-col items-start gap-3 text-left">
              <p className="text-2xl font-extrabold text-gray-900">{userInfo.username}</p>
              <p className="text-xl font-bold text-gray-900">{userInfo.boj_username}</p>
              <p className="text-xl font-bold text-gray-900">{userInfo.boj_level}</p>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-6">
            <div className="inline-flex items-center gap-4">
              <p className="text-xl font-bold text-gray-700">한 줄 소개</p>
              <div className="box inline-flex w-full items-start justify-start rounded-3xl p-5">
                <p className="text-left text-base font-semibold text-gray-900">
                  {PortfolioData.userIntroduction}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-xl font-bold text-gray-700">알고리즘 학습 능력 분석</p>
              <div className="tooltip">
                <GrCircleInformation size="24" color="#6B7280" />
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
          <MyCrewHistoryContainer />
        </div>
      </div>

      <Footer />
    </div>
  );
}

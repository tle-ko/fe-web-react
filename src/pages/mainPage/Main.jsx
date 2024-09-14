import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/animation.css'
import CodeAndBoat from '../../assets/mainPage/codeAndBoat.png';
import CrewScreen from '../../assets/mainPage/crewScreen.png';
import PortfolioScreen from '../../assets/mainPage/portfolioScreen.png';
import Footer from '../../components/common/footer';

import { FaTag } from 'react-icons/fa';
import { RiBarChart2Fill } from 'react-icons/ri';
import { MdAccessTimeFilled } from 'react-icons/md';

export default function Main() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-scroll-up');
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentSections = sectionsRef.current;

    currentSections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      currentSections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const addToSectionsRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-w-full absolute top-0 left-0">
      <div className="min-w-full h-[40rem] inline-flex gap-3 items-end bg-color-blue-main pl-[7.5rem]">
        <div className="flex flex-col gap-6">
          <p className="text-gray-50 text-4xl font-extrabold whitespace-nowrap" ref={addToSectionsRef}>알고리즘 문제 해결 도우미<br/>TLE와 함께 최적의 해결책을 찾아가요!</p>
          <div className="w-full flex justify-end">
          <img className="w-1/2" ref={addToSectionsRef} src={CodeAndBoat} alt='CodeAndBoat'/>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white h-128 top-144 left-0 min-w-full">
        <div className="flex flex-col text-center mt-28">
          <div className="flex flex-col text-center gap-6">
            <p className="text-center text-gray-800 text-4xxl font-extrabold" ref={addToSectionsRef}>LLM의 힘으로 코딩 테스트의 바다를 항해해요</p>
            <div className="flex flex-col text-center text-gray-800">
            <p className="text-center text-xl font-bold" ref={addToSectionsRef}>문제를 분석하여 알고리즘 태그 분류, 난이도 분류, 예측 시간 복잡도를 제공해요<br/></p>
            <p className="text-center text-xl font-medium" ref={addToSectionsRef}>문제 등록만 해도 자동으로 분석되는 마법이 이루어집니다 🤩</p>
            </div>
          </div>

        <div className="mt-16 justify-center items-center gap-6 flex">
            <div className="w-1/4 p-10 bg-color-blue-main rounded-3xl inline-flex flex-col justify-start items-start gap-2.5" ref={addToSectionsRef}>
              <div className="inline-flex items-center gap-3">
              <p className="text-white text-xl font-extrabold">알고리즘 태그</p>
              <FaTag size="1.25rem" color="white" />
              </div>
              <div className="inline-flex justify-start items-start gap-4 flex-wrap">
              <div className="min-w-16 inline-flex items-center justify-center px-4 py-3 bg-gray-200/25 rounded-full">
                <p className="text-white whitespace-nowrap">#DFS</p>
              </div>
              <div className="min-w-16 inline-flex items-center justify-center px-4 py-3 bg-gray-200/25 rounded-full">
                <p className="text-white whitespace-nowrap">#BFS</p>
              </div>
              <div className="min-w-16 inline-flex items-center justify-center px-4 py-3 bg-gray-200/25 rounded-full">
                <p className="text-white whitespace-nowrap">#다이나믹 프로그래밍</p>
              </div>
            </div>
            </div>

          <div className="w-1/4 p-10 flex flex-col justify-start items-start gap-3 rounded-3xl bg-color-level2-yellow" ref={addToSectionsRef}>
            {/* 난이도 데이터 */}
            <div className="inline-flex items-center gap-3">
              <p className="text-white text-xl font-extrabold">난이도</p>
              <RiBarChart2Fill size="1.5rem" color="white" />
            </div>
            {/* 레벨 데이터 */}
            <div className="flex flex-col items-start gap-3">
              <p className="text-white text-xl font-bold">레벨 2</p>
              <p className="text-left text-white font-medium whitespace-normal">알고리즘, 해시, 동적 프로그래밍 등 고급 접근법이 필요한 문제들</p> 
              {/* 난이도 설명 */}
            </div>
          </div>

            <div className="w-1/4 p-10 flex flex-col justify-start items-start gap-6 rounded-3xl bg-color-blue-main" ref={addToSectionsRef}>
              <div className="inline-flex items-center gap-3">
              <p className="text-white text-xl font-extrabold whitespace-nowrap">예측 시간 복잡도</p>
              <MdAccessTimeFilled size="1.5rem" color="white" />
              </div>
              <div className="text-white text-xl">
                <p>O(N)</p>
              </div>
            </div>
        </div>
        </div>

        <div className="mt-36 flex flex-col items-center">
            <p className="mb-12 text-center text-2xl font-bold text-gray-800" ref={addToSectionsRef}>힌트가 더 필요하다면, AI 제공 힌트를 활용할 수 있어요 😎</p>

          <div className="flex flex-col items-center">
            <div className="w-2/3 mb-6 p-10 bg-white rounded-xl border border-gray-200 justify-start items-start inline-flex" ref={addToSectionsRef}>
                <p className="text-gray-600 text-xl mr-2">💡</p>
                <p className="text-gray-600 longSentence">
                1. 선분 교차 판별: 두 볼록 다각형의 겹쳐진 부분을 찾기 위해서는 각 다각형의 변들이 서로 교차하는 지점을 찾아야 합니다. 두 선분이 교차하는 지점을 찾는 알고리즘을 구현해야 합니다.
                </p>
            </div>
            <div className="w-2/3 mb-6 p-10 bg-white rounded-xl border border-gray-200 justify-start items-start inline-flex" ref={addToSectionsRef}>
                <p className="text-gray-600 text-xl mr-2">💡</p>
                <p className="text-gray-600 longSentence">
                2. 교차점 정렬: 두 다각형의 모든 변들에 대해 교차점을 찾았다면, 이 교차점들을 x좌표 기준으로 정렬해야 합니다.
                </p>
            </div>
            <div className="w-2/3 mb-6 p-10 bg-white rounded-xl border border-gray-200 justify-start items-start inline-flex" ref={addToSectionsRef}>
                <p className="text-gray-600 text-xl mr-2">💡</p>
                <p className="text-gray-600 longSentence">
                3. 겹쳐진 부분의 넓이 계산: 정렬된 교차점들을 이용하여 두 다각형의 겹쳐진 부분의 넓이를 계산해야 합니다. 겹쳐진 부분은 여러 개의 다각형으로 나눠질 수 있으므로, 각 다각형의 넓이를 구하여 합쳐야 합니다.
                </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col bg-white h-fit left-0">
        <div className="flex flex-col items-center mt-28 gap-6">
            <div className="flex flex-col">
              <p className="text-center text-gray-800 text-4xxl font-extrabold whitespace-nowrap" ref={addToSectionsRef}>크루와 함께라면 험난한 문제도 두렵지 않습니다.</p>
                <div className="text-center text-gray-800 flex flex-col">
                <p className="text-xl font-bold" ref={addToSectionsRef}>스터디 그룹 관리 기능을 통해 크루원들과 함께 성장할 수 있는 환경을 제공해요<br/></p>
                <p className="text-xl font-medium" ref={addToSectionsRef}>대시보드를 통해 한 눈에 진행사항을 파악하고 코드 리뷰로 함께 성장하는 경험을 만들어가요 🌈</p>
                </div>
            </div>
          <img className="w-10/12" src={CrewScreen} ref={addToSectionsRef} alt="CrewScreen"/>
        </div>
      </div>

      <div className="w-full flex flex-col bg-white left-0">
        <div className="items-center flex flex-col mt-28 flex-wrap" ref={addToSectionsRef}>
          <div className="flex flex-col">
            <p className="text-center text-gray-800 text-4xxl font-extrabold whitespace-nowrap" ref={addToSectionsRef}>나의 성장 기록, TLE가 함께합니다.</p>
            <div className="flex flex-col text-center text-gray-800">
              <p className="text-xl font-bold" ref={addToSectionsRef}>문제 해결 여정이 분석되면, 나만의 포트폴리오로 성장을 증명할 수 있어요</p>
              <p className="text-xl font-medium" ref={addToSectionsRef}>TLE는 개인의 문제 풀이 분석 정보를 제공하여 포트폴리오 제작을 돕습니다 🏃‍♂️</p>
            </div>
          </div>
          <div className="w-full flex justify-end" ref={addToSectionsRef} >
            <img className="w-2/3" src={PortfolioScreen} alt="PortfolioScreen"/>
          </div>
        </div>
      </div>

      <div className="flex w-full bg-color-blue-main h-fit left-0 flex-col">
        <div className="mt-28">
        <p className="text-center text-white text-3xxl font-extrabold">지금 바로 TLE의 선원이 되어, 알고리즘 문제 해결 모험을 시작하세요!</p>
        <div className="mt-6 text-center">
          <div className="mb-16 text-white">
            <p className="text-xl font-bold">코딩 테스트 준비는 더 이상 혼자가 아닙니다.<br/></p>
            <p className="text-xl font-medium">TLE와 함께라면 해결책을 찾아가는 여정이 더욱 즐거워져요 ☺️</p>
          </div>
            <Link className="px-16 py-6 rounded-full justify-center items-center inline-flex text-xl font-extrabold bg-white text-color-blue-main cursor-pointer
             transition duration-300 ease-in-out hover:bg-white/25 hover:text-white"
              to="/crew">
            TLE와 함께 도전하기 🔥
            </Link>
        </div>
        </div>
      <div className="w-full px-[120px]">
        <Footer 
          color="white" 
        />
      </div>
      </div>
    </div>
  );
}
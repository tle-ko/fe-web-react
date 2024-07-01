import { Link } from 'react-router-dom';

import CodeAndBoat from '../../assets/mainPage/codeAndBoat.png';
import logoWhite from '../../assets/images/logo-white.svg';
import CrewScreen from '../../assets/mainPage/crewScreen.png';
import PortfolioScreen from '../../assets/mainPage/portfolioScreen.png';

export default function Main() {
  return (
    <div className="w-screen absolute font-['Pretendard'] top-0 left-0">
      <div className="w-screen h-[40rem] inline-flex flex-row gap-3 items-end bg-color-blue-main">
        <h1 className="ml-[7.5rem] mb-[17.125rem] text-gray-50 text-4xl font-extrabold">알고리즘 문제 해결 도우미<br/>TLE와 함께 최적의 해결책을 찾아가요!</h1>
        <img className="w-[68.5rem]" src={CodeAndBoat} alt='CodeAndBoat'/>
      </div>

      <div className="inline-flex w-screen flex-col bg-white h-128 top-144 left-0">
        <div className="inline-flex flex-col text-center mt-36">
        <div className="inline-flex flex-col text-center">
          <h2 className="text-center text-gray-800 text-[40px] font-extrabold">LLM의 힘으로 코딩 테스트의 바다를 항해해요</h2>
          <div className="mt-6 text-center text-gray-800">
          <p className="text-center text-xl font-bold">문제를 분석하여 알고리즘 태그 분류, 난이도 분류, 예측 시간 복잡도를 제공합니다.<br/></p>
          <p className="text-center text-xl font-medium">문제 등록만 해도 자동으로 분석되는 마법이 이루어집니다 🤩</p>
          </div>
        </div>
        <div className="mt-16 justify-center items-start gap-6 flex">
            <div className="w-1/4 h-auto p-10 bg-color-blue-main rounded-3xl inline-flex flex-col justify-start items-start gap-2.5">
              <p className="text-white text-2xl font-bold">알고리즘 태그</p>
              <div className="justify-start items-start gap-4 inline-flex flex-row">
                <div className="px-4 py-1 bg-white rounded-[60px] justify-center items-center">
                <p className="text-color-blue-main">#DFS</p>
                </div>
                <div className="px-4 py-1 bg-white rounded-[60px] justify-center items-center">
                <p className="text-color-blue-main">#BFS</p>
                </div>
              </div>
            </div>
            <div className="w-1/4 h-auto p-10 bg-color-level2-yellow rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex">
              <p className="text-white text-2xl font-extrabold">난이도</p>
              <p className="text-white text-xl font-bold">레벨 2</p>
            </div>
            <div className="w-1/4 h-auto p-10 bg-color-blue-main rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex">
              <p className="text-white text-2xl font-extrabold">예측 시간 복잡도</p>
              <p className="text-white text-xl">|V|+|E|</p>
            </div>
        </div>
        </div>

        <div className="mt-36 inline-flex flex-col items-center">
          <p className="mb-12 text-center text-xl font-bold">힌트가 더 필요하다면, AI 제공 힌트를 활용할 수 있어요 😎</p>
          <div className="inline-flex flex-col">
            <div className="mb-6 p-10 bg-white rounded-xl border border-gray-200 justify-between items-start inline-flex">
                <p className="text-gray-600 text-xl mr-2">💡</p>
                <p className="w-[862px] text-gray-600">
                DFS(Depth-First Search)는 그래프의 깊이를 우선적으로 탐색하는 알고리즘입니다. 스택 자료구조를 이용하여 구현할 수 있습니다.
                <br/>- 스택을 사용하여 방문할 정점을 관리합니다.
                <br/>- 현재 정점에서 방문할 수 있는 인접 정점들 중 가장 작은 번호의 정점부터 순서대로 스택에 push합니다.
                </p>
            </div>
            <div className="mb-6 p-10 bg-white rounded-xl border border-gray-200 justify-between items-start inline-flex">
                <p className="text-gray-600 text-xl mr-2">💡</p>
                <p className="w-[862px] text-gray-600">
                BFS(Breadth-First Search)는 그래프의 너비를 우선적으로 탐색하는 알고리즘입니다. 큐 자료구조를 이용하여 구현할 수 있습니다.
                <br/>- 큐를 사용하여 방문할 정점을 관리합니다.
                <br/>- 현재 정점에서 방문할 수 있는 인접 정점들 중 가장 작은 번호의 정점부터 순서대로 큐에 enqueue합니다.
                </p>
            </div>
            <div className="mb-6 p-10 bg-white rounded-xl border border-gray-200 justify-between items-start inline-flex">
                <p className="text-gray-600 text-xl mr-2">💡</p>
                <p className="w-[862px] text-gray-600">
                입력으로 주어진 그래프 정보를 인접 리스트 또는 인접 행렬로 표현할 수 있습니다.
                <br/>- 인접 리스트를 사용하면 각 정점의 인접 정점들을 빠르게 찾을 수 있습니다.
                </p>
            </div>
            <div className="mb-6 p-10 bg-white rounded-xl border border-gray-200 justify-between items-start inline-flex">
                <p className="text-gray-600 text-xl mr-2">💡</p>
                <p className="w-[862px] text-gray-600">
                방문할 수 있는 정점이 여러 개인 경우, 정점 번호가 작은 것을 먼저 방문하도록 구현해야 합니다.
                <br/>- 인접 정점들을 오름차순으로 정렬하여 방문 순서를 결정할 수 있습니다.
                </p>
            </div>
            <div className="mb-6 p-10 bg-white rounded-xl border border-gray-200 justify-between items-start inline-flex">
                <p className="text-gray-600 text-xl mr-2">💡</p>
                <p className="w-[862px] text-gray-600">
                DFS와 BFS 탐색 결과를 각각 출력하는 부분에서 방문 순서를 저장하고 출력하는 로직이 필요합니다.
                <br/>- 방문한 정점들을 리스트 또는 배열에 저장하고, 이를 출력하면 됩니다.
                </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-screen inline-flex bg-white h-fit left-0 flex-col">
        <div className="inline-flex flex-col items-center mt-[140px]">
        <h2 className="text-center text-gray-800 text-[40px] font-extrabold">크루와 함께라면 험난한 문제도 두렵지 않습니다.</h2>
          <div className="text-center text-gray-800">
            <p className="text-xl font-bold">스터디 그룹 관리 기능을 통해 크루원들과 함께 성장할 수 있는 환경을 제공합니다.<br/></p>
            <p className="text-xl font-medium">대시보드를 통해 한 눈에 진행사항을 파악하고 코드 리뷰로 함께 성장하는 경험을 만들어가요 🌈</p></div>
          <img className="w-10/12" src={CrewScreen} alt="CrewScreen"/>
        </div>
      </div>

      <div className="inline-flex bg-white h-fit left-0 flex-col">
        <div className="items-center inline-flex ml-36 mt-[140px] justify-between">
          <div className="flex-col">
          <h2 className="text-left text-gray-800 text-[40px] font-extrabold">나의 성장 기록, TLE가 함께합니다</h2>
          <div className="text-gray-800">
            <p className="text-xl font-bold">문제 해결 여정이 분석되면, 나만의 포트폴리오로 성장을 증명할 수 있어요 🏃‍♂️<br/></p>
            <p className="text-xl font-medium">TLE는 개인의 문제 풀이 분석 정보를 제공하여 포트폴리오 제작을 돕습니다.</p>
          </div>
          </div>
        <img className="w-1/2" src={PortfolioScreen} alt="PortfolioScreen"/>
        </div>
      </div>

      <div className="inline-flex w-screen bg-color-blue-main h-fit left-0 flex-col">
        <div className="mt-[8.75rem]">
        <h2 className="text-center text-white text-[2rem] font-extrabold">지금 바로 TLE의 선원이 되어, 알고리즘 문제 해결 모험을 시작하세요!</h2>
        <div className="mt-6 text-center">
          <div className="mb-16 text-white">
            <p className="text-xl font-bold">코딩 테스트 준비는 더 이상 혼자가 아닙니다.<br/></p>
            <p className="text-xl font-medium">TLE와 함께라면 해결책을 찾아가는 여정이 더욱 즐거워져요 ☺️</p>
          </div>
            <div className="px-16 py-6 rounded-full justify-center items-center inline-flex text-xl font-extrabold bg-white text-color-blue-main cursor-pointer
              hover:bg-color-blue-main transition duration-300 ease-in-out hover:text-white hover:border border-white"
              onClick={() => console.log('회원가입 창으로 이동')}>
            TLE와 함께 도전하기 🔥
            </div>
        </div>
        </div>

        <div className="mt-28 px-[7.5rem] w-full bottom-0">
        <div className= "max-w-full px-12 pt-6 pb-12 border-t items-end border-white p-6 justify-between flex">
          <div className="flex-col justify-center items-start gap-1 inline-flex">
              <p className="text-white text-sm font-semibold">2024년 상명대학교 컴퓨터과학전공 캡스톤디자인</p>
              <p className="text-white text-sm font-medium">코딩메리호 김동주 조유진 이유민 강윤진 김서영 민기홍</p>
          </div>
          <div className="flex-col justify-center items-end gap-1 inline-flex">
              <div className="justify-start items-end gap-1 inline-flex">
                  <p className="text-white font-bold">time limit exceeded,</p>
                  <Link to="/"><img className="w-14" src={logoWhite} alt='TLELOGO'/></Link>
              </div>
              <p className="text-white text-sm font-semibold">Copyright 2024. TLE. All rights reserved.</p>
      </div>
      </div>
        </div>
      </div>
    </div>
  );
}
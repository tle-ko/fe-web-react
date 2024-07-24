import { FaChevronLeft, FaTag } from 'react-icons/fa';
import { RiBarChart2Fill } from 'react-icons/ri';
import { MdAccessTimeFilled } from 'react-icons/md';

export default function ProblemAnalysisLoading({setActiveContainer}) {
    return (
    <div className="flex mt-24 gap-10 w-full items-start">
    <button className="flex flex-col items-center gap-4 cursor-pointer group"
        onClick={() => setActiveContainer('detail')}>
        <div className="mt-10 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full group-hover:bg-color-blue-hover cursor-pointer">
          <FaChevronLeft size="1.5rem" color="white" />
        </div>
        <p className="text-center text-gray-600 text-lg font-semibold group-hover:text-color-blue-hover">문제<br />보기</p>
    </button>

    {/* 문제 분석 컨테이너 */}
      <div className="flex flex-col items-start gap-6 w-1/3">
        <div className="w-full p-10 flex flex-col justify-start items-start gap-6 rounded-3xl bg-gray-500">
          <div className="inline-flex items-center gap-3">
            <p className="text-white text-xl font-extrabold">알고리즘 태그</p>
            <FaTag size="1.25rem" color="white" />
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="justify-start items-center gap-2 inline-flex">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <p className="text-white font-medium">AI가 분석을 진행하고 있어요!</p>
          </div>
        </div>

          {/* 난이도 데이터 */}
        <div className="w-full p-10 flex flex-col justify-start items-start gap-3 rounded-3xl bg-gray-500">
          <div className="inline-flex items-center gap-3">
            <p className="text-white text-xl font-extrabold">난이도</p>
            <RiBarChart2Fill size="1.5rem" color="white" />
          </div>
          <div className="flex flex-col items-start gap-3">
          <div className="justify-start items-center gap-2 inline-flex">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
            <p className="text-white font-medium">AI가 분석을 진행하고 있어요!</p>
          </div>
        </div>

        {/* 시간 복잡도 데이터 */}
        <div className="w-full p-10 flex flex-col justify-start items-start gap-6 rounded-3xl bg-gray-500">
          <div className="inline-flex items-center gap-3">
            <p className="text-white text-xl font-extrabold">예측 시간 복잡도</p>
            <MdAccessTimeFilled size="1.5rem" color="white" />
          </div>
          <div className="justify-start items-center gap-2 inline-flex">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          <p className="text-white font-medium">AI가 분석을 진행하고 있어요!</p>
        </div>
      </div>

      {/* 문제 힌트 컨테이너 */}
      <div className="flex flex-col items-start gap-6 w-2/3">
        <p className="text-gray-900 text-xl font-bold">힌트가 더 필요하다면, AI가 제공해 주는 힌트😎</p>
        <div className="w-full p-10 bg-white rounded-xl border border-gray-200 flex-col justify-center items-center inline-flex">
            <div className="flex-col justify-center items-center gap-3 flex">
                <div className="justify-start items-center gap-2 inline-flex">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                </div>
                <p className="text-center text-gray-500 text-base">AI가 분석을 진행하고 있어요! 조금만 기다려 주세요💞</p>
            </div>
        </div>
      </div>
    </div>
    )
}
import React from 'react';
import { PiStepsFill } from 'react-icons/pi';
import { FaCode } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa6';
import { PiGraph } from 'react-icons/pi';

export default function MyPortfolioAnalysis({ level, language, dsaTag, strengthAlgorithm }) {
  return (
    <div className="grid w-full grid-cols-4 gap-6">
      <div className="col-span-1 flex w-full flex-col items-center justify-start gap-2.5 rounded-3xl bg-color-pink-w50 p-10">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-color-level3-pink xl:h-24 xl:w-24">
          <PiStepsFill className="text-3xl text-white xl:text-4xl" />
        </div>

        <div className="flex w-full flex-col items-center gap-4 p-2.5">
          <p className="text-md font-medium text-gray-800 xl:text-lg">예상 적정 레벨</p>
          <p className="w-fit text-center text-xl font-bold text-gray-800 xl:text-2xl">
            레벨 {level}
          </p>
        </div>
      </div>

      <div className="col-span-1 flex w-full flex-col items-center justify-start gap-2.5 rounded-3xl bg-color-yellow-w50 p-10">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-color-yellow-default xl:h-24 xl:w-24">
          <FaCode className="text-3xl text-white xl:text-4xl" />
        </div>

        <div className="flex flex-col items-center gap-4 p-2.5">
          <p className="text-md font-medium text-gray-800 xl:text-lg">주로 풀이한 언어</p>
          <p className="w-fit text-center text-xl font-bold text-gray-800 xl:text-2xl">
            {language}
          </p>
        </div>
      </div>

      <div className="col-span-1 flex w-full flex-col items-center justify-start gap-2.5 rounded-3xl bg-color-blue-w50 p-10">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-color-blue-main xl:h-24 xl:w-24">
          <FaTag className="text-3xl text-white xl:text-4xl" />
        </div>

        <div className="flex flex-col items-center gap-4 p-2.5">
          <p className="text-md font-medium text-gray-800 xl:text-lg">주로 풀이한 태그</p>
          <p className="w-fit whitespace-break-spaces text-center text-md font-bold text-gray-800 xl:text-lg">
            {dsaTag}
          </p>
        </div>
      </div>

      <div className="col-span-1 flex w-full flex-col items-center justify-start gap-2.5 rounded-3xl bg-color-green-w50 p-10">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-color-green-default xl:h-24 xl:w-24">
          <PiGraph className="text-3xl text-white xl:text-4xl" />
        </div>

        <div className="flex flex-col items-center gap-4 p-2.5">
          <p className="text-md font-medium text-gray-800 xl:text-lg">강점 알고리즘</p>
          <p className="w-fit whitespace-break-spaces text-center text-xl font-bold text-gray-800 xl:text-2xl">
            {strengthAlgorithm}
          </p>
        </div>
      </div>
    </div>
  );
}

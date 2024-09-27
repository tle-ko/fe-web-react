import React from 'react';
import { PiStepsFill } from "react-icons/pi";
import { FaCode } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { PiGraph } from "react-icons/pi";

export default function MyPortfolioAnalysis({ level, language, dsaTag, strengthAlgorithm }) {
  return (
    <div className='w-full grid grid-cols-4 gap-6'>
      <div className='w-full col-span-1 p-10 rounded-3xl justify-start items-center gap-2.5 flex flex-col bg-color-pink-w50'>
        <div className='inline-flex w-20 h-20 rounded-full items-center justify-center bg-color-level3-pink xl:w-24 xl:h-24'>
          <PiStepsFill className='text-3xl text-white xl:text-4xl' />
        </div>

        <div className='w-full flex flex-col p-2.5 items-center gap-4'>
          <p className='text-gray-800 text-md font-medium xl:text-lg'>예상 적정 레벨</p>
          <p className='w-fit text-gray-800 text-xl font-bold text-center xl:text-2xl'>레벨 {level}</p>
        </div>
      </div>

      <div className='w-full col-span-1 p-10 rounded-3xl justify-start items-center gap-2.5 flex flex-col bg-color-yellow-w50'>
        <div className='inline-flex w-20 h-20 rounded-full items-center justify-center bg-color-yellow-default xl:w-24 xl:h-24'>
          <FaCode className='text-3xl text-white xl:text-4xl' />
        </div>

        <div className='flex flex-col p-2.5 items-center gap-4'>
        <p className='text-gray-800 text-md font-medium xl:text-lg'>주로 풀이한 언어</p>
             <p className='w-fit text-gray-800 text-xl font-bold text-center xl:text-2xl'>{language}</p>
        </div>
      </div>

      <div className='w-full col-span-1 p-10 rounded-3xl justify-start items-center gap-2.5 flex flex-col bg-color-blue-w50'>
        <div className='inline-flex w-20 h-20 rounded-full items-center justify-center bg-color-blue-main xl:w-24 xl:h-24'>
          <FaTag className='text-3xl text-white xl:text-4xl' />
        </div>

        <div className='flex flex-col p-2.5 items-center gap-4'>
        <p className='text-gray-800 text-md font-medium xl:text-lg'>주로 풀이한 태그</p>
          <p className='w-fit text-gray-800 text-md font-bold whitespace-break-spaces text-center xl:text-lg'>{dsaTag}</p>
        </div>
      </div>

      <div className='w-full col-span-1 p-10 rounded-3xl justify-start items-center gap-2.5 flex flex-col bg-color-green-w50'>
        <div className='inline-flex w-20 h-20 rounded-full items-center justify-center bg-color-green-default xl:w-24 xl:h-24'>
          <PiGraph className='text-3xl text-white xl:text-4xl' />
        </div>

        <div className='flex flex-col p-2.5 items-center gap-4'>
        <p className='text-gray-800 text-md font-medium xl:text-lg'>강점 알고리즘</p>
          <p className='w-fit text-gray-800 text-xl font-bold whitespace-break-spaces text-center xl:text-2xl'>{strengthAlgorithm}</p>
        </div>
      </div>
    </div>
  );
}
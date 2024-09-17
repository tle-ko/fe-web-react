import React from 'react';
import { SiLevelsdotfyi } from "react-icons/si";
import { FaCode } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { PiGraph } from "react-icons/pi";

export default function MyPortfolioAnalysis({ level, language, dsaTag, strengthAlgorithm }) {
  return (
    <div className='w-full grid grid-cols-4 gap-6'>
      <div className='w-full col-span-1 p-10 rounded-3xl justify-start items-center gap-2.5 flex flex-col bg-color-pink-w50'>
        <div className='inline-flex w-24 h-24 rounded-full items-center justify-center bg-color-level3-pink'>
          <SiLevelsdotfyi size='32' color='#fff' />
        </div>

        <div className='w-full flex flex-col p-2.5 items-center gap-4'>
          <p className='text-gray-800 text-lg font-medium'>예상 적정 레벨</p>
          <p className='w-fit text-gray-800 text-2xl font-bold text-center'>레벨 {level}</p>
        </div>
      </div>

      <div className='w-full col-span-1 p-10 rounded-3xl justify-start items-center gap-2.5 flex flex-col bg-color-yellow-w50'>
        <div className='inline-flex w-24 h-24 rounded-full items-center justify-center bg-color-yellow-default'>
          <FaCode size='32' color='#fff' />
        </div>

        <div className='flex flex-col p-2.5 items-center gap-4'>
          <p className='text-gray-800 text-lg font-medium'>주로 풀이한 언어</p>
          <p className='w-fit text-gray-800 text-2xl font-bold whitespace-break-spaces text-center'>{language}</p>
        </div>
      </div>

      <div className='w-full col-span-1 p-10 rounded-3xl justify-start items-center gap-2.5 flex flex-col bg-color-blue-w50'>
        <div className='inline-flex w-24 h-24 rounded-full items-center justify-center bg-color-blue-main'>
          <FaTag size='32' color='#fff' />
        </div>

        <div className='flex flex-col p-2.5 items-center gap-4'>
          <p className='text-gray-800 text-lg font-medium'>주로 풀이한 태그</p>
          <p className='w-fit text-gray-800 text-lg font-bold whitespace-break-spaces text-center'>{dsaTag}</p>
        </div>
      </div>

      <div className='w-full col-span-1 p-10 rounded-3xl justify-start items-center gap-2.5 flex flex-col bg-color-green-w50'>
        <div className='inline-flex w-24 h-24 rounded-full items-center justify-center bg-color-green-default'>
          <PiGraph size='32' color='#fff' />
        </div>

        <div className='flex flex-col p-2.5 items-center gap-4'>
          <p className='text-gray-800 text-lg font-medium'>강점 알고리즘</p>
          <p className='w-fit text-gray-800 text-2xl font-bold whitespace-break-spaces text-center'>{strengthAlgorithm}</p>
        </div>
      </div>
    </div>
  );
}
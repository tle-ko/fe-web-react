import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/button";
import Level1 from "../../assets/images/lv1.svg";
import Level2 from "../../assets/images/lv2.svg";
import Level3 from "../../assets/images/lv3.svg";
import Leveln from "../../assets/images/lvN.svg";
import { FaBookOpen } from "react-icons/fa6";

export default function ProblemList({ data, pageIndex, numOfPage }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(data);
    setLoading(!data || data.length === 0);
  }, [data]);

  if (!data || data.length === 0) {
    return (        
    <div className="min-w-[29rem] w-full box mb-6">
      <div className="flex flex-col items-center gap-3 py-6 text-gray-600">
        <FaBookOpen color="#5383E8" size="3rem" />
        <p className="text-center">아직 문제를 등록하지 않았어요🥲 <br/>문제를 추가하고 TLE와 함께 해결해 나가요!</p>
      </div>
    </div>
    );
  }

  return (
      <>
      <div className="min-w-[29rem] cardGrid4 mb-16">
        {data.slice(pageIndex * numOfPage, (pageIndex + 1) * numOfPage).map((problem) => (
          <div className="box min-w-60 flex-col justify-start items-start inline-flex gap-6" key={problem.id}>
            <div className="w-full containerTitle justify-start items-center gap-3 inline-flex overflow-hidden">
              <img
                className='w-6 h-8'
                src={
                  problem.difficulty.value === 1 ? Level1 :
                  problem.difficulty.value === 2 ? Level2 :
                  problem.difficulty.value === 3 ? Level3 :
                  Leveln
                }
                alt="Level Icon"
              />
              <p className='w-full text-gray-900 text-2xl font-bold truncate'>{problem.title}</p>
            </div>
            <div className='w-full flex justify-end'>
              <Link to={`${problem.id}`}>
                <Button
                  buttonSize="detailBtn"
                  colorStyle="whiteBlack"
                  content="문제 상세"
                />
              </Link>
            </div>
          </div>

        ))}
                  </div>
      </>
  );
}
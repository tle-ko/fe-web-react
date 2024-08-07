import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/button";
import Level1 from "../../assets/images/lv1.svg";
import Level2 from "../../assets/images/lv2.svg";
import Level3 from "../../assets/images/lv3.svg";
import Leveln from "../../assets/images/lvN.svg";

export default function ProblemList({ data, pageIndex, numOfPage }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="cardGrid4 mb-16">
      {data && data.length > 0 ? (
        data.slice(pageIndex * numOfPage, (pageIndex + 1) * numOfPage).map((problem) => (
          <div key={problem.id} className="box flex-col justify-start items-start inline-flex gap-6">
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
                  onClick={() => console.log('Button clicked')}
                />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No problems found.</p>
      )}
    </div>
  );
}
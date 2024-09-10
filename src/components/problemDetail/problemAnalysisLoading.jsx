import React, { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import LoadingSpinner from '../common/analysisLoadingSpinner';


export default function ProblemAnalysisLoading({setActiveContainer}) {
    const [ideaData, setIdeaData] = useState([]);
    const [currentFact, setCurrentFact] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      fetch('/data/ideaData.json')
          .then(response => response.json())
          .then(data => {
            setIdeaData(data);
            if (data.length > 0) {
                setCurrentFact(data[0].fact);
            }
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }, []);

  useEffect(() => {
    if (ideaData.length > 0) {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const newIndex = (prevIndex + 1) % ideaData.length;
                setCurrentFact(ideaData[newIndex].fact);
                return newIndex;
            });
        }, 8000);

        return () => clearInterval(interval);
    }
  }, [ideaData]);

    return (
    <div className="flex mt-24 gap-10 w-full items-start">
    <button className="flex flex-col items-center gap-4 cursor-pointer group"
        onClick={() => setActiveContainer('detail')}>
        <div className="mt-10 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full group-hover:bg-color-blue-hover cursor-pointer">
          <FaChevronLeft size="1.5rem" color="white" />
        </div>
        <p className="text-center text-gray-600 text-lg font-semibold group-hover:text-color-blue-hover">문제<br />보기</p>
    </button>

      <div className="w-full h-fit box p-20">
        <div className="flex flex-col justify-center items-center m-10">
          <LoadingSpinner />
          <p className="text-gray-900 text-lg mt-20">문제 분석을 불러오는 중이에요!</p>
          <p className="text-gray-600 text-sm mt-4">{currentFact}</p>
        </div>
      </div>
    </div>
    )
}
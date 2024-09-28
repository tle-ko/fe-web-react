import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../common/analysisLoadingSpinner';


export default function ProblemAnalysisLoading() {
    const [ideaData, setIdeaData] = useState([]);
    const [currentFact, setCurrentFact] = useState('');

    useEffect(() => {
      fetch('/data/ideaData.json')
          .then(response => response.json())
          .then(data => {
            setIdeaData(data);
            if (data.length > 0 && data[0].fact) {
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
          setCurrentFact(prevFact => {
            const currentIndex = ideaData.findIndex(item => item.fact === prevFact);
            const newIndex = (currentIndex + 1) % ideaData.length;
            return ideaData[newIndex].fact;
          });
        }, 8000);

        return () => clearInterval(interval);
      }
    }, [ideaData]);

    return (
        <div className="w-full h-fit p-10">
          <div className="flex flex-col justify-center items-center m-10">
            <LoadingSpinner />
            <p className="text-gray-900 text-lg mt-20">문제 분석을 불러오는 중이에요!</p>
            <p className="text-gray-600 text-sm mt-4 whitespace-break-spaces">{currentFact}</p>
          </div>
        </div>
    );
}
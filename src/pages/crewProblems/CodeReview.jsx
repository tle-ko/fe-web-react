// 코드 리뷰 페이지
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProblemHeader from '../../components/crewProblems/crewProblemHeader';
import ReviewContainer from '../../components/codeReview/reviewContainer';
import SubmitProblemHeader from '../../components/crewProblems/submitProblemHeader';
import DataLoadingSpinner from '../../components/common/dataLoadingSpinner';
import CodeContainer from '../../components/codeReview/codeContainer';

export default function CodeReview() {
  const { problemId = 1 } = useParams();
  const [codeData, setCodeData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selection, setSelection] = useState({ start: null, end: null });
  const [highlightedLines, setHighlightedLines] = useState({ start: null, end: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [codeResponse, userResponse] = await Promise.all([
          fetch('/data/codeData.json'),
          fetch('/data/userData.json')
        ]);
        const codeData = await codeResponse.json();
        const userData = await userResponse.json();
        setCodeData(codeData);
        setUserData(userData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [problemId]);

  const handleSelectionChange = (start, end) => {
    setSelection({ start, end });
  };

  const resetSelection = () => {
    setSelection({ start: null, end: null });
  };

  const handleHighlightLine = (start, end) => {
    setHighlightedLines({ start, end });
  };

  if (!codeData || !userData) {
    return <DataLoadingSpinner />;
  }

  return (
    <div>
      <div className="fixed top-16 left-0 w-full z-10">
        <ProblemHeader problemId={parseInt(problemId, 10)} />
        <SubmitProblemHeader submitData={codeData} />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <CodeContainer
            code={codeData.code}
            onLineSelect={handleSelectionChange}
            highlightedLines={highlightedLines}
          />
        </div>
        <div className="col-span-4">
          <ReviewContainer
            selectedStart={selection.start}
            selectedEnd={selection.end}
            onResetSelection={resetSelection}
            onHighlightLine={handleHighlightLine}
            comments={codeData.comments.items}
            userData={userData}
          />
        </div>
      </div>
    </div>
  );
}
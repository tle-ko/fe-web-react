import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import SelectCode from '../../components/codeReview/selectCode';
import Footer from '../../components/common/footer';
import ProblemHeader from '../../components/crewProblems/crewProblemHeader';
import ReviewContainer from '../../components/codeReview/reviewContainer';
import SubmitterHeader from '../../components/crewProblems/submitterHeader';

const CodeReview = () => {
  const { problemId = 1 } = useParams(); // useParams hook to get URL params
  const [codeData, setCodeData] = useState(null);
  const [selection, setSelection] = useState({ start: null, end: null });
  const [highlightedLines, setHighlightedLines] = useState({ start: null, end: null });

  useEffect(() => {
    const fetchCodeData = async () => {
      try {
        // Hardcode URL to load data for problemId 1
        const response = await fetch('http://localhost:3000/data/codeData.json');
        const data = await response.json();
        setCodeData(data);
      } catch (error) {
        console.error('Failed to fetch code data:', error);
        setCodeData(null); // Handle the error and set state to null or an empty state
      }
    };

    fetchCodeData();
  }, []);

  // Data for the submitter header, hardcoded for demonstration
  const submitter = {
    name: codeData ? codeData.created_by.username : 'Unknown User',
    time: codeData ? new Date(codeData.created_at).toLocaleString() : 'Unknown Time',
    status: codeData ? (codeData.is_correct ? '맞았습니다' : '틀렸습니다') : 'Unknown Status',
  };

  const handleSelectionChange = (start, end) => {
    setSelection({ start, end });
  };

  const resetSelection = () => {
    setSelection({ start: null, end: null });
  };

  const handleHighlightLine = (start, end) => {
    if (highlightedLines.start === start && highlightedLines.end === end) {
      setHighlightedLines({ start: null, end: null });
    } else {
      setHighlightedLines({ start, end });
    }
  };

  return (
    <div>
      <div className="main-content mt-20">
        <div className='relative z-30'>
          <ProblemHeader problemId={parseInt(problemId, 10)} />
          <SubmitterHeader submitter={submitter} />
        </div>

        <div className="flex">
          <div className="w-3/4">
            {codeData ? (
              <SelectCode
                code={codeData.code}
                onSelectionChange={handleSelectionChange}
                highlightedStart={highlightedLines.start}
                highlightedEnd={highlightedLines.end}
              />
            ) : (
              <p>Loading code data...</p>
            )}
          </div>

          <ReviewContainer
            selectedStart={selection.start}
            selectedEnd={selection.end}
            onResetSelection={resetSelection}
            onHighlightLine={handleHighlightLine}
            comments={codeData ? codeData.comments.items : []}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CodeReview;

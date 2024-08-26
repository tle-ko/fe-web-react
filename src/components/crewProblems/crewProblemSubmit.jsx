import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import CodeBox from '../../components/codeReview/codeBox';
import Button from '../../components/common/button';
import Footer from '../../components/common/footer';
import ProblemHeader from './crewProblemHeader';
import SubmitByHeader from './submitByHeader';
import Dropdown from '../../components/common/dropDown';
import CodeReview from '../../pages/crewProblems/CodeReview'; 

const CrewProblemSubmit = () => {
  const { problemId: paramProblemId, id: paramId } = useParams();
  const problemId = paramProblemId ? parseInt(paramProblemId, 10) : 1; 
  const id = paramId ? parseInt(paramId, 10) : 1; 

  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCorrectness, setSelectedCorrectness] = useState('');
  const [showCodeReview, setShowCodeReview] = useState(false);

  const languageOptions = [
    'Python',
    'Java',
    'JavaScript',
    'C',
    'C#',
    'C++',
    'Ruby',
  ];

  const correctnessOptions = [
    '정답',
    '오답',
  ];

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleCorrectnessChange = (event) => {
    setSelectedCorrectness(event.target.value);
  };

  const handleSubmit = () => {
    setShowCodeReview(true); 
  };

  return (
    <div>
      {showCodeReview ? (
        <>
          <CodeReview />
          <Footer />
        </>
      ) : (
        <>
          <ProblemHeader problemId={problemId} />
          <SubmitByHeader id={id} />

          <div className="flex flex-row items-center mt-20 mb-10 px-24">
            <div className="mr-10 mt-5">
              <div className="text-lg mb-3 font-semibold">언어</div>
              <Dropdown
                options={languageOptions}
                placeholder="언어 선택"
                onChange={handleLanguageChange}
              />
            </div>
            <div className="mr-10 mt-5">
              <div className="text-lg mb-3 font-semibold">정답여부</div>
              <Dropdown
                options={correctnessOptions}
                placeholder="정답여부"
                onChange={handleCorrectnessChange}
              />
            </div>
          </div>

          <div className="flex flex-col px-24">
            <div className="text-lg mb-3 font-semibold">소스코드</div>
            <CodeBox setCode={setCode} />
            <div className='mt-10 flex justify-center'>
              <Button
                buttonSize="formBtn"
                colorStyle="blueWhite"
                content="문제 등록하기"
                onClick={handleSubmit}
                width="1/5"
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default CrewProblemSubmit;


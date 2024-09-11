import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import CodeBox from '../../components/codeReview/codeBox';
import Button from '../../components/common/button';
import ProblemHeader from './crewProblemHeader';
import SubmitByHeader from './submitByHeader';
import Dropdown from '../../components/common/dropDown';

const CrewProblemSubmit = () => {
  const { problemId, id } = useParams();  // crew ID 및 problem ID 얻기
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCorrectness, setSelectedCorrectness] = useState('');
  const navigate = useNavigate(); // URL 경로 변경을 위한 useNavigate

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
    // 제출이 완료되면 URL로 이동
    const submitId = 1; // 실제 제출 후 생성된 ID 값으로 대체 필요
    navigate(`/crew/${id}/problems/${problemId}/submit/${submitId}`);
  };

  return (
    <div>
      <ProblemHeader problemId={parseInt(problemId, 10)} />
      <SubmitByHeader id={parseInt(id, 10)} />

      <div className="flex flex-row items-center mt-20 mb-10 px-24">
        <div className="mr-10 mt-5">
          <div className="text-lg mb-3 font-semibold">언어</div>
          <Dropdown
            options={languageOptions}
            placeholder="언어 선택"
            selected={selectedLanguage}  // 선택된 언어 표시
            onChange={handleLanguageChange}
          />
        </div>
        <div className="mr-10 mt-5">
          <div className="text-lg mb-3 font-semibold">정답여부</div>
          <Dropdown
            options={correctnessOptions}
            placeholder="정답여부"
            selected={selectedCorrectness}  // 선택된 정답여부 표시
            onChange={handleCorrectnessChange}
          />
        </div>
      </div>

      <div className="flex flex-col px-24">
        <div className="text-lg mb-3 font-semibold">소스코드</div>
        <CodeBox />
        <div className='mt-10 flex justify-center'>
          <Button
            buttonSize="formBtn"
            colorStyle="blueWhite"
            content="풀이 제출하기"
            onClick={handleSubmit}
            width="1/5"
          />
        </div>
      </div>
    </div>
  );
};

export default CrewProblemSubmit;

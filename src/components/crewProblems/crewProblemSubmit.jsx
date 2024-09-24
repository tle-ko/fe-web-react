import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import CodeBox from './codeBox';
import Button from '../../components/common/button';
import ProblemHeader from './crewProblemHeader';
import SubmitByHeader from './submitByHeader';
import Dropdown from '../../components/common/dropDown';

const CrewProblemSubmit = () => {
  const navigate = useNavigate();
  const { problemId: paramProblemId, id: paramId } = useParams();
  const problemId = paramProblemId ? parseInt(paramProblemId, 10) : 1; 
  const id = paramId ? parseInt(paramId, 10) : 1; 

  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCorrectness, setSelectedCorrectness] = useState('');

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

        <div className="flex flex-col gap-6 justify-start mt-24">
          <div className="inline-flex items-center gap-6">
              <div className="flex flex-col justify-start">
                <p className="text-lg mb-3 font-semibold">언어</p>
                <Dropdown
                  options={languageOptions}
                  placeholder="언어 선택"
                  selected={selectedLanguage}  // 선택된 언어 표시
                  onChange={handleLanguageChange}
                />
              </div>
              <div className="flex flex-col justify-start">
                <p className="text-lg mb-3 font-semibold">정답 여부</p>
                <Dropdown
                  options={correctnessOptions}
                  placeholder="정답여부"
                  selected={selectedCorrectness}  // 선택된 정답여부 표시
                  onChange={handleCorrectnessChange}
                />
              </div>
            </div>

            <div className="w-full flex flex-col justify-start">
              <p className="text-lg mb-3 font-semibold">소스코드</p>
              <CodeBox setCode={setCode}/>
              <div className='mt-10 flex justify-center'>
                <Button
                  buttonSize="formBtn"
                  colorStyle="blueWhite"
                  content="풀이 제출하기"
                  onClick={handleSubmit}
                />
              </div>
            </div>
        </div>
    </div>
  );
};

export default CrewProblemSubmit;
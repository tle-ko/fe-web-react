import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import CodeBox from './codeBox';
import Button from '../../components/common/button';
import ProblemHeader from './crewProblemHeader';
import Dropdown from '../../components/common/dropDown';
import { client } from '../../utils';

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
    'C',
    'C#',
    'C++',
    'Java',
    'JavaScript',
    'Swift',
    'Kotlin'
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

  const handleSubmission = async () => {
    const submitData = {
      code,
      language: selectedLanguage,
      is_correct: selectedCorrectness === '정답'
    };

    try {
      const response = await client.post(`/crew/activity/problem/${problemId}/submission`, submitData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const submissionId = response.data.id; // 서버에서 반환된 제출 ID 사용
        alert('제출이 완료되었어요!');
        navigate(`/crew/${id}/problems/${problemId}/submission/${submissionId}`);
      } else {
        console.error('Submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting code:', error);
    }
  };


  return (
    <div>
        <ProblemHeader problemId={parseInt(problemId, 10)} />
        <div className="flex flex-col gap-6 justify-start mt-10">
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
                  onClick={handleSubmission}
                />
              </div>
            </div>
        </div>
    </div>
  );
};

export default CrewProblemSubmit;
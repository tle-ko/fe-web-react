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

  // 상태값 정의
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCorrectness, setSelectedCorrectness] = useState('');

  // 언어 선택 리스트
  const languageOptions = [
    'Python', 'C', 'C#', 'C++', 'Java', 'JavaScript', 'Swift', 'Kotlin'
  ];

  // 정답 여부 리스트
  const correctnessOptions = ['정답', '오답'];

  // 언어 선택 처리 함수
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  // 정답 여부 선택 처리 함수
  const handleCorrectnessChange = (event) => {
    setSelectedCorrectness(event.target.value);
  };

  // 제출 처리 함수
  const handleSubmission = async () => {
    // 선택된 정답 여부를 boolean으로 변환
    const submitData = {
      code, // codeBox로부터 받은 코드를 그대로 전송
      language: selectedLanguage.toLowerCase(), // 선택된 언어를 소문자로 변환하여 전송
      is_correct: selectedCorrectness === '정답' // 정답 여부를 true/false로 변환
    };

    try {
      const response = await client.post(
        `/api/v1/crew/activity/problem/${problemId}/submission`,
        submitData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        const submissionId = response.data.id; 
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
          <CodeBox setCode={setCode} />  {/* codeBox에서 코드 상태를 받아옴 */}
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

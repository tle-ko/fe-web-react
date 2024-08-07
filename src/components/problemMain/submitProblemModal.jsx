import React, { useState } from "react";
import Modal from "../../components/common/modal";
import Alert from "../../components/common/alertContainer";
import Input from "../../components/common/input";
import Textarea from "../../components/common/textarea";

export default function SubmitProblemModal({ isOpen, onClose, onSubmit }) {
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [memoryLimit, setMemoryLimit] = useState('');
  const [problemUrl, setProblemUrl] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [outputDescription, setOutputDescription] = useState('');

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setState(value);
    } else {
      e.target.value = '';
    }
  };

  const handleRegisterProblem = () => {
    const requiredFields = [title, timeLimit, memoryLimit, problemUrl, problemDescription, inputDescription, outputDescription];
    const allFieldsFilled = requiredFields.every(field => field.trim() !== '');

    if (!allFieldsFilled) {
      alert('모든 필수 항목을 작성해 주세요');
    } else {
      setShowAlert(true);
      onSubmit({ title, timeLimit, memoryLimit, problemUrl, problemDescription, inputDescription, outputDescription });
    }
  };

  const formContent = (
    <div className="w-full flex flex-col gap-10 mt-10">
      <Input title="문제 제목" placeholder="제목을 작성해 주세요" onChange={(e) => setTitle(e.target.value)}/>
      <div className="w-full flex flex-wrap items-start gap-6">
        <Input title="시간 제한" placeholder="초" width="8.875" onChange={(e) => handleInputChange(e, setTimeLimit)} />
        <Input title="메모리 제한" placeholder="MB" width="8.875" onChange={(e) => handleInputChange(e, setMemoryLimit)} />
        <Input title="문제 URL" placeholder="백준 URL을 작성해 주세요" width="21" onChange={(e) => setProblemUrl(e.target.value)} />
      </div>
      <Textarea title="문제" placeholder="문제를 작성해 주세요" height="12" onChange={(e) => setProblemDescription(e.target.value)} />
      <Textarea title="입력" placeholder="입력 조건을 작성해 주세요" height="12" onChange={(e) => setInputDescription(e.target.value)}/>
      <Textarea title="출력" placeholder="출력 조건을 작성해 주세요" height="12" onChange={(e) => setOutputDescription(e.target.value)}/>
    </div>
  );

  const alertContent = <Alert type="check" content="문제가 등록되었습니다." />;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="문제 등록하기"
      content={showAlert ? alertContent : formContent}
      buttonText="문제 등록하기"
      onButtonClick={handleRegisterProblem}
    />
  );
}
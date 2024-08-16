import React, { useState } from "react";
import Modal from "../../components/common/modal";
import Alert from "../../components/common/alertContainer";
import Input from "../../components/common/input";
import Textarea from "../../components/common/textarea";

import {client} from "../../utils";

export default function SubmitProblemModal({ isOpen, onClose, onSubmit }) {
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [memoryLimit, setMemoryLimit] = useState('');
  const [problemUrl, setProblemUrl] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [outputDescription, setOutputDescription] = useState('');

  const isValidUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  };

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setState(value);
    } else {
      e.target.value = '';
    }
  };

  const handleRegisterProblem = async() => {
    const requiredFields = [title, timeLimit, memoryLimit, problemDescription, inputDescription, outputDescription]; // 문제 URL은 선택 항목
    const allFieldsFilled = requiredFields.every(field => field.trim() !== '');

    if (!allFieldsFilled) {
      alert('모든 필수 항목을 작성해 주세요!');
      return;
    } 

    if (problemUrl && !isValidUrl(problemUrl)) {
      alert('유효한 URL을 입력해 주세요!');
      return;
    }

    const problemData = {
      title,
      link: problemUrl,
      description: problemDescription,
      input_description: inputDescription,
      output_description: outputDescription,
      memory_limit_megabyte: parseInt(memoryLimit, 10),
      time_limit_second: parseInt(timeLimit, 10),
    };

    try {
      const response = await client.post('/api/v1/problems/', problemData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setShowAlert(true);
        onSubmit(problemData);
      } else {
        console.log('문제 등록 중 오류가 발생했습니다:', response.statusText);
      }
    } catch (error) {
      alert(`문제 등록 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const handleClose = () => {
    onClose();
    window.location.reload();
  };

  const formContent = (
    <div className="w-full flex flex-col gap-10 mt-10">
      <Input title="문제 제목" placeholder="제목을 작성해 주세요" onChange={(e) => setTitle(e.target.value)}/>
      <div className="w-full inline-flex flex-wrap items-start gap-6">
        <div className="w-fit">
        <Input title="시간 제한" placeholder="초" width="8.875" onChange={(e) => handleInputChange(e, setTimeLimit)} />
        </div>
        <div className="w-fit">
        <Input title="메모리 제한" placeholder="MB" width="8.875" onChange={(e) => handleInputChange(e, setMemoryLimit)} />
        </div>
        <div className="w-fit">
        <Input title="문제 URL" placeholder="백준 URL을 작성해 주세요 (선택)" width="21" onChange={(e) => setProblemUrl(e.target.value)} />
        </div>
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
      onClose={handleClose}
      title="문제 등록하기"
      content={showAlert ? alertContent : formContent}
      buttonText={showAlert ? "" : "문제 등록하기"}
      onButtonClick={handleRegisterProblem}
    />
  );
}
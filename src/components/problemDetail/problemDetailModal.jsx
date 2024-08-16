import React, { useState, useEffect } from "react";
import Modal from "../../components/common/modal";
import Alert from "../../components/common/alertContainer";
import Input from "../../components/common/input";
import Textarea from "../../components/common/textarea";

import { client } from "../../utils"

export default function ProblemDetailModal({ isOpen, onClose, problemData, isDeleteModal }) {
  const [showAlert, setShowAlert] = useState(false);
  const [timeLimit, setTimeLimit] = useState('');
  const [memoryLimit, setMemoryLimit] = useState('');
  const [title, setTitle] = useState('');
  const [problemUrl, setProblemUrl] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [outputDescription, setOutputDescription] = useState('');

  useEffect(() => {
    if (problemData) {
      setTimeLimit(problemData.time_limit.value);
      setMemoryLimit(problemData.memory_limit.value);
      setTitle(problemData.title);
      setProblemUrl(problemData.link);
      setProblemDescription(problemData.description);
      setInputDescription(problemData.input_description);
      setOutputDescription(problemData.output_description);
    }
  }, [problemData]);

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
    const stringFields = [title, problemDescription, inputDescription, outputDescription];
    const numberFields = [timeLimit, memoryLimit];
  
    const allStringFieldsFilled = stringFields.every(field => field.trim() !== '');
    const allNumberFieldsFilled = numberFields.every(field => field !== '');
  
    if (!allStringFieldsFilled || !allNumberFieldsFilled) {
      alert('모든 필수 항목을 작성해 주세요!');
      return;
    } 
  
    if (problemUrl && !isValidUrl(problemUrl)) {
      alert('유효한 URL을 입력해 주세요!');
      return;
    }  

    const data = {
      title,
      link: problemUrl,
      description: problemDescription,
      input_description: inputDescription,
      output_description: outputDescription,
      memory_limit_megabyte: parseInt(memoryLimit, 10),
      time_limit_second: parseInt(timeLimit, 10),
    };

    try {
      const response = await client.put(`/api/v1/problems/${problemData.id}/detail`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setShowAlert(true);
      } else {
        console.log('문제 수정 중 오류가 발생했습니다:', response.statusText);
      }
    } catch (error) {
      alert(`문제 수정 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const handleClose = () => {
    onClose();
    window.location.reload();
  };

  const formContent = (
    <div className="w-full flex flex-col gap-10 mt-10">
      <Input title="문제 제목" placeholder="제목을 작성해 주세요" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className="w-full inline-flex flex-wrap items-start gap-6">
        <div className="w-fit">
          <Input title="시간 제한" placeholder="초" width="8.875" value={timeLimit} onChange={(e) => handleInputChange(e, setTimeLimit)} />
        </div>
        <div className="w-fit">
        <Input title="메모리 제한" placeholder="MB" width="8.875" value={memoryLimit} onChange={(e) => handleInputChange(e, setMemoryLimit)} />
        </div>
        <div className="w-fit">
        <Input title="문제 URL" placeholder="백준 URL을 작성해 주세요" width="21" value={problemUrl} onChange={(e) => setProblemUrl(e.target.value)} />
        </div>
      </div>
      <Textarea title="문제" placeholder="문제를 작성해 주세요" height="12" value={problemDescription} onChange={(e) => setProblemDescription(e.target.value)} />
      <Textarea title="입력" placeholder="입력 조건을 작성해 주세요" height="12" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
      <Textarea title="출력" placeholder="출력 조건을 작성해 주세요" height="12" value={outputDescription} onChange={(e) => setOutputDescription(e.target.value)} />
    </div>
  );

  const handleDelete = async () => {
    try {
      const response = await client.delete(`/api/v1/problems/${problemData.id}/detail`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 204) {
        alert("문제가 삭제되었어요!");
        onClose();
        window.location.href = '/problem';
      } else {
        console.log('문제 삭제 중 오류가 발생했습니다:', response.statusText);
      }
    } catch (error) {
      alert(`문제 삭제 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const alertContent = <Alert type="check" content="문제가 수정되었습니다." />;

  return (
    <>
      {isDeleteModal ? (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          content={
            <Alert
              type="delete"
              content="정말 문제를 삭제할까요?"
              buttonContent="문제 삭제하기"
              onButtonClick={handleDelete}
            />
          }
        />
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          title="문제 수정"
          content={showAlert ? alertContent : formContent}
          buttonText={showAlert ? "" : "저장하기"}
          onButtonClick={handleRegisterProblem}
        />
      )}
    </>
  );
}
import React, { useState, useEffect } from "react";
import Modal from "../../components/common/modal";
import AlertContainer from "../../components/common/alertContainer";
import Input from "../../components/common/input";
import Textarea from "../../components/common/textarea";

export default function ProblemDetailModal({ isOpen, onClose, problemData, isDeleteModal }) {
  const [timeLimit, setTimeLimit] = useState('');
  const [memoryLimit, setMemoryLimit] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [outputDescription, setOutputDescription] = useState('');

  useEffect(() => {
    if (problemData) {
      setTimeLimit(problemData.time_limit.value);
      setMemoryLimit(problemData.memory_limit.value);
      setTitle(problemData.title);
      setUrl(problemData.link);
      setDescription(problemData.description);
      setInputDescription(problemData.input_description);
      setOutputDescription(problemData.output_description);
    }
  }, [problemData]);

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setState(value);
    } else {
      e.target.value = '';
    }
  };

  const content = (
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
        <Input title="문제 URL" placeholder="백준 URL을 작성해 주세요" width="21" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
      </div>
      <Textarea title="문제" placeholder="문제를 작성해 주세요" height="12" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Textarea title="입력" placeholder="입력 조건을 작성해 주세요" height="12" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
      <Textarea title="출력" placeholder="출력 조건을 작성해 주세요" height="12" value={outputDescription} onChange={(e) => setOutputDescription(e.target.value)} />
    </div>
  );

  const handleSubmit = () => {
    onClose();
    alert("문제가 수정되었습니다.");
  };

  const handleDelete = () => {
    onClose();
    alert("문제가 삭제되었습니다.");
  };

  return (
    <>
      {isDeleteModal ? (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          content={
            <AlertContainer
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
          onClose={onClose}
          title="문제 수정"
          content={content}
          buttonText="저장"
          onButtonClick={handleSubmit}
        />
      )}
    </>
  );
}
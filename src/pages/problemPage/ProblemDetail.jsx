import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ProblemHeader from "../../components/Header/problemHeader";
import ProblemDetailNav from "../../components/nav/problemDetailNav";
import ProblemAnalysis from '../../components/problemAnalysisContainer';
import ProblemAnalysisLoading from '../../components/problemMain/problemAnalysisLoading';
import Modal from "../../components/common/modal";
import Input from "../../components/common/input";
import AlertContainer from "../../components/common/alertContainer";
import { FaChevronRight } from "react-icons/fa";

export default function ProblemDetail() {
  const { id } = useParams(); // 현재 URL에서 문제 ID 가져오기
  const [ problemData, setProblemData ] = useState(null); // 문제 데이터를 저장할 상태
  const [ activeContainer, setActiveContainer ] = useState("detail");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const [timeLimit, setTimeLimit] = useState('');
  const [memoryLimit, setMemoryLimit] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [outputDescription, setOutputDescription] = useState('');

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsModalOpen(false);
    setSelectedProblem(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const handleDeleteProblem = () => {
    handleCloseDeleteModal();
    alert("문제가 삭제되었습니다.");
  };

  const handleActiveContainer = () => {
    setActiveContainer("analysis");
  }


  const handleEditClick = () => {
    setSelectedProblem(problemData);
    if (problemData) {
      setTimeLimit(problemData.time_limit);
      setMemoryLimit(problemData.memory_limit);
      setTitle(problemData.title);
      setUrl(problemData.link);
      setDescription(problemData.description);
      setInputDescription(problemData.input_description);
      setOutputDescription(problemData.output_description);
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setState(value);
    } else {
      e.target.value = ''; // 숫자가 아니면 입력 필드의 값을 빈 문자열로 설정
    }
  };

  const content = (
    <div className="w-full flex flex-col gap-10 mt-10">
      <Input title="문제 제목" placeholder="제목을 작성해 주세요" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className="w-full flex flex-wrap items-start gap-6">
        <Input title="시간 제한" placeholder="초" width="8.875" value={timeLimit} onChange={(e) => handleInputChange(e, setTimeLimit)} />
        <Input title="메모리 제한" placeholder="MB" width="8.875" value={memoryLimit} onChange={(e) => handleInputChange(e, setMemoryLimit)} />
        <Input title="문제 URL" placeholder="백준 URL을 작성해 주세요" width="21" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <Input title="문제" placeholder="문제를 작성해 주세요" height="12" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Input title="입력" placeholder="입력 조건을 작성해 주세요" height="12" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
      <Input title="출력" placeholder="출력 조건을 작성해 주세요" height="12" value={outputDescription} onChange={(e) => setOutputDescription(e.target.value)} />
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/data/problemData.json`);
      const jsonData = await response.json();
      const problemDetail = jsonData.find(problem => problem.id === parseInt(id)); // ID에 해당하는 문제 데이터 찾기
      setProblemData(problemDetail); // 찾은 데이터를 상태로 설정
    };
    fetchData();
  }, [id]); // 의존성 배열에 id 추가하여 변경될 때마다 데이터를 다시 가져옴

  useEffect(() => {
    if (problemData) {
      setTimeLimit(problemData.time_limit);
      setMemoryLimit(problemData.memory_limit);
      setTitle(problemData.title);
      setUrl(problemData.link);
      setDescription(problemData.description);
      setInputDescription(problemData.input_description);
      setOutputDescription(problemData.output_description);
    }
  }, [problemData]);

  if (!problemData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">  
      <div className="top-16 left-0 fixed flex flex-col">
        <ProblemHeader problemId={id} />
        <ProblemDetailNav 
          problemId={id} 
          problemData={problemData} 
          onEditClick={handleEditClick} 
          onDeleteClick={handleDeleteClick} 
        />
      </div>
      {activeContainer === "detail" && (
        <div className="flex mt-24 gap-6">
          <div className="box w-full flex-col inline-flex">
            <div className="mb-6 justify-start items-center gap-6 inline-flex">
              <div className="mb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
                <p className="text-gray-900 text-lg font-bold">시간 제한</p>
                <p className="text-gray-900 leading-relaxed">{problemData.time_limit} 초</p>
              </div>
              <div className="mb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
                <p className="text-gray-900 text-lg font-bold">메모리 제한</p> 
                <p className="text-gray-900 leading-relaxed">{problemData.memory_limit} MB</p>
              </div>
            </div>
            <div className="mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
              <p className="text-gray-900 text-lg font-bold">문제</p> 
              <p className="text-gray-900 text-base leading-7">{problemData.description}</p>
            </div>
            <div className="mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
              <p className="text-gray-900 text-lg font-bold">입력</p> 
              <p className="text-gray-900 text-base leading-7">{problemData.input_description}</p>
            </div>
            <div className="mb-6 pb-3 flex-col justify-start items-start gap-3 inline-flex border-b border-gray-200">
              <p className="text-gray-900 text-lg font-bold">출력</p> 
              <p className="text-gray-900 text-base leading-7">{problemData.output_description}</p>
            </div>
          </div>
          <button className="flex flex-col gap-4 cursor-pointer group" onClick={handleActiveContainer}>
            <div className="mt-10 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full group-hover:bg-color-blue-main cursor-pointer">
              <FaChevronRight size="1.5rem" color="white" />    
            </div>
            <p className="text-center text-gray-600 text-lg font-semibold group-hover:text-color-blue-main">TLE<br/>분석<br/>리포트</p>
          </button>
        </div>
      )}

      {activeContainer === "analysis" && (
        problemData.analysis && problemData.analysis.length > 0 ? (
          <ProblemAnalysis setActiveContainer={setActiveContainer} analysisData={problemData.analysis} />
        ) : (
          <ProblemAnalysisLoading setActiveContainer={setActiveContainer} />
        )
      )}


  <Modal
      isOpen={isModalOpen}
      onClose={handleCloseEditModal}
      title="문제 수정"
      content={selectedProblem ? content : null}
      buttonText="저장"
      onButtonClick={() => {
        handleCloseEditModal();
        alert("문제가 수정되었습니다.");
      }}
    />

    <Modal
      isOpen={isDeleteOpen}
      onClose={handleCloseDeleteModal}
      content={
        <AlertContainer
          type="delete"
          content="정말 문제를 삭제할까요?"
          buttonContent="문제 삭제하기"
          onButtonClick={handleDeleteProblem}
        />
      }
    />
    </div>
  );
}
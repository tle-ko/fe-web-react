import React, { useState, useEffect } from 'react';
import Modal from '../common/modal';
import search from '../../assets/images/search.svg';
import lvN from '../../assets/images/lvN.svg';
import lv1 from '../../assets/images/lv1.svg';
import lv2 from '../../assets/images/lv2.svg';
import lv3 from '../../assets/images/lv3.svg';

const levelImages = {
  N: lvN,
  1: lv1,
  2: lv2,
  3: lv3,
};

const AddProblemModal = ({
  isOpen,
  onClose,
  problems,
  selectedProblems,
  onSelectProblem,
  onAddProblems,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProblems, setFilteredProblems] = useState([]);

  // 검색어에 따라 문제 필터링
  useEffect(() => {
    setFilteredProblems(problems);
  }, [problems]);

  // 콘솔로 데이터 확인
  useEffect(() => {
    if (isOpen) {
      console.log('Selected Problems:', selectedProblems); // 선택된 문제들 확인
      console.log('Problems:', problems); // 전체 문제 목록 확인
    }
  }, [isOpen, selectedProblems, problems]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = problems.filter((problem) =>
      problem.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProblems(filtered);
  };

  const getDifficultyImage = (analysis) => {
    if (analysis && analysis.difficulty) {
      return levelImages[analysis.difficulty.value];
    }
    return levelImages['N'];
  };

  const renderSelectedProblems = (problems) => {
    const columns = [[], []];
    problems.forEach((problem, index) => {
      const columnIndex = index < 4 ? 0 : 1;
      columns[columnIndex].push(
        <div className="flex w-full justify-center" key={problem.problem_ref_id}>
          <div className="mr-2 mt-5 font-medium">
            {problem.order ? `${problem.order}번 문제` : '문제'}
          </div>
          <div className="m-2 flex h-10 w-3/5 items-center justify-start gap-3 rounded-3xl border border-gray-200 p-5">
            <img
              src={getDifficultyImage(problem.analysis)}
              alt={`Level ${problem.analysis && problem.analysis.difficulty && problem.analysis.difficulty.value}`}
              className="h-6 w-6"
            />
            <div>{problem.title}</div>
          </div>
        </div>
      );
    });

    return (
      <div className="flex">
        <div className="flex w-full flex-col">{columns[0]}</div>
        <div className="flex w-full flex-col">{columns[1]}</div>
      </div>
    );
  };

  // 저장하기 클릭 시 선택된 problem_ref_id 배열 전달
  const handleSaveProblems = () => {
    onAddProblems(selectedProblems); // 선택된 problem_ref_id 배열 전달
  };

  // 모달의 메인 컨텐츠
  const addProblemModalContent = (
    <div className="flex flex-col items-center gap-6">
      <div className="mt-10 flex w-full flex-col gap-6">
        <h2 className="text-lg font-semibold">문제 검색</h2>
        <div className="border-g-600 flex h-10 w-full rounded-lg border bg-gray-200 p-2 text-sm font-medium text-gray-600">
          <img src={search} alt="search" className="ml-2 mr-2 mt-1 h-4 w-4" />
          <input
            type="text"
            placeholder=" 본인이 등록한 문제의 제목으로 검색해 주세요."
            className="text-g-600 flex-grow bg-transparent"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="problemGrid3 w-full rounded-md px-20 py-4">
        {filteredProblems.map((problem) => (
          <div
            key={problem.problem_ref_id}
            className={`m-2 flex h-10 w-full cursor-pointer items-center justify-start rounded-[1.25rem] border-2 p-5 ${
              selectedProblems.includes(problem.problem_ref_id)
                ? 'border-blue-500 bg-white'
                : 'border-gray-200 bg-white'
            }`}
            onClick={() => {
              if (
                selectedProblems.length >= 8 &&
                !selectedProblems.includes(problem.problem_ref_id)
              ) {
                alert('최대 8개의 문제만 등록 가능해요');
                return;
              }
              onSelectProblem(problem);
            }}
          >
            <img
              src={getDifficultyImage(problem.analysis)}
              alt={`Level ${problem.analysis && problem.analysis.difficulty && problem.analysis.difficulty.value}`}
              className="mr-2 h-6 w-6"
            />
            {problem.title}
          </div>
        ))}
      </div>

      <div className="flex h-fit w-4/5 flex-col rounded-lg bg-white">
        <div className="mt-2 text-center text-base ">
          풀이할 문제는 회차 당 8개까지 등록 가능합니다.
        </div>
        <div className="mb-4 mt-4">
          {renderSelectedProblems(
            selectedProblems
              .map((problemId) => {
                const selectedProblem = problems.find(
                  (problem) => problem.problem_ref_id === problemId
                );
                return selectedProblem;
              })
              .filter(Boolean) || []
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="문제 추가"
      content={addProblemModalContent}
      buttonText="저장하기"
      onButtonClick={handleSaveProblems}
    />
  );
};

export default AddProblemModal;

import React, { useState, useEffect } from 'react';
import Modal from '../common/modal'; 
import search from '../../assets/images/search.svg';
import lvN from '../../assets/images/lvN.svg';
import lv1 from '../../assets/images/lv1.svg';
import lv2 from '../../assets/images/lv2.svg';
import lv3 from '../../assets/images/lv3.svg';

const levelImages = {
  'N': lvN,
  1: lv1,
  2: lv2,
  3: lv3,
};

const AddProblemModal = ({ isOpen, onClose, problems, selectedProblems, onSelectProblem, onAddProblems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProblems, setFilteredProblems] = useState([]);

  useEffect(() => {
    setFilteredProblems(problems);
  }, [problems]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = problems.filter(problem =>
      problem.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProblems(filtered);
  };

  const getDifficultyImage = (analysis) => {
    if (analysis && analysis.length > 0 && analysis[0].difficulty !== undefined) {
      return levelImages[analysis[0].difficulty];
    }
    return levelImages['N'];
  };

  const renderSelectedProblems = (problems) => {
    const columns = [[], []];
    problems.forEach((problem, index) => {
      const columnIndex = index < 4 ? 0 : 1;
      columns[columnIndex].push(
        <div className='flex w-full justify-center' key={problem.id}> 
          <div className="font-medium mt-5 mr-2">{index + 1}번 문제</div>
          <div className="w-3/5 h-10 m-2 gap-3 rounded-3xl flex items-center justify-start border border-gray-200 p-5">
            <img src={getDifficultyImage(problem.analysis)} alt={`Level ${problem.analysis && problem.analysis[0] && problem.analysis[0].difficulty}`} className="w-6 h-6" />
            <div>{problem.title}</div>
          </div>
        </div>
      );
    });
  
    return (
      <div className="flex">
        <div className="flex flex-col w-full">{columns[0]}</div>
        <div className="flex flex-col w-full">{columns[1]}</div>
      </div>
    );
  };

  const addProblemModalContent = (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full mt-10 flex flex-col gap-6">
        <h2 className='font-semibold text-lg'>문제 검색</h2>
        <div className="w-full h-10 border border-g-600 bg-gray-200 rounded-lg flex p-2 text-gray-600 font-medium text-sm">
          <img src={search} alt="search" className="w-4 h-4 mt-1 ml-2 mr-2" />
          <input
            type="text"
            placeholder=" 본인이 등록한 문제의 제목으로 검색해 주세요."
            className="bg-transparent flex-grow text-g-600"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="w-full problemGrid3 px-20 py-4 rounded-md">
        {filteredProblems.map((problem) => (
          <div
            key={problem.id}
            className={`w-full h-10 m-2 rounded-[1.25rem] flex items-center justify-start cursor-pointer border-2 p-5 ${
              selectedProblems.includes(problem.id)
                ? 'bg-white border-blue-500'
                : 'bg-white border-gray-200'
            }`}
            onClick={() => {
              if (selectedProblems.length >= 8 && !selectedProblems.includes(problem.id)) {
                alert('최대 8개의 문제만 등록 가능해요');
                return;
              }
              onSelectProblem(problem);
            }}
          >
            <img src={getDifficultyImage(problem.analysis)} alt={`Level ${problem.analysis && problem.analysis[0] && problem.analysis[0].difficulty}`} className="w-6 h-6 mr-2" />
            {problem.title}
          </div>
        ))}
      </div>
      <div className="w-4/5 h-fit bg-white rounded-lg flex flex-col">
        <div className="text-center mt-2 text-base ">
          풀이할 문제는 회차 당 8개까지 등록 가능합니다.
        </div>
        <div className="mt-4 mb-4">
          {renderSelectedProblems(
            selectedProblems.map(problemId => problems.find(problem => problem.id === problemId)) || []
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
      onButtonClick={onAddProblems}
    />
  );
};

export default AddProblemModal;
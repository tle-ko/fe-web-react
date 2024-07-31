/* 룸 대시보드 관리 - 사이드 네브바 - 문제 관리 */

import React, { useState, useEffect } from 'react';
import Modal from '../common/modal'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import Button from '../common/button'; 
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

export default function AdminProblem() {
  const [sequences, setSequences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [currentSequenceId, setCurrentSequenceId] = useState(null); // 현재 회차 ID 상태 관리
  const [problems, setProblems] = useState([]); // 등록된 문제들 상태 관리
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 관리
  const [filteredProblems, setFilteredProblems] = useState([]); // 필터된 문제들 상태 관리
  const [selectedProblems, setSelectedProblems] = useState([]); // 선택된 문제들 상태 관리
  const [calendarOpen, setCalendarOpen] = useState(false);

  //레벨 분류 (N,1,2,3)
  useEffect(() => {
    const mockProblems = [
      { id: 1, title: '나는야', level: 'N' },
      { id: 2, title: '토마토', level: 1 },
      { id: 3, title: '멋쟁이', level: 2 },
      { id: 4, title: '토마토가 될래', level: 3 },
      { id: 5, title: '우유', level: 'N' },
      { id: 6, title: '딸기', level: 1 },
      { id: 7, title: '단호박파이', level: 2 },
      { id: 8, title: '수박주스', level: 3 },
      { id: 9, title: '아이스크림', level: 'N' },
      { id: 10, title: '초밥', level: 1 },
      { id: 11, title: '초콜렛', level: 2 },
      { id: 12, title: '유후', level: 3 },
      { id: 13, title: '아이스크림', level: 'N' },
      { id: 14, title: '초밥', level: 1 },
      { id: 15, title: '초콜렛', level: 2 },
    ];
    setProblems(mockProblems);
    setFilteredProblems(chunkArray(mockProblems, 3)); // 문제 3개씩 정렬
  }, []);

  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // 모달 창 내 검색()
    const filtered = problems.filter(problem =>
      problem.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProblems(chunkArray(filtered, 3)); // 필터된 결과를 그룹화하여 업데이트
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const foundProblem = problems.find(problem =>
        problem.title.toLowerCase() === searchQuery.toLowerCase()
      );

      if (foundProblem) {
        const updatedSequences = sequences.map(sequence => {
          if (sequence.id === currentSequenceId) {
            if (sequence.problems.length < 8) {
              return {
                ...sequence,
                problems: [...sequence.problems, foundProblem]
              };
            } else {
              alert('회차 당 최대 8개의 문제만 선택할 수 있습니다 (선택된 문제를 클릭하여 삭제한 후 문제를 등록해주세요).');
              return sequence;
            }
          } else {
            return sequence;
          }
        });
        setSequences(updatedSequences);
        setSearchQuery('');
      }
    }
  };

  const handleDateChange = (dates, sequenceId) => {
    const startDate = dates[0];
    const endDate = dates[1];
    const updatedSequences = sequences.map(seq => {
      if (seq.id === sequenceId) {
        return {
          ...seq,
          startDate,
          endDate,
        };
      }
      return seq;
    });
    setSequences(updatedSequences);
  };
  
  const handleAddSequence = () => {
    const newId = sequences.length > 0 ? Math.max(...sequences.map(seq => seq.id)) + 1 : 1;
    setSequences([...sequences, { id: newId, period: null, problems: [], startDate: null, endDate: null, editMode: true }]);
  };

  const handleAddProblem = (id) => {
    setCurrentSequenceId(id); 
    setSelectedProblems(
      sequences.find(seq => seq.id === id)?.problems.map(problem => problem.id) || []
    );
    setIsModalOpen(true); 
  };

  const handleModalAddProblem = () => {
    // 현재 선택된 문제들을 sequences 상태에 반영
    const updatedSequences = sequences.map(sequence => {
      if (sequence.id === currentSequenceId) {
        return {
          ...sequence,
          problems: selectedProblems.map(selectedProblemId =>
            problems.find(problem => problem.id === selectedProblemId)
          ),
          editMode: false,
        };
      } else {
        return sequence;
      }
    });

    setSequences(updatedSequences);
    setIsModalOpen(false);
  };

  const handleProblemSelect = (problem) => {
    const isSelected = selectedProblems.includes(problem.id);

    if (isSelected) {
      setSelectedProblems(selectedProblems.filter(id => id !== problem.id));
    } else {
      if (selectedProblems.length < 10) {
        setSelectedProblems([...selectedProblems, problem.id]);
      } else {
        alert('회차 당 최대 10개의 문제만 선택할 수 있습니다.');
      }
    }
  };

  const handleFix = (sequenceId) => {
    const updatedSequences = sequences.map(sequence => {
      if (sequence.id === sequenceId) {
        return {
          ...sequence,
          editMode: !sequence.editMode 
        };
      } else {
        return sequence;
      }
    });
  
    setSequences(updatedSequences);
  };

  const renderSelectedProblems = (problems) => {
    const columns = [[], []];
    problems.forEach((problem, index) => {
      const columnIndex = index < 5 ? 0 : 1;
  
      columns[columnIndex].push(
        <div className='flex w-full justify-center'> 
          <div className="font-medium mt-5 mr-2">{index + 1}번 문제</div>
          <div key={problem.id} className="w-3/5 h-10 m-2 gap-3 rounded-3xl flex items-center justify-start border border-gray-200 p-5">
            <img src={levelImages[problem.level]} alt={`Level ${problem.level}`} className="w-6 h-6" />
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

  const renderDisplayProblems = (problems) => {
    const columns = [[], []];
    problems.forEach((problem, index) => {
      const columnIndex = index < 10 ? 0 : 1;
      columns[columnIndex].push(
        <div
          key={problem.id}
          className="w-full h-10 m-2 gap-1 rounded-lg flex items-center justify-start border border-gray-200 p-6"
        >
          <span className="font-semibold font-cafe24">문제 {index + 1}</span>
          <span className="ml-8 font-medium text-gray-800">{problem.title}</span>
        </div>
      );
    });
    return (
      <div className="flex w-full">
        <div className="flex flex-col w-3/4">{columns[0]}</div>
        <div className="flex flex-col w-3/4">{columns[1]}</div>
      </div>
    );
  };

  return (
    <div className="w-4/5 flex flex-col items-center">
      {sequences.map((sequence, index) => (
        <div key={sequence.id} className="items-start w-full rounded mb-4 p-10 border box">
          <div className="flex flex-col justify-between items-start mb-3 w-full gap-4">
            
            <div className="font-semibold text-lg">
              <h2>{sequence.id}회차</h2>
            </div>

            <div className="font-semibold text-base flex flex-col items-start w-full">
              
              <div className="mb-3">
                <span>기간</span>
              </div>

              <div className="relative w-1/2 h-10 border flex items-center rounded">
                <input
                  type="text"
                  value={`${sequence.startDate ? sequence.startDate.toISOString().split('T')[0] : ''} ~ ${sequence.endDate ? sequence.endDate.toISOString().split('T')[0] : ''}`}
                  readOnly
                  className="w-full h-full p-2 cursor-default"
                  onClick={() => {
                    if (sequence.editMode) {
                      setCurrentSequenceId(sequence.id);
                      setCalendarOpen(!calendarOpen);
                    }
                  }}
                />

                <FaCalendarAlt
                  className={`w-4 h-4 absolute right-2 cursor-pointer ${!sequence.editMode ? 'hidden' : ''}`}
                  onClick={() => {
                    if (sequence.editMode) {
                      setCurrentSequenceId(sequence.id);
                      setCalendarOpen(!calendarOpen);
                    }
                  }}
                />
            
                {calendarOpen && currentSequenceId === sequence.id && (
                  <DatePicker
                    selected={sequence.startDate}
                    onChange={(dates) => handleDateChange(dates, sequence.id)}
                    startDate={sequence.startDate}
                    endDate={sequence.endDate}
                    selectsRange
                    inline
                    onClickOutside={() => setCalendarOpen(false)}
                  />
                )}

              </div>
            </div>

            <div className="w-1/2 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-base gap-2">
                  <p> 풀이할 문제</p>
                </span>
              </div>

              <div className="self-end">
                <Button
                  buttonSize="detailBtn"
                  colorStyle={sequence.problems && sequence.problems.length > 0 ? 'whiteBlack' : 'skyBlue'}
                  content={sequence.problems && sequence.problems.length > 0 ? '문제 수정' : '문제 추가'}
                  onClick={() => {
                    if (sequence.editMode) {
                      handleAddProblem(sequence.id);
                    }
                  }}
                />
              </div>
            </div>

            <div className="w-full">
              {sequence.problems && sequence.problems.length > 0 && (
                <div className="w-full rounded-lg gap-2">
                  {renderDisplayProblems(sequence.problems)}
                </div>
              )}
            </div>

            <div className="self-end">
              <Button
                buttonSize="detailBtn"
                colorStyle={sequence.editMode ? 'skyBlue' : 'whiteBlack'}
                content={sequence.editMode ? '회차 저장' : '회차 수정'}
                onClick={() => {
                  handleFix(sequence.id);
                }}
              />
            </div>

          </div>
        </div>
      ))}

      <Button
            buttonSize="formBtn"
            colorStyle="skyBlue"
            content="+ 회차추가"
            onClick={handleAddSequence}
            width= "full"
      />

      <Modal
        isOpen={isModalOpen && sequences.find(seq => seq.id === currentSequenceId)?.editMode}
        onClose={() => setIsModalOpen(false)}
        title={`${currentSequenceId}회차`}
        content={
          <div className="flex flex-col items-center">
            <div className="w-full mt-10">
              <h2 className='font-semibold text-lg'>문제 검색</h2>
              <div className="w-full h-10 mt-4 border border-g-600 bg-gray-200 rounded-lg mb-6 flex p-2 text-gray-600 font-medium text-sm">
                <img src={search} alt="search" className="w-4 h-4 mt-1 ml-2 mr-2" />
                <input
                  type="text"
                  placeholder=" 본인이 등록한 문제의 제목으로 검색해 주세요."
                  className="bg-transparent flex-grow text-g-600"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
            <div className="w-full h-fit bg-gray-100 rounded mb-6 overflow-y-auto justify-center p-2 ">
              {chunkArray(filteredProblems.flat(), 3).map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center">
                  {row.map((problem) => (
                    <div
                      key={problem.id}
                      className={`w-1/4 h-10 m-2 rounded-[1.25rem] flex items-center justify-start cursor-pointer border-2 p-5 ${
                        selectedProblems.includes(problem.id)
                          ? 'bg-white border-blue-500'
                          : 'bg-white border-gray-200'
                      }`}
                      onClick={() => handleProblemSelect(problem)}
                    >
                      <img src={levelImages[problem.level]} alt={`Level ${problem.level}`} className="w-6 h-6 mr-2" />
                      {problem.title}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="w-4/5 h-fit bg-white rounded-lg flex flex-col">
              <div className="text-center mt-2 text-base ">
                풀이할 문제는 회차 당 10개까지 등록 가능합니다.
              </div>
              <div className="mt-4 mb-4">
                {renderSelectedProblems(
                  selectedProblems.map(problemId => problems.find(problem => problem.id === problemId)) || []
                )}
              </div>
            </div>
          </div>
        }
        buttonText="저장하기"
        onButtonClick={handleModalAddProblem}
      />
    </div>
  );
}



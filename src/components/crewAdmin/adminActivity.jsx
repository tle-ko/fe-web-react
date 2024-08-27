import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import Button from '../common/button';
import AddProblemModal from './addProblemModal';

export default function AdminProblem() {
  const { id } = useParams(); // URL에서 크루 ID 가져오기
  const [sequences, setSequences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [currentSequenceId, setCurrentSequenceId] = useState(null); // 현재 회차 ID 상태 관리
  const [problems, setProblems] = useState([]); // 등록된 문제들 상태 관리
  const [selectedProblems, setSelectedProblems] = useState([]); // 선택된 문제들 상태 관리
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    fetch('/data/crewData.json')
      .then((response) => response.json())
      .then((data) => {
        const crewId = parseInt(id, 10);
        const crew = data.find((c) => c.id === crewId);
        if (crew) {
          const activitiesWithDates = crew.activities.map((activity) => ({
            ...activity,
            startDate: activity.start_date ? new Date(`20${activity.start_date.replace(/-/g, '-')}`) : null,
            endDate: activity.end_date ? new Date(`20${activity.end_date.replace(/-/g, '-')}`) : null,
          }));
          setSequences(activitiesWithDates);
        }
      });
  }, [id]);

  useEffect(() => {
    fetch('/data/problemData.json')
      .then((response) => response.json())
      .then((data) => setProblems(data));
  }, []);

  const handleDateChange = (dates, sequenceId) => {
    const [startDate, endDate] = dates;
    const updatedSequences = sequences.map((seq) => {
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
    const newId = sequences.length > 0 ? Math.max(...sequences.map((seq) => seq.id)) + 1 : 1;
    setSequences([
      ...sequences,
      { id: newId, period: null, problems: [], startDate: null, endDate: null, editMode: true },
    ]);
  };

  const handleAddProblem = (id) => {
    setCurrentSequenceId(id);
    setSelectedProblems(
      sequences.find((seq) => seq.id === id)?.problems.map((problem) => problem.problem_id) || []
    );
    setIsModalOpen(true);
  };

  const handleModalAddProblem = () => {
    const updatedSequences = sequences.map((sequence) => {
      if (sequence.id === currentSequenceId) {
        return {
          ...sequence,
          problems: selectedProblems.map((selectedProblemId) => {
            const problem = problems.find((problem) => problem.id === selectedProblemId);
            return { problem_id: selectedProblemId, title: problem ? problem.title : '문제 제목 없음' };
          }),
          editMode: false,
        };
      }
      return sequence;
    });

    setSequences(updatedSequences);
    setIsModalOpen(false);
  };

  const handleProblemSelect = (problem) => {
    const isSelected = selectedProblems.includes(problem.id);

    if (isSelected) {
      setSelectedProblems(selectedProblems.filter((id) => id !== problem.id));
    } else {
      if (selectedProblems.length < 8) {
        setSelectedProblems([...selectedProblems, problem.id]);
      } else {
        alert('회차 당 최대 8개의 문제만 선택할 수 있습니다.');
      }
    }
  };

  const handleFix = (sequenceId) => {
    const updatedSequences = sequences.map((sequence) => {
      if (sequence.id === sequenceId) {
        return {
          ...sequence,
          editMode: !sequence.editMode,
        };
      }
      return sequence;
    });

    setSequences(updatedSequences);
  };

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  const renderDisplayProblems = (sequenceProblems) => {
    const columns = [[], []];
    sequenceProblems.forEach((problem, index) => {
      const columnIndex = index < 10 ? 0 : 1;
      const problemData = problems.find((p) => p.id === problem.problem_id);
      columns[columnIndex].push(
        <div key={problem.problem_id} className="w-full h-10 m-2 gap-1 rounded-lg flex items-center justify-start border border-gray-200 p-6">
          <span className="font-semibold">문제 {index + 1}</span>
          <span className="ml-8 font-medium text-gray-800">{problemData ? problemData.title : '문제 제목 없음'}</span>
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
    <div className="col-span-3 flex flex-col items-center">
      {sequences.map((sequence) => (
        <div key={sequence.id} className="items-start w-full mb-4 box">
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
                  value={`${isValidDate(sequence.startDate) ? sequence.startDate.toISOString().split('T')[0] : ''} ~ ${isValidDate(sequence.endDate) ? sequence.endDate.toISOString().split('T')[0] : ''}`}
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
                <span className="font-semibold text-base gap-2 py-2">
                  <p> 풀이할 문제</p>
                </span>
              </div>

              {sequence.editMode && (
                <div className="self-end">
                  <Button
                    buttonSize="detailBtn"
                    colorStyle={sequence.problems && sequence.problems.length > 0 ? 'whiteBlack' : 'skyBlue'}
                    content={sequence.problems && sequence.problems.length > 0 ? '문제 수정' : '문제 추가'}
                    onClick={() => {
                      handleAddProblem(sequence.id);
                    }}
                  />
                </div>
              )}
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
                colorStyle={sequence.editMode ? 'blueWhite' : 'whiteBlack'}
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
        width="full"
      />

      <AddProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        problems={problems}
        selectedProblems={selectedProblems}
        onSelectProblem={handleProblemSelect}
        onAddProblems={handleModalAddProblem}
      />
    </div>
  );
}

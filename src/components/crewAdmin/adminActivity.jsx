import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import Button from '../common/button';
import AddProblemModal from './addProblemModal';
import { client } from '../../utils';

export default function AdminActivity() {
  const { id } = useParams(); // URL에서 크루 ID 가져오기
  const [sequences, setSequences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSequenceId, setCurrentSequenceId] = useState(null);
  const [problems, setProblems] = useState([]); // 전체 문제 목록
  const [selectedProblems, setSelectedProblems] = useState([]); // 선택된 문제 목록
  const [sequenceProblems, setSequenceProblems] = useState({}); // 각 activity의 문제 목록
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // 검색 기능을 위한 상태 추가

  // 날짜가 유효한지 확인하는 함수
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  // 문제 선택을 처리하는 함수
  const handleProblemSelect = (problem) => {
    const isSelected = selectedProblems.includes(problem.problem_ref_id);

    if (isSelected) {
      setSelectedProblems(selectedProblems.filter((id) => id !== problem.problem_ref_id));
    } else {
      if (selectedProblems.length < 8) {
        setSelectedProblems([...selectedProblems, problem.problem_ref_id]);
      } else {
        alert('회차 당 최대 8개의 문제만 선택할 수 있습니다.');
      }
    }
  };

  // API로 crew activities 데이터 불러오기
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await client.get(`/crew/${id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const activitiesWithDates = response.data.activities.map((activity) => ({
            ...activity,
            startDate: new Date(activity.start_at),
            endDate: new Date(activity.end_at),
          }));
          setSequences(activitiesWithDates);
        } else {
          console.error('데이터를 불러오지 못했어요.');
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 문제가 발생했어요.', error);
      }
    };
    fetchActivities();
  }, [id]);

  // 전체 문제 목록 불러오기 (addProblemModal 용)
  const fetchProblems = useCallback(async (query) => {
    setLoading(true);
    try {
      const response = await client.get('/problems', {
        params: {
          q: query,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setProblems(response.data.results); // 문제 목록 설정
      } else {
        console.error('문제 데이터를 불러오지 못했어요.');
      }
    } catch (error) {
      console.error('문제 데이터를 불러오는 중 문제가 발생했어요.', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 특정 activity_id에 대한 문제 목록을 가져오는 함수
  const fetchActivityProblems = useCallback(async (activityId) => {
    setLoading(true);
    try {
      const response = await client.get(`/crew/activity/${activityId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setSequenceProblems((prev) => ({
          ...prev,
          [activityId]: response.data.problems, // 각 activity_id에 맞는 문제 목록 저장
        }));
      } else {
        console.error('문제 데이터를 불러오지 못했어요.');
      }
    } catch (error) {
      console.error('문제 데이터를 불러오는 중 문제가 발생했어요.', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    sequences.forEach((sequence) => {
      fetchActivityProblems(sequence.activity_id);
    });
  }, [sequences, fetchActivityProblems]);

  useEffect(() => {
    fetchProblems(searchTerm);
  }, [fetchProblems, searchTerm]);

  const handleDateChange = (dates, sequenceId) => {
    const [startDate, endDate] = dates;
    const updatedSequences = sequences.map((seq) => {
      if (seq.activity_id === sequenceId) {
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

  // 문제 추가 버튼을 클릭할 때 특정 회차의 문제 목록을 fetch
  const handleAddProblem = async (activityId) => {
    setCurrentSequenceId(activityId);

    if (!activityId) {
      console.error('유효한 activityId가 없습니다.');
      return;
    }

    try {
      const response = await client.get(`/crew/activity/${activityId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const fetchedProblems = response.data.problems;
        const problemIds = fetchedProblems.map((problem) => problem.problem_ref_id);

        setSelectedProblems(problemIds); // 문제 목록 설정
      } else {
        console.error('문제 데이터를 불러오지 못했어요.');
      }
    } catch (error) {
      console.error('문제 데이터를 불러오는 중 문제가 발생했어요.', error);
    }

    setIsModalOpen(true); // 모달 열기
  };

  // 새로운 회차 추가
  const handleAddNewSequence = () => {
    const newSequence = {
      activity_id: Date.now(), // 임시 activity_id
      startDate: new Date(),
      endDate: new Date(),
      problems: [],
      editMode: true, // 새로운 회차는 편집 모드로 시작
    };

    setSequences([...sequences, newSequence]); // 새로운 회차 추가
  };

  const handleModalAddProblem = (selectedProblemIds) => {
    setSelectedProblems(selectedProblemIds); // 선택된 문제 목록 업데이트
    setIsModalOpen(false); // 모달 닫기
  };

  // 회차 저장
  const handleFix = async (sequenceId) => {
    const sequence = sequences.find((sequence) => sequence.activity_id === sequenceId);

    if (sequence.editMode) {
      try {
        await client.post(
          `/crew/${id}/activity`,
          {
            start_at: sequence.startDate.toISOString(),
            end_at: sequence.endDate.toISOString(),
            problem_refs: selectedProblems, // 선택된 problem_ref_id 배열 전달
          },
          {
            withCredentials: true,
          }
        );
        alert('새로운 회차 정보가 추가되었어요.');
        window.location.reload(); // 새로고침
      } catch (error) {
        console.error('회차 저장 중 오류가 발생했습니다.', error);
      }
    }

    const updatedSequences = sequences.map((sequence) => {
      if (sequence.activity_id === sequenceId) {
        return {
          ...sequence,
          editMode: !sequence.editMode,
        };
      }
      return sequence;
    });

    setSequences(updatedSequences);
  };

  const renderDisplayProblems = (sequenceProblems) => {
    if (!sequenceProblems || sequenceProblems.length === 0) {
      return <div>문제가 없습니다.</div>;
    }
    const columns = [[], []];
    sequenceProblems.forEach((problem, index) => {
      const columnIndex = index < 4 ? 0 : 1;

      columns[columnIndex].push(
        <div
          key={problem.problem_ref_id}
          className="m-2 flex h-10 w-full items-center justify-start gap-1 rounded-lg border border-gray-200 p-6"
        >
          <span className="font-semibold">문제 {index + 1}</span>
          <span className="ml-8 font-medium text-gray-800">{problem.title}</span>
        </div>
      );
    });

    return (
      <div className="flex w-full gap-10">
        <div className="flex w-1/2 flex-col">{columns[0]}</div>
        <div className="flex w-1/2 flex-col">{columns[1]}</div>
      </div>
    );
  };

  return (
    <div className="col-span-3 flex flex-col items-center">
      {sequences.map((sequence) => (
        <div key={sequence.activity_id} className="box mb-4 w-full items-start">
          <div className="mb-3 flex w-full flex-col items-start justify-between gap-4">
            <div className="text-lg font-semibold">
              <h2>{sequence.name || '새로운 회차'}</h2>
            </div>

            <div className="flex w-full flex-col items-start text-base font-semibold">
              <div className="mb-3">
                <span>기간</span>
              </div>

              <div className="relative flex h-10 w-1/2 items-center rounded border">
                <input
                  type="text"
                  value={`${isValidDate(sequence.startDate) ? sequence.startDate.toISOString().split('T')[0] : ''} ~ ${isValidDate(sequence.endDate) ? sequence.endDate.toISOString().split('T')[0] : ''}`}
                  readOnly
                  className="h-full w-full cursor-default p-2"
                  onClick={() => {
                    if (sequence.editMode) {
                      setCurrentSequenceId(sequence.activity_id);
                      setCalendarOpen(!calendarOpen);
                    }
                  }}
                />

                <FaCalendarAlt
                  className={`absolute right-2 h-4 w-4 cursor-pointer ${!sequence.editMode ? 'hidden' : ''}`}
                  onClick={() => {
                    if (sequence.editMode) {
                      setCurrentSequenceId(sequence.activity_id);
                      setCalendarOpen(!calendarOpen);
                    }
                  }}
                />

                {calendarOpen && currentSequenceId === sequence.activity_id && (
                  <DatePicker
                    selected={sequence.startDate}
                    onChange={(dates) => handleDateChange(dates, sequence.activity_id)}
                    startDate={sequence.startDate}
                    endDate={sequence.endDate}
                    selectsRange
                    inline
                    onClickOutside={() => setCalendarOpen(false)}
                  />
                )}
              </div>
            </div>

            <div className="flex w-1/2 items-center justify-between">
              <div className="flex flex-col">
                <span className="gap-2 py-2 text-base font-semibold">
                  <p> 풀이할 문제</p>
                </span>
              </div>

              {sequence.editMode && (
                <div className="self-end">
                  <Button
                    buttonSize="detailBtn"
                    colorStyle={
                      sequence.problems && sequence.problems.length > 0 ? 'whiteBlack' : 'skyBlue'
                    }
                    content={
                      sequence.problems && sequence.problems.length > 0 ? '문제 수정' : '문제 추가'
                    }
                    onClick={() => {
                      handleAddProblem(sequence.activity_id);
                    }}
                  />
                </div>
              )}
            </div>

            <div className="w-full">
              {/* 각 회차에 대한 문제 목록 표시 */}
              {sequenceProblems[sequence.activity_id] && (
                <div className="w-full gap-2 rounded-lg">
                  {renderDisplayProblems(sequenceProblems[sequence.activity_id])}
                </div>
              )}
            </div>

            <div className="self-end">
              <Button
                buttonSize="detailBtn"
                colorStyle={sequence.editMode ? 'blueWhite' : 'whiteBlack'}
                content={sequence.editMode ? '회차 저장' : '회차 수정'}
                onClick={() => {
                  handleFix(sequence.activity_id);
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        buttonSize="formBtn"
        colorStyle="skyBlue"
        content="+ 회차 추가"
        width="full"
        onClick={handleAddNewSequence}
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

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
        const response = await client.get(`/api/v1/crew/${id}`, {
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
      const response = await client.get('/api/v1/problems', {
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
      const response = await client.get(`/api/v1/crew/activity/${activityId}`, {
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

    const response = await client.get(`/api/v1/crew/activity/${activityId}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const fetchedProblems = response.data.problems;
      const problemIds = fetchedProblems.map((problem) => problem.problem_ref_id);

      setSelectedProblems(problemIds);  // 문제 목록 설정
    } else {
      console.error('문제 데이터를 불러오지 못했어요.');
    }

    setIsModalOpen(true);  // 모달 열기
  };

  const handleModalAddProblem = (selectedProblemIds) => {
    setSelectedProblems(selectedProblemIds);  // 선택된 문제 목록 업데이트
    setIsModalOpen(false);  // 모달 닫기
  };

  const handleFix = async (sequenceId) => {
    const sequence = sequences.find((sequence) => sequence.activity_id === sequenceId);

    if (sequence.editMode) {
      try {
        await client.put(
          `/api/v1/crew/activity/${sequenceId}`,
          {
            start_at: sequence.startDate.toISOString(),
            end_at: sequence.endDate.toISOString(),
            problem_refs: selectedProblems,  // 선택된 problem_ref_id 배열 전달
          },
          {
            withCredentials: true,
          }
        );
        console.log('회차가 저장되었습니다.');
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
        <div key={problem.problem_ref_id} className="w-full h-10 m-2 gap-1 rounded-lg flex items-center justify-start border border-gray-200 p-6">
          <span className="font-semibold">문제 {index + 1}</span>
          <span className="ml-8 font-medium text-gray-800">{problem.title}</span>
        </div>
      );
    });

    return (
      <div className="flex w-full gap-10">
        <div className="flex flex-col w-1/2">{columns[0]}</div>
        <div className="flex flex-col w-1/2">{columns[1]}</div>
      </div>
    );
  };

  return (
    <div className="col-span-3 flex flex-col items-center">
      {sequences.map((sequence) => (
        <div key={sequence.activity_id} className="items-start w-full mb-4 box">
          <div className="flex flex-col justify-between items-start mb-3 w-full gap-4">
            <div className="font-semibold text-lg">
              <h2>{sequence.name}</h2>
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
                      setCurrentSequenceId(sequence.activity_id);
                      setCalendarOpen(!calendarOpen);
                    }
                  }}
                />

                <FaCalendarAlt
                  className={`w-4 h-4 absolute right-2 cursor-pointer ${!sequence.editMode ? 'hidden' : ''}`}
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
                      handleAddProblem(sequence.activity_id);
                    }}
                  />
                </div>
              )}
            </div>

            <div className="w-full">
              {/* 각 회차에 대한 문제 목록 표시 */}
              {sequenceProblems[sequence.activity_id] && (
                <div className="w-full rounded-lg gap-2">{renderDisplayProblems(sequenceProblems[sequence.activity_id])}</div>
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

      <Button buttonSize="formBtn" colorStyle="skyBlue" content="+ 회차추가" width="full" />

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

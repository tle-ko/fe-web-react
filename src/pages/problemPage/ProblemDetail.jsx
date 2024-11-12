import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProblemHeader from '../../components/Header/problemHeader';
import ProblemDetailNav from '../../components/nav/problemDetailNav';
import ProblemDetailContainer from '../../components/problemDetail/problemDetailContainer';
import ProblemDetailModal from '../../components/problemDetail/problemDetailModal';
import DataLoadingSpinner from '../../components/common/dataLoadingSpinner';
import { client } from '../../utils';

export default function ProblemDetail() {
  const { id } = useParams();
  const [problemData, setProblemData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeContainer, setActiveContainer] = useState('detail');

  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        const response = await client.get(`/api/v1/problem/${id}/detail`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setProblemData(response.data);
        } else {
          console.error('Failed to fetch problem data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching problem data:', error);
      }
    };

    fetchProblemDetail();
    const intervalId = setInterval(fetchProblemDetail, 5000); 
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 폴링 중지
  }, [id]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDeleteOpen(false);
  };

  if (!problemData) {
    return (
      <div className="w-full p-20">
        <div className="m-10 flex flex-col items-center justify-center">
          <DataLoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed left-0 top-16 z-10 w-full">
        <ProblemHeader title={problemData.title} />
        <ProblemDetailNav
          problemData={problemData}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
      <ProblemDetailContainer
        problemData={problemData}
        activeContainer={activeContainer}
        setActiveContainer={setActiveContainer}
      />
      <ProblemDetailModal
        isOpen={isModalOpen || isDeleteOpen}
        onClose={handleCloseModal}
        problemData={problemData}
        isDeleteModal={isDeleteOpen}
      />
    </>
  );
}
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ProblemHeader from "../../components/Header/problemHeader";
import ProblemDetailNav from "../../components/nav/problemDetailNav";
import ProblemDetailContainer from '../../components/problemDetail/problemDetailContainer';
import ProblemDetailModal from '../../components/problemDetail/problemDetailModal';
import { client } from "../../utils";

export default function ProblemDetail() {
  const { id } = useParams();
  const [problemData, setProblemData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        const response = await client.get(`/api/v1/problem/${id}/detail`, {
          withCredentials: true
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
    return <div>데이터를 불러오는 중이에요!</div>;
  }

  return (
    <>
    <div className="fixed top-16 left-0 w-full">
    <ProblemHeader 
      title={problemData.title} 
    />
    <ProblemDetailNav 
      problemData={problemData}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
    />
    </div>
      <ProblemDetailContainer 
      problemData={problemData}
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
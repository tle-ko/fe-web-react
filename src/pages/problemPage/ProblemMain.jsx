import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useChildRoute from '../../hooks/useChildRoute';
import Footer from '../../components/common/footer';
import Button from '../../components/common/button';
import ProblemListContainer from '../../components/problemMain/problemListContainer';
import SubmitProblemModal from '../../components/problemMain/submitProblemModal';

export default function ProblemMain() {
  const isChildRoute = useChildRoute('/problem/');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSubmit = (problemData) => {
    console.log('Problem submitted:', problemData);
  };

  return (
    <div>
      {isChildRoute ? (
        <Outlet />
      ) : (
        <>
          <div className="mb-12 flex h-11 min-w-30rem items-end justify-between">
            <p className="font-cafe24 text-2xxl font-bold text-gray-700">나의 문제 리스트</p>
            <Button
              buttonSize="formBtn"
              colorStyle="blueWhite"
              content="문제 등록하기"
              onClick={handleOpenModal}
            />
          </div>
          <SubmitProblemModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
          />
          <ProblemListContainer />
        </>
      )}
      <Footer />
    </div>
  );
}

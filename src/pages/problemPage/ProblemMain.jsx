import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import useChildRoute from "../../hooks/useChildRoute";
import Footer from '../../components/common/footer';
import Button from "../../components/common/button";
import ProblemListContainer from '../../components/problemMain/problemListContainer'; // 경로 수정
import SubmitProblemModal from '../../components/problemMain/submitProblemModal'; // 경로 수정

export default function ProblemMain() {
  const isChildRoute = useChildRoute("/problem/");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSubmit = (problemData) => {
    console.log('Problem submitted:', problemData);
    handleCloseModal();
  };

  return (
    <div>
      {isChildRoute ? (
        <Outlet />
      ) : (
        <>
          <div className="max-w-full mb-12 flex items-end justify-between">
            <h2 className="text-gray-700 text-[1.75rem] font-bold font-cafe24">나의 문제 리스트</h2>
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
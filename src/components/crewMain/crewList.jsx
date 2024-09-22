import React, { useState, useEffect } from "react";
import Button from "../common/button";
import LanguageTag from "../common/languageTag";
import ApplyModal from "./applyModal";
import DataLoadingSpinner from "../common/dataLoadingSpinner";
import { client } from "../../utils";

export default function CrewList({ pageIndex, numOfPage, filters, isLoading }) {
  const [pageData, setPageData] = useState([]);
  const [modalStates, setModalStates] = useState({});
  const [selectedCrew, setSelectedCrew] = useState(null);

  useEffect(() => {
    const startIndex = pageIndex * numOfPage;
    const endIndex = startIndex + numOfPage;
    setPageData(filters.slice(startIndex, endIndex));

    const initialModalStates = filters.reduce((acc, crew) => ({ ...acc, [crew.crew_id]: false }), {});
    setModalStates(initialModalStates);
  }, [filters, pageIndex, numOfPage]);

  const handleOpenModal = (crewId) => {
    setSelectedCrew(filters.find(crew => crew.crew_id === crewId));
    setModalStates((prevState) => ({
      ...prevState,
      [crewId]: true,
    }));
  };

  const handleCloseModal = (crewId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [crewId]: false,
    }));
  };

  const handleApply = async (message) => {
    if (!selectedCrew) return;

    try {
      const payload = {
        crew: selectedCrew.crew_id, // crewId 전달
        message: message, // 사용자 메시지 전달
      };

      const response = await client.post(`/api/v1/crew/application`, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log("크루 신청이 완료되었습니다.");
        handleCloseModal(selectedCrew.crew_id);
      } else {
        console.error('Failed to apply for the crew:', response.statusText);
      }
    } catch (error) {
      console.error('Error applying for the crew:', error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="w-full p-12">
          <div className="flex flex-col justify-center items-center">
            <DataLoadingSpinner />
          </div>
        </div>
      ) : pageData.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-6 text-gray-600 my-16">
          <div className="justify-start items-center gap-2 inline-flex animate-bounce">
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
          </div>
          <p>조건에 해당되는 크루가 없어요 😓</p>
        </div>
      ) : (
        <div className="cardGrid3 w-full flex-col justify-start items-start">
          {pageData.map((crew) => (
            <div key={crew.crew_id} className="box justify-center items-start gap-3">
              <div className="w-full flex-col justify-center items-start gap-4 flex flex-grow">
                <div className="w-full flex justify-between items-center">
                  <div className="justify-start items-center gap-2 flex">
                    <div className="text-xl">{crew.icon}</div>
                    <div className="w-40 containerTitle truncate">{crew.name}</div>
                  </div>
                  <div>
                    <Button 
                      buttonSize="detailBtn"
                      colorStyle="skyBlue"
                      content="신청하기"
                      onClick={() => handleOpenModal(crew.crew_id)}
                    />
                    {modalStates[crew.crew_id] && (
                      <ApplyModal
                        isOpen={modalStates[crew.crew_id]}
                        onClose={() => handleCloseModal(crew.crew_id)}
                        onApply={handleApply}
                        crew={selectedCrew}
                      />
                    )}
                  </div>
                </div>
                <div className="w-full flex-col justify-center items-start gap-4 flex">
                  <div className="justify-start items-center gap-3 inline-flex text-sm">
                    <div className="text-color-blue-main ">인원</div>
                    <div className="text-gray-700">{crew.member_count.count}명 / {crew.member_count.max_count}명</div>
                  </div>
                  <div className="w-full justify-start items-center gap-4 inline-flex text-sm ">
                    <p className=" text-color-blue-main whitespace-nowrap">크루 태그</p>
                    <div className=" justify-start items-start gap-1 flex hidden-scrollbar overflow-x-auto">
                      {crew.tags
                        .filter(tag => tag.type === "language")
                        .map((tag) => (
                          <LanguageTag key={tag.key} language={tag.name} />
                      ))}
                      {crew.tags
                        .filter(tag => tag.type === "level")
                        .map((tag) => (
                          <LanguageTag key={tag.name} language={tag.name} className="tag border" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

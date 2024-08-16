import React, { useState, useEffect } from "react";
import Button from "../common/button";
import LanguageTag from "../common/languageTag";
import ApplyModal from "./applyModal";
import { client } from "../../utils";

export default function CrewList({ pageIndex, numOfPage, filters }) {
  const [crews, setCrews] = useState([]);
  const [filteredCrews, setFilteredCrews] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [modalStates, setModalStates] = useState({});
  const [selectedCrew, setSelectedCrew] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get('api/v1/crews/recruiting', {
          withCredentials: true
        });
        if (response.status === 200) {
          setCrews(response.data);
        } else {
          console.error('Failed to fetch crew data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching crew data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const safeFilters = {
      languages: filters?.languages || [],
      tiers: filters?.tiers || [],
    };

    const doesTierMatch = (crewTier, selectedTiers) => {
      if (selectedTiers.length === 0) return true;

      const tierMapping = {
        '브론즈': '브론즈 이상',
        '실버': '실버 이상',
        '골드': '골드 이상',
        '플레티넘': '플래티넘 이상',
        '다이아': '다이아 이상',
        '루비': '루비 이상',
        '마스터': '마스터 이상'
      };

      return selectedTiers.some(selectedTier => {
        const baseTier = crewTier.split(' ')[0];
        return tierMapping[baseTier] === selectedTier;
      });
    };

    const filtered = crews.filter(crew => {
      const matchesLanguage = safeFilters.languages.length === 0 || crew.tags.some(tag => tag.type === 'language' && safeFilters.languages.includes(tag.name));
      const matchesTier = safeFilters.tiers.length === 0 || crew.tags.some(tag => tag.type === 'level' && doesTierMatch(tag.name, safeFilters.tiers));
      return matchesLanguage && matchesTier;
    });

    setFilteredCrews(filtered);
  }, [crews, filters]);

  useEffect(() => {
    const startIndex = pageIndex * numOfPage;
    const endIndex = startIndex + numOfPage;
    setPageData(filteredCrews.slice(startIndex, endIndex));

    const initialModalStates = filteredCrews.reduce((acc, crew) => ({ ...acc, [crew.id]: false }), {});
    setModalStates(initialModalStates);
  }, [filteredCrews, pageIndex, numOfPage]);

  const handleOpenModal = (crewId) => {
    setSelectedCrew(crews.find(crew => crew.id === crewId));
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

  const handleApply = () => {
    // 신청 처리 로직 (예: API 호출)
    console.log("크루 신청이 완료되었습니다.");
    handleCloseModal(selectedCrew.id);
  };

  return (
    <div>
      {filteredCrews.length === 0 || pageData.length === 0 ? (
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
            <div key={crew.id} className="box justify-center items-start gap-3">
              <div className="w-full flex-col justify-center items-start gap-4 flex flex-grow">
                <div className="w-full flex justify-between items-center">
                  <div className="justify-start items-center gap-2 flex">
                    <div className="text-xl">{crew.icon}</div>
                    <div className="containerTitle">{crew.name}</div>
                  </div>
                  <div>
                    <Button 
                      buttonSize="detailBtn"
                      colorStyle="skyBlue"
                      content="신청하기"
                      onClick={() => handleOpenModal(crew.id)}
                    />
                    {modalStates[crew.id] && (
                      <ApplyModal
                        isOpen={modalStates[crew.id]}
                        onClose={() => handleCloseModal(crew.id)}
                        onApply={handleApply}
                        crew={selectedCrew}
                      />
                    )}
                  </div>
                </div>
                <div className="w-full flex-col justify-center items-start gap-4 flex">
                  <div className="justify-start items-center gap-3 inline-flex text-sm">
                    <div className="text-color-blue-main ">인원</div>
                    <div className="text-gray-700">{crew.members.count}명 / {crew.members.max_count}명</div>
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

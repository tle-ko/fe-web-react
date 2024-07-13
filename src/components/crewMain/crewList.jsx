import Button from "../common/button";
import { useState, useEffect } from "react";
import LanguageTag from "../common/languageTag";
import ApplyModal from "./applyModal";

const languageMapping = {
  1005: 'Java',
  1001: 'C',
  1003: 'Python',
  1004: 'C++',
  1009: 'C#',
  1010: 'JavaScript',
  1013: 'Swift',
  1008: 'Kotlin',
};

const getBojLevelTag = (level) => {
  if (level === null) return "티어 무관";
  const tierMapping = {
    b: "브론즈 이상",
    s: "실버 이상",
    g: "골드 이상",
    p: "플래티넘 이상",
    d: "다이아 이상",
    r: "루비 이상",
    m: "마스터 이상",
  };
  const tier = tierMapping[level[0]];
  return tier || "티어 무관";
};

export default function CrewList({ data, pageIndex, numOfPage, userData }) {
  const [pageData, setPageData] = useState([]);
  const [modalStates, setModalStates] = useState({});

  useEffect(() => {
    const startIndex = pageIndex * numOfPage;
    const endIndex = startIndex + numOfPage;
    setPageData(data.slice(startIndex, endIndex));

    // Initialize modal states
    const initialModalStates = data.reduce((acc, crew) => ({ ...acc, [crew.id]: false }), {});
    setModalStates(initialModalStates);
  }, [data, pageIndex, numOfPage]);

  const handleOpenModal = (crewId) => {
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
    // 신청 처리 로직
  };

  return (
    <div>
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
                        crew={crew}
                        userData={userData}
                      />
                    )}
                  </div>
                </div>
                <div className="w-full flex-col justify-center items-start gap-4 flex">
                  <div className="justify-start items-center gap-3 inline-flex text-sm">
                    <div className="text-color-blue-main ">인원</div>
                    <div className="text-gray-700">{crew.headcount}명 / {crew.headcount_limit}명</div>
                  </div>
                  <div className="w-full justify-start items-center gap-2 inline-flex text-sm">
                    <div className="w-max text-color-blue-main">크루 태그</div>
                    <div className="justify-start items-start gap-1 flex flex-wrap">
                      {crew.allowed_languages.map((languageId) => (
                        <LanguageTag key={`language-${languageId}`} language={languageMapping[languageId]} />
                      ))}
                      <LanguageTag language={getBojLevelTag(crew.required_boj_level)} className="tag border" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

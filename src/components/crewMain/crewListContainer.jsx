// crewListContainer.jsx
import CrewList from "./crewList";
import TagFilter from "./tagFilter";
import useFetchData from "../../hooks/useEffectData";
import Pagination from "../../components/common/pagiNation";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useChildRoute from "../../hooks/useChildRoute";

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
  if (!level) return "티어 무관";
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

export default function CrewListContainer() {
  const isChildRoute = useChildRoute("/crew/");
  const crewData = useFetchData("http://localhost:3000/data/crewData.json");
  const userData = useFetchData("http://localhost:3000/data/userData.json");
  const [pageIndex, setPageIndex] = useState(0);
  const numOfPage = 12;
  const [selectedTags, setSelectedTags] = useState({ languages: [], tiers: [] });
  const [filteredData, setFilteredData] = useState([]);

  const handlePageChange = (index) => {
    setPageIndex(index - 1);
  };

  const handleUpdateTags = (tags) => {
    setSelectedTags(tags);
  };

  useEffect(() => {
    if (crewData?.length) {
      const filtered = crewData.filter(crew => {
        const hasSelectedLanguage = selectedTags.languages.length === 0 || crew.allowed_languages.some(id => selectedTags.languages.includes(languageMapping[id]));
        const hasSelectedTier = selectedTags.tiers.length === 0 || selectedTags.tiers.includes(getBojLevelTag(crew.required_boj_level));
        return hasSelectedLanguage && hasSelectedTier;
      });

      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setFilteredData(filtered);
    }
  }, [crewData, selectedTags]);

  if (!crewData || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {isChildRoute ? (
        <Outlet />
      ) : (
        <>
          <div className="containerTitle">크루 목록</div>
          <TagFilter onUpdateTags={handleUpdateTags} />
          <CrewList data={filteredData} pageIndex={pageIndex} numOfPage={numOfPage} userData={userData} />
          <Pagination 
            totalPage={Math.ceil(filteredData.length / numOfPage)} 
            currentPage={pageIndex + 1} 
            setCurrentPage={handlePageChange} 
          />
        </>
      )}
    </div>
  );
}
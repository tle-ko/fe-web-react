import { useState } from 'react';
import SelectLanguageTag from "../common/selectLanguageTag";

export default function TagFilter({ onUpdateTags }) {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState([]);

  const handleLanguageClick = (language) => {
    const newLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter(l => l !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(newLanguages);
    onUpdateTags({ languages: newLanguages, tiers: selectedTiers });
  };

  const handleTierClick = (tier) => {
    const newTiers = selectedTiers.includes(tier)
      ? selectedTiers.filter(t => t !== tier)
      : [...selectedTiers, tier];
    setSelectedTiers(newTiers);
    onUpdateTags({ languages: selectedLanguages, tiers: newTiers });
  };

  return (
    <div>
      <div className="w-full min-w-[30rem] box flex-col justify-start items-start gap-4 inline-flex hidden-scrollbar overflow-x-auto">
        <div className="justify-start items-center gap-6 inline-flex">
          <div className="text-gray-700 text-sm font-semibold whitespace-nowrap">사용 언어</div>
          <div className="justify-start items-center gap-3 flex flex-wrap">
            {['Python', 'C', 'C#', 'C++', 'Java', 'JavaScript', 'Swift', 'Kotlin'].map(language => (
              <SelectLanguageTag 
                key={language} 
                language={language} 
                onClick={() => handleLanguageClick(language)} 
                selected={selectedLanguages.includes(language)} 
              />
            ))}
          </div>
        </div>
        <div className="justify-start items-center gap-6 inline-flex">
          <div className="text-gray-700 text-sm font-semibold whitespace-nowrap">백준 티어</div>
          <div className="justify-start items-center gap-3 flex flex-wrap">
            {['티어 무관', '브론즈 이상', '실버 이상', '골드 이상', '플레티넘 이상', '다이아 이상', '루비 이상', '마스터 이상'].map(tier => (
              <SelectLanguageTag 
                key={tier} 
                language={tier} 
                onClick={() => handleTierClick(tier)} 
                selected={selectedTiers.includes(tier)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

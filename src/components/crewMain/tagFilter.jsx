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
      <div className="w-full box flex-col justify-start items-start gap-4 inline-flex">
        <div className="justify-start items-center gap-6 inline-flex">
          <div className="text-gray-700 text-sm font-semibold">사용 언어</div>
          <div className="justify-start items-center gap-3 flex">
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
          <div className="text-gray-700 text-sm font-semibold">백준 티어</div>
          <div className="justify-start items-center gap-3 flex">
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

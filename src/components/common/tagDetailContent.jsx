// TagDetailContent.jsx
import React from 'react';
import TierSlide from '../common/tierSlide';
import SelectLanguageTag from '../common/selectLanguageTag';
import TagInput from '../common/tagInput';

const TagDetailContent = ({
  tempTierValue,
  handleTierChange,
  selectedLanguages,
  handleLanguageClick,
  tags,
  handleAddTag,
  handleRemoveTag,
}) => {
  return (
    <div className="mt-10 flex w-full flex-col items-start justify-start gap-6">
      <div className="w-full">
        <TierSlide value={tempTierValue} onChange={handleTierChange} />
      </div>
      <div className="flex flex-col items-start justify-center gap-3">
        <div className="flex flex-col items-start justify-center gap-3">
          <div className="text-lg font-semibold text-gray-900">사용 언어</div>
          <div className="flex flex-wrap items-start justify-start gap-3">
            {['Python', 'C', 'C#', 'C++', 'Java', 'JavaScript', 'Swift', 'Kotlin'].map(
              (language) => (
                <SelectLanguageTag
                  key={language}
                  language={language}
                  onClick={() => handleLanguageClick(language)}
                  selected={selectedLanguages.includes(language)}
                />
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-6">
        <div className="flex w-full flex-col items-start justify-center gap-3">
          <div className="text-lg font-semibold text-gray-900">태그 등록</div>
          <TagInput tags={tags} onAddTag={handleAddTag} onRemoveTag={handleRemoveTag} />
        </div>
        <div className="text-base font-semibold text-gray-600">
          ! 크루 태그는 5개 이하로 등록 가능하며, 크루의 특성을 나타내는 단어로 작성해 주세요.
        </div>
      </div>
    </div>
  );
};

export default TagDetailContent;

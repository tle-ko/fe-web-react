import { useState } from "react";
import Button from "../common/button";
import Input from "../common/input";
import Modal from "../common/modal";
import SelectEmoji from "../common/selectEmoji";
import SelectLanguageTag from "../common/selectLanguageTag";
import Dropdown from "../common/dropDown";
import TagInput from "../common/tagInput";
import AlertContainer from "../common/alertContainer";
import TierSlide from "../common/tierSlide";

export default function CreateCrew() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [tags, setTags] = useState([]);
  const [crewName, setCrewName] = useState("");
  const [memberCount, setMemberCount] = useState(null);
  const [tierValue, setTierValue] = useState(0);

  const handleOpenModal = () => {
    setSelectedLanguages([]);
    setTags([]);
    setCrewName("");
    setMemberCount(null);
    setShowAlert(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateCrew = () => {
    setShowAlert(true);
  };

  const handleLanguageClick = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
    } else {
      if (selectedLanguages.length < 2) {
        setSelectedLanguages([...selectedLanguages, language]);
      } else {
        alert("언어 태그는 2개까지만 선택 가능합니다");
      }
    }
  };

  const handleAddTag = (newTag) => {
    if (tags.length < 5) {
      setTags([...tags, newTag]);
    } else {
      alert("태그는 최대 5개까지 추가할 수 있습니다.");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleTierChange = (newValue) => {
    setTierValue(newValue);
  };

  const contents = showAlert ? (
    <AlertContainer 
      type="check"
      content="크루가 성공적으로 만들어졌습니다!" 
    />
  ) : (
    <div className="w-full flex flex-col justify-start items-start gap-6 mt-10">
      <div className="flex flex-col justify-start items-start gap-3">
        <div className="text-gray-900 text-lg font-semibold">크루 이모지 선택</div>
        <SelectEmoji />
      </div>
      <div className="w-full flex justify-start gap-6">
        <div className="w-2/3 flex flex-col justify-start items-start gap-3">
          <div className="text-gray-900 text-lg font-semibold"><p>크루명 입력</p></div>
          <Input 
            title="" 
            placeholder="20자 이내로 입력해주세요." 
            width="full" 
            value={crewName} 
            onChange={(e) => setCrewName(e.target.value)} 
          />
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <div className="text-gray-900 text-lg font-semibold">참여 인원</div>
          <Dropdown
            options={[...Array(8).keys()].map((i) => `${i + 1}명`)}
            placeholder="선택하세요"
            selected={memberCount}
            onChange={(value) => setMemberCount(value)}
          />
        </div>
      </div>
      <div className="w-full">
        <TierSlide 
          value={tierValue} 
          onChange={handleTierChange} 
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-3">
        <div className="flex flex-col justify-center items-start gap-3">
          <div className="text-gray-900 text-lg font-semibold">사용 언어</div>
          <div className="flex justify-start items-start gap-3 flex-wrap">
            {['Python', 'C', 'C#', 'C++', 'Java', 'JavaScript', 'Swift', 'Kotlin'].map((language) => (
              <SelectLanguageTag
                key={language}
                language={language}
                onClick={() => handleLanguageClick(language)}
                selected={selectedLanguages.includes(language)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-6">
        <div className="w-full flex flex-col justify-center items-start gap-3">
          <div className="text-gray-900 text-lg font-semibold">크루 태그 등록</div>
          <TagInput tags={tags} onAddTag={handleAddTag} onRemoveTag={handleRemoveTag} />
        </div>
        <div className="text-gray-600 text-base font-semibold">! 크루 태그는 5개 이하로 등록 가능하며, 크루의 특성을 나타내는 단어로 작성해 주세요.</div>
      </div>
    </div>
  );

  return (
    <div>
      <Button 
        buttonSize="formBtn"
        colorStyle="blueWhite"
        content="크루 만들기"
        onClick={handleOpenModal}
      />
      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="크루 만들기"
        content={contents}
        buttonText={showAlert ? "" : "크루 만들기"}
        onButtonClick={showAlert ? null : handleCreateCrew}
      />
    </div>
  );
}

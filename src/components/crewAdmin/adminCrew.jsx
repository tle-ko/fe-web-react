import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import SelectEmoji from '../common/selectEmoji';
import Dropdown from '../common/dropDown';
import Input from '../common/input';
import Button from '../common/button';
import Modal from '../common/modal';
import useFetchData from "../../hooks/useEffectData";
import LanguageTag from '../common/languageTag';
import { languageMapping, tiers, getBojLevelTag } from '../../utils';
import AlertContainer from '../common/alertContainer';
import TagDetailContent from '../common/tagDetailContent';

export default function AdminCrew() {
  const { id } = useParams();
  const crewData = useFetchData("http://localhost:3000/data/crewData.json");
  const navigate = useNavigate();

  const [currentCrew, setCurrentCrew] = useState(null);
  const [crewName, setCrewName] = useState('');
  const [notice, setNotice] = useState('');
  const [recruiting, setRecruiting] = useState(false);
  const [headcountLimit, setHeadcountLimit] = useState(1);
  const [icon, setIcon] = useState('');
  const [tierValue, setTierValue] = useState(0);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [tags, setTags] = useState([]);
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);
  const [isEndActivityModalOpen, setIsEndActivityModalOpen] = useState(false);
  const [tempTierValue, setTempTierValue] = useState(0);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingNotice, setIsEditingNotice] = useState(false);

  useEffect(() => {
    if (crewData.length > 0) {
      const foundCrew = crewData.find(crew => crew.id === parseInt(id));
      if (foundCrew) {
        setCurrentCrew(foundCrew);
        setCrewName(foundCrew.name);
        setNotice(foundCrew.notice);
        setRecruiting(foundCrew.in_recruiting);
        setHeadcountLimit(foundCrew.headcount_limit);
        setIcon(foundCrew.icon);

        const tierString = getBojLevelTag(foundCrew.required_boj_level);
        setTierValue(tiers.indexOf(tierString.replace(" 이상", "")));
        setSelectedLanguages(foundCrew.allowed_languages.map(id => languageMapping[id]));
        setTags(foundCrew.tags);
      }
    }
  }, [crewData, id]);

  const handleUpdateInfo = () => {
    setIsEditingInfo(false);
    alert('정보가 수정되었어요.');
  };

  const handleUpdateNotice = () => {
    setIsEditingNotice(false);
    alert('공지사항이 수정되었어요.');
  };

  const handleEmojiChange = setIcon;

  const openTierModal = () => {
    setTempTierValue(tierValue);
    setIsTierModalOpen(true);
  };

  const openEndOfActivityModal = () => setIsEndActivityModalOpen(true);

  const endOfActivity = () => {
    alert('크루의 모든 활동이 종료되었어요. 지금까지 수고하셨어요!😊');
    navigate('/');
  };

  const handleCloseModal = () => {
    setIsTierModalOpen(false);
    setIsEndActivityModalOpen(false);
  };

  const handleTierChange = setTempTierValue;

  const handleLanguageClick = (language) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(lang => lang !== language) 
        : [...prev, language]
    );
  };

  const handleAddTag = (newTag) => {
    if (tags.length < 5) setTags([...tags, newTag]);
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  if (crewData.length === 0) return <div>데이터를 불러오는 중이에요!</div>;

  return (
    <div className="col-span-3 flex flex-col gap-6">
      <section className="box flex flex-col gap-6">
        <h2 className="font-bold text-lg font-cafe24">정보 설정</h2>
        <div className="flex flex-col gap-6">
          <SelectEmoji title="크루 이모지" initialEmoji={icon} onEmojiChange={handleEmojiChange} disabled={!isEditingInfo} />
          <Input title="크루 이름" placeholder="20자 이내로 입력해주세요." width="50%" value={crewName} onChange={(e) => setCrewName(e.target.value)} readOnly={!isEditingInfo} />
          <div className="w-1/2 flex flex-col gap-2">
            <p className="containerTitle">모집 여부</p>
            <Dropdown options={['모집중', '모집마감']} placeholder="선택하세요" selected={recruiting ? '모집중' : '모집마감'} onChange={(e) => setRecruiting(e.target.value === '모집중')} disabled={!isEditingInfo} />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <p className="containerTitle">모집 인원</p>
            <Dropdown options={Array.from({ length: 8 }, (_, i) => (i + 1).toString())} placeholder="선택하세요" selected={headcountLimit.toString()} onChange={(e) => setHeadcountLimit(Number(e.target.value))} disabled={!isEditingInfo} />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Button buttonSize="detailBtn" colorStyle={isEditingInfo ? 'blueWhite' : 'whiteBlack'} content={isEditingInfo ? '저장' : '수정'} onClick={isEditingInfo ? handleUpdateInfo : () => setIsEditingInfo(true)} />
        </div>
      </section>

      <section className="box flex flex-col gap-6">
        <h2 className="font-bold text-lg font-cafe24">공지 설정</h2>
        <Input title="" placeholder="크루들에게 전달할 공지사항을 입력해 주세요." value={notice} onChange={(e) => setNotice(e.target.value)} readOnly={!isEditingNotice} />
        <div className="w-full flex justify-end">
          <Button buttonSize="detailBtn" colorStyle={isEditingNotice ? 'blueWhite' : 'whiteBlack'} content={isEditingNotice ? '저장' : '수정'} onClick={isEditingNotice ? handleUpdateNotice : () => setIsEditingNotice(true)} />
        </div>
      </section>

      <section className="box flex flex-col gap-6">
        <h2 className="font-bold text-lg font-cafe24">태그 설정</h2>
        <div className="inline-flex flex-wrap gap-2">
          {currentCrew && currentCrew.allowed_languages.map((languageId, index) => (
            <LanguageTag key={index} language={languageMapping[languageId]} />
          ))}
          {currentCrew && (
            <>
              <LanguageTag language={`${getBojLevelTag(currentCrew.required_boj_level)} 이상`} className="tag border bg-gray-600 text-white" />
              {currentCrew.tags.map((tag, index) => (
                <LanguageTag key={index} language={tag} className="bg-white text-gray-600 border border-gray-600" />
              ))}
            </>
          )}
        </div>
        <div className="w-full flex justify-end">
          <Button buttonSize="detailBtn" colorStyle="whiteBlack" content="수정" onClick={openTierModal} />
        </div>
      </section>

      <section className="box flex flex-col gap-6">
        <h2 className="font-bold text-lg font-cafe24">활동 설정</h2>
        <div className="w-full flex justify-end">
          <Button buttonSize="formBtn" colorStyle="redWhite" content="그룹 활동 종료하기" onClick={openEndOfActivityModal} />
        </div>
      </section>

      <Modal 
        isOpen={isTierModalOpen}
        onClose={handleCloseModal}
        title="태그 설정"
        content={
          <TagDetailContent
            tempTierValue={tempTierValue}
            handleTierChange={handleTierChange}
            selectedLanguages={selectedLanguages}
            handleLanguageClick={handleLanguageClick}
            tags={tags}
            handleAddTag={handleAddTag}
            handleRemoveTag={handleRemoveTag}
          />
        }
        buttonText="수정"
        onButtonClick={handleUpdateInfo}
      />

      <Modal 
        isOpen={isEndActivityModalOpen}
        onClose={handleCloseModal}
        content={
          <AlertContainer
            type="delete"
            content="정말 크루 활동을 종료할까요?"
            buttonContent="활동 종료하기"
            onButtonClick={endOfActivity}
          />
        }
      />
    </div>
  );
}

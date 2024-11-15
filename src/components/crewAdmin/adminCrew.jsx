import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SelectEmoji from '../common/selectEmoji';
import Dropdown from '../common/dropDown';
import Input from '../common/input';
import Button from '../common/button';
import Modal from '../common/modal';
import { client } from '../../utils'; // API 호출용
import LanguageTag from '../common/languageTag';
import { languageMapping, tiers, getBojLevelTag } from '../../utils';
import AlertContainer from '../common/alertContainer';
import TagDetailContent from '../common/tagDetailContent';
import DataLoadingSpinner from '../common/dataLoadingSpinner';

export default function AdminCrew() {
  const { id } = useParams(); // crew_id를 가져옴
  const navigate = useNavigate();

  // 상태 관리
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
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingNotice, setIsEditingNotice] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 데이터 로드 (GET 요청)
  useEffect(() => {
    setIsLoading(true);
    const fetchCrewData = async () => {
      try {
        const response = await client.get(`/crew/${id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const crew = response.data;
          setCurrentCrew(crew);
          setCrewName(crew.name);
          setNotice(crew.notice);
          setRecruiting(crew.is_recruiting);
          setHeadcountLimit(crew.member_count.max_count);
          setIcon(crew.icon);
          const tierString = getBojLevelTag(crew.required_boj_level);
          setTierValue(tiers.indexOf(tierString.replace(' 이상', '')));
          setSelectedLanguages(
            crew.tags.filter((tag) => tag.type === 'language').map((tag) => tag.name)
          );
          setTags(crew.tags.filter((tag) => tag.type === 'custom').map((tag) => tag.name));
        } else {
          alert('크루 데이터를 불러오지 못했습니다.');
        }
      } catch (error) {
        console.error('크루 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCrewData();
  }, [id]);

  // 정보 수정 (PATCH 요청)
  const handleUpdateInfo = async () => {
    const updateData = {
      icon,
      name: crewName,
      max_members: headcountLimit,
      min_boj_level: tierValue,
      notice,
      is_recruiting: recruiting,
      is_active: true,
      custom_tags: tags,
      languages: selectedLanguages.map((lang) => languageMapping[lang]),
    };

    console.log('Update Data:', updateData);

    try {
      const response = await client.patch(`/crew/${id}`, updateData);
      if (response.status === 200) {
        setIsEditingInfo(false);
        alert('크루 정보가 수정되었습니다.');
      } else {
        alert('크루 정보 수정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('크루 정보 수정 중 오류 발생:', error);
    }
  };

  // 공지사항 수정
  const handleUpdateNotice = async () => {
    const updateData = { notice };

    try {
      const response = await client.patch(`/crew/${id}`, updateData);
      if (response.status === 200) {
        setIsEditingNotice(false);
        alert('공지사항이 수정되었습니다.');
      } else {
        alert('공지사항 수정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('공지사항 수정 중 오류 발생:', error);
    }
  };

  // 활동 종료 처리
  const endOfActivity = async () => {
    try {
      const response = await client.patch(`/crew/${id}`, { is_active: false });
      if (response.status === 200) {
        alert('크루의 모든 활동이 종료되었어요. 지금까지 수고하셨어요!😊');
        navigate('/');
      } else {
        alert('활동 종료 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('활동 종료 처리 중 오류 발생:', error);
    }
  };

  // 언어 선택 처리
  const handleLanguageClick = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language) ? prev.filter((lang) => lang !== language) : [...prev, language]
    );
  };

  const handleAddTag = (newTag) => {
    if (tags.length < 5) setTags([...tags, newTag]);
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div className="w-full p-20">
        <div className="m-10 flex flex-col items-center justify-center">
          <DataLoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-3 flex flex-col gap-6">
      {/* 정보 설정 섹션 */}
      <section className="box flex flex-col gap-6">
        <h2 className="font-cafe24 text-lg font-bold">정보 설정</h2>
        <div className="flex flex-col gap-6">
          <SelectEmoji
            title="크루 이모지"
            initialEmoji={icon}
            onEmojiChange={setIcon}
            disabled={!isEditingInfo}
          />
          <Input
            title="크루 이름"
            placeholder="20자 이내로 입력해주세요."
            width="50%"
            value={crewName}
            onChange={(e) => setCrewName(e.target.value)}
            readOnly={!isEditingInfo}
          />
          <div className="flex w-1/2 flex-col gap-2">
            <p className="containerTitle">모집 여부</p>
            <Dropdown
              options={['모집중', '모집마감']}
              selected={recruiting ? '모집중' : '모집마감'}
              onChange={(e) => setRecruiting(e.target.value === '모집중')}
              disabled={!isEditingInfo}
            />
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            <p className="containerTitle">모집 인원</p>
            <Dropdown
              options={Array.from({ length: 8 }, (_, i) => (i + 1).toString())}
              selected={headcountLimit.toString()}
              onChange={(e) => setHeadcountLimit(Number(e.target.value))}
              disabled={!isEditingInfo}
            />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button
            buttonSize="detailBtn"
            colorStyle={isEditingInfo ? 'blueWhite' : 'whiteBlack'}
            content={isEditingInfo ? '저장' : '수정'}
            onClick={isEditingInfo ? handleUpdateInfo : () => setIsEditingInfo(true)}
          />
        </div>
      </section>

      {/* 공지 설정 섹션 */}
      <section className="box flex flex-col gap-6">
        <h2 className="font-cafe24 text-lg font-bold">공지 설정</h2>
        <Input
          title=""
          placeholder="크루들에게 전달할 공지사항을 입력해 주세요."
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          readOnly={!isEditingNotice}
        />
        <div className="flex w-full justify-end">
          <Button
            buttonSize="detailBtn"
            colorStyle={isEditingNotice ? 'blueWhite' : 'whiteBlack'}
            content={isEditingNotice ? '저장' : '수정'}
            onClick={isEditingNotice ? handleUpdateNotice : () => setIsEditingNotice(true)}
          />
        </div>
      </section>

      {/* 태그 설정 섹션 */}
      <section className="box flex flex-col gap-6">
        <h2 className="font-cafe24 text-lg font-bold">태그 설정</h2>
        <div className="inline-flex flex-wrap items-center justify-start gap-2">
          {currentCrew?.tags
            ?.filter((tag) => tag.type === 'language')
            .map((tag, index) => (
              <LanguageTag key={index} language={tag.name} />
            ))}
          {currentCrew?.tags
            ?.filter((tag) => tag.type === 'level')
            .map((tag, index) => (
              <LanguageTag
                key={index}
                language={tag.name}
                className="tag border bg-gray-600 text-white"
              />
            ))}
          {currentCrew?.tags
            ?.filter((tag) => tag.type === 'custom')
            .map((tag, index) => (
              <LanguageTag
                key={index}
                language={tag.name}
                className="border border-gray-600 bg-white text-gray-600"
              />
            ))}
        </div>
        <div className="flex w-full justify-end">
          <Button
            buttonSize="detailBtn"
            colorStyle="whiteBlack"
            content="수정"
            onClick={() => setIsTierModalOpen(true)}
          />
        </div>
      </section>

      {/* 활동 종료 설정 섹션 */}
      <section className="box flex flex-col gap-6">
        <h2 className="font-cafe24 text-lg font-bold">활동 설정</h2>
        <div className="flex w-full justify-end">
          <Button
            buttonSize="formBtn"
            colorStyle="redWhite"
            content="그룹 활동 종료하기"
            onClick={() => setIsEndActivityModalOpen(true)}
          />
        </div>
      </section>

      {/* 태그 설정 모달 */}
      <Modal
        isOpen={isTierModalOpen}
        onClose={() => setIsTierModalOpen(false)}
        title="태그 설정"
        content={
          <TagDetailContent
            tempTierValue={tierValue}
            handleTierChange={setTierValue}
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

      {/* 활동 종료 모달 */}
      <Modal
        isOpen={isEndActivityModalOpen}
        onClose={() => setIsEndActivityModalOpen(false)}
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

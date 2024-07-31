/* 룸 대시보드 관리 - 사이드 네브바 - 크루 관리 */

import React, { useState, useEffect } from 'react';
import SelectEmoji from '../crewInfo/selectEmoji';
import Dropdown from '../common/dropDown';
import Input from '../common/input';
import Button from '../common/button';
import useFetchData from "../../hooks/useEffectData";

export default function AdminCrew() {
  const crewData = useFetchData("http://localhost:3000/data/crewData.json");

  const [crewName, setCrewName] = useState('');
  const [notice, setNotice] = useState('');
  const [recruiting, setRecruiting] = useState(false);
  const [headcountLimit, setHeadcountLimit] = useState(1);
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (crewData.data) {
      const currentCrew = crewData.data.find(crew => crew.id === 1); // 예시로 첫 번째 크루 선택
      setCrewName(currentCrew.name);
      setNotice(currentCrew.notice);
      setRecruiting(currentCrew.in_recruiting);
      setHeadcountLimit(currentCrew.headcount_limit);
      setIcon(currentCrew.icon);
    }
  }, [crewData.data]);

  const handleUpdate = () => {
    alert('정보가 수정되었습니다.');
    // 업데이트 API 호출 등을 여기에 추가
  };

  const handleEmojiChange = (newEmoji) => {
    setIcon(newEmoji);
  };

  return (
    <div className="w-4/5 flex flex-col gap-6">
      <div className="w-full flex flex-col gap-6 box">
        <h2 className="font-bold text-lg font-cafe24">정보 설정</h2>
        <div className="flex flex-col gap-6">
          <SelectEmoji
            className="font-semi-bold text-base"
            title="크루 이모지"
            initialEmoji={icon}
            onEmojiChange={handleEmojiChange}
          />

          <Input
            title="크루 이름"
            placeholder="20자 이내로 입력해주세요."
            width="50%"
            value={crewName}
            onChange={(e) => setCrewName(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <p className="font-semi-bold text-base">모집 여부</p>
            <div className="w-1/2">
              <Dropdown
                options={['모집중', '모집마감']}
                placeholder="선택하세요"
                selected={recruiting ? '모집중' : '모집마감'}
                onChange={(e) => setRecruiting(e.target.value === '모집중')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semi-bold text-base">모집 인원</p>
            <div className="w-1/2">
              <Dropdown
                options={Array.from({ length: 8 }, (_, i) => (i + 1).toString())}
                placeholder="선택하세요"
                selected={headcountLimit.toString()}
                onChange={(e) => setHeadcountLimit(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Button
            buttonSize="detailBtn"
            colorStyle="whiteBlack"
            content="수정"
            onClick={handleUpdate}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 box">
        <h2 className="font-cafe24 font-semi-bold text-base">공지 설정</h2>
        <Input
          title=""
          placeholder="크루들에게 전달할 공지사항을 입력해 주세요."
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            buttonSize="detailBtn"
            colorStyle="whiteBlack"
            content="수정"
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

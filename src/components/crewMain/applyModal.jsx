import Modal from "../common/modal";
import LanguageTag from "../common/languageTag";
import AlertContainer from "../common/alertContainer";
import { useState, useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import Textarea from "../common/textarea";

export default function ApplyModal({ isOpen, onClose, onApply, crew }) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowAlert(false); // 모달이 닫힐 때 showAlert 초기화
    }
  }, [isOpen]);

  const signUpCrew = () => {
    setShowAlert(true);
    onApply();
  };

  const [latestActivity, setLatestActivity] = useState({});

  useEffect(() => {
    if (crew) {
      const sortedActivities = crew.activities.sort((a, b) => new Date(b.end_date) - new Date(a.end_date));
      setLatestActivity(sortedActivities[0]);
    }
  }, [crew]);

  if (!crew) {
    return null; 
  }

  const alertContent = (
    <AlertContainer 
      type="check"
      content="가입 신청이 완료되었습니다!" 
    />
  );

  const formContent = (
    <div className="flex flex-col justify-start items-start gap-6 mt-10">
      <div className="pr-2 pb-3 border-b border-gray-200 flex-col justify-center items-start gap-2 flex">
        <div className="text-gray-900 text-4xl font-bold">{crew.icon}</div>
        <div className="text-gray-900 text-xl font-bold">{crew.name}</div>
      </div>
      <div className="w-full justify-start items-center gap-6 inline-flex">
        <div className="pb-3 border-b border-gray-200 flex-col justify-start items-start gap-6 inline-flex">
          <div className="text-gray-900 text-lg font-bold">현재 진행 회차</div>
          <div className="pr-2 justify-start items-center gap-2 inline-flex">
            <div className="text-gray-900 text-base font-semibold">{crew.activities.length}회차</div>
            <div className="text-gray-900 text-base font-medium">{latestActivity?.start_date} ~ {latestActivity?.end_date}</div>
          </div>
        </div>
        <div className="pr-2 pb-3 border-b border-gray-200 flex-col justify-start items-start gap-3 inline-flex">
          <div className=" text-gray-900 text-lg font-bold">현재 인원</div>
          <div className="justify-start items-center gap-2 inline-flex">
            {Array.from({ length: crew.members.length }).map((_, index) => (
              <FaCircleUser key={index} className="w-8 h-8 text-gray-500" />
            ))}
          </div>
        </div>
      </div>
      <div className="pr-2 pb-3 border-b border-gray-200 flex-col justify-start items-start gap-3 flex">
        <div className="text-gray-900 text-lg font-bold">크루 태그</div>
        <div className="justify-start items-center gap-2 inline-flex flex-wrap">
          {crew.allowed_languages.map((languageId, index) => (
            <LanguageTag key={index} language={languageMapping[languageId]} />
          ))}
          <LanguageTag language={getBojLevelTag(crew.required_boj_level)} className="tag border bg-gray-600 text-white" />
          {crew.tags.map((tag, index) => (
            <LanguageTag key={index} language={tag} className="bg-white text-gray-600 border border-gray-600" />
          ))}
        </div>
      </div>
      
      <div className="w-full flex-col justify-start items-start gap-6 flex">
        <Textarea 
          placeholder="크루 선장에게 보낼 메시지를 입력하세요."
          height="8"
        />
        <div className="text-gray-600 text-sm">! 크루 가입 신청 시 선장에게 이메일이 전송되며, 승인 결과를 이메일로 발송해 드립니다.</div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="크루 가입 신청"
      content={showAlert ? alertContent : formContent}
      buttonText={showAlert ? null : "신청하기"}
      onButtonClick={showAlert ? null : signUpCrew}
    />
  );
}

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

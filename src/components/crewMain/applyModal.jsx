import React, { useState, useEffect } from "react";
import Modal from "../common/modal";
import LanguageTag from "../common/languageTag";
import AlertContainer from "../common/alertContainer";
import { FaCircleUser } from "react-icons/fa6";
import Textarea from "../common/textarea";

export default function ApplyModal({ isOpen, onClose, onApply, crew }) {
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowAlert(false);
      setMessage(""); // 모달이 닫힐 때 메시지 초기화
    }
  }, [isOpen]);

  const signUpCrew = () => {
    setShowAlert(true);
    onApply(message);
  };

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
            <div className="text-gray-900 text-base font-semibold">{crew.latest_activity.name}</div>
            <div className="text-gray-900 text-base font-medium">{crew.latest_activity.date_start_at ? crew.latest_activity.date_start_at.split('T')[0] : "시작일 없음"} ~ {crew.latest_activity.date_end_at ? crew.latest_activity.date_end_at.split('T')[0] : "종료일 없음"}</div>
          </div>
        </div>
        <div className="pr-2 pb-3 border-b border-gray-200 flex-col justify-start items-start gap-3 inline-flex">
          <div className=" text-gray-900 text-lg font-bold">현재 인원</div>
          <div className="justify-start items-center gap-2 inline-flex">
            {Array.from({ length: crew.members.count }).map((_, index) => (
              <FaCircleUser key={index} className="w-8 h-8 text-gray-500" />
            ))}
          </div>
        </div>
      </div>
      <div className="pr-2 pb-3 border-b border-gray-200 flex-col justify-start items-start gap-3 flex">
        <div className="text-gray-900 text-lg font-bold">크루 태그</div>
        <div className="justify-start items-center gap-2 inline-flex flex-wrap">
          {crew.tags
            .filter(tag => tag.type === "language")
            .map((tag, index) => (
              <LanguageTag key={index} language={tag.name} />
          ))}
          {crew.tags
            .filter(tag => tag.type === "level")
            .map((tag, index) => (
              <LanguageTag key={index} language={tag.name} className="tag border bg-gray-600 text-white" />
          ))}
          {crew.tags
            .filter(tag => tag.type === "custom")
            .map((tag, index) => (
              <LanguageTag key={index} language={tag.name} className="bg-white text-gray-600 border border-gray-600" />
          ))}
        </div>
      </div>
      
      <div className="w-full flex-col justify-start items-start gap-6 flex">
        <Textarea 
          placeholder="크루 선장에게 보낼 메시지를 입력하세요."
          height="8"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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

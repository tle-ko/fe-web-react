import React, { useState, useEffect } from 'react';
import Modal from '../common/modal';
import LanguageTag from '../common/languageTag';
import AlertContainer from '../common/alertContainer';
import Textarea from '../common/textarea';
import ProfileImg from '../../../src/assets/images/profile.svg';

export default function ApplyModal({ isOpen, onClose, onApply, crew }) {
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가

  useEffect(() => {
    if (!isOpen) {
      setShowAlert(false);
      setMessage(''); // 모달이 닫힐 때 메시지 초기화
      setErrorMessage(''); // 에러 메시지도 초기화
    }
  }, [isOpen]);

  const signUpCrew = async () => {
    setErrorMessage(''); // 이전 에러 메시지 초기화

    if (!message.trim()) {
      setErrorMessage('메시지를 입력해 주세요.'); // 메시지가 없을 때 에러 처리
      return;
    }

    try {
      await onApply(message); // onApply 함수에서 에러 발생 시 catch로 이동
      setShowAlert(true); // 신청 성공 시 알림 표시
    } catch (error) {
      // 에러 유형에 따른 처리 (404, 기타 등)
      if (error.response && error.response.status === 404) {
        setErrorMessage('백준 레벨 기준이 맞는지 확인해 주세요.');
      } else {
        setErrorMessage('신청 중 오류가 발생했습니다.');
      }
    }
  };

  const alertContent = <AlertContainer type="check" content="가입 신청이 완료되었습니다!" />;

  const formContent = (
    <div className="mt-10 flex flex-col items-start justify-start gap-6">
      <div className="flex flex-col items-start justify-center gap-2 border-b border-gray-200 pb-3 pr-2">
        <div className="text-4xl font-bold text-gray-900">{crew.icon}</div>
        <div className="text-xl font-bold text-gray-900">{crew.name}</div>
      </div>
      <div className="inline-flex w-full items-center justify-start gap-6">
        <div className="inline-flex flex-col items-start justify-start gap-6 border-b border-gray-200 pb-3">
          <div className="text-lg font-bold text-gray-900">현재 진행 회차</div>
          <div className="inline-flex items-center justify-start gap-2 pr-2">
            <div className="text-base font-semibold text-gray-900">{crew.latest_activity.name}</div>
            <div className="text-base font-medium text-gray-900">
              {crew.latest_activity.start_at
                ? crew.latest_activity.start_at.split('T')[0]
                : '시작일 없음'}{' '}
              ~
              {crew.latest_activity.end_at
                ? crew.latest_activity.end_at.split('T')[0]
                : '종료일 없음'}
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col items-start justify-start gap-3 border-b border-gray-200 pb-3 pr-2">
          <div className="text-lg font-bold text-gray-900">현재 인원</div>
          <div className="inline-flex items-center justify-start">
            {Array.from({ length: crew.member_count.count }).map((_, index) => (
              <img
                key={index}
                src={ProfileImg}
                alt="User Profile"
                className="h-8 w-8 rounded-full object-cover text-gray-500"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-3 border-b border-gray-200 pb-3 pr-2">
        <div className="text-lg font-bold text-gray-900">크루 태그</div>
        <div className="inline-flex flex-wrap items-center justify-start gap-2">
          {crew.tags
            .filter((tag) => tag.type === 'language')
            .map((tag, index) => (
              <LanguageTag key={index} language={tag.name} />
            ))}
          {crew.tags
            .filter((tag) => tag.type === 'level')
            .map((tag, index) => (
              <LanguageTag
                key={index}
                language={tag.name}
                className="tag border bg-gray-600 text-white"
              />
            ))}
          {crew.tags
            .filter((tag) => tag.type === 'custom')
            .map((tag, index) => (
              <LanguageTag
                key={index}
                language={tag.name}
                className="border border-gray-600 bg-white text-gray-600"
              />
            ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-start justify-start gap-6">
        <Textarea
          placeholder="크루 선장에게 보낼 메시지를 입력하세요."
          height="8"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {errorMessage && (
          <div role="alert" className="alert alert-danger w-full text-red-500">
            {errorMessage}
          </div>
        )}
        <div className="text-sm text-gray-600">
          ! 크루 가입 신청 시 선장에게 이메일이 전송되며, 승인 결과를 이메일로 발송해 드립니다.
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="크루 가입 신청"
      content={showAlert ? alertContent : formContent}
      buttonText={showAlert ? null : '신청하기'}
      onButtonClick={showAlert ? null : signUpCrew}
    />
  );
}

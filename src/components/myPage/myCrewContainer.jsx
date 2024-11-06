import React from 'react';
import Button from '../common/button';
import LanguageTag from '../common/languageTag';

const formatDate = (submissionTime) => {
  const date = new Date(submissionTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${year}년 ${month.toString().padStart(2, '0')}월 ${day.toString().padStart(2, '0')}일 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return formattedDate;
};

export default function MyCrewContainer() {
  const crewData = [
    {
      id: 1,
      created_at: '2024-08-16T12:34:00',
      icon: '😉',
      name: '코딩메리호',
      tags: [
        { type: 'language', name: 'Python' },
        { type: 'level', name: '실버 5 이상' },
        { type: 'custom', name: '알고리즘' },
      ],
      message:
        '저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요',
    },
    {
      id: 2,
      created_at: '2024-08-16T12:35:00',
      icon: '🚀',
      name: '우주탐사대',
      tags: [
        { type: 'language', name: 'JavaScript' },
        { type: 'level', name: '골드 3 이상' },
        { type: 'custom', name: '웹 개발' },
      ],
      message: '열정과 실력을 겸비했습니다 열심히 하겠습니다!',
    },
    {
      id: 3,
      created_at: '2024-08-16T12:36:00',
      icon: '🌟',
      name: '스타코더즈',
      tags: [
        { type: 'language', name: 'Java' },
        { type: 'level', name: '브론즈 1 이상' },
        { type: 'custom', name: '데이터베이스' },
      ],
      message: '데이터베이스에 관심 있습니다.',
    },
    {
      id: 4,
      created_at: '2024-08-16T12:37:00',
      icon: '💻',
      name: '해커톤 마스터즈',
      tags: [
        { type: 'language', name: 'C++' },
        { type: 'level', name: '플래티넘 5 이상' },
        { type: 'custom', name: '해커톤' },
      ],
      message: '열심히하겠습니다.',
    },
  ];

  const approveMessage = () => {
    return alert('선장님의 승인/거절 여부에 따라 이메일로 결과가 전송돼요!');
  };

  return (
    <div className="box col-span-3 min-w-fit">
      <div className="flex w-full flex-col gap-6">
        <p className="boxTitle w-fit">크루 가입 신청 현황</p>

        {crewData.map((crew) => (
          <div key={crew.id} className="box">
            <div className="inline-flex w-full flex-col items-end justify-end gap-6">
              <div className="inline-flex w-full flex-col items-start justify-start gap-6">
                <div className="inline-flex items-start justify-start gap-6">
                  <p className="text-5xl font-bold">{crew.icon}</p>

                  <div className="flex flex-col items-start justify-start gap-4">
                    <p className="font-bold text-gray-900">{crew.name}</p>
                    <div className="inline-flex items-center justify-between gap-6">
                      <p className="text-base-15 font-medium">신청 시각</p>
                      <p className="text-base-15 font-normal">{formatDate(crew.created_at)}</p>
                    </div>
                    <div className="inline-flex items-center justify-between gap-6">
                      <p className="font-medium">크루 태그</p>
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
                  </div>
                </div>

                <div className="flex w-full flex-col gap-2">
                  <p className="text-base-14 font-medium text-gray-900">신청 메시지</p>
                  <div className="h-fit w-full items-start justify-start bg-gray-50 p-5">
                    <p className="whitespace-normal text-gray-900">{crew.message}</p>
                  </div>
                </div>
              </div>

              <Button
                buttonSize={'detailBtn'}
                colorStyle={'whiteBlack'}
                content={'수락 대기중'}
                onClick={approveMessage}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

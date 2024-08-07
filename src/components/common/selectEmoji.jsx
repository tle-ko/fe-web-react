// 이모지 선택 컴포넌트 (라이브러리 사용하므로 npm install 필요)
// 선택된 이모지 데이터를 api로 보내는 코드 추가 필요

import React, { useEffect, useRef } from 'react';
import { EmojiButton } from '@joeattardi/emoji-button';

export default function SelectEmoji({ title, initialEmoji, onEmojiChange }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const currentButton = buttonRef.current;

    const picker = new EmojiButton({
      position: 'auto',
      zIndex: 100,
      i18n: {
        search: 'Search emojis...',
        categories: {
          recents: 'Recent Emojis',
          smileys: 'Smileys & Emotion',
          people: 'People & Body',
          animals: 'Animals & Nature',
          food: 'Food & Drink',
          activities: 'Activities',
          travel: 'Travel & Places',
          objects: 'Objects',
          symbols: 'Symbols',
          flags: 'Flags'
        },
        notFound: 'No emojis found'
      }
    });

    picker.on('emoji', emoji => {
      if (currentButton) {
        currentButton.innerText = emoji.emoji; // 버튼 텍스트 변경
      }
      if (onEmojiChange) {
        onEmojiChange(emoji.emoji); // 선택된 이모지를 부모 컴포넌트로 전달
      }
    });

    const showPicker = () => {
      picker.togglePicker(currentButton);
    };

    if (currentButton) {
      currentButton.addEventListener('click', showPicker);
    }

    // 초기 이모지 설정
    if (currentButton && initialEmoji) {
      currentButton.innerText = initialEmoji;
    }

    return () => {
      if (currentButton) {
        currentButton.removeEventListener('click', showPicker);
      }
    };
  }, [initialEmoji, onEmojiChange]);

  return (
    <div className='flex flex-col justify-start items-start gap-2'>
      <div className='text-gray-900 text-base font-semibold'>{title}</div>
      <button className="bg-white rounded-lg border border-gray-200 w-14 h-14" ref={buttonRef}></button>
    </div>
  );
}

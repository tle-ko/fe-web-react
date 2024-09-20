import React, { useState, useRef, useEffect } from 'react';
import { FaCircleArrowUp, FaTrash } from "react-icons/fa6";

const defaultProfileImage = 'https://i.ibb.co/xDxmBXd/defult-profile-image.png';
const defaultUsername = '올바르지 않은 사용자';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};

export default function ReviewContainer({ selectedStart, selectedEnd, onResetSelection, onHighlightLine, comments, userData }) {
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState(comments);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const textareaRef = useRef(null);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [review]);

  const saveReview = () => {
    const currentDate = new Date().toISOString(); // 현재 시간을 ISO 형식으로 변환
    const newReview = {
      line_start: selectedStart,
      line_end: selectedEnd,
      content: review,
      created_by: {
        username: defaultUsername,
        profile_image: defaultProfileImage,
      },
      created_at: currentDate,
    };

    setReviews([...reviews, newReview]);
    setReview('');
    onResetSelection(); // 선택 상태 초기화
    setSelectedReviewIndex(null); // 선택된 리뷰 인덱스 초기화
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveReview();
    }
  };

  const handleReviewClick = (index, start, end) => {
    if (selectedReviewIndex === index) {
      setSelectedReviewIndex(null);
      onHighlightLine(null, null);
    } else {
      setSelectedReviewIndex(index);
      onHighlightLine(start, end);
    }
  };

  const handleDelete = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    setSelectedReviewIndex(null);
    onHighlightLine(null, null);
  };

  return (
    <div className="w-full">
        {reviews.length > 0 && (
          <div className="flex flex-col gap-6">
            {reviews
              .sort((a, b) => a.line_start - b.line_start || new Date(a.created_at) - new Date(b.created_at))
              .map((item, index) => (
                // 댓글 카드
                <div
                  key={index}
                  className={`box p-5 w-full min-w-60 hover:bg-gray-50 ${
                    selectedReviewIndex === index ? 'bg-gray-100 border-color-blue-w50' : 'bg-white border-gray-200'
                  }`}
                  onClick={() => handleReviewClick(index, item.line_start, item.line_end)}
                  onMouseOver={() => onHighlightLine(item.line_start, item.line_end)}
                  onMouseOut={() => onHighlightLine(null, null)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          {`라인 ${item.line_start} ~ ${item.line_end}`}
                        </span>
                        <div className="flex">
                          <FaTrash
                            className="w-3.5 h-3.5 text-gray-600 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(index);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        <img
                          src={item.created_by.profile_image}
                          alt="profile_image"
                          className="w-6 h-6 rounded-full mr-2 object-cover"
                        />
                        <div className="inline-flex justify-start items-center gap-2">
                          <span className="font-semibold text-sm text-gray-600">{item.created_by.username}</span>
                          <span className="text-gray-600 text-sm">|</span>
                          <span className="text-gray-400 text-sm">{formatDate(item.created_at)}</span>
                        </div>
                      </div>
                      <p className="w-full h-fit text-gray-800 font-medium text-sm whitespace-pre-wrap break-words">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        
        {(selectedStart !== null && selectedEnd !== null) && (
          <div className="mt-6 flex flex-row box p-4 w-full justify-between items-center">
            <textarea
              ref={textareaRef}
              type="text"
              className="w-11/12 min-w-60 h-fit longSentence resize-none"
              placeholder="선택한 부분에 대한 리뷰를 작성해주세요"
              value={review}
              onChange={handleReviewChange}
              onKeyDown={handleKeyDown}
              style={{ overflow: 'hidden' }}
            />
            <FaCircleArrowUp 
              className={`w-6 h-6 cursor-pointer ${review.trim() !== '' ? 'text-color-blue-main' : 'text-gray-200 cursor-default pointer-events-none'}`} 
              onClick={saveReview}
              aria-label="SaveReview"
              disabled={review.trim() === ''}
            />
          </div>
        )}
    </div>
  );
}
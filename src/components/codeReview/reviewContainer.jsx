import React, { useState, useEffect, useRef } from 'react';
import { FaCircleArrowUp, FaTrash } from "react-icons/fa6";
import { client } from "../../utils"; 
import { useParams } from 'react-router-dom';
import DataLoadingSpinner from '../common/dataLoadingSpinner';

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

export default function ReviewContainer({ selectedStart, selectedEnd, onResetSelection, onHighlightLine, setHighlightedLines }) {
  const { submitId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      setIsLoading(true);
      try {
        const response = await client.get(`/api/v1/crew/activity/problem/submission/${submitId}`, {
          withCredentials: true
        });
        if (response.status === 200) {
          setReviews(response.data.comments);  
        } else {
          console.error("댓글 데이터를 불러오지 못했어요.", response.statusText);
        }
      } catch (error) {
        console.error("댓글 데이터를 불러오는 중 문제가 발생했어요.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewData();
  }, [submitId]);

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
    const currentDate = new Date().toISOString();
    const newReview = {
      line_number_start: selectedStart,
      line_number_end: selectedEnd,
      content: review,
      created_by: {
        username: defaultUsername,
        profile_image: defaultProfileImage,
      },
      created_at: currentDate,
    };

    setReviews([...reviews, newReview]);
    setReview('');
    onResetSelection();
    setSelectedReviewIndex(null);
    setHighlightedLines({ start: null, end: null });
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
      setHighlightedLines({ start: null, end: null });
    } else {
      setSelectedReviewIndex(index);
      onHighlightLine(start, end);
      setHighlightedLines({ start, end });
    }
  };

  const handleDelete = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    setSelectedReviewIndex(null);
    onHighlightLine(null, null);
    setHighlightedLines({ start: null, end: null });
  };

  if (isLoading) {
    return <div className="w-full p-20">
        <div className="flex flex-col justify-center items-center m-10">
          <DataLoadingSpinner />
        </div>
      </div>;
  }

  return (
    <div className="w-full">
        {reviews.length > 0 && (
          <div className="flex flex-col gap-6">
            {reviews
              .sort((a, b) => a.line_number_start - b.line_number_start || new Date(a.created_at) - new Date(b.created_at))
              .map((item, index) => (
                <div
                  key={index}
                  className={`box p-5 w-full min-w-60 hover:bg-gray-50 ${
                    selectedReviewIndex === index ? 'bg-gray-100 border-color-blue-w50' : 'bg-white border-gray-200'
                  }`}
                  onClick={() => handleReviewClick(index, item.line_number_start, item.line_number_end)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          {`라인 ${item.line_number_start} ~ ${item.line_number_end}`}
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
                          src={`http://api.tle-kr.com${item.created_by.profile_image}`}
                          alt="profile_image"
                          className="w-6 h-6 rounded-full mr-2 object-cover"
                        />
                        <div className="inline_number-flex justify-start items-center gap-2">
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

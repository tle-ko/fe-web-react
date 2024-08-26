import React, { useState, useEffect } from 'react';
import { FaCircleArrowUp, FaTrash } from "react-icons/fa6";

const defaultAvatar = 'https://via.placeholder.com/40'; 
const defaultUsername = 'userundefined'; 

const ReviewContainer = ({ selectedStart, selectedEnd, onResetSelection, onHighlightLine }) => {
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codeResponse = await fetch('http://localhost:3000/data/codeData.json');
        const codeData = await codeResponse.json();

        const userResponse = await fetch('http://localhost:3000/data/userData.json');
        const userData = await userResponse.json();

        const userMap = userData.reduce((map, user) => {
          map[user.id] = user; 
          return map;
        }, {});

        const reviewsWithUsers = codeData.comments.items.map(comment => ({
          ...comment,
          avatar: userMap[comment.created_by.id]?.image_url || defaultAvatar, 
          user: userMap[comment.created_by.id]?.username || defaultUsername, 
          date: new Date(codeData.created_at).toLocaleString(),
          start: comment.line_start,
          end: comment.line_end,
          text: comment.content, 
        }));

        setReviews(reviewsWithUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const saveReview = () => {
    if (review.trim() === '') {
      alert('Please enter a review.');
      return;
    }

    const currentDateTime = new Date();
    const formattedDate = `${currentDateTime.getFullYear()}년 ${currentDateTime.getMonth() + 1}월 ${currentDateTime.getDate()}일 ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}`;

    const newReview = {
      start: selectedStart,
      end: selectedEnd,
      text: review,
      user: defaultUsername, 
      avatar: defaultAvatar, 
      date: formattedDate,
    };

    setReviews([...reviews, newReview]);
    setReview('');
    onResetSelection();
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
      if (onHighlightLine) {
        onHighlightLine(null, null); 
      }
    } else {
      setSelectedReviewIndex(index);
      if (onHighlightLine) {
        onHighlightLine(start, end);
      }
    }
  };

  const handleDelete = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    setSelectedReviewIndex(null);
    if (onHighlightLine) {
      onHighlightLine(null, null);
    }
  };

  return (
    <div className="w-1/2 md:mt-0">
      <div className="px-6">
        {reviews.length > 0 && (
          <div className="mt-4">
            {reviews
              .sort((a, b) => a.start - b.start || a.date.localeCompare(b.date))
              .map((item, index) => (
                <div
                  key={index}
                  className={`border p-4 mb-4 rounded-lg cursor-pointer ${
                    selectedReviewIndex === index ? 'bg-gray-100' : 'bg-white border-gray-300'
                  }`}
                  onClick={() => handleReviewClick(index, item.start, item.end)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-semibold text-gray-700">
                          {`라인 ${item.start} ~ ${item.end}`}
                        </div>
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
                          src={item.avatar}
                          alt="avatar"
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <div className="flex items-center">
                          <div className="font-semibold text-sm text-gray-600">{item.user}</div>
                          <div className="text-gray-500 mx-2">|</div>
                          <div className="text-gray-400 text-sm">{item.date}</div>
                        </div>
                      </div>
                      <div className="text-gray-800 font-medium text-sm">{item.text}</div> {/* Display the review text here */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        <div className="relative mt-24">
          <input
            type="text"
            className="border border-gray-300 p-4 mb-4 block w-full rounded-lg"
            placeholder="코드 리뷰 작성"
            value={review}
            onChange={handleReviewChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="absolute top-4 right-5 bg-white"
            onClick={saveReview}
            aria-label="Save Review"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <FaCircleArrowUp className={`w-6 h-6 ${isHovered ? 'text-color-blue-main' : 'text-gray-200'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewContainer;

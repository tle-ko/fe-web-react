import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ProblemPagiNation({ totalPage, currentPage, setCurrentPage }) {
  const PAGES_PER_LIST = 5; // 한 번에 보여줄 페이지 버튼 수
  const [showingNum, setShowingNum] = useState({ start: 1, end: PAGES_PER_LIST });

  const changePageNumbersBackward = () => {
    currentPage > PAGES_PER_LIST &&
      setShowingNum(prev => arrowHandler(prev, -1, totalPage));
  };

  const changePageNumberForward = () => {
    showingNum.end < totalPage &&
      setShowingNum(prev => arrowHandler(prev, 1, totalPage));
  };

  useEffect(() => {
    const lessThanFive = totalPage <= PAGES_PER_LIST;
    lessThanFive
      ? setShowingNum({ start: 1, end: totalPage })
      : setShowingNum({ start: 1, end: PAGES_PER_LIST });
  }, [totalPage]);

  const isFirstPage = showingNum.start === 1;
  const isLastPage = showingNum.end >= totalPage;
  const pages = Array.from({ length: showingNum.end - showingNum.start + 1 }, (_, idx) => showingNum.start + idx);

  return (
    <div className="flex gap-2 justify-center">
      <button
        onClick={changePageNumbersBackward}
        disabled={isFirstPage}
        className={`flex items-center justify-center w-10 h-10 bg-white rounded border border-gray-200 text-sm text-gray-500 ${isFirstPage ? '' : 'cursor-pointer'}`}
      >
        <FaChevronLeft />
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`flex items-center justify-center w-10 h-10 text-sm rounded ${page === currentPage ? 'bg-color-blue-main text-white ' : 'bg-white text-gray-500 border border-gray-200'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={changePageNumberForward}
        disabled={isLastPage}
        className={`flex items-center justify-center w-10 h-10 bg-white rounded border border-gray-200 text-sm text-gray-500 ${isLastPage ? '' : 'cursor-pointer'}`}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

function arrowHandler(prev, sign, totalPage) {
  const PAGES_PER_LIST = 5;
  const nextStart = prev.start + PAGES_PER_LIST * sign;
  const nextEnd = nextStart + PAGES_PER_LIST - 1;
  return {
    start: nextStart,
    end: nextEnd > totalPage ? totalPage : nextEnd,
  };
}
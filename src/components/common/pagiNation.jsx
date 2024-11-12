import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Pagination({ totalPage, currentPage, setCurrentPage }) {
  const PAGES_PER_LIST = 5; // 한 번에 보여줄 페이지 버튼 수
  const [showingNum, setShowingNum] = useState({ start: 1, end: PAGES_PER_LIST });

  const changePageNumbersBackward = () => {
    currentPage > PAGES_PER_LIST && setShowingNum((prev) => arrowHandler(prev, -1, totalPage));
  };

  const changePageNumberForward = () => {
    showingNum.end < totalPage && setShowingNum((prev) => arrowHandler(prev, 1, totalPage));
  };

  useEffect(() => {
    const lessThanFive = totalPage <= PAGES_PER_LIST;
    lessThanFive
      ? setShowingNum({ start: 1, end: totalPage })
      : setShowingNum({ start: 1, end: PAGES_PER_LIST });
  }, [totalPage]);

  const isFirstPage = showingNum.start === 1;
  const isLastPage = showingNum.end >= totalPage;
  const pages = Array.from(
    { length: showingNum.end - showingNum.start + 1 },
    (_, idx) => showingNum.start + idx
  );

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={changePageNumbersBackward}
        disabled={isFirstPage}
        className={`flex h-10 w-10 items-center justify-center rounded border border-gray-200 bg-white text-sm text-gray-500 ${isFirstPage ? '' : 'cursor-pointer'}`}
      >
        <FaChevronLeft />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`flex h-10 w-10 items-center justify-center rounded text-sm ${page === currentPage ? 'bg-color-blue-main text-white ' : 'border border-gray-200 bg-white text-gray-500'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={changePageNumberForward}
        disabled={isLastPage}
        className={`flex h-10 w-10 items-center justify-center rounded border border-gray-200 bg-white text-sm text-gray-500 ${isLastPage ? '' : 'cursor-pointer'}`}
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

export default Pagination;

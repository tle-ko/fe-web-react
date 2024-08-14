import React from 'react';

export default function SearchProblem({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-12 flex-col justify-start items-start gap-6 inline-flex">
      <p className="text-gray-900 text-xl font-semibold">문제 검색</p>
      <input
        className="w-[42.875rem] px-6 py-4 bg-gray-200 rounded-lg"
        placeholder="본인이 등록한 문제의 제목으로 검색해 주세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
import React from 'react';

export default function SearchProblem({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-12 inline-flex flex-col items-start justify-start gap-6">
      <p className="text-xl font-semibold text-gray-900">문제 검색</p>
      <input
        className="w-[42.875rem] rounded-lg bg-gray-200 px-6 py-4"
        placeholder="본인이 등록한 문제의 제목으로 검색해 주세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import useChildRoute from "../../hooks/useChildRoute";
import ProblemList from './problemList';
import ProblemPagination from '../../components/problemMain/problemPagiNation';
import Dropdown from "../../components/common/dropDown";
import { client } from '../../utils';

export default function ProblemListContainer() {
    const isChildRoute = useChildRoute("/problem/");
    const [pageIndex, setPageIndex] = useState(0);
    const [problemData, setProblemData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(1);
    const numOfPage = 16;

    const handlePageChange = (index) => {
      setPageIndex(index - 1);
    };

    const consonant = useMemo(() => ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'], []);

    const getConsonant = useCallback((str) => {
      return str.split('').map((char) => {
        const code = char.charCodeAt(0) - 44032;
        if (code < 0 || code > 11171) return char;
        return consonant[Math.floor(code / 588)];
      }).join('');
    }, [consonant]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProblemCount, setFilteredProblemCount] = useState(0);
    const [selectedOption, setSelectedOption] = useState("최신순");

    const fetchData = useCallback(async (query) => {
      setLoading(true);
      try {
        const response = await client.get('api/v1/problems', {
          params: {
            q: query
          },
          withCredentials: true
        });
        if (response.status === 200) {
          const data = Array.isArray(response.data.results) ? response.data.results : [];
          setProblemData(data);
        } else {
          console.error('Failed to fetch problem data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching problem data:', error);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      fetchData(searchTerm);
      setPageIndex(0); // 검색어가 변경될 때 페이지 인덱스를 초기화
    }, [fetchData, searchTerm]);

    useEffect(() => {
      if (loading) return;

      const searchTermConsonant = getConsonant(searchTerm.toLowerCase());
      let exactMatches = problemData.filter(problem => problem.title.toLowerCase().includes(searchTerm.toLowerCase()));
      let consonantMatches = problemData.filter(problem => {
        const titleConsonant = getConsonant(problem.title.toLowerCase());
        return titleConsonant.includes(searchTermConsonant) && !exactMatches.includes(problem);
      });
  
      let filteredData = [...exactMatches, ...consonantMatches];
      setFilteredProblemCount(filteredData.length);
  
      let sortedFilteredData = [...filteredData];
      if (selectedOption === "최신순") {
        sortedFilteredData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (selectedOption === "낮은순") {
        sortedFilteredData.sort((a, b) => a.analysis.difficulty.value - b.analysis.difficulty.value);
      } else if (selectedOption === "높은순") {
        sortedFilteredData.sort((a, b) => b.analysis.difficulty.value - a.analysis.difficulty.value);
      }
  
      setFilteredData(sortedFilteredData);
      setTotalPage(Math.ceil(sortedFilteredData.length / numOfPage));
    }, [problemData, searchTerm, selectedOption, getConsonant, loading, numOfPage]);
    
    return(
        <div>
        {isChildRoute ? (
          <Outlet />
        ) : (
        <>
            <div className="min-w-30rem">
              <div className="w-full mb-12 flex-col justify-start items-start gap-6 inline-flex">
              <p className="text-gray-900 text-xl font-semibold">문제 검색</p>
              <input
              className="w-1/2 min-w-fit px-6 py-4 bg-gray-200 rounded-lg"
              placeholder="본인이 등록한 문제의 제목으로 검색해 주세요."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
              </div>
            </div>
            <div className="min-w-30rem w-full mb-6 flex items-center justify-between">
              <p className="text-gray-900 text-xl font-semibold">{loading ? '데이터를 불러오는 중이에요!' : `${filteredProblemCount} 문제`}</p>
              <Dropdown 
                options={["최신순", "낮은순", "높은순"]}
                placeholder={"최신순"}
                selected={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
            </div>
            <ProblemList 
              data={filteredData} 
              pageIndex={pageIndex} 
              numOfPage={numOfPage} 
              isSearching={searchTerm !== ''}
              loading={loading}
            />
            <div className='min-w-30rem'>
              <ProblemPagination
                totalPage={totalPage}
                currentPage={pageIndex + 1}
                setCurrentPage={handlePageChange}
              />
            </div>
        </>
        )} 
    </div>
    );
}
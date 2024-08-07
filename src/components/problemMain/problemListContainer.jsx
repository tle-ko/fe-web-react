import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useChildRoute from "../../hooks/useChildRoute";
import useFetchData from '../../hooks/useFetchData';
import ProblemList from './problemList';
import Pagination from '../../components/common/pagiNation';
import Dropdown from "../../components/common/dropDown";

export default function ProblemListContainer() {
    const isChildRoute = useChildRoute("/problem/");
    const { data: problemData, loading } = useFetchData("http://timelimitexceeded.kr/api/v1/problems/search");
    const [pageIndex, setPageIndex] = useState(0);
    const numOfPage = 16;
    const [currentData, setCurrentData] = useState([]);

    const handlePageChange = (index) => {
      setPageIndex(index - 1);
    };

    const getConsonant = (str) => {
        return str.split('').map((char) => {
          const code = char.charCodeAt(0) - 44032;
          if (code < 0 || code > 11171) return char;
          return consonant[Math.floor(code / 588)];
        }).join('');
      };

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProblemCount, setFilteredProblemCount] = useState(0);
    const consonant = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const [selectedOption, setSelectedOption] = useState("최신순");

    useEffect(() => {
        if (!problemData) return;

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
          sortedFilteredData.sort((a, b) => b.id - a.id);
        } else if (selectedOption === "낮은순") {
          sortedFilteredData.sort((a, b) => {
            const difficultyA = a.difficulty.value;
            const difficultyB = b.difficulty.value;
            return difficultyA - difficultyB;
          });
        } else if (selectedOption === "높은순") {
          sortedFilteredData.sort((a, b) => {
            const difficultyA = a.difficulty.value;
            const difficultyB = b.difficulty.value;
            return difficultyB - difficultyA;
          });
        }
    
        const start = pageIndex * numOfPage;
        const end = start + numOfPage;
        setCurrentData(sortedFilteredData.slice(start, end));
      }, [problemData, pageIndex, numOfPage, searchTerm, selectedOption, getConsonant]);
    
    return(
        <div>
        {isChildRoute ? (
          <Outlet />
        ) : (
        <>
            <div>
            <div className="mb-12 flex-col justify-start items-start gap-6 inline-flex">
            <p className="text-gray-900 text-xl font-semibold">문제 검색</p>
            <input
            className="w-[42.875rem] px-6 py-4 bg-gray-200 rounded-lg"
            placeholder="본인이 등록한 문제의 제목으로 검색해 주세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            </div>
            <div className="max-w-full mb-6 flex items-center justify-between">
            <p className="text-gray-900 text-xl font-semibold">{loading ? 'Loading...' : `${filteredProblemCount} 문제`}</p>
            <Dropdown options={["최신순", "낮은순", "높은순"]}
            placeholder={"최신순"}
            onChange={(option) => setSelectedOption(option)}
            />
            </div>
            <ProblemList data={currentData} pageIndex={pageIndex} numOfPage={numOfPage} />
            <Pagination
            totalPage={Math.ceil(filteredProblemCount / numOfPage)}
            currentPage={pageIndex + 1}
            setCurrentPage={handlePageChange}
            />
        </>
        )} 
    </div>
    );
}
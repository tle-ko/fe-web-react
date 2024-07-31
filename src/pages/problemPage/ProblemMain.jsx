import React, { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import useChildRoute from "../../hooks/useChildRoute";
import useFetchData from "../../hooks/useEffectData";
import Footer from '../../components/common/footer';
import Button from "../../components/common/button";
import Dropdown from "../../components/common/dropDown";
import Modal from "../../components/common/modal";
import Alert from "../../components/common/alertContainer";
import Input from "../../components/common/input";
import Textarea from "../../components/common/textarea";
import Pagination from '../../components/common/pagiNation';

import Level1 from "../../assets/images/lv1.svg";
import Level2 from "../../assets/images/lv2.svg";
import Level3 from "../../assets/images/lv3.svg";
import Leveln from "../../assets/images/lvN.svg";

export default function ProblemMain() {
  const isChildRoute = useChildRoute("/problem/");
  const problemData = useFetchData("http://localhost:3000/data/problemData.json");
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProblemCount, setFilteredProblemCount] = useState(0);
  const consonant = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const [selectedOption, setSelectedOption] = useState("최신순");
  const [sortedProblemData, setSortedProblemData] = useState(problemData);
  const [pageIndex, setPageIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const numOfPage = 16;

  const [title, setTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [memoryLimit, setMemoryLimit] = useState('');
  const [problemUrl, setProblemUrl] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [outputDescription, setOutputDescription] = useState('');

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setState(value);
    } else {
      e.target.value = '';
    }
  };

  const [content, setContent] = useState(
    <div className="w-full flex flex-col gap-10 mt-10">
      <Input title="문제 제목" placeholder="제목을 작성해 주세요" onChange={(e) => setTitle(e.target.value)}/>
      <div className="w-full flex flex-wrap items-start gap-6" onChange={(e) => setTimeLimit(e.target.value)}>
        <Input title="시간 제한" placeholder="초" width="8.875" onChange={(e) => handleInputChange(e, setTimeLimit)} />
        <Input title="메모리 제한" placeholder="MB" width="8.875" onChange={(e) => handleInputChange(e, setMemoryLimit)} />
        <Input title="문제 URL" placeholder="백준 URL을 작성해 주세요" width="21" onChange={(e) => setProblemUrl(e.target.value)} />
      </div>
      <Textarea title="문제" placeholder="문제를 작성해 주세요" height="12" onChange={(e) => setProblemDescription(e.target.value)} />
      <Textarea title="입력" placeholder="입력 조건을 작성해 주세요" height="12" onChange={(e) => setInputDescription(e.target.value)}/>
      <Textarea title="출력" placeholder="출력 조건을 작성해 주세요" height="12" onChange={(e) => setOutputDescription(e.target.value)}/>
    </div>
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleRegisterProblem = () => {
    const requiredFields = [title, timeLimit, memoryLimit, problemUrl, problemDescription, inputDescription, outputDescription];
    const allFieldsFilled = requiredFields.every(field => field.trim() !== '');

    if (!allFieldsFilled) {
      alert('모든 필수 항목을 작성해 주세요');
    } else {
      // setContent(<Alert type="check" content="문제가 등록되었습니다." />);
      setIsAlertOpen(true); 
      setIsModalOpen(false);
    }
  };

  const handlePageChange = (page) => {
    setPageIndex(page - 1);
  };

  const getConsonant = (str) => {
    return str.split('').map((char) => {
      const code = char.charCodeAt(0) - 44032;
      if (code < 0 || code > 11171) return char;
      return consonant[Math.floor(code / 588)];
    }).join('');
  };

  useEffect(() => {
    const searchTermConsonant = getConsonant(searchTerm.toLowerCase());
    let exactMatches = problemData.filter(problem => problem.title.toLowerCase().includes(searchTerm.toLowerCase()));
    let consonantMatches = problemData.filter(problem => {
      const titleConsonant = getConsonant(problem.title.toLowerCase());
      return titleConsonant.includes(searchTermConsonant) && !exactMatches.includes(problem);
    });

    const filteredData = [...exactMatches, ...consonantMatches];
    setFilteredProblemCount(filteredData.length);

    let sortedFilteredData = [...filteredData];
    if (selectedOption === "최신순") {
      sortedFilteredData.sort((a, b) => b.id - a.id);
    } else if (selectedOption === "낮은순") {
      sortedFilteredData.sort((a, b) => {
        const difficultyA = a.analysis.length > 0 ? a.analysis[0].difficulty : 0;
        const difficultyB = b.analysis.length > 0 ? b.analysis[0].difficulty : 0;
        return difficultyA - difficultyB;
      });
    } else if (selectedOption === "높은순") {
      sortedFilteredData.sort((a, b) => {
        const difficultyA = a.analysis.length > 0 ? a.analysis[0].difficulty : 0;
        const difficultyB = b.analysis.length > 0 ? b.analysis[0].difficulty : 0;
        return difficultyB - difficultyA;
      });
    }
    setSortedProblemData(sortedFilteredData);

    const start = pageIndex * numOfPage;
    const end = start + numOfPage;
    setCurrentData(sortedFilteredData.slice(start, end));
  }, [problemData, pageIndex, numOfPage, searchTerm, selectedOption]);

  return (
    <div>
      {isChildRoute ? (
        <Outlet />
      ) : (
        <div>
          <div>
            <div className="max-w-full mb-12 flex items-end justify-between">
              <h2 className="text-gray-700 text-[1.75rem] font-bold font-cafe24">나의 문제 리스트</h2>
              <Button
                buttonSize="formBtn"
                colorStyle="blueWhite"
                content="문제 등록하기"
                onClick={handleOpenModal}
              />
            </div>
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
            <p className="text-gray-900 text-xl font-semibold">{problemData ? `${filteredProblemCount} 문제` : 'Loading...'}</p>
            <Dropdown options={["최신순", "낮은순", "높은순"]}
              placeholder={"최신순"}
              onChange={(option) => setSelectedOption(option)}
            />
          </div>
          
          <div className="cardGrid4 mb-16">
            {currentData.map((problem) => (
              <div key={problem.id} className="box flex-col justify-start items-start inline-flex gap-6">
                <div className="w-full containerTitle justify-start items-center gap-3 inline-flex overflow-hidden">
                  <img
                    className='w-6 h-8'
                    src={
                      problem.analysis && problem.analysis.length > 0 ? (
                        problem.analysis[0].difficulty === 1 ? Level1 :
                        problem.analysis[0].difficulty === 2 ? Level2 :
                        problem.analysis[0].difficulty === 3 ? Level3 :
                        Leveln
                      ) : Leveln
                    }
                    alt="Level Icon"
                  />
                  <p className='w-full text-gray-900 text-2xl font-bold truncate'>{problem.title}</p>
                </div>
                <div className='w-full flex justify-end'>
                  <Link to={`${problem.id}`}>
                    <Button
                      buttonSize="detailBtn"
                      colorStyle="whiteBlack"
                      content="문제 상세"
                      onClick={() => console.log('Button clicked')}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            totalPage={Math.ceil(filteredProblemCount / numOfPage)}
            currentPage={pageIndex + 1}
            setCurrentPage={handlePageChange}
          />
        </div>
      )}
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="문제 등록하기"
        content={content}
        buttonText="문제 등록하기"
        onButtonClick={handleRegisterProblem}
      />
      <Modal
        isOpen={isAlertOpen}
        onClose={handleCloseModal}
        content={<Alert type="check" content="문제가 등록되었습니다." />}
      />
    </div>
  );
}
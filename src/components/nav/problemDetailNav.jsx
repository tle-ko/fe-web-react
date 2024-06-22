import { Link } from 'react-router-dom';
import useFetchData from "../../hooks/useEffectData";

export default function ProblemDetailNav({problemId}) {
  // mock데이터 problemData.json url을 fetch함수로 호출해 그 응답 state로 저장
  const data = useFetchData("http://localhost:3000/data/problemData.json");

  // 받은 problemId와 일치하는 데이터 찾기
  // problemId를 숫자로 변환하여 비교
  const problem = data.find(problem => problem.id === parseInt(problemId, 10));

  // 날짜 형식을 변환하는 함수
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes} 등록`;
  };

  return(
        <div className='w-screen py-3 top-[129px] left-0 fixed bg-white border-b border-gray-200 justify-center inline-flex'>
          {problem ? (
            <div className='flex w-10/12 px-[142px] justify-between items-center'>
              <div className='justify-start items-center gap-1 inline-flex'>
              <Link
                className='bg-gray-50 px-4 py-3 rounded justify-center items-center flex text-gray-600 text-center text-sm font-semibold hover:text-color-blue-main hover:bg-color-blue-w25'
                to = {problem.link}
              >
              문제 링크
              </Link>
              <Link
                className='bg-gray-50 px-4 py-3 rounded justify-center items-center flex text-gray-600 text-center text-sm font-semibold hover:text-color-blue-main hover:bg-color-blue-w25'
              >
              수정
              </Link>
              <Link
                className='bg-gray-50 px-4 py-3 rounded justify-center items-center flex text-gray-600 text-center text-sm font-semibold hover:text-color-red-x hover:bg-[#FAD9DD]'
              >
              삭제
              </Link>
              </div>
              <p className='text-right text-gray-900'>{formatDate(problem.created_at)}</p>
            </div>
          ) : (
              <div>해당하는 문제가 없습니다.</div>
          )}
        </div>
    )
    }

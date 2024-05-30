import { Link } from 'react-router-dom';
import useFetchData from "../../hooks/useEffectData";

export default function ProblemDetailNav({problemId}) {
  // mock데이터 problemData.json url을 fetch함수로 호출해 그 응답 state로 저장
  const data = useFetchData("http://localhost:3000/data/problemData.json");

  // 받은 problemId와 일치하는 데이터 찾기
  // problemId를 숫자로 변환하여 비교
  const problem = data.find(problem => problem.id === parseInt(problemId, 10));

  return(
        <div>
        {problem ? (
            <div className="w-screen py-3 top-[129px] left-0 fixed px-[120px] bg-white border-b border-gray-200 flex-col justify-start items-start inline-flex">
            <div className="justify-start items-center gap-1 inline-flex">
            <Link
              className='bg-gray-50 px-4 py-3 rounded justify-center items-center flex text-gray-600 text-center text-sm font-semibold hover:text-color-blue-main hover:bg-color-blue-w25'
              to = {problem.url}
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
        </div>
        ) : (
            <div>해당하는 문제가 없습니다.</div>
        )}
        </div>
    )
    }

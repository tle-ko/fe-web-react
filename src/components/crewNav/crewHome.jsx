/* 크루nav - 홈의 컨텐츠 전체*/
import { Link } from 'react-router-dom';

export default function CrewHome() {
  return(
    <div className="w-screen h-16 py-3 top-[128px] left-0 fixed px-[120px] bg-white border-b border-gray-200 flex-col justify-start items-start inline-flex">
        <div className="justify-start items-center gap-1 inline-flex">
            <Link className="px-4 py-3 bg-color-blue-w75 rounded justify-center items-center flex" to="">
                <p className="w-8 text-center text-blue-500 text-sm font-semibold">홈</p>
            </Link>
            <Link className="px-4 py-3 bg-gray-50 rounded justify-center items-center flex" to="">
                <p className="w-8 text-center text-gray-600 text-sm font-semibold">문제</p>
            </Link>
            <Link className="px-4 py-3 bg-gray-50 rounded justify-center items-center flex" to="">
                <p className="w-8 text-center text-gray-600 text-sm font-semibold">관리</p>
            </Link>
        </div>
    </div>
  )
}
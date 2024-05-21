import { Link } from 'react-router-dom';
import logoBlack from '../../assets/images/logo-black.svg';

export default function Footer() {
    return(
<div className="max-w-full mt-32 bg-color-bg left-0 ">
    <div className= "max-w-full px-12 pt-6 pb-12 border-t items-end border-gray-500 p-6 justify-between flex">
        <div className="flex-col justify-center items-start gap-1 inline-flex">
            <p className="text-gray-500 text-sm font-semibold">2024년 상명대학교 컴퓨터과학전공 캡스톤디자인</p>
            <p className="text-gray-500 text-sm font-medium">코딩메리호 김동주 조유진 이유민 강윤진 김서영 민기홍</p>
        </div>
        <div className="flex-col justify-center items-end gap-1 inline-flex">
            <div className="justify-start items-end gap-1 inline-flex">
                <p className="text-gray-500 font-bold">time limit exceeded,</p>
                <Link to="/"><img className="w-14" src={logoBlack} alt='' /></Link>
            </div>
            <p className="text-gray-500 text-sm font-semibold">Copyright 2024. TLE. All rights reserved.</p>
    </div>
    </div>
</div>
    )
  }
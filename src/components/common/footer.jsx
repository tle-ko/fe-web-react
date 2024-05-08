import { Link } from 'react-router-dom';
import logoBlack from '../../assets/images/logo-black.svg';

export default function footer() {
    return(
<div className="w-[1680px] h-[105px] flex-col justify-start items-center inline-flex">
    <div className="w-[1680px] h-[0px] border border-gray-400"></div>
    <div className="p-6 justify-center items-center gap-[1003px] inline-flex">
        <div className="flex-col justify-center items-start gap-1 inline-flex">
            <div className="w-[350px] text-gray-500 text-sm font-semibold font-['Pretendard']">2024년 상명대학교 컴퓨터과학전공 캡스톤디자인 </div>
            <div className="w-[366px] text-gray-500 text-sm font-medium font-['Pretendard']">코딩메리호 김동주 조유진 이유민 강윤진 김서영 민기홍</div>
        </div>
        <div className="flex-col justify-center items-end gap-1 inline-flex">
            <div className="justify-start items-end gap-2 inline-flex">
                <div className="w-[153px] text-center text-gray-500 text-base font-bold font-['Pretendard']">time limit exceeded</div>
                <div className="w-[57.42px] h-9 pt-[0.04px] pb-[0.03px] justify-center items-center flex">
                    <Link className="w-[57.42px] h-[35.93px]" to=""><img src={logoBlack} alt='' /></Link>
                </div>
            </div>
            <div className="text-center text-gray-500 text-sm font-semibold font-['Pretendard']">Copyright 2024. TLE. All rights reserved.</div>
        </div>
    </div>
</div>
    )
  }
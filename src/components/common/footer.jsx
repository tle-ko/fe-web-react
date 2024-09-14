import { Link } from 'react-router-dom';
import logoBlack from '../../assets/images/logo-black.svg';
import logoWhite from '../../assets/images/logo-white.svg';

export default function Footer({ color }) {
    const FooterColor = color === 'white' ? 'white' : 'gray-500';
    const logo = color === 'white' ? logoWhite : logoBlack;

    return (
        <div className="w-full min-w-30rem mt-32 left-0">
            <div className={`w-full min-w-fit px-12 pt-6 pb-12 border-t border-${FooterColor} p-6 justify-between items-center inline-flex flex-wrap-reverse md:flex-nowrap`}>
                <div className={`flex flex-col justify-center items-start gap-1 text-${FooterColor}`}>
                    <p className="text-sm font-semibold">2024년 상명대학교 컴퓨터과학전공 캡스톤디자인</p>
                    <p className="text-sm font-medium">코딩메리호 김동주 조유진 이유민 강윤진 김서영 민기홍</p>
                </div>
                <div className={`flex flex-col justify-center items-start gap-1 text-${FooterColor} md:items-end`}>
                    <div className={`inline-flex text-${FooterColor} justify-end items-center gap-1`}>
                        <p className="text-sm font-bold">time limit exceeded,</p>
                        <Link to="/"><img className="w-12" src={logo} alt='TLELOGO' /></Link>
                    </div>
                    <p className="text-sm font-semibold">Copyright 2024. TLE. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

/**
 * usage
 * prop 없을 시 gray-500, black 로고
 * <Footer 
    color="white" 
    />
 */
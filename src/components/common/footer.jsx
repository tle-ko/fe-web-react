import { Link } from 'react-router-dom';
import logoBlack from '../../assets/images/logo-black.svg';
import logoWhite from '../../assets/images/logo-white.svg';

export default function Footer({ color }) {
  const FooterColor = color === 'white' ? 'white' : 'gray-500';
  const logo = color === 'white' ? logoWhite : logoBlack;

  return (
    <div className="left-0 mt-32 w-full min-w-30rem">
      <div
        className={`w-full min-w-fit border-t px-12 pb-12 pt-6 border-${FooterColor} inline-flex flex-wrap-reverse items-center justify-between p-6 md:flex-nowrap`}
      >
        <div className={`flex flex-col items-start justify-center gap-1 text-${FooterColor}`}>
          <p className="text-sm font-semibold">2024년 상명대학교 컴퓨터과학전공 캡스톤디자인</p>
          <p className="text-sm font-medium">
            코딩메리호 김동주 조유진 이유민 강윤진 김서영 민기홍
          </p>
        </div>
        <div
          className={`flex flex-col items-start justify-center gap-1 text-${FooterColor} md:items-end`}
        >
          <div className={`inline-flex text-${FooterColor} items-center justify-end gap-1`}>
            <p className="text-sm font-bold">time limit exceeded,</p>
            <Link to="/">
              <img className="w-12" src={logo} alt="TLELOGO" />
            </Link>
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

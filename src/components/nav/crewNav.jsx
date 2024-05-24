import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CrewNav() {
  // 현재 선택된 링크를 관리하기 위한 상태
  const [selectedLink, setSelectedLink] = useState('');

  // 링크 선택 시 상태를 업데이트하는 함수
  const handleLinkClick = (linkName) => {
    setSelectedLink(linkName);
  };

  useEffect(() => {
    setSelectedLink('home');
  }, []);

  return(
    <div className="w-screen h-16 py-3 top-[128px] left-0 fixed px-[120px] bg-white border-b border-gray-200 flex-col justify-start items-start inline-flex">
        <div className="justify-start items-center gap-1 inline-flex">
            <Link
              className={`${selectedLink === 'home' ? 'bg-color-blue-w75' : 'bg-gray-50'} px-4 py-3 rounded justify-center items-center flex`}
              to=""
              onClick={() => handleLinkClick('home')}
            >
                <p className={`${selectedLink === 'home' ? 'text-blue-500' : 'text-gray-600'} w-8 text-center text-sm font-semibold`}>홈</p>
            </Link>
            <Link
              className={`${selectedLink === 'problem' ? 'bg-color-blue-w75' : 'bg-gray-50'} px-4 py-3 rounded justify-center items-center flex`}
              to=""
              onClick={() => handleLinkClick('problem')}
            >
                <p className={`${selectedLink === 'problem' ? 'text-blue-500' : 'text-gray-600'} w-8 text-center text-sm font-semibold`}>문제</p>
            </Link>
            <Link
              className={`${selectedLink === 'admin' ? 'bg-color-blue-w75' : 'bg-gray-50'} px-4 py-3 rounded justify-center items-center flex`}
              to=""
              onClick={() => handleLinkClick('admin')} 
            >
                <p className={`${selectedLink === 'admin' ? 'text-blue-500' : 'text-gray-600'} w-8 text-center text-sm font-semibold`}>관리</p>
            </Link>
        </div>
    </div>
  )
}

export default CrewNav;

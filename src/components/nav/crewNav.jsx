// crewNav.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetchData from '../../hooks/useEffectData'; // useFetchData 훅의 경로로 수정

function CrewNav({ crewId, userId }) {
  const [selectedLink, setSelectedLink] = useState('');
  const [hostId, setHostId] = useState(null);
  const location = useLocation(); // 현재 url

  // 데이터 가져오기
  const crewData = useFetchData("http://localhost:3000/data/crewData.json");

  useEffect(() => {
    if (crewData) {
      const crew = crewData.find(crew => crew.id === parseInt(crewId));
      if (crew) {
        setHostId(crew.host_id);
      }
    }
  }, [crewData, crewId]);

  const handleLinkClick = (linkName) => {
    setSelectedLink(linkName);
  };

  useEffect(() => {
    setSelectedLink('home');
  }, []);

  // 현재 URL의 기본 경로
  const basePath = location.pathname.split('/').slice(0, 3).join('/');


  return (
    <div className="w-screen h-16 py-3 top-[128px] left-0 fixed px-[120px] bg-white border-b border-gray-200 flex-col justify-start items-start inline-flex z-10"> 
        <div className="justify-start items-center gap-1 inline-flex">
            <Link
              className={`${selectedLink === 'home' ? 'bg-color-blue-w25' : 'bg-gray-50'} px-4 py-3 rounded justify-center items-center flex`}
              to={basePath} // 현재 crew 페이지 접속
              onClick={() => handleLinkClick('home')}
            >
                <p className={`${selectedLink === 'home' ? 'text-blue-500' : 'text-gray-600'} w-8 text-center text-sm font-semibold`}>홈</p>
            </Link>
            <Link
              className={`${selectedLink === 'problem' ? 'bg-color-blue-w25' : 'bg-gray-50'} px-4 py-3 rounded justify-center items-center flex`}
              to={`${basePath}/problems`} // 현재 crew의 문제 url로 이동
              onClick={() => handleLinkClick('problem')}
            >
                <p className={`${selectedLink === 'problem' ? 'text-blue-500' : 'text-gray-600'} w-8 text-center text-sm font-semibold`}>문제</p>
            </Link>
            {userId === hostId && (
              <Link
                className={`${selectedLink === 'admin' ? 'bg-color-blue-w25' : 'bg-gray-50'} px-4 py-3 rounded justify-center items-center flex`}
                to={`${basePath}/admin`} // 현재 crew의 관리 url로 이동
                onClick={() => handleLinkClick('admin')} 
              >
                <p className={`${selectedLink === 'admin' ? 'text-blue-500' : 'text-gray-600'} w-8 text-center text-sm font-semibold`}>관리</p>
              </Link>
            )}
        </div>
    </div>
  );
}

export default CrewNav;

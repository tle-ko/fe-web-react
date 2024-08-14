import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFetchData from "../../hooks/useEffectData";

function CrewHeaderWithNav({ crewId, userId }) {
  // Header 상태와 데이터 가져오기
  const data = useFetchData("http://localhost:3000/data/crewData.json");
  const crew = data.find(crew => crew.id === parseInt(crewId, 10));

  // Nav 상태와 데이터 가져오기
  const [selectedLink, setSelectedLink] = useState('');
  const [hostId, setHostId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (data) {
      const crew = data.find(crew => crew.id === parseInt(crewId, 10));
      if (crew) {
        setHostId(crew.host_id);
      }
    }
  }, [data, crewId]);

  useEffect(() => {
    const storedLink = localStorage.getItem('selectedLink');
    if (storedLink) {
      setSelectedLink(storedLink);
    } else {
      setSelectedLink('home');
    }
  }, []);

  const handleLinkClick = (linkName) => {
    setSelectedLink(linkName);
    localStorage.setItem('selectedLink', linkName);
  };

  const basePath = location.pathname.split('/').slice(0, 3).join('/');

  return (
    <div>
      {crew ? (
        <div className="w-screen bg-white top-16 left-0 fixed z-10">
          <div className="w-full h-16 px-28 py-4 flex flex-row gap-2 items-center border-b border-gray-200">
            <div className="flex justify-center items-center">
              <div className="icon flex justify-center items-center">{crew.icon}</div>
            </div>
            <div className="font-cafe24 text-2xl">{crew.name}</div>
          </div>
          <div className="w-full h-16 py-3 px-28 bg-white border-b border-gray-200 flex justify-start items-center gap-1">
            <Link
              className={`${selectedLink === 'home' ? 'bg-color-blue-w25 text-blue-500' : 'bg-gray-50 text-gray-600 hover:text-blue-500'} px-4 py-3 rounded justify-center items-center flex hover:bg-color-blue-w25`}
              to={basePath}
              onClick={() => handleLinkClick('home')}
            >
              <p className="w-8 text-center text-sm font-semibold">홈</p>
            </Link>
            <Link
              className={`${selectedLink === 'problem' ? 'bg-color-blue-w25 text-blue-500' : 'bg-gray-50 text-gray-600 hover:text-blue-500'} px-4 py-3 rounded justify-center items-center flex hover:bg-color-blue-w25`}
              to={`${basePath}/problems`}
              onClick={() => handleLinkClick('problem')}
            >
              <p className="w-8 text-center text-sm font-semibold">문제</p>
            </Link>
            {userId === hostId && (
              <Link
                className={`${selectedLink === 'admin' ? 'bg-color-blue-w25 text-blue-500' : 'bg-gray-50 text-gray-600 hover:text-blue-500'} px-4 py-3 rounded justify-center items-center flex hover:bg-color-blue-w25`}
                to={`${basePath}/admin`}
                onClick={() => handleLinkClick('admin')}
              >
                <p className="w-8 text-center text-sm font-semibold">관리</p>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default CrewHeaderWithNav;

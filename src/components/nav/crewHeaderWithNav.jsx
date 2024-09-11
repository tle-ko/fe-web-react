import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { client } from "../../utils";

function CrewHeaderWithNav() {
  const { id } = useParams(); 
  const [crew, setCrew] = useState(null);
  const [selectedLink, setSelectedLink] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const response = await client.get(`/api/v1/crew/${id}/dashboard`, {
          withCredentials: true
        });
        if (response.status === 200) {
          setCrew(response.data);
        } else {
          console.error("크루 데이터를 불러오지 못했어요.", response.statusText);
        }
      } catch (error) {
        console.error("크루 데이터를 불러오는 데 오류가 발생했어요.", error);
      }
    };

    fetchCrewData();
  }, [id]);

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setSelectedLink(path === id ? 'home' : path);
  }, [location.pathname, id]);

  const handleLinkClick = (linkName) => {
    if (linkName === selectedLink) {
      // 이미 선택된 링크를 클릭하면 동일한 URL로 navigate하여 리렌더링 유도
      navigate(0); // 현재 URL로 새로고침
    } else {
      setSelectedLink(linkName);
      navigate(linkName === 'home' ? basePath : `${basePath}/${linkName}`);
    }
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
            <button
              className={`${selectedLink === 'home' ? 'bg-color-blue-w25 text-blue-500' : 'bg-gray-50 text-gray-600 hover:text-blue-500'} px-4 py-3 rounded justify-center items-center flex hover:bg-color-blue-w25`}
              onClick={() => handleLinkClick('home')}
            >
              <p className="w-8 text-center text-sm font-semibold">홈</p>
            </button>
            <button
              className={`${selectedLink === 'problems' ? 'bg-color-blue-w25 text-blue-500' : 'bg-gray-50 text-gray-600 hover:text-blue-500'} px-4 py-3 rounded justify-center items-center flex hover:bg-color-blue-w25`}
              onClick={() => handleLinkClick('problems')}
            >
              <p className="w-8 text-center text-sm font-semibold">문제</p>
            </button>
            {crew.is_captain && (
              <button
                className={`${selectedLink === 'admin' ? 'bg-color-blue-w25 text-blue-500' : 'bg-gray-50 text-gray-600 hover:text-blue-500'} px-4 py-3 rounded justify-center items-center flex hover:bg-color-blue-w25`}
                onClick={() => handleLinkClick('admin')}
              >
                <p className="w-8 text-center text-sm font-semibold">관리</p>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-screen bg-white top-16 left-0 fixed z-10">
          <div className="w-full h-16 px-28 py-4 border-b border-gray-200"></div>
          <div className="w-full h-16 py-3 px-28 bg-white border-b border-gray-200 "></div>
        </div>
      )}
    </div>
  );
}

export default CrewHeaderWithNav;

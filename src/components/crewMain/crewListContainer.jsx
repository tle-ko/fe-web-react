import CrewList from './crewList';
import TagFilter from './tagFilter';
import Pagination from '../../components/common/pagiNation';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useChildRoute from '../../hooks/useChildRoute';
import { client } from '../../utils';

export default function CrewListContainer() {
  const isChildRoute = useChildRoute('/crew/');
  const [crews, setCrews] = useState([]);
  const [filteredCrews, setFilteredCrews] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const numOfPage = 12;
  const [selectedTags, setSelectedTags] = useState({ languages: [], tiers: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialEmpty, setIsInitialEmpty] = useState(false); // 초기 데이터가 없는지 확인하는 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await client.get('api/v1/crews/recruiting', {
          withCredentials: true,
        });
        if (response.status === 200) {
          const data = response.data;
          setCrews(data);
          setFilteredCrews(data); // 초기에는 모든 크루를 표시
          setIsInitialEmpty(data.length === 0); // 초기 데이터가 없으면 true로 설정
        } else {
          console.error('Failed to fetch crew data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching crew data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = crews.filter((crew) => {
      const matchesLanguage =
        selectedTags.languages.length === 0 ||
        crew.tags.some(
          (tag) => tag.type === 'language' && selectedTags.languages.includes(tag.name)
        );
      const matchesTier =
        selectedTags.tiers.length === 0 ||
        crew.tags.some((tag) => {
          if (tag.type === 'level') {
            const crewTier = tag.name.split(' ')[0];
            return selectedTags.tiers.includes(`${crewTier} 이상`);
          }
          return false;
        });
      return matchesLanguage && matchesTier;
    });

    setFilteredCrews(filtered);
  }, [crews, selectedTags]);

  return (
    <div className="flex w-full flex-col gap-6">
      {isChildRoute ? (
        <Outlet />
      ) : (
        <>
          <div className="text-xl font-semibold text-gray-900">크루 목록</div>
          <TagFilter onUpdateTags={setSelectedTags} />
          <CrewList
            filters={filteredCrews}
            pageIndex={pageIndex}
            numOfPage={numOfPage}
            isLoading={isLoading}
            isInitialEmpty={isInitialEmpty} // 초기 데이터 여부 전달
          />
          <div className="w-full">
            <Pagination
              totalPage={Math.ceil(filteredCrews.length / numOfPage)}
              currentPage={pageIndex + 1} // 1-based로 변환하여 전달
              setCurrentPage={(page) => setPageIndex(page - 1)} // 1-based에서 0-based로 변환하여 저장
            />
          </div>
        </>
      )}
    </div>
  );
}

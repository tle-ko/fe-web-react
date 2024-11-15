import { useEffect, useState } from 'react';
import { client } from '../../utils';
import { useParams } from 'react-router-dom';

export default function CrewHeaderProblem() {
  const { problemId } = useParams(); // problemId로 받기

  const [problem, setProblem] = useState();

  // 문제 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        const response = await client.get(`/crew/activity/problem/${problemId}`);
        if (response.status === 200) {
          setProblem(response.data);
        } else {
          console.error('크루 문제 데이터를 불러오지 못했어요.', response.statusText);
        }
      } catch (error) {
        console.error('크루 문제 데이터를 불러오는데 문제가 발생했어요.', error);
      }
    };

    fetchProblemDetail();
  }, [problemId]); // problemId를 의존성으로 설정

  return (
    <div>
      <div className="boerder-gray-200 fixed left-0 top-16 z-10 flex h-16 w-screen flex-row items-center gap-2 border bg-white py-4">
        {problem ? (
          <p className="px-[7.5rem] font-cafe24 text-2xl">{problem.title}</p>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

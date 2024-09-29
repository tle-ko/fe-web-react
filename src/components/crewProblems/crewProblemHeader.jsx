import { useEffect, useState } from "react";
import { client } from "../../utils";
import { useParams } from "react-router-dom";

export default function CrewHeaderProblem() {
  const { problemId } = useParams(); // problemId로 받기

  const [problem, setProblem] = useState();

  // 문제 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        const response = await client.get(`/api/v1/crew/activity/problem/${problemId}`);
        if (response.status === 200) {
          setProblem(response.data);
        } else {
          console.error("크루 문제 데이터를 불러오지 못했어요.", response.statusText);
        }
      } catch (error) {
        console.error("크루 문제 데이터를 불러오는데 문제가 발생했어요.", error);
      }
    };

    fetchProblemDetail();
  }, [problemId]); // problemId를 의존성으로 설정

  return (
    <div>
      <div className="w-screen h-16 bg-white top-16 left-0 fixed py-4 flex flex-row gap-2 items-center border boerder-gray-200 z-10">
        {problem ? (
          <p className="px-[7.5rem] font-cafe24 text-2xl">{problem.title}</p>
        ) : (
          <div></div>
        )}
    </div>
    </div>
  );
}

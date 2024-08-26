import useFetchData from "../../hooks/useEffectData";

export default function CrewHeaderProblem({ problemId }) {

  const data = useFetchData("http://localhost:3000/data/problemData.json");

  // 받은 problemId와 일치하는 데이터 찾기
  // problemId를 숫자로 변환하여 비교
  const problem = data.find(problem => problem.id === parseInt(problemId, 10));

  // problem이 존재하면 해당 데이터를 사용하여 렌더링
  return (
    <div>
      {problem ? (
        <div className="w-screen h-16 bg-white top-16 left-0 fixed  py-4 flex flex-row gap-2 items-center border boerder-gray-200">
          <p className="px-[7.5rem] font-cafe24 text-2xl">{problem.title}</p>
        </div>
      ) : (
        <div>해당하는 문제가 없습니다.</div>
      )}
    </div>
  )
}
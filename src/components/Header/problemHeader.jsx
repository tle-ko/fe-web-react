import useFetchData from "../../hooks/useEffectData";

export default function ProblemHeader({ problemId }) {
  // mock데이터 problemData.json url을 fetch함수로 호출해 그 응답 state로 저장
  const data = useFetchData("http://localhost:3000/data/problemData.json");

  // 받은 problemId와 일치하는 데이터 찾기
  // problemId를 숫자로 변환하여 비교
  const problem = data.find(problem => problem.id === parseInt(problemId, 10));

  // problem이 존재하면 해당 데이터를 사용하여 렌더링
  return (
    <div>
      {problem ? (
        <div className="w-screen bg-white border-b border-gray-200 top-16 left-0 fixed px-[120px] py-4 flex flex-row">
          <div className="font-cafe24 text-2xl">{problem.title}</div>
        </div>
      ) : (
        <div>해당하는 문제가 없습니다.</div>
      )}
    </div>
  )
}
import useFetchData from "../../hooks/useEffectData";

export default function CrewHeader({ crewId }) {
  // mock데이터 crewData.json url을 fetch함수로 호출해 그 응답 state로 저장
  const data = useFetchData("http://localhost:3000/data/crewData.json");

  // 받은 crewId와 일치하는 데이터 찾기
  // crewId를 숫자로 변환하여 비교
  const crew = data.find(crew => crew.id === parseInt(crewId, 10));

  // crew가 존재하면 해당 데이터를 사용하여 렌더링
  return (
    <div>
    {crew ? (
      <div className="w-screen h-16 bg-white top-16 left-0 fixed px-28 py-4 flex flex-row gap-2 items-center">
        <div className="flex justify-center items-center">
          <div className="icon flex justify-center items-center">{crew.icon}</div>
        </div>
        <div className="font-cafe24 text-2xl">{crew.name}</div>
      </div>
      ) : (
      <div></div>
      )}
    </div>
  )
}
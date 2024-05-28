export default function SideNav({ elements }) {
  return (
    <div className="box w-3/5 flex-col justify-start items-start gap-4 inline-flex">
      {elements.map((element, index) => (
        <div key={index} className="flex-col justify-start items-start gap-3 flex">
          <div className="px-4 py-3 bg-white rounded justify-start items-start inline-flex">
            <div className=" text-gray-600 text-base font-semibold">{element}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 *   // url의 crewId값을 CrewHeader에 보내주기 위해 id값 얻기
  let { id } = useParams();
  // SideNav에 들어갈 요소 리스트 넣기
  // 아래는 예시로, 사용하는 nav 내용에 따라 리스트 변경하면 됨.
  const elements = ["1주차", "2주차", "3주차", "4주차"]

  return(
    <div>
      <CrewHeader crewId={ id } />
      <div className="cardGrid2">
        <SideNav elements={elements}/>
        
      </div>
    </div>
 */
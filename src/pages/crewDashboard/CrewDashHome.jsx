import { useParams } from "react-router-dom"
import SubHeader from "../../components/Header/subHeader"
import SideNav from "../../components/nav/sideNav"

export default function CrewDashHome(){
  // url의 crewId값을 SubHeader에 보내주기 위해 id값 얻기
  let { id } = useParams();
  // SideNav에 들어갈 요소 리스트 넣기
  // 아래는 예시로, 사용하는 nav 내용에 따라 리스트 변경하면 됨.
  const elements = ["1주차", "2주차", "3주차", "4주차"]

  return(
    <div>
      <SubHeader crewId={ id } />
      <div className="cardGrid2">
        <SideNav elements={elements}/>
        
      </div>
    </div>
  )
}
import { useParams } from "react-router-dom";
import CrewHeader from "../../components/Header/crewHeader";
import CrewNav from "../../components/nav/crewNav";

export default function CrewDashHome(){
  // url의 crewId값을 crewHeader 보내주기 위해 id값 얻기
  let { id } = useParams();

  return(
    <div>
      <CrewHeader crewId={ id } />
      <CrewNav />
    </div>
  )
}
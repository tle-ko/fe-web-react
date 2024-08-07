// crewDashboard.jsx

import { useParams, Routes, Route, Navigate } from "react-router-dom";
import CrewHeaderWithNav from "../../components/nav/crewHeaderWithNav";
import CrewDashContainer from "../../components/crewDashboard/crewDashContainer";
import CrewDashAdmin from '../../components/crewAdmin/crewAdminContainer';
import CrewDashProblem from '../../components/crewProblems/crewProblemContainer';

export default function CrewDashHome() {
  // url의 crewId값을 crewHeader 보내주기 위해 id값 얻기
  let { id } = useParams();
  const userId = 1; // userId는 필요한 값으로 설정

  return (
    <div>
      <CrewHeaderWithNav crewId={id} userId={userId} />
      <div className="mt-20">
        <Routes>
          <Route path="/" element={<CrewDashContainer userId={userId} />} />
          <Route path="problems" element={<CrewDashProblem userId={userId} />} />
          <Route path="admin" element={<CrewDashAdmin />} />
          <Route path="*" element={<Navigate to="." />} />  {/* 기본 경로로 리다이렉트 */}
        </Routes>
      </div>
    </div>
  );
}

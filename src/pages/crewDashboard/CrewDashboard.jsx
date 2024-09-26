import { useParams, Routes, Route, Navigate, useLocation } from "react-router-dom";
import CrewHeaderWithNav from "../../components/nav/crewHeaderWithNav";
import CrewDashContainer from "../../components/crewDashboard/crewDashContainer";
import CrewDashAdmin from '../../components/crewAdmin/crewAdminContainer';
import CrewDashProblem from '../../components/crewProblems/crewProblemContainerInNav';
import CrewProblemDetail from '../../components/crewProblems/crewProblemDetail';
import CrewProblemSubmit from '../../components/crewProblems/crewProblemSubmit';
import CodeReview from "../crewProblems/CodeReview";

export default function CrewDashHome() {
  let { id } = useParams();
  const location = useLocation();

  const shouldHideHeader = location.pathname.includes(`/crew/${id}/problems/`) && (location.pathname.endsWith(`/submit`) || location.pathname.split('/').length === 5);

  return (
    <div>
      {!shouldHideHeader && <CrewHeaderWithNav />}
      <div className={shouldHideHeader ? "mt-0" : "mt-20"}>
        <Routes>
          <Route path="/" element={<CrewDashContainer />} />
          <Route path="problems" element={<CrewDashProblem />} />
          <Route path="problems/:problemId" element={<CrewProblemDetail />} />
          <Route path="problems/:problemId/submit" element={<CrewProblemSubmit />} />
          <Route path="problems/:problemId/submit/:submitId" element={<CodeReview />} />
          <Route path="admin" element={<CrewDashAdmin />} />
          <Route path="*" element={<Navigate to="." />} />  
        </Routes>
      </div>
    </div>
  );
}

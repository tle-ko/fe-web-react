import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import AccountingSetting from '../pages/accountSetting/AccountSetting';
import CrewCodeReview from '../pages/crewCodeReview/CrewCodeReview';
import CrewAdmin from '../pages/crewDashboard/CrewDashAdmin';
import CrewDashHome from '../pages/crewDashboard/CrewDashHome';
import CrewProblem from '../pages/crewDashboard/CrewDashProblem';
import CrewMain from '../pages/crewMain/CrewMain';
import Main from '../pages/mainPage/Main';
import MyPortfolio from '../pages/myPortfolio/MyPortfolio';
import ProblemMain from '../pages/problemPage/ProblemMain';
import ProblemDetail from '../pages/problemPage/ProblemDetaile';
import Signin from '../pages/signin/Signin';
import Signup from '../pages/signup/Signup';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/" element={<Main />}/>
        <Route path="/mySetting" element={<AccountingSetting />}/>
        <Route path="/codeReview" element={<CrewCodeReview />}/>
        <Route path="/crew" element={<CrewMain />}>
          <Route path=":id" element={<Outlet />}>
            <Route path="" element={<CrewDashHome />} />
            <Route path="problems" element={<CrewProblem />} />
            <Route path="admin" element={<CrewAdmin />} />
          </Route>
        </Route>
        <Route path="/Problem" element={<ProblemMain />}>
          <Route path=":id" element={<ProblemDetail />} />
        </Route>
        <Route path="/myPofol" element={<MyPortfolio />} />
      </Routes>
    </BrowserRouter>
  )
}
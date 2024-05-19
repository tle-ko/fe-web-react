import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/mainHeader';
import AccountingSetting from '../pages/accountSetting/AccountSetting';
import CrewCodeReview from '../pages/crewCodeReview/CrewCodeReview';
import CrewDashAdmin from '../pages/crewDashboard/CrewDashAdmin';
import CrewDashHome from '../pages/crewDashboard/CrewDashHome';
import CrewProblem from '../pages/crewDashboard/CrewDashProblem';
import CrewMain from '../pages/crewMain/CrewMain';
import Main from '../pages/mainPage/Main';
import MyPortfolio from '../pages/myPortfolio/MyPortfolio';
import ProblemMain from '../pages/problemPage/ProblemMain';
import ProblemDetail from '../pages/problemPage/ProblemDetail';
import Signin from '../pages/signin/Signin';
import Signup from '../pages/signup/Signup';

export default function Router() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/" element={<Main />}/>
        <Route path="/mySetting" element={<AccountingSetting />}/>
        <Route path="/codeReview" element={<CrewCodeReview />}/>
        <Route path="/crew" element={<CrewMain />}>
          <Route path=":id" element={<CrewDashHome />}>
            <Route path="problems" element={<CrewProblem />} />
            <Route path="admin" element={<CrewDashAdmin />} />
          </Route>
        </Route>
        <Route path="/Problem" element={<ProblemMain />}>
          <Route path="problemId" element={<ProblemDetail />} />
        </Route>
        <Route path="/myPofol" element={<MyPortfolio />} />
      </Routes>
    </BrowserRouter>
  )
}
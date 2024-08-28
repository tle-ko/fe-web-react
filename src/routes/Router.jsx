import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/mainHeader';
import MySetting from '../pages/myPage/MySetting';
import CrewDashHome from '../pages/crewDashboard/CrewDashboard';
import CrewMain from '../pages/crewMain/CrewMain';
import Main from '../pages/mainPage/Main';
import MyPortfolio from '../pages/myPage/MyPortfolio';
import ProblemMain from '../pages/problemPage/ProblemMain';
import ProblemDetail from '../pages/problemPage/ProblemDetail';
import Signin from '../pages/signin/Signin';
import Signup from '../pages/signup/Signup';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Main />} />
        <Route path="/myPage" element={<MySetting />} />
        <Route path="/crew" element={<CrewMain />}>
          <Route path=":id/*" element={<CrewDashHome />} />
        </Route>
        <Route path="/problem" element={<ProblemMain />}>
          <Route path=":id" element={<ProblemDetail />} />
        </Route>
        <Route path="/myPofolio" element={<MyPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

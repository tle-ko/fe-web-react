import { useLocation } from "react-router-dom";

// 자식 url이 포함되어 있다면 route 변경
const useChildRoute = (childPath) => {
  const location = useLocation();
  const isChildRoute = location.pathname.includes(childPath);
  return isChildRoute;
};

export default useChildRoute;

/**
[ usage example ]

// 버튼 클릭 시 부모 url의 기본 cardGrid4가 사라지고 자식 url 정보만 남기기
export default function CrewMain(){
  const isChildRoute = useChildRoute("/crew/");

  return(
    <div>
      {isChildRoute ? (
          <Outlet />
        ) : (
          <div className="cardGrid4">
            <div className="box">
              <Link to={"/crew/id"}><button>버튼</button></Link>
            </div>
          </div>
        )}
    </div>
  );
}

 */

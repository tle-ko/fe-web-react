import { useState, useEffect } from "react";

/* mock데이터 Data.json url을 fetch함수로 호출해 응답을 state로 저장 */
const useFetchData = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);  // 데이터 state에 저장
      })
      .catch(error => console.log("데이터 불러오기 실패", error));
  }, [url]);

  return data;
};

export default useFetchData;
  // 토큰을 로컬 스토리지에 저장  
  export const setToken = (token) => {
    localStorage.setItem('accessToken', token);
  };
  
  // 토큰을 로컬 스토리지에서 가져오기
  export const getToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  // 토큰 삭제 (로그아웃 시 사용)
  export const removeToken = () => {
    localStorage.removeItem('accessToken');
  };
  
  // 토큰이 있는지 확인 (로그인 상태 확인)
  export const isLoggedIn = () => {
    return !!getToken();
  };

  export const setUserInfo = (username, profile_image) => {
    localStorage.setItem('username', username);
    localStorage.setItem('profile_image', profile_image);
  };

  export const getUserName = () => {
    return localStorage.getItem('username');
  };

  export const getUserProfile = () => {
    return localStorage.getItem('profile_image');
  };

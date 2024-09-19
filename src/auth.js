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

  export const setUserInfo = (id, username, profile_image) => {
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    
    if (profile_image && profile_image.startsWith('blob:')) {
      fetch(profile_image)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = function() {
            localStorage.setItem('profile_image', reader.result);
          }
          reader.readAsDataURL(blob);
        });
    } else {
      localStorage.setItem('profile_image', profile_image);
    }
  };
  export const getUserId = () => {
    return localStorage.getItem('id');
  };

  export const getUserName = () => {
    return localStorage.getItem('username');
  };

  export const getUserProfile = () => {
    const profileImage = localStorage.getItem('profile_image');
    const defaultProfileImage = 'https://i.ibb.co/xDxmBXd/defult-profile-image.png';
    return profileImage && profileImage.startsWith('data:') ? profileImage : profileImage || defaultProfileImage;
  };
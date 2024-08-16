import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../../assets/images/logo-white.svg';
import { isLoggedIn, removeToken, getUserName, getUserProfile } from '../../auth';

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (loggedIn) {
      setUsername(getUserName());
      setProfileImage(getUserProfile());
    }
  }, [loggedIn]);

  const openDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  const handleLogout = () => {
    removeToken(); 
    window.location.href = '/';
  }

  return (
    <div className="w-full h-16 fixed top-0 left-0 z-10 px-4 py-3 bg-color-blue-main text-white text-xl flex justify-center items-center min-w-[55rem]">
      <div className='w-full flex justify-between items-center px-36 gap-16'>
        <Link className="w-14" to="/"><img src={logoWhite} alt='logo' /></Link>
        <div className='flex flex-row justify-between items-center w-full'>
          <div className="flex gap-8">
            <Link className='font-cafe24' to="/problem">Problem</Link>
            <Link className='font-cafe24' to="/crew">Crew</Link>
          </div>

          {loggedIn ? (
            <div className="relative">
              <div className="justify-start items-center gap-6 inline-flex cursor-pointer"
                onClick={openDropdown}>
                <div className="justify-start items-center gap-3 flex cursor-pointer">
                  <p className="text-right text-white text-base font-medium cursor-pointer">{username} 님</p>
                </div>
                <img className="w-9 h-9 rounded-full" src={profileImage} alt="profile"/>
              </div>
              {dropdownVisible && (
                <div className="absolute top-full mt-2 p-4 bg-white opacity-75 border-color-gray-200 flex flex-col justify-start rounded-xl ">
                  <Link className="text-gray-600 text-sm whitespace-nowrap p-2 hover:text-color-blue-main" 
                  to="/portfolio">
                    마이 포트폴리오</Link>
                  <Link className="text-gray-600 text-sm whitespace-nowrap p-2 hover:text-color-blue-main" 
                  to="/setting">
                    마이 페이지</Link>
                  <Link className="text-gray-600 text-sm p-2 underline whitespace-nowrap hover:text-color-blue-main"
                  onClick={handleLogout}>
                    로그아웃</Link>
                </div>
              )}
            </div>
          ) : (
            <div className='flex gap-6'>
              <Link className="underline whitespace-nowrap" to="/signin">sign in</Link>
              <Link className="whitespace-nowrap" to="/signup">sign up</Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

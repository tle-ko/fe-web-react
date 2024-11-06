import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '../../assets/images/logo-white.svg';
import { isLoggedIn, removeToken, getUserName, getUserProfile } from '../../auth';
import '../../styles/animation.css';

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const dropdownRef = useRef(null);

  const loggedIn = isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      setUsername(getUserName());
      setProfileImage(getUserProfile());
    }
  }, [loggedIn]);

  const openDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/');
    window.location.reload();
  };

  const handleProtectedLinkClick = (event, path) => {
    if (!loggedIn) {
      event.preventDefault();
      alert('로그인이 필요해요!');
      navigate('/signin');
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="fixed left-0 top-0 z-20 flex h-16 w-full min-w-[48rem] items-center justify-center bg-color-blue-main py-3 text-xl text-white">
      <div className="flex w-full items-center justify-between gap-12 px-[128px]">
        <Link className="hover-scale w-14" to="/">
          <img src={logoWhite} alt="logo" />
        </Link>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex gap-8">
            <p
              className="hover-scale cursor-pointer font-cafe24"
              onClick={(e) => handleProtectedLinkClick(e, '/problem')}
            >
              Problem
            </p>
            <Link className="hover-scale font-cafe24" to="/crew">
              Crew
            </Link>
          </div>

          {loggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="inline-flex cursor-pointer items-center justify-start gap-6"
                onClick={openDropdown}
              >
                <div className="flex cursor-pointer items-center justify-start gap-3">
                  <p className="cursor-pointer text-right text-base font-medium text-white">
                    {username} 님
                  </p>
                </div>
                <img
                  className="h-9 w-9 rounded-full object-cover"
                  src={profileImage}
                  alt="profile"
                />
              </div>
              {dropdownVisible && (
                <div className="border-color-gray-200 animate-drop-down absolute top-full mt-2 flex flex-col justify-start rounded-xl bg-white p-4 opacity-90">
                  <Link
                    className="whitespace-nowrap p-2 text-sm text-gray-600 hover:text-color-blue-main"
                    to="/myPortfolio"
                  >
                    마이 포트폴리오
                  </Link>
                  <Link
                    className="whitespace-nowrap p-2 text-sm text-gray-600 hover:text-color-blue-main"
                    to="/myPage"
                  >
                    마이 페이지
                  </Link>
                  <p
                    className="cursor-pointer whitespace-nowrap p-2 text-sm text-gray-600 underline hover:text-color-blue-main"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-6">
              <Link className="hover-scale whitespace-nowrap underline" to="/signin">
                sign in
              </Link>
              <Link className="hover-scale whitespace-nowrap" to="/signup">
                sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

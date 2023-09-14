import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogOut() {
  const navigate = useNavigate();

  const logoutKakao = () => {
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <>
      <div onClick={logoutKakao}>로그아웃</div>
    </>
  );
}

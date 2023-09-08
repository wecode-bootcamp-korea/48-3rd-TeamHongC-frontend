import React from 'react';
import './LoggingIn.scss';
import NavMain from '../../../components/Nav/NavMain';

export default function LoggingIn() {
  return (
    <div className="loggingIn">
      <NavMain />
      <div className="loggingImg">
        <img src="/images/nav_logo.png" alt="로딩 이미지" />
        <div>로그인 중입니다 :)</div>
      </div>
    </div>
  );
}

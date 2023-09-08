import React from 'react';
import KakaoButton from './components/KakaoButton';
import './Main.scss';

export default function Main() {
  return (
    <div className="main">
      <div className="mainBtn">
        <KakaoButton />
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import NavMain from '../../components/Nav/NavMain';
import KakaoButton from './components/KakaoButton';
import './Main.scss';

export default function Main() {
  return (
    <div className="main">
      <NavMain />
      <div className="mainBtn">
        <KakaoButton />
      </div>
    </div>
  );
}

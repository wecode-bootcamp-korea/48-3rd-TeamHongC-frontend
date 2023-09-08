import React from 'react';
import './KakaoButton.scss';

function KakaoButton() {
  const kakaoKey = async () => {
    const restApi = process.env.REACT_APP_KAKAO_KEY;
    const redirectUri = `http://localhost:3000/callback-kakao`;
    return `https://kauth.kakao.com/oauth/authorize?client_id=${restApi}&redirect_uri=${redirectUri}&response_type=code`;
  };

  const fetchGetURL = async () => {
    try {
      const url = await kakaoKey();

      console.log(url);
      document.location.href = url;
    } catch (error) {
      alert('카카오로 시작하기 에러!');
      console.error(error);
    }
  };

  return (
    <button className="kakaoBtn" onClick={fetchGetURL}>
      카카오로 시작하기
    </button>
  );
}

export default KakaoButton;

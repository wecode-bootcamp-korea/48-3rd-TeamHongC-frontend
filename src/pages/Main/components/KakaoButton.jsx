import React from 'react';
import './KakaoButton.scss';

function KakaoButton() {
  const kakaoKey = async () => {
    const restApi = process.env.KAKAO_KEY;
    const redirectUri = `http://localhost:3000/callback/kakao`;
    return `https://kauth.kakao.com/oauth/authorize?client_id=${restApi}&redirect_uri=${redirectUri}&response_type=code`;
  };

  // 카카오 인가코드를 받기위한 URL 가져오기
  const fetchGetURL = async () => {
    try {
      const url = await kakaoKey();

      console.log(url); // 응답으로 온 url
      document.location.href = url; // 페이지 이동
    } catch (error) {
      alert('Function fetchGetURL error!');
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

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import LoggingIn from './LoggingIn';

function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code') || '';

  const axiosLogin = async code => {
    try {
      const tokenData = await getToken(code);
      const response = await axios.post(
        'http://localhost:3001/user/kakaosign',
        {},
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: tokenData.access_token,
          },
        },
      );
      const result = await response.data;

      localStorage.setItem('token', result.accessToken);
      navigate('/product-list');
    } catch (error) {
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
      console.error(error);
    }
  };

  const getToken = async code => {
    try {
      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
          client_id: process.env.REACT_APP_KAKAO_KEY,
          code,
          grant_type: 'authorization_code',
          redirect_uri: `http://localhost:3000/callback-kakao`,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const tokenData = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      };

      return tokenData;
    } catch (error) {
      throw new Error('카카오 토큰 가져오기에 실패했습니다');
    }
  };

  useEffect(() => {
    if (code) {
      axiosLogin(code);
    }
  }, [code, axiosLogin]);

  return (
    <div className="callback">
      <LoggingIn />
    </div>
  );
}

export default KakaoCallback;

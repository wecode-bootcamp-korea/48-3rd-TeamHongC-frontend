import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoCallback() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  /**
   * @description 로그인하기
   */
  const fetchLogin = useCallback(
    async code => {
      try {
        const param = {
          code,
        };

        const response = await (
          await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(param), // string으로 전달해야함
          })
        ).json();

        console.log(response); // { nickname: '#######' }

        navigate('/product-list'); // API 호출 성공 시 제품 리스트 페이지로 이동
      } catch (error) {
        alert('Function fetchLogin error!');
        console.error(error);
      }
    },
    [navigate],
  );

  /**
   * @description login API fetch
   */
  useEffect(() => {
    if (code) {
      fetchLogin(code);
    }
  }, [code, fetchLogin]);

  /**
   * @description code 값 가져오기
   */
  useEffect(() => {
    const Address = new URL(window.location.href); // url 가져오기
    const code = Address.searchParams.get('code') || ''; // code value

    setCode(code);
  }, []);

  //Router.js에 Callback routing 하기

  return <div className="callback">Wait....</div>;
}

export default KakaoCallback;

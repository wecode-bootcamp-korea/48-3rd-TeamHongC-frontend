import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoggingIn from './LoggingIn';

function KakaoCallback() {
  const navigate = useNavigate();
  const Address = new URL(window.location.href);
  const code = Address.searchParams.get('code') || '';

  const fetchLogin = useCallback(
    async code => {
      try {
        const response = await (
          await fetch('http://localhost:3001/user/kakaologin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          })
        ).json();

        console.log(response);

        navigate('/product-list');
      } catch (error) {
        alert('로그인 에러!');
        console.error(error);
      }
    },
    [navigate],
  );

  useEffect(() => {
    if (code) {
      fetchLogin(code);
    }
  }, [code, fetchLogin]);

  return (
    <div className="callback">
      <LoggingIn />
    </div>
  );
}

export default KakaoCallback;

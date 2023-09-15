import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PaymentRedirect.scss';
import axios from 'axios';

export default function PaymentCompleted() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pgToken = searchParams.get('pg_token');

  useEffect(() => {
    axios
      .post(
        'http://localhost:3001/payment/complete',
        { pgToken, userId: '1' },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // Authorization: localStorage.getItem('token'),
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          navigate('/payment-completed');
        }
      })
      .catch();
  }, []);

  return (
    <div className="paymentCompleted">
      <div className="paymentDone">
        <div className="paymentImg">
          <img src="/images/payment-done.png" alt="aside 이미지" />
          <p>결제중입니다.</p>
        </div>
      </div>
    </div>
  );
}

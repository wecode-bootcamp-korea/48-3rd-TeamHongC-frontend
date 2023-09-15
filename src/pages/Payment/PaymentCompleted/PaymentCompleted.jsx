import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBack from '../../../components/Nav/NavBack';
import Button from '../../../components/Button/Button';
import './PaymentCompleted.scss';

export default function PaymentCompleted() {
  const navigate = useNavigate();

  const goToProductList = () => {
    navigate('/product-list');
  };

  return (
    <div className="paymentCompleted">
      <NavBack title="결제 완료" />
      <div className="paymentDone">
        <div className="paymentImg">
          <img src="/images/payment-done.png" alt="aside 이미지" />
          <p>결제가 완료되었습니다.</p>
        </div>
        <div className="paymentDonBtn">
          <Button text="메인으로 이동" onClick={goToProductList} />
        </div>
      </div>
    </div>
  );
}

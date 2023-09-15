import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBack from '../../../components/Nav/NavBack';
import Button from '../../../components/Button/Button';
import './PaymentFailed.scss';

export default function PaymentFailed() {
  const navigate = useNavigate();

  const goToProductList = () => {
    navigate('/product-detail');
  };

  return (
    <div className="paymentCompleted">
      <NavBack title="결제 실패" />
      <div className="paymentDone">
        <div className="paymentImg">
          <img src="/images/payment-failed.png" alt="aside 이미지" />
          <p>결제를 실패했습니다.</p>
        </div>
        <div className="paymentDonBtn">
          <Button text="상품 페이지로 이동" onClick={goToProductList} />
        </div>
      </div>
    </div>
  );
}

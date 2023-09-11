import React from 'react';
import NavBack from '../../components/Nav/NavBack';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import './PaymentCompleted.scss';

export default function PaymentCompleted() {
  const titleText = '결제 완료';
  const btnText = '메인으로 이동하기';

  const navigate = useNavigate();
  const goToMainBtn = () => {
    navigate('/product-list');
  };

  return (
    <div className="paymentCompleted">
      <NavBack title={titleText} />
      <div className="paymentCompletedContainer">
        <div className="paymentCompletedMessage">결제가 완료되었습니다.</div>
        <Button text={btnText} onClick={goToMainBtn} />
      </div>
    </div>
  );
}

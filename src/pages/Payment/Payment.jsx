import React, { useState } from 'react';
import './Payment.scss';
import NavBack from '../../components/Nav/NavBack';
import Button from '../../components/Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const paymentUserInfo = [
    { label: '이름', type: 'text', placeholder: '이름을 입력해주세요.' },
    {
      label: '전화번호',
      type: 'text',
      placeholder: '전화번호를 입력해주세요.',
    },
  ];

  const titleText = '결제';
  const btnText = '결제 완료';

  const navigate = useNavigate();
  const paymentCompletedBtn = () => {
    navigate('/payment-completed');
  };

  const [paymentInfo, setPaymentInfo] = useState({});

  const paymentToKakao = () => {
    const requestData = {
      totalPayment,
    };

    axios
      .post(`backEndURL`, requestData)
      .then(({ response }) => {
        const {} = response;
        setPaymentInfo({
          ...paymentInfo,
        });
      })
      .catch(error => {
        console.error('데이터 가져오기 실패:', error);
      });
  };

  const [minValue, setMinValue] = useState(1);

  const handleMinValueChange = event => {
    const newValue = parseInt(event.target.value, 10);

    if (isNaN(newValue) || newValue < 1) {
      alert('최소 수량은 1개 입니다.');
    } else {
      setMinValue(newValue);
    }
  };

  const totalPayment = paymentInfo.paymentPrice + 1000 * minValue;

  return (
    <div className="payment">
      <NavBack title={titleText} />
      <div className="paymentContainer">
        <div className="paymentContainerWorkPlace">
          <div className="paymentContainerInfoTitle">상품 구매 정보</div>
          <div className="paymentContainerProductInfo">
            <div className="paymentContainerProductDetail">
              <div className="paymentContainerProductTitle">상품명</div>
              <div className="paymentContainerProductData">
                {paymentInfo.productName}
              </div>
            </div>
            <div className="paymentContainerProductDetail">
              <div className="paymentContainerProductTitle">구매수량</div>
              <div>
                <input
                  className="paymentContainerProductDataInput"
                  type="number"
                  value={minValue}
                  onChange={handleMinValueChange}
                />
                개
              </div>
            </div>
          </div>

          <div className="paymentContainerInfoTitle">구매자 정보</div>
          <div className="paymentContainerProductInfo">
            <div>
              {paymentUserInfo.map((item, index) => (
                <div className="paymentContainerProductDetail" key={index}>
                  <div className="paymentContainerProductTitle">
                    {item.label}
                  </div>
                  <input
                    className="paymentContainerUserData"
                    type={item.type}
                    placeholder={item.placeholder}
                  />
                </div>
              ))}
            </div>
            <div className="paymentContainerProductDetail">
              <div className="paymentContainerProductTitle">결제수단</div>
              <button className="paymentButton" onClick={paymentToKakao}>
                <img
                  src="/images/payment_icon_yellow_small.png"
                  alt="이미지 불러오기 실패"
                />
              </button>
            </div>
          </div>

          <div className="totalPaymentPadding">
            <div className="totalPaymentContainer">
              <div className="totalPaymentContainerTitle">총 결제 금액</div>
              <div className="totalPaymentContainerPrice">
                <div>{totalPayment}</div>
                <div>원</div>
              </div>
            </div>
          </div>

          <div className="paymentCompletedBtn">
            <Button text={btnText} onClick={paymentCompletedBtn} />
          </div>
        </div>
      </div>
    </div>
  );
}

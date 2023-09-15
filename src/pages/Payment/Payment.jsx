import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBack from '../../components/Nav/NavBack';
import Button from '../../components/Button/Button';
import './Payment.scss';

export default function Payment() {
  const { id: productId } = useParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [quantity, setQuantity] = useState(1);

  const paymentUserInfo = [
    { label: '이름', type: 'text', placeholder: '이름을 입력해주세요.' },
    {
      label: '전화번호',
      type: 'text',
      placeholder: '전화번호를 입력해주세요.',
    },
  ];

  const paymentToKakao = () => {
    const requestData = {
      userId: '1',
      quantity: quantity,
      itemId: productId,
      itemName: callBackName,
      totalAmount: totalPayment,
      approvalUrl: 'http://localhost:3000/payment-redirect',
      cancelUrl: 'http://localhost:3000/payment-cancel',
      failUrl: 'http://localhost:3000/payment-failed',
    };

    axios
      .post('http://localhost:3001/payment/paid', requestData, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // Authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        window.location.href = data.redirectUrl;
      })
      .catch(error => {
        console.error('데이터 가져오기 실패:', error);
      });
  };

  const handleQuantity = event => {
    const newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue) || newValue < 1) {
      alert('최소 수량은 1개 입니다.');
    } else {
      setQuantity(newValue);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/payment/${productId}`,
        );
        setPaymentInfo(res.data);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };
    fetchData();
  }, []);

  const totalPayment = paymentInfo?.price * quantity;
  const callBackName = paymentInfo?.productName;

  return (
    <div className="payment">
      <NavBack title="결제" />
      <div className="paymentContainer">
        <div className="paymentContainerWorkPlace">
          <div className="paymentContainerInfoTitle">상품 구매 정보</div>
          <div className="paymentContainerProductInfo">
            <div className="paymentContainerProductDetail">
              <div className="paymentContainerProductTitle">상품명</div>
              <div className="paymentContainerProductData">
                {paymentInfo?.productName}
              </div>
            </div>
            <div className="paymentContainerProductDetail">
              <div className="paymentContainerProductTitle">구매수량</div>
              <div>
                <input
                  className="paymentContainerProductDataInput"
                  type="number"
                  value={quantity}
                  onChange={handleQuantity}
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
              <img
                src="/images/payment_icon_yellow_small.png"
                alt="이미지 불러오기 실패"
              />
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
            <Button text="카카오페이로 결제하기" onClick={paymentToKakao} />
          </div>
        </div>
      </div>
    </div>
  );
}

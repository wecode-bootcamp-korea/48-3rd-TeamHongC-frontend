import React from 'react';
import './Payment.scss';

export default function Payment() {
  const paymentUserInfo = [
    { label: '이름', type: 'text', placeholder: '이름을 입력해주세요.' },
    {
      label: '전화번호',
      type: 'number',
      placeholder: '전화번호를 입력해주세요.',
    },
  ];
  return (
    <div className="payment">
      <div className="paymentContainer">
        <div className="paymentContainerWorkPlace">
          <div className="paymentContainerInfoTitle">상품 구매 정보</div>
          <div className="paymentContainerProductInfo">
            <div className="paymentContainerProductDetail">
              <div className="paymentContainerProductTitle">상품명</div>
              <div className="paymentContainerProductData">productListData</div>
            </div>
            <div className="paymentContainerProductDetail">
              <div className="paymentContainerProductTitle">구매수량</div>
              <input
                className="paymentContainerProductData"
                type="number"
                placeholder="수량을 입력해주세요."
              />
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
              <button>카드결제</button>
            </div>
          </div>

          <div className="totalPaymentPadding">
            <div className="totalPaymentContainer">
              <div className="totalPaymentContainerTitle">총 결제 금액</div>
              <div className="totalPaymentContainerPrice">
                <div>totalPayment</div>
                <div>원</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

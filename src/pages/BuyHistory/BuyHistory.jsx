import React from 'react';
import NavBack from '../../components/Nav/NavBack';
import './BuyHistory.scss';

export default function BuyHistory() {
  return (
    <div className="buyHistory">
      <NavBack title="구매내역" />
      <div className="buyHistoryList">
        {/* {buyList.map(buyHistory => ( */}
        <div className="buyList" key="">
          <div className="productTitle">
            <div className="productName">상품명</div>
            <div className="productPrice">13,000원</div>
          </div>
          <div className="paymentBgColor">
            <div className="payment">
              <div className="paymentMethod">카드결제</div>
              <div className="paymentStatus">거래중</div>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}

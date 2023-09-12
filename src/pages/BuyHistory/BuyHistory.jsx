import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBack from '../../components/Nav/NavBack';
import './BuyHistory.scss';

export default function BuyHistory() {
  const [buyData, setBuyData] = useState([]);

  useEffect(() => {
    const axiosData = async () => {
      try {
        const response = await axios.get(
          'http://10.58.52.129:3000/mypage/buyhistory',
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              //authorization: localStorage.getItem('TOKEN'),
            },
          },
        );
        setBuyData(response.data);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    axiosData();
  }, []);

  return (
    <div className="buyHistory">
      <NavBack title="구매내역" />c
      <div className="buyHistoryList">
        {buyData.map(buyHistory => (
          <div className="buyList" key={buyHistory.itemid}>
            <div className="productTitle">
              <div className="productName">{buyHistory.title}</div>
              <div className="productPrice">{buyHistory.price}원</div>
            </div>
            <div className="paymentBgColor">
              <div className="payment">
                <div className="paymentMethod">카카오페이</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

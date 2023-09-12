import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBack from '../../components/Nav/NavBack';
import './SalesHistory.scss';

export default function SalesHistory() {
  const [salesData, setSalesData] = useState([]);
  const navigate = useNavigate();

  const goToSalesEdit = () => {
    navigate('/sales-edit');
  };

  useEffect(() => {
    const axiosData = async () => {
      try {
        const response = await axios.get(
          'http://10.58.52.129:3000/mypage/salehistory',
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              //authorization: localStorage.getItem('token'),
            },
          },
        );
        setSalesData(response.data);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    axiosData();
  }, []);

  const salesDeleting = item => {
    const deleteData = async () => {
      try {
        const response = await axios.delete('API', {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            //authorization: localStorage.getItem('token'),
          },
        });

        if (response.status === 200) {
          alert('삭제 완료');
        }

        const result = response.data;
        console.log(result);
      } catch (error) {
        console.error('삭제 실패:', error);
      }
    };

    deleteData();
  };

  return (
    <div className="salesHistory">
      <NavBack title="판매내역" />
      <div className="salesHistoryList">
        {salesData.map(salesHistory => (
          <div className="salesList" key={salesHistory.itemId}>
            <div className="salesProductTitle">
              <div className="salesProductName">{salesHistory.title}</div>
              <div className="salesProductPrice">{salesHistory.price}원</div>
            </div>
            <div className="salesPaymentBgColor">
              <div className="sales">
                <div className="salesEditBtn">
                  <div className="editBtn" onClick={goToSalesEdit}>
                    수정
                  </div>
                  <div className="btnDivision" />
                  <div
                    className="deleteBtn"
                    /*onClick={() => salesDeleting(salesHistory.productId)}*/
                  >
                    삭제
                  </div>
                </div>
                <div className="salesStatus">{salesHistory.itemCount}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

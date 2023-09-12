import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBack from '../../components/Nav/NavBack';
import './SalesHistory.scss';

export default function SalesHistory() {
  const navigate = useNavigate();

  const goToSalesEdit = () => {
    navigate('/sales-edit');
  };

  return (
    <div className="salesHistory">
      <NavBack title="판매내역" />
      <div className="salesHistoryList">
        {/* {salesList.map(buyHistory => ( */}
        <div className="salesList" key="">
          <div className="salesProductTitle">
            <div className="salesProductName">판매 상품명</div>
            <div className="salesProductPrice">13,000원</div>
          </div>
          <div className="salesPaymentBgColor">
            <div className="sales">
              <div className="salesEditBtn">
                <div className="editBtn" onClick={goToSalesEdit}>
                  수정
                </div>
                <div className="btnDivision" />
                <div className="deleteBtn">삭제</div>
              </div>
              <div className="salesStatus">판매중</div>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}

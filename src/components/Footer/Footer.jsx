import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footerStyle">
        <div className="footerIcons">
          <Link to="/product-list" className="footerLink">
            홈
          </Link>
        </div>
        <div className="footerIcons">
          <Link to="/view-surrounging-products" className="footerLink">
            내주변
          </Link>
        </div>
        <div className="footerIcons">
          <Link to="/set-my-location" className="footerLink">
            상품등록
          </Link>
        </div>
        <div className="footerIcons">
          <Link to="/mypage" className="footerLink">
            마이페이지
          </Link>
        </div>
      </div>
    </div>
  );
}

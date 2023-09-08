import React from 'react';
import NavBack from '../../components/Nav/NavBack';
import LogOut from './components/LogOut';
import { MyPageTabs } from './data/mypagedata';
import './MyPage.scss';

export default function MyPage() {
  const { SHOPPING_TABS, SERVICE_TABS } = MyPageTabs();

  return (
    <div className="myPage">
      <NavBack title="마이페이지" />
      <div className="myPageContents">
        <div className="profile">
          <div className="profileName">
            <img
              className="profileImg"
              src="/images/user.png"
              alt="프로필 사진"
            />
            <p>닉네임</p>
            <img
              className="salesMark"
              src="/images/sales-mark.png"
              alt="판매자 마크"
            />
          </div>
          <div className="profileBtn">
            <button>프로필 수정</button>
          </div>
        </div>
        <div className="mypageTabs">
          <div className="shoppingList">
            <h2>쇼핑</h2>
            <ul className="shopping">
              {SHOPPING_TABS.map(shopping => (
                <li key={shopping.id}>
                  <div onClick={shopping.onClick}>{shopping.title}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="service">
            <h2>고객센터</h2>
            <ul className="services">
              {SERVICE_TABS.map(service => (
                <li key={service.id}>
                  <div>{service.title}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="logOut">
            <ul className="services">
              <li>
                <LogOut />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

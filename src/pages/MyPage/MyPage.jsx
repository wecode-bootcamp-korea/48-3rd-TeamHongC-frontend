import React from 'react';
import NavBack from '../../components/Nav/NavBack';
import Profile from './components/Profile';
import LogOut from './components/LogOut';
import { MyPageTabs } from './data/mypagedata';
import './MyPage.scss';

export default function MyPage() {
  const { SHOPPING_TABS, SERVICE_TABS } = MyPageTabs();

  return (
    <div className="myPage">
      <NavBack title="마이페이지" />
      <div className="myPageContents">
        <Profile />
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBack from '../../components/Nav/NavBack';
import Profile from './components/Profile';
import LogOut from './components/LogOut';
import { MyPageTabs } from './data/mypagedata';
import './MyPage.scss';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const [myPageData, setMyPageData] = useState([]);
  const { SHOPPING_TABS, SERVICE_TABS } = MyPageTabs();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []);
  useEffect(() => {
    const axiosData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/mypage', {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem('token'),
          },
        });
        setMyPageData(response.data[0]);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    axiosData();
  }, []);

  return (
    <div className="myPage">
      <NavBack title="마이페이지" />
      <div className="myPageContents">
        <Profile profileData={myPageData} />
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
            <ul className="logOutBtn">
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

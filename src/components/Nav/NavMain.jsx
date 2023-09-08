import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import './NavMain.scss';

const NavMain = () => {
  return (
    <div className="navMain">
      <div className="logo">
        <img className="logoImage" src="/images/nav_logo.png" />
        <p className="title">홍시나무</p>
      </div>
      <div className="search">
        <HiOutlineSearch className="searchIcon" />
      </div>
    </div>
  );
};

export default NavMain;

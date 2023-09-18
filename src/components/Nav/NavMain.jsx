import React, { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import SearchModal from '../SearchModal/SearchModal';
import './NavMain.scss';

const NavMain = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="navMain">
      <div className="logo">
        <img className="logoImage" src="/images/nav_logo.png" />
        <p className="title">홍시나무</p>
      </div>
      <div className="search">
        <HiOutlineSearch className="searchIcon" onClick={showModal} />
      </div>
      {modalOpen && <SearchModal />}
    </div>
  );
};

export default NavMain;

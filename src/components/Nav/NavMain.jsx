import React, { useState } from 'react';
import SearchModal from '../SearchModal/SearchModal';
import { HiOutlineSearch } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import './NavMain.scss';

const NavMain = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="navMain">
      <div className="logo">
        <img className="logoImage" src="/images/nav_logo.png" />
        <p className="title">홍시나무</p>
      </div>
      <div className="search">
        {!modalOpen && (
          <HiOutlineSearch className="searchIcon" onClick={showModal} />
        )}
        {modalOpen && (
          <AiOutlineClose className="searchIcon" onClick={closeModal} />
        )}
      </div>
      {modalOpen && <SearchModal />}
    </div>
  );
};

export default NavMain;

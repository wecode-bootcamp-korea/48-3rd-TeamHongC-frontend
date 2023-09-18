import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import './SearchModal.scss';

const SearchModal = () => {
  return (
    <div className="searchModal">
      <div className="modalBox">
        <p>검색어를 입력하세요.</p>
        <input type="text" className="searchText" />
        <button>검색</button>
      </div>
    </div>
  );
};

export default SearchModal;

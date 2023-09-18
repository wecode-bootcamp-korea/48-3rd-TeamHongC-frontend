import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './SearchModal.scss';
import List from '../../components/List/List';
import NavBack from '../../components/Nav/NavBack';

const SearchModal = () => {
  return (
    <div className="search">
      <NavBack title="검색결과" />
      <div className="searchContainer">
        <p className="keywordResult">
          <span className="keyword">키워드</span> 검색결과
        </p>
        <div className="products">
          <ul>
            {productList.map(list => (
              <List key={list.id} list={list} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

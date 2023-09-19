import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './SearchResult.scss';
import List from '../../components/List/List';
import NavBack from '../../components/Nav/NavBack';

const SearchResult = () => {
  const [productList, setProductList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    const url = `http://10.58.52.64:3000/items?keyword=${keyword}`;
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setProductList(response.data.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="search">
      <NavBack title="검색결과" />
      <div className="searchContainer">
        <p className="keywordResult">
          <span className="keyword">{keyword}</span> 검색결과
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

export default SearchResult;

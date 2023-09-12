import React, { useEffect, useState } from 'react';
import NavMain from '../../components/Nav/NavMain';
import Category from '../../components/Category/Category';
import List from '../../components/List/List';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import './ProductList.scss';

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch('/data/productList.json')
      .then(res => res.json())
      .then(data => {
        setProductList(data);
      });
  }, []);

  return (
    <div className="productList">
      <NavMain />
      <div className="productListContainer">
        <div className="setLocation">
          <HiOutlineLocationMarker className="locationIcon" /> 위치를 설정해
          주세요.
        </div>
        <Category className="category" />
        <div className="products">
          <div className="sorting">
            <p>구매가능</p>
          </div>
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

export default ProductList;

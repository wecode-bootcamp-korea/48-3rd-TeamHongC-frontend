import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Category.scss';

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categoryName, setCategoryName] = useState([]);
  const categoryId = searchParams.get('cagetoryId');

  useEffect(() => {
    fetch('/data/categorydata.json')
      .then(res => res.json())
      .then(data => {
        setCategoryName(data);
      });
  }, []);

  //   const handleSelect = id => {
  //     searchParams.set('categoryId', id);
  //     setSearchParams(searchParams);
  //   };

  return (
    <div className="category">
      <div className="category">
        <ul>
          {categoryName.map(({ id, categoryName }) => {
            return (
              <li key={id}>
                <button
                  className={categoryId === id ? 'select' : 'notSelect'}
                  //   onClick={() => handleSelect(id)}
                >
                  {categoryName}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <div className="categor ">
        <ul>
          <li className="newOrUsed">카테고리명</li>
          <li className="newOrUsed">카테고리명</li>
        </ul>
      </div> */}
    </div>
  );
};

export default Category;

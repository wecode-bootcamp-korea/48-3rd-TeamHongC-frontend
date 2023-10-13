import React from 'react';
import './Category.scss';

const Category = ({ id, categoryName, categoryId, onClick }) => {
  return (
    <li>
      <button
        className={`categoryButton ${
          categoryId === id ? 'select' : 'notSelect'
        }`}
        onClick={() => onClick(id)}
      >
        {categoryName}
      </button>
    </li>
  );
};

export default Category;

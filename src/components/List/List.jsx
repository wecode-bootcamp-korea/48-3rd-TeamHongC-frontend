import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import './List.scss';

const List = ({ list }) => {
  if (!list) {
    return null;
  }

  return (
    <li className="list">
      <div className="listImg">
        <img src={list.imgUrl} art={list.title} className="thumbnail" />
        <div className="likeIcon">
          <GoHeart />
          {/* <GoHeartFill className="likeIcon" /> */}
        </div>
      </div>
      <div className="productInfo">
        <p className="productTitle">{list.title}</p>
        <div className="productSubInfo">
          <p>좋아요 {list.like} | </p>
          <p className="review">후기 1개</p>
        </div>
        <p className="productPrice">{list.price}원</p>
      </div>
    </li>
  );
};

export default List;

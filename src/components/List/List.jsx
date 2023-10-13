import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import './List.scss';
import axios from 'axios';

const List = ({ list }) => {
  const likeStatus = list.liked === 1 ? true : false;
  const [like, setLike] = useState(likeStatus);
  const [likeCount, setLikeCount] = useState(list.likeCount);
  const navigate = useNavigate();
  const handleLike = () => {
    setLike(!like);
  };

  const handleLikeCount = e => {
    e.stopPropagation();
    handleLike();
    if (!like) {
      setLikeCount(likeCount + 1);
      axios.post(
        'http://localhost:3001/like/add',
        {
          itemId: list.itemId,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: localStorage.getItem('token'),
          },
        },
      );
    } else if (like) {
      setLikeCount(likeCount - 1);
      axios.post(
        'http://localhost:3001/like/erase',
        { itemId: list.itemId },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: localStorage.getItem('token'),
          },
        },
      );
    }
  };

  if (!list) {
    return null;
  }

  return (
    <li
      className="list"
      onClick={() => navigate(`/product-detail/${list.itemId}`)}
    >
      <div className="listImg">
        <img src={list.imgUrl} art={list.title} className="thumbnail" />
        <div className="heartButton" onClick={handleLikeCount}>
          {like ? <GoHeartFill /> : <GoHeart />}
        </div>
      </div>
      <div className="productInfo">
        <p className="productTitle">{list.title}</p>
        <div className="productSubInfo">
          <p>좋아요 {likeCount} | </p>
          <p className="review">리뷰 {list.reviewCount}</p>
        </div>
        <p className="productPrice">{list.price}원</p>
      </div>
    </li>
  );
};

export default List;

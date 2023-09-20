import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import './List.scss';
import axios from 'axios';

const List = ({ list }) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState('');
  const handleLike = () => {
    setLike(!like);
  };

  const handleLikeCount = e => {
    e.stopPropagation();
    handleLike();
    // if (!like) {
    //   setLikeCount (likeCount +1)
    //   axios.post("/data/productList.json", {
    //     userId : userId,
    //     itemId : itemId
    //   })
    // } else if (like) {
    //   setLikeCount(likeCount -1)
    //   axios.post("/data/productList.json", {
    //     userId : userId,
    //     itemId : itemId
    //   })
    // }
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
          <p>좋아요 {list.likeCount} | </p>
          <p className="review">{list.reviewCount}</p>
        </div>
        <p className="productPrice">{list.price}원</p>
      </div>
    </li>
  );
};

export default List;

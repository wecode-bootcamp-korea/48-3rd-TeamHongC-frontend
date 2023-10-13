import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './ProductDetail.scss';
import Button from '../../components/Button/Button';
import axios from 'axios';
import FadeSilder from './FadeSilder';

export default function ProductDetail() {
  const [detailData, setDetailData] = useState({});
  const [reviewData, setReviewData] = useState({});
  const [reviewToggle, setReviewToggle] = useState(false);
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1);
  };

  const goToPaymentBtn = () => {
    navigate(`/payment/${productId}`);
  };

  const paymentBtn = '구매하기';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get(
          `http://localhost:3001/product-detail/${productId}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: localStorage.getItem('token'),
            },
          },
        );
        setDetailData(productRes.data.data);

        const reviewRes = await axios.get(
          `http://localhost:3001/product-detail/review/${productId}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: localStorage.getItem('token'),
            },
          },
        );
        setReviewData(reviewRes.data.data);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  const hasData = Object.keys(detailData).length === 0;

  if (hasData) return null;

  const itemCondition = detailData.itemCondition === 1 ? '신상품' : '중고';

  const reviewToggleEvent = () => {
    setReviewToggle(!reviewToggle);
  };

  return (
    <div className="productDetail">
      <div className="goToBack">
        <IoIosArrowBack className="goToBackIcon" onClick={goToBack} />
      </div>

      <div className="productImgContainer">
        <FadeSilder images={detailData.image} />
      </div>

      <div className="productDetailContainerBox">
        <div className="productDetailContainer">
          <div className="productDetailInfo">
            <div className="productDetailItemCondition">{itemCondition}</div>
            <div className="productDetailTitle">{detailData.title}</div>
            <div className="productDetailSaleInfo">
              <div className="productDetailSalePrice">{detailData.price}</div>
              <div className="productDetailSaleItemCount">
                {detailData.itemCount}개
              </div>
            </div>
          </div>

          <div className="productDetailUserInfo">
            <div className="productDetailUserNickname">
              {detailData.nickname}
            </div>
            <div className="productDetailUserRegion">{detailData.region}</div>
            <div className="productDetailUserDate">{detailData.date}</div>
          </div>
        </div>
      </div>

      <div className="productDetailDescription">{detailData.description}</div>

      <div className="productDetailReview">
        <div className="reviewContainer" onClick={reviewToggleEvent}>
          <p>후기를 확인하세요.</p>
          {reviewToggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        {reviewToggle &&
          reviewData.map((review, index) => (
            <div className="reviewContainerDetail" key={index}>
              <div>{review.nickname}</div>
              <div>{review.content}</div>
            </div>
          ))}
      </div>

      <Button text={paymentBtn} onClick={goToPaymentBtn} />
    </div>
  );
}

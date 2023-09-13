import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './ProductDetail.scss';
import Button from '../../components/Button/Button';
import axios from 'axios';
import FadeSilder from './FadeSilder';

export default function ProductDetail() {
  const [detailData, setDetailData] = useState({});
  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1);
  };
  console.log(detailData);

  const goToPaymentBtn = () => {
    navigate('/payment');
  };

  const paymentBtn = '구매하기';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://10.58.52.191:3000/product-detail/${id}`,
        );
        // /data/productDetail.json
        setDetailData(res.data.data);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  const hasData = Object.keys(detailData).length === 0;

  if (hasData) return null;

  const itemCondition = detailData.itemCondition === 1 ? '신상품' : '중고';

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

      <div className="productDetailReview">reviewContainer</div>

      <Button text={paymentBtn} onClick={goToPaymentBtn} />
    </div>
  );
}

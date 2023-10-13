import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Map, MapTypeControl, MapMarker, useMap } from 'react-kakao-maps-sdk';
import axios from 'axios';
import NavBack from '../../components/Nav/NavBack';
import './ViewSurroundingProducts.scss';

const ViewSurroundingProducts = () => {
  const { kakao } = window;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [productList, setProductList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setState(prev => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));

          const { latitude, longitude } = position.coords;

          searchParams.set('x', longitude);
          searchParams.set('y', latitude);
          searchParams.set('radius', 1);
          const newUrl = `${location.pathname}?${searchParams.toString()}`;
          navigate(newUrl);
        },

        err => {
          setState(prev => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      setState(prev => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    const url = `http://localhost:3001/my/surround?${searchParams}`;
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setProductList(response.data.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      }
    }

    fetchData();
  }, [searchParams]);

  const EventMarkerContainer = ({ position, content, id }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={position}
        onClick={() => navigate(`/product-detail/${id}`)}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && content}
      </MapMarker>
    );
  };

  return (
    <div className="viewSurroundingProducts">
      <NavBack title="내 주변 상품" />
      <div className="view">
        <Map id="map" center={state.center} level={3}>
          {!state.isLoading && (
            <MapMarker
              position={state.center}
              clickable={true}
              onClick={() => setIsOpen(true)}
              image={{
                src: '/images/user-marker.png',
                size: {
                  width: 64,
                  height: 69,
                },
              }}
            ></MapMarker>
          )}

          {productList.map(value => (
            <EventMarkerContainer
              id={value.id}
              key={`EventMarkerContainer-${value.latitude}-${value.longitude}`}
              position={{ lat: value.latitude, lng: value.longitude }}
              content={
                <div className="productInfo">
                  <img src={value.imgUrl} className="productInfoImg" />
                  <div className="productText">
                    <p className="productInfoTxt">상품명 | {value.title}</p>
                    <p className="productInfoTxt">금액 | {value.price}원</p>
                  </div>
                </div>
              }
            />
          ))}
        </Map>
      </div>
    </div>
  );
};

export default ViewSurroundingProducts;

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Map, MapTypeControl, MapMarker, useMap } from 'react-kakao-maps-sdk';
import axios from 'axios';
import NavBack from '../../components/Nav/NavBack';
import './ViewSurroundingProducts.scss';

const ViewSurroundingProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productList, setProductList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [currentlocation, setCurrentLoacation] = useState(null);

  const { kakao } = window;
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
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        position => {
          setState(prev => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));

          const { latitude, longitude } = position.coords;
          searchParams.set('x', longitude);
          searchParams.set('y', latitude);
          searchParams.set('radius', 100000);
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
  }, [searchParams, navigate, location]);

  useEffect(() => {
    axios
      .get('/data/productList.json')
      .then(response => {
        setProductList(response.data);
      })
      .catch(error => {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      });
  }, []);

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
              key={`EventMarkerContainer-${value.y}-${value.x}`}
              position={{ lat: value.y, lng: value.x }}
              content={value.title}
            />
          ))}
        </Map>
      </div>
    </div>
  );
};

export default ViewSurroundingProducts;

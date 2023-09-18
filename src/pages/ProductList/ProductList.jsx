import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import axios from 'axios';
import NavMain from '../../components/Nav/NavMain';
import Category from '../../components/Category/Category';
import UseWatchLocation from './UseWatchLocation';
import List from '../../components/List/List';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import './ProductList.scss';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const ProductList = () => {
  const { x, y, condition, categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productList, setProductList] = useState([]);
  const [state, setState] = useState('');
  const [positionAddress, setPositionAddress] = useState('');
  const [position, setPosition] = useState();
  const [currentlocation, setCurrentLoacation] = useState(null);
  const [region1depthName, setRegion1depthName] = useState('');
  const [region2depthName, setRegion2depthName] = useState('');
  const userRegion = region1depthName + ` ${region2depthName}`;
  const conditionId = searchParams.get('condition');

  useEffect(() => {
    const url = `http://10.58.52.173:3000/item/category`;
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setCategoryName(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      }
    }

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const url = `http://10.58.52.173:3000/item/condition`;
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setCategoryNew(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      }
    }

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const url = `http://10.58.52.173:3000/item/all?${searchParams}`;
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setProductList(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      }
    }

    fetchData();
  }, [searchParams]);

  // 카테고리
  const [productCategory, setProductCategory] = useState('all');
  const [categoryName, setCategoryName] = useState([]);

  const handleSelectCategory = id => {
    setProductCategory(id);
    searchParams.set('categoryId', id);
    setSearchParams(searchParams);
  };

  // 새 제품 여부 카테고리
  const [isNewCategory, setIsNewCategory] = useState('all');
  const [categoryNew, setCategoryNew] = useState([]);

  const handleSelectIsNew = conditionId => {
    setIsNewCategory(conditionId);
    searchParams.set('condition', conditionId);
    setSearchParams(searchParams);
  };

  // 내 현재 위치
  const { location, cancelLocationWatch, error } =
    UseWatchLocation(geolocationOptions);
  useEffect(() => {
    if (!location) return;

    // 3초후에 watch 종료
    setTimeout(() => {
      cancelLocationWatch();
    }, 3000);
  }, []);

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

          // 주소-좌표 변환 객체 생성
          const geocoder = new window.kakao.maps.services.Geocoder();

          // 주소로 좌표를 검색하고 결과를 콘솔에 출력
          const callback = (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              console.log(result);

              const address = result[0].address.address_name;
              const firstDepthName = result[0].address.region_1depth_name;
              const secondDepthName = result[0].address.region_2depth_name;
              setPositionAddress(address);
              setRegion1depthName(firstDepthName);
              setRegion2depthName(secondDepthName);

              // 현재 위치의 위도와 경도를 변수에 저장
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              setPosition({ lat: latitude, lng: longitude });
            }
          };

          // 위에서 가져온 position의 latitude와 longitude를 이용하여 주소로 변환
          geocoder.coord2Address(
            position.coords.longitude,
            position.coords.latitude,
            callback,
          );

          // 위치 정보를 가져온 후, 쿼리 스트링에도 저장
          searchParams.set('x', position.coords.longitude);
          searchParams.set('y', position.coords.latitude);
          searchParams.set('condition', 'all');
          searchParams.set('categoryId', 'all');
          setSearchParams(searchParams);
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
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  const successHandler = response => {
    console.log(response);
    const { latitude, longitude } = response.coords;
    setCurrentLoacation({ latitude, longitude });
  };

  const errorHandler = error => {
    console.log(error);
  };

  return (
    <div className="productList">
      <NavMain />
      <div className="productListContainer">
        <div className="setLocation">
          <HiOutlineLocationMarker className="locationIcon" /> {userRegion}
        </div>
        <div className="category">
          <ul>
            {categoryName.map(category => (
              <Category
                key={category.id}
                id={category.id}
                categoryName={category.name}
                categoryId={productCategory}
                onClick={handleSelectCategory}
              />
            ))}
          </ul>
          <ul>
            {categoryNew.map(category => (
              <Category
                key={category.value}
                id={category.value}
                categoryName={category.label}
                categoryId={isNewCategory}
                onClick={handleSelectIsNew}
              />
            ))}
          </ul>
        </div>
        <div className="products">
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

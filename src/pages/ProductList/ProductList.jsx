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
  timeout: 1000 * 60 * 1,
  maximumAge: 1000 * 3600 * 24,
};

const ProductList = () => {
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
    const url = `http://localhost:3001/itemList/category`;
    const token = localStorage.getItem('token');
    async function fetchData() {
      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: token,
          },
        });
        setCategoryName(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      }
    }

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const url = `http://localhost:3001/itemList/condition`;
    async function fetchData() {
      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: localStorage.getItem('token'),
          },
        });
        setCategoryNew(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      }
    }

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const url = `http://localhost:3001/itemList/all?${searchParams}`;
    async function fetchData() {
      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: localStorage.getItem('token'),
          },
        });
        setProductList(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다.', error);
      }
    }

    fetchData();
  }, [searchParams]);

  const [productCategory, setProductCategory] = useState('all');
  const [categoryName, setCategoryName] = useState([]);

  const handleSelectCategory = id => {
    setProductCategory(id);
    searchParams.set('categoryId', id);
    setSearchParams(searchParams);
  };

  const [isNewCategory, setIsNewCategory] = useState('all');
  const [categoryNew, setCategoryNew] = useState([]);

  const handleSelectIsNew = conditionId => {
    setIsNewCategory(conditionId);
    searchParams.set('condition', conditionId);
    setSearchParams(searchParams);
  };

  const { location, cancelLocationWatch, error } =
    UseWatchLocation(geolocationOptions);
  useEffect(() => {
    if (!location) return;

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

          const geocoder = new window.kakao.maps.services.Geocoder();

          const callback = (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              const firstDepthName = result[0].address.region_1depth_name;
              const secondDepthName = result[0].address.region_2depth_name;
              setPositionAddress(address);
              setRegion1depthName(firstDepthName);
              setRegion2depthName(secondDepthName);

              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              setPosition({ lat: latitude, lng: longitude });
            }
          };

          geocoder.coord2Address(
            position.coords.longitude,
            position.coords.latitude,
            callback,
          );

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
              <List key={list.itemId} list={list} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

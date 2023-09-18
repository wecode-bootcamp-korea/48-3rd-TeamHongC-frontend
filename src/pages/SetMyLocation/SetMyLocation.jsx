import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Map, MapTypeControl, MapMarker } from 'react-kakao-maps-sdk';
import NavBack from '../../components/Nav/NavBack';
import Button from '../../components/Button/Button';
import './SetMyLocation.scss';

const SetMyLocation = () => {
  const { kakao } = window;
  const [searchParams, setSearchParams] = useSearchParams();
  const [positionAddress, setPositionAddress] = useState('');
  const [position, setPosition] = useState();
  const [location, setLoacation] = useState(null);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const [region1depthName, setRegion1depthName] = useState('');
  const [region2depthName, setRegion2depthName] = useState('');

  const mapRef = useRef(null);

  // GeoLocation을 이용해서 속 위치를 얻어오기
  useEffect(() => {
    if (navigator.geolocation) {
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
      // HTML5의 GeoLocation을 사용할 수 없을 때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState(prev => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);

  const successHandler = response => {
    console.log(response);
    const { latitude, longitude } = response.coords;
    setLoacation({ latitude, longitude });
  };

  const errorHandler = error => {
    console.log(error);
  };

  // 불러운 현 위치에서 다른 장소로 이동
  const mySet = (_t, mouseEvent) => {
    if (mouseEvent && mouseEvent.latLng) {
      const coords = mouseEvent.latLng;
      const latitude = coords.getLat();
      const longitude = coords.getLng();

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
          setPositionAddress(address);
          setRegion1depthName(firstDepthName);
          setRegion2depthName(secondDepthName);
        }
      };

      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      setPosition({ lat: latitude, lng: longitude });
    }
  };

  const locationSettingComplete = e => {
    e.preventDefault();
    searchParams.set('x', position.lng);
    searchParams.set('y', position.lat);
    setSearchParams(searchParams);
    // navigate(`/register-product?x=`);
  };

  return (
    <div className="setMyLocation">
      <NavBack title="내 위치" />
      <div className="setMyLocationContainer">
        {location && (
          <Map id="map" center={state.center} level={3} onClick={mySet}>
            {position ? (
              <MapMarker position={position}>
                <div className="mapMarker">{positionAddress}</div>
              </MapMarker>
            ) : (
              <MapMarker position={state.center}>
                <div className="mapMarker">{positionAddress}</div>
              </MapMarker>
            )}
          </Map>
        )}
        <Button text="위치 설정 완료" onClick={locationSettingComplete} />
      </div>
    </div>
  );
};

export default SetMyLocation;

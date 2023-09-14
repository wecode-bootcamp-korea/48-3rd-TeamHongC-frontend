import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';

export default function Profile({ profileData }) {
  const navigate = useNavigate();

  const goToProfileEdit = () => {
    navigate('/profileEdit');
  };

  return (
    <div className="profile">
      <div className="profileName">
        <img
          className="profileImg"
          src={profileData.nickname}
          alt="프로필 사진"
        />
        <p>{profileData.nickname}</p>
        <img
          className="salesMark"
          src="/images/sales-mark.png"
          alt="판매자 마크"
        />
      </div>
      <div className="profileBtn">
        <button onClick={goToProfileEdit}>프로필 수정</button>
      </div>
    </div>
  );
}

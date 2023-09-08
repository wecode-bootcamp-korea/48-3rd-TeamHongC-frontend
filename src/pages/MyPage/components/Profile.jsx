import React from 'react';
import './Profile.scss';

export default function Profile() {
  return (
    <div className="profile">
      <div className="profileName">
        <img className="profileImg" src="/images/user.png" alt="프로필 사진" />
        <p>닉네임</p>
        <img
          className="salesMark"
          src="/images/sales-mark.png"
          alt="판매자 마크"
        />
      </div>
      <div className="profileBtn">
        <button>프로필 수정</button>
      </div>
    </div>
  );
}

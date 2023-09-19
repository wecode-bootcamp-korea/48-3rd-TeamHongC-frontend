import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './NavBack.scss';

const NavBack = ({ title }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSurroundingProductPage = location.pathname.includes(
    '/view-surrounging-products',
  );

  const goToBack = () => {
    if (isSurroundingProductPage) {
      navigate(-1, { replace: true });
    }
    navigate(-1);
  };

  return (
    <div className="navBack">
      <div className="nav">
        <IoIosArrowBack className="toToBackIcon" onClick={goToBack} />
        <p className="title">{title}</p>
      </div>
    </div>
  );
};

export default NavBack;

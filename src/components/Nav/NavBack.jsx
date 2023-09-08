import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './NavBack.scss';

const NavBack = ({ title }) => {
  const navigate = useNavigate();
  const goToBack = () => {
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

import React from 'react';
import './Button.scss';

const Button = ({ className, onClick, disabled, text }) => {
  return (
    <button
      className={`greenBtn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;

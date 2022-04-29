import React from 'react';
import './styles.css';

interface ButtonProps {
  text: string | React.ReactElement;
  type: string;
  onClick?: any;
}

const Button: React.FC<ButtonProps> = ({ text, type, ...props }) => {
  return (
    <button className={`button button-${type}`} {...props}>
      {text}
    </button>
  );
};

export default Button;

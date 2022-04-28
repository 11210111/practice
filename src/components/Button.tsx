import React from 'react';
import './styles.css';

type ButtonProps = {
  text: string;
  type: string;
};

const Button: React.FC<ButtonProps> = ({ text, type }) => {
  return <button className={`button button-${type}`}>{text}</button>;
};

export default Button;

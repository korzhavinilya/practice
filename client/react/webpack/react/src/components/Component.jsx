import React from 'react';
import '../styles/style.css';
import Img from '../assets/avatar.jpg';

export default function Component() {
  return (
    <div>
      <img src={Img} alt="Avatar" />
      <h1>React Component</h1>
    </div>
  );
}

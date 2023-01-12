import React from 'react';
import ReactDOM from 'react-dom/client';
import Component from './components/Component.jsx';
import './styles/sass-style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <h2>Hello World</h2>
    <Component />
  </>
);

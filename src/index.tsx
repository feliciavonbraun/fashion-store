import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { productList } from './componenets/ProductItemsList';

if (!localStorage.getItem('products')) {
  window.onload = function () {
    localStorage.setItem('products', JSON.stringify(productList))
  }
  setTimeout(function(){
    window.location.reload();
  }, 500);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

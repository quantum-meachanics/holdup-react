import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18부터는 createRoot 사용
import './index.css';  // 기본 스타일시트
import App from './App';  // 최상위 컴포넌트

const root = ReactDOM.createRoot(document.getElementById('root'));  // 'root' DOM 요소에 애플리케이션 마운트
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

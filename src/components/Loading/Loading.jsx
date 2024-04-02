import React from 'react';
import './Loading.css'; // 로딩 스피너의 스타일시트 import

const Loading = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
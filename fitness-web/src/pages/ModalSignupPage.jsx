// ModalSignupPage.jsx

import React from 'react';
import ModalSignup from '../components/ModalSignup';  // 경로 수정



const ModalSignupPage = () => {
  const closeModal = () => {
    // 모달을 닫는 로직
  };

  return (
    <div>
      {/* 이 페이지의 내용 */}
      <ModalSignup closeModal={closeModal} />
    </div>
  );
};

export default ModalSignupPage;

// ModalSignup.jsx

import React from 'react';
import './ModalSignup.css';

const ModalSignup = ({ closeModal }) => {
return (
    <div>
        <div className="modal-overlay"></div>
            <div className="modal">
                <div className="modal-content">
                    <h2>회원가입</h2>
                    <button>네이버 간편로그인</button>
                    <button>구글 간편로그인</button>
                    <button onClick={closeModal}>닫기</button>
                </div>
            </div>
    </div>
);
};

export default ModalSignup;

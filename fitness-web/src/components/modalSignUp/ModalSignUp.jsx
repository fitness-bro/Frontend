import React from 'react';
import { ModalButton, ModalContainer, ModalOverlay } from './ModalSignUp.style';
import SocialKakao from '../login/SocialKakao';
import SocialNaver from '../login/SocialNaver';
import SocialGoogle from '../login/SocialGoogle';
import loginLogo from '../../img/loginLogo.svg';


const ModalSignUp = ({ isOpen,closeModal }) => {
return (
    <div style={{display:isOpen?"block":"none"}}>
        <ModalOverlay></ModalOverlay>
            <ModalContainer>
                    <img src={loginLogo}/>
                    <h2>로그인</h2>
                    <SocialKakao></SocialKakao>
                    <SocialNaver></SocialNaver>
                    <SocialGoogle></SocialGoogle>
                    <ModalButton onClick={closeModal}>닫기</ModalButton>
            </ModalContainer>
    </div>
);
};

export default ModalSignUp;
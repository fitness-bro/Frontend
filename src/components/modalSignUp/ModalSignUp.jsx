import React from 'react';
import { ModalButton, ModalContainer, ModalOverlay,ButtonWrap } from './ModalSignUp.style';
import SocialUpGoogle from '../signup/SocialUpGoogle';
import loginLogo from '../../img/loginLogo.svg';

const ModalSignUp = ({ isOpen,closeModalUp }) => {
return (
    <div style={{display:isOpen?"block":"none"}}>
        <ModalOverlay></ModalOverlay>
            <ModalContainer>
                    <img src={loginLogo}/>
                    <h2>로그인</h2>
                    <ButtonWrap>
                    <SocialUpGoogle></SocialUpGoogle>
                    </ButtonWrap>
                    <ModalButton onClick={closeModalUp}>닫기</ModalButton>
            </ModalContainer>
    </div>
);
};

export default ModalSignUp;
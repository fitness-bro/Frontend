import React from 'react';
import { ModalButton, ModalContainer, ModalOverlay,ButtonWrap } from './ModalSignIn.style';
import SocialGoogle from '../login/SocialGoogle';
import loginLogo from '../../img/loginLogo.svg';

const ModalSignIn = ({ isOpen,closeModalIn }) => {
return (
    <div style={{display:isOpen?"block":"none"}}>
        <ModalOverlay></ModalOverlay>
            <ModalContainer>
                    <img src={loginLogo}/>
                    <h2>로그인</h2>
                    <ButtonWrap>
                    <SocialGoogle></SocialGoogle>
                    </ButtonWrap>
                    <ModalButton onClick={closeModalIn}>닫기</ModalButton>
            </ModalContainer>
    </div>
);
};

export default ModalSignIn;
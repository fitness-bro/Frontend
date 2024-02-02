import React from 'react';
import {Body,BtnWrap} from './SignUp.style';
import SocialKakao from '../components/login/SocialKakao'
import SocialNaver from '../components/login/SocialNaver'
import SocialGoogle from '../components/login/SocialGoogle'
import loginLogo from '../img/loginLogo.svg';

const SignUp = () => {
return (
    <Body>
        <img src={loginLogo}/>
        <BtnWrap>
        <SocialKakao/>
        <SocialNaver/>
        <SocialGoogle/>
        </BtnWrap>
    </Body>
);
};

export default SignUp;
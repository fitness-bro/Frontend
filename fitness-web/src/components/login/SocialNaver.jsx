import React from "react";
import styled from "styled-components";
import naverImg from "../../img/naver.svg"

const Button=styled.button`
background-color: rgba(0, 0, 0, 0);
border-radius: 3px;
border: 1px solid #ffffff;
display: flex;
flex-direction: row;
cursor: pointer;
color: white;
font-size: 15px;
font-weight: light;
padding: 10px 24px;
margin: 10px;
align-items: center; 
justify-content: center; 

>img{
  height:30px;
  padding-right:10px;
}

&:hover {
  box-shadow:1px;
}

&:active {
  position: relative;
  top: 1px;
}
`;

const SocialNaver=()=>{
    const NAVER_CLIENT_ID="XTK8O9qYtFmB63LEsTzm";
    const REDIERCT_URI='http://localhost:3000/registchoice';
    const STATE='false';
    const NAVER_AUTH_URL=`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIERCT_URI}`;

    const NaverLogin=()=>{
        window.location.href=NAVER_AUTH_URL;
    };

    return <Button onClick={NaverLogin}>
        <img src={naverImg}/>
        네이버 간편 로그인
        </Button>;
}

export default SocialNaver;
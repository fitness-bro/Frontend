import googleImg from "../../img/google.svg"
import styled from "styled-components";
import { useEffect,useState } from "react";
import axios from "axios";

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
padding: 10px 0px;
margin: 10px;
text-align: center;
align-items:center;
justify-content:center;


>img{
  height:30px;
  padding-right:22px;
}

&:hover {
  box-shadow:1px;
}

&:active {
  position: relative;
  top: 1px;
}
`;



const SocialGoogle = ({ handleGoogleLoginResult}) => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const google_redirect_uri = "http://localhost:3000/";
  const GOOGLE_SCOPE = process.env.REACT_APP_GOOGLE_SCOPE;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${google_redirect_uri}&response_type=token&scope=${GOOGLE_SCOPE}`;

  const GoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const access_token = params.get("access_token");

    if (access_token) {
      axios.get(`${apiUrl}login/oauth2/code/google/token?accessToken=${access_token}`)
      .then(response => {
        console.log("백엔드로부터 응답:", response.data);
        const { userToken, userId, role, isUser } = response.data.result;
        localStorage.setItem('token', userToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);
        // 사용자 정보를 가져온 후에 이메일 중복 검사를 수행합니다.
        //console.log(isUser);
        handleGoogleLoginResult(isUser); // 결과를 Menu 컴포넌트로 전달
      })
      .catch(error => {
        console.error("에러 발생:", error);
      });
    }   
  },[]);
  

  return (
    <>
      <Button onClick={GoogleLogin}>
        <img src={googleImg}/>
        <p>구글 간편 로그인</p>
      </Button>
    </>
  );
};



export default SocialGoogle;

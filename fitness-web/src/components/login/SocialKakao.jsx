import styled from "styled-components"
import kakaoImg from '../../img/kakaotalk.svg'
import axios from "axios";
import { useState,useEffect } from "react";

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
padding: 0px 0px;
margin: 10px;
text-align: center;
align-items:center;
justify-content:center;


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

const SocialKakao=()=>{
  const apiUrl = process.env.REACT_APP_API_URL;
    const Rest_api_key='8c7208b34afec06d51425dd25d6a0a54' //REST API KEY
    const redirect_uri = `https://dev.fitness-bro.pro/login/oauth2/code/kakao` //Redirect URI
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    
    const [token, setToken] = useState();

    useEffect(() => { 
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

    if (code) {
      // 코드가 존재하면 토큰 요청을 보냄
      axios.get(`${apiUrl}/login/oauth2/code/kakao?code=${code}`)
        .then(response => {
          const data = response.data;
          console.log("API 응답:", response);

          if (data.isSuccess) {
            // 토큰을 추출하여 로컬 스토리지에 저장
            setToken(data.result.userToken);
          } else {
            console.error("API 요청 실패:", data.message);
          }
        })
        .catch(error => {
          console.error("API 요청 중 오류 발생:", error);
          console.error("에러 상세 정보:", error.response);
        });
    }
  }, []);
  
  localStorage.setItem('token', token);


    const handleLogin = async () => {
      try {
        // 로그인 요청
        window.location.href = kakaoURL;
    
        // 토큰 발급 후의 처리
        // 이 부분은 서버가 아닌 클라이언트 측에서 처리합니다.
        // 토큰 발급 후에 바로 원하는 경로로 안내할 수 있습니다.
        window.location.href = "http://localhost:3000/"; // 사용자를 원하는 경로로 안내
      } catch (error) {
        console.error("로그인 후 처리 중 에러:", error);
        // 에러 처리 로직 추가
      }

      
    };
    return(
    <>
    <Button onClick={handleLogin}>
        <img src={kakaoImg}/>
        <p>카카오톡 간편 로그인</p>
        </Button>
    </>
    )
}

export default SocialKakao
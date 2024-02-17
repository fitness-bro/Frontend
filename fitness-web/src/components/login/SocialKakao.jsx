import styled from "styled-components"
import kakaoImg from '../../img/kakaotalk.svg'
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
    const Rest_api_key='8c7208b34afec06d51425dd25d6a0a54' //REST API KEY
    const redirect_uri = `https://dev.fitness-bro.pro/login/oauth2/code/kakao` //Redirect URI
    // oauth 요청 URL

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

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
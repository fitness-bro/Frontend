import styled from "styled-components"
import kakaoImg from '../../img/kakaotalk.svg'

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
padding: 0px 24px;
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

const SocialKakao=()=>{
  const code=200;
    // const Rest_api_key='c98d6b2445d51e86a3a54429a7488e7a' //REST API KEY
    // const redirect_uri = `http://dev.fitness-bro.pro/login/oauth2/code/kakao?code=${code}&password=string&nickname=string&email=string&age=0` //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
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
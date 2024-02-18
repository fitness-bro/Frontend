import googleImg from "../../img/google.svg"
import styled from "styled-components";
import { useEffect} from "react";
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


const SocialUpGoogle = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_AUTH_URL = process.env.REACT_APP_GOOGLE_AUTH_URL;

    const GoogleLogin=()=>{
        window.location.href=GOOGLE_AUTH_URL;
    };

    useEffect(() => {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const access_token = params.get("access_token");
  
      if (access_token) {
 
        axios.get(`${apiUrl}/login/oauth2/code/google/token?accessToken=${access_token}`)
          .then(response => {
            console.log("백엔드로부터 응답:", response);
            const { userToken, userId, role } = response.data.result;
            localStorage.setItem('token', userToken);
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', role);
          })
          .catch(error => {
            console.error("에러 발생:", error);

          });    
      }
    }, []);

    return <Button onClick={GoogleLogin} clientId={clientId}>
        <img src={googleImg}/>
        구글 간편 로그인
        </Button>;

};
    
export default SocialUpGoogle;
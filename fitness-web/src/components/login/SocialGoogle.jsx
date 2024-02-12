import googleImg from "../../img/google.svg"
import styled from "styled-components";

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


const SocialGoogle = () => {
    const clientId = '293755776535-kp2pp4pfe0c4401civ1g2fum81f3etdo.apps.googleusercontent.com'

    const GOOGLE_AUTH_URL=`https://accounts.google.com/o/oauth2/v2/auth`;

    const GoogleLogin=()=>{
        window.location.href=GOOGLE_AUTH_URL;
    };

    return <Button onClick={GoogleLogin} clientId={clientId}>
        <img src={googleImg}/>
        구글 간편 로그인
        </Button>;

};
    
export default SocialGoogle;
import { TextWrap,LoginButton,PWInput,IdInput,Body } from "./Login.style"
import loginLogo from '../img/loginLogo.svg'

const Login=()=>{
    return(
        <Body>
            <img src={loginLogo}/>
            <IdInput type='text' placeholder='아이디를 입력해주세요'/>
            <PWInput type='password' placeholder='비밀번호를 입력해주세요'/>
            <TextWrap> 
            <input type='checkbox'/><p>로그인 상태 유지</p>
            <button>아이디/비밀번호 찾기</button>
            </TextWrap>   
            <LoginButton>로그인</LoginButton>
        </Body>
    )
}

export default Login;
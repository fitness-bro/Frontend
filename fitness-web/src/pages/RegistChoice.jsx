import {Text1,BtnWrap,RegistBro,ReigstMember} from './RegistChoice.style'
import { Link } from 'react-router-dom';
import broImg from '../img/registLogo1.svg';
import memberImg from '../img/registLogo2.svg';


const RegistChoice =()=>{
    return(
        <>
        <Text1>회원 등록하기</Text1>
        <BtnWrap>
            <Link to="/Registration" style={{ textDecoration: "none"}}>
            <RegistBro>
                <img src={broImg}/>
                <p>동네형으로 가입하기</p>
                </RegistBro>
                </Link>
            <ReigstMember>
            <img src={memberImg}/>
                <p>회원으로 가입하기</p>
                </ReigstMember>
        </BtnWrap>
        </>
    );
}

export default RegistChoice;
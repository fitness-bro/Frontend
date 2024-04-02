import React from 'react';
import { Text1, BtnWrap, RegistBro, ReigstMember } from './RegistChoice.style';
import { Link } from 'react-router-dom';
import broImg from '../img/registLogo1.svg';
import memberImg from '../img/registLogo2.svg';
import axios from 'axios';

const RegistChoice = () => {
    const handleRegist = async (rolepost) => {
        const apiUrl = "https://dev.fitness-bro.pro";

        const token=localStorage.getItem("token");
        

        try {
            // POST 요청 보내기
            const response = await axios.post(
                `${apiUrl}/login/select`,            
                { role: rolepost }, // 요청 바디 데이터 추가
                {
                    headers: {
                        'token': token // 'token' 헤더 추가
                    }
                }
            );
            // 요청이 성공했을 경우의 처리
            console.log(response.data); // 서버로부터의 응답 데이터 출력 혹은 다른 처리

        } catch (error) {
            // 요청이 실패했을 경우의 처리
            console.error('Error:', error);
            console.error("에러 상세 정보:", error.response);
        }
    };

    return (
        <>
            <Text1>회원 등록하기</Text1>
            <BtnWrap>
            <Link to="/RegistrationCoach" style={{ textDecoration: "none"}}>
                <RegistBro onClick={() => handleRegist('COACH')}>
                    <img src={broImg} alt="bro image" />
                    <p>동네형으로 가입하기</p>
                </RegistBro>
                </Link>

                <Link to="/RegistrationMember" style={{ textDecoration: "none"}}>
                <ReigstMember onClick={() => handleRegist('MEMBER')}>
                    <img src={memberImg} alt="member image" />
                    <p>회원으로 가입하기</p>
                </ReigstMember>
                </Link>
            </BtnWrap>
        </>
    );
}

export default RegistChoice;
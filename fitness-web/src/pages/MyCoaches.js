// MyCoaches.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultImage from '../components/review/DefaultImage';
import ToggleMenu from '../components/review/ToggleMenu';
import './MyCoaches.css';
import Empty from "../components/empty/Empty.jsx";

// 우리 형 성사 리스트

const MyCoaches = () => {
    const navigate = useNavigate();


    const apiUrl = 'http://dev.fitness-bro.pro';

    const [coachNicknames, setCoachNicknames] = useState([]); // 코치 닉네임 목록 상태 추가


    const [userData, setUserData] = useState([]);

    useEffect(() => {

              
        const token = localStorage.getItem("token");

        axios.get(`${apiUrl}/match/member/success`, {
            headers: {
                'token': token
            }
        })
        .then((response) => {
            const data = response.data;
            console.log("API 응답:", response)

            if (data.isSuccess) {
                const results = data.result;
                setUserData(results);

                const nicknames = results.map(coach => coach.nickname); // 코치 닉네임만 추출
                setCoachNicknames(nicknames); // 코치 닉네임 목록 설정
            } else {
                console.error("API 요청 실패:", data.message);
            }

            })
        .catch(error => {
            console.error("API 요청 중 오류 발생:", error);
            console.error("에러 상세 정보:", error.response);
        });
    }, []);

    const onClickBackBtn = () => {
        navigate(-1);
    };

    const goToCoachProfile = (userId) => {
        navigate("/profile",{state:{userId:userId}});
    };


    return (
        <div className="MyCoaches">

            <div className="titleAndBack">
                <h2>우리 형 성사 리스트</h2>
                <button onClick={onClickBackBtn} className="backBtn">뒤로가기</button>
            </div>

            {/* 성사된 동네형 리스트 */}
            <div className="userList">
                {userData.length === 0 ? ( // userData의 길이를 확인하여 배열이 비어있을때
                        
                    <div>
                        <center><Empty/></center>
                        <center style={{ color: '#643E23', fontWeight: 'bold', fontSize: '18px' }}>아직 비어있어요!</center>
                    </div>
                        
                ) : (
                    <ul>
                        {userData.length > 0 && userData.map((item, index) => (
                            <li key={index} onClick={() => goToCoachProfile(item.coachId)}>
                                {/* 프로필 이미지 */}
                                {item.coachPicture ? (
                                    <img src={item.coachPicture} alt="프로필 이미지" className="profileImage" />
                                ) : (
                                    <DefaultImage />
                                )}

                                <div className="info">
                                    {/* 날짜 */}
                                    <p>{item.createdAt}</p>

                                    {/* 성사된 동네형 닉네임 */}
                                    <p className="detail">{item.nickname}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* ToggleMenu 컴포넌트에 userData의 닉네임 목록 전달 (후기작성페이지에서만 렌더링) */}
             {window.location.pathname === '/reviews' && <ToggleMenu coachNicknames={userData.map(coach => coach.nickname)} />}
        </div>
    );
}

export default MyCoaches;
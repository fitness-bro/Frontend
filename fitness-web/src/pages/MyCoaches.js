// MyCoaches.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultImage from '../components/review/DefaultImage';
import ToggleMenu from '../components/review/ToggleMenu'; // ToggleMenu import 추가

const MyCoaches = ({ userId }) => {
    const navigate = useNavigate();

    const apiUrl = "http://dev.fitness-bro.pro";

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        // userId를 사용하여 API에서 성사된 동네형 리스트 데이터를 가져옵니다.
        const memberId = 1;

        axios.get(`${apiUrl}/match/member/success/${memberId}`)
            .then((response) => {
                const data = response.data;
                console.log("API 응답:", response)

                if (data.isSuccess) {
                    const results = data.result;
                    setUserData(results);
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

    return (
        <div className="MyCoaches">

            <div className="titleAndBack">
                <h2>우리 형 성사 리스트</h2>
                <button onClick={onClickBackBtn} className="backBtn">뒤로가기</button>
            </div>

            {/* ToggleMenu에 userData 전달 */}
            <ToggleMenu userData={userData} onSelectCoach={(coachName) => console.log(coachName)} />

            {/* 성사된 동네형 리스트 */}
            <div className="userList">
                <ul>
                    {userData.map((item, index) => (
                        <li key={index}>
                            {/* 프로필 이미지 */}
                            {item.profileImage ? (
                                <img src={item.profileImage} alt="프로필 이미지" className="profileImage" />
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
            </div>
        </div>
    );
}

export default MyCoaches;

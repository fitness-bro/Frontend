import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultImage from '../components/review/DefaultImage';

// 받은 후기 리스트

const GetReviewList = ({ coachId }) => {
    const navigate = useNavigate();

    const apiUrl="http://dev.fitness-bro.pro/";

    const [userData, setUserData] = useState([]);

    useEffect(() => {

        // coachId를 사용하여 API에서 후기 데이터를 가져옵니다.
        const coachId=1;

        axios.get(`${apiUrl}coaches/${coachId}/reviews`)
            .then((response) => {
                const data = response.data;
                console.log("API 응답:", response);

                if (data.isSuccess) {
                    const results=data.result;
                    setUserData(results);
                } else {
                    console.error("API 요청 실패:", data.message);
                }
            })
            .catch(error => {
                console.error("API 요청 중 오류 발생:", error);
                console.error("에러 상세 정보:", error.response);
            });
    }, [coachId]);

    const onClickBackBtn = () => {
        navigate(-1);
    };

    return (
        <div className="GetReviewList">
            <div className="titleAndBack">
                <h2>받은 후기 리스트</h2>
                <button onClick={onClickBackBtn} className="backBtn">뒤로가기</button>
            </div>

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

                                {/* 닉네임 */}
                                <p className="detail">{item.nickname}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GetReviewList;

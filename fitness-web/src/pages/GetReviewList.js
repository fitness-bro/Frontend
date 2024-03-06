import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultImage from '../components/review/DefaultImage';
import {useLocation} from "react-router-dom";

// 받은 후기 리스트

const GetReviewList = () => {
    const navigate = useNavigate();

    const apiUrl = 'http://dev.fitness-bro.pro';

    const [userData, setUserData] = useState([]);

    
    const location = useLocation();
    const coachId = location.state.coachId;

    useEffect(() => {

        axios.get(`${apiUrl}/coaches/${coachId}/reviews`)
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

    const goToReviewDetail = (review_id) => { // /review-detail로 review_id를 props로 넘겨주기
        navigate("/review-detail",{state:{reviewId:review_id}});
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
                        <li key={index} onClick={() => goToReviewDetail(item.review_id)}>
                            {/* 프로필 이미지 */}
                            {item.pictureURL ? (
                                <img src={item.pictureURL} alt="프로필 이미지" className="profileImage" />
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
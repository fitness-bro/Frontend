import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ReviewList.css';
import DefaultImage from '../components/review/DefaultImage';

// 후기작성페이지1

const ReviewList = () => {
    const navigate = useNavigate();

    const apiUrl="http://dev.fitness-bro.pro/";

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhlZXN1bjEwN0BrYWthby5jb20iLCJpYXQiOjE3MDgxODYxOTYsImV4cCI6MTcwODE4OTc5Nn0.f9WrqB8suuuEY03WgfsGrQu-IZwc1DqypKcKlVOPq3U';

        axios.get(`${apiUrl}members/reviews`, {
            headers: {
                'token': token
            }
        })
        .then(response => {
            const data = response.data;
            console.log("API 응답:", response);

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

    const handleWriteReview = () => {
        navigate('/reviews');
    };

    const onClickBackBtn = () => {
        navigate(-1);
    };

    const goToReviewDetail = (review_id) => { // /review-detail로 review_id를 props로 넘겨주기
        navigate("/review-detail",{state:{reviewId:review_id}});
    };

    return (
        <div className="ReviewList">
            <div className="titleAndBack">
                <h2>후기 리스트</h2>
                <div>
                    <button onClick={handleWriteReview} className="writeReview">후기 작성</button>
                    <button onClick={onClickBackBtn} className="backBtn">뒤로가기</button>
                </div>
            </div>

            {/* 신청 내역 리스트 */}
            <div className="userList">
                <ul>
                    {userData.map((item, index) => (
                        <li key={index} onClick={() => goToReviewDetail(item.review_id)}>
                            {/* 프로필 이미지 */}
                            {item.profileImage ? (
                                <img src={item.profileImage} alt="프로필 이미지" className="profileImage" />
                            ) : (
                                <DefaultImage />
                            )}

                            <div className="info">
                                {/* 날짜 */}
                                <p>{item.createdAt}</p>

                                {/* 작성한 동네형 후기 */}
                                <p className="detail">{item.nickname}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReviewList;

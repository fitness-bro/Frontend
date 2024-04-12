import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ReviewList.css';
import DefaultImage from '../components/review/DefaultImage';
import Empty from "../components/empty/Empty.jsx";

// 후기작성페이지1

const ReviewList = () => {
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`${apiUrl}/members/reviews`, {
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
                {userData.length === 0 ? ( // userData의 길이를 확인하여 배열이 비어있을때
                        
                    <div>
                        <center><Empty/></center>
                        <center style={{ color: '#643E23', fontWeight: 'bold', fontSize: '18px' }}>아직 비어있어요!</center>
                    </div>
                            
                ) : (
                    <ul>
                        {userData.map((item, index) => (
                            <li key={index} onClick={() => goToReviewDetail(item.review_id)}>
                                {/* 프로필 이미지 */}
                                {item.coachImage ? (
                                    <img src={item.coachImage} alt="프로필 이미지" className="profileImage" />
                                ) : (
                                    <DefaultImage />
                                )}

                                <div className="info">
                                    {/* 날짜 */}
                                    <p>{new Date(item.createdAt).toLocaleString()}</p>

                                    {/* 작성한 동네형 후기 */}
                                    <p className="detail">{item.nickname}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ReviewList;
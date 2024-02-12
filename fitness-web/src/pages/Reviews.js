// Reviews.js
import { useState } from "react";
import './Reviews.css';
import ImageUtils from "../components/ImageUtils";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/review/StarRating";
import ToggleMenu from '../components/review/ToggleMenu'
import axios from "axios";

const Reviews = () => {
    const navigate = useNavigate();
    const apiUrl = "http://dev.fitness-bro.pro/";

    const [coachNickname, setCoachNickname] = useState(""); // 선택한 코치의 닉네임 상태 추가
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");

    const handleCoachSelect = (coachNickname) => {
        setCoachNickname(coachNickname); // 선택한 코치의 닉네임 업데이트
    };

    const handleSubmit = (rolepost) => {
        if (rating === 0) {
            alert('별점을 선택해주세요.');
            return;
        }
        if (content.trim() === '') {
            alert('후기를 작성해주세요.');
            return;
        }
    
        const newReview = {
            nickname: coachNickname, // 선택한 코치의 닉네임 사용
            rating: rating,
            contents: content
        };
    
        // 로그인 후 토큰을 받아오는 요청
        axios.post(
            `${apiUrl}/login/select`,
        ).then(response => {
            // 토큰을 받아왔으면 후기 작성 요청 보냄
            axios.post(`${apiUrl}members/reviews`, newReview, {
                headers: {
                    'Content-Type': 'application/json' // JSON 형식으로 요청
                }
            })
            .then(response => {
                console.log("후기가 성공적으로 작성되었습니다.", response);
                navigate('/review-list');
            })
            .catch(error => {
                console.error("후기 작성 중 오류 발생:", error);
            });
        }).catch(error => {
            console.error("토큰 받아오기 중 오류 발생:", error);
        });
    };
    

    // 별점 설정 함수
    const handleStarClick = (rating) => {
        console.log("선택된 별점:", rating);
        setRating(rating); // 별점 상태 업데이트
    };

    const handleCharNum = (e) => {
        const inputValue = e.target.value;
        setContent(inputValue);
    }

    const onClickBackBtn = () => {
        navigate(-1);
    }

    return (
        <div className="Reviews">
            <div className="titleAndBack">
                <h2>후기 작성</h2>
                <button onClick={onClickBackBtn} className="backBtn">뒤로가기</button>
            </div>

            <div className="start-toggle">

                {/* 토글 메뉴 */}
                <div className="coach-toggle"><ToggleMenu onSelectCoach={handleCoachSelect} /></div>

                {/* 별점 주기 */}
                <div className="stars-for-reviews">
                    <StarRating onStarClick={handleStarClick} />
                </div>
            </div>

            <div>
                <div className="textarea-container">
                    {/* 입력 내용 */}
                    <textarea
                        value={content}
                        onChange={handleCharNum}
                        maxLength={1000}>
                    </textarea>

                    {/* 글자수 세기 */}
                    <div className="charNum">
                        <p>{1000 - content.length}/1000</p>
                    </div>
                </div>

                {/* 이미지 처리 */}
                <ImageUtils />

                {/* 후기 작성 버튼 */}
                <div>
                    <button onClick={handleSubmit} className={content ? 'submitbtnOn' : 'submitbtn'}>
                        후기 작성 완료하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Reviews;

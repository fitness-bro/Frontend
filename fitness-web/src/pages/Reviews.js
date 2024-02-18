import { useState, useEffect } from "react";
import './Reviews.css';
import ImageUtils from "../components/ImageUtils";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/review/StarRating";
import ToggleMenu from '../components/review/ToggleMenu'
import axios from "axios";

// 후기작성페이지2 (코치에 대한 후기를 작성하는 페이지)

const Reviews = () => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [coachNickname, setCoachNickname] = useState("");
    const [coachNicknames, setCoachNicknames] = useState([]); // 선택한 코치의 닉네임 상태 추가
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");

    const [image, setImage] = useState(null); // 선택된 이미지를 저장하는 상태 추가
    
    useEffect(() => {
    // 멤버 토큰
    const token = localStorage.getItem("token");

        axios.get(`${apiUrl}match/member/success`, {
            headers: {
                'token': token
            }
        })
        .then((response) => {
            const data = response.data;
            console.log("API 응답:", response)

            if (data.isSuccess) {
                const nicknames = data.result.map(coach => coach.nickname);
                setCoachNicknames(nicknames); 
            } else {
                console.error("API 요청 실패:", data.message);
            }
        })
        .catch(error => {
            console.error("API 요청 중 오류 발생:", error);
            console.error("에러 상세 정보:", error.response);
        });
    }, []);

    const handleCoachSelect = (coachNickname) => {
        console.log("선택된 코치:", coachNickname);
        setCoachNickname(coachNickname); // 선택한 코치의 닉네임 업데이트
    };

    const handleSubmit = () => {
        if (!coachNickname) {
            alert('코치를 선택해주세요.');
            return;
        }
        if (rating === 0) {
            alert('별점을 선택해주세요.');
            return;
        }
        if (content.trim() === '') {
            alert('후기를 작성해주세요.');
            return;
        }
    
        const formData = new FormData();
        formData.append('request', JSON.stringify({
          nickname: coachNickname,
          rating: rating,
          contents: content
        }));
        
        if (image) {
            for (let i = 0; i < image.length; i++) {
                formData.append('files', image[i]);
            }
        } // 이미지 파일 업로드

        
        console.log("전송할 데이터:", formData); // 추가된 부분

        const token = localStorage.getItem("token");

        axios.post(`${apiUrl}members/reviews`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': token
            }
        })
            .then(response => {
                console.log("후기가 성공적으로 작성되었습니다.", response);
                navigate('/review-list');
            })
            .catch(error => {
                console.error("후기 작성 중 오류 발생:", error);
            });
    };

    const handleImageSelected = (imageFile) => {
        setImage(imageFile); // 이미지 선택 시 호출되는 함수
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
                <div className="coach-toggle">
                    <ToggleMenu coachNicknames={coachNicknames} onCoachSelect={handleCoachSelect}/>
                </div>

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
                        <p>{content.length}/1000</p>
                    </div>
                </div>

                {/* 이미지 처리 */}
                <ImageUtils onImageSelected={handleImageSelected} /> {/* 이미지 선택 컴포넌트 */}

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
import {useState} from "react";
import './Reviews.css';
import ImageUtils from "./ImageUtils";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import ToggleMenu from "./ToggleMenu";


// 후기 작성 페이지2 - 작성 완료하면 바로 후기 리스트로 넘어가는 페이지

const Reviews = ()=>{

    const navigate = useNavigate();

    const maxChar = 1000; // 최대 글자수
    const [content, setContent] = useState(""); // 입력 내용

    const handleCharNum = (e)=>{ // 글자수에 대한 함수
        const inputValue = e.target.value;

        if (inputValue.length <= maxChar) { // 글자수 제한
            setContent(inputValue); // 글자수가 1000자 이하일 때 상태변화함수에 저장
        }
    }

    const handleSubmit = ()=>{ // 내용 작성 팝업창에 대한 함수
        if (content === '') {
            alert('내용을 작성해주세요')
        }
        
        else
            navigate('/review-list');
    }

    // 별점
    const handleStarClick = (rating) => {
        console.log("선택된 별점:", rating);
    };

    return( 
        <div className="Reviews">

            <div className="titleAndBack">
                <h2>후기 작성</h2>
                <button className="back">뒤로가기</button>
            </div>

            {/* 토글 메뉴 */}
            <ToggleMenu />

            {/* 별점 주기 */}
            <StarRating onStarClick={handleStarClick} />
            
            <div>
                <div className="textarea-container">
                    {/* 입력 내용 */}
                    <textarea
                    value={content}
                    onChange={handleCharNum}
                    maxLength={maxChar}
                    >
                    </textarea>

                    {/* 글자수 세기 */}
                    <div className="charNum">
                        <p>{maxChar-content.length}/1000</p>
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
    )
}

export default Reviews;
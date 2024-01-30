import { useState } from 'react';
import './ReviewDetail.css'
import { Icon } from "@iconify/react";
import './CommonStyle.css';

// 후기 상세 보기

const ReviewDetail = () => {
    const images = [
    ];

    const [reviewText] = useState("오**\n\n2024.01.24\n\n\n\n최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! 최고예요! ");

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

 
    return (
        <div className="ReviewDetail">

            {/* <div className="titleAndBack">
                <h2>후기 상세 보기</h2>
                <button className="back">뒤로가기</button>
            </div> */}

            <div className="iconsForImages">

                {/* 왼쪽 화살표 */}
                <button onClick={handlePrev} className="arrow-button">
                    <Icon className="leftArrow" icon="mdi:keyboard-arrow-left" />
                </button>

                {/* 이미지 */}
                {images.length > 0 ? (
                    <img src={images[currentIndex]} alt="이미지 없음" />
                ) : (
                    <Icon className="clipIcon" icon="mdi:paperclip" />
                )}

                {/* 오른쪽 화살표 */}
                <button onClick={handleNext} className="arrow-button">
                    <Icon className="rightArrow" icon="mdi:keyboard-arrow-right" />
                </button>
            </div>

            <textarea
                className="reviewTextarea"
                value={reviewText}
                readOnly // 읽기 전용 속성으로 설정하여 편집 불가능
            >
            </textarea>           

        </div>
    );
};

export default ReviewDetail;

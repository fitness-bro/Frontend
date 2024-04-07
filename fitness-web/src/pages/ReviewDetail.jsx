// ReviewDetail.js

import { useState, useEffect } from "react";
import "./ReviewDetail.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

// 받은 후기 상세보기

const ReviewDetail = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [userData, setUserData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const location = useLocation();
  const reviewId = location.state.reviewId;

  useEffect(() => {
    axios
      .get(`${apiUrl}/coaches/reviews/${reviewId}`)
      .then((response) => {
        const data = response.data;
        console.log("API 응답:", response);

        if (data.isSuccess) {
          const result = data.result;
          setUserData(result);
        } else {
          console.error("API 요청 실패:", data.message);
        }
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
        console.error("에러 상세 정보:", error.response);
      });
  }, [reviewId]);

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(userData.pictureURLs.length - 1); // 현재가 첫 번째 사진일 때 마지막 사진으로 이동
    } else {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === userData.pictureURLs.length - 1) {
      setCurrentIndex(0); 
    }
    else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const renderImages = () => {
    const defaultIconSize = 300; // clip icon (디폴트 이미지)의 크기
    const imageStyle = {
      maxWidth: `${defaultIconSize}px`,
      maxHeight: `${defaultIconSize}px`,
    };

    if (userData.pictureURLs && userData.pictureURLs.length > 0) {
      const currentImageUrl = userData.pictureURLs[currentIndex];
      return (
        <img
          src={currentImageUrl}
          alt={`review-image-${currentIndex}`}
          className="review-image"
          style={imageStyle}
        />
      );
    } else {
      return (
        <Icon className="clipIcon" icon="mdi:paperclip" style={imageStyle} />
      );
    }
  };
  

  const navigate = useNavigate();

  const onClickBackBtn = () => {
    navigate(-1);
  };

  // 별을 렌더링하는 함수
  const renderStars = () => {
    const starArray = Array.from({ length: 5 }, (_, index) => index);

    return starArray.map((index) => (
      <span key={index} className="star">
        <Icon
          icon={index < userData.rating ? "carbon:star-filled" : "carbon:star"} // 후기의 별점에 따라 별이 채워지는지 여부 결정
          style={{ color: "#643E23" }}
        />
      </span>
    ));
  };

  return (
    <div className="ReviewDetail">
      <div className="titleAndBack">
        <h2>후기 작성</h2>
        <button onClick={onClickBackBtn} className="backBtn">
          뒤로가기
        </button>
      </div>

      <div className="star-text-container">
        <div className="star-container">
          <div className="iconsForImages">
            <button onClick={handlePrev} className="arrow-button">
              <Icon className="leftArrow" icon="mdi:keyboard-arrow-left" />
            </button>

            {userData.pictureURLs && userData.pictureURLs.length > 0 ? (
              renderImages()
            ) : (
              <Icon className="clipIcon" icon="mdi:paperclip" />
            )}

            <button onClick={handleNext} className="arrow-button">
              <Icon className="rightArrow" icon="mdi:keyboard-arrow-right" />
            </button>
          </div>

          <div className="start-rating">
            <div className="rating-text">{userData.rating}</div>

            <div className="stars-for-review-detail">
              {renderStars()} {/* renderStars 함수를 호출하여 별을 렌더링함 */}
            </div>
          </div>
        </div>
        <div className="reviewTextarea">
          <div className="userDataDetail">
            <p className="nickname">{userData.nickname}</p>

            <p className="createdAt">{new Date(userData.createdAt).toLocaleString()}</p>
            <p className="content">{userData.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
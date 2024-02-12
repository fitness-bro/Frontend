import React, { useState } from "react";
import { Icon } from "@iconify/react";
import './StarRating.css';

// 별점 컴포넌트

const StarRating = ({ onStarClick }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => { // 별 아이콘을 클릭했을 때 호출되는 함수
    
    setRating(starIndex + 1); // 클릭한 별의 인덱스에 1을 더한 값을 `rating` 상태로 설정
    onStarClick(starIndex + 1); // 상위 컴포넌트로 선택된 별의 값 전달
  };

  const renderStars = () => { // 별 아이콘을 렌더링하는 함수

    // 길이가 5인 배열을 생성하고 각 요소에 인덱스를 할당
    const starArray = Array.from({ length: 5 }, (_, index) => index);

    return starArray.map((index) => ( // 배열을 순회하며 각각의 별 아이콘을 생성
      <span
        key={index}
        onClick={() => handleStarClick(index)} // 별 아이콘을 클릭했을 때 `handleStarClick` 함수 호출
        className="star"
      >

        {/* 현재 별의 인덱스가 `rating`보다 크면 빈 별, 아니면 채워진 별 */}
        <Icon
          icon={index >= rating ? "carbon:star" : "carbon:star-filled"}
          style={{ color: "#643E23" }}
        />
      </span>
    ));
  };

  // 렌더링된 별 아이콘들을 감싸는 div를 반환
  return <div className="stars">{renderStars()}</div>;
};

export default StarRating;

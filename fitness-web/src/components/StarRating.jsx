import React, { useState } from "react";
import { Icon } from "@iconify/react";
import './StarRating.css';

const StarRating = ({ onStarClick }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
    onStarClick(starIndex + 1);
  };

  const renderStars = () => {
    const starArray = Array.from({ length: 5 }, (_, index) => index);
    return starArray.map((index) => (
      <span
        key={index}
        onClick={() => handleStarClick(index)}
        className="star"
      >
        <Icon
          icon={index >= rating ? "carbon:star" : "carbon:star-filled"}
          style={{ color: "#643E23" }}
        />
      </span>
    ));
  };

  return <div className="stars">{renderStars()}</div>;
};

export default StarRating;

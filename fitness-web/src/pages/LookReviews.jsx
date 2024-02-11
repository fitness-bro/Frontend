import { React, useState, useEffect } from "react";
import { Body, ReviewBlock } from "./LookReviews.style";
import Header from "../components/header/ProfileHeader";
import reviewerImg from "../img/profile.jpg";
import axios from "axios";

export default function LookReviews() {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const reviewId = 303;

        axios.get(`${apiUrl}/coaches/reviews/${reviewId}`)
            .then(response => {
                const data = response.data;
                console.log("API 응답:", data);

                if (data.isSuccess) {
                    setReviews([data.result]); // 서버에서 받아온 데이터를 배열로 감싸서 설정
                } else {
                    setError(data.message);
                }
            })
            .catch(error => {
                console.error("API 요청 중 오류 발생:", error);
                setError(error.message);
            });
    }, []);

    return (
        <Body>
            <Header />
            {error && <p>Error: {error}</p>}
            {reviews && reviews.map((review, index) => (
                <ReviewBlock key={index}>
                    <img src={review.pictureURLs} alt="리뷰자 프로필 이미지" />
                    <h4>{review.nickname}</h4>
                    <p>{review.content}</p>
                </ReviewBlock>
            ))}
        </Body>
    );
}
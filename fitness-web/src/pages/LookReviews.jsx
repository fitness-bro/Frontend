import { React, useState, useEffect } from "react";
import { Body, ReviewBlock } from "./LookReviews.style";
import Header from "../components/header/ProfileHeader";
import reviewerImg from "../img/profile.jpg";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function LookReviews(props) {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const coachId = location.state.coachId
    const token=localStorage.getItem("token");


    useEffect(() => {

        axios.get(`${apiUrl}/coaches/${coachId}/reviews`,{
            headers:{
                'token':token
            }
        })
            .then(response => {
                const data = response.data;
                console.log("API 응답:", data);

                if (data.isSuccess) {
                    setReviews(data.result)                 
                } else {
                    setError(data.message);
                }
            })
            .catch(error => {
                console.error("API 요청 중 오류 발생:", error);
                console.error("에러 상세 정보:", error.response);
            });
    }, []);

    return (
        <Body>
            <Header id={coachId}/>
            {error && <p>Error: {error}</p>}
            {reviews && reviews.map((review) => (
                // <Link to="/review-detail" id={review.review_id} style={{ textDecoration: "none"}} key={review.review_id}>
                    <Link to={"/review-detail"} state={ { reviewId: review.review_id } } style={{ textDecoration: "none"}} >
<<<<<<< HEAD

=======
>>>>>>> d04d234371296077829b95b08805edce46b395e8
                    <ReviewBlock>
                        <img src={review.pictureURL} alt="리뷰자 프로필 이미지" />
                        <h4>{review.nickname}</h4>
                        <p>{review.content}</p>
                    </ReviewBlock>
                 </Link>
            ))}
        </Body>
    );
}
import {React,useState} from "react";
import {Body,ReviewBlock} from "./LookReviews.style";
import Header from "../components/header/ProfileHeader";
import reviewerImg from "../img/profile.jpg";

export default function LookReviews(){

    const [review]=useState([1,2,3,4,5])


    return(
        <Body>
            <Header/>
            {review.map(function(item){
                    return(
                        <ReviewBlock>
                            <img src={reviewerImg} alt="리뷰자 프로필 이미지" />
                                <h4>2023.05.09</h4>
                                <p>{item}</p>
                            </ReviewBlock>
                    )
                })
                }
                
        </Body>
    );
}  
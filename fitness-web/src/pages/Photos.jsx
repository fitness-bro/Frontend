import {React,useState} from "react";
import {ImgWrap,Body} from "./Photos.style";
import Header from "../components/ProfileHeader";
import reviewImg from "../img/profile.jpg";

export default function Photos(){
    const [data]=useState([1,2,3,4,5,6,7,8,9])
    return(
        <>
        <Body>
            <Header/>
            <ImgWrap>
            {data.map(function(){
                    return(
                        <img src={reviewImg} alt="리뷰 이미지" />
                    )
            })}
            </ImgWrap>
            
        </Body>
       
        </>
    );
}  
import {React,useState,useEffect} from "react";
import { InfBlock,InfLine,Body} from "./Profile.style";
import ProfileHeader from "../components/header/ProfileHeader";
import axios from "axios";

export default function Profile(){

    const [userData, setUserData] = useState({
      introduction: "",
      price: 0,
      comment: "",
      address:""
    });
    
      useEffect(() => {
        const coachId = 2;  // 예: 123
        const apiUrl="http://dev.fitness-bro.pro/";
          axios.get(`${apiUrl}coaches/${coachId}/info`)
          
          .then(response => {
            const data = response.data;
            console.log("API 응답:", response);
      
            if (data.isSuccess) {
              setUserData({
                address:data.result.address,
                comment: data.result.comment,
                introduction: data.result.introduction,
                price: data.result.price,
              });
            } else {
              console.error("API 요청 실패:", data.message);
            }
          })
          .catch(error => {
            console.error("API 요청 중 오류 발생:", error);
            console.error("에러 상세 정보:", error.response);
          });
      }, []);

    return(
        <>
        <Body>
        <Body>
                <ProfileHeader />
                <InfLine>{userData.introduction}</InfLine>
                <InfBlock>
                    <h4>위치</h4>
                    <p>{userData.address}</p>
                </InfBlock>
                <InfBlock>
                    <h4>소개</h4>
                    <p>{userData.comment}</p>
                </InfBlock>
                <InfBlock>
                    <h4>중량</h4>
                    <p>{userData.introduction}</p>
                </InfBlock>
                <InfBlock>
                    <h4>가격</h4>
                    <p>{userData.price}</p>
                </InfBlock>
                <InfBlock>
                    <h4>주의사항</h4>
                    <p>{userData.price}</p>
                </InfBlock>
            </Body>
        </Body>
        </>
    );
}   
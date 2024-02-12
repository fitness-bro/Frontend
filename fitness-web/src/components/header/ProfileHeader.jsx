import { TopWrap,Wrapper,AskBtn,Btn, BtnWrap, ProfileWrap, Backimgage,RatingWrap } from "./ProfileHeader.style";
import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import backImg from "../../img/back.jpg";
import likeBtn from "../../img/like.svg";
import star from "../../img/review.svg";
import axios from "axios";

export default function ProfileHeader(props) {
    const navigate = useNavigate();
    const [btnStates, setBtnStates] = useState({
        프로필: false,
        후기: false,
        사진첩: false
    });
    const apiUrl = process.env.REACT_APP_API_URL;
    const [userData, setUserData] = useState({
      name: "",
      age: 0,
      rating:0,
      coachPicture:null
    });
    const coachId=props.id;
    
      useEffect(() => {
      
        axios.get(
          `${apiUrl}/coaches/${coachId}/info`
          )
          .then(response => {
            const data = response.data;
            console.log("API 응답:", response);
      
            if (data.isSuccess) {
              setUserData({
                name:data.result.nickname,
                age:data.result.age,
                rating:data.result.rating,
                coachPicture:data.result.coachPicture
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

    const handleBtnClick = (name) => {
        setBtnStates({
            프로필: false,
            후기: false,
            사진첩: false,
            [name]: true
        });

        switch (name) {
            case '프로필':
                navigate("/profile");
                break;
            case '후기':
                navigate("/lookreviews");
                break;
            case '사진첩':
                navigate("/photos");
                break;
            default:
                break;
        }

    };

    const handleChatClick = () => {
        const userId = 1; // 예: 유저 아이디
        const coachId = 1; // 예: 코치 아이디

        axios.post(`${apiUrl}/chatinglist`, { userId, coachId })
            .then(response => {
                console.log("채팅하기 API 응답:", response);
                // 채팅하기 요청에 대한 응답 처리
            })
            .catch(error => {
                console.error("채팅하기 API 요청 중 오류 발생:", error);
                console.error("에러 상세 정보:", error.response);
            });
    };

    return (
        <>  
        <TopWrap>
            <Backimgage src={backImg} alt="배경" />
            <BtnWrap>
                <img src={likeBtn} style={{width:"20px", paddingRight:"10px"}}/>
                <Btn onClick={() => handleBtnClick("프로필")} style={{backgroundColor: btnStates["프로필"] ? "rgba(255, 149, 73, 1)" : "",}}>                    
                프로필
                </Btn>
                <Btn onClick={() => handleBtnClick('후기')} style={{ backgroundColor: btnStates['후기'] ? "rgba(255, 149, 73, 1)" : "" }}>
                    후기
                </Btn>
                <Btn onClick={() => handleBtnClick('사진첩')} style={{ backgroundColor: btnStates['사진첩'] ? "rgba(255, 149, 73, 1)" : "" }}>
                    사진첩
                </Btn>
            </BtnWrap>
            
            <Link to="/chatinglist" style={{ textDecoration: "none"}}>
            <AskBtn onClick={handleChatClick}>채팅하기</AskBtn>
            </Link>
            </TopWrap>

            <Wrapper>
                <ProfileWrap>
                    <img src={userData.coachPicture} alt="프로필 이미지" />
                    <p>{userData.name} | {userData.age}</p>
                </ProfileWrap>
                <RatingWrap>
                    <img src={star} />
                    <h4>{userData.rating}</h4>
                </RatingWrap>
            </Wrapper>
        </>
    );
}
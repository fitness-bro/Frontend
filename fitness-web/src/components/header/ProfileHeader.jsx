import { TopWrap,Wrapper,AskBtn,Btn, BtnWrap, ProfileWrap, Backimgage,RatingWrap, Requirebtn, Requirechat } from "./ProfileHeader.style";
import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import backImg from "../../img/back.jpg";
import unlikeBtn from "../../img/unlike.svg";
import likeBtn from '../../img/like.svg';
import star from "../../img/review.svg";
import axios from "axios";

export default function ProfileHeader(props) {
    const navigate = useNavigate();
    const userRole=localStorage.getItem("role");
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
    const [likeBtnClicked, setLikeBtnClicked] = useState(false);
    const coachId=props.id;
    const token=localStorage.getItem("token");

    const handleImgClick = () => {
        const userId = props.id; // 코치 아이디

        if(userRole=="COACH"){
          alert("같은 동네형이므로 찜할 수 없습니다!");
          return;
        }

        if (!token) {
          // 토큰이 없는 경우 알림 표시
          alert("로그인 후에 사용할 수 있습니다!");
          return;
      }

        const config = {
          headers: {
            'token': token // 'token' 헤더 추가
        }
        };
    
        axios.post(`${apiUrl}/members/favorite/${userId}`, null, config)
          .then(response => {
            console.log("즐겨찾기 추가 응답:", response);
            setLikeBtnClicked(prevState => !prevState);
          })
          .catch(error => {
            console.error("즐겨찾기 추가 요청 중 오류 발생:", error);
            console.error("에러 상세 정보:", error.response);
          });
      };
    
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
                // age:data.result.age,
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
            후기: false,
            사진첩: false,
            [name]: true
        });

        switch (name) {
        
            case '후기':
                navigate("/lookreviews", {
                    state: {
                      userId: coachId
                    }
                  });
                break;
            case '사진첩':
                navigate("/photos");
                break;
            default:
                break;
        }

    };

    const handleChatClick = () => {


        axios.post(`${apiUrl}/chat/connect`, { coachId},{
            headers: {
                'token': token
            }
        })
            .then(response => {
                console.log("채팅하기 API 응답:", response);
                // 채팅하기 요청에 대한 응답 처리
            })
            .catch(error => {
                console.error("채팅하기 API 요청 중 오류 발생:", error);
                console.error("에러 상세 정보:", error.response);
            });
    };
    const handleRequireClick = () => {

        const coachId = 552;
        axios.post(`${apiUrl}/match/member`, { coachId })
        .then(response => {
            console.log("성사 요청 API 응답:", response);
          
        })
        .catch(error => {
            console.error("성사 API 요청 중 오류 발생:", error);
            console.error("에러 상세 정보:", error.response);
        });

    }
    return (
        <>  
        <TopWrap>
            <Backimgage src={backImg} alt="배경" />
            <BtnWrap>
                <img src={likeBtnClicked ? likeBtn : unlikeBtn} style={{width:"20px", paddingRight:"10px",cursor:"pointer"}} onClick={handleImgClick}/>
                <Btn onClick={() => handleBtnClick('후기')} style={{ backgroundColor: btnStates['후기'] ? "rgba(255, 149, 73, 1)" : "" }}>
                    후기
                </Btn>
                <Btn onClick={() => handleBtnClick('사진첩')} style={{ backgroundColor: btnStates['사진첩'] ? "rgba(255, 149, 73, 1)" : "" }}>
                    사진첩
                </Btn>
            </BtnWrap>
            
            <Requirechat>
                <Requirebtn onClick={handleRequireClick}>성사 요청</Requirebtn>
                <Link to="/chatinglist" style={{ textDecoration: "none"}}>
                        <AskBtn onClick={handleChatClick}>채팅하기</AskBtn>
                    </Link>
            </Requirechat>
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
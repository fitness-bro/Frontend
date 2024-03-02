import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Member.css";
import axios from "axios";

function Member({ memberId }) { // coachId prop을 받음
    const apiUrl = "https://dev.fitness-bro.pro";
    const token=localStorage.getItem("token");
    const [userData, setUserData] = useState({
        nickname: "",
        match_num: 0,
        review_num: 0,
        coachImage:"",
    });

    const textStyle = {
        color: "#FF9549",
    };

    const inputRef = useRef(null);
    const [image, setImage] = useState("");

    const handleImageClick = () => {
        inputRef.current.click();
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        axios.get(`${apiUrl}/members/my-page`,{
            headers:{
                'token':token
            }
        })
            .then((response) => {
                const data = response.data;
                console.log("API 응답:", response);

                if (data.isSuccess) {
                    setUserData({
                        nickname: data.result.nickname,
                        match_num: data.result.matchNum,
                        review_num: data.result.reviewNum,
                        memberImage:data.result.memberImage
                    });
                } else {
                    console.log("API 요청 실패:", data.message);
                }
            })
            .catch((error) => {
                console.error("API 요청 중 오류 발생", error);
              
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.error("에러 상세보기", error.response.data);
                  console.error("상태 코드", error.response.status);
                  console.error("응답 헤더", error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.error("서버 응답 없음");
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.error("에러 메시지", error.message);
                }
              });
    }, [memberId]);

    return (
        <div className="memberContainer">
            <table>
                <tr>
                    <td colSpan={2}>
                        <div
                            onClick={handleImageClick}
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "150px",
                                height: "150px",
                            }}
                        >
                            {image ? (
                                <img
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        alignItems: "center",
                                        borderRadius: "100px",
                                    }}
                                    src={URL.createObjectURL(image)}
                                    alt=""
                                />
                            ) : (
                                <div className="memberbgprofile">
                                    <Icon
                                        className="memberIcon"
                                        icon="ic:baseline-person-outline"
                                        alt="기본 이미지"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                ref={inputRef}
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                        </div>
                        <Link to="/ModifyingMember" style={{ color: "#FF9549" }}>
                            나의 정보 수정하기
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} style={{ fontSize: "20px", fontWeight: "800" }}>
                        {userData.nickname}님, 오늘도 건강하세요!
                    </td>
                </tr>
                <tr>
                <table style={{width: "50%", marginLeft:"25%"}}>
                <tr>
                <td>
            성사 성공&nbsp;&nbsp;&nbsp;<sapn style={textStyle}>{userData.match_num}</sapn>
          </td>
          <td style={{width:"0%"}}>|</td>

          <td>
            작성한 후기&nbsp;&nbsp;&nbsp;<sapn style={textStyle}>{userData.review_num}</sapn>
          </td>
                </tr>
          
            </table>
                </tr>
            </table>
        </div>
    );
}

export default Member;
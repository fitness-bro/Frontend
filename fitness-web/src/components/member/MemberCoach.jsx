import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Member.css";
import axios from "axios";

function MemberCoach({ coachId }) { // coachId prop을 받음
    const apiUrl = process.env.REACT_APP_API_URL;
    const [userData, setUserData] = useState({
        nickname: "",
        match_num: 0,
        review_num: 0,
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
        axios.get(`${apiUrl}coaches/${coachId}`)
        .then((response) => {
            const data = response.data;
            console.log("API 응답:", response);

            if (data.isSuccess) {
                setUserData({
                    nickname: data.result.nickname,
                    match_num: data.result.matchNum,
                    review_num: data.result.reviewNum,
                });
            } else {
                console.log("API 요청 실패:", data.message);
            }
        })
        .catch((error) => {
            console.error("API 요청 중 오류 발생", error);
            console.error("에러 상세보기", error.response);
        });
    }, [coachId]);

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
                        <Link to="/ModifyingCoach" style={{ color: "#FF9549" }}>
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
            받은 후기&nbsp;&nbsp;&nbsp;<sapn style={textStyle}>{userData.review_num}</sapn>
          </td>
                </tr>
          
            </table>
                </tr>
            </table>
        </div>
    );
}

export default MemberCoach;
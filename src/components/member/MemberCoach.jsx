import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Member.css";
import axios from "axios";

function MemberCoach({ coachId }) {
  // coachId prop을 받음
  const apiUrl = "https://dev.fitness-bro.pro";
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    nickname: "",
    match_num: 0,
    review_num: 0,
    coachImage: "",
  });

  const textStyle = {
    color: "#FF9549",
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/coaches/my-page`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        const data = response.data;
        console.log("API 응답:", response);

        if (data.isSuccess) {
          setUserData({
            nickname: data.result.nickname,
            match_num: data.result.matchNum,
            review_num: data.result.reviewNum,
            coachImage: data.result.coachImage,
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
  }, [coachId]);

  return (
    <div className="memberContainer">
      <table>
        <tr>
          <td colSpan={2}>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "150px",
                height: "150px",
                marginBottom: "10px",
              }}
            >
              {userData.coachImage ? (
                <img
                  style={{
                    width: "150px",
                    height: "150px",
                    alignItems: "center",
                    borderRadius: "100px",
                  }}
                  src={userData.coachImage}
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
          <table style={{ width: "50%", marginLeft: "25%" }}>
            <tr>
              <td>
                성사 성공&nbsp;&nbsp;&nbsp;
                <sapn style={textStyle}>{userData.match_num}</sapn>
              </td>
              <td style={{ width: "0%" }}>|</td>

              <td>
                받은 후기&nbsp;&nbsp;&nbsp;
                <sapn style={textStyle}>{userData.review_num}</sapn>
              </td>
            </tr>
          </table>
        </tr>
      </table>
    </div>
  );
}

export default MemberCoach;

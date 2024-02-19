import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Member.css";
import axios from "axios";

//import { useSelector} from "react-redux";

function Member({memberId}) {
  // const user = useSelector((state) => state.user);
  const apiUrl = process.env.REACT_APP_API_URL;
  

  const [userData,setUserData] = useState({
    nickname:"",
    match_num:0,
    review_num:0,
    memberImage:"", 
  });

  const textStyle = {
    color: "#FF9549",
  };

  const token=localStorage.getItem("token");

  useEffect(()=>{

    axios.get(
        `${apiUrl}/members`, 
        {
            headers: {
              'token': token
            }
        }
    )

    .then(response=>{
        const data=response.data;
        console.log("API응답:", response);

        if(data.isSuccess){
            setUserData({

                nickname:data.result.nickname,
                match_num:data.result.match_num,
                review_num:data.result.review_num,
                memberImage:data.result.memberImage,
            });
        }
        else{
            console.log("API 요청 실패", data.message);
        }

    })
    .catch(error=> {
        console.error("API 요청 중 오류 발생", error);
        console.error("에러 상세보기", error.response);
      });
  },[]);
  

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
              }}
            >
              {userData.memberImage ? (
                <img
                  style={{
                    width: "150px",
                    height: "150px",
                    alignItems: "center",
                    borderRadius: "100px",
                  }}
                  src={userData.memberImage}
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
            <Link to="/ModifyingInformation" style={{ color: "#FF9549" }}>
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
            작성 후기&nbsp;&nbsp;&nbsp;<sapn style={textStyle}>{userData.review_num}</sapn>
          </td>
                </tr>
            </table>
       
        </tr>
      </table>
    </div>
  );
}

export default Member;

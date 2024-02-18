import React, { useState,useRef } from "react";
import "./ModifyingInformation.css";
import { Icon } from "@iconify/react";
import axios from "axios";

export default function RegistrationMember() {
    const apiUrl = "http://dev.fitness-bro.pro/";
  const [nickname, setNickname] = useState("");
  const [residence, setResidence] = useState("");
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhlZXN1bjEwN0BrYWthby5jb20iLCJpYXQiOjE3MDc5NzM2NjMsImV4cCI6MTcwNzk3NzI2M30.RGOto2i7ckb4lGHimLdfcklznOWbDf9pg9ZpVyCsjxEyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhlZXN1bjEwN0BrYWthby5jb20iLCJpYXQiOjE3MDc5NzA4ODgsImV4cCI6MTcwNzk3NDQ4OH0.eUCRtidXwPcyM5VzPvCaI_jAMDT6_IA4V3Vx3h5Nehc';
  const hadleNicknameChange = (e) => setNickname(e.target.value);
  const hadleResidenceChange = (e) => setResidence(e.target.value);
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

  const hadleSubmit = async (e) => {
    const updateData = {
        nickname,
        residence
      };
  
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/members/sign-up`, 
        { updateData }, {
            headers: {
                'token': token
            }
      });

      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("서버에 데이터를 보내는 동안 오류 발생:", error);
    }
  };

  const textStyle = {
    color: "#FF9549",
    fontWeight: 1000,
    textAlign: "left",
  };

  const boxStyle1 = {
    backgroundColor: "#FFE0CA",
    borderRadius: "10px",
    border: "0px",
    width: "600px",
    height: "30px",
    marginTop: "5px",
  };

  return (
    <div className="registrationContainer">
      <form onSubmit={hadleSubmit}>
        <table>
          <thead>
            <tr>
              <td>
                <div style={textStyle}>내 정보 등록하기</div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="bgprofile"  onClick={handleImageClick}>
                  <div className="profile">
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
                   <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
                </div>
              )}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>닉네임 </div>
                <input
                  type="text"
                  value={nickname}
                  onChange={hadleNicknameChange}
                  style={{ ...boxStyle1 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>거주 지역</div>
                <input
                  type="text"
                  value={residence}
                  onChange={hadleResidenceChange}
                  style={{ ...boxStyle1 }}
                />
                
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit" className="btn-submit">
                  등록 완료하기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

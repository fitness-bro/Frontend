
import React, { useState, useRef } from "react";
import "./ModifyingInformation.css";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function RegistrationMember() {
    const apiUrl = "http://dev.fitness-bro.pro";
  const token = localStorage.getItem("token");
  const navigate=useNavigate();
  
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(""); // 프로필 이미지

  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleImageClick = () => {
    // 이미지 선택 input 클릭
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    // 선택한 이미지를 상태에 저장
    const files = e.target.files;
    if (files && files.length > 0) {
      setProfileImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('request', JSON.stringify({
      "nickname": nickname,
      "address": address
    }));
    
    if (profileImage) {
      formData.append('picture', profileImage, `@${profileImage.name};type=${profileImage.type}`);
    }
    
    try {
      const response = await axios.post(
        `${apiUrl}/members/sign-up`,
        formData,
        {
          headers: {
            'token': token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    
      // 여기서 응답 처리
      console.log("Coach updated:", response.data);
      alert("회원 정보를 등록했습니다!");
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      console.error('에러 상세 정보:', error.response);

      if (error.response && error.response.data) {
        console.error('서버 응답 데이터:', error.response.data);
      }

      alert("등록에 실패했습니다ㅠㅠ");

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


  const inputRef = useRef(null);

  return (
    <div className="registrationContainer">
      <form onSubmit={handleSubmit}>

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

              <div onClick={handleImageClick}>
                {profileImage ? (
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          alignItems: "center",
                          borderRadius: "100px",
                        }}
                        src={profileImage ? URL.createObjectURL(profileImage) : ''}
                        alt=""
                      />
                    ) : (
                      <div className="regmemberbgprofile">
                        <Icon
                          className="regmemberIcon"
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
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>닉네임 </div>
                <input
                  type="text"
                  value={nickname}

                  onChange={handleNicknameChange}

                  style={{ ...boxStyle1 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>거주 지역</div>
                <input
                  type="text"

                  value={address}
                  onChange={handleAddressChange}
                  style={{ ...boxStyle1 }}
                />


              </td>
            </tr>
            <tr>
              <td>
                <button type="submit" className="btn-submit">

                  회원 등록 완료하기


                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );

}


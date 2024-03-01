import React, { useState, useEffect, useRef } from "react";
import "./ModifyingInformation.css";
import { Icon } from "@iconify/react";
import axios from "axios";

export default function ModifyingMember() {
    const apiUrl = "http://dev.fitness-bro.pro";
  const token = localStorage.getItem("token");

  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null); // 프로필 이미지


  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/members/my-info`,{
            headers: {
              'token': token,
            },
          });

        const memberInfoData = response.data;
  
        // 가져온 유저 정보를 각 입력 필드의 초기값으로 설정
        setNickname(memberInfoData.result.nickname || '');
        setAddress(memberInfoData.result.address || '');
  
        // 이미지를 가져오는 부분 추가
        setProfilePictureUrl(memberInfoData.result.memberImage);

      } catch (error) {
        // 에러 처리
        console.error('에러:', error);
        console.error('에러 상세 정보:', error.response);
  
        if (error.response && error.response.data) {
          console.error('서버 응답 데이터:', error.response.data);
        }
      }
    };
  
    fetchUserInfo();
  }, [apiUrl, token]);

  const handleImageClick = () => {
    // 이미지 선택 input 클릭
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setNewProfileImage(file);
};

const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('request', JSON.stringify({
      nickname: nickname,
      address: address
    }));
    
    // 새 프로필 이미지가 있는 경우에만 FormData에 추가합니다.
    if (newProfileImage) {
      formData.append('picture', newProfileImage, `@${newProfileImage.name};type=${newProfileImage.type}`);
    } else if (profilePictureUrl) {
      // 이 부분이 실행되는지 확인하기 위해 로그를 추가합니다.
      console.log("이전 이미지 URL:", profilePictureUrl);
      formData.append('picture', profilePictureUrl);
    } else {
      // 새 이미지도 없고, 이전 이미지도 없는 경우, 경고를 표시하고 종료합니다.
      console.warn("새 이미지 및 이전 이미지가 없습니다.");
      return;
    }
    
    try {
      const response = await axios.put(
        `${apiUrl}/members/update`,
        formData,
        {
          headers: {
            'token': token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log("응답 데이터:", response.data);
      alert("수정이 완료됐습니다!");
    } catch (error) {
      console.error('에러:', error);
      console.error('에러 상세 정보:', error.response);
  
      if (error.response && error.response.data) {
        console.error('서버 응답 데이터:', error.response.data);
      }
      alert("수정에 실패했습니다");
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
                <div style={textStyle}>내 정보 수정하기</div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              <div onClick={handleImageClick}>
        {newProfileImage ? (
            <img
                style={{
                    width: "100px",
                    height: "100px",
                    alignItems: "center",
                    borderRadius: "100px",
                    marginBottom:"25px",
                    marginTop:"25px"
                }}
                src={URL.createObjectURL(newProfileImage)}
                alt=""
            />
        ) : profilePictureUrl ? (
            <img
                style={{
                    width: "100px",
                    height: "100px",
                    alignItems: "center",
                    borderRadius: "100px",
                    marginBottom:"25px",
                    marginTop:"25px"
                }}
                src={profilePictureUrl}
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
                  style={{...boxStyle1 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit" className="btn-submit">
                  수정 완료하기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
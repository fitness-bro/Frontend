import React, { useState, useEffect, useRef } from "react";
import "./ModifyingInformation.css";
import { Icon } from "@iconify/react";
import axios from "axios";

export default function ModifyingMember() {
    const apiUrl = "http://dev.fitness-bro.pro";
  const token = localStorage.getItem("token");

  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [memberImage, setMemberImage] = useState("");
  const [user, setUser] = useState(null); // 유저 정보를 담을 상태

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
      setMemberImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('request', JSON.stringify({
      "nickname": nickname,
      "address": address
    }));
    
    if (memberImage instanceof File) {
      // 이미지 파일이면 직접 추가
      formData.append('memberImage', memberImage);
    }
    
    
    // 나머지 코드는 그대로 유지
    try {
      // 유저 정보를 가져옴
      const userResponse = await axios.get(
        `${apiUrl}/members/my-info`,
        {
          headers: {
            'token': token,
          },
        }
      );

      // 가져온 유저 정보를 상태에 저장
      setUser(userResponse.data.result);

      // 유저 정보를 수정
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

      // 여기서 응답 처리
      console.log("응답 데이터:", response.data);

      alert("수정 완료됐습니다!.");
    } catch (error) {
      // 에러 처리
      console.error('에러:', error);
      console.error('에러 상세 정보:', error.response);

      if (error.response && error.response.data) {
        console.error('서버 응답 데이터:', error.response.data);
      }
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

  useEffect(() => {
    // 컴포넌트가 마운트될 때 유저 정보를 가져옴
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/members/my-info`,
          {
            headers: {
              'token': token,
            },
          }
        );
  
        // 가져온 유저 정보를 상태에 저장
        setUser(response.data.result);
  
        // 가져온 유저 정보를 각 입력 필드의 초기값으로 설정
        setNickname(response.data.result.nickname);
        setAddress(response.data.result.address);
  
        // 이미지를 가져오는 부분 추가
        if (response.data.result.memberImage) {
          const imageUrl = response.data.result.memberImage;
          setMemberImage(imageUrl);
        }
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
                <div className="bgprofile" onClick={handleImageClick}>
                  <div className="profile">
                    {memberImage ? (
                      <img
                      style={{
                        width: "150px",
                        height: "150px",
                        alignItems: "center",
                        borderRadius: "100px",
                      }}
                      src={memberImage}
                      alt="프로필 이미지"
                    />
                    ) : user && user.picture ? (
                      <img
                        style={{
                          width: "150px",
                          height: "150px",
                          alignItems: "center",
                          borderRadius: "100px",
                        }}
                        src={user.picture}
                        alt="프로필 이미지"
                      />
                    ) : (
                      <Icon
                        className="icon"
                        icon="ic:baseline-person-outline"
                        alt="기본 이미지"
                      />
                    )}
                  </div>
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
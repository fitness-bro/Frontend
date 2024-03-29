import React, { useState, useEffect, useRef } from "react";
import "./ModifyingInformation.css";
import { Icon } from "@iconify/react";
import axios from "axios";
import ImgModal from "../components/imgModal/ImgModal";

export default function ModifyingMember() {
  const apiUrl = "http://dev.fitness-bro.pro";
  const token = localStorage.getItem("token");

  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null); // 프로필 이미지
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  
  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setNewProfileImage(file);
  };

  const handleImgDelete = (e) => {
    e.preventDefault(); // 기본 동작 방지
    // 이미지 미리보기 지우기
    setNewProfileImage(null);

    // 기존 프로필 이미지 URL 지우기
    setProfilePictureUrl(null);
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/members/my-info`, {
          headers: {
            token: token,
          },
        });

        const memberInfoData = response.data;

        // 가져온 유저 정보를 각 입력 필드의 초기값으로 설정
        setNickname(memberInfoData.result.nickname || "");
        setAddress(memberInfoData.result.address || "");

        // 이미지를 가져오는 부분 추가
        setProfilePictureUrl(memberInfoData.result.memberImage);
      } catch (error) {
        // 에러 처리
        console.error("에러:", error);
        console.error("에러 상세 정보:", error.response);

        if (error.response && error.response.data) {
          console.error("서버 응답 데이터:", error.response.data);
        }
      }
    };

    fetchUserInfo();
  }, [apiUrl, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "request",
      JSON.stringify({
        nickname: nickname,
        address: address,
      })
    );

    // 새 프로필 이미지가 있는 경우에만 FormData에 추가합니다.
    if (newProfileImage) {
        formData.append(
          "picture",
          newProfileImage,
          `@${newProfileImage.name};type=${newProfileImage.type}`
        );
      } else if (profilePictureUrl) {
        formData.append("picture", profilePictureUrl);
      } else {
        try {
          const deleteresponse = await axios.delete(
            // Changed from axios.put to axios.patch
            `${apiUrl}/members/update/delete/image`,
            {
              headers: {
                token: token,
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          console.log("Coach updated:", deleteresponse.data);
        } catch (error) {
          console.error("Error:", error);
          console.error("에러 상세 정보:", error.deleteresponse);
  
          if (error.deleteresponse && error.deleteresponse.data) {
            console.error("서버 응답 데이터:", error.deleteresponse.data);
          }
        }
      }

    try {
      const response = await axios.patch(`${apiUrl}/members/update`, formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("응답 데이터:", response.data);
      alert("수정이 완료됐습니다!");
    } catch (error) {
      console.error("에러:", error);
      console.error("에러 상세 정보:", error.response);

      if (error.response && error.response.data) {
        console.error("서버 응답 데이터:", error.response.data);
      }
      alert("수정에 실패했습니다");
    }
  };

  return (
    <div className="registrationContainer">
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <td>
                <div
                  style={{
                    color: "#FF9549",
                    fontWeight: 1000,
                    textAlign: "left",
                  }}
                >
                  내 정보 수정하기
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  {newProfileImage ? (
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        alignItems: "center",
                        borderRadius: "100px",
                        marginBottom: "25px",
                        marginTop: "25px",
                      }}
                      src={URL.createObjectURL(newProfileImage)}
                      alt="새로운 프로필"
                      onClick={openModal} 
                    />
                  ) : profilePictureUrl ? (
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        alignItems: "center",
                        borderRadius: "100px",
                        marginBottom: "25px",
                        marginTop: "25px",
                      }}
                      src={profilePictureUrl}
                      alt="기존 프로필"
                      onClick={openModal} 
                    />
                  ) : (
                    <div className="regmemberbgprofile"  style={{
                        width: "100px",
                        height: "100px",
                        alignItems: "center",
                        borderRadius: "100px",
                        marginBottom: "25px",
                        marginTop: "25px",
                      }}>
                      <Icon
                        className="regmemberIcon"
                        icon="ic:baseline-person-outline"
                        alt="기본 이미지"
                        onClick={openModal} 
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
                <div
                  style={{
                    color: "#FF9549",
                    fontWeight: 1000,
                    textAlign: "left",
                  }}
                >
                  닉네임{" "}
                </div>
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  style={{
                    backgroundColor: "#FFE0CA",
                    borderRadius: "10px",
                    border: "0px",
                    width: "600px",
                    height: "30px",
                    marginTop: "5px",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div
                  style={{
                    color: "#FF9549",
                    fontWeight: 1000,
                    textAlign: "left",
                  }}
                >
                  거주 지역
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  style={{
                    backgroundColor: "#FFE0CA",
                    borderRadius: "10px",
                    border: "0px",
                    width: "600px",
                    height: "30px",
                    marginTop: "5px",
                  }}
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
      {/* 모달 */}
      <ImgModal
  isOpen={isModalOpen}
  onClose={closeModal}
  inputRef={inputRef}
  handleImageChange={handleImageChange}
  handleImgDelete={handleImgDelete} // handleImgDelete 함수 전달
  handleImageClick={handleImageClick}
/>
    </div>
  );
}

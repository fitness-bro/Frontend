import React, { useState, useEffect } from "react";
import "./ModifyingInformation.css";
import { Icon } from "@iconify/react";
import axios from "axios";

export default function ModifyingCoach({ coachId }) {

    const apiUrl = "http://dev.fitness-bro.pro/";
  const [coach, setCoach] = useState({
    nickname: "",
    address: "",
    comment: "",
    price: 0,
    schedule: "",
    introduction: "",
  });
  const [updatedCoach, setUpdatedCoach] = useState({});
  const [showImages, setShowImages] = useState([]);

  //다중 이미지 첨부, 삭제
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    // 최대 6개로 제한
    imageUrlLists = imageUrlLists.slice(0, 6);

    setShowImages(imageUrlLists);
  };

  const handleDeleteImage = (id) => {
    setShowImages((prevImages) =>
      prevImages.filter((_, index) => index !== id)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 수정된 정보 업데이트
    setUpdatedCoach((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // 회원 정보 가져오기
    axios
      .get(`${apiUrl}coaches/${coachId}/info`)
      
      .then((response) => {
        const resdata = response.data;
        if (resdata.isSuccess) {
            setCoach(response.data.result);
            setUpdatedCoach(response.data.result); // 수정된 정보를 초기화
        } else {
            console.log("API 요청 실패:", resdata.message);
        }
    })
        
      .catch((error) => {
        console.error("API 요청 중 오류 발생", error);
        console.error("에러 상세보기", error.response);
      });
  }, [coachId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 수정된 정보를 서버로 전송
    axios
      .put(`${apiUrl}coaches/${coachId}`, updatedCoach)
      .then((response) => {
        console.log("코치 정보 수정 완료:", response.data);
        // 성공적으로 업데이트되었다는 메시지 등 처리
      })
      .catch((error) => {
        console.error("코치 정보 수정 실패:", error);
        // 오류 처리
      });
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
    outline: "none",
  };

  boxStyle1[":focus"] = {
    boxShadow: "0 0 5px rgba(255, 149, 73, 0.8)", // 포커스일 때의 테두리 효과 추가
  };

  const boxStyle2 = {
    backgroundColor: "#FFE0CA",
    borderRadius: "10px",
    border: "0px",
    width: "600px",
    height: "100px",
    marginTop: "5px",
  };

  const imageContainerStyle = {
    display: "flex",
  };

  const emptyImageStyle = {
    width: "80px",
    height: "80px",
    border: "3px dashed #cccccc",
    margin: "5px",
    borderRadius: "5px",
    color: "#919191",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

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
                <div className="bgprofile">
                  <div className="profile">
                    <Icon
                      className="icon"
                      icon="ic:baseline-person-outline"
                      alt="기본 이미지"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>닉네임 </div>
                <input
                  type="text"
                  name="nickname"
                  value={updatedCoach.nickname || ''} 
                  onChange={handleInputChange}
                  style={{ ...boxStyle1 }}
                />
              </td>
            </tr>

            <tr>
              <td>
                <div style={textStyle}>선생님 소개</div>
                <input
                  type="text"
                  name="introduction"
                  value={updatedCoach.introduction || ""}
                  onChange={handleInputChange}
                  style={{ ...boxStyle1 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>주 운동 시간</div>
                <input
                  type="text"
                  name="schedule"
                  value={updatedCoach.schedule || ""}
                  onChange={handleInputChange}
                  style={{ ...boxStyle1 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>이용 가격</div>
                <textarea
                  name="price"
                  value={updatedCoach.price || 0}
                  onChange={handleInputChange}
                  style={{ ...boxStyle2 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>한 줄 인사말</div>
                <textarea
                  name="comment"
                  value={updatedCoach.comment || ""}
                  onChange={handleInputChange}
                  style={{ ...boxStyle2 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>이미지 등록</div>
                <div className="imageGallery" style={imageContainerStyle}>
                  {[...Array(6)].map((_, id) => (
                    <div className="imageContainer" key={id}>
                      {showImages[id] ? (
                        <div>
                          <div
                            className="close"
                            onClick={() => handleDeleteImage(id)}
                          >
                            <div className="closeIcon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 8 8"
                              >
                                <path
                                  fill="currentColor"
                                  d="M1.41 0L0 1.41l.72.72L2.5 3.94L.72 5.72L0 6.41l1.41 1.44l.72-.72l1.81-1.81l1.78 1.81l.69.72l1.44-1.44l-.72-.69l-1.81-1.78l1.81-1.81l.72-.72L6.41 0l-.69.72L3.94 2.5L2.13.72z"
                                />
                              </svg>
                            </div>
                          </div>
                          <img
                            src={showImages[id]}
                            alt={`${showImages[id]}-${id}`}
                          />
                        </div>
                      ) : (
                        <div className="empty-image" style={emptyImageStyle}>
                          <Icon
                            className="img-icon"
                            icon="ic:baseline-person-outline"
                            alt="기본 이미지"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="file"
                  id="input-file"
                  style={{ display: "none" }}
                  onChange={handleAddImages}
                />
                <label htmlFor="input-file" className="addButton">
                  이미지 불러오기
                </label>
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

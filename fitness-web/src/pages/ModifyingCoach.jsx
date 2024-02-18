import React, { useState, useRef, useEffect } from "react";
import "./ModifyingInformation.css";
import { Icon } from "@iconify/react";
import axios from "axios";
import ModalSearch from "../components/modalsearch/ModalSearch";
import { FaSearch } from 'react-icons/fa';

export default function ModifyingCoach() {
const apiUrl = process.env.REACT_APP_API_URL;
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [schedule, setSchedule] = useState("");
  const [price, setPrice] = useState("");
  const [comment, setComment] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState();
  const [keyword, setKeyword] = useState("");
  const [albumImages, setAlbumImages] = useState([]); // 앨범이미지 저장
  const [profileImage, setProfileImage] = useState(""); // 프로필 이미지
  const [coachInfo, setCoachInfo] = useState(null); // 코치 정보 추가

  const profilePictureUrl = coachInfo?.result?.coachPicture;
  const token = localStorage.getItem("token");
  const coachId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchCoachInfo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/coaches/${coachId}/info`, {
          headers: {
            'token': token,
          },
        });

        // 서버로부터 받아온 데이터
        const coachInfoData = response.data;

        // 받아온 데이터를 활용하여 필요한 처리 수행
        console.log('Coach Info:', coachInfoData);

        // 받아온 코치 정보를 각 입력창에 설정
        setNickname(coachInfoData.result.nickname || '');
        setAge(coachInfoData.result.age || '');
        setIntroduction(coachInfoData.result.introduction || '');
        setSchedule(coachInfoData.result.schedule || '');
        setPrice(coachInfoData.result.price || '');
        setComment(coachInfoData.result.comment || '');
        setKeyword(coachInfoData.result.address || '');
        setSelectedGym({
          ...coachInfoData.result,
        });

        setCoachInfo(coachInfoData); // 코치 정보 설정

        // 이미지 설정은 따로 로직을 추가해야 합니다.
        // setProfileImage(coachInfoData.result.profileImage || ''); // 예시일 뿐, 실제로는 파일 처리가 필요
        // setAlbumImages(coachInfoData.result.albumImages || []); // 예시일 뿐, 실제로는 파일 처리가 필요
      } catch (error) {
        console.error('Error fetching coach info:', error);

        // 에러 처리
        if (error.response && error.response.data) {
          console.error('서버 응답 데이터:', error.response.data);
        }
      }
    };

    fetchCoachInfo();
  }, []);


  const fullAddress = selectedGym
    ? `${selectedGym.region} ${selectedGym.subAddress} ${selectedGym.detailAddress}`
    : "";

  const inputRef = useRef(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      console.log(file);
      setProfileImage(file);
    }
  };

  const handleAddImages = (event) => {
    const imageFiles = event.target.files;
    let imageFileObjects = [...albumImages];

    for (let i = 0; i < imageFiles.length; i++) {
      const currentImageFile = imageFiles[i];
      imageFileObjects.push(currentImageFile);
    }

    imageFileObjects = imageFileObjects.slice(0, 6);
    setAlbumImages(imageFileObjects);

    console.log('Selected Images:', imageFileObjects);
  };

  const handleDeleteImage = (id) => {
    setAlbumImages((prevImages) =>
      prevImages.filter((_, index) => index !== id)
    );
  };

  const handleGymClick = (gym) => {
    setSelectedGym(gym);
    setKeyword(`${gym.name} ${gym.region} ${gym.subAddress} ${gym.detailAddress}`);
    setModalOpen(false);
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await axios.get(`${apiUrl}/gym/search?keyword=${keyword}`);
        setSearchResults(response.data.result);
        setModalOpen(true);
      } catch (error) {
        console.error("Error fetching gym search results:", error);
      }
    }
  };

  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);
  const handleIntroductionChange = (e) => setIntroduction(e.target.value);
  const handleScheduleChange = (e) => setSchedule(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('request', JSON.stringify({
      nickname: nickname,
      age: parseInt(age),
      introduction: introduction,
      schedule: schedule,
      comment: comment,
      address: fullAddress,
      region: selectedGym.region,
      subAddress: selectedGym.subAddress,
      detailAddress: selectedGym.detailAddress,
      price: parseInt(price)
    }));

    if (profileImage) {
      formData.append('picture', profileImage, `@${profileImage.name};type=${profileImage.type}`);
    }
    
    for (let i = 0; i < albumImages.length; i++) {
      formData.append('album', albumImages[i], `@${albumImages[i].name};type=${albumImages[i].type}`);
    }

    try {
      const response = await axios.put(
        `${apiUrl}/coaches/update`,
        formData,
        {
          headers: {
            'token': token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log("Coach updated:", response.data);
      alert("회원 정보를 등록했습니다!");
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
    fontWeight: 'bold',
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

  const boxStyle2 = {
    resize: "none",
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
        <table className="regTable">
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
                  {profilePictureUrl ? (
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        alignItems: "center",
                        borderRadius: "100px",
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
                <div style={textStyle}>나이</div>
                <input
                  type="text"
                  value={age}
                  onChange={handleAgeChange}
                  style={{ ...boxStyle1 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>선생님 소개</div>
                <input
                  type="text"
                  value={introduction}
                  onChange={handleIntroductionChange}
                  style={{ ...boxStyle1 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>주 운동 시간</div>
                <input
                  type="text"
                  value={schedule}
                  onChange={handleScheduleChange}
                  style={{ ...boxStyle1 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>이용 가격</div>
                <input
                  value={price}
                  onChange={handlePriceChange}
                  style={{ ...boxStyle1 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}> 한 줄 인사말</div>
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  style={{ ...boxStyle2 }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ ...textStyle, color: '#643E23', fontWeight: '600' }}>헬스장 찾기</div>
                <FaSearch style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', marginLeft: '580px', marginTop: '13px', width: '14px', height: '14px' }} />
                <style>
                  {`
                    ::placeholder {
                      color: white;
                      font-weight : bold;
                    }
                  `}
                </style>
                <input style={{ fontWeight: 'bold', color: '#643E23', backgroundColor: '#D1B5A1  ', borderRadius: "10px", border: "0px", width: "600px", height: "30px", marginTop: "5px", }}
                  type="text"
                  placeholder=" &nbsp; 주변 헬스장을 찾아보세요"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div style={textStyle}>이미지 등록</div>
                <div className="imageGallery" style={imageContainerStyle}>
                  {[...Array(6)].map((_, id) => (
                    <div className="imageContainer" key={id}>
                      {albumImages[id] ? (
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
                          </div>{" "}
                          <img
                            src={URL.createObjectURL(albumImages[id])}
                            alt={`${albumImages[id].name}-${id}`}
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
                  multiple // allow multiple file selection
                />
                <label htmlFor="input-file" className="addButton">
                  이미지 불러오기
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit" className="btn-submit">
                  수정 완료
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {modalOpen && (
        <ModalSearch
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        gymList={searchResults}
        onGymClick={handleGymClick}
        keyword={keyword}
      />
      )}
    </div>
  );
}
import img from "../img/profile.png"
import React, { useState } from 'react';
import defaultImage from "../img/profile.png";
import axios from 'axios';

export default function Registration(){
    const [nickname, setNickname] =useState("");
    const [id, setId] =useState("");
    const [password, setPassword] =useState("");
    const [information, setInformation] =useState("");
    const [detailed1, setDetailed1] =useState("");
    const [detailed2, setDetailed2] =useState("");
    const [detailed3, setDetailed3] =useState("");
    const [images, setImages] = useState([defaultImage, defaultImage, defaultImage, defaultImage, defaultImage, defaultImage]);
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

const hadlenicknameChange =(e) => setNickname(e.target.value);
const hadleidChange =(e) => setId(e.target.value);
const hadlepasswordChange =(e) => setPassword(e.target.value);
const hadleinformationChange =(e) => setInformation(e.target.value);
const hadledetailed1Change =(e) => setDetailed1(e.target.value);
const hadledetailed2Change =(e) => setDetailed2(e.target.value);
const hadledetailed3Change =(e) => setDetailed3(e.target.value);


  const handleImageChange = (e) => {
    const newImages = [...images];
    const reader = new FileReader();

    reader.onload = (event) => {
      const nextIndex = getNextAvailableIndex(newImages, selectedImageIndex);
      if (nextIndex !== -1) {
        newImages[nextIndex] = event.target.result;
        setSelectedImageIndex(nextIndex);
        setImages(newImages);

 
        if (!newImages.includes(defaultImage)) {
          setUploadButtonDisabled(true);
        }
      }
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getNextAvailableIndex = (imageArray, currentIndex) => {
    const nextIndex = imageArray.findIndex((image, index) => image === defaultImage && index >= currentIndex + 1);
    return nextIndex !== -1 ? nextIndex : imageArray.findIndex(image => image === defaultImage);
  };

  const handleImageClick = (index) => {

    const newImages = [...images];
    newImages[index] = defaultImage;
    setImages(newImages);
    setUploadButtonDisabled(false);
  };

  const hadleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('서버_API_URL', {
        nickname,
        id,
        password,
        information,
        detailed1,
        detailed2,
        detailed3,
        images,
      });

      console.log('서버 응답:', response.data);
    } catch (error) {
      
      console.error('서버에 데이터를 보내는 동안 오류 발생:', error);
    }
  };
  
    const textStyle={
        color:"#3176ff",
        fontWeight: 1000,
        textAlign:"left",
    }

    const boxStyle1={
        backgroundColor: "#d9d9d9",
        borderRadius:"10px",
        border:"0px",
        width:"600px",
        height:"30px",
        marginTop:"5px",
    }
    const boxStyle2={
        backgroundColor: "#d9d9d9",
        borderRadius:"10px",
        border:"0px",
        width:"600px",
        height:"100px",
        marginTop:"5px",
    }

    const imageContainerStyle = {
        display: 'flex',
        

      };

    return (
        <div className="registrationContainer"> 
        <form onSubmit={hadleSubmit}>
            <table>
                <thead>
                    <tr>
                        <td>
                            <div style={textStyle}>
                            동네형 등록하기
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        <img
                        style={{ width: "100px", height: "100px" }}
                        src={img}
                        alt="프로필사진"
                    />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>닉네임 </div>
                            <input type="text"  value={nickname} onChange={hadlenicknameChange} style={{ ...boxStyle1 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>아이디 </div>
                            <input type="text" value={id} onChange={hadleidChange} style={{ ...boxStyle1 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>비밀번호 </div>
                            <input type="password" value={password} onChange={hadlepasswordChange} style={{ ...boxStyle1 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>정보 </div>
                            <input type="text" value={information} onChange={hadleinformationChange} style={{ ...boxStyle1 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>세부 정보 사항</div>
                            <input type="text" value={detailed1} onChange={hadledetailed1Change} style={{ ...boxStyle1 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>세부 정보 사항</div>
                            <textarea value={detailed2} onChange={hadledetailed2Change} style={{ ...boxStyle2 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>세부 정보 사항</div>
                            <textarea value={detailed3} onChange={hadledetailed3Change} style={{ ...boxStyle2 }} />
                        </td>
                    </tr>
                    <tr>
            <td>
              <div style={textStyle}>이미지 등록</div>
              <div style={imageContainerStyle}>
                {images.map((image, index) => (
                  <div key={index}>
                    <img
                      style={{ width: "100px", height: "100px", cursor: "pointer", borderRadius:"100px" }}
                      src={image}
                      alt={`프로필사진 ${index + 1}`}
                      onClick={() => handleImageClick(index)}
                    />
                  </div>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="fileInput" className="btn-upload">
            이미지 불러오기
</label>
              <input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  id="fileInput"
  disabled={uploadButtonDisabled}
  style={{ display: 'none' }}
/>
            </td>
          </tr>
          <tr>
            <td>
                <button type="submit"  className="btn-submit">동네형 등록하기</button>
            </td>
          </tr>
                </tbody>
            </table>
            </form>
        </div>
    )
}
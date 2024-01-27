import React, { useState } from 'react';
import './ModifyingInformation.css';
import { Icon } from "@iconify/react";
import axios from 'axios';

export default function ModifyingInformation(){
    const [nickname, setNickname] =useState("");
    const [id, setId] =useState("");
    const [password, setPassword] =useState("");
    const [information, setInformation] =useState("");
    const [time, setTime] =useState("");
    const [price, setPrice] =useState("");
    const [greeting, setGreeting] =useState("");
    const [showImages, setShowImages] = useState([]);

    const hadleNicknameChange =(e) => setNickname(e.target.value);
    const hadleIdChange =(e) => setId(e.target.value);
    const hadlePasswordChange =(e) => setPassword(e.target.value);
    const hadleInformationChange =(e) => setInformation(e.target.value);
    const hadleTimeChange =(e) => setTime(e.target.value);
    const hadlePriceChange =(e) => setPrice(e.target.value);
    const hadleGreetingChange =(e) => setGreeting(e.target.value);


  const hadleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('서버_API_URL', {
        nickname,
        id,
        password,
        information,
        time,
        price,
        greeting,

    
      });

      console.log('서버 응답:', response.data);
    } catch (error) {
      
      console.error('서버에 데이터를 보내는 동안 오류 발생:', error);
    }
  };
  
    const textStyle={
        color:"#FF9549",
        fontWeight: 1000,
        textAlign:"left",
    }

    const boxStyle1={
        backgroundColor: "#FFE0CA",
        borderRadius:"10px",
        border:"0px",
        width:"600px",
        height:"30px",
        marginTop:"5px",
    }
    const boxStyle2={
        backgroundColor: "#FFE0CA",
        borderRadius:"10px",
        border:"0px",
        width:"600px",
        height:"100px",
        marginTop:"5px",
    }

    const imageContainerStyle = {
        display: 'flex',
        

      };
   
      const emptyImageStyle = {
      width: '80px',
      height: '80px',
      border: '3px dashed #cccccc',
      margin: '5px',
      borderRadius: '5px',
      color: '#919191',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      };
      
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
        setShowImages((prevImages) => prevImages.filter((_, index) => index !== id));
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
                    <div className="bgprofile">
                        <div className="profile">
                            <Icon className="icon" icon="ic:baseline-person-outline" alt="기본 이미지"/>
                            </div>
                    </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>닉네임 </div>
                            <input type="text"  value={nickname} onChange={hadleNicknameChange} style={{ ...boxStyle1 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>아이디 </div>
                            <input type="text" value={id} onChange={hadleIdChange} style={{ ...boxStyle1 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>비밀번호 </div>
                            <input type="password" value={password} onChange={hadlePasswordChange} style={{ ...boxStyle1 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>선생님 소개</div>
                            <input type="text" value={information} onChange={hadleInformationChange} style={{ ...boxStyle1 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>주 운동 시간</div>
                            <input type="text" value={time} onChange={hadleTimeChange} style={{ ...boxStyle1 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>이용 가격</div>
                            <textarea value={price} onChange={hadlePriceChange} style={{ ...boxStyle2 }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style={textStyle}>한 줄 인사말</div>
                            <textarea value={greeting} onChange={hadleGreetingChange} style={{ ...boxStyle2 }} />
                        </td>
                    </tr>
                    <tr>
            <td>
            <div style={textStyle}>이미지 등록</div>
<div className="image-gallery" style={imageContainerStyle}>
  {[...Array(6)].map((_, id) => (
    <div className="image-container" key={id} onClick={() => handleDeleteImage(id)}>
      {showImages[id] ? (
        <img src={showImages[id]} alt={`${showImages[id]}-${id}`} />
      ) : (
        <div className="empty-image" style={emptyImageStyle}>
            <Icon className="imgIcon" icon="ic:baseline-person-outline" alt="기본 이미지"/>
        </div>
      )}
    </div>
  ))}
</div>
            </td>
          </tr>
          <tr>
            <td>
            <input type="file"  id="input-file" style={{display:"none"}} onChange={handleAddImages} />
            <label htmlFor="input-file" className="add-button">
                이미지 불러오기
            </label>
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


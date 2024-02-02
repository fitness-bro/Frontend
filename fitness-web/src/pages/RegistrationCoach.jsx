import React, { useState } from 'react';
import './ModifyingInformation.css';
import { Icon } from "@iconify/react";
import axios from 'axios';

export default function RegistrationCoach(){

    const [id, setId] =useState("");
    const [password, setPassword] =useState("");
    const [information, setInformation] =useState("");
    const [time, setTime] =useState("");
    const [price, setPrice] =useState("");
    const [greeting, setGreeting] =useState("");
    const [showImages, setShowImages] = useState([]);

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
        resize:"none",
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
<div className="imageGallery" style={imageContainerStyle}>
  {[...Array(6)].map((_, id) => (
    <div className="imageContainer" key={id}>
      {showImages[id] ? (
        <div>
        <span className="close" onClick={() => handleDeleteImage(id)}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275a.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018a.751.751 0 0 1-.018-1.042L6.94 8L3.72 4.78a.75.75 0 0 1 0-1.06"/></svg></span>
    <img src={showImages[id]} alt={`${showImages[id]}-${id}`} />
    </div>
      ) : (
        <div className="empty-image" style={emptyImageStyle}>
            <Icon className="img-icon" icon="ic:baseline-person-outline" alt="기본 이미지"/>
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
            <label htmlFor="input-file" className="addButton">
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




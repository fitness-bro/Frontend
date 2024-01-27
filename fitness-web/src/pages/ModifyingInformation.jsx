import img from "../img/profile.png"
import React, { useState } from 'react';
import './ModifyingInformation.css';
import axios from 'axios';

export default function ModifyingInformation(){
    const [nickname, setNickname] =useState("");
    const [id, setId] =useState("");
    const [password, setPassword] =useState("");
    const [information, setInformation] =useState("");
    const [detailed1, setDetailed1] =useState("");
    const [detailed2, setDetailed2] =useState("");
    const [detailed3, setDetailed3] =useState("");
    const [showImages, setShowImages] = useState([]);



const hadlenicknameChange =(e) => setNickname(e.target.value);
const hadleidChange =(e) => setId(e.target.value);
const hadlepasswordChange =(e) => setPassword(e.target.value);
const hadleinformationChange =(e) => setInformation(e.target.value);
const hadledetailed1Change =(e) => setDetailed1(e.target.value);
const hadledetailed2Change =(e) => setDetailed2(e.target.value);
const hadledetailed3Change =(e) => setDetailed3(e.target.value);


  
  

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
   
      
      
        const handleAddImages = (event) => {
          const imageLists = event.target.files;
          let imageUrlLists = [...showImages];
      
          for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
          }
      
          if (imageUrlLists.length > 10) {
            imageUrlLists = imageUrlLists.slice(0, 10);
          }
      
          setShowImages(imageUrlLists);
        };
      
        const handleDeleteImage = (id) => {
          setShowImages(showImages.filter((_, index) => index !== id));
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
              <div className="image-gallery" style={imageContainerStyle}>
       
      
         
            {showImages.map((image, id) => (
              <div className="image-container" key={id} onClick={() => handleDeleteImage(id)}>
                <img src={image} alt={`${image}-${id}`} />
            
              </div>
            ))}
          </div>
            </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="input-file" className="add-button">
                업로드하기
              <input type="file"  id="input-file" multiple className="add-button" onChange={handleAddImages} />
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


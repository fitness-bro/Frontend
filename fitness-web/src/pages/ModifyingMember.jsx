import React, { useState } from 'react';
import './ModifyingInformation.css';
import { Icon } from "@iconify/react";
import axios from 'axios';

export default function ModifyingMember(){
    const [nickname, setNickname] =useState("");
    const [residence, setResidence] =useState("");
    
    
    const hadleNicknameChange =(e) => setNickname(e.target.value);
    const hadleResidenceChange =(e) => setResidence(e.target.value);
 


  const hadleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('서버_API_URL', {
        nickname,
        residence,

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
   

    return (
        <div className="registrationContainer"> 
        <form onSubmit={hadleSubmit}>
            <table>
                <thead>
                    <tr>
                        <td>
                            <div style={textStyle}>
                            내 정보 수정하기
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
                            <div style={textStyle}>거주 지역</div>
                            <input type="text" value={residence} onChange={hadleResidenceChange} style={{ ...boxStyle1 }} />
                        </td>
                        </tr>
                    <tr>
            <td>
                <button type="submit"  className="btn-submit">수정 완료하기</button>
            </td>
          </tr>
                </tbody>
            </table>
            </form>
        </div>
    )
}



import Member from "../component/Member";
import { useNavigate } from "react-router-dom";
import React from 'react';
export default function MyPage(){

    const navigate = useNavigate();
    const goToWriteReview = () => {
        navigate("/WriteReview");
      };
      const goToApplicationHistory = () => {
        navigate("/ApplicationHistory");
      };
      const goToAChecked = () => {
        navigate("/Checked");
      };
      const textStyle={
        color:"#3176ff",
        fontWeight:"800",
        fontSize:"20px",
        paddingBottom:"50px",
       }
    return (
        <div className="mypageContainer">
            <table className="mypageContainerTable">
        <thead>
            <tr>
                <td style={{ paddingBottom:"60px"}}><sapn style={textStyle}>마이페이지</sapn></td>
            </tr>
        </thead>
             <tbody className="mypageContainerTableBody">
             <tr>
                    <td rowSpan={3} style={{width:"50px"}}><Member/></td>
                    <button className="buttonStyle" onClick={goToWriteReview}>후기 작성 &#9002;</button>
                </tr>
           
                <tr>
                <button className="buttonStyle" onClick={goToApplicationHistory}>신청 내역 &#9002;</button>
                </tr>
                <tr>
                <button className="buttonStyle" onClick={goToAChecked}>찜한 형 리스트 &#9002;</button>
                </tr>
             </tbody>
                
            </table>
          
            
        </div>
    )
}
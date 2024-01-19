import './Mypage.css';
import Member from "../component/Member";
import { useNavigate } from "react-router-dom";


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
        color:"#FF9549",
        fontWeight:"800",
        fontSize:"20px",
        paddingBottom:"50px",
       }
    return (
        <div className="mypageContainer">
            <table className="mypageContainerTable">
        <thead>
            <tr>
                <td colSpan={2} style={{ paddingBottom:"60px"}}><sapn style={textStyle}>마이페이지</sapn></td>
            </tr>
        </thead>
             <tbody className="mypageContainerTableBody">
             <tr>
                    <td colSpan={2} style={{width:"50px"}}><Member/></td>
                   
                </tr>
           
                <tr>
                    <td> <button className="buttonStyle" onClick={goToWriteReview}>채팅 하기 ›</button></td>
                <td><button className="buttonStyle" onClick={goToApplicationHistory}>우리회원 성사리스트 ›</button></td>
                </tr>
                <tr>
                <td><button className="buttonStyle" onClick={goToAChecked}>받은 후기 ›</button></td>
                </tr>
             </tbody>
                
            </table>
          
            
        </div>
    )
}